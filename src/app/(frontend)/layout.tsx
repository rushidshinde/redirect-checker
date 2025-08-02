import React from 'react'
import './styles.css'
import { Metadata } from 'next'
import { ThemeProvider } from "@/components/theme-provider"
import Header from '@/components/custom/header'
import { Toaster } from '@/components/ui/sonner'
import ConsolePrint from '@/components/custom/consolePrint'


export const metadata:Metadata = {
  description: 'Redirect Checker Tool - Verify URL Redirects Easily',
  title: 'Quickly verify URL redirects with our tool. Upload a CSV file and download results instantly.',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en-IN" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main>
            {children}
          </main>
          <Toaster/>
        </ThemeProvider>
      <ConsolePrint/>
      </body>
    </html>
  )
}
