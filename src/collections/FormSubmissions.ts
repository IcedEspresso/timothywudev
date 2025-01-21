import type { CollectionAfterOperationHook, CollectionConfig } from 'payload'
import type { FormSubmission } from '@/payload-types'

const afterOperationHook: CollectionAfterOperationHook = async ({ result, operation, req }) => {
  console.log('result:', result) // Log the result of the operation
  const formSubmission = result as FormSubmission
  if (operation === 'create') {
    try {
      const email = await req.payload.sendEmail({
        to: 'contact@timothywu.dev',
        subject: 'Form Submission from timothywu.dev',
        html: `
              <p><strong>Name:</strong> ${formSubmission.name}</p>
              <p><strong>Email:</strong> ${formSubmission.email}</p>
              <p><strong>Phone:</strong> ${formSubmission.phone || 'Not provided'}</p><hr />
              <p><strong>Message:</strong></p><hr />
              <p>${formSubmission.message}</p>
            `,
      })

      console.log('Email sent successfully:', email)
    } catch (error) {
      console.error('Error sending email:', error)
    }
  }

  return result // Return the result as is or modify it if needed
}

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  access: {
    create: () => true,
  },
  admin: {
    useAsTitle: 'name',
    description: 'This collection stores form submissions.',
    defaultColumns: ['name', 'email', 'createdAt'],
  },
  hooks: {
    afterOperation: [afterOperationHook],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Message',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
      required: false,
    },
    // {
    //   name: 'formType',
    //   type: 'select',
    //   label: 'Form Type',
    //   options: [
    //     { label: 'Contact', value: 'contact' },
    //     { label: 'Feedback', value: 'feedback' },
    //     { label: 'Support', value: 'support' },
    //     { label: 'Other', value: 'other' },
    //   ],
    //   required: true,
    // },
  ],
}
