import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { compact } from 'lodash'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import RoleSelector from '../../components/roleSelector'

class EditRolesModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      accounts: [],
    }
  }

  static propTypes = {
    handleClose: PropTypes.func.isRequired,
    buttonLabel: PropTypes.string.isRequired,
    initialRoles: PropTypes.arrayOf(PropTypes.number)
  }

  updateRoles = accounts => {
    this.setState({
      accounts
    })
  }

  handleClose = () => {
    this.props.handleClose(compact(this.state.accounts))
    this.setState({
      open: false
    })
  }

  openModal = () => {
    this.setState({
      open: true,
      accounts: this.props.initialRoles
    })
  }

  cancelModal = () => {
    this.setState({
      open: false,
      accounts: this.props.initialRoles || [],
    })
  }

  render() {

    console.log('%c editRolesModal props:', 'color: red; font-weight: bold;')
    console.log({ props: this.props })
    console.log('%c editRolesModal this.state.accounts:', 'color: purple; font-weight: bold;')
    console.log({ accounts: this.state.accounts })

    const actions = [
      <FlatButton
        style={{ color: '#e74c3c' }}
        secondary
        label="Cancel"
        onClick={this.cancelModal}
      />,
      <RaisedButton
        primary
        label='Save'
        disabled={this.state.accounts.length === 1 && this.state.accounts[0] === undefined }
        onClick={this.handleClose}
      />
    ]

    return (
      <div>
        <RaisedButton
          primary
          label={this.props.buttonLabel}
          onClick={this.openModal}
        />
        {this.state.open &&
          <Dialog
            autoScrollBodyContent
            modal
            title={this.props.buttonLabel}
            actions={actions}
            contentClassName='responsiveDialog'
            open={this.state.open}
          >
            <span className="close-modal" onClick={this.cancelModal}>&times;</span>
            <br />
            <h4>Your Account Type Is Currently:</h4>
            <RoleSelector
              initialRoles={this.props.initialRoles}
              onChange={this.updateRoles}
            />
          </Dialog>
        }
      </div>
    )
  }
}

export default EditRolesModal
