import React from 'react'
import { Button } from '@/components/ui/button'
import NotFoundClient from '@/components/custom/notFoundClient'

export default function NotFound() {
  return (
    <section className="w-full">
      <div className="container">
        <div className="w-full min-h-screen flex flex-col justify-center items-center">
          <div className="p-5 flex flex-col items-center gap-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">Page Not Found</h1>
            <Button
              variant={'outline'}
              color={'primary'}
              className={"cursor-pointer"}
            >
            Go to Home
            </Button>
          </div>
        </div>
      </div>
      <NotFoundClient/>
    </section>
  )
}
