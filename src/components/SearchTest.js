
const API_BASE = 'https://www.bungie.net/Platform/'

async function getData (membershipId) {
    const res = await fetch(`${API_BASE}User/GetBungieNetUserById/${membershipId}/`, {
      method: 'GET',
      headers: {
        'X-API-Key': process.env.BUNGIE_API_KEY
      }
    })
    if (!res.ok) {
      throw new Error(await res.text())
    }
  
    return res.json()
  }

export default async function SearchTest ({ user }) {
    console.log(user)
    const membershipId = user.bungieNetMembershipId
    console.log(membershipId)
    const userData = await getData(membershipId)
  return (
    <div className='flex p-10 items-center'>
        <img src={`https://www.bungie.net/${userData.Response.profilePicturePath}`} className='h-24 w-24 rounded-full' />
        <div className="pl-10">
        <p className='text-xl pb-4'>{userData.Response.uniqueName}</p>
        {user.destinyMemberships.map((membership) =>
            <div key={membership.membershipId} className='flex p-2'>
            <img src={`https://www.bungie.net/${membership.iconPath}`} className='h-7 w-7 rounded-full mr-4' />
            <p>{membership.displayName}</p>
            </div>
        )}
        </div>
    </div>

  )
}
