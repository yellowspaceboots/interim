import NextAuth from 'next-auth'
import { FaunaAdapter } from '@auth/fauna-adapter'
import AzureADProvider from 'next-auth/providers/azure-ad'
import client from './src/utils/fauna-client'

export const {
    handlers: { GET, POST },
    auth,
  } = NextAuth({
    providers: [
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
  })
