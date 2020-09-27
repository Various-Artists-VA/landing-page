import { useCreateUserMutation } from '../../graphql'
import RegisterPage from './_components/BaseRegisterPage'
import React from 'react'
import { useHistory } from 'react-router-dom'

const ArtistRegisterPage: React.FC = () => {
  const history = useHistory()
  const [createUser] = useCreateUserMutation({
    onCompleted: (data) => {
      history.push('/u/register?step=3')
    },
    onError: (e) => {
      console.log('failure', e)
    },
  })
  return <RegisterPage registerMutation={createUser} type="user" />
}
export default ArtistRegisterPage
