import React from 'react'
import { Typography } from 'va-components'
import { StepOne, StepThree, StepTwo } from './_components/RegisterForm'
import styles from './RegisterPage.module.scss'
import BottomBar from '../../components/BottomBar'

const RegisterPage: React.FC = () => {
  const step = new URLSearchParams(window.location.search).get('step')
  return (
    <>
      <div className={styles.main}>
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
      </div>
      <BottomBar />
    </>
  )
}
export default RegisterPage
