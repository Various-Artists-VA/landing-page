import { useCreateLabelUserMutation } from '../../graphql'
import RegisterPage from './_components/BaseRegisterPage'
import React from 'react'
import { useHistory } from 'react-router-dom'

const ArtistRegisterPage: React.FC = () => {
  const history = useHistory()
  const [createLabelUser] = useCreateLabelUserMutation({
    onCompleted: (data) => {
      history.push('/l/register?step=3')
    },
    onError: (e) => {
      console.log('failure', e)
    },
  })
  return <RegisterPage registerMutation={createLabelUser} type="label" />
}
export default ArtistRegisterPage
