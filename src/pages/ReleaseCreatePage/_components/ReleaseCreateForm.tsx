import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Formik, Input, Typography } from 'va-components'
import { useCurrentUser } from '../../../components/UserContext'
import { Row, Col } from '../../../components/Grid'
import { ReleaseTrackInput } from '../../../graphql'
import styles from './ReleaseCreateForm.module.scss'

interface StepOneProps {
  coverPhoto: string
  setCoverPhoto: (coverPhoto: string) => void
}

const StepHeader: React.FC<{
  buttonText: string
}> = ({ buttonText }) => {
  const history = useHistory()
  return (
    <Row
      style={{
        paddingBottom: '50px',
      }}
    >
      <Col lg={11}>
        <Button type="text" variant="large">
          New Release
        </Button>
      </Col>
      <Col lg={1}>
        <Button
          type="primary"
          variant="large"
          onClick={() => {
            history.push(`${window.location.pathname}?step=2`)
          }}
        >
          {buttonText}
        </Button>
      </Col>
    </Row>
  )
}

interface TrackListItemProps {
  index: string
  name: string
  price: number
  duration: string
}
const TrackListItem: React.FC<TrackListItemProps> = ({ index, name, price, duration }) => {
  return (
    <Row>
      <Col md={1}>
        <Typography.Title>{index}</Typography.Title>
      </Col>
      <Col md={9}>
        <Typography.Title>{name}</Typography.Title>
      </Col>
      <Col md={1} style={{ paddingLeft: '20px' }}>
        <Typography.Title>{duration}</Typography.Title>
      </Col>
      <Col md={1}>
        <Input.Text disabled={true} variant={Input.InputVariant.large} value={`${price} €`} />
      </Col>
      <Col md={12} style={{ paddingTop: '10px' }}></Col>

      <Col
        md={12}
        lg={12}
        style={{
          height: '2px',
          width: '800px',
          background: '#F4F4F4',
        }}
      ></Col>
    </Row>
  )
}
export const StepOne: React.FC<StepOneProps> = ({ coverPhoto, setCoverPhoto }) => {
  const history = useHistory()
  return (
    <div className={`${styles.container}`}>
      <StepHeader buttonText="Continue" />
      <Row
        style={{
          paddingBottom: '50px',
        }}
      >
        <Col lg={4} style={{ backgroundColor: '#f4f4f4', height: '350px' }}>
          {coverPhoto !== '' && (
            <img
              src={coverPhoto}
              style={{
                height: 'inherit',
                width: '100%',
              }}
            />
          )}
        </Col>
        <Button type="primary" variant="large">
          <input
            type="file"
            onChange={(e) => setCoverPhoto(URL.createObjectURL(e.target.files ? e.target.files[0] : ''))}
          />
        </Button>
      </Row>
      <Row
        style={{
          paddingBottom: '25px',
        }}
      >
        <Col lg={6}>
          <Formik.Text
            name="name"
            label="Name"
            type="text"
            variant={Input.InputVariant.large}
            placeholder="asdf compilation"
          />
        </Col>
        <Col lg={6}>
          <Formik.Text
            name="credits"
            label="Credits"
            type="text"
            variant={Input.InputVariant.large}
            placeholder="Mixed by.... Mastered by.... "
          />
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <Formik.Text
            name="date"
            label="Release Date"
            type="text"
            variant={Input.InputVariant.large}
            placeholder="01.01.1970"
          />
        </Col>
        <Col lg={6}>
          <Formik.Text
            name="credits"
            label="Genres"
            type="text"
            variant={Input.InputVariant.large}
            placeholder="EBM, Synth-pop, Post-Punk"
          />
        </Col>
      </Row>
    </div>
  )
}

interface StepTwoProps {
  //TODO FIX ANY
  setTracks: React.Dispatch<React.SetStateAction<any[]>>
  tracks: ReleaseTrackInput[]
  albumId: string
}

export const StepTwo: React.FC<StepTwoProps> = ({ setTracks, tracks, albumId }) => {
  const user = useCurrentUser()
  const history = useHistory()
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
              id: '',
              name: item.name,
              price: 0,
            },
          ]
        })
        uploadTrack(item)
      })
    )
  }
  let totalPrice = 0

  return (
    <div className={`${styles.container}`}>
      <StepHeader buttonText="Publish" />
      <Row style={{ paddingBottom: '50px' }}>
        <Col lg={11}>
          <Button type="text" variant="large">
            Total Album Price
          </Button>
        </Col>
        <Col lg={1}>
          <Button type="text" variant="large">
            {totalPrice}
          </Button>
        </Col>
      </Row>
      <TrackListItem name="Public Image" price={2.99} index={'1'} duration="4:11" />
    </div>
  )
}

interface StepThreeProps {
  handleSubmit: () => void
}
export const StepThree: React.FC<StepThreeProps> = ({ handleSubmit }) => {
  return (
    <>
      <Typography.Title>
        You agree to blah blah blahblah blah blahblah blah blahblah blah blahblah blah blah
      </Typography.Title>
      <Button
        type="primary"
        variant="large"
        onClick={() => {
          handleSubmit()
        }}
      >
        Publish
      </Button>
    </>
  )
}
const ReleaseCreateForm: React.FC = () => {
  return (
    <>
      <></>
    </>
  )
}
export default ReleaseCreateForm
