import React from 'react'
import PropTypes from 'prop-types'

const DragAndDrop = props => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 13.98"
        className={props.svgClassName}
    >
        <polygon points="10 11.57 14.7 6.89 14.42 6.61 10.2 10.81 10.2 0 9.8 0 9.8 10.81 5.58 6.61 5.3 6.89 10 11.57"/>
        <polygon points="19.6 10.52 19.6 13.59 0.4 13.59 0.4 10.52 0 10.52 0 13.59 0 13.98 0.4 13.98 19.6 13.98 20 13.98 20 13.59 20 10.52 19.6 10.52"/>
    </svg>
)

DragAndDrop.defaultName = 'DragAndDrop'

DragAndDrop.defaultProps = {
    svgClassName: 'dragAndDrop'
}

DragAndDrop.propTypes = {
    svgClassName: PropTypes.string.isRequired
}

export default DragAndDrop