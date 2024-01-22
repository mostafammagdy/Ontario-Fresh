import React from 'react'
import PropTypes from 'prop-types'

const Hamburger = props => {
    const { className } = props
    return (
        <svg
            className={className}
            viewBox='0 0 24 24'
        >
            <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
        </svg>
    )
}

Hamburger.defaultName = 'Hamburger'

Hamburger.defaultProps = {
    className: 'hamburger'
}

Hamburger.propTypes = {
    className: PropTypes.string
}

export default Hamburger