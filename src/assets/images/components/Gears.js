import React from 'react'
import PropTypes from 'prop-types'

const Gears = props => {
    const { className } = props
    return (
        <svg
            className={className}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 298 298'
        >
            <path
                d='M298,165.2v-35.7l-32.4-11.9c-2.8-10.9-6.6-21.2-12.2-30.7l0.3,0l15.4-32.2l-25.2-25.3l-32.1,15.3l0,0
                c-9.5-5.6-19.8-9.2-30.7-12L169.2,0h-35.7l-11.9,32.8c-10.9,2.8-21.2,6.8-30.7,12.4l0-0.2L58.7,29.5L33.4,54.7l15.3,32.1l0.1,0
                c-5.6,9.5-11.2,19.8-14,30.7L0,129.5v35.7l34.8,11.9c2.8,10.9,7.8,21.2,13.4,30.7l0.2,0L33.2,240l25.3,25.3L90.8,250l0.1,0
                c9.5,5.6,19.8,10.8,30.7,13.7l11.9,34.4h35.7l11.9-34.4c10.9-2.8,21.2-7.6,30.7-13.2l0-0.2l32.2,15.2l25.3-25.3L254,207.9l0-0.1
                c5.6-9.5,8.8-19.8,11.7-30.7L298,165.2z M151.3,206.9c-32.9,0-59.6-26.7-59.6-59.6c0-32.9,26.7-59.6,59.6-59.6
                c32.9,0,59.6,26.7,59.6,59.6C210.9,180.2,184.2,206.9,151.3,206.9z'
            />
        </svg>
    )
}

Gears.defaultName = 'Gears'

Gears.defaultProps = {
    className: 'gears'
}

Gears.propTypes = {
    className: PropTypes.string
}

export default Gears