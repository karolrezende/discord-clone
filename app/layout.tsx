import './globals.css'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/providers/theme-provider'

const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Discord',
  description: 'A simple discord clone created with  Next.js 13, React, Socket.io, Prisma, Tailwind, MySQL',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <ClerkProvider>
      <html lang="pt-br" suppressHydrationWarning>
        <body className={font.className}>
          <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem={false}
          storageKey='discord-theme'>
             {children}
          </ThemeProvider>
          </body>
      </html>
    </ClerkProvider>
  )
}
