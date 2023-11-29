import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing(); //função de dentro do upthing
 
const handleAuth = () => { 
    const{ userId }= auth() //irá pegar apenas o userid do clerk
    if(!userId) throw new Error("Não autorizado") //se n tiver nenhum usuario retorna um erro
    return {userId: userId} //se tiver o usuario retorna o id
}; 

export const ourFileRouter = {
    serverImage: f({image: {maxFileSize: "4MB", maxFileCount:1}}).middleware(()=> handleAuth()).onUploadComplete(()=>{}), 
    messageFile: f(["image", "pdf"]).middleware(()=> handleAuth()).onUploadComplete(()=>{})
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;