import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  access: {
    read: () => true,
  },
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    description: 'this is a description',
    defaultColumns: ['title', 'date', 'url', 'tags', 'createdAt', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Project Title',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Project Description',
    },
    {
      name: 'date',
      type: 'date',
      label: 'Project Date',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Project Image',
      relationTo: 'media',
      required: true,
      hasMany: true,
    },
    {
      name: 'url',
      type: 'text',
      label: 'Project URL',
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'select',
      options: [
        { label: 'JavaScript', value: 'javascript' },
        { label: 'TypeScript', value: 'typescript' },
        { label: 'React', value: 'react' },
        { label: 'Node.js', value: 'nodejs' },
        { label: 'CSS', value: 'css' },
        { label: 'HTML', value: 'html' },
        { label: 'CRM', value: 'crm' },
        { label: 'Hubspot', value: 'hubspot' },
        { label: 'Salesforce', value: 'salesforce' },
        { label: 'WordPress', value: 'wordpress' },
        { label: 'Three.js', value: 'threejs' },
        { label: 'Next.js', value: 'nextjs' },
        { label: 'Email', value: 'email' },
        { label: 'CAD', value: 'cad' },
        { label: '3D Modeling', value: 'modeling' },
      ],
      hasMany: true,
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      label: 'Appear on Showcase?',
      defaultValue: false,
    },
  ],
}
