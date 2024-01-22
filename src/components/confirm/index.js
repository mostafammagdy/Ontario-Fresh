import React, { Component } from 'react'
import { connect } from 'react-redux'

import Paper from 'material-ui/Paper'
import Snackbar from 'material-ui/Snackbar'

import { resendConfirmationRequest } from '../../containers/create-an-account/actions'

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
      createAnAccount,
      resendConfirmationRequest
    } = this.props

    resendConfirmationRequest(createAnAccount.lastSignupUser.account_id)
  }

  render() {
    const {
      createAnAccount
    } = this.props

    return (
      <div className={styles.confirmContainer}>
        <Paper style={{ padding: '2rem' }} zDepth={2}>
          <h1 className={styles.confirmHeader}>You're almost set! Please confirm your email.</h1>
          <p>
            Thank you for registering with <strong>Ontario</strong><em>fresh</em>.ca. Confirm your account by following the link sent to your email address.
          </p>
          {createAnAccount.lastSignupUser && <p>Didn't receive an email from us? Click <strong><a className={styles.resendLink} onClick={this.resend}>HERE</a></strong> to resend it. Keep this page open until your email arrives.</p>}
          <p>Still having trouble? For registration support, contact us at <a href="mailto:support@ontariofresh.ca">support@ontariofresh.ca</a>.</p>
        </Paper>
        <Snackbar
          open={!!createAnAccount.notify}
          message={createAnAccount.notify}
          autoHideDuration={4000}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  createAnAccount: state.createAnAccount,
})

const connected = connect(mapStateToProps, {
  resendConfirmationRequest
})

export default connected(Confirm)
