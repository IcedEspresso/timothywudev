import { useForm } from '@mantine/form'
import { Button, Group, Stack, Textarea, TextInput } from '@mantine/core'
import classes from './ContactForm.module.css'

export default function ContactForm() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },

    validate: {
      name: (value) => (value ? null : 'Name is required'),
      email: (value) => (/^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i.test(value) ? null : 'Invalid email'),
      message: (value) => (value ? null : 'Message is required'),
    },
  })

  const handleSubmit = async (values: typeof form.values) => {
    // console.log(values)
    try {
      const response = await fetch('/api/form-submissions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error('Failed to submit the form')
      }

      alert('Form submitted successfully!')
    } catch (error) {
      alert((error as Error).message)
    }
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap={'sm'}>
        <TextInput label="Name" placeholder="Your name" {...form.getInputProps('name')} />

        <TextInput
          className={classes.textinput}
          label="Email"
          placeholder="Your email"
          {...form.getInputProps('email')}
          required
        />

        <Textarea
          className={classes.textarea}
          label="Message"
          placeholder="Your message"
          {...form.getInputProps('message')}
          autosize
          minRows={5}
          resize="vertical"
          required
        />

        <Group mt={'md'} className={classes.submitButtonWrapper}>
          <Button type="submit">Submit</Button>
        </Group>
      </Stack>
    </form>
  )
}
