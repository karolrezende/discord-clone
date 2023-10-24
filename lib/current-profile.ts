import { auth } from "@clerk/nextjs";
import { db } from "./database";

export async function currentProfile() {
    const {userId} = auth() //extrai o userid do clerk

    if(!userId){
        return null //se nao tiver usuario, retorna null
    }

    const profile = await db.profile.findUnique({
        where:{
            userId //se tiver procura o user clerk dentro do db
        }
    })

    return profile //retorna profile
}