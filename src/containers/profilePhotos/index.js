import React from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withRouter } from 'react-router'
import { map } from 'lodash'

import {GridTile} from 'material-ui/GridList'

import EditImageModal from '../editImageModal'
import DeleteProfilePhotoModal from '../deleteProfilePhotoModal'

import ResizableButton from '../../components/resizableButton'
import ProfilePlaceholder from '../../assets/images/ontario-fresh-profile-placeholder.jpg'

import styles from './styles.module.scss'

import { profilePhotosRequest } from './actions'

//Unfortunately, this class and its variables were named wrong. It should be 'GalleryPhotos' instead of 'ProfilePhotos'

class ProfilePhotos extends React.Component {
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
    profilePhotosRequest: PropTypes.func.isRequired,
  }

  getPhotos = () => {
    const { client, profile, profilePhotosRequest } = this.props

    profilePhotosRequest(client, profile.current.id || client.account_id)
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

    current.id && ((current.id !== prevProps.profile.current.id) || pathname !== prevProps.location.pathname) && this.getPhotos()
  }

  UNSAFE_componentWillMount() {    
    this.getPhotos()
  }

  render () {
    const {
      profile_photos: {
        current: {
          results,
          count,
        }
      },
      isOrganizationEditing
    } = this.props

    const editable = window.location.pathname.startsWith('/viewProfile') ? false : (this.props.profile && this.props.profile.current && this.props.profile.current.editable)

    return (
      <div>
        <div className={styles.imageContainer}>
          { results && count > 0 ?
            map(results, (item, key) =>
              <GridTile
                key={key}
                title=" "
                actionIcon={editable && isOrganizationEditing ? <DeleteProfilePhotoModal photo_id={item.id} /> : undefined }
                // actionIcon={undefined}
                actionPosition="right"
                titlePosition="top"
                titleBackground={editable && isOrganizationEditing ? "linear-gradient(to top, rgba(0,0,0,0) 0%,rgba(0,0,0,0.4) 70%,rgba(0,0,0,0.6) 100%)" : "rgba(0,0,0,0)"}
                style={{height: "auto"}}
              >
                <img alt="" src={item.photo_file_name || "invalid_link"} onError={(e) => { e.target.src = ProfilePlaceholder }} style={{height: "auto"}} />
              </GridTile>
            )
            :
            <ResizableButton
              fullWidth
              disabled
              primary
              size="1.2"
              label="No Gallery Photos Available"
            />  
          }
        </div>
        <br />
        { editable && isOrganizationEditing &&
          [
            <EditImageModal key='editImageModal' type="gallery" />,
            <br key='linebreak' />
          ]
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  client: state.client,
  profile: state.profile,
  profile_photos: state.profilePhotos,
})

export default compose(
  withRouter,
  connect(mapStateToProps, { profilePhotosRequest })
)(ProfilePhotos)