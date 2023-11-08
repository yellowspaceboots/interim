import { Client as FaunaClient } from "fauna"

const client = new FaunaClient({
  secret: process.env.FAUNA_PUBLIC_KEY2
})

export default client
