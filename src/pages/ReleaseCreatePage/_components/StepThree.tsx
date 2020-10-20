import React from 'react'
import { Button, Typography } from 'va-components'

interface StepThreeProps {
  handleSubmit: () => void
}

const StepThree: React.FC<StepThreeProps> = ({ handleSubmit }) => {
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

export default StepThree
