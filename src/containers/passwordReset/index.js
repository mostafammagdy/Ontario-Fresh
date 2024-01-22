import React, { Component } from 'react'
import { reduxForm, Field, SubmissionError } from 'redux-form'
import { connect } from 'react-redux'

import Paper from 'material-ui/Paper'
import StyledInput from '../../components/styledInput'
import ResizableButton from '../../components/resizableButton'
import RaisedButton from 'material-ui/RaisedButton'

import Messages from '../../components/notifications/Messages'
import Errors from '../../components/notifications/Errors'

import {
    checkRequired,
    checkEmail,
    checkLength,
    checkPassword
  } from '../../utils/client-side-validation'

import {
  passwordResetRequest,
  setNewPassword,
} from './actions'

import styles from './styles.module.scss'

class PasswordReset extends Component {

  submit = (values) => {
    if (this.props.params.token) {
      if (values.password !== values.confirmPassword) {
        throw new SubmissionError({ confirmPassword: 'Passwords do not match' })
      }
      this.props.setNewPassword(values.password, this.props.params.token)
    }
    else {
      this.props.passwordResetRequest(values)
    }
  }

  UNSAFE_componentWillMount() {
    document.body.style.backgroundColor = "#F5F4F5";
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = null;
  }

  render () {
    const {
      handleSubmit,
      password_reset: {
        requesting,
        successful,
        resetSuccessful,
        errors,
      },
    } = this.props

    var resetting = !!this.props.params.token

    return (
      <div className={styles.signupContainer}>
        <Paper style={{ padding: '2rem' }} zDepth={2}>
          <form onSubmit={handleSubmit(this.submit)}>
            <h1 style={{ fontSize: '1.125rem' }}>{resetting ? "Reset Your Password" : "Forgot Your Password?"}</h1>
            { !resetting &&
              <p><i>Please enter your login email below and we will send you an email to reset your password.</i></p>
            }
            { resetting ?
              [
                <div>
                  <Field
                    fullWidth
                    key="password"
                    name="password"
                    type="password"
                    label="Type a new password here:"
                    hintText="This field is case sensitive"
                    component={StyledInput}
                    validate={[checkRequired, checkPassword]}
                  />
                  <p className={styles.description}>Passwords must be a minimum of eight characters in length and contains at least one letter, one number and one special character.</p>
                </div>,
                <div>
                  <Field
                    fullWidth
                    key="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    component={StyledInput}
                    validate={[checkRequired, checkPassword]}
                    hintText="This field is case sensitive"
                  />
                  <p className={styles.description}>Passwords must be a minimum of eight characters in length and contains at least one letter, one number and one special character.</p>
                </div>
              ]
              :
              <Field
                fullWidth
                name="email"
                type="email"
                label="Email Address"
                hintText="This field is case sensitive"
                component={StyledInput}
                validate={[checkRequired, checkEmail]}
              />
            }

            <ResizableButton
              fullWidth
              primary
              type="submit"
              label={resetting ? "Set New Password" : "Send Reset Email"}
              size="1.3"
              disabled={requesting || resetSuccessful}
              style={{ marginTop: 20 }}
            />
          </form>

          <div className={styles.formMessages}>
            {!requesting && !!errors.length && (
              <Errors message="Error resetting password:" errors={errors} />
            )}
            {!requesting && successful && !resetting && (
              <Messages messages={
                [
                  {body: 'We just sent you an email! It outlines steps for changing your password.', time: new Date()}
                ]
              } />
            )}
            {!requesting && successful && resetting && (
              <Messages messages={
                [
                  { body: 'Your password is set successfully.', time: new Date() }
                ]
              } />
            )}
          </div>
          { !resetting &&
          <RaisedButton
            label="Back"
            href="/login"
          />
          }
        </Paper>
      </div>
    )
  }
}

// Grab only the piece of state we need
const mapStateToProps = state => ({
  password_reset: state.passwordReset,
})

const connected = connect(mapStateToProps, {
  passwordResetRequest,
  setNewPassword
})(PasswordReset)

// Connect our connected component to Redux Form.  It will namespace
// the form we use in this component as `signup`.
const formed = reduxForm({
  form: 'passwordReset',
})(connected)

export default formed
