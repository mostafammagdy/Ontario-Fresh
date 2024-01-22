import React from 'react'
import PropTypes from 'prop-types'

const InputCheckboxChecked = props => (
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
        <path
            className="check"
            d="M9.37,17.22l-6.31-5A1.5,1.5,0,0,1,4.94,9.83l3.69,2.95,6.1-9.59a1.51,1.51,0,0,1,2.54,1.62Z"
        />
    </svg>
)

InputCheckboxChecked.defaultName = 'InputCheckboxChecked'

InputCheckboxChecked.defaultProps = {
    svgClassName: 'checkboxButtonChecked'
}

InputCheckboxChecked.propTypes = {
    svgClassName: PropTypes.string.isRequired
}

export default InputCheckboxChecked