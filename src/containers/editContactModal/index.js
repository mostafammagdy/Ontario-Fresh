import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { reduxForm, Field, isPristine, reset, initialize } from 'redux-form'
import { find } from 'lodash'

import { Row, Col } from 'react-flexbox-grid'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'

import EditIcon from 'material-ui/svg-icons/editor/mode-edit'

import StyledInput from '../../components/styledInput'

import { checkPhoneLength } from '../../utils/client-side-validation'
import { isIE } from '../../utils/ie-detection'

import {
  contactUpdate,
  contactDelete,
} from './actions'

class EditContactModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }
  }

  handleInitializeValues = () => {
    const initialFormValues = {
      'name': find(this.props.profile.current.contacts, ['id', this.props.contact_id]).name,
      'position': find(this.props.profile.current.contacts, ['id', this.props.contact_id]).position,
      'phone': find(this.props.profile.current.contacts, ['id', this.props.contact_id]).phone,
      'fax': find(this.props.profile.current.contacts, ['id', this.props.contact_id]).fax,
      'cell': find(this.props.profile.current.contacts, ['id', this.props.contact_id]).cell,
      'email': find(this.props.profile.current.contacts, ['id', this.props.contact_id]).email,
    }

    this.props.dispatch(initialize('editContactModal', initialFormValues))
  }

  handleOpen = () => {
    this.handleInitializeValues()
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleSubmitForm = (values) => {
    const {
      client,
      contactUpdate,
      contact_id,
     } = this.props

    if (client && client.token) contactUpdate(client, { contact_id, values })

    this.handleClose()
  }

  handleDeleteContact = () => {
    const {
      client,
      contactDelete,
      contact_id,
    } = this.props

    if (client && client.token) contactDelete(client, { contact_id })
    this.handleClose()
  }

  render () {
    const {
      handleSubmit,
      pristine,
    } = this.props

    const actions = isIE() ? <div style={{ paddingTop: 40, paddingBottom: 20, float: 'right' }}>
      <FlatButton
        style={{ color: '#e74c3c', float: 'left' }}
        secondary
        label="Delete"
        onClick={this.handleDeleteContact}
      />
      <FlatButton
        primary
        label="Cancel"
        onClick={this.handleClose}
      />
      <RaisedButton
        primary
        type="submit"
        label="Submit"
        form="contactUpdateDetails"
        disabled={pristine}
      />
    </div>
    :
    [
      <FlatButton
        style={{ color: '#e74c3c', float: 'left' }}
        secondary
        label="Delete"
        onClick={this.handleDeleteContact}
      />,
      <FlatButton
        primary
        label="Cancel"
        onClick={this.handleClose}
      />,
      <RaisedButton
        primary
        type="submit"
        label="Submit"
        form="contactUpdateDetails"
        disabled={pristine}
      />
    ]

    return (
      <div style={{ position: "absolute", right: 8 }}>
        <span className="editButton">
          <IconButton
            tooltip="Edit Contact"
            tooltipPosition="bottom-left"
            onClick={this.handleOpen}
          >
            <EditIcon />
          </IconButton>
        </span>
        <Dialog
          autoScrollBodyContent
          modal
          title="Edit Contact"
          actions={isIE() ? null : actions}
          contentClassName='responsiveDialog'
          open={this.state.open}
        >
          <span className="close-modal" onClick={this.handleClose}>&times;</span>
          <form id="contactUpdateDetails" onSubmit={handleSubmit(this.handleSubmitForm)}>
            <Row>
              <Col xs={12}>
                <Field
                  component={StyledInput}
                  name="name"
                  label="Contact Name (Optional)"
                  type="text"
                />
                <Field
                  component={StyledInput}
                  name="position"
                  label="Position (Optional)"
                  type="text"
                />
                <Field
                  component={StyledInput}
                  validate={checkPhoneLength}
                  name="phone"
                  label="Phone Number (Optional)"
                  type="tel"
                />
                <Field
                  component={StyledInput}
                  validate={checkPhoneLength}
                  name="fax"
                  label="Fax Number (Optional)"
                  type="tel"
                />
                <Field
                  component={StyledInput}
                  validate={checkPhoneLength}
                  name="cell"
                  label="Cell Number (Optional)"
                  type="tel"
                />
                <Field
                  component={StyledInput}
                  name="email"
                  label="Email (Optional)"
                  type="email"
                />
              </Col>
            </Row>
            {isIE() ? actions : null}
          </form>
        </Dialog>
      </div>
    )
  }
}

const resetForm = (result, dispatch) =>
  dispatch(reset('editContactModal'))

const mapStateToProps = () => (state, ownProps) => ({
  client: state.client,
  profile: state.profile,
  pristine: isPristine('editContactModal')(state)
})

export default compose(
  connect(mapStateToProps, {
    contactUpdate,
    contactDelete,
  }),
  reduxForm({
    form: 'editContactModal',
    onSubmitSuccess: resetForm,
  })
)(EditContactModal)