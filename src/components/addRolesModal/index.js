import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { compact, drop } from 'lodash'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import RoleAdder from '../../components/roleAdder'

class AddRolesModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      primaryAccount: props.initialRoles ? props.initialRoles[0] : undefined,
      accounts: props.initialRoles ? drop(props.initialRoles, 1) : [],
    }
  }

  static propTypes = {
    handleClose: PropTypes.func.isRequired,
    buttonLabel: PropTypes.string.isRequired,
    initialRoles: PropTypes.arrayOf(PropTypes.number)
  }

  updateRoles = (primaryAccount, accounts) => {
    this.setState({
      primaryAccount,
      accounts
    })
  }

  handleClose = () => {
    const {
      handleClose,
    } = this.props

    let primaryRole = [this.state.primaryAccount]
    handleClose(compact(primaryRole.concat(this.state.accounts)))
    this.setState({
      open: false,
      primaryAccount: undefined,
      accounts: [],
    })
  }

  openModal = () => {
    this.setState({
      open: true
    })
  }

  cancelModal = () => {
    this.setState({
      open: false,
      primaryAccount: undefined,
      accounts: [],
    })
  }

  render() {
    const actions = [
      <FlatButton
        style={{ color: '#e74c3c' }}
        secondary
        label="Cancel"
        onClick={this.cancelModal}
      />,
      <RaisedButton
        primary
        label='Select'
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
            <RoleAdder initialRoles={this.props.initialRoles} onChange={this.updateRoles} />
          </Dialog>
        }
      </div>
    )
  }
}

export default AddRolesModal
