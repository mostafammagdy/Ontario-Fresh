import React, { Component } from 'react'
import MediaQuery from 'react-responsive'

import { connect } from 'react-redux'
import { compose } from 'recompose'
import moment from 'moment'
import { Link } from 'react-router'

import { map, some, filter } from 'lodash'
import { Row, Col, Grid } from 'react-flexbox-grid'

import Snackbar from 'material-ui/Snackbar'
import Avatar from 'material-ui/Avatar'
import { List, ListItem } from 'material-ui/List'

import ViewProfileIcon from 'material-ui/svg-icons/action/visibility'
import RaisedButton from 'material-ui/RaisedButton'
import ResizableButton from '../../components/resizableButton'

import StyledCard from '../../components/styledCard'
import Subheader from 'material-ui/Subheader'
import CreateProfileOnBehalfModal from '../createProfileOnBehalfModal'
import MessageAllModal from '../messageAllModal'
import CreateClassifiedModal from '../createClassifiedModal'

import ProfilePlaceholder from '../../assets/images/ontario-fresh-profile-placeholder.jpg'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import FlatButton from 'material-ui/FlatButton'

import InlineLoader from '../../components/inlineLoader'

import {
  connectionRequestsListRequest,
  acceptDenyConnectionRequest
} from '../dashboard/actions'

import { 
  profileRequest,
  managedProfilesRequest,
} from './actions'

import styles from './styles.module.scss'

import cx from '../../utils/class-names'

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

class ProfileManager extends Component {

  UNSAFE_componentWillMount() {
    window.scrollTo(0, 0)
    document.body.style.backgroundColor = "#F5F4F5"
    this.getProfile()

     if (this.props.client && this.props.client.token) {
       this.props.managedProfilesRequest(this.props.client)
       this.props.connectionRequestsListRequest(this.props.client)
    }
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = null
  }

  getProfile = () => {
    const { client, profileRequest, publicProfileRequest, params } = this.props
    /*
    console.log('%c Profile getProfile props:', 'color: blue; font-weight: bold;')
    console.log({ client, profileRequest, publicProfileRequest, params })
    */

    if (params.slug)
      return publicProfileRequest(client, params.slug)
    else if (client && client.token)
      return profileRequest(client)
    return false
  }

  handleSetConnectionRequest = (accept, id) => {
    const {
      client,
      acceptDenyConnectionRequest,
    } = this.props

    if (client && client.token) {
      acceptDenyConnectionRequest(client, { accept, id })
    }
  }

  renderConnectionRequests = (connectionRequestsArray, isOrganization) => map(connectionRequestsArray, (item, key) => {
    const profile = isOrganization ? item.account : item.organization
    return <div key={profile.slug} style={{ borderTop: '1px groove rgba(0, 0, 0, 0.2)', borderBottom: '1px groove rgba(0, 0, 0, 0.2)' }}>
      <Link style={{ 'textDecoration': 'none' }} to={`/profiles/${profile.slug}`}>
        <ListItem
          leftAvatar={<Avatar src={profile.photo_file_name || "invalid_link"} style={{ objectFit: 'cover' }} onError={(e) => { e.target.src = ProfilePlaceholder }} />}
          primaryText={<div className={styles.businessName}>{profile.business_name}</div>}
        />
      </Link>
      <div style={{ borderTop: '1px groove rgba(0, 0, 0, 0.2)' }}>
        <FlatButton
          style={{ color: '#e74c3c', minWidth: 'unset', width: '50%' }}
          secondary
          label="Deny"
          onClick={() => this.handleSetConnectionRequest(false, item.id)}
        />
        <RaisedButton
          style={{ minWidth: 'unset', width: '50%' }}
          buttonStyle={{ borderRadius: 0 }}
          primary
          label='Accept'
          onClick={() => this.handleSetConnectionRequest(true, item.id)}
        />
      </div>
    </div>
  }
  )

  render () {
    const {
      managed,
      messageAll,
      profileOnBehalf,
      createClassified,
      dashboard,
      profile: {
        requesting,
        current: {
          organizations,
          accounts,
        },
        authed: {
          roles,
          is_manager
        }
      }
    } = this.props

    /*
    console.log('%c organizations, accounts:', 'color: red; font-weight: bold;')
    console.log({ organizations, accounts })
    */

    const isOrganization = (roles || []).includes(4)
    const connections = (organizations && accounts) ? (organizations.concat(accounts)).sort((a, b) => b.photo_file_name.length - a.photo_file_name.length || a.business_name.localeCompare(b.business_name)) : []

    /*
    console.log('%c managed.profiles.results, connections:', 'color: blue; font-weight: bold;')
    console.log({ managedProfilesResults: managed.profiles.results, connections })
    */

    return !requesting && is_manager ? (
      <div className={styles.profileManagePageContainer}>
        <Grid fluid>
          <Row>
            <Col xs>
              <Row>
                <Col>
                  <h1 style={{ fontSize: '1.125rem', marginBottom: 0 }}>Profile Manager Dashboard</h1>
                </Col>
              </Row>

              <Row>
                <Col xs={6}>
                  <Row>
                    <Col xs={12} sm={6} className={styles.dashboardColumnWithBorder}>
                      <Link to={`/viewProfile`}>
                        <span className={styles.profileLink}><ViewProfileIcon style={iconStyles} />View Profile</span>
                      </Link>
                    </Col>
                    <Col xs={12} sm={6} className={styles.dashboardColumnWithBorder}>
                      <CreateProfileOnBehalfModal textLinkWithIcon />
                    </Col>
                  </Row>
                </Col>
                <Col xs={6}>
                  <Row>
                    <Col xs={12} sm={6} className={styles.dashboardColumn}>
                      <MessageAllModal textLinkWithIcon />
                    </Col>
                  </Row>
                </Col>
              </Row>

              <MediaQuery maxWidth={767}>
                <Row>
                  <Col xs={12} sm={3}>
                    <StyledCard
                      cardTitle={<span style={{ fontSize: '1.125rem' }}>Connection Requests</span>}
                      cardText={
                        requesting ?
                          <InlineLoader />
                          :
                          <div>
                            <Subheader key="requestDescription" style={{ lineHeight: '18px' }}>The following <strong>Ontario</strong><em>fresh</em>.ca user(s) want to connect with you!</Subheader>
                            {dashboard.connection_requests.connection_requests_as_recipient && dashboard.connection_requests.connection_requests_as_recipient.length > 0 ?
                              <List style={{ marginLeft: -16, marginRight: -16 }}>
                                {
                                  some(dashboard.connection_requests.connection_requests_as_recipient, 'manage') &&
                                  this.renderConnectionRequests(filter(dashboard.connection_requests.connection_requests_as_recipient, ('manage')), isOrganization)
                                }
                                {
                                  some(dashboard.connection_requests.connection_requests_as_recipient, ['manage', false]) &&
                                  this.renderConnectionRequests(filter(dashboard.connection_requests.connection_requests_as_recipient, (['manage', false])), isOrganization)
                                }
                              </List>
                              :
                              <ResizableButton
                                fullWidth
                                disabled
                                primary
                                size="1.2"
                                style={{ marginTop: 10 }}
                                label="No Requests"
                              />
                            }
                          </div>
                      }
                    />
                  </Col>
                </Row>
              </MediaQuery>

              <Row>
                <Col xs={12} sm={9} style={{marginBottom: 40}}>
                  <MediaQuery minWidth={1051}>
                    <Table style={{ marginBottom: 0 }}>
                      <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                        style={{ backgroundColor: '#E9E9E9' }}
                      >
                        <TableRow>
                          <TableHeaderColumn
                            style={{ textTransform: 'uppercase', fontWeight: 500, color: '#424242' }}
                          >
                            Name
                          </TableHeaderColumn>
                          {/* <TableHeaderColumn
                            style={{ textTransform: 'uppercase', fontWeight: 500, color: '#424242' }}
                          >
                            Total Views
                          </TableHeaderColumn> */}
                          <TableHeaderColumn
                            style={{ textTransform: 'uppercase', fontWeight: 500, color: '#424242' }}
                          >
                            Last Login
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            style={{ textTransform: 'uppercase', fontWeight: 500, color: '#424242' }}
                          >
                            Managing {managed.profiles.count} Profiles
                          </TableHeaderColumn>
                          <TableHeaderColumn>
                          </TableHeaderColumn>
                        </TableRow>
                      </TableHeader>
                      <TableBody
                        displayRowCheckbox={false}
                      >
                      {
                        managed.requesting ?
                        <TableRow>
                          <TableRowColumn><InlineLoader /></TableRowColumn>
                          <TableRowColumn><InlineLoader /></TableRowColumn>
                          <TableRowColumn><InlineLoader /></TableRowColumn>
                          <TableRowColumn><InlineLoader /></TableRowColumn>
                        </TableRow>
                        :
                        managed.successful && managed.profiles.count > 0 ?
                          map(managed.profiles.results, (item, key) =>
                            <TableRow key={key} className={styles.managedProfile}>
                              <TableRowColumn>{item.business_name}</TableRowColumn>
                              <TableRowColumn>{moment(item.last_login).format('dddd, MMMM Do YYYY')}</TableRowColumn>
                              <TableRowColumn>
                                <Link to={`/profiles/${item.slug}`}>
                                  <FlatButton
                                    primary
                                    label="Manage Profile"
                                  />
                                </Link>
                              </TableRowColumn>
                              <TableRowColumn>{<CreateClassifiedModal dashboard posterID={item.id} onBehalfOf={item.business_name} />}</TableRowColumn>
                            </TableRow>
                          )
                        :
                        <TableRow selectable={false}>
                          <TableRowColumn><strong>You are not currently managing any profiles.</strong></TableRowColumn>
                        </TableRow>
                      }
                      </TableBody>
                    </Table>
                  </MediaQuery>
                  <MediaQuery maxWidth={1050}>
                    <Table style={{ marginBottom: 0 }}>
                      <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                        style={{ backgroundColor: '#E9E9E9' }}
                      >
                        <TableRow>
                          <TableHeaderColumn
                            style={{ textTransform: 'uppercase', fontWeight: 500, color: '#424242' }}
                          >
                            <strong>Managed Profiles ({connections.length || 0})</strong>
                          </TableHeaderColumn>
                        </TableRow>
                      </TableHeader>
                      <TableBody
                        displayRowCheckbox={false}
                      >
                        {
                          managed.requesting ?
                            <TableRow>
                              <TableRowColumn><InlineLoader /></TableRowColumn>
                            </TableRow>
                            :
                            // managed.successful && managed.profiles.count > 0 ?
                            managed.successful && connections.length > 0 ?
                              map(connections, (item, key) => {
                                const isManagingProfile = managed.profiles.results.find(result => result.id === item.id)
                                return (
                                  <TableRow key={key}>
                                    <TableRowColumn>
                                          <Row>
                                            <Col xs={12} sm={6} className={cx(styles.columnTextDisplay, styles.mobileHardcode)}>{item.business_name}</Col>
                                            <Col xs={12} sm={6} className={cx(styles.columnTextDisplay, styles.mobileHardcode)}>{moment(item.last_login).format('dddd, MMMM Do YYYY')}</Col>
                                            <Col xs={12} sm={6} className={cx(styles.columnTextDisplay, styles.mobileHardcode)}>
                                              {
                                                isManagingProfile &&
                                                  <Link to={`/profiles/${item.slug}`}>
                                                    <FlatButton
                                                      primary
                                                      label="Manage Profile"
                                                    />
                                                  </Link>
                                              }
                                            </Col>
                                            <Col xs={12} sm={6} className={cx(styles.columnTextDisplay, styles.mobileHardcode)}>
                                              {<CreateClassifiedModal dashboard posterID={item.id} onBehalfOf={item.business_name} />}
                                            </Col>
                                          </Row>
                                    </TableRowColumn>
                                  </TableRow>
                                )
                              })
                              :
                              <TableRow selectable={false}>
                                <TableRowColumn><strong>You are not currently managing any profiles.</strong></TableRowColumn>
                              </TableRow>
                        }
                      </TableBody>
                    </Table>
                  </MediaQuery>
                </Col>
                <MediaQuery minWidth={768}>
                  <Col xs={12} sm={3}>
                    <StyledCard
                      cardTitle={<span style={{fontSize: '1.125rem'}}>Connection Requests</span>}
                      cardText={
                        requesting ?
                          <InlineLoader />
                          :
                          <div>
                            <Subheader key="requestDescription" style={{ lineHeight: '18px' }}>The following <strong>Ontario</strong><em>fresh</em>.ca user(s) want to connect with you!</Subheader>
                            {dashboard.connection_requests.connection_requests_as_recipient && dashboard.connection_requests.connection_requests_as_recipient.length > 0 ?
                              <List style={{ marginLeft: -16, marginRight: -16 }}>
                                {
                                  some(dashboard.connection_requests.connection_requests_as_recipient, 'manage') &&
                                  this.renderConnectionRequests(filter(dashboard.connection_requests.connection_requests_as_recipient, ('manage')), isOrganization)
                                }
                                {
                                  some(dashboard.connection_requests.connection_requests_as_recipient, ['manage', false]) &&
                                  this.renderConnectionRequests(filter(dashboard.connection_requests.connection_requests_as_recipient, (['manage', false])), isOrganization)
                                }
                              </List>
                              :
                              <ResizableButton
                                fullWidth
                                disabled
                                primary
                                size="1.2"
                                style={{ marginTop: 10 }}
                                label="No Requests"
                              />
                            }
                          </div>
                      }
                    />
                  </Col>
                </MediaQuery>
              </Row>
            </Col>
          </Row>
          <span className={styles.scrollToTop} onClick={() => window.scrollTo(0, 0)}>Back to the top</span>
        </Grid>
        <Snackbar
          open={profileOnBehalf.notify}
          message="Your profile has been submitted for authentication."
          autoHideDuration={4000}
        />
        <Snackbar
          open={messageAll.notify}
          message="Successfully Sent a Mass Message!"
          autoHideDuration={4000}
        />
        <Snackbar
          open={createClassified.notify}
          message="Successfully Created a Classified!"
          autoHideDuration={4000}
        />
      </div>
    ) : !requesting ? (
    <div>You do not have permission to access this page.</div>
    ) : null
  }
}

const mapStateToProps = state => ({
  client: state.client,
  managed: state.profileManager,
  messageAll: state.messageAll,
  profileOnBehalf: state.createAProfileOnBehalfReducer,
  createClassified: state.createClassified,
  profile: state.profile,
  dashboard: state.dashboard
})

export default compose(
  connect(mapStateToProps,
  {
    profileRequest,
    managedProfilesRequest,
    connectionRequestsListRequest,
    acceptDenyConnectionRequest,
  })
)(ProfileManager)