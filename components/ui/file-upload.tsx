import React from 'react'
import "@uploadthing/react/styles.css"
import { UploadDropzone } from '@uploadthing/react'

import { X } from 'lucide-react'
import  Image from 'next/image'

interface FileUploadThing {
    onChange: (url?: string) => void
    value: string
    endpoint: "messageFile" | "serverImage"
}
export default function FileUpload({onChange, value, endpoint}: FileUploadThing) {
  const fileType = value.split('.').pop() // irá pegar o tipo que vem "serverImage", separar por um ponto e retirar
  
  if(value && fileType !== "pdf"){
    return(
      <div className='relative h-20 w-20' >
        <Image fill src={value} alt="Upload" className='rounded-full'/>
        <button onClick={()=> onChange('')} className='bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm'/>
        <X className='h-4 w-4'/>
      </div>
    )
  }

  return (
    <UploadDropzone className='rounded-full' endpoint={endpoint} onClientUploadComplete={(res)=> { onChange(res?.[0].url)}} onUploadError={(error: Error)=> console.log(error)}/>
  )
}
  