import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import styles from './styles.module.scss'

import Tooltip from '../Tooltip'

const FormTrailingLink = props => {
    const { route, label, tooltip } = props
    return (
        <div className={styles.trailingLink}>
            <div className={styles.trailingLink__container}>
                <Link
                    to={route}
                    className={styles.trailingLink__link}
                >
                    {label}
                </Link>
                {
                    tooltip &&
                        <Tooltip
                            id={tooltip.id}
                            tip={tooltip.tip}
                            currentTooltip={tooltip.currentTooltip}
                            setCurrentTooltip={tooltip.setCurrentTooltip}
                            tooltipOffsetElementId={tooltip.tooltipOffsetElementId}
                        />
                }
            </div>
        </div>
    )
}

FormTrailingLink.defaultName = 'FormTrailingLink'

FormTrailingLink.defaultProps = {}

FormTrailingLink.propTypes = {
    route: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    tooltip: PropTypes.shape({
        id: PropTypes.string.isRequired,
        tip: PropTypes.string.isRequired,
        currentTooltip: PropTypes.string.isRequired,
        setCurrentTooltip: PropTypes.func.isRequired,
        tooltipOffsetElementId: PropTypes.string.isRequired
    })
}

export default FormTrailingLink