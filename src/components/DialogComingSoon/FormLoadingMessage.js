import React from 'react'
import PropTypes from 'prop-types'

import SpinnerCircle from '../../assets/images/components/SpinnerCircle'

const FormLoadingMessage = props => (
    <div
        className={props.formLoadingMessageStyles}
    >
        <div
            className={props.spinnerContainerStyles}
        >
            <SpinnerCircle
                svgClassName={props.svgStyles}
                pathClassName={props.pathStyles}
            />
        </div>
        <p
            className={props.messageStyles}
            id={props.messageId}
            tabIndex='-1'
        >
            {props.message}
        </p>
    </div>
)

FormLoadingMessage.defaultName = 'FormLoadingMessage'

FormLoadingMessage.defaultProps = {
    message: 'Submitting...'
}

FormLoadingMessage.propTypes = {
    formLoadingMessageStyles: PropTypes.string.isRequired,
    spinnerContainerStyles: PropTypes.string.isRequired,
    svgStyles: PropTypes.string.isRequired,
    pathStyles: PropTypes.string.isRequired,
    messageStyles: PropTypes.string.isRequired,
    messageId: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
}

export default FormLoadingMessage