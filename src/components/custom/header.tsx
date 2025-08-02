import React from 'react'
import Link from 'next/link'
import { ModeToggle } from '@/components/mode-toggle'
import BrandLogo from '@/components/custom/brandLogo'

export default function Header() {
  return (
    <header className="w-full py-4">
      <div className="container">
        <div className="w-full flex items-center justify-between">
          <Link href="/" aria-label={'301 checker'} className="font-bold cursor-pointer">
            <BrandLogo/>
          </Link>
          <nav>
          </nav>
          <ModeToggle/>
        </div>
      </div>
    </header>
  )
}
