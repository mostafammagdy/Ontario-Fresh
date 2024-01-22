import React from 'react'
import PropTypes from 'prop-types'

const SpinnerCircle = props => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 112.95 112.95"
        className={props.svgClassName}
    >
	    <path
            className={props.pathClassName}
            d="M56.48,113A56.55,56.55,0,0,1,0,56.47H12a44.48,44.48,0,1,0,89,0c0-15.58-8-26-14.75-31.95C77.75,17,66.57,12.35,56.27,12l.41-12C83.86.94,113,23.85,113,56.47A56.54,56.54,0,0,1,56.48,113Z"
        />
    </svg>
)

SpinnerCircle.defaultName = 'SpinnerCircle'

SpinnerCircle.propTypes = {
    svgClassName: PropTypes.string.isRequired,
    pathClassName: PropTypes.string.isRequired
}

export default SpinnerCircle