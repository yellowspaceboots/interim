import NextAuth from 'next-auth'
import { FaunaAdapter } from '@next-auth/fauna-adapter'
import BungieProvider from 'next-auth/providers/bungie'
import AzureADProvider from 'next-auth/providers/azure-ad'
import client from '../../../utils/fauna-client'

export const authOptions = {
  providers: [
    BungieProvider({
      clientId: process.env.BUNGIE_CLIENT_ID,
      clientSecret: process.env.BUNGIE_SECRET,
      authorization: {
        url: 'https://www.bungie.net/en/OAuth/Authorize?reauth=true',
        params: {
          scope: ''
        }
      },
      userinfo: {
        url: 'https://www.bungie.net/Platform/User/GetMembershipsForCurrentUser/'
      },
      httpOptions: {
        headers: {
          'X-API-Key': process.env.BUNGIE_API_KEY
        }
      }
    }),
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_TENANT_ID,
      authorization: { params: { scope: "openid profile user.Read email" } }
    })
  ],
  adapter: FaunaAdapter(client),
  database: process.env.FAUNA_ENDPOINT,
  callbacks: {
    async signIn ({ user, account, profile }) {
      return user
    },
    async session ({ session, user }) {
      session.user.id = user.id
      return { session, user }
    }
  }
}

export default NextAuth(authOptions)
