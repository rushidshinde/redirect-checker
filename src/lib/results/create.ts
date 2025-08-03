'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { Result } from '@/payload-types'

export async function CreateResult(data: Omit<Result, 'id' | 'sizes' | 'createdAt' | 'deletedAt' | 'updatedAt'>) {
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