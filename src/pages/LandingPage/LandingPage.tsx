import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Typography } from 'va-components'
import styles from './LandingPage.module.scss'
import logo from '../../logo.png'
import { BottomBar } from '../../components/BottomBar'

const LandingPage: React.FC = () => {
  const history = useHistory()
  return (
    <>
      <div className={styles.main}>
        <img src={logo} className={styles.logo} alt="logo" />
        <Typography.Title className={styles.title}>
          Supporting your favorite artists with every listen.
        </Typography.Title>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          className={styles.button}
          type="primary"
          variant="large"
          onClick={() => {
            history.push('/login')
          }}
        >
          Login
        </Button>
        <Button
          className={styles.button}
          type="secondary"
          variant="large"
          onClick={() => {
            history.push('/u/register?step=1')
          }}
        >
          Register
        </Button>
      </div>
      <BottomBar />
    </>
  )
}
export default LandingPage
