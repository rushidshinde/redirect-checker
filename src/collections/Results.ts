import { CollectionConfig } from 'payload'

export const Results:CollectionConfig = {
  slug: 'results',
  fields: [
    {
      name: 'title',
      type: 'text',
      unique: true,
    },
    {
      name: 'redirects',
      type: 'array',
      fields: [
        {
          name: 'source_url',
          type: 'text'
        },
        {
          name: 'target_url',
          type: 'text'
        },
        {
          name: 'redirected_url',
          type: 'text'
        },
        {
          name: 'status_code',
          type: 'number',
          min: 1,
        },
        {
          name: 'status',
          type: 'text'
        },
        {
          name: 'message',
          type: 'text'
        },
        {
          name: 'needs_update',
          type: 'checkbox',
          defaultValue: false
        }
      ]
    }
  ]
}