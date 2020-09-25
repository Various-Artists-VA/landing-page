import { useCreateArtistUserMutation } from '../../graphql'
import RegisterPage from './_components/BaseRegisterPage'
import React from 'react'
import { useHistory } from 'react-router-dom'

const ArtistRegisterPage: React.FC = () => {
  const history = useHistory()
  const [createArtistUser] = useCreateArtistUserMutation({
    onCompleted: (data) => {
      history.push('/a/register?step=3')
    },
    onError: (e) => {
      console.log('failure', e)
    },
  })
  return <RegisterPage registerMutation={createArtistUser} type="artist" />
}
export default ArtistRegisterPage
