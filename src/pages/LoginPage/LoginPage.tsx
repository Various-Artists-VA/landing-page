import { Formik } from 'formik'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { object, string } from 'yup'
import LoginForm from './_components/LoginForm'

const LoginPage: React.FC = () => {
  const history = useHistory()
  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={object().shape({
          email: string().required(),
          password: string().required(),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true)
          const { email, password } = values
          const response = await fetch('http://localhost:8000/login', {
            body: JSON.stringify({
              email,
              password,
            }),
            credentials: 'include',
            method: 'POST',
            mode: 'cors',
          })
          const json = await response.json()
          if (json.response === 'success') {
            setSubmitting(false)
            history.push('/dashboard')
          } else {
            console.log(json.response)
          }
        }}
      >
        {({ handleSubmit, handleChange }) => <LoginForm handleSubmit={handleSubmit} handleChange={handleChange} />}
      </Formik>
    </>
  )
}
export default LoginPage
