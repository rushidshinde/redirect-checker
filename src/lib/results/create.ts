'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { RedirectResult } from '@/lib/types'

export async function CreateResult(data: RedirectResult) {
  const payload = await getPayload({ config })

  try {
    return await payload.create({
      collection: 'results',
      data,
    })
  } catch (error) {
    throw new Error(`Error creating post: ${error}`)
  }
}