import { Formik } from 'formik'
import React from 'react'
import { Typography } from 'va-components'
import { object, string } from 'yup'
import BottomBar from '../../components/BottomBar'
import { StepOne, StepThree, StepTwo, StepFour } from './_components/RegisterForm'
import styles from './_components/RegisterPage.module.scss'
import { useCreateUserMutation } from '../../graphql'
import { useHistory } from 'react-router-dom'

const DATE_REGEX = /(0[1-9]|[12]\d|3[01]).(0[1-9]|1[0-2]).([12]\d{3})/

const initialValues = {
  dob: '',
  email: '',
  location: '',
  name: '',
  password: '',
}

const validationSchema = object().shape({
  dob: string().matches(DATE_REGEX).required(),
  email: string().email().required(),
  location: string(),
  name: string().required(),
  password: string().required(),
})

const RegisterPage: React.FC = () => {
  const history = useHistory()
  const [user, setUser] = React.useState({})
  const step = new URLSearchParams(window.location.search).get('step')
  const type = new URLSearchParams(window.location.search).get('type') ?? 'user'
  const [createUser] = useCreateUserMutation({
    onCompleted: (data) => {
      setUser(data.createUser?.user ?? {})
      history.push(`register?step=3&type=${type}`)
    },
    onError: (e) => {
      console.log('failure', e)
    },
  })
  return (
    <>
      <div className={styles.main}>
        <Formik
          initialValues={{
            ...initialValues,
            ...(type === 'artist' || type === 'label' ? { [`${type}Name`]: '' } : {}),
          }}
          validationSchema={validationSchema.shape({
            ...(type === 'artist' || type === 'label' ? { [`${type}Name`]: string().required() } : {}),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true)
            await createUser({
              variables: {
                data: values,
              },
            })
            setSubmitting(false)
          }}
        >
          {({ handleSubmit, handleChange, values }) => (
            <form>
              {step === '1' ? (
                <StepOne handleChange={handleChange} values={values} type={type} />
              ) : step === '2' ? (
                <StepTwo handleSubmit={handleSubmit} handleChange={handleChange} values={values} type={type}></StepTwo>
              ) : step === '3' ? (
                <StepThree user={user} type={type}></StepThree>
              ) : step === '4' ? (
                <StepFour user={user} type={type}></StepFour>
              ) : (
                <>
                  <Typography.Title>404</Typography.Title>
                </>
              )}
            </form>
          )}
        </Formik>
      </div>
      <BottomBar />
    </>
  )
}
export default RegisterPage
