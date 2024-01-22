import React, { Component } from 'react'
import { connect } from 'react-redux'

import Subheader from 'material-ui/Subheader'

import EditProfileItemsModal from '../editProfileItemsModal'
import ResizableButton from '../../components/resizableButton'


import styles from './styles.module.scss'

class SocialLinks extends Component {
  render() {
    const { profile } = this.props

    return (
      <div className={styles.buttonContainer}>
        {!profile.current.online_store ?
          <Subheader style={{ lineHeight: '20px' }}>
          {profile.current.editable ? <EditProfileItemsModal type="website" textLink />
          :
            "Message this organization to learn more about their offerings"
          }
          </Subheader>
          :
          <div>
            <a target="_blank" rel="noopener noreferrer" href={(!profile.current.online_store.startsWith("http") ? '//' : '') + profile.current.online_store}>
              <ResizableButton
                fullWidth
                notCaps
                shop
                social
                type="submit"
                label="Online Store"
                size="1.2"
              />
            </a>
          </div>
        }
        {/* profile.current.website &&
          <div>
            <a target="_blank" rel="noopener noreferrer" href={profile.current.website}>
              <ResizableButton
                fullWidth
                notCaps
                website
                social
                type="submit"
                label="Website"
                size="1.2"
            />
            </a>
          </div>
        }
        { profile.current.email &&
          <div>
            <a target="_blank" rel="noopener noreferrer" href={`mailto:${profile.current.email}`}>
              <ResizableButton
                fullWidth
                notCaps
                email
                social
                type="submit"
                label="Email"
                size="1.2"
              />
            </a>
          </div>
        }
        { { profile.current.twitter &&
          <div>
            <a target="_blank" rel="noopener noreferrer" href={profile.current.twitter}>
              <ResizableButton
                fullWidth
                notCaps
                twitter
                social
                type="submit"
                label="Twitter"
                size="1.2"
              />
            </a>
          </div>
        }
        { profile.current.facebook &&
          <div>
            <a target="_blank" rel="noopener noreferrer" href={profile.current.facebook}>
              <ResizableButton
                fullWidth
                notCaps
                facebook
                social
                type="submit"
                label="Facebook"
                size="1.2"
              />
            </a>
          </div>
        }
        { profile.current.linkedin &&
          <div>
            <a target="_blank" rel="noopener noreferrer" href={profile.current.linkedin}>
              <ResizableButton
                fullWidth
                notCaps
                linkedin
                social
                type="submit"
                label="LinkedIn"
                size="1.2"
              />
            </a>
          </div>
        } */}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
})

export default connect(mapStateToProps)(SocialLinks)