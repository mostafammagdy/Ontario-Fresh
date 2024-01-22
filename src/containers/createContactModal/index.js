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

import { checkPhoneLength } from '../../utils/client-side-validation'
import { isIE } from '../../utils/ie-detection'

import {
  contactCreate,
} from './actions'

class CreateContactModal extends React.Component {
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
      contactCreate,
    } = this.props


    if (client && client.token) contactCreate(client, { id, values })

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
        form="contactDetails"
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
        form="contactDetails"
        disabled={pristine}
      />
    ]

    return (
      <div>
        <ResizableButton
          fullWidth
          primary
          size="1.2"
          label="Add a Contact"
          onClick={this.handleOpen}
        /> 
        <Dialog
          autoScrollBodyContent
          modal
          title="Add a Contact"
          actions={isIE() ? null : actions}
          contentClassName='responsiveDialog'
          open={this.state.open}
        >
          <span className="close-modal" onClick={this.handleClose}>&times;</span>
          <form id="contactDetails" onSubmit={handleSubmit(this.handleSubmitForm)}>
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
  dispatch(reset('createContactModal'))

const mapStateToProps = state => ({
  client: state.client,
  profile: state.profile,
  pristine: isPristine('createContactModal')(state)
})

export default compose(
  connect(mapStateToProps, {
    contactCreate,
  }),
  reduxForm({
    form: 'createContactModal',
    onSubmitSuccess: resetForm,
  })
)(CreateContactModal)