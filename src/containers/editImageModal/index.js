import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'

import Dropzone from 'react-dropzone'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

import EditIcon from 'material-ui/svg-icons/image/photo-camera'

import { Row } from 'react-flexbox-grid'

import ResizableButton from '../../components/resizableButton'

import '../../utils/toBlob-polyfill'

import styles from './styles.module.scss'

import {
  profileImageUpdate,
  galleryImageUpdate,
} from './actions'

class EditImageModal extends React.Component {
  static propTypes = {
    profileImageUpdate: PropTypes.func.isRequired,
    galleryImageUpdate: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      open: false,
      files: [],
      cropped: null,
    }
  }

  onDrop(files) {
    this.setState({
      files,
    })
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    let file = this.state.files[0]
    file && window.URL.revokeObjectURL(file.preview)

    this.setState({
      open: false,
      files: [],
    })
  }

  handleSubmit = () => {
    const {
      client,
      profileImageUpdate,
      galleryImageUpdate,
      profile,
      type
    } = this.props

    this.refs.cropper.getCroppedCanvas().toBlob(file => {
      console.log('%c File for photo upload is assembled here:', 'color: green; font-weight: bold;')
      console.log({ file })
      if (client && client.token) {
        if (type === 'profile') {
          /*

          NOTE: This is the code we used when uploading the PNG string for the profile photo. Bogdan has now fixed the issue and we are now using the original post.

          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onloadend = function() {
              const base64data = reader.result
              console.log('%c ...attempting to convert to base64:', 'color: green; font-weight: bold;')
              console.log({ base64data })
              console.log('%c Passing the following object to /accounts/add_photo_gallery endpoint:', 'color: red; font-weight: bold;')
              console.log({ id: profile.current.id, file: base64data })
              profileImageUpdate(client, { id: profile.current.id, file: base64data })
          }
          */
          profileImageUpdate(client, { id: profile.current.id, file })
        } else if (type === 'gallery') {
          /*
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onloadend = function() {
              const base64data = reader.result
              console.log('%c ...attempting to convert to base64:', 'color: green; font-weight: bold;')
              console.log({ base64data })
              console.log('%c Passing the following object to /accounts/add_photo_gallery endpoint:', 'color: red; font-weight: bold;')
              console.log({ id: profile.current.id, file: base64data })
              galleryImageUpdate(client, { id: profile.current.id, file: base64data })
          }
          */
          galleryImageUpdate(client, { id: profile.current.id, file })
        }
      }
    })

    this.handleClose()
  }

  render () {
    const file = this.state.files[0]
    const {
      type,
      textLink,
    } = this.props

    const actions = [
      <FlatButton
        primary
        label="Cancel"
        onClick={this.handleClose}
      />,
      <RaisedButton
        disabled={!this.state.files.length}
        primary
        label="Upload"
        onClick={() => this.handleSubmit()}
      />
    ]

    return (
      <div>
        { !!textLink ? 
          <a onClick={this.handleOpen}>Upload a <span className="textLink">profile photo</span></a>
        :
          type === "profile" ?
            <span className="editButton">
              <IconButton
                tooltip="Edit Profile Image"
                tooltipPosition="bottom-left"
                onClick={this.handleOpen}
              >
                <EditIcon />
              </IconButton>
            </span>
          :
            <ResizableButton
              fullWidth
              primary
              size="1.2"
              label="Add a Photo"
              onClick={this.handleOpen}
            /> 
        }
        <Dialog
          autoScrollBodyContent
          modal
          title={type === "profile" ? "Add a Profile Photo" : "Add Photos to Your Profile"}
          actions={actions}
          contentClassName='responsiveDialog'
          open={this.state.open}
        >
          <span className="close-modal" onClick={this.handleClose}>&times;</span>
          <Row style={{ paddingTop: '1rem' }}>
          {
            file?
            <Cropper
              ref='cropper'
              src={file.preview}
              style={{ height: "400px", width: "100%" }}
              viewMode={1}
            />
            :
              <Dropzone
                accept="image/*"
                activeClassName={styles.dropzoneActive}
                className={styles.dropzone}
                onDrop={this.onDrop.bind(this)}
                multiple={false}
              >
                <div className={styles.uploadZone}>
                  {
                    ('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/)) ?
                      <div style={{ width: '100%' }}>
                        <span className={styles.highlight}>Tap</span> to Choose Images
              </div>
                      :
                      <div>
                        <span className={styles.highlight}>
                          Drag and Drop
                </span> Images or <span className={styles.highlight}>
                          Click
                </span> to Choose Files
              </div>
                  }
                </div>
              </Dropzone>
          }
          </Row>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  client: state.client,
  profile: state.profile,
})

const connected = connect(mapStateToProps, {
  profileImageUpdate,
  galleryImageUpdate,
})(EditImageModal)

export default connected
