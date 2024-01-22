import React from 'react'
import { reduxForm, Field, reset } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { Grid, Row, Col } from 'react-flexbox-grid';
import Dialog from 'material-ui/Dialog'
import NotificationSettings from '../notificationSettings';
import StyledCard from '../../components/styledCard'
import StyledInput from '../../components/styledInput'
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'
import { find, difference } from 'lodash'
import EditRolesModal from '../../components/editRolesModal'

import { checkRequired, checkEmail, checkLength } from '../../utils/client-side-validation'

import { passwordResetRequest } from '../passwordReset/actions'
import { saveUserRequest, openEmailModal, closeEmailModal } from './actions'
import {
  rolesUpdate,
} from '../editProfileItemsModal/actions'

import styles from './styles.module.scss'

class UserSettings extends React.Component {
  handleClose = () => {
    this.props.closeEmailModal()
  }

  UNSAFE_componentWillMount() {
    window.scrollTo(0, 0)
    document.body.style.backgroundColor = "#F5F4F5"
  }

  rolesSelected = (roles) => {
    const {
      client,
      profile: {
        authed
      },
      rolesUpdate,
    } = this.props

    const originalRoles = authed.roles
    const modifiedRoles = roles
    const addRoles = difference(modifiedRoles, originalRoles)
    const removeRoles = difference(originalRoles, modifiedRoles)

    if (client && client.token && modifiedRoles.length > 0) {
      rolesUpdate(client, { id: authed.id, addRoles, removeRoles })
    }
  }

  submit = (values) => {
    const {
      saveUserRequest,
      client,
    } = this.props

    saveUserRequest(client, values)
  }

  render() {
    const {
      handleSubmit,
      passwordResetRequest,
      email,
      passwordReset,
      openEmailModal,
      userSaved,
      userSettings,
      profile: {
        authed: {
          roles,
          //title,
          //first_name,
          //last_name,
        }
      }
    } = this.props
    const isOrganization = roles && find(roles, roleValue => roleValue === 4)

    return (
      <div className={styles.container}>
        <Grid fluid>
          <Row>
            <Col xs={12} sm={8} style={{ paddingLeft: 6 }}>
              <h1 style={{ fontSize: '1.125rem', marginLeft: -6, marginBottom: 0 }}>Change Your Settings</h1>
              <Dialog
                open={userSettings.open}
                modal
                title={'Authentication Required'}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                contentClassName='responsiveDialog'
              >
                <span className="close-modal" onClick={this.handleClose}>&times;</span>
                <form onSubmit={handleSubmit(this.submit)}>
                  { userSettings.errors.length > 0 &&
                  <span style={{ padding: '0px 0.3rem' }}>
                    Error: {userSettings.errors[0].body}
                  </span>
                  }
                  <Field
                    fullwidth
                    name="email"
                    type="email"
                    label="Email"
                    component={StyledInput}
                    validate={[checkRequired, checkEmail]}
                  />
                  {/*
                  <Field
                    fullwidth
                    name="title"
                    type="title"
                    label="Title"
                    component={StyledInput}
                    validate={[checkRequired]}
                  />
                  <Field
                    fullwidth
                    name="first_name"
                    type="first_name"
                    label="First Name"
                    component={StyledInput}
                    validate={[checkRequired]}
                  />
                  <Field
                    fullwidth
                    name="last_name"
                    type="last_name"
                    label="Last Name"
                    component={StyledInput}
                    validate={[checkRequired]}
                  />
                  */}
                  <Field
                    fullWidth
                    name="password"
                    type="password"
                    label="Password"
                    component={StyledInput}
                    validate={[checkRequired, checkLength]}
                  />
                  {/*
                  <Field
                    fullWidth
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    component={StyledInput}
                    validate={[checkRequired, checkLength]}
                  />
                  */}
                  <FlatButton
                    style={{ color: '#e74c3c' }}
                    secondary
                    label={'Cancel'}
                    onClick={this.handleClose}
                  />
                  <RaisedButton
                    primary
                    type="submit"
                    label={'Save Changes'}
                  />
                </form>
              </Dialog>
              <div>
                <h4 className={styles.settingsHeader4}>Email</h4>
                <input type="text" disabled={true} value={email} style={{ width: '100%', maxWidth: 500, padding: '0.3rem 0.5rem', margin: '0.5rem auto 1rem', border: '1px solid #EEE', fontSize: 18 }} />
              </div>
              {/*
              <label style={{ fontWeight: 700, fontSize: 16 }}>
                <span>Title</span>
              </label>
              <input type="text" disabled={true} value={title} style={{ width: '100%', padding: '0.3rem 0.5rem', margin: '0.5rem auto 1rem', border: '1px solid #EEE' }} />
              <label style={{ fontWeight: 700, fontSize: 16 }}>
                <span>First Name</span>
              </label>
              <input type="text" disabled={true} value={first_name} style={{ width: '100%', padding: '0.3rem 0.5rem', margin: '0.5rem auto 1rem', border: '1px solid #EEE' }} />
              <label style={{ fontWeight: 700, fontSize: 16 }}>
                <span>Last Name</span>
              </label>
              <input type="text" disabled={true} value={last_name} style={{ width: '100%', padding: '0.3rem 0.5rem', margin: '0.5rem auto 1rem', border: '1px solid #EEE' }} />
              */}
              <RaisedButton
                primary={true}
                label="Change Contact"
                onClick={() => openEmailModal()}
              />
              <div>
                <h4 className={styles.settingsHeader4}>Change Your Password</h4>
                <p style={{marginBottom: 10, marginTop: 0}}>Click the button below to receive an email to reset your password.</p>
              </div>
              <RaisedButton
                primary={true}
                label="Change Password"
                onClick={() => passwordResetRequest({ email })}
              />
              {!isOrganization &&
              [
                <div key='changeRolesDiv' className={styles.settingsHeader4}>
                  <h4 style={{ marginBottom: 0, marginTop: 20 }}>Change Your Account Type</h4>
                  <p style={{ marginBottom: 10, marginTop: 0 }}>Click the button below to change your account type.</p>
                </div>,
                <EditRolesModal
                  key='changesRolesModal'
                  handleClose={this.rolesSelected}
                  buttonLabel="Account Changes"
                  initialRoles={roles}
                />
              ]
              }
              <br />
            </Col>
            <Col xs={12} sm={4}>
              <StyledCard
                cardTitle={<span style={{ fontSize: '1.125rem' }}>Email Preferences</span>}
                cardText={<NotificationSettings />}
              />
              <p style={{ paddingLeft: 16, fontSize: 14 }}>To delete your account, please contact <a href="mailto:info@ontariofresh.ca">info@ontariofresh.ca</a>.</p>
            </Col>
          </Row>
        </Grid>
        <Snackbar
          open={passwordReset.emailNotify}
          message="Password reset email sent"
          autoHideDuration={4000}
        />
        <Snackbar
          open={userSaved}
          message="User successfully saved"
          autoHideDuration={4000}
        />
      </div>
    );
  }
}

const resetForm = () => reset('userSettings')

export default compose(
  connect(
    state => ({
      initialValues: {
        email: state.client.email
      },
      passwordReset: state.passwordReset,
      userSaved: state.userSettings.successful,
      userSettings: state.userSettings,
      profile: state.profile,
      email: state.client.email,
      client: state.client,
    }),
    {
      passwordResetRequest,
      saveUserRequest,
      rolesUpdate,
      openEmailModal,
      closeEmailModal
    }
  ),
  reduxForm({
    form: 'userSettings',
    onSubmitSuccess: resetForm,
  })
)(UserSettings);