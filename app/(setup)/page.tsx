import { db } from '@/lib/database'
import { initialProfile } from '@/lib/initial-profile'
import {redirect} from "next/navigation"
import React from 'react'
const Home = async() => {
  const profile = await initialProfile()

  const servers = await db.server.findFirst({
    where:{
      members:{
        some:{
          profileId: profile.id
        }
      }
    }
  })
  if(servers){
    return redirect(`/servers/${servers.id}`)
  }
  return (
    <div>Criar perfil</div>
  )
}
export default Home