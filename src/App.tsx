import React from 'react'
import AboutPage from './pages/AboutPage/AboutPage'
import { createBrowserHistory } from 'history'
import { Route, Router, Switch } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import LandingPage from './pages/LandingPage/LandingPage'
import DashboardPage from './pages/DashboardPage/DashboardPage'
import LoginPage from './pages/LoginPage/LoginPage'
import ReleaseCreatePage from './pages/ReleaseCreatePage/ReleaseCreatePage'
import ProtectedRoute from './components/ProtectedRoute'
import styles from './App.module.scss'

export default function App() {
  const history = createBrowserHistory()
  return (
    <div className={styles.app}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
          <ProtectedRoute exact path="/dashboard" component={DashboardPage} />
          <ProtectedRoute exact path="/release/create" component={ReleaseCreatePage} />
        </Switch>
      </Router>
    </div>
  )
}
