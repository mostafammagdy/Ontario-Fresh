import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

const FormConfirmationMessage = props => {
    const { id, message, link } = props
    return (
        <Fragment>
            <p
                id={`${id}-message`}
                tabIndex='-1'
            >
                {message}
            </p>
            {
                !!link &&
                    <p>
                        <Link to={link.to}>
                            {link.text}
                        </Link>
                    </p>
            }
        </Fragment>
    )
}

FormConfirmationMessage.defaultName = 'FormConfirmationMessage'

FormConfirmationMessage.defaultProps = {}

FormConfirmationMessage.propTypes = {
    id: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    link: PropTypes.shape({
        to: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    })
}

export default FormConfirmationMessage