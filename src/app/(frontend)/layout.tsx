import React from 'react'
import './styles.css'
import { Metadata } from 'next'
import { ThemeProvider } from "@/components/theme-provider"
import Header from '@/components/custom/header'
import { Toaster } from '@/components/ui/sonner'
import ConsolePrint from '@/components/custom/consolePrint'
import {Noto_Sans_Mono} from "next/font/google"

const noto_sans_mono = Noto_Sans_Mono({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata:Metadata = {
  title: '301 Redirect Checker - Verify Your URL Redirects',
  description: 'Verify your URL redirects easily. Upload a CSV file and get detailed reports on redirect statuses, including successes and failures.',
  keywords: ["301 redirect checker","bulk redirect checker","URL redirect checker","website redirect testing tool","HTTP status code checker","bulk URL tester","redirect validation tool","SEO redirect checker","CSV redirect checker","broken link checker","HTTP redirect tester","301 redirect tester online","302 redirect checker","website URL mapping tool","bulk link checker","check multiple redirects from CSV","verify 301 and 302 redirects in bulk","SEO-friendly redirect testing tool","test HTTP redirects for website migration","bulk redirect status code checker online","website migration redirect testing tool"],
  metadataBase: new URL(process.env.BASE_URL || 'https://redirect-checker.vercel.app/'),
  authors: [
    {
      name: 'Rushikesh Shinde',
      url: 'https://github.com/rushidshinde',
    }
  ],
  publisher: 'Rushikesh Shinde',
  alternates: {
    canonical: process.env.BASE_URL || 'https://redirect-checker.vercel.app/',
  },
  openGraph: {
    title: '301 Redirect Checker - Verify Your URL Redirects',
    description: 'Verify your URL redirects easily. Upload a CSV file and get detailed reports on redirect statuses, including successes and failures.',
    url: process.env.BASE_URL || 'https://redirect-checker.vercel.app/',
    siteName: 'Redirect Checker - Verify Your URL Redirects',
    locale: 'en-IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en-IN" suppressHydrationWarning className={noto_sans_mono.className}>
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
          <Toaster />
        </ThemeProvider>
        <ConsolePrint />
      </body>
    </html>
  )
}
