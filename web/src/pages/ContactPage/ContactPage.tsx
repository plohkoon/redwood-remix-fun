import {
  Form,
  Submit,
  TextField,
  TextAreaField,
  FieldError,
  Label,
  FormError,
  useForm,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { useCallback } from 'react'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const formMethods = useForm({ mode: 'onBlur' })

  const [create, { error, loading }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success('Thanks for you message!')
      formMethods.reset()
    },
  })

  const onSubmit = useCallback(
    (data) => {
      console.log(data)
      create({ variables: { input: data } })
    },
    [create]
  )

  return (
    <>
      <Toaster />
      <Form onSubmit={onSubmit} formMethods={formMethods}>
        <FormError error={error} />

        <Label name="name">Name</Label>
        <TextField name="name" validation={{ required: true }} />
        <FieldError name="name" />

        <Label name="email">Email</Label>
        <TextField
          name="email"
          validation={{
            required: true,
            pattern: {
              value: /[^@]+@[^.]+\..+/,
              message: 'Please enter a valid email address',
            },
          }}
        />
        <FieldError name="email" />

        <Label name="message">Message</Label>
        <TextAreaField name="message" validation={{ required: true }} />
        <FieldError name="message" />

        <Submit disabled={loading}>{loading ? '...' : 'Save'}</Submit>
      </Form>
    </>
  )
}

export default ContactPage
