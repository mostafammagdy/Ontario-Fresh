import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Link } from 'react-router'
import { map, isEmpty, filter, some } from 'lodash'
import { Row, Col, Grid } from 'react-flexbox-grid'

import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'
import {List, ListItem} from 'material-ui/List'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

import ViewProfileIcon from 'material-ui/svg-icons/action/visibility'
import EditProfileIcon from 'material-ui/svg-icons/content/create'
import ViewMessagesIcon from 'material-ui/svg-icons/communication/message'
import CreateClassifiedsIcon from 'material-ui/svg-icons/image/add-to-photos'

import StyledCard from '../../components/styledCard'
import InlineLoader from '../../components/inlineLoader'
import ResizableButton from '../../components/resizableButton'
import ProfileCard from '../../components/profilecard'

import ProfilePlaceholder from '../../assets/images/ontario-fresh-profile-placeholder.jpg'

import { 
  activityFeedRequest,
  dashboardStatsRequest,
  connectionRequestsListRequest,
  acceptDenyConnectionRequest,
} from './actions'

import { profileRequest, featuredProfilesRequest } from '../profile/actions'

import styles from './styles.module.scss'

import ActivityIcon from '../../assets/images/activity_icon.svg'

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

class Dashboard extends Component {
  UNSAFE_componentWillMount() {
    window.scrollTo(0, 0)
    const {
      profileRequest,
      activityFeedRequest,
      dashboardStatsRequest,
      connectionRequestsListRequest,
      featuredProfilesRequest,
      client,
    } = this.props

    if (client && client.token) {
      profileRequest(client)
      activityFeedRequest(client)
      dashboardStatsRequest(client)
      connectionRequestsListRequest(client)
      featuredProfilesRequest()
    }

    document.body.style.backgroundColor = "#F5F4F5"
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = null
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
      dashboard,
      profile: {
        current: {
          business_name,
          photo_file_name
        },
        featured,
        requesting,
        authed: {
          roles
        }
      }
    } = this.props

    const isOrganization = (roles || []).includes(4)

    return (
      <div className={styles.dashboardPageContainer}>
        <Grid fluid className={styles.dashboardComponent}>
          <Row>
            <Col>
              <div className={styles.profileImage}>
                <img alt="" src={photo_file_name || "invalid_link"} onError={(e) => { e.target.src = ProfilePlaceholder }} />
                <div>
                  <Subheader style={{ fontSize: '18px', lineHeight: '40px' }}>Welcome back to <strong>Ontario</strong><em>fresh</em>.ca</Subheader>
                  <h1 className={styles.profileTitle}>{business_name ? (business_name + ' Dashboard') :  'Dashboard'}</h1>
                </div>
              </div>
            </Col>
          </Row>
          {/*
          <Row>
            <Col xs={6}>
              <Row>
                <Col xs={12} sm={6} className={styles.dashboardColumnWithBorder}>
                  <Link to={`/viewProfile`}>
                    <span className={styles.profileLink}><ViewProfileIcon style={iconStyles} />View Profile</span>
                  </Link>
                </Col>
                <Col xs={12} sm={6} className={styles.dashboardColumnWithBorder}>
                  <Link to={`/profile`}>
                    <span className={styles.profileLink}><EditProfileIcon style={iconStyles} />Edit Profile</span>
                  </Link>
                </Col>
              </Row>
            </Col>
            <Col xs={6}>
              <Row>
                <Col xs={12} sm={6} className={styles.dashboardColumnWithBorder}>
                  <Link to={`/messages`}>
                    <span className={styles.profileLink}><ViewMessagesIcon style={iconStyles} />View Messages</span>
                  </Link>
                </Col>
                <Col xs={12} sm={6} className={styles.dashboardColumn}>
                  <Link to={`/profile/classifieds`}>
                    <span className={styles.profileLink}><CreateClassifiedsIcon style={iconStyles} />Create Classified</span>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
          */}
          <Row>
            <Col xs={12} sm={9}>
              <StyledCard
                cardTitle={<span style={{ fontSize: '1.125rem' }}>Activity Feed</span>}
                cardText={
                  <div>
                    { dashboard.stats && 
                    <Row>
                      <Col xs style={{minWidth: 155}}>
                        <h2 className={styles.dashboardStats}>{dashboard.stats.last_week}</h2>
                        <Subheader>Views This Week</Subheader>
                      </Col>
                      <Col xs style={{ minWidth: 155 }}>
                        <h2 className={styles.dashboardStats}>{dashboard.stats.total}</h2>
                        <Subheader>Total Profile Views</Subheader>
                      </Col>
                    </Row> }
                    { dashboard.feed ?
                      !isEmpty(dashboard.feed) ?
                        <ul className={styles.feedList}>
                        {
                          map(dashboard.feed, (item, key) =>
                            <li className={styles.feedItem} key={key}>
                              <Avatar src={item.actor.account.photo_file_name || "invalid_link"} style={{objectFit: 'cover'}} onError={(e) => { e.target.src = ProfilePlaceholder }} />
                              <span className={styles.feedText}><Link to={`/profiles/${item.actor.account.slug}`}>{item.actor.account.business_name}</Link> {item.verb} on {item.created_at.getMonth()+1}/{item.created_at.getDate()}/{item.created_at.getFullYear()}</span>
                            </li>
                          )
                        }
                        </ul>
                      :
                        <Row>
                          <div className={styles.emptyFeedContainer}>
                            <div className={styles.emptyFeed}>
                              <div style={{ display: "flex", alignItems: "center" }}>
                                <img src={ActivityIcon} alt="" style={{ width: 50, marginRight: 25 }} /><h4>There is currently no activity to show.</h4>
                              </div>
                              <a href="/search">Interact with profiles on <strong>Ontario</strong><em>fresh</em>.ca</a>
                            </div>
                          </div>
                        </Row>
                      :
                      <InlineLoader />
                    }
                  </div>
                }
              />
            </Col>
            <Col xs={12} sm={3}>
              {dashboard.connection_requests.connection_requests_as_recipient && dashboard.connection_requests.connection_requests_as_recipient.length > 0 &&
              <StyledCard
                cardTitle={<span style={{fontSize: '1.125rem'}}>Membership Requests</span>}
                cardText={
                  requesting ?
                  <InlineLoader />
                  :
                  [
                    <Subheader key="requestDescription" style={{ lineHeight: '18px' }}>The following <strong>Ontario</strong><em>fresh</em>.ca user(s) want to connect with you!</Subheader>,
                    <List key="requestProfiles" style={{marginLeft: -16, marginRight: -16}}>
                      {
                        some(dashboard.connection_requests.connection_requests_as_recipient, 'manage') &&
                        this.renderConnectionRequests(filter(dashboard.connection_requests.connection_requests_as_recipient, ('manage')), isOrganization)
                      }
                      {
                        some(dashboard.connection_requests.connection_requests_as_recipient, ['manage', false]) &&
                        this.renderConnectionRequests(filter(dashboard.connection_requests.connection_requests_as_recipient, (['manage', false])), isOrganization)
                      }
                    </List>
                  ]
                }
              />
              }
              <StyledCard
                cardTitle="Shipping"
                cardText={
                  requesting ?
                  <InlineLoader />
                  :
                  <div>
                    <Subheader style={{ lineHeight: '18px' }}>Need to ship something? Click below for the best rates.</Subheader>
                    <Link to={"/shipping"}>
                      <ResizableButton
                        fullWidth
                        primary
                        size="1.2"
                        style={{ marginTop: 10 }}
                        label="Get Rates"
                      />
                    </Link>
                  </div>
                }
              />
            </Col>
            {featured && featured.hits && featured.hits.hits &&
              <Row>
                <Subheader style={{ fontSize: '18px' }}>Profiles you might like:</Subheader>
                  {map(featured.hits.hits.slice(0, 3), (item, key) =>
                    <ProfileCard
                      key={key}
                      slug={item._source.slug}
                      business_name={item._source.business_name}
                      photo_file_name={item._source.photo_file_name}
                      description={item._source.description}
                      location={!isEmpty(item._source.addresses) && item._source.addresses[0].city}
                    />
                  )}
              </Row>
            }
          </Row>
          <span className={styles.scrollToTop} onClick={() => window.scrollTo(0, 0)}>Back to the top</span>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  client: state.client,
  profile: state.profile,
  dashboard: state.dashboard,
})

export default compose(
  connect(mapStateToProps,
  {
    activityFeedRequest,
    dashboardStatsRequest,
    connectionRequestsListRequest,
    profileRequest,
    acceptDenyConnectionRequest,
    featuredProfilesRequest,
  })
)(Dashboard)