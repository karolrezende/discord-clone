import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/database";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try {
        const {name, imageUrl} = await req.json()
        const profile = currentProfile()

        if(!profile){
            return new NextResponse("Unauthorized", {status: 401})
        }
    } catch (error) {
        console.log("[servers_error]", error)
        return new NextResponse("Internal Error", {status: 500})
    }
}