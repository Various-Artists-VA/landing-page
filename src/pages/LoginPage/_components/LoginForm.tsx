import React from 'react'
import { Button, Input } from 'va-components'
import landingPageStyles from '../../LandingPage/LandingPage.module.scss'
import styles from './LoginForm.module.scss'

interface LoginFormProps {
  handleSubmit: () => void
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void | undefined
}

const LoginForm: React.FC<LoginFormProps> = ({ handleChange, handleSubmit }) => {
  return (
    <>
      <Input.TextInput
        name="email"
        className={styles.input}
        label="Your Email:"
        type="text"
        variant={Input.InputVariant.large}
        onChange={handleChange}
      />
      <Input.TextInput
        name="password"
        className={styles.input}
        label="Your Password:"
        type="password"
        variant={Input.InputVariant.large}
        placeholder=""
        onChange={handleChange}
      />
      <div className={landingPageStyles.buttonContainer}>
        <Button
          type="primary"
          variant="large"
          onClick={() => {
            handleSubmit()
          }}
        >
          Login
        </Button>
      </div>
    </>
  )
}

export default LoginForm
