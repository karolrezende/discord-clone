import React from 'react'
//tudo o que tiver dentro dessa pasta "auth", irá receber as configurações em children
export default function AuthLayout({children}:{children: React.ReactNode}) {
  return (
    <div className='h-full flex items-center justify-center'>
        {children}
    </div>
  )
}
