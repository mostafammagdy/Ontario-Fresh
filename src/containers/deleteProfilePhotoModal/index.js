import React from 'react'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'

import DeleteIcon from 'material-ui/svg-icons/action/delete'

import {
  profilePhotoDelete,
} from '../../containers/profilePhotos/actions'


class DeleteProfilePhotoModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }
  }

  handleOpen = () => {
    this.setState({
      open: true,
    })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleDeletePhoto = () => {
    const {
      client,
      photo_id,
      profilePhotoDelete
    } = this.props

    if (client && client.token) profilePhotoDelete(client, { photo_id })
    this.handleClose()
  }

  

  render () {
    const actions = [
      <FlatButton
        secondary
        label="Cancel"
        onClick={this.handleClose}
      />,
      <RaisedButton
        secondary
        label="Delete Photo"
        onClick={this.handleDeletePhoto}
      />
    ]

    return (
      <div>
        <IconButton
          tooltip="Delete Photo"
          tooltipPosition="bottom-left"
          onClick={this.handleOpen}
        >
          <DeleteIcon color="white" />
        </IconButton>
        <Dialog
          autoScrollBodyContent
          modal
          title="Are you sure you want to delete this gallery photo?"
          actions={actions}
          contentClassName='responsiveDialog'
          open={this.state.open}
        >
          <span className="close-modal" onClick={this.handleClose}>&times;</span>
          <p>This action cannot be undone.</p>
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
  profilePhotoDelete,
})(DeleteProfilePhotoModal)

export default connected