import React from 'react'
import { Button, Input } from 'va-components'

import { Col, Row } from '../../../components/Grid'
import { useCurrentUser } from '../../../components/UserContext'
import { ReleaseTrackInput } from '../../../graphql'
import StepHeader from './StepHeader'
import TrackListItem from './TrackListItem'

interface StepTwoProps {
  setTracks: React.Dispatch<React.SetStateAction<ReleaseTrackInput[]>>
  tracks: ReleaseTrackInput[]
  albumId: string
}

const StepTwo: React.FC<StepTwoProps> = ({ setTracks, tracks, albumId }) => {
  const user = useCurrentUser()
  const uploadTrack = (track: File) => {
    // TODO handle errors with reject
    return new Promise(async (resolve, reject) => {
      const formData = new FormData()
      const profile = user?.labelProfile || user?.artistProfile
      formData.append('type', profile?.__typename?.replace('Type', '') ?? '')
      formData.append('profile_id', profile?.id ?? '')
      formData.append('album_id', albumId)
      formData.append(track.name, track)
      const response = await fetch('http://localhost:8000/upload/tracks', {
        body: formData,
        credentials: 'include',
        method: 'POST',
        mode: 'cors',
      })
      const json = await response.json()
      setTracks((prevState) => {
        prevState[prevState.findIndex((item) => item.name === track.name)] = {
          artists: [],
          id: json.track.id,
          name: track.name,
          price: 0.99,
        }
        return [...prevState]
      })
      resolve()
    })
  }
  const handleTrackUpload = async (files: File[]) => {
    await Promise.all(
      Array.from(files).map((item) => {
        setTracks((prevState) => {
          return [
            ...prevState,
            {
              artists: [],
              id: '',
              name: item.name.split('.')[0],
              price: 0,
            },
          ]
        })
        return uploadTrack(item)
      })
    )
  }
  return (
    <div>
      <StepHeader buttonText="Publish" step="3" />
      <Row style={{ paddingBottom: '50px' }}>
        <Col lg={11}>
          <Button type="text" variant="large">
            Total Album Price
          </Button>
        </Col>
        <Col lg={1}>
          <Button type="text" variant="large">
            0
          </Button>
        </Col>
      </Row>
      {tracks.length === 0 && (
        <Input.File
          variant={Input.InputVariant.large}
          style={{ minHeight: '350px' }}
          multiple={true}
          onChange={(e) => {
            // @ts-ignore
            handleTrackUpload(e.target.files)
          }}
        />
      )}
      {tracks.map((item, index) => (
        <TrackListItem index={(index as unknown) as string} name={item.name} price={item.price} duration={'0:00'} />
      ))}
    </div>
  )
}
export default StepTwo
