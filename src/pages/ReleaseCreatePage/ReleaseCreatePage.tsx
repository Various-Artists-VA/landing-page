import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Typography } from 'va-components'
import { array, number, object, string } from 'yup'
import { useCurrentUser } from '../../components/UserContext'
import { useInitializeReleaseMutation, useUpdateReleaseMutation, ReleaseTrackInput } from '../../graphql'
import { StepOne, StepThree, StepTwo } from './_components/ReleaseCreateForm'

const DATE_REGEX = /(0[1-9]|[12]\d|3[01]).(0[1-9]|1[0-2]).([12]\d{3})/

const initialValues = {
  // artists: [],
  credits: '',
  date: '',
  // genres: [],
  id: '',
  name: '',
  // price: 0.0,
  tracks: [],
  // type: '',
}

const validationSchema = object().shape({
  artists: array().of(string()).required(),
  credits: string(),
  date: string().matches(DATE_REGEX).required(),
  genres: array().of(string()).required(),
  id: string().required(),
  name: string().required(),
  price: number().required(),
  tracks: array().of(string()).required(),
  type: string().required(),
})

const ReleaseCreatePage: React.FC = () => {
  const user = useCurrentUser()
  const [coverPhoto, setCoverPhoto] = useState('')
  const history = useHistory()
  const [id, setId] = useState('')
  const [tracks, setTracks] = useState<ReleaseTrackInput[]>(new Array())
  const step = new URLSearchParams(window.location.search).get('step')

  const [initializeRelease] = useInitializeReleaseMutation({
    onCompleted: (data) => {
      setId(data.initializeRelease?.release?.id)
    },
    onError: (err) => console.log(err),
  })
  const [updateRelease] = useUpdateReleaseMutation({
    onCompleted: (data) => {
      console.log(data.updateRelease)
    },
    onError: (err) => console.log(err),
  })
  useEffect(() => {
    initializeRelease()
  }, [])

  return (
    <>
      <Formik
        initialValues={{ ...initialValues, id }}
        // validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values)
          setSubmitting(true)
          await updateRelease({
            variables: {
              data: {
                ...values,
                artistName: 'asdf',
                id,
                labelName: 'asdf',
                tracks,
              },
            },
          })
          setSubmitting(false)
        }}
      >
        {({ handleSubmit, handleChange, values }) => (
          <>
            {id && (
              <form>
                {step === '1' ? (
                  <StepOne coverPhoto={coverPhoto} setCoverPhoto={setCoverPhoto} />
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
            )}
          </>
        )}
      </Formik>
    </>
  )
}
export default ReleaseCreatePage
