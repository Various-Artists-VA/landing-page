import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'va-components'
import { Col, Row } from '../../../components/Grid'

const StepHeader: React.FC<{
  buttonText: string
  step: string
  onNext?: () => void
}> = ({ buttonText, step, onNext }) => {
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
            if (onNext) {
              onNext()
            }
            history.push(`${window.location.pathname}?step=${step}`)
          }}
        >
          {buttonText}
        </Button>
      </Col>
    </Row>
  )
}
export default StepHeader
