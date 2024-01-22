import React from 'react'
import MediaQuery from 'react-responsive'
import { Link, withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import HeaderSearchbar from '../../components/headerSearchbar'
import FlatButton from 'material-ui/FlatButton'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Popover from 'material-ui/Popover'

import { findIndex } from 'lodash'

import cx from '../../utils/class-names'

import MenuIcon from 'material-ui/svg-icons/navigation/menu'

import OntarioFreshLogo from '../../assets/images/ontario-fresh-logo.png'

import { logoutRequest } from '../../utils/client/actions'
import { basicProfileRequest } from '../../containers/profile/actions'
import { unreadMessagesRequest } from '../../containers/messages/actions'

import styles from './styles.module.scss'

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false,
    };
  }

  handleMenuOpen = (event) => {
    event.preventDefault();

    this.setState({
      menuOpen: true,
      menuAnchor: event.currentTarget,
    });
  }

  handleMenuClose = () => {
    this.setState({
      menuOpen: false,
    });
  }

  UNSAFE_componentWillMount() {
    const {
      basicProfileRequest,
      unreadMessagesRequest,
      client,
    } = this.props

    if (client && client.token) {
      const fullProfileNeededList = ['/shipping']
      if (window.location && window.location.href && findIndex(fullProfileNeededList, path => window.location.href.includes(path)) !== -1) {
        basicProfileRequest(client, false)
      } else {
        basicProfileRequest(client)
      }
      unreadMessagesRequest(client)
    }
  }

  static propTypes = {
    location: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired,
  }

  handleLogout = () => {
    this.props.logoutRequest();
  }
  
  render() {
    const {
      client,
      profile,
      messages,
    } = this.props

    let loggedIn = !!client.username
    
    return (
      <header className={cx(styles.navBar, styles.offTop)} style={{boxShadow: "0 1px 2px 0 rgba(0,0,0,.2)"}}>
        <div className={cx(styles.navContainer, styles.darkText)}>
          <div className={styles.headerItem} style={{minWidth: 180}}>
            {/*
            <Link
              to="/"
              style={{ textDecoration: 'none' }}
              id='headerLogo'
            >
            */}
              <img style={{ height: 52, margin: '-1rem 0' }} alt="OntarioFresh.ca Logo" src={OntarioFreshLogo} />
            {/* </Link> */}
          </div>
          {/*
            View for the following conditions:
              • If the user isn't logged in and their viewport is less than 685px wide
              • If the user is logged in, the user is a manager and their viewport is less than 1335px wide
              • If the user is logged in, the user isn’t a manager and their viewport is less than 1120px wide

            This is the “smaller” view
          */}
          <MediaQuery maxWidth={!loggedIn ? 684 : (profile.authed && profile.authed.is_manager) ? 1334 : 1119}>
            <div className={styles.headerItem} style={{width: "100%", justifyContent: "flex-end"}}>
              <IconMenu
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                iconButtonElement={
                  <IconButton touch={true}>
                    <MenuIcon />
                  </IconButton>
                }
                open={this.state.menuOpen}
                onClick={this.handleMenuOpen}
                onRequestChange={this.handleMenuClose}
              >
                {
                  loggedIn ?
                      <Menu>
                        <Link
                          onClick={this.handleMenuClose}
                          to="/shipping"
                          style={{textDecoration: 'none'}}
                        >
                          <MenuItem
                            primaryText="Shipping Calculator"
                            style={{ borderRadius: "5px", backgroundColor:"rgb(0, 112, 60)", color: "white"}}
                          />
                        </Link>
                        <Link
                          onClick={this.handleMenuClose}
                          to="/search"
                        >
                          <MenuItem primaryText="Search" />
                        </Link>
                        <Link
                          onClick={this.handleMenuClose}
                          to="/search/classifieds"
                        >
                          <MenuItem primaryText="Classifieds" />
                        </Link>
                        <Link
                          onClick={this.handleMenuClose}
                          to="/dashboard"
                        >
                          <MenuItem primaryText="Dashboard" />
                        </Link>
                        <Link
                          onClick={this.handleMenuClose}
                          to="/messages"
                        >
                          <MenuItem primaryText="Messages" />
                        </Link>
                        {
                          profile.authed && profile.authed.is_manager &&
                            <Link
                              onClick={this.handleMenuClose}
                              to="/profile-manager"
                            >
                              <MenuItem primaryText="Manage Membership" />
                            </Link>
                        }
                        <Link
                          onClick={this.handleMenuClose}
                          to="/profile"
                        >
                          <MenuItem primaryText="Edit Profile" />
                        </Link>
                        <Link
                          onClick={this.handleMenuClose}
                          to="/settings"
                        >
                          <MenuItem primaryText="Settings" />
                        </Link>
                        <MenuItem
                          primaryText="Log Out"
                          onClick={() => {this.handleMenuClose(); this.handleLogout()}}
                        />
                      </Menu>
                    :
                    <Menu>
                      <Link
                        onClick={this.handleMenuClose}
                        to="/search"
                      >
                        <MenuItem primaryText="Search" />
                      </Link>
                      <Link
                        onClick={this.handleMenuClose}
                        to="/register"
                        style={{textDecoration: 'none'}}
                      >
                        <MenuItem
                          primaryText="Register"
                          style={{color: "rgb(0, 112, 60)"}}
                        />
                      </Link>
                      <Link
                        onClick={this.handleMenuClose}
                        to="/login"
                      >
                        <MenuItem primaryText="Log In" />
                      </Link>
                    </Menu>
                }
              </IconMenu>
            </div>
          </MediaQuery>
          {/*
            View for the following conditions:
              • If the user isn't logged in and their viewport is greater than 684px wide
              • If the user is logged in, the user is a manager and their viewport is greater than 1334px wide
              • If the user is logged in, the user isn’t a manager and their viewport is greter than 1119px wide

            This is the “larger” view
          */}
          <MediaQuery minWidth={!loggedIn ? 685 : (profile.authed && profile.authed.is_manager) ? 1335 :  1120}>
            {
              loggedIn ?
                  <div style={{ justifyContent: "flex-end", flexGrow:1, display:"flex" }}>
                    {
                      window.location && window.location.href && !window.location.href.includes('/search') && window.location.pathname !== '/' &&
                        <HeaderSearchbar />
                    }
                    <Link
                      onClick={this.handleMenuClose}
                      to="/shipping"
                    >
                      <FlatButton
                        label="Shipping Calculator"
                        labelStyle={{ color: "white" }}
                        backgroundColor="rgb(0, 112, 60)"
                        style={{ lineHeight: "auto", borderRadius: 4, minWidth: 187 }}
                      />
                    </Link>
                    <Link
                      onClick={this.handleMenuClose}
                      to="/search/classifieds"
                    >
                      <FlatButton
                        secondary
                        label="Classifieds"
                        style={{ lineHeight: "auto", minWidth: 117 }}
                      />
                    </Link>
                    {/*
                      <Link to="/profile">
                        <FlatButton secondary label="My Profile" />
                      </Link>
                    */}
                    <Link
                      onClick={this.handleMenuClose}
                      to="/messages"
                    >
                      <FlatButton
                        secondary
                        label={`Messages (${(messages.unread && messages.unread.conversations_count) || 0})`}
                        style={{ lineHeight: "auto", minWidth: 123 }}
                      />
                    </Link>
                    {
                      profile.authed && profile.authed.is_manager &&
                        <Link
                          onClick={this.handleMenuClose}
                          to="/profile-manager"
                        >
                          <FlatButton
                            secondary
                            label="Manage Membership"
                            style={{ lineHeight: "auto", minWidth: 184 }}
                          />
                        </Link>
                    }
                    <FlatButton
                      secondary
                      label="Account"
                      onClick={this.handleMenuOpen}
                      style={{ lineHeight: "auto", minWidth: 98 }}
                    />
                    <Popover
                      open={this.state.menuOpen}
                      anchorEl={this.state.menuAnchor}
                      anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                      targetOrigin={{horizontal: 'right', vertical: 'top'}}
                      onRequestClose={this.handleMenuClose}
                    >
                      <Menu>
                        <Link
                          onClick={this.handleMenuClose}
                          to="/dashboard"
                        >
                          <MenuItem primaryText="Dashboard" />
                        </Link>
                        <Link
                          onClick={this.handleMenuClose}
                          to="/profile"
                        >
                          <MenuItem primaryText="Edit Profile" />
                        </Link>
                        <Link
                          onClick={this.handleMenuClose}
                          to="/settings"
                        >
                          <MenuItem primaryText="Settings" />
                        </Link>
                        <MenuItem
                          primaryText="Logout"
                          onClick={() => {this.handleMenuClose(); this.handleLogout()}}
                        />
                      </Menu>
                    </Popover>
                  </div>
                :
                <div style={{ justifyContent: "flex-end", flexGrow: 1, display: "flex" }}>
                  {
                    window.location && window.location.href && !window.location.href.includes('/search') && window.location.pathname !== '/' &&
                      <HeaderSearchbar />
                  }
                  <Link
                    onClick={this.handleMenuClose}
                    to="/register"
                  >
                    <div style={{ borderStyle: 'solid', borderColor: 'rgb(0, 112, 60)', borderRadius: '2px'}}>
                      <FlatButton
                        labelStyle={{color:"rgb(0, 112, 60)"}}
                        label="Register"
                        style={{ lineHeight: "auto", borderRadius: 4 }}
                      />
                    </div>
                  </Link>
                  <Link
                    onClick={this.handleMenuClose}
                    to="/login"
                  >
                    <FlatButton
                      secondary
                      label="Log In"
                      style={{ lineHeight: "auto" }}
                    />
                  </Link>
                </div>
            }
          </MediaQuery>

        </div>
      </header>
    )
  }
}

const mapStateToProps = state => ({
  client: state.client,
  profile: state.profile,
  messages: state.messages,
})

export default compose(
  withRouter,
  connect(mapStateToProps, {
    basicProfileRequest,
    unreadMessagesRequest,
    logoutRequest,
  })
)(Header)