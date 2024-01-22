import React, { useState, useRef, useLayoutEffect } from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'

import styles from './styles.module.scss'
// import './styles.scss'

import HeaderHubNavigation from './headerHubNavigation'

import OntarioFreshLogo from '../../assets/images/ontario-fresh-logo.png'

const HeaderHub = ({ handleLogout, isManager }) => {
    return (
        <header className={styles.headerHub}>
            <div className={styles.headerHub__top}>
                <div className={styles.headerHub__maxWidth}>
                    <div className={styles.headerHub__container}>
                        {/*
                        <Link
                            to='/'
                            className={styles.headerHub__logo}
                            id='headerLogo'
                            aria-labelledby='headerHub-homeLink-label'
                        >
                        */}
                            {/*
                            <p
                                className={styles.headerHub__label}
                                id='headerHub-homeLink-label'
                                aria-hidden={true}
                            >
                                Return to home page
                            </p>
                            */}
                            <img style={{ height: 52, margin: '-1rem 0' }} alt="OntarioFresh.ca Logo" src={OntarioFreshLogo} />
                        {/* </Link> */}
                        <HeaderHubNavigation
                            handleLogout={handleLogout}
                            isManager={isManager}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.headerHub__bottom}>&nbsp;</div>
        </header>
    )
}

HeaderHub.defaultName = 'HeaderHub'

HeaderHub.defaultProps = {
    isManager: false
}

HeaderHub.propTypes = {
    handleLogout: PropTypes.func.isRequired,
    isManager: PropTypes.bool
}

export default HeaderHub