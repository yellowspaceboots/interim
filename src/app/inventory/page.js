import { query as q } from 'faunadb'
import faunaClient from '../../utils/fauna-client'
import { auth } from '../../../auth'

async function getFaunaData (id) {
  const query = await faunaClient.paginate(
    q.Match(q.Index('account_by_userId'), id),
    q.Lambda('ref', q.Get(q.Var('ref')))
  )
  return { data: query.data }
};

export default async function InventoryPage () {
  const session = await auth()
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
