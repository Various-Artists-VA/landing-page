import React from 'react'
import { Typography } from 'va-components'
import styles from './AboutPage.module.scss'
import landingPageStyles from '../LandingPage/LandingPage.module.scss'
import logo from '../../logo.png'
import BottomBar from '../../components/BottomBar'

export const AboutPage: React.FC = () => {
  return (
    <>
      <div className={styles.container}>
        <img src={logo} className={landingPageStyles.logo} alt="logo" />
        <Typography.Title className={styles.title}>
          We are happy about your interest
          <br /> in what we are trying to do. <br />
          <br />
          Business inquiries can be sent to:
          <br />
          learn-more@variousartists.app
        </Typography.Title>
      </div>
      <BottomBar />
    </>
  )
}

export default AboutPage
