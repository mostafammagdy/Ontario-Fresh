import React from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withRouter, Link } from 'react-router'
import { map } from 'lodash'

import Avatar from 'material-ui/Avatar'
import {List, ListItem} from 'material-ui/List'

import StyledCard from '../../components/styledCard'
import InlineLoader from '../../components/inlineLoader'

import { Col } from 'react-flexbox-grid'

import ProfilePlaceholder from '../../assets/images/ontario-fresh-profile-placeholder.jpg'

import { profileConnectionsRequest } from './actions'

class ProfileConnections extends React.Component {
  static propTypes = {
    client: PropTypes.shape({
      username: PropTypes.string,
      user_id: PropTypes.number,
      email: PropTypes.string,
      exp: PropTypes.number,
      token: PropTypes.string,
    }).isRequired,
    profile: PropTypes.shape({
      current: PropTypes.shape({
        id: PropTypes.number,
      }),
      successful: PropTypes.bool,
      editing: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array,
    }).isRequired,
    profileConnectionsRequest: PropTypes.func.isRequired,
  }
  
  getConnections = () => {
    const { client, profile, profileConnectionsRequest } = this.props

    return profileConnectionsRequest(client, profile.current.slug)
  }

  componentDidUpdate(prevProps) {
    const {
      profile: {
        current,
      },
      location: {
        pathname,
      }
    } = this.props

    current.slug && ((current.slug !== prevProps.profile.current.slug) || pathname !== prevProps.location.pathname) && this.getConnections()
  }

  UNSAFE_componentWillMount() {
    this.getConnections()
  }

  render () {
    const {
      profileConnections: {
        current: {
          results,
          count,
        },
        requesting,
      }
    } = this.props

    return (
      <Col>
      {
        ((results && count > 0) || requesting) &&
          <StyledCard cardTitle={`Members ${count ? `(` + count + `)` : ``}`} cardText={
            <List>
              {
                requesting ? 
                  <InlineLoader />
                :
                  map(results, (item, key) =>
                    <Link to={`/profiles/${item.slug}`} key={key} style={{ 'textDecoration': 'none' }}>
                      <ListItem
                        leftAvatar={<Avatar src={item.photo_file_name || "invalid_link"} style={{objectFit: 'cover'}} onError={(e) => { e.target.src = ProfilePlaceholder }} />}
                        primaryText={<div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.business_name}</div>}
                        secondaryText={<div>{item.addresses[0].city}, {item.addresses[0].province}</div>}
                      />
                    </Link>
                  )
              }
            </List>
          }/>
      }
    </Col>
    )
  }
}

const mapStateToProps = state => ({
  client: state.client,
  profile: state.profile,
  profileConnections: state.profileConnections,
})

export default compose(
  withRouter,
  connect(mapStateToProps, { profileConnectionsRequest })
)(ProfileConnections)