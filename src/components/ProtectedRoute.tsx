import Cookies from 'js-cookie'
import React from 'react'
import { Redirect, Route } from 'react-router-dom'

interface ProtectedRouteProps {
  component: React.FC
  path: string
  exact?: boolean
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component, ...rest }) => {
  const Component = component
  if (Cookies.get('logged_in') === 'true') {
    return <Route component={Component} {...rest} />
  } else {
    return <Redirect to="/login" />
  }
}
export default ProtectedRoute
