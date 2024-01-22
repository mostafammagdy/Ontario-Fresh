import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.module.scss'
import './styles.scss'

import Gears from '../../../../../assets/images/components/Gears'

const SettingsIcon = props => {
    return (
        <span className={`${styles.headerHub__icon} headerHub__icon`}>
            <Gears />
        </span>
    )
}

SettingsIcon.defaultName = 'SettingsIcon'

SettingsIcon.defaultProps = {}

SettingsIcon.propTypes = {}

export default SettingsIcon