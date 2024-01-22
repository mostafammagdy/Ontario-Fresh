import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, Field, SubmissionError } from 'redux-form'
import { Checkbox } from 'redux-form-material-ui'

import Paper from 'material-ui/Paper'
import StyledInput from '../../components/styledInput'
import { ValidatedCheckbox } from '../../components/validatedCheckbox'
import ResizableButton from '../../components/resizableButton'

import Messages from '../../components/notifications/Messages'
import Errors from '../../components/notifications/Errors'

import {
  checkRequired,
  checkLength,
  checkCheckbox,
} from '../../utils/client-side-validation'

import { claimAccountRequest } from './actions'

import styles from './styles.module.scss'

class ClaimProfile extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    claimAccountRequest: PropTypes.func.isRequired,
    claimProfile: PropTypes.shape({
      requesting: PropTypes.bool,
      successful: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array,
    }),
    params: {
      token: PropTypes.string,
    },
  }

  submit = (values) => {
    if (values.password !== values.confirmPassword) {
      throw new SubmissionError({ confirmPassword: 'Passwords do not match' })
    }

    this.props.claimAccountRequest(values)
  }

  UNSAFE_componentWillMount() {
    document.body.style.backgroundColor = "#F5F4F5"
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = null
  }

  handleSubmit = (values) => {
    const {
      location: {
        query
      },
      claimAccountRequest
    } = this.props

    if (query.act_token && query.pw_token && values.password) claimAccountRequest(query.act_token, query.pw_token, values.password, values.email_consent)
  }

  render () {
    const {
      handleSubmit,
      claimProfile: {
        requesting,
        successful,
        messages,
        errors,
      },
    } = this.props

    return (
      <div className={styles.activateContainer}>
        <Paper style={{ padding: '2rem' }} zDepth={2}>
          <h1>You're almost set!</h1>
          <p>
            <i>Create a password for your account to access Ontario's biggest online local food network.</i>
            <br />
            <strong>Ontario</strong><em>fresh</em>.ca<i> and your ‘Buy Local’ Network are here to help!</i>
          </p>
          <form onSubmit={handleSubmit(this.handleSubmit)}>
            <Field
              fullWidth
              name="password"
              type="password"
              label="Password"
              component={StyledInput}
              validate={[checkRequired, checkLength]}
              hintText="This field is case sensitive"
            />
            <Field
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              component={StyledInput}
              validate={[checkRequired, checkLength]}
              hintText="This field is case sensitive"
            />
             <Field
              name="terms_conditions"
              component={ValidatedCheckbox}
              type="checkbox"
              validate={checkCheckbox}
              labelStyle={{ zIndex: 3 }}
              label={<span>I have read and accept the <a target="_blank" rel="noopener noreferrer" href="/terms-use">Terms of Use</a> and <a target="_blank" rel="noopener noreferrer" href="/privacy-policy">Privacy Policy</a></span>}
            />
            <Field
              name="email_consent"
              component={Checkbox}
              label="I agree to receive occasional email communications from the Greenbelt Fund"
            />
            <ResizableButton
              fullWidth
              primary
              type="submit"
              label="Claim Profile"
              size="1.3"
              disabled={requesting || successful}
              style={{ marginTop: 20 }}
            />
          </form>
          <div className={styles.formMessages}>
            {!requesting && !!errors.length && (
              <Errors message="Failure to login due to:" errors={errors} />
            )}
            {!requesting && !!messages.length && (
              <Messages messages={messages} />
            )}
            {requesting && <div>Please Wait...</div>}
          </div>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  claimProfile: state.claimProfile,
})

const connected = connect(mapStateToProps, { claimAccountRequest })(ClaimProfile)

const formed = reduxForm({
  form: 'login',
})(connected)

export default formed


