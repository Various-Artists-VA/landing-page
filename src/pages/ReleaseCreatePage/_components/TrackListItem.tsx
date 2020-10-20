import React from 'react'
import { Typography } from 'va-components'
import { Col, Row } from '../../../components/Grid'

interface TrackListItemProps {
  index: string
  name: string
  price: number
  duration: string
}

const TrackListItem: React.FC<TrackListItemProps> = ({ index, name, price, duration }) => {
  return (
    <Row>
      <Col lg={1}>
        <Typography.Title>{index}</Typography.Title>
      </Col>
      <Col lg={9}>
        <Typography.Title>{name}</Typography.Title>
      </Col>
      <Col lg={1} style={{ paddingLeft: '20px' }}>
        <Typography.Title>{duration}</Typography.Title>
      </Col>
      <Col lg={1}>{price} €</Col>
      <Col lg={12} style={{ paddingTop: '10px' }}></Col>

      <Col
        lg={12}
        style={{
          background: '#F4F4F4',
          height: '2px',
          width: '800px',
        }}
      ></Col>
    </Row>
  )
}
export default TrackListItem
