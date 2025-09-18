import { client } from '@/sanity/lib/client'
import { AUTHOR_STARTUPS } from '@/sanity/lib/queies'
import React from 'react'
import StartupCard, { StartupTypeCard } from './StartupCard'

const UserStarups = async ({id} : {id : string}) => {
    const startups = await client.fetch(AUTHOR_STARTUPS, {id: id })
  return (
    <>
        {startups.length > 0  ? startups.map((startup: StartupTypeCard) => (
          <StartupCard key={startup._id} post={startup} />
        )) : <p className='no-result'>"No post yet"</p>}
    </>
  )
}

export default UserStarups