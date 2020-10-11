import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Typography } from 'va-components'
import { array, number, object, string } from 'yup'
import { useInitializeReleaseMutation } from '../../graphql'
import { StepOne } from './_components/ReleaseCreateForm'

const DATE_REGEX = /(0[1-9]|[12]\d|3[01]).(0[1-9]|1[0-2]).([12]\d{3})/

const initialValues = {
  artists: [],
  credits: '',
  date: '',
  genres: [],
  id: '',
  name: '',
  price: 0.0,
  tracks: [],
  type: '',
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
  const history = useHistory()
  const [id, setId] = useState('')
  const step = new URLSearchParams(window.location.search).get('step')
  const [initializeRelease] = useInitializeReleaseMutation({
    onCompleted: (data) => {
      setId(data.initializeRelease?.release?.id)
    },
  })
  useEffect(() => {
    initializeRelease()
  }, [])
  return (
    <>
      <Formik
        initialValues={{ ...initialValues, id }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true)
          setSubmitting(false)
        }}
      >
        {({ handleSubmit, handleChange, values }) => (
          <>
            {id && (
              <form>
                {step === '1' ? (
                  <StepOne />
                ) : step === '2' ? (
                  <StepOne />
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
