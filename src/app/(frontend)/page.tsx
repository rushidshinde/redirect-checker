import Checker from '@/components/custom/checker'
import UploadInstructions from "@/components/custom/uploadInstructions";
import React from 'react'

export default async function HomePage() {

  return (
    <div className="pb-20">
      <section className="w-full">
        <h1 className="hidden">301 Redirect Checker – Bulk URL Redirect Testing Tool</h1>
        <div className="container">
          <Checker />
        </div>
      </section>
      <section className="w-full pt-20">
        <div className="container">
          <UploadInstructions />
        </div>
      </section>
    </div>
  )
}
