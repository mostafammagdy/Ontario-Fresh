import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { reduxForm, Field, isPristine, reset } from 'redux-form'

import { Row, Col } from 'react-flexbox-grid'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

import ResizableButton from '../../components/resizableButton'
import StyledInput from '../../components/styledInput'

import { checkRequired, checkPhoneLength } from '../../utils/client-side-validation'
import { isIE } from '../../utils/ie-detection'

import {
  addressCreate,
} from './actions'

class CreateAddressModal extends React.Component {
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

  handleSubmitForm = (values) => {
    const {
      profile: {
        current: {
          id,
        }
      },
      client,
      addressCreate,
    } = this.props


    if (client && client.token) addressCreate(client, { id, values })

    this.handleClose()
  }

  render () {
    const {
      handleSubmit,
      pristine,
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
        label="Submit"
        form="addressDetails"
        disabled={pristine}
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
        label="Submit"
        form="addressDetails"
        disabled={pristine}
      />
    ]

    return (
      <div>
        <ResizableButton
          fullWidth
          primary
          size="1.2"
          label="Add an Address"
          onClick={this.handleOpen}
        /> 
        <Dialog
          autoScrollBodyContent
          modal
          title="Add an Address"
          actions={isIE() ? null : actions}
          contentClassName='responsiveDialog'
          open={this.state.open}
        >
          <span className="close-modal" onClick={this.handleClose}>&times;</span>
          <form id="addressDetails" onSubmit={handleSubmit(this.handleSubmitForm)}>
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
                  validate={[checkPhoneLength]}
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
  dispatch(reset('createAddressModal'))

const mapStateToProps = state => ({
  client: state.client,
  profile: state.profile,
  pristine: isPristine('createAddressModal')(state)
})

export default compose(
  connect(mapStateToProps, {
    addressCreate,
  }),
  reduxForm({
    form: 'createAddressModal',
    onSubmitSuccess: resetForm,
  })
)(CreateAddressModal)