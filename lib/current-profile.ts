import { auth } from "@clerk/nextjs";
import { db } from "./database";

export async function currentProfile() {
    const {userId} = auth()

    if(!userId){
        return null
    }

    const profile = await db.profile.findUnique({
        where:{
            userId
        }
    })

    return profile
}