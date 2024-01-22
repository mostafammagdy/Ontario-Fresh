import React from 'react'
import PropTypes from 'prop-types'

import styles from './style.module.scss'

const FormErrorMessage = props => {
    const { id, errorMessage, errorMessageStyles } = props
    return (
        <p
            className={`formErrorMessage ${styles.formErrorMessage}`}
            id={`${id}-desc`}
            aria-hidden='true'
        >
            <strong>{errorMessage}</strong>
        </p>
    )
}

FormErrorMessage.defaultName = 'FormErrorMessage'

FormErrorMessage.propTypes = {
    id: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
    errorMessageStyles: PropTypes.string
}

export default FormErrorMessage