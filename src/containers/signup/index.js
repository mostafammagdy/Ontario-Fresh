import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { reduxForm, Field, SubmissionError } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Checkbox } from 'redux-form-material-ui'
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper'
import { compact } from 'lodash'

import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import StyledInput from '../../components/styledInput'
import ResizableButton from '../../components/resizableButton'
import RoleAdder from '../../components/roleAdder'

import { ValidatedCheckbox } from '../../components/validatedCheckbox'

import Messages from '../../components/notifications/Messages'
import Errors from '../../components/notifications/Errors'
import {
  checkRequired,
  checkEmail,
  checkLength,
  checkCheckbox,
} from '../../utils/client-side-validation'

import { signupRequest } from './actions'

import styles from './styles.module.scss'

class Signup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      finished: false,
      stepIndex: 0,
      primaryAccount: undefined,
      accounts: [],
    }
  }
  
  static propTypes = {
    handleSubmit: PropTypes.func,
    signupRequest: PropTypes.func,
    signup: PropTypes.shape({
      requesting: PropTypes.bool,
      successful: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array,
    }),
  }

  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: (stepIndex + 1) > 0,
    })
    window.scrollTo(0, 0)
  }

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({
        stepIndex: stepIndex - 1,
        finished: false,
      })
      window.scrollTo(0, 0)
    }
  }

  updateRoles = (primaryAccount, accounts) => {
    this.setState({
      primaryAccount,
      accounts
    })
  }

  invalidRoles = () => this.state.primaryAccount === undefined











































  submit = (values) => {
    console.log('%c signup submit values:', 'color: blue; font-weight: bold;')
    console.log({ values })
    console.log('%c NOTE: handleSubmit (which is where values is sent from) apparently lives in createReduxForm.js.', 'font-style: italic;')
    if (values.password !== values.confirmPassword) {
      throw new SubmissionError({ confirmPassword: 'Passwords do not match' })
    }

    let primaryRole = [this.state.primaryAccount]
    const roles = { roles: compact(primaryRole.concat(this.state.accounts)) }
    this.props.signupRequest(Object.assign(values, roles))
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
      handleSubmit,
      signup: {
        requesting,
        successful,
        messages,
        errors,
      },
    } = this.props
    /*
    console.log('%c Signup handleSubmit:', 'color: blue; font-weight: bold;')
    console.log({ handleSubmit })
    console.log('%c NOTE: handleSubmit lives in createReduxForm.js (line 271) in the “redux-form” module.', 'font-style: italic;')
    */
    console.log('%c Signup this.props.signup:', 'color: blue; font-weight: bold;')
    console.log(this.props.signup)
    /*
    console.log('%c this.state.primaryAccount, accounts:', 'color: blue; font-weight: bold;')
    console.log({ primaryAccount: this.state.primaryAccount, accounts: this.state.accounts })
    */

    /*
    [buyer, seller. service provider, organization, processor] processor and organization are true because they can only be selected on the first dropdown
    */
    const selectedChoices = [false, false, false, true, true]
    selectedChoices[this.state.primaryAccount - 1] = true

    return (
      <div className={styles.signupContainer}>
        <Stepper activeStep={this.state.stepIndex}>
          <Step>
            <StepLabel onClick={this.handlePrev}>Get Started</StepLabel>
          </Step>
          <Step>
            <StepLabel>Account Details</StepLabel>
          </Step>
        </Stepper>
        <Paper style={{ padding: '2rem', display: "flex", flexDirection: "column" }} zDepth={2}>
          <h2 style={{ fontSize: '1.125rem' }}>{this.state.stepIndex === 0 ? 'Register Your Business' : 'Fill-in Your Account Details' }</h2>
          <Divider style={{marginLeft: -36, marginRight: -36}} />
          <div className={styles.roleRow}>
            {this.state.finished ? (
              <div>
                <br />
                <form onSubmit={handleSubmit(this.submit)}>
                  <Field
                    name="first_name"
                    type="text"
                    label="First Name"
                    component={StyledInput}
                    validate={checkRequired}
                    half
                  />
                  <Field
                    name="last_name"
                    type="text"
                    label="Last Name"
                    component={StyledInput}
                    validate={checkRequired}
                    half
                  />
                  <Field
                    name="title"
                    type="text"
                    label="Job Title"
                    component={StyledInput}
                    validate={checkRequired}
                    half
                  />
                  <Field
                    name="business_name"
                    type="text"
                    label="Business Name"
                    component={StyledInput}
                    validate={checkRequired}
                    half
                  />
                  <Field
                    name="email"
                    type="email"
                    label="Email Address"
                    component={StyledInput}
                    validate={[checkRequired, checkEmail]}
                    hintText="This field is case sensitive"
                  />
                  <Field
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
                    label="Register"
                    size="1.3"
                    disabled={requesting || successful}
                    style={{ marginTop: 20 }}
                  />
                </form>

                <div className={styles.formMessages}>
                  {/*
                    ALERT: Error messages are appearing here:
                  */}
                  {!requesting && !!errors.length && (
                    <Errors message="Failure to signup due to:" errors={errors} />
                  )}
                  {!requesting && !!messages.length && (
                    <Messages messages={messages} />
                  )}
                  {!requesting && successful && (
                    <div>
                      <Link to="/login">Click here to Login</Link>
                    </div>
                  )}
                  {requesting && <div>Signing up...</div>}
                </div>
              </div>
            ) : (
              <div>
                  <br />
                  <p>
                    <strong>Ontario</strong><em>fresh</em>.ca is a network for buyers, sellers and processors of wholesale Ontario food.
                    Service providers, who cater to the local food sector, may also join.
                  </p>
                  <p>Select the roles that best describe your business:</p>
                  <RoleAdder onChange={this.updateRoles} initialRoles={this.state.primaryAccount ? [this.state.primaryAccount, ...this.state.accounts] : undefined} />
                  <i style={{marginTop: 25}}><strong>Ontario food</strong> is any food product with at least 80% Ontario-sourced ingredients by volume. Visit <a href="//www.ontario.ca/foodland/page/ontario-foods-definitions" target="_blank" rel="noopener noreferrer">Foodland Ontario</a> for more information.</i>
              </div>
            )
          }
          </div>
          {this.state.stepIndex !== 0 &&
            <RaisedButton
              className={styles.roleRow}
              label="Back"
              style={{ alignSelf: "flex-start" }}
              onClick={this.handlePrev}
            />
          }
          {this.state.stepIndex !== 1 &&
            <RaisedButton
              className={styles.roleRow}
              label='Next'
              primary
              disabled={this.invalidRoles()}
              style={{alignSelf: "flex-end"}}
              onClick={this.handleNext}
            />
          }
        </Paper>
      </div>
    )
  }
}

// Grab only the piece of state we need
const mapStateToProps = state => ({
  signup: state.signup,
})

/*
Connect our component to redux and attach the `signup` piece of state to our `props` in the component.  Also attach the `signupRequest` action to our `props` as well.
*/
const connected = connect(mapStateToProps, { signupRequest })(Signup)

/*
Connect our connected component to Redux Form.  It will namespace the form we use in this component as `signup`.
*/
const formed = reduxForm({
  form: 'signup',
  initialValues: {
    roles: [],
  }
})(connected)

export default formed
