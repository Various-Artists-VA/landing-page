import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Input, Typography } from 'va-components'
import styles from './RegisterForm.module.scss'
import landingPageStyles from '../../LandingPage/LandingPage.module.scss'

export const StepOne: React.FC = () => {
  const history = useHistory()
  return (
    <div className={styles.container}>
      <Input.TextInput
        className={styles.input}
        label="Your Full Name:"
        type="text"
        variant={Input.InputVariant.large}
        placeholder="Anja Huwe"
      />
      <Input.TextInput
        className={styles.input}
        label="Your Email:"
        type="text"
        variant={Input.InputVariant.large}
        placeholder="you@example.com"
      />
      <Input.TextInput
        className={styles.input}
        label="Your Password:"
        type="password"
        variant={Input.InputVariant.large}
        placeholder=""
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
export const StepTwo: React.FC = () => {
  const history = useHistory()
  return (
    <div className={styles.container}>
      <Input.TextInput
        label="Location:"
        className={styles.input}
        type="text"
        variant={Input.InputVariant.large}
        placeholder="Berlin"
      />
      <Input.TextInput
        label="Birthdate:"
        className={styles.input}
        type="text"
        variant={Input.InputVariant.large}
        placeholder="01.01.1970"
      />
      <div className={landingPageStyles.buttonContainer}>
        <Button
          type="primary"
          variant="large"
          onClick={() => {
            history.push('/register?step=3')
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
