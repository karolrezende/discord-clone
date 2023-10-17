import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import {db} from "@/lib/database"

import React from 'react'

export const initialProfile = async()=> {
    const user = await currentUser()

    if(!user){
        return redirectToSignIn()
    }

    const profile = await db.profile
}
