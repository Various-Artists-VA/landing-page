import React from 'react'
import { PayPalButton } from 'react-paypal-button-v2'
import { useHistory } from 'react-router-dom'
import { Button, Input, Typography, Formik } from 'va-components'
import landingPageStyles from '../../LandingPage/LandingPage.module.scss'
import styles from './RegisterForm.module.scss'
import iPhone from '../../../iPhone.svg'

const PAYPAL_ID = process.env.REACT_APP_PAYPAL_CLIENT_ID

interface StepOneProps {
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void | undefined
  values: {
    dob: string
    email: string
    location: string
    name: string
    password: string
  }
  type?: string
}

export const StepOne: React.FC<StepOneProps> = ({ handleChange, values, type }) => {
  const history = useHistory()
  const { email, name, password } = values
  return (
    <div className={styles.container}>
      <Formik.Text
        name="name"
        value={name}
        className={styles.input}
        label="Your Full Name:"
        type="text"
        variant={Input.InputVariant.large}
        placeholder="Anja Huwe"
        onChange={handleChange}
      />
      <Formik.Text
        name="email"
        value={email}
        className={styles.input}
        label="Your Email:"
        type="text"
        variant={Input.InputVariant.large}
        placeholder="you@example.com"
        onChange={handleChange}
      />
      <Formik.Text
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
            history.push(`${window.location.pathname}?step=2&type=${type}`)
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
      <Formik.Text
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
        <Formik.Text
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
      <Formik.Text
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

interface StepThreeAndFourProps {
  type: string
  user: {
    id?: string
    name?: string
    email?: string
    labelProfile?: {
      id: string
      name: string
    }
    artistProfile?: {
      id: string
      name: string
    }
  }
}
export const StepThree: React.FC<StepThreeAndFourProps> = ({ user, type }) => {
  const history = useHistory()
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
        <PayPalButton
          amount="10"
          shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
          currency="EUR"
          options={{
            clientId: PAYPAL_ID,
            currency: 'EUR',
          }}
          // onSuccess={() => {}}
        >
          Pay 9,99€ monthly
        </PayPalButton>
        <Button className={landingPageStyles.button} type="secondary" variant="large" onClick={() => {}}>
          Pay 9.99€ once
        </Button>
        <Button
          className={landingPageStyles.button}
          type="secondary"
          variant="large"
          onClick={() => {
            history.push(`${window.location.pathname}?step=4&type=${type}`)
          }}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export const StepFour: React.FC<StepThreeAndFourProps> = ({ user, type }) => {
  const history = useHistory()
  const [profilePicture, setProfilePicture] = React.useState('')
  if (!user.artistProfile?.id && !user.labelProfile?.id) {
    history.push('/')
  }
  const profile = user.artistProfile || user.labelProfile
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'left',
      }}
    >
      <>
        <img src={iPhone} />
        <div style={{ position: 'absolute', top: '20%', marginLeft: '140px' }}>{profile?.name}</div>
        <img
          src={profilePicture}
          height={150}
          width={312}
          style={{ position: 'absolute', top: '25%', marginLeft: '24px' }}
        />
        <input
          id="profilePicture"
          type="file"
          onChange={(e) => setProfilePicture(URL.createObjectURL(e.target.files ? e.target.files[0] : ''))}
        />
        <Button
          variant="large"
          type="primary"
          onClick={async () => {
            const files = (document.getElementById('profilePicture') as HTMLInputElement).files
            const formData = new FormData()
            formData.append('profile_picture', files ? files[0] : 'null')
            formData.append('type', type ?? '')
            formData.append('id', profile?.id ?? '')
            await fetch('http://localhost:8000/upload/profilePicture', {
              body: formData,
              credentials: 'include',
              method: 'POST',
              mode: 'cors',
            })
          }}
        >
          Submit
        </Button>
      </>
    </div>
  )
}
