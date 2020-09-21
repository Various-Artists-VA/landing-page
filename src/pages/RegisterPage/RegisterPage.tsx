import { Formik } from 'formik'
import { useCreateUserMutation } from '../../graphql'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { Typography } from 'va-components'
import { object, string } from 'yup'
import BottomBar from '../../components/BottomBar'
import { StepOne, StepThree, StepTwo } from './_components/RegisterForm'
import styles from './RegisterPage.module.scss'

const DATE_REGEX = /(0[1-9]|[12]\d|3[01]).(0[1-9]|1[0-2]).([12]\d{3})/

const RegisterPage: React.FC = () => {
  const history = useHistory()
  const step = new URLSearchParams(window.location.search).get('step')
  const [createUser] = useCreateUserMutation({
    onCompleted: (data) => {
      console.log('success')
      history.push('/register?step=3')
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
            dob: '',
            email: '',
            location: '',
            name: '',
            password: '',
          }}
          validate={object.shape({
            dob: string().required().match(DATE_REGEX),
            email: string().email().required(),
            location: string(),
            name: string().required(),
            password: string().required(),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true)
            await createUser({
              variables: {
                userData: values,
              },
            })
            setSubmitting(false)
          }}
        >
          {({ handleSubmit, handleChange }) => (
            <form>
              {step === '1' ? (
                <StepOne handleChange={handleChange} />
              ) : step === '2' ? (
                <StepTwo handleSubmit={handleSubmit} handleChange={handleChange}></StepTwo>
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
