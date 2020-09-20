import React from 'react'
import { Typography } from 'va-components'
import { StepOne, StepThree, StepTwo } from './_components/RegisterForm'

const RegisterPage: React.FC = () => {
  const step = new URLSearchParams(window.location.search).get('step')
  return (
    <>
      {step === '1' ? (
        <StepOne />
      ) : step === '2' ? (
        <StepTwo></StepTwo>
      ) : step === '3' ? (
        <StepThree></StepThree>
      ) : (
        <>
          <Typography.Title>404</Typography.Title>
        </>
      )}
    </>
  )
}
export default RegisterPage
