import React from 'react'
import AboutPage from './pages/AboutPage/AboutPage'
import { createBrowserHistory } from 'history'
import { Route, Router, Switch } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import LandingPage from './pages/LandingPage/LandingPage'
import styles from './App.module.scss'

export default function App() {
  const history = createBrowserHistory()
  return (
    <div className={styles.app}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/about" component={AboutPage} />
        </Switch>
      </Router>
    </div>
  )
}
