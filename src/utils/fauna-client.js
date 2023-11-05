import { Client as FaunaClient } from 'faunadb'

const client = new FaunaClient({
  secret: process.env.FAUNA_PUBLIC_KEY,
  endpoint: process.env.FAUNA_ENDPOINT
})

export default client
