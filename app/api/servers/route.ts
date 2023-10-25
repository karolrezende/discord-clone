import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/database";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { MemberRole } from "@prisma/client";
export async function POST(req: Request){ //esta é a rota da api para criação de server
    try {
        const {name, imageUrl} = await req.json() //recebe da requisicao
        const profile = await currentProfile() //pega de profile, o mesmo procura no banco atraves o clerk e retorna se existir

        if(!profile){
            return new NextResponse("Unauthorized", {status: 401}) //se não tiver nenhum perfil cadastrado retorna 401

        }
        //se tiver cria um servidor novo, colocando na tabela de membros a primeira pessoa que foi a que criou, como adm, e colocando também o primeiro canal default
        const server = await db.server.create({
            data:{
                profileId: profile.id,
                name,
                imageUrl,
                inviteCode: uuidv4(),
                channels: {
                    create: [
                        {name: 'general', profileId: profile.id}
                    ]
                },
                members:{
                    create: [
                        {profileId: profile.id, role: MemberRole.ADMIN}
                    ]
                }
            }
        })
        //resposta padrão do next 
        return NextResponse.json(server)

    } catch (error) {
        //caso tenha algum erro na requisiçao retorna 500 e mostra no console
        console.log("[servers_error]", error)
        return new NextResponse("Internal Error", {status: 500})
    }
}