import { Client } from 'fauna'

const client = new Client({
  secret: process.env.FAUNA_PUBLIC_KEY2
})

export default client
