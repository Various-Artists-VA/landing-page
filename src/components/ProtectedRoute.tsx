import Cookies from 'js-cookie'
import React from 'react'
import { Redirect, Route } from 'react-router-dom'

interface ProtectedRouteProps {
  component: React.FC
  path: string
  exact?: boolean
}

class ProtectedRoute extends React.PureComponent<ProtectedRouteProps> {
  protected isLoggedIn: boolean
  constructor(props: ProtectedRouteProps) {
    super(props)
    this.isLoggedIn = Cookies.get('logged_in') === 'true'
  }
  public render() {
    const { component: Component, ...rest } = this.props
    if (this.isLoggedIn) {
      return <Route component={Component} {...rest} />
    } else {
      return <Redirect to="/login" />
    }
  }
}
export default ProtectedRoute
