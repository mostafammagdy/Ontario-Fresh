import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Paper from 'material-ui/Paper'

import Messages from '../../components/notifications/Messages'
import Errors from '../../components/notifications/Errors'

import { activateAccountRequest } from './actions'

import styles from './styles.module.scss'

class Activate extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    activateAccountRequest: PropTypes.func.isRequired,
    activate: PropTypes.shape({
      requesting: PropTypes.bool,
      successful: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array,
    }),
    params: PropTypes.shape({
      token: PropTypes.string,
    }),
  }

  UNSAFE_componentWillMount() {
    document.body.style.backgroundColor = "#F5F4F5"
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = null
  }

  constructor(props) {
    super(props)

    this.handleActivateAccount()
  }

  handleActivateAccount = () => {
    const { params, activateAccountRequest } = this.props
    if (params.token) activateAccountRequest(params.token)
  }

  render () {
    const {
      activate: {
        requesting,
        successful,
        messages,
        errors,
      },
    } = this.props

    return (
      <div className={styles.activateContainer}>
        <Paper style={{ padding: '2rem' }} zDepth={2}>
          <h1>Activating Your Account...</h1>
          <div className={styles.formMessages}>
            {!requesting && !!errors.length && (
              <Errors message="Failure to login due to:" errors={errors} />
            )}
            {!requesting && !!messages.length && (
              <Messages messages={messages} />
            )}
            {requesting && <div>Please Wait...</div>}
            {!requesting && !successful && (
              <Link to="/login">Need to Log In? Click Here</Link>
            )}
          </div>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  activate: state.activate,
})

const connected = connect(mapStateToProps, { activateAccountRequest })

export default connected(Activate)


