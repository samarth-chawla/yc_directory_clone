import Ping from "./Ping"
import { after } from 'next/server'
import { client } from "@/sanity/lib/client"
import { STARTUPS_VIEWS_QUERY } from "@/sanity/lib/queies"
import { writeClient } from '@/sanity/lib/write-client'

const View = async ({id} : {id : string}) => {
  const {views} = await client.withConfig({useCdn: false}).fetch(STARTUPS_VIEWS_QUERY, {id});

  after(async ()=> {await writeClient.patch(id).set({views: views + 1}).commit()})

  return (
    <div className="view-container">
        <div className="absolute -top-2 -right-2">
            <Ping />
        </div>
        <p className="view-text">
            <span className="font-black">
                {views} View{views>1 && 's'}
            </span>
        </p>
    </div>
  )
}

export default View