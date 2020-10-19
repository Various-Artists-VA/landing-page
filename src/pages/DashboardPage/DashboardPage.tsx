import React from 'react'
import { useCurrentUser } from '../../components/UserContext'

const DashboardPage: React.FC = () => {
  const user = useCurrentUser()
  console.log(user)
  return (
    <>
      <>DashboardPage</>
    </>
  )
}

export default DashboardPage
