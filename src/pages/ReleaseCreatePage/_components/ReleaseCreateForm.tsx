import React from 'react'
import { Typography } from 'va-components'

import { ReleaseTrackInput } from '../../../graphql'
import StepOne from './StepOne'
import StepThree from './StepThree'
import StepTwo from './StepTwo'

interface ReleaseCreateForm {
  step: string
  coverPhoto: string
  setCoverPhoto: (imageURL: string) => void
  tracks: ReleaseTrackInput[]
  id: string
  setTracks: React.Dispatch<React.SetStateAction<ReleaseTrackInput[]>>
  handleSubmit: () => void
  setId: (id: string) => void
  values: {
    id: string
    name: string
    releaseDate: string
    description: string
    tracks: ReleaseTrackInput[]
  }
}

const ReleaseCreateForm: React.FC<ReleaseCreateForm> = ({
  step,
  handleSubmit,
  setTracks,
  coverPhoto,
  setCoverPhoto,
  tracks,
  id,
  setId,
  values,
}) => {
  return (
    <form>
      {step === '1' ? (
        <StepOne coverPhoto={coverPhoto} setCoverPhoto={setCoverPhoto} setId={setId} values={values} id={id} />
      ) : step === '2' ? (
        <StepTwo setTracks={setTracks} tracks={tracks} albumId={id} />
      ) : step === '3' ? (
        <StepThree handleSubmit={handleSubmit} />
      ) : (
        <>
          <Typography.Title>404</Typography.Title>
        </>
      )}
    </form>
  )
}
export default ReleaseCreateForm
