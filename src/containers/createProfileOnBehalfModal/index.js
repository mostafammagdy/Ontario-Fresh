import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { reduxForm, Field, isPristine, reset } from 'redux-form'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { map } from 'lodash'

import EditProfileIcon from 'material-ui/svg-icons/content/create'

import ResizableButton from '../../components/resizableButton'
import StyledInput from '../../components/styledInput'
import AddRolesModal from '../../components/addRolesModal'

import {
  checkRequired,
} from '../../utils/client-side-validation'
import { isIE } from '../../utils/ie-detection'

import { describeRoles } from '../../utils/warnings'

import {
  createAProfileOnBehalf,
  openCreateAProfileOnBehalfModal,
  closeCreateAProfileOnBehalfModal
} from './actions'

import Errors from '../../components/notifications/Errors'

import styles from './styles.module.scss'

const iconStyles = {
  display: 'inline-block',
  color: '#6D6F7B',
  userSelect: 'none',
  transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
  verticalAlign: 'middle',
  marginRight: 6,
  marginTop: -2,
  width: 24,
  height: 24,
  viewBox: '0, 0, 24, 24',
}

class CreateProfileOnBehalfModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      roles: []
    }
  }

  handleOpen = () => {
    this.props.resetForm()
    this.setState({
      roles: []
    })
    this.props.openCreateAProfileOnBehalfModal()
  }

  handleSubmitForm = (values) => {
    const {
      client,
      createAProfileOnBehalf
    } = this.props
    const {
      roles
    } = this.state

    if (client && client.token) createAProfileOnBehalf (client, Object.assign({}, values, { roles }))

    //closing the modal is handled by the state
  }

  rolesSelected = (roles) => {
    this.setState({
      roles
    })
  }

  render () {
    const {
      handleSubmit,
      pristine,
      createAProfileOnBehalfReducer: {
        open,
        requesting,
        errors,
      },
      textLinkWithIcon
    } = this.props

    const actions = isIE() ? <div style={{ paddingTop: 40, paddingBottom: 20, float: 'right' }}>
      <FlatButton
        primary
        label="Cancel"
        onClick={this.props.closeCreateAProfileOnBehalfModal}
      />
      <RaisedButton
        primary
        type="submit"
        label="Submit"
        form="createProfileDetails"
        disabled={pristine}
      />
    </div>
    :
    [
      <FlatButton
        primary
        label="Cancel"
        onClick={this.props.closeCreateAProfileOnBehalfModal}
      />,
      <RaisedButton
        primary
        type="submit"
        label="Submit"
        form="createProfileDetails"
        disabled={pristine || this.state.roles.length === 0}
      />
    ]
    const roleValuesToLabel = [
      'BUYER',
      'SELLER',
      'SERVICE PROVIDER',
      'ORGANIZATION',
      'PROCESSOR'
    ]

    return (
      <span>
        { textLinkWithIcon ?
          <span className={styles.profileLink} onClick={this.handleOpen}><EditProfileIcon style={iconStyles} />Create Profile</span>
          :
          <ResizableButton
            primary
            connect
            fullWidth
            style={{ marginTop: 10 }}
            size="1.2"
            label="Create Profile"
            onClick={this.handleOpen}
          />
        }
        <Dialog
          autoScrollBodyContent
          modal
          title="Create a Profile on Behalf of a Member"
          actions={isIE() ? null : actions}
          contentClassName='responsiveDialog'
          open={open}
        >
          <span className="close-modal" onClick={this.props.closeCreateAProfileOnBehalfModal}>&times;</span>
          <form id="createProfileDetails" onSubmit={handleSubmit(this.handleSubmitForm)}>
            <p>Identify where on the food value chain your member is situated. Are they a buyer, seller, processor or vendor?</p>
            <div style={{ marginBottom: "1rem" }}>
              {map(this.state.roles, (number) =>
                <div key={number} className={styles.roleDescription}>
                  <div className={styles.roleDescriptionText}>
                    <h5 className={styles.roleTitle}>
                      <strong>
                        {roleValuesToLabel[number - 1]}
                      </strong>
                    </h5>
                    {describeRoles([number])}
                  </div>
                </div>
              )}
              {this.state.roles.length > 0 &&
                <br />
              }
              <AddRolesModal handleClose={this.rolesSelected} buttonLabel="Add Roles" />
            </div>
            <p><i>The information provided below should pertain to the business you are creating an account for.</i></p>
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
              fullWidth
              name="business_name"
              type="text"
              label="Business Name"
              component={StyledInput}
              validate={checkRequired}
            />
            <Field
              component={StyledInput}
              validate={checkRequired}
              name="email"
              label="Email"
              type="email"
            />
            {isIE() ? actions : null}
          </form>
          <div className={styles.formMessages}>
            {!requesting && !!errors.length && (
              <Errors message="Failure to signup due to:" errors={errors} />
            )}
          </div>
        </Dialog>
      </span>
    )
  }
}

const resetForm = () => reset('createProfileOnBehalfModal')

const mapStateToProps = state => ({
  createAProfileOnBehalfReducer: state.createAProfileOnBehalfReducer,
  client: state.client,
  profile: state.profile,
  pristine: isPristine('createProfileOnBehalfModal')(state)
})

export default compose(
  connect(mapStateToProps, {
    openCreateAProfileOnBehalfModal,
    closeCreateAProfileOnBehalfModal,
    resetForm,
    createAProfileOnBehalf
  }),
  reduxForm({
    form: 'createProfileOnBehalfModal',
  })
)(CreateProfileOnBehalfModal)