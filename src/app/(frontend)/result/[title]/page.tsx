// 'use server'
// import React, { cache } from 'react'
// import { getPayload } from 'payload'
// import config from '@payload-config'
// import { notFound } from 'next/navigation'
// import ResultDisplayClient from '@/components/custom/ResultDisplayClient'
//
// export async function generateStaticParams() {
//   const payload = await getPayload({ config })
//   const results = await payload.find({
//     collection: 'results',
//     limit: 1000,
//     pagination: false,
//     select: {
//       title: true,
//     },
//   })
//
//   return results.docs.map(({ title }) => {
//     return { title }
//   })
// }
//
// type Args = {
//   params: Promise<{
//     title?: string
//   }>
// }
//
// export default async function ResultPage({ params: paramsPromise }: Args) {
//   const { title = '' } = await paramsPromise
//   const result = await queryResultBytitle({ title });
//   if (!result) {
//     notFound();
//   }
//   return (
//     <section>
//       <div className="container">
//         <div className="pt-20">
//           <ResultDisplayClient result={result?.redirects} date={result.createdAt} />
//         </div>
//       </div>
//     </section>
//   )
// }
//
// const queryResultBytitle = cache(async ({ title }: { title: string }) => {
//
//   const payload = await getPayload({ config })
//
//   const result = await payload.find({
//     collection: 'results',
//     limit: 1,
//     pagination: false,
//     where: {
//       title: {
//         equals: title,
//       },
//     },
//   })
//
//   return result.docs?.[0] || null
// })
