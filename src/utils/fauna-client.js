import { Client } from 'fauna'

const client = new Client({
  secret: process.env.FAUNA_PUBLIC_KEY
})

export default client
