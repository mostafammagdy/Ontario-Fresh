import React from 'react'
import { reduxForm, Field, isPristine, reset } from 'redux-form'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

import { Checkbox } from 'redux-form-material-ui'

import ResizableButton from '../../components/resizableButton'

import { isIE } from '../../utils/ie-detection'

import {
  connectionRequest,
} from '../../containers/profileManager/actions'

class RequestConnectionModal extends React.Component {
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

  handleSendConnectionRequest = (values) => {
    const {
      client,
      profile: {
        current,
      },
      connectionRequest,
    } = this.props

    if (client && client.token && current.id) {
      connectionRequest(client, { id: current.id, manage: values.manage || false })
    }

    this.handleClose()
  }

  render () {
    const {
      handleSubmit,
      profile,
      disabled,
      client,
      profile: {
        authed: {
          is_manager,
        }
      },
      isSenderAnOrganization
    } = this.props

    const actions = isIE() ? <div style={{ paddingTop: 40, paddingBottom: 20, float: 'right' }}>
      <FlatButton
        primary
        label="Cancel"
        onClick={this.handleClose}
      />
      <RaisedButton
        primary
        type="submit"
        label="Send Membership Request"
        form="connectionMessageDetails"
      />
    </div>
    :
    [
      <FlatButton
        primary
        label="Cancel"
        onClick={this.handleClose}
      />,
      <RaisedButton
        primary
        type="submit"
        label="Send Membership Request"
        form="connectionMessageDetails"
      />
    ]

    return (
      <div>
        <ResizableButton
          fullWidth
          notCaps
          connect
          primary
          disabled={disabled || !client.token} 
          type="submit"
          label="Request Membership"
          size="1.2"
          onClick={this.handleOpen}
          style={{ marginTop: 10 }}
        />
        <Dialog
          autoScrollBodyContent
          modal
          title={`Request to Connect With ${profile.current.business_name}`}
          actions={isIE() ? null : actions}
          contentClassName='responsiveDialog'
          open={this.state.open}
        >
          <span className="close-modal" onClick={this.handleClose}>&times;</span>
          { isSenderAnOrganization ?
            <span>By sending a connection request, you are asking to have this account listed on your profile. Your logo will also be listed on theirs.</span>
            :
            <span>By sending a connection request, you are asking to have this Network's logo added to your profile. Your account name will also be listed on theirs.</span>
          }
          <form
            id="connectionMessageDetails"
            style={{ marginBottom: -15 }}
            onSubmit={handleSubmit(this.handleSendConnectionRequest)}
          >
            { (is_manager || profile.current.is_manager) &&
              <Field
                component={Checkbox}
                label={ is_manager ? "I would also like to manage and edit their profile." : "I grant this network permission to edit and manage my profile." }
                name="manage"
              />
            }
            {isIE() ? actions : null}
          </form>
        </Dialog>
      </div>
    )
  }
}


const resetForm = (result, dispatch) =>
  dispatch(reset('requestConnectionModal'))

const mapStateToProps = state => ({
  client: state.client,
  profile: state.profile,
  messages: state.messages,
  pristine: isPristine('requestConnectionModal')(state)
})

const connected = connect(mapStateToProps, {
  connectionRequest,
})(RequestConnectionModal)

const formed = reduxForm({
  form: 'requestConnectionModal',
  onSubmitSuccess: resetForm,
})(connected)

export default formed