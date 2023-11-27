import { redirect } from 'next/navigation'
import React from 'react'

import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/database'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { UserButton } from '@clerk/nextjs'

import NavigationAction from './navigation-action'
import{ NavigationItem }from './navigation-item'
import { ModeToggle } from '@/components/mode-toggle'

export default async function NavigationSidebar() {
  const profile = await currentProfile() //importa o perfil que está logado do banco

  if (!profile){
    return redirect('/') //se não tiver nenhum perfil redireciona para pagina inicial
  }

  const servers = await db.server.findMany({
    where:{
      members:{
        some:{
          profileId: profile.id
        }
      }
    }
  })
  return (
    <div className='space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1e1f22] py-3'>
        <NavigationAction/>
        <Separator className='h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto'/>
        <ScrollArea className='flex-1 w-full'>
          {servers.map((server)=>(
              <div key={server.id} className='mb-4'>
                <NavigationItem
                id={server.id}
                imageUrl={server.imageUrl}
                name={server.name}
                />
              </div>
            ))}
        </ScrollArea>
        <div className='pb-3 mt-auto flex items-center flex-col gap-y-4'>
          <ModeToggle/>
          <UserButton
          afterSignOutUrl='/'
          appearance={{
            elements:{
              avatarBox: 'h-[48px] w-[48px]'
            }
          }}/>
        </div>
    </div>
  )
}
