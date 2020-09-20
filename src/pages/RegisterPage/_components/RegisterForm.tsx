import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Input, Typography } from 'va-components'

export const StepOne: React.FC = () => {
  const history = useHistory()
  return (
    <>
      <>
        <Typography.Title>Full Name</Typography.Title>
        <Input.TextInput type="text" variant={Input.InputVariant.large} placeholder="Anja Huwe" />
      </>
      <>
        <Typography.Title>Email Address</Typography.Title>
        <Input.TextInput type="text" variant={Input.InputVariant.large} placeholder="you@example.com" />
      </>
      <>
        <Typography.Title>Password</Typography.Title>
        <Input.TextInput type="password" variant={Input.InputVariant.large} placeholder="" />
      </>
      <Button
        type="primary"
        variant="large"
        onClick={() => {
          history.push('/register?step=2')
        }}
      >
        Continue Registration
      </Button>
    </>
  )
}
export const StepTwo: React.FC = () => {
  const history = useHistory()
  return (
    <>
      <>
        <Typography.Title>Location(Optional)</Typography.Title>
        <Input.TextInput type="text" variant={Input.InputVariant.large} placeholder="Berlin" />
      </>
      <>
        <Typography.Title>Date of Birth</Typography.Title>
        <Input.TextInput type="text" variant={Input.InputVariant.large} placeholder="06.08.1986" />
      </>

      <Button
        type="primary"
        variant="large"
        onClick={() => {
          history.push('/register?step=3')
        }}
      >
        Register
      </Button>
    </>
  )
}

export const StepThree: React.FC = () => {
  return (
    <>
      <Typography.Title>
        Whenever you listen to music on Various Artists™, you support an artist with 1ct per song.
      </Typography.Title>
      <Typography.Title>Once your contribution amounts to the full price of the song, you own it.</Typography.Title>
      <Button type="primary" variant="large" onClick={() => {}}>
        Pay 9.99€ a month
      </Button>
      <Button type="secondary" variant="large" onClick={() => {}}>
        Pay 9.99€ once
      </Button>
    </>
  )
}
