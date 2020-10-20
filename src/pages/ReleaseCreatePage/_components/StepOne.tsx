import React from 'react'
import { Button, Formik, Input } from 'va-components'

import { Col, Row } from '../../../components/Grid'
import { ReleaseTrackInput, useCreateReleaseMutation } from '../../../graphql'
import StepHeader from './StepHeader'

interface StepOneProps {
  coverPhoto: string
  setCoverPhoto: (coverPhoto: string) => void
  setId: (id: string) => void
  values: {
    id: string
    name: string
    releaseDate: string
    description: string
    tracks: ReleaseTrackInput[]
  }
  id: string
}

const StepOne: React.FC<StepOneProps> = ({ coverPhoto, setCoverPhoto, setId, values, id }) => {
  const [createRelease] = useCreateReleaseMutation({
    onCompleted: (data) => {
      setId(data.createRelease?.release?.id)
    },
    onError: (err) => console.log(err),
  })
  return (
    <div>
      <StepHeader
        buttonText="Continue"
        step="2"
        onNext={() => {
          if (!id) {
            createRelease({
              variables: {
                data: {
                  description: values.description,
                  releaseDate: values.releaseDate,
                  name: values.name,
                },
              },
            })
          }
        }}
      />
      <Row
        style={{
          paddingBottom: '50px',
        }}
      >
        <Col lg={8}>
          {coverPhoto !== '' ? (
            <img
              src={coverPhoto}
              style={{
                height: '350px',
                width: '350px',
              }}
            />
          ) : (
            <Input.File
              variant={Input.InputVariant.large}
              style={{ minHeight: '350px' }}
              onChange={(e) => {
                // @ts-ignore
                setCoverPhoto(URL.createObjectURL(e.target.files ? e.target.files[0] : ''))
              }}
            />
          )}
        </Col>
        <Col
          lg={3}
          style={{
            alignItems: 'center',
            display: 'flex',
          }}
        >
          {coverPhoto !== '' && (
            <Row>
              <Button
                type="text"
                onClick={() => {
                  setCoverPhoto('')
                }}
              >
                Change
              </Button>
              <Button
                type="text"
                onClick={() => {
                  setCoverPhoto('')
                }}
              >
                Delete
              </Button>
            </Row>
          )}
        </Col>
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
            name="description"
            label="Description"
            type="text"
            variant={Input.InputVariant.large}
            placeholder="Mixed by.... Mastered by.... "
          />
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <Formik.Text
            name="releaseDate"
            label="Release Date"
            type="text"
            variant={Input.InputVariant.large}
            placeholder="01.01.1970"
          />
        </Col>
        <Col lg={6}>
          <Formik.Text
            name="genres"
            label="Genres"
            type="text"
            disabled={true}
            variant={Input.InputVariant.large}
            placeholder="Disabled rn"
          />
        </Col>
      </Row>
    </div>
  )
}
export default StepOne
