import { fql } from "fauna"

export function FaunaAdapter(f) {
  const { to, from } = format
  const q = query => f.query(query)

  return {
    createUser: async data => await q(fql`Users.create({ ${to(data)} })`),
    getUser: async id => await q(fql`Users.byId(${id})`),
    getUserByEmail: async email => await q(fql`Users.byEmail(${email}).first()`),
    getUserByAccount: async ({ provider, providerAccountId }) => {
      const accountQuery = fql`Accounts.byProviderAndProviderAccountId(${provider}, ${providerAccountId}).first()`
      const accountResult = await q(accountQuery)
      if (!accountResult) return null

      const userQuery = fql`Users.byId(${accountResult.userId})`
      const userResult = await q(userQuery)
      return userResult
    },
    updateUser: async data =>
      await q(fql`Users.byId(${data.id})!.update({ ${to(data)} })`),
    deleteUser: async userId => {
      await q(fql`Sessions.byUserId(${userId})!.forEach(.delete())`)
      await q(fql`Accounts.byUserId(${userId})!.forEach(.delete())`)
      await q(fql`Users.byId(${userId})!.delete()`)
      return null
    },
    linkAccount: async data => await q(fql`Accounts.create(${to(data)})!`),
    unlinkAccount: async ({ provider, providerAccountId }) =>
      await q(
        fql`Accounts.byProviderAndProviderAccountId(${provider}, ${providerAccountId}).first().delete()`
      ),
    createSession: async data => await q(fql`Sessions.create(${to(data)})`),
    getSessionAndUser: async sessionToken => {
      const session = await q(
        fql`Sessions.bySessionToken(${sessionToken})!.first()`
      )
      if (!session) return null
      const user = await q(fql`Users.byId(${session.userId})!`)
      return { session: session, user: user }
    },
    updateSession: async data =>
      await q(
        fql`Sessions.bySessionToken(${data.sessionToken}).update(${to(data)})`
      ),
    deleteSession: async sessionToken =>
      await q(fql`Sessions.bySessionToken(${sessionToken}).forEach(.delete())`),
    createVerificationToken: async data => {
      const { id: _id, ...verificationToken } = await q(
        fql`VerificationTokens.create(${to(data)})`
      )
      return verificationToken
    },
    useVerificationToken: async ({ identifier, token }) => {
      const object = fql`VerificationTokens.byIdentifierAndToken(${identifier}, ${token})`
      const verificationToken = await q(object)
      if (!verificationToken) return null

      await q(fql`VerificationTokens.byId(${verificationToken.id}).delete()`)
      delete verificationToken.id
      return verificationToken
    }
  }
}

export const format = {
  /** Takes a plain old JavaScript object and turns it into a Fauna object */
  to(object) {
    const newObject = {}
    for (const key in object) {
      const value = object[key]
      if (value instanceof Date) {
        newObject[key] = value.toISOString()
      } else {
        newObject[key] = value
      }
    }
    return newObject
  },
  /** Takes a Fauna object and returns a plain old JavaScript object */
  from(object) {
    const newObject = {}
    for (const key in object) {
      const value = object[key]
      if (key === "expires" && typeof value === "string") {
        newObject[key] = new Date(value)
      } else {
        newObject[key] = value
      }
    }
    return newObject
  }
}

/**
 * Fauna throws an error when something is not found in the db,
 * `next-auth` expects `null` to be returned
 */
export function query(f, format) {
  return async function(expr) {
    try {
      const result = await f.query(expr)
      if (!result) return null
      // If the query returns a null result, it might be hidden inside a .data key.
      if (Object.keys(result).includes("data") && !result.data) return null
      console.log(result)
      const finalResult = result.data ? format(result.data) : format(result)
      return finalResult
    } catch (error) {
      if (error.name === "NotFound") return null
      if (error.description?.includes("Number or numeric String expected"))
        return null
    }
  }
}
