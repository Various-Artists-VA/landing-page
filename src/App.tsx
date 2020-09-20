import React from 'react'
import './App.css'
import AboutPage from './pages/AboutPage/AboutPage'
import { BottomBar } from 'va-components'
import { createBrowserHistory } from 'history'
import { Route, Router, Switch } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import LandingPage from './pages/LandingPage/LandingPage'

export default function App() {
  const history = createBrowserHistory()
  return (
    <Router history={history}>
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/about" component={AboutPage} />
          </Switch>
        </header>
        <BottomBar
          onBack={() => {
            history.goBack()
          }}
          actions={[
            {
              name: 'About',
              onClick: (e) => {
                e.preventDefault()
                history.push('/about')
              },
            },
          ]}
        />
      </div>
    </Router>
  )
}
