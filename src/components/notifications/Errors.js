import React from 'react'
import { PropTypes } from 'prop-types'

let errorStyle = {
  backgroundColor: '#e74c3c',
  color: 'white',
  borderRadius: 2,
}

let ulStyle = {
  marginLeft: 0,
  marginBottom: 0,
}

let liStyle = {
  listStyleType: 'none',
  marginBottom: '1rem',
  padding: '0.8rem 0.2rem'
}

// unordered list of errors
const Errors = (props) => {
  const { errors } = props
  return (
    <div style={errorStyle}>
      <ul style={ulStyle}>
        {errors.map(errors => (
          <li style={liStyle} key={errors.time}>{errors.body}</li>
        ))}
      </ul>
    </div>
  )
}

Errors.propTypes = {
  errors: PropTypes.arrayOf(
      PropTypes.shape({
        body: PropTypes.string,
        time: PropTypes.date,
      })),
}

export default Errors
