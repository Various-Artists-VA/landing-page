import Cookies from 'js-cookie'
import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useCurrentUserQuery } from '../graphql'
import { UserContext } from './UserContext'

interface ProtectedRouteProps {
  component: React.FC
  path: string
  exact?: boolean
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component, ...rest }) => {
  const Component = component
  if (Cookies.get('logged_in') === 'true') {
    return (
      <CurrentUserProvider>
        <Route component={Component} {...rest} />
      </CurrentUserProvider>
    )
  } else {
    return <Redirect to="/login" />
  }
}
const CurrentUserProvider: React.FC = ({ children }) => {
  const { data, loading, error } = useCurrentUserQuery()
  if (!loading && !error && data) {
    return <UserContext.Provider value={data.me ? data.me : {}}>{children}</UserContext.Provider>
  } else {
    // TODO: Handle exceptions
    return <></>
  }
}

export default ProtectedRoute
