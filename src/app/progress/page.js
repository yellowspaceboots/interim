const API_BASE = 'https://www.bungie.net/Platform/'

async function getData () {
  const res = await fetch(`${API_BASE}Content/Rss/NewsArticles/0/`, {
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

export default async function ProgressPage () {
  const searchResults = await getData()
  return (
    <>
      <h1 className='text-white text-3xl'>Progress</h1>
      <div className='flex flex-col'>
        {searchResults.Response.NewsArticles.map((article) => (
          <div key={article.UniqueIdentifier} className='mt-10'>
            <img src={article.ImagePath} className='w-3/6 mb-4' />
            <a href={`https://www.bungie.net${article.Link}`}>
              <p className='text-white text-2xl'>{article.Title}</p>
            </a>
            <p className='text-white'>{article.Description}</p>
          </div>
        ))}
      </div>
      <pre className='text-white'>{JSON.stringify(searchResults, null, 2)}</pre>
    </>

  )
}