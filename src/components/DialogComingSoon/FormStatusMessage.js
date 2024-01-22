import React from 'react'
import PropTypes from 'prop-types'

const FormStatusMessage = props => (
    <p
        className={props.styles}
        id={props.id}
        tabIndex='-1'
        dangerouslySetInnerHTML={{ __html: props.statusMessage   }}
    />
)

FormStatusMessage.defaultName = 'FormStatusMessage'

FormStatusMessage.propTypes = {
    styles: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    statusMessage: PropTypes.string.isRequired
}

export default FormStatusMessage