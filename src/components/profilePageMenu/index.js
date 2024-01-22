import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Link, withRouter } from 'react-router'

import AboutIcon from 'material-ui/svg-icons/action/info'
import ContactIcon from 'material-ui/svg-icons/communication/contact-phone'
import PhotosIcon from 'material-ui/svg-icons/image/photo-library'
import ClassifiedsIcon from 'material-ui/svg-icons/action/book'

import styles from './styles.module.scss'

const iconStyles = {
  display: 'inline-block',
  color: '#6D6F7B',
  userSelect: 'none',
  transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
  verticalAlign: 'middle',
  marginRight: 6,
  marginTop: -2,
  width: 24,
  height: 24,
  viewBox: '0, 0, 24, 24',
}

class ProfilePageMenu extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      path: null
    }
  }

  setBaseUrl = () => {
    const {
      params
    } = this.props

    // let path = params.slug ? `/profiles/${params.slug}` : window.location.pathname.startsWith('/viewProfile') ? "/viewProfile" : "/profile"
    let path = params.slug ?
        `/profiles/${params.slug}`
      : window.location.pathname.startsWith('/viewProfile') ?
          "/viewProfile"
        : "/profile"
    this.setState({
      path
    })
  }

  UNSAFE_componentWillMount() {
    this.setBaseUrl()
  }

  componentDidUpdate(prevProps) {
    window.scrollTo(0, 0)
    if ((this.props.params.slug !== prevProps.params.slug) || (this.props.location.pathname !== prevProps.location.pathname)) {
      this.setBaseUrl()
    }
  }

  render() {
    const {
      path
    } = this.state
    const {
      disabled
    } = this.props

    return (
      <div style={{ padding: '2rem 0' }}>
        <Link
          activeClassName={styles.active}
          className={styles.profileLink}
          to={disabled ? undefined : `${path}/`}
        >
          <h4 className={styles.sideMenuItem}><AboutIcon style={iconStyles} /> About</h4>
        </Link>
        <Link
          activeClassName={styles.active}
          className={styles.profileLink}
          to={disabled ? undefined : `${path}/contact`}
        >
          <h4 className={styles.sideMenuItem}><ContactIcon style={iconStyles} /> Contact</h4>
        </Link>
        <Link
          activeClassName={styles.active}
          className={styles.profileLink}
          to={disabled ? undefined : `${path}/photos`}
        >
          <h4 className={styles.sideMenuItem}><PhotosIcon style={iconStyles} /> Photos</h4>
        </Link>
        <Link
          activeClassName={styles.active}
          className={styles.profileLink}
          to={disabled ? undefined : `${path}/classifieds`}
        >
          <h4 className={styles.sideMenuItem}><ClassifiedsIcon style={iconStyles} /> Classifieds</h4>
        </Link>
    </div>
    )
  }
}

const mapStateToProps = state => ({
})

export default compose(
  withRouter,
  connect(mapStateToProps)
)(ProfilePageMenu)