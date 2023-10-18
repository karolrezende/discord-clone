import React from 'react'
import "@uploadthing/react/styles.css"
import { UploadDropzone } from '@uploadthing/react'

interface FileUploadThing {
    onChange: (url?: string) => void
    value: string
    endpoint: "messageFile" | "serverImage"
}
export default function FileUpload({onChange, value, endpoint}: FileUploadThing) {
  return (
    <UploadDropzone endpoint={endpoint} onClientUploadComplete={(res)=> { onChange(res?.[0].url)}} onUploadError={(error: Error)=> console.log(error)}/>
  )
}
