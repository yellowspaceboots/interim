import { fql } from 'fauna'


const to = object => {
      const newObject = {}
      for (const key in object) {
        const value = object[key]
        if (value instanceof Date) {
          newObject[key] = fql`Time(${value.toISOString()})`
        } else {
          newObject[key] = value
        }
      }
      return newObject
    }
const from = object => {
      const newObject = {}
      for (const key in object) {
        const value = object[key]
        if (value?.value && typeof value.value === "string") {
          newObject[key] = new Date(value.value)
        } else {
          newObject[key] = value
        }
      }
      return newObject
    }
  
  
  
  export function FaunaAdapter(client) {
    const createFaunaUser = data => fql`users.create(${data})` // to
    const getFaunaUser = id => fql`users.byId(${id})`
    const getFaunaUserByEmail = email => fql`users.firstWhere(.email == ${email})`
    const getFaunaUserIdByAccount = (provider, providerAccountId) => fql`accounts.account_by_provider_and_provider_account_id(${provider, providerAccountId}).first() { id }`
    const updateFaunaUser = data => fql`users.byId(${data.id}).update({ ${data} })` // to
    const deleteFaunaUserSessions = userId => fql`sessions.sessions_by_user_id(${userId}).foreach(session => session.delete())`
    const deleteFaunaUserAccounts = userId => fql`accounts.accounts_by_user_id(${userId}).foreach(account => account.delete())`
    const deleteFaunaUser = userId => fql`users.byId(${userId})!.delete()`
    const createFaunaAccount = data => fql`accounts.create(${data})` // to
    const unlinkFaunaAccount = key => fql`accounts.account_by_provider_and_provider_account_id(${key}).foreach(account => account.delete())`
    const createFaunaSession = data => fql`sessions.create(${data})` // to
    const getFaunaSessionByToken = token => fql`sessions.session_by_session_token(${token}).first()`
    const updateFaunaSession = data => fql`sessions.session_by_session_token(${data.sessionToken}).update({ ${data} })` // to
    const deleteFaunaSessions = token => fql`sessions.session_by_session_token(${token}).foreach(session => session.delete())`
    const createFaunaVerificationToken = data => fql`verification_tokens.create(${data})` // to
    const useFaunaVerificationToken = key => fql`verification_tokens.verification_token_by_identifier_and_token(${key})`
    const deleteFaunaVerificationToken = id => fql`verification_tokens.byId(${id})!.delete()`
    return {
      createUser: async data => await client.query(createFaunaUser(data)),
      getUser: async id => await client.query(getFaunaUser(id)),
      getUserByEmail: async email => await client.query(getFaunaUserByEmail(email)),
      getUserByAccount: async ({ provider, providerAccountId }) => {
        const userId = await client.query(getFaunaUserIdByAccount(provider, providerAccountId))
        console.log(userId)
        const user = await client.query(getFaunaUser(userId.id))
        return user
      },
      updateUser: async data => await client.query(updateFaunaUser(data)),
      deleteUser: async userId => {
        await client.query(deleteFaunaUserSessions(userId))
        await client.query(deleteFaunaUserAccounts(userId))
        await client.query(deleteFaunaUser(userId))
      },
      linkAccount: async data => await client.query(createFaunaAccount(data)),
      unlinkAccount: async ({ provider, providerAccountId }) => await client.query(unlinkFaunaAccount([provider, providerAccountId])),
      createSession: async data => await client.query(createFaunaSession(data)),
      getSessionAndUser: async (sessionToken) => {
        const session = await client.query(getFaunaSessionByToken(sessionToken))
        if (!session) return null
  
        const user = client.query(getFaunaUser(session.userId))
  
        return { session, user: user }
      },
      updateSession: async data => await client.query(updateFaunaSession(data)),
      deleteSession: async sessionToken => await client.query(deleteFaunaSessions(sessionToken)),
      createVerificationToken: async data => await client.query(createFaunaVerificationToken(data)),
      useVerificationToken: async ({ identifier, token }) => {
        const key = [identifier, token]
        const object = Get(Match(VerificationTokenByIdentifierAndToken, key))
  
        const verificationToken = await client.query(useFaunaVerificationToken(key))
        if (!verificationToken) return null
  
        // Verification tokens can be used only once
        await client.query(deleteFaunaVerificationToken(verificationToken.id))
  
        // @ts-expect-error
        delete verificationToken.id
        return verificationToken
      }
    }
  }
  