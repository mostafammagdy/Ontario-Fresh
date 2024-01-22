import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Paper from 'material-ui/Paper'
import StyledInput from '../../components/styledInput'
import ResizableButton from '../../components/resizableButton'

import Messages from '../../components/notifications/Messages'
import Errors from '../../components/notifications/Errors'

import loginRequest from './actions'

import styles from './styles.module.scss'


class Login extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    loginRequest: PropTypes.func,
    login: PropTypes.shape({
      requesting: PropTypes.bool,
      successful: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array,
    }),
  }

  submit = (values) => {
    this.props.loginRequest(values)
  }

  UNSAFE_componentWillMount() {
    window.scrollTo(0, 0)
    document.body.style.backgroundColor = "#F5F4F5";
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = null;
  }

  render () {
    const {
      handleSubmit, // Redux Form injects this into our props
      login: {
        requesting,
        successful,
        messages,
        errors,
      },
    } = this.props

    return (
      <div className={styles.loginContainer}>
        <Paper style={{ padding: '2rem' }} zDepth={2}>
          <form onSubmit={handleSubmit(this.submit)}>
            <h2 style={{ fontSize: '1.125rem' }}>Log In</h2>
            <Field
              fullWidth
              name="username"
              type="email"
              label="Email Address"
              hintText="This field is case sensitive"
              component={StyledInput}
            />
            <Field
              fullWidth
              name="password"
              type="password"
              label="Password"
              hintText="This field is case sensitive"
              component={StyledInput}
            />
            <ResizableButton
              fullWidth
              primary
              type="submit"
              label="Log In"
              size="1.3"
              disabled = {requesting || successful}
            />
          </form>
          <div className={styles.formMessages}>
            {!requesting && !!errors.length && (
              <Errors message="Failure to login due to:" errors={errors} />
            )}
            {!requesting && !!messages.length && (
              <Messages messages={messages} />
            )}
            {requesting && <div>Logging in...</div>}
            {!requesting && !successful && (
              <div>
                <Link to="/register">Don't Have an Account? Register Here</Link>
                <br />
                <Link to="/forgot">Forgot Your Password?</Link>
              </div>
            )}
          </div>
        </Paper>
      </div>
    )
  }
}

// Grab only the piece of state we need
const mapStateToProps = state => ({
  login: state.login,
})

// make Redux state piece of `login` and our action `loginRequest`
// available in this.props within our component
const connected = connect(mapStateToProps, { loginRequest })(Login)

const formed = reduxForm({
  form: 'login',
})(connected)

export default formed
