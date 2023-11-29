import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/database";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import ServerHeader from "./server-header";

interface ServerSideBarProps {
    serverId: string
}
const ServerSideBar = async ({serverId}:ServerSideBarProps) => {

    const profile = await currentProfile()

    if(!profile){
        return redirect('/')
    }

    const server = await db.server.findUnique({
        where:{
            id: serverId
        },
        include:{
            channels:{
                orderBy:{
                    createdAt: 'asc'
                }
            },
            members: {
                include:{
                    profile: true
                },
                orderBy:{
                    role: 'asc'
                }
            }
        }
    })

    if(!server){
        return redirect('/')
    }

    const textChannels = server?.channels.find((channel)=> channel.type === ChannelType.TEXT)
    const audioChannels = server?.channels.find((channel)=> channel.type === ChannelType.AUDIO)
    const videoChannels = server?.channels.find((channel)=> channel.type === ChannelType.VIDEO)

    const members = server?.members.filter((member)=> member.profileId !== profile.id)

    const role = server?.members.find((member)=> member.profileId === profile.id)?.role
    return (
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f4f5]">  
            <ServerHeader server={server} role={role}/>
        </div>
    );
} 

export default ServerSideBar;