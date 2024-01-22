import React from 'react'
import PropTypes from 'prop-types'

import '../../assets/scss/form-errors/styles.scss'
import styles from '../../assets/scss/form-errors/styles.module.scss'

import { focusError } from '../../utils/form-focus-error'

const renderErrors = (error, i) => {
    const { message, focus } = error
    return (
        <li
            key={`errorMessage-${i}`}
            className={`formErrorList__errorList__error`}
        >
            <a
                href={`#${focus}`}
                className={`formErrorList__errorList__error__anchor ${styles.formErrorList__errorList__error__anchor}`}
                onClick={e => focusError(e, focus)}
            >
                {message}
            </a>
        </li>
    )
}

const FormErrorList = props => {
    const { formId, errorMessages, inDialog } = props
    // const errors = Object.entries(errorMessages).filter(([ key, val ]) => !!val)
    /*
    console.log('%c errors:', 'color: red; font-weight: bold;')
    console.log({ errors })
    */
    /*
    console.log('%c errorMessages:', 'color: purple; font-weight: bold;')
    console.log(errorMessages)
    */


    if (errorMessages.length > 0) {
        return (
            <div className={`formErrorList ${styles.formErrorList}${errorMessages.length > 0 ? ' formErrorList--error' : ''}`}>
                <p
                    className={`formErrorList__alert ${styles.formErrorList__alert}`}
                    id={`${formId}-p`}
                    role='alert'
                    tabIndex={inDialog ? '0' : '-1'}
                >
                    <strong>The form has the following errors that must be corrected:</strong>
                </p>
                <ul className={`formErrorList__errorList`}>
                    {
                        errorMessages.map((error, i) => renderErrors(error, i))
                    }
                </ul>
            </div>
        )
    } else {
       return null
   }
}

FormErrorList.defaultName = 'FormErrorList'

FormErrorList.defaultProps = {
    errorMessages: [],
    inDialog: false
}

FormErrorList.propTypes = {
    formId: PropTypes.string.isRequired,
    errorMessages: PropTypes.array,
    inDialog: PropTypes.bool
}

export default FormErrorList;