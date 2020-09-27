import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Input, Typography } from 'va-components'
import landingPageStyles from '../../LandingPage/LandingPage.module.scss'
import styles from './RegisterForm.module.scss'

interface StepOneProps {
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void | undefined
  values: {
    dob: string
    email: string
    location: string
    name: string
    password: string
  }
}

export const StepOne: React.FC<StepOneProps> = ({ handleChange, values }) => {
  const history = useHistory()
  const { email, name, password } = values
  return (
    <div className={styles.container}>
      <Input.TextInput
        name="name"
        value={name}
        className={styles.input}
        label="Your Full Name:"
        type="text"
        variant={Input.InputVariant.large}
        placeholder="Anja Huwe"
        onChange={handleChange}
      />
      <Input.TextInput
        name="email"
        value={email}
        className={styles.input}
        label="Your Email:"
        type="text"
        variant={Input.InputVariant.large}
        placeholder="you@example.com"
        onChange={handleChange}
      />
      <Input.TextInput
        name="password"
        value={password}
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
            history.push(`${window.location.pathname}?step=2`)
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
  type: string
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void | undefined
  values: {
    artistName?: string
    labelName?: string
    dob: string
    email: string
    location: string
    name: string
    password: string
  }
}
export const StepTwo: React.FC<StepTwoProps> = ({ handleSubmit, handleChange, values, type }) => {
  const { dob, location } = values
  return (
    <div className={styles.container}>
      <Input.TextInput
        name="location"
        value={location}
        label="Location:"
        className={styles.input}
        type="text"
        variant={Input.InputVariant.large}
        onChange={handleChange}
        placeholder="Berlin"
      />
      {type !== 'user' && (
        <Input.TextInput
          name={`${type}Name`}
          value={values[`${type}Name` as keyof StepTwoProps['values']]}
          label={`Your ${type.charAt(0).toUpperCase() + type.slice(1)}${type === 'label' ? "'s" : ''} Name`}
          className={styles.input}
          type="text"
          variant={Input.InputVariant.large}
          onChange={handleChange}
          placeholder=""
        />
      )}
      <Input.TextInput
        name="dob"
        value={dob}
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
