import { db } from '@/lib/database'
import { initialProfile } from '@/lib/initial-profile'
import {redirect} from "next/navigation"
import { InitialModal } from '@/components/modals/initial-modal'
import React from 'react'
const Home = async() => {
  const profile = await initialProfile() //espera a captura do perfil na função

  //procura todos os serves com aquele componente de profile, buscando pelo id
  const servers = await db.server.findFirst({
    where:{
      members:{
        some:{
          profileId: profile.id
        }
      }
    }
  })
  //se possuir ao menos 1 server irá redirecionar para esse
  if(servers){
    return redirect(`/servers/${servers.id}`)
  }
  //senão irá redirecionar para esse outro, para criação de um server
  return <InitialModal/>
  
}
export default Home