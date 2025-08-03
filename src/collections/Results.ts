import { CollectionConfig } from 'payload'

export const Results:CollectionConfig = {
  slug: 'results',
  fields: [
    {
      name: 'title',
      type: 'text',
      unique: true,
      required: true,
    },
    {
      name: 'redirects',
      type: 'array',
      fields: [
        {
          name: 'source_url',
          type: 'text',
          required: true
        },
        {
          name: 'target_url',
          type: 'text',
          required: true
        },
        {
          name: 'redirected_url',
          type: 'text',
          required: true
        },
        {
          name: 'status_code',
          type: 'number',
          required: true,
          min: 100,
          max: 599,
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          options: [
            {
              label: 'SUCCESS',
              value: 'SUCCESS'
            },
            {
              label: 'WARNING',
              value: 'WARNING'
            },
            {
              label: 'FAILURE',
              value: 'FAILURE'
            }
          ]
        },
        {
          name: 'message',
          type: 'text',
          required: true
        },
        {
          name: 'needs_update',
          type: 'checkbox',
          defaultValue: false,
          required: true
        }
      ]
    }
  ]
}