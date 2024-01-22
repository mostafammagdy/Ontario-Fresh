import React from 'react'
import PropTypes from 'prop-types'
import { focusError } from '../../utils/form-focus-error'

const FormErrorMessageSingle = props => {
    const { anchor, id, message } = props
    return (
        <a
            href={`#${anchor}`}
            id={`${id}-formPostSubmittingError-message`}
            onClick={e => focusError(e, anchor)}
        >
            {message}
        </a>
    )
}

FormErrorMessageSingle.defaultName = 'FormErrorMessageSingle'

FormErrorMessageSingle.defaultProps = {}

FormErrorMessageSingle.propTypes = {
     anchor: PropTypes.string.isRequired,
     id: PropTypes.string.isRequired,
     message: PropTypes.string.isRequired
}

export default FormErrorMessageSingle