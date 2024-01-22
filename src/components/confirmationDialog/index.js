import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog'

import { formatText } from '../../utils/markup'

import { PropTypes } from 'prop-types'

class ConfirmationDialog extends Component {
  static propTypes = {
    confirmationTitle: PropTypes.string,
    confirmationMessage: PropTypes.string.isRequired,
    confirmationLabel: PropTypes.string.isRequired,
    cancelLabel: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    handleConfirm: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired
  }

  render() {
    const {
      confirmationTitle,
      confirmationMessage,
      confirmationLabel,
      cancelLabel,
      open,
      handleConfirm,
      handleClose
    } = this.props

    const actions = [
      <FlatButton
        style={{ color: '#e74c3c' }}
        secondary
        label={cancelLabel}
        onClick={handleClose}
      />,
      <RaisedButton
        primary
        label={confirmationLabel}
        onClick={handleConfirm}
      />
    ]

    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        modal
        title={confirmationTitle}
        actions={actions}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        contentClassName='responsiveDialog'
      >
        <span className="close-modal" onClick={handleClose}>&times;</span>
        {formatText(confirmationMessage)}
      </Dialog>
    )
  }
}

export default ConfirmationDialog
