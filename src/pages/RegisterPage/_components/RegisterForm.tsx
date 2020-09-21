import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Input, Typography } from 'va-components'
import landingPageStyles from '../../LandingPage/LandingPage.module.scss'
import styles from './RegisterForm.module.scss'

interface StepOneProps {
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void | undefined
}

export const StepOne: React.FC<StepOneProps> = ({ handleChange }) => {
  const history = useHistory()
  return (
    <div className={styles.container}>
      <Input.TextInput
        name="name"
        className={styles.input}
        label="Your Full Name:"
        type="text"
        variant={Input.InputVariant.large}
        placeholder="Anja Huwe"
        onChange={handleChange}
      />
      <Input.TextInput
        name="email"
        className={styles.input}
        label="Your Email:"
        type="text"
        variant={Input.InputVariant.large}
        placeholder="you@example.com"
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
            history.push('/register?step=2')
          }}
        >
          Continue Registration
        </Button>
      </div>
    </div>
  )
}

interface StepTwoProps {
  handleSubmit: () => void
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void | undefined
}
export const StepTwo: React.FC<StepTwoProps> = ({ handleSubmit, handleChange }) => {
  return (
    <div className={styles.container}>
      <Input.TextInput
        name="location"
        label="Location:"
        className={styles.input}
        type="text"
        variant={Input.InputVariant.large}
        onChange={handleChange}
        placeholder="Berlin"
      />
      <Input.TextInput
        name="dob"
        label="Birthdate:"
        className={styles.input}
        type="text"
        variant={Input.InputVariant.large}
        onChange={handleChange}
        placeholder="01.01.1970"
      />
      <div className={landingPageStyles.buttonContainer}>
        <Button
          type="primary"
          variant="large"
          onClick={() => {
            handleSubmit()
          }}
        >
          Register
        </Button>
      </div>
    </div>
  )
}

export const StepThree: React.FC = () => {
  return (
    <div className={styles.container}>
      <Typography.Title className={styles.title}>
        Whenever you listen to music <br /> on Various Artists™, <br />
        you support an artist with <br />
        <br />
        1ct per song. <br />
        <br /> Once your contributions amount
        <br /> to the full price of a song, <br />
        you will own it.
      </Typography.Title>
      <div className={landingPageStyles.buttonContainer}>
        <Button className={landingPageStyles.button} type="primary" variant="large" onClick={() => {}}>
          Pay 9.99€ a month
        </Button>
        <Button className={landingPageStyles.button} type="secondary" variant="large" onClick={() => {}}>
          Pay 9.99€ once
        </Button>
      </div>
    </div>
  )
}
