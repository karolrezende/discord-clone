import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/database'
import { redirect } from 'next/navigation'
import React from 'react'
import NavigationAction from './navigation-action'
import { Separator } from '@/components/ui/separator'

export default async function NavigationSidebar() {
  const profile = await currentProfile() //importa o perfil que está logado do banco

  if (!profile){
    return redirect('/') //se não tiver nenhum perfil redireciona para pagina inicial
  }

  const servers = db.server.findMany({
    where:{
      members:{
        some:{
          profileId: profile.id
        }
      }
    }
  })
  return (
    <div className='flex flex-col items-center h-full text-primary w-full dark:bg-[#1e1f22] py-3'>
        <NavigationAction/>
        <Separator/>
    </div>
  )
}
