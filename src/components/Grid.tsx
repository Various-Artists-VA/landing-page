import 'flexboxgrid/dist/flexboxgrid.min.css'
import React from 'react'

export const Row: React.FC<{ style?: React.CSSProperties }> = ({ children, style }) => {
  return (
    <div className="row" style={{ ...style }}>
      {children}
    </div>
  )
}

interface ColProps {
  md?: number
  lg?: number
  xs?: number
  sm?: number
  style?: React.CSSProperties
}
export const Col: React.FC<ColProps> = ({ children, ...restProps }) => {
  let className = ''
  Object.keys(restProps).forEach((item) => {
    if (item !== 'style') {
      const value = (restProps[item as keyof ColProps] as unknown) as number
      className += value ? `col-${item}-${value} ` : ''
    }
  })
  return (
    <div className={className} style={{ ...restProps.style }}>
      {children}
    </div>
  )
}
