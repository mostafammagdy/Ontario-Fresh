import React, { Component } from 'react'
import { connect } from 'react-redux'

import Paper from 'material-ui/Paper'
import Snackbar from 'material-ui/Snackbar'

import { resendConfirmationRequest } from '../../containers/signup/actions'

import styles from './styles.module.scss'

class Confirm extends Component {

  UNSAFE_componentWillMount() {
    document.body.style.backgroundColor = "#F5F4F5";
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = null;
  }

  resend = () => {
    const {
      signup,
      resendConfirmationRequest
    } = this.props

    resendConfirmationRequest(signup.lastSignupUser.account_id)
  }

  render() {
    const {
      signup
    } = this.props

    return (
      <div className={styles.confirmContainer}>
        <Paper style={{ padding: '2rem' }} zDepth={2}>
          <h1 className={styles.confirmHeader}>You're almost set! Please confirm your email.</h1>
          <p>
            Thank you for registering with <strong>Ontario</strong><em>fresh</em>.ca. Confirm your account by following the link sent to your email address.
          </p>
          {signup.lastSignupUser && <p>Didn't receive an email from us? Click <strong><a className={styles.resendLink} onClick={this.resend}>HERE</a></strong> to resend it. Keep this page open until your email arrives.</p>}
          <p>Still having trouble? For registration support, contact us at <a href="tel:14169600001">(416) 960-0001</a> or <a href="mailto:support@ontariofresh.ca">support@ontariofresh.ca</a>.</p>
        </Paper>
        <Snackbar
          open={!!signup.notify}
          message={signup.notify}
          autoHideDuration={4000}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  signup: state.signup,
})

const connected = connect(mapStateToProps, {
  resendConfirmationRequest
})

export default connected(Confirm)
