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

import { checkRequired, checkPhoneLength } from '../../utils/client-side-validation'
import { isIE } from '../../utils/ie-detection'

import {
  addressUpdate,
  addressDelete,
} from './actions'

class EditAddressModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }
  }

  handleInitializeValues = () => {
    const initialFormValues = {
      'description': find(this.props.profile.current.addresses, ['id', this.props.address_id]).description,
      'address_1': find(this.props.profile.current.addresses, ['id', this.props.address_id]).address_1,
      'address_2': find(this.props.profile.current.addresses, ['id', this.props.address_id]).address_2,
      'city': find(this.props.profile.current.addresses, ['id', this.props.address_id]).city,
      'postal_code': find(this.props.profile.current.addresses, ['id', this.props.address_id]).postal_code,
      'phone': find(this.props.profile.current.addresses, ['id', this.props.address_id]).phone
    }

    this.props.dispatch(initialize('editAddressModal', initialFormValues))
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
      addressUpdate,
      address_id,
     } = this.props

    if (client && client.token) addressUpdate(client, { address_id, values })

    this.handleClose()
  }

  handleDeleteAddress = () => {
    const {
      client,
      addressDelete,
      address_id,
    } = this.props

    if (client && client.token) addressDelete(client, { address_id })
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
        onClick={this.handleDeleteAddress}
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
        form="addressUpdateDetails"
        disabled={pristine}
      />
    </div>
    :
    [
      <FlatButton
        style={{ color: '#e74c3c', float: 'left' }}
        secondary
        label="Delete"
        onClick={this.handleDeleteAddress}
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
        form="addressUpdateDetails"
        disabled={pristine}
      />
    ]

    return (
      <div style={{ position: "absolute", right: 8 }}>
        <span className="editButton">
          <IconButton
            tooltip="Edit Address"
            tooltipPosition="bottom-left"
            onClick={this.handleOpen}
          >
            <EditIcon />
          </IconButton>
        </span>
        <Dialog
          autoScrollBodyContent
          modal
          title="Edit Address"
          actions={isIE() ? null : actions}
          contentClassName='responsiveDialog'
          open={this.state.open}
        >
          <span className="close-modal" onClick={this.handleClose}>&times;</span>
          <form id="addressUpdateDetails" onSubmit={handleSubmit(this.handleSubmitForm)}>
            <Row>
              <Col xs={12}>
                <Field
                  component={StyledInput}
                  validate={checkRequired}
                  name="description"
                  label="Describe this address (i.e. “home”,“office”, etc.)"
                  type="text"
                />
                <Field
                  component={StyledInput}
                  validate={checkRequired}
                  name="address_1"
                  label="Address"
                  type="text"
                />
                <Field
                  component={StyledInput}
                  name="address_2"
                  label="Address Detail (Optional)"
                  type="text"
                />
                <Field
                  component={StyledInput}
                  validate={checkRequired}
                  name="city"
                  label="City"
                  type="text"
                />
                <Field
                  component={StyledInput}
                  validate={checkRequired}
                  name="postal_code"
                  label="Postal Code"
                  type="text"
                />
                <Field
                  component={StyledInput}
                  validate={checkPhoneLength}
                  name="phone"
                  label="Phone Number (Optional)"
                  type="tel"
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
  dispatch(reset('editAddressModal'))

const mapStateToProps = () => (state, ownProps) => ({
  client: state.client,
  profile: state.profile,
  pristine: isPristine('editAddressModal')(state)
})

export default compose(
  connect(mapStateToProps, {
    addressUpdate,
    addressDelete,
  }),
  reduxForm({
    form: 'editAddressModal',
    onSubmitSuccess: resetForm,
  })
)(EditAddressModal)