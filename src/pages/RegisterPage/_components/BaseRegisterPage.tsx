import { Formik } from 'formik'
import { CreateUserMutationFn, CreateArtistUserMutationFn, CreateLabelUserMutationFn } from '../../../graphql'
import React from 'react'
import { Typography } from 'va-components'
import { object, string } from 'yup'
import BottomBar from '../../../components/BottomBar'
import { StepOne, StepThree, StepTwo } from './RegisterForm'
import styles from './RegisterPage.module.scss'

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

interface RegisterPageProps {
  registerMutation: CreateUserMutationFn | CreateArtistUserMutationFn | CreateLabelUserMutationFn
  type: string
}

const RegisterPage: React.FC<RegisterPageProps> = ({ registerMutation, type }) => {
  const step = new URLSearchParams(window.location.search).get('step')
  return (
    <>
      <div className={styles.main}>
        <Formik
          initialValues={{
            ...initialValues,
            ...(type !== 'user' ? { [`${type}Name`]: '' } : {}),
          }}
          validationSchema={validationSchema.shape({
            ...(type !== 'user' ? { [`${type}Name`]: string().required() } : {}),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true)
            await registerMutation({
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
                <StepOne handleChange={handleChange} values={values} />
              ) : step === '2' ? (
                <StepTwo handleSubmit={handleSubmit} handleChange={handleChange} values={values} type={type}></StepTwo>
              ) : step === '3' ? (
                <StepThree></StepThree>
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
