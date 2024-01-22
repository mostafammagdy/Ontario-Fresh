import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { reduxForm, Field, isPristine, reset, initialize, getFormValues } from 'redux-form'

import Dialog from 'material-ui/Dialog'
import MenuItem from 'material-ui/MenuItem'
import { map, difference, find } from 'lodash'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'
import {Tabs, Tab} from 'material-ui/Tabs'

import { Checkbox } from 'redux-form-material-ui'

import EditIcon from 'material-ui/svg-icons/editor/mode-edit'
import AccountIcon from 'material-ui/svg-icons/action/settings'
import GeneralBusinessInfoIcon from 'material-ui/svg-icons/action/info'
import IAmAIcon from 'material-ui/svg-icons/action/account-circle'
import ShareIcon from 'material-ui/svg-icons/social/share'

import { SelectField } from 'redux-form-material-ui'

import StyledInput from '../../components/styledInput'
import EditRolesModal from '../../components/editRolesModal'

import { customUrlValdiation, checkPhoneLength } from '../../utils/client-side-validation'
import { isIE } from '../../utils/ie-detection'
import { describeEditRoles } from '../../utils/warnings'

import styles from './styles.module.scss'

import {
  profileUpdate,
} from './actions'

import {
  getCategoriesList
} from '../searchComponent/actions'

const compact = 1
const normal = 0
const breakpoint = 890

class EditProfileItemsModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      tabValue: this.props.type === 'roles' ? 3 : (this.props.type === 'social' || this.props.type === 'website') ? 2 : 1,
      roles: [],
      changedRoles: false,
      mode: window.innerWidth < breakpoint ? compact : normal
    }
  }

  updateDimensions() {
    if (this.state.mode === compact && window.innerWidth >= breakpoint) {
      this.setState({ mode: normal })
    }
    else if (this.state.mode === normal && window.innerWidth < breakpoint) {
      this.setState({ mode: compact })
    }
  }

  componentDidMount() {
    this.props.getCategoriesList()
    window.addEventListener("resize", this.updateDimensions.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this))
  }

  getRolesArray = (currentProfile) => {
    return map(currentProfile.roles, role => {
      switch (role.value) {
        case 'seller':
          return 2;
        case 'buyer':
          return 1;
        case 'organization':
          return 4;
        case 'processor':
          return 5;
        case 'service_provider':
          return 3;
        case 'vendor':
          return 6;
        //no default
      }
    })
  }

  handleInitializeValues = () => {
    const profile = this.props.profile.current;
    const twitterRegex = /^(?:https?:\/\/)?(?:www\.)?twitter\.com\/@?(\w+).*$/
    const twitterhandler = (profile.twitter && profile.twitter.match(twitterRegex)) ? ('@' + profile.twitter.match(twitterRegex)[1]) : ""
    const instagramRegex = /^(?:https?:\/\/)?(?:www\.)?instagram\.com\/@?(\w.+)*$/
    const instagramhandler = (profile.instagram && profile.instagram.match(instagramRegex)) ? ('@' + profile.instagram.match(instagramRegex)[1]) : ""
    const initialFormValues = {
      'first_name': profile.first_name,
      'last_name': profile.last_name,
      'title': profile.title,
      'address_1': profile.address_1,
      'city': profile.city,
      'province': 'Ontario',
      'country': 'Canada',
      'postal_code': profile.postal_code,
      'business_name': profile.business_name,
      'description': profile.description,
      'greenbelt_location': profile.greenbelt_location,
      'phone': profile.phone,
      'fax': profile.fax,
      'cell': profile.cell,
      'website': profile.website,
      'email': profile.email,
      'online_store': profile.online_store,
      'twitter': twitterhandler,
      'instagram': instagramhandler,
      'facebook': profile.facebook,
      'linkedin': profile.linkedin,
      'category': profile.category
    }
    const roles = this.getRolesArray(profile)

    this.props.dispatch(initialize('editProfileItemsModal', initialFormValues))
    this.setState({ roles })
  }

  handleOpen = () => {
    this.handleInitializeValues()
    this.setState({
      open: true,
      tabValue: this.props.type === 'businessType' ? 4 : this.props.type === 'description' ? 1 : this.props.type === 'roles' ? 3 : (this.props.type === 'social' || this.props.type === 'website') ? 2 : 1
    })
  }

  handleClose = () => {
    this.setState({ open: false, changedRoles: false })
  }

  handleTabChange = (value) => {
    this.setState({
      tabValue: value,
    })
  }

  handleSubmitForm = (values) => {
    const {
      profile: {
        current: {
          id,
        }
      },
      client,
      profileUpdate,
    } = this.props

    const originalRoles = this.getRolesArray(this.props.profile.current)
    const modifiedRoles = this.state.roles
    const addRoles = difference(modifiedRoles, originalRoles)
    const removeRoles = difference(originalRoles, modifiedRoles)

    const modifiedValues = Object.assign({},
                                         values,
                                         values.twitter ? {twitter: values.twitter ? "https://twitter.com/" + values.twitter.replace('@', '') : "" } : {},
                                         values.instagram ? {instagram: values.instagram ? "https://www.instagram.com/" + values.instagram.replace('@', '') : "" } : {},
                                         (values.address_1 && values.city && values.postal_code) ? {} : { province: null, country: null })

    if (client && client.token && modifiedRoles.length > 0) {
      profileUpdate(client, { id, values: modifiedValues, addRoles, removeRoles })
    }

    this.handleClose()
  }

  rolesSelected = (roles) => {
    this.setState({
      roles,
      changedRoles: true
    })
  }

  render () {
    const {
      headerEdit,
      subheaderEdit,
      contactEdit,
      handleSubmit,
      pristine,
      form_values,
      textLink,
      type,
      onSearchComponent,
      search_component: {
        lists: {
          categories
        }
      },
      profile: {
        current: {
          roles,
        }
      },
    } = this.props

    const businessTypes = categories || []
    const isSeller = find(roles, role => role.value === 'seller')
    const isProcessor = find(roles, role => role.value === 'processor')
    const isOrganization = find(roles, role => role.value === 'organization')
    const roleValuesToLabel = ['BUYER', 'SELLER', 'SERVICE PROVIDER', 'ORGANIZATION', 'PROCESSOR', 'VENDOR']

    const actions = isIE() ? <div style={{ paddingTop: 40, paddingBottom: 20, float: 'right' }}>
      <FlatButton
        primary
        label='Cancel'
        onClick={this.handleClose}
      />
      <RaisedButton
        primary
        type='submit'
        label='Submit'
        form='profileDetails'
        disabled={pristine && !this.state.changedRoles}
      />
    </div>
    :
    [
      <FlatButton
        primary
        label='Cancel'
        onClick={this.handleClose}
      />,
      <RaisedButton
        primary
        type='submit'
        label='Submit'
        form='profileDetails'
        disabled={pristine && !this.state.changedRoles}
      />
    ]

    return (
      <div>
        {!!textLink ?
          <a onClick={this.handleOpen}>
            {
              type === 'description' ? <div>Add general <span className='textLink'>business details</span></div>
              :
              type === 'social' ? <div>Fill out <span className='textLink'>social media and web links</span></div>
              :
              type === 'website' ? <div>Do you sell your products online? Add your <span className='textLink'>online store</span> here.</div>
              :
              type === 'roles' ? <div>Add <span className='textLink'>business types</span></div>
              :
              <div>Edit profile</div>
            }
          </a>
        : onSearchComponent ?
          <FlatButton
            fullWidth
            backgroundColor='#83878B'
            hoverColor='#83878B'
            label="Update your address to filter"
            labelStyle={{ textTransform: 'none', color: 'white' }}
            style={{ borderRadius: 4, border: '1px solid #9B9FA2', height: 48 }}
            className={styles.searchComponentUpdateAddressButton}
            onClick={this.handleOpen}
          />
        :
          <span className={contactEdit ? styles.contactEdit :
                           headerEdit ? styles.headerEditButton :
                           subheaderEdit ? styles.subheaderEditButton :
                           'editButton'
                          }>
            <IconButton
              tooltip='Edit Profile'
              tooltipPosition='bottom-center'
              onClick={this.handleOpen}
            >
              <EditIcon />
            </IconButton>
          </span>
        }

        <Dialog
          autoScrollBodyContent
          modal
          title='Edit Your Profile'
          actions={isIE() ? null : actions}
          contentClassName='responsiveDialog'
          open={this.state.open}
        >
          <span className="close-modal" onClick={this.handleClose}>&times;</span>
          <form id='profileDetails' onSubmit={handleSubmit(this.handleSubmitForm)}>
            <Tabs
              className={styles.inkbar}
              inkBarStyle={{ backgroundColor: '#00703C', height: 5, marginTop: -5, marginBottom: 15 }}
              tabItemContainerStyle={{ backgroundColor: '#E9E9E9' }}
              value={this.state.tabValue}
              onChange={this.handleTabChange}
            >
              <Tab
                buttonStyle={{ color: '#424242' }}
                icon={<IAmAIcon style={{ color: "#6D6F7B" }} />}
                label={this.state.mode === normal ? 'I am a' : null} value={4}
              >
                <div className={styles.tabContent}>
                  <div style={{ paddingLeft: "0.3rem", paddingRight: "0.3rem", marginBottom: "1rem" }}>
                    How do you identify your Ontario business?
                    <br />
                    <i>Select all fields that apply to your operations.</i>
                    <br />
                    <div style={{ paddingLeft: "0.3rem", paddingRight: "0.3rem" }}>
                      <Field
                        name='category'
                        component={SelectField}
                        multiple={true}
                        autoWidth={true}
                        style={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px' }}
                        labelStyle={{ paddingLeft: 15 }}
                        iconStyle={{ fill: 'black', right: 0 }}
                        underlineStyle={{ border: 'none', borderColor: 'transparent', height: 0 }}
                      >
                        {map(businessTypes, businessType =>
                          <MenuItem
                            key={businessType}
                            value={businessType}
                            primaryText={businessType}
                            checked={form_values && form_values.category && form_values.category.indexOf(businessType) > -1}
                            insetChildren={true}
                          />
                        )}
                      </Field>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab buttonStyle={{ color: '#424242' }} icon={<GeneralBusinessInfoIcon style={{ color: "#6D6F7B" }} />} label={this.state.mode === normal ? 'General Business Info' : null} value={1} >
                <div className={styles.tabContent}>
                  <Field
                    component={StyledInput}
                    name='business_name'
                    label='Business Name'
                    type='text'
                  />
                  <Field
                    half
                    component={StyledInput}
                    name='first_name'
                    label='First Name'
                    type='text'
                  />
                  <Field
                    half
                    component={StyledInput}
                    name='last_name'
                    label='Last Name'
                    type='text'
                  />
                  <Field
                    component={StyledInput}
                    name='title'
                    label='Job Title'
                    type='text'
                  />
                  <Field
                    component={StyledInput}
                    name='address_1'
                    label='Address (must be in Ontario)'
                    type='text'
                  />
                  <Field
                    half
                    component={StyledInput}
                    name='city'
                    label='City'
                    type='text'
                  />
                  <Field
                    half
                    component={StyledInput}
                    label='Province'
                    name='province'
                    type='text'
                    value='Ontario'
                    disabled
                  />
                  <Field
                    half
                    component={StyledInput}
                    label='Country'
                    name='country'
                    type='text'
                    value='Canada'
                    disabled
                  />
                  <Field
                    half
                    component={StyledInput}
                    name='postal_code'
                    label='Postal Code'
                    type='text'
                  />
                  <Field
                    component={StyledInput}
                    name='email'
                    label='Contact Email'
                    type='email'
                  />
                  <Field
                    half
                    component={StyledInput}
                    name='phone'
                    label='Phone Number'
                    type='tel'
                    validate={checkPhoneLength}
                  />
                  <Field
                    half
                    component={StyledInput}
                    name='fax'
                    label='Fax Number'
                    type='tel'
                    validate={checkPhoneLength}
                  />
                  <Field
                    half
                    component={StyledInput}
                    name='cell'
                    label='Cell Number'
                    type='tel'
                    validate={checkPhoneLength}
                  />
                  <Field
                    textarea
                    component={StyledInput}
                    name='description'
                    label='Profile Description'
                    type='text'
                  />
                  <Field
                    component={Checkbox}
                    name='greenbelt_location'
                    label='Is your business located in the greenbelt? Check for yes.'
                    type='checkbox'
                  />
                  <i style={{paddingLeft: 40}}>View the <a href='http://www.mah.gov.on.ca/AssetFactory.aspx?did=17124' target='_blank' rel='noopener noreferrer'>Greenbelt Map</a> for reference.</i>
                </div>
              </Tab>
              <Tab buttonStyle={{ color: '#424242' }} icon={<ShareIcon style={{ color: "#6D6F7B" }} />} label={this.state.mode === normal ? 'Web & Social Media' : null} value={2} >
                <div className={styles.tabContent}>
                  <Field
                    component={StyledInput}
                    name='website'
                    label='Website'
                    type='text'
                    validate={customUrlValdiation}
                  />
                  { (isSeller || isProcessor) &&
                  <Field
                    half
                    component={StyledInput}
                    name='online_store'
                    label='Online Store'
                    type='text'
                    validate={customUrlValdiation}
                  />
                  }
                  <Field
                    half
                    component={StyledInput}
                    name='facebook'
                    label='Facebook'
                    type='text'
                    validate={customUrlValdiation}
                  />
                  <Field
                    half
                    component={StyledInput}
                    name='twitter'
                    label='Twitter'
                    hintText="@handle"
                    type='text'
                    validate={customUrlValdiation}
                  />
                  <Field
                    half
                    component={StyledInput}
                    name='instagram'
                    label='Instagram'
                    hintText="@handle"
                    type='text'
                    validate={customUrlValdiation}
                  />
                  <Field
                    half
                    component={StyledInput}
                    name='linkedin'
                    label='LinkedIn'
                    type='text'
                    validate={customUrlValdiation}
                  />
                </div>
              </Tab>
              <Tab buttonStyle={{ color: '#424242' }} icon={<AccountIcon style={{ color: "#6D6F7B"}} />} label={this.state.mode === normal ? 'Account' : null} value={3}>
                <div className={styles.tabContent}>
                  <div style={{ paddingLeft: "0.3rem", paddingRight: "0.3rem", marginBottom: "1rem" }}>
                    <div>You have selected the following value chain roles. This information helps to identify your account type to the <strong>Ontario</strong><em>fresh</em>.ca community.</div>
                    {map(this.state.roles, (number) => {
                      /*
                      console.log('%c number:', 'color: blue; font-weight: bold;')
                      console.log({ number })
                      */
                      return (
                        <div key={number} className={styles.roleDescription}>
                          <div className={styles.roleDescriptionText}>
                            <h5 className={styles.roleTitle}>
                              <strong>{roleValuesToLabel[number - 1]}</strong>
                            </h5>
                            {describeEditRoles([number])}
                          </div>
                        </div>
                      )
                    })}
                    <br />
                    {!isOrganization &&
                    <div>
                      <EditRolesModal handleClose={this.rolesSelected} buttonLabel="Account Changes" initialRoles={this.state.roles} />
                      <br />
                      <i>Click the button above to add, remove or change which value chain roles are assigned to your business.</i>
                    </div>
                    }
                  </div>
                </div>
              </Tab>
              
            </Tabs>
            {isIE() ? actions : null}
          </form>
        </Dialog>
      </div>
    )
  }
}

const resetForm = (result, dispatch) =>
  dispatch(reset('editProfileItemsModal'))

const mapStateToProps = state => ({
  client: state.client,
  profile: state.profile,
  search_component: state.searchComponent,
  editProfileItemsModal: state.editProfileItemsModal,
  form_values: getFormValues('editProfileItemsModal')(state),
  pristine: isPristine('editProfileItemsModal')(state)
})

export default compose(
  connect(mapStateToProps, {
    profileUpdate,
    getCategoriesList
  }),
  reduxForm({
    form: 'editProfileItemsModal',
    onSubmitSuccess: resetForm,
  })
)(EditProfileItemsModal)