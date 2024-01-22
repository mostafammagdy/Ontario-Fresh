import React from 'react'
import PropTypes from 'prop-types'

const InputRadioChecked = props => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        className={props.svgClassName}
    >
        <rect
            className="background"
            width="20"
            height="20"
        />
        <circle
            className="check"
            cx="10"
            cy="10"
            r="4"
        />
    </svg>
)

InputRadioChecked.defaultName = 'InputRadioChecked'

InputRadioChecked.defaultProps = {
    svgClassName: 'radioButtonChecked'
}

InputRadioChecked.propTypes = {
    svgClassName: PropTypes.string.isRequired
}

export default InputRadioChecked