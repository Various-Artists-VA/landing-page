import React from 'react'
import AboutPage from './pages/AboutPage/AboutPage'
import { createBrowserHistory } from 'history'
import { Route, Router, Switch } from 'react-router-dom'
import UserRegisterPage from './pages/RegisterPage/UserRegisterPage'
import LabelRegisterPage from './pages/RegisterPage/LabelRegisterPage'
import ArtistRegisterPage from './pages/RegisterPage/ArtistRegisterPage'
import LandingPage from './pages/LandingPage/LandingPage'
import DashboardPage from './pages/DashboardPage/DashboardPage'
import LoginPage from './pages/LoginPage/LoginPage'
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
          <Route exact path="/u/register" component={UserRegisterPage} />
          <Route exact path="/l/register" component={LabelRegisterPage} />
          <Route exact path="/a/register" component={ArtistRegisterPage} />
          <Route exact path="/login" component={LoginPage} />
          <ProtectedRoute exact path="/dashboard" component={DashboardPage} />
        </Switch>
      </Router>
    </div>
  )
}
