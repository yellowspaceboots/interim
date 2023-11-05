import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../pages/api/auth/[...nextauth]'
import SearchTest from '../../components/SearchTest'
import { query as q } from 'faunadb'
import faunaClient from '../../utils/fauna-client'

async function getFaunaData (id) {
  const query = await faunaClient.paginate(
    q.Match(q.Index('account_by_userId'), id),
    q.Lambda('ref', q.Get(q.Var('ref')))
  )
  return { data: query.data }
};

const API_BASE = 'https://www.bungie.net/Platform/'
const TOKEN = 'CKrgBBKGAgAgTHxN8UkiPeMWzX1VT+IaLYoii+k9Mp6nUdjPIoHziU/gAAAA1GjTW+O2EyPGvIH7CmATTiaTzOVRvIytGjh/wBvtujuXQpQfS6goubDKaySlQs5LMoblYttq0Ded7sMr+tFNgFTSSoL4l3D778WW3C4RvommMbH6yMYy/wwQ/1/h099TfWhAWcLxlth/2jRldrbrMZIMeA5q1X8jYsv6UCX8huyhV9LC4Y5F9AbX82nh3AAA9hxVXEUzBmv2G8Br3FV/B2EpLnrDVIi5BRO6cQmEZijuzedLR+WFBZ3AOjAkxtn0v/1da4T8aaDtVO+yT6ymOHS+MydmhIbuWqyh+Mp/68k='

async function getData () {
  const res = await fetch(`${API_BASE}/User/Search/GlobalName/0/`, {
    method: 'POST',
    body: JSON.stringify({ displayNamePrefix: 'donnie' }),
    headers: {
      'X-API-Key': process.env.BUNGIE_API_KEY
    }
  })
  if (!res.ok) {
    throw new Error(await res.text())
  }

  return res.json()
}

export default async function InventoryPage () {
  const session = await getServerSession(authOptions)
  const test = await getFaunaData(session?.user.id)
  //  const searchResults = await getData()
  return (
    <>
      <h1 className='text-white text-3xl'>Inventory</h1>
      <pre className='text-white'>{JSON.stringify(session, null, 2)}</pre>
      <pre className='text-white'>{JSON.stringify(test, null, 2)}</pre>
      {/* searchResults &&
        searchResults.Response.searchResults.filter((user) => user.bungieNetMembershipId !== undefined).map((user) =>
          <div key={user.bungieNetMembershipId} className='text-white'>
            <SearchTest user={user} />
          </div>
        ) */}
    </>

  )
}
