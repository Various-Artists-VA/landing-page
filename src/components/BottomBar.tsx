import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { BottomBar as BottomBarComponent } from 'va-components'

export const BottomBar: React.FunctionComponent = () => {
  const history = useHistory()
  const [useBack, setUseBack] = useState(false)
  const location = history.location

  useEffect(() => {
    if (location.pathname !== '/') setUseBack(true)
  }, [location])

  return (
    <BottomBarComponent
      onBack={
        useBack
          ? () => {
              history.goBack()
            }
          : undefined
      }
      actions={[
        {
          name: 'About',
          onClick: (e) => {
            e.preventDefault()
            if (location.pathname !== '/about') history.push('/about')
          },
        },
      ]}
    />
  )
}

export default BottomBar
