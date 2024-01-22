import React, { Fragment, useState, useRef, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.module.scss'
import './styles.scss'

import NavigationItem from './NavigationItem'
import Hamburger from '../../../assets/images/components/Hamburger'
import MessagesIcon from './NavigationItem/icons/MessagesIcon'
import SettingsIcon from './NavigationItem/icons/SettingsIcon'

// const NAVIGATION_TABLET_BREAKPOINT = 845
const NAVIGATION_DESKTOP_BREAKPOINT = 1024
const FIRST_NAVIGATION_LINK_ID = 'headerNavigation-firstLink'

const NAVIGATION_ITEMS = [
    /*
    {
        navItemLiClass: 'viewB2bProfile',
        routePath: '/profile',
        navItemRouteClass: 'viewB2bProfile',
        text: 'View B2B Profile'
    },
    {
        navItemLiClass: 'viewB2cProfile',
        routePath: '/dontclick',
        navItemRouteClass: 'viewB2cProfile',
        text: 'View B2C Profile'
    },
    */
    {
        navItemLiClass: 'myProfileHub',
        routePath: '/profile-hub',
        elementToFocus: 'profileHub-title',
        navItemRouteClass: 'myProfileHub',
        text: 'My Profile Hub'
    },
    {
        navItemLiClass: 'activityFeed',
        routePath: '/dashboard',
        navItemRouteClass: 'activityFeed',
        text: 'Activity Feed'
    },
    {
        navItemLiClass: 'classifieds',
        routePath: '/search/classifieds',
        navItemRouteClass: 'classifieds',
        text: 'Classifieds'
    },
    {
        navItemLiClass: 'shipping',
        routePath: '/shipping',
        navItemRouteClass: 'shipping',
        text: 'Shipping'
    },
    {
        navItemLiClass: 'manageMembership',
        routePath: '/profile-manager',
        navItemRouteClass: 'manageMembership',
        text: 'Manage Membership'
    },
    {
        navItemLiClass: 'messages',
        routePath: '/messages',
        navItemRouteClass: 'messages',
        Icon: MessagesIcon,
        text: 'Messages'
    },
    {
        navItemLiClass: 'settings',
        routePath: '/settings',
        navItemRouteClass: 'settings',
        Icon: SettingsIcon,
        text: 'Settings'
    },
    {
        navItemLiClass: 'logout',
        routePath: '/dontclick',
        text: 'Logout'
    },
]

const HeaderHubNavigation = ({ handleLogout, isManager }) => {
    const [ showNavigation, setShowNavigation ] = useState(false)
    const [ windowWidth, setWindowWidth ] = useState(0)

    const menu = useRef(null)
    const nav = useRef(null)

    const showHideNavigation = event => {
        event.preventDefault()
        const navigationVisible = !showNavigation ? true : false
        setShowNavigation(navigationVisible)
        if (navigationVisible) {
            setTimeout(() => {
                document.getElementById(FIRST_NAVIGATION_LINK_ID).focus()
            }, 1)
        }
    }

    const closeNavigation = () => {
        if (windowWidth < NAVIGATION_DESKTOP_BREAKPOINT)
            setShowNavigation(false)
    }

    const blurNavigation = () => {
        setTimeout(() => {
            if (!nav.current?.contains(document.activeElement) && windowWidth < NAVIGATION_DESKTOP_BREAKPOINT) {
                setShowNavigation(false)
                if (menu && menu.current)
                    menu.current.focus()
            }
        }, 150)
    }

    const showHideNavigationBasedOnWindowWidth = () => {
        setWindowWidth(window.innerWidth)
        const trueWindowWidth = windowWidth > 0 ? windowWidth : window.innerWidth
        const showNavigationSetting = (trueWindowWidth >= NAVIGATION_DESKTOP_BREAKPOINT) ?
                true
            : (trueWindowWidth < NAVIGATION_DESKTOP_BREAKPOINT && nav.current.contains(document.activeElement)) ?
                    true
                : false
        setShowNavigation(showNavigationSetting)
    }

    useLayoutEffect(() => {
        setWindowWidth(window.innerWidth)
        showHideNavigationBasedOnWindowWidth()
        window.addEventListener('resize', showHideNavigationBasedOnWindowWidth)
        return () => window.removeEventListener('resize', showHideNavigationBasedOnWindowWidth)
    }, [])

    return (
        <Fragment>
            <button
                className={styles.headerHub__menu}
                ref={menu}
                onClick={e => showHideNavigation(e)}
                aria-labelledby='header-menu-label'
                aria-controls='headerHub-navigation-mobile'
                aria-expanded={showNavigation ? true : false}
            >
                <Hamburger />
                <p
                    className={styles.headerHub__label}
                    id='header-menu-label'
                    aria-hidden={true}
                >
                    Menu
                </p>
            </button>
            <nav
                className={`${styles.headerHub__navigation}${showNavigation ? ' ' + styles['headerHub__navigation--open'] : ''}`}
                id='headerHub-navigation-mobile'
                ref={nav}
                onBlur={blurNavigation}
            >
                <ul className={styles.headerHub__ul}>
                    {
                        NAVIGATION_ITEMS.map((navItem, i) => {
                            const { navItemLiClass, routePath, elementToFocus, navItemRouteClass, Icon, text } = navItem
                            if (navItemLiClass === 'manageMembership' && !isManager) return
                            return (
                                <NavigationItem
                                    key={`headerNavigationItem-${i}`}
                                    navItemLiClass={navItemLiClass}
                                    routePath={routePath}
                                    elementToFocus={elementToFocus || null}
                                    navItemRouteClass={navItemRouteClass}
                                    firstNavLiId={i === 0 ? FIRST_NAVIGATION_LINK_ID : null}
                                    closeNavigation={closeNavigation}
                                    handleLogout={navItemLiClass === 'logout' ? handleLogout : null}
                                    Icon={Icon}
                                    text={text}
                                />
                            )
                        })
                    }
                </ul>
            </nav>
        </Fragment>
    )
}

HeaderHubNavigation.defaultName = 'HeaderHubNavigation'

HeaderHubNavigation.defaultProps = {}

HeaderHubNavigation.propTypes = {
    handleLogout: PropTypes.func.isRequired,
    isManager: PropTypes.bool.isRequired
}

export default HeaderHubNavigation