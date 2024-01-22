import React from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withRouter } from 'react-router'
import { map } from 'lodash'

import CreateClassifiedModal from '../createClassifiedModal'
import ResizableButton from '../../components/resizableButton'
import ClassifiedItem from '../../components/classifiedItem'

import { profileClassifiedsRequest } from './actions'

class ProfileClassifieds extends React.Component {
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
      requesting: PropTypes.bool,
      successful: PropTypes.bool,
      editing: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array,
    }).isRequired,
    profileClassifiedsRequest: PropTypes.func.isRequired,
  }
  
  getClassifieds = () => {
    const { client, profile, profileClassifiedsRequest } = this.props

    return profileClassifiedsRequest(client, profile.current.id)
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

    current.id && ((current.id !== prevProps.profile.current.id) || pathname !== prevProps.location.pathname) && this.getClassifieds()
  }

  UNSAFE_componentWillMount() {
    this.getClassifieds()
  }

  render () {
    const {
      profileClassifieds: {
        current: {
          results,
          count,
        }
      }
    } = this.props
    const editable = window.location.pathname.startsWith('/viewProfile') ? false : (this.props.profile && this.props.profile.current && this.props.profile.current.editable)
    const currentUnixTimestamp = (new Date()).getTime()

    return (
      <div>
        {results && count > 0 ?
          <div>
            {map((editable ? results : results.filter(editable ? results : classified => Date.parse(classified.needed_by) > currentUnixTimestamp)), (item, key) =>
              <ClassifiedItem 
                key={key}
                looking_for={item.looking_for}
                title={item.title}
                description={item.description}
                photo_file_name={item.photo_file_name}
                account={item.account}
                classified_id={item.id}
                needed_by={item.needed_by}
                editable={editable && item.editable}
                category={item.category}
                expired={Date.parse(item.needed_by) < currentUnixTimestamp}
                brief={true}
              />
            )}
          </div>
          :
          <ResizableButton
            fullWidth
            disabled
            primary
            size="1.2"
            label="No Classifieds Available"
          />  
        }
        <br />
        <br />
        { editable && <CreateClassifiedModal /> }
        <br />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  client: state.client,
  profile: state.profile,
  profileClassifieds: state.profileClassifieds,
})

export default compose(
  withRouter,
  connect(mapStateToProps, { profileClassifiedsRequest })
)(ProfileClassifieds)