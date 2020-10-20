import { Formik } from 'formik'
import React, { useState } from 'react'
import { array, number, object, string } from 'yup'
import { ReleaseTrackInput, useUpdateReleaseMutation } from '../../graphql'
import ReleaseCreateForm from './_components/ReleaseCreateForm'

import styles from './_components/ReleaseCreateForm.module.scss'

const DATE_REGEX = /(0[1-9]|[12]\d|3[01]).(0[1-9]|1[0-2]).([12]\d{3})/

const initialValues = {
  // artists: [],
  description: '',
  // genres: [],
  id: '',
  name: '',
  releaseDate: '',
  // price: 0.0,
  tracks: [],
  // type: '',
}

const validationSchema = object().shape({
  artists: array().of(string()).required(),
  description: string(),
  genres: array().of(string()).required(),
  id: string().required(),
  name: string().required(),
  price: number().required(),
  releaseDate: string().matches(DATE_REGEX).required(),
  tracks: array().of(string()).required(),
  type: string().required(),
})

const ReleaseCreatePage: React.FC = () => {
  const [coverPhoto, setCoverPhoto] = useState('')
  const [id, setId] = useState('')
  const [tracks, setTracks] = useState<ReleaseTrackInput[]>(new Array())
  const step = new URLSearchParams(window.location.search).get('step')
  React.useEffect(() => console.log(id), [id])
  const [updateRelease] = useUpdateReleaseMutation({
    onCompleted: (data) => {
      console.log(data.updateRelease)
    },
    onError: (err) => console.log(err),
  })
  return (
    <>
      <Formik
        initialValues={{ ...initialValues }}
        // validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true)
          await updateRelease({
            variables: {
              data: {
                ...values,
                id,
                tracks,
              },
            },
          })
          setSubmitting(false)
        }}
      >
        {({ handleSubmit, handleChange, values }) => (
          <div className={`${styles.container}`}>
            <ReleaseCreateForm
              step={step ?? ''}
              values={values}
              id={id}
              setTracks={setTracks}
              tracks={tracks}
              handleSubmit={handleSubmit}
              coverPhoto={coverPhoto}
              setCoverPhoto={setCoverPhoto}
              setId={setId}
            />
          </div>
        )}
      </Formik>
    </>
  )
}
export default ReleaseCreatePage
