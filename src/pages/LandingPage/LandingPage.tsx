import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Typography } from 'va-components'
import logo from '../../logo.png'

const LandingPage: React.FC = () => {
  const history = useHistory()
  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />
      <div style={{ marginTop: '25px' }} />
      <Typography.Title>Supporting your favorite artists with every listen.</Typography.Title>
      <Button
        type="secondary"
        variant="large"
        onClick={() => {
          history.push('/login')
        }}
      >
        Login
      </Button>
      <Button
        type="primary"
        variant="large"
        onClick={() => {
          history.push('/register?step=1')
        }}
      >
        Register
      </Button>
    </>
  )
}
export default LandingPage
