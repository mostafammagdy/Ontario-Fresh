import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import styles from './styles.module.scss'
import './styles.scss'

const NavigationItem = props => {
    const { navItemLiClass, routePath, elementToFocus, navItemRouteClass, firstNavLiId, closeNavigation, handleLogout, Icon, text } = props
    return (
        <li className={`${styles.headerHub__li} ${styles[`headerHub__li__${navItemLiClass}`]}`}>
            {
                navItemLiClass === 'logout' ?
                        <button
                            className={`${styles.headerHub__link} headerHub__link`}
                            onClick={e => {
                                e.preventDefault()
                                handleLogout()
                                closeNavigation()
                                if (elementToFocus) {
                                    setTimeout(() => {
                                        document.getElementById(elementToFocus).focus()
                                    }, 1);
                                }
                            }}
                        >
                            {text}
                        </button>
                    :
                    <Link
                        to={routePath}
                        className={`${styles.headerHub__link} headerHub__link${navItemRouteClass ? ' ' + styles[`headerHub__link__${navItemRouteClass}`] + ` headerHub__link__${navItemRouteClass}` : ''}`}
                        activeClassName={`headerHub__link__${navItemRouteClass}--active`}
                        id={firstNavLiId}
                        onClick={() => {
                            closeNavigation()
                            if (elementToFocus) {
                                setTimeout(() => {
                                    document.getElementById(elementToFocus).focus()
                                }, 1);
                            }
                        }}
                    >
                        {
                            Icon &&
                                <Icon />
                        }
                        {text}
                    </Link>
            }
        </li>
    )
}

NavigationItem.defaultName = 'NavigationItem'

NavigationItem.defaultProps = {}

NavigationItem.propTypes = {
    navItemLiClass: PropTypes.string.isRequired,
    routePath: PropTypes.string.isRequired,
    elementToFocus: PropTypes.string,
    navItemRouteClass: PropTypes.string,
    firstNavLiId: PropTypes.string,
    closeNavigation: PropTypes.func.isRequired,
    handleLogout: PropTypes.func,
    Icon: PropTypes.elementType,
    text: PropTypes.string.isRequired
}

export default NavigationItem