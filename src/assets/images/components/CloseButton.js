import React from 'react'
import PropTypes from 'prop-types'

const CloseButton = props => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 36.04 36.04"
        className={props.svgClassName}
    >
        <path
            d="M20.85,18,35.45,3.41a2,2,0,0,0,0-2.82,2,2,0,0,0-2.82,0L18,15.19,3.41.59A2,2,0,0,0,.59.59a2,2,0,0,0,0,2.82L15.19,18,.59,32.63a2,2,0,0,0,0,2.82,2,2,0,0,0,2.82,0L18,20.85l14.61,14.6a2,2,0,1,0,2.82-2.82Z"
        />
    </svg>
)

CloseButton.defaultName = 'CloseButton'

CloseButton.defaultProps = {
    svgClassName: 'closeButton'
}

CloseButton.propTypes = {
    svgClassName: PropTypes.string.isRequired
}

export default CloseButton