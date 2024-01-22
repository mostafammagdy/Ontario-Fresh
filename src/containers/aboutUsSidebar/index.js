import React, { Component } from 'react'
import { Link } from 'react-router'
import styles from './styles.module.scss'

import InfoIcon from 'material-ui/svg-icons/action/info'
import DeviceHubIcon from 'material-ui/svg-icons/hardware/device-hub'
import NewReleasesIcon from 'material-ui/svg-icons/av/new-releases'
import SatelliteIcon from 'material-ui/svg-icons/maps/satellite'
//import AccountBalanceIcon from 'material-ui/svg-icons/action/account-balance'
//import ClassIcon from 'material-ui/svg-icons/action/class'

const iconStyles = {
  display: 'inline-block',
  color: 'rgba(0, 0, 0, 0.87)',
  userSelect: 'none',
  transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
  verticalAlign: 'middle',
  marginRight: 6,
  marginTop: -2,
  width: 24,
  height: 24,
  viewBox: '0, 0, 24, 24',
}

class SideBar extends Component {
  UNSAFE_componentWillMount() {
    document.body.style.backgroundColor = "#F5F4F5";
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = null;
  }

  render () {
    return (<div style={{ padding: '2rem 0' }}>
              <Link activeClassName={styles.active} className={styles.profileLink} to={`/about-us`}>
                <h4 className={styles.sideMenuItem}><InfoIcon style={iconStyles} /> About Us</h4>
              </Link>
              <Link activeClassName={styles.active} className={styles.profileLink} to={`/about-us/meet-our-partners`}>
                <h4 className={styles.sideMenuItem}><DeviceHubIcon style={iconStyles} /> Meet Our Partners!</h4>
              </Link>
              <Link activeClassName={styles.active} className={styles.profileLink} to={`/key-features`}>
                <h4 className={styles.sideMenuItem}><NewReleasesIcon style={iconStyles} /> Key Features</h4>
              </Link>
              <Link activeClassName={styles.active} className={styles.profileLink} to={`/about-greenbelt-fund`}>
                <h4 className={styles.sideMenuItem}><SatelliteIcon style={iconStyles} /> About the Greenbelt Fund</h4>
              </Link>
              {/*
              <Link activeClassName={styles.active} className={styles.profileLink} to={`/about-greenbelt-fund/market-access-grant-stream`}>
                <h4 className={styles.sideMenuItem}><AccountBalanceIcon style={iconStyles} /> Market Access Grant Stream</h4>
              </Link>
              <Link activeClassName={styles.active} className={styles.profileLink} to={`/about-greenbelt-fund/local-food-literacy-grant-stream`}>
                <h4 className={styles.sideMenuItem}><ClassIcon style={iconStyles} /> Local Food Literacy Grant Stream</h4>
              </Link>
              */}
            </div>
    )
  }
}

export default SideBar
