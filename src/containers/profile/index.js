import React from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { map, filter, findIndex } from 'lodash'

import {Tabs, Tab} from 'material-ui/Tabs'
import Snackbar from 'material-ui/Snackbar'
import {ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import CancelIcon from 'material-ui/svg-icons/navigation/cancel'
import Divider from 'material-ui/Divider'
import LinkIcon from 'material-ui/svg-icons/content/link'
import AttachIcon from 'material-ui/svg-icons/editor/attach-file'
import DownloadIcon from 'material-ui/svg-icons/file/file-download'
import Dropzone from 'react-dropzone'

import ProfileContact from '../profileContact'
import GalleryPhotos from '../profilePhotos'
import ProfileClassifieds from '../profileClassifieds'

import InlineLoader from '../../components/inlineLoader'
import ConfirmationDialog from '../../components/confirmationDialog'
import CreateMessageModal from '../createMessageModal'
import RequestConnectionModal from '../requestConnectionModal'
import EditProfileItemsModal from '../editProfileItemsModal'
import EditImageModal from '../editImageModal'

import SocialLinks from '../socialLinks'
import Onboarding from '../onboarding'

import StyledCard from '../../components/styledCard'
import ProfilePageMenu from '../../components/profilePageMenu'
import ProfileTypeCard from '../../components/profileTypeCard'
import ServicesProvidedCard from '../../components/serviceProfileCard'

import { filePrefix } from '../../utils/file-hosting'

import { Row, Col, Grid } from 'react-flexbox-grid'

import styles from './styles.module.scss'

import ProfilePlaceholder from '../../assets/images/ontario-fresh-profile-placeholder.jpg'

import { isEmpty, find, some, forEach } from 'lodash'

import { formatPhoneNumber, formatSimplePhoneNumber } from '../../utils/format'
import { formatText } from '../../utils/markup'
import { isIE } from '../../utils/ie-detection'

import {
  profileRequest,
  publicProfileRequest,
  deleteConnectionRequest,
  profileFileUploadRequest,
  profileFileDeleteRequest,
} from './actions'

import {
  userMessagesRequest,
} from '../messages/actions'

import InstagramIcon from '../../assets/images/instagram.svg'

const svgStyles = {
  display: 'inline-block',
  color: 'rgba(0, 0, 0, 0.87)',
  fill: 'rgb(98, 100, 112)',
  userSelect: 'none',
  transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
  verticalAlign: 'middle',
  marginRight: 6,
}

const socialIcons = {
  'facebook': 'M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M18,5H15.5A3.5,3.5 0 0,0 12,8.5V11H10V14H12V21H15V14H18V11H15V9A1,1 0 0,1 16,8H18V5Z',
  'twitter': 'M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z',
  'linkedin': 'M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C14.39,9.94 13.4,10.46 12.92,11.24V10.13H10.13V18.5H12.92V13.57C12.92,12.8 13.54,12.17 14.31,12.17A1.4,1.4 0 0,1 15.71,13.57V18.5H18.5M6.88,8.56A1.68,1.68 0 0,0 8.56,6.88C8.56,5.95 7.81,5.19 6.88,5.19A1.69,1.69 0 0,0 5.19,6.88C5.19,7.81 5.95,8.56 6.88,8.56M8.27,18.5V10.13H5.5V18.5H8.27Z'
}

const Icon = props => (
  <a
    href={props.link}
    target="_blank"
    rel="noopener noreferrer"
  >
    <svg
      width={24}
      height={24}
      viewBox={`0 0 ${24} ${24}`}
      style={svgStyles}
    >
      <path d={socialIcons[props.icon]}></path>
    </svg>
  </a>
)

const rolePriorities = {
  'seller': 1,
  'buyer': 2,
  //'organization': 3,
  'processor': 4,
  //'service_provider': 5
}

const rolePriority = role => rolePriorities.hasOwnProperty(role.value) ? rolePriorities[role.value] : Infinity;

class Profile extends React.Component {
  static propTypes = {
    client: PropTypes.shape({
      username: PropTypes.string,
      user_id: PropTypes.number,
      email: PropTypes.string,
      exp: PropTypes.number,
      token: PropTypes.string,
    }).isRequired,
    profile: PropTypes.shape({
      current: PropTypes.shape({
        id: PropTypes.number,
      }),
      requesting: PropTypes.bool,
      successful: PropTypes.bool,
      editing: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array,
    }).isRequired,
    profileRequest: PropTypes.func.isRequired,
    publicProfileRequest: PropTypes.func.isRequired,
    deleteConnectionRequest: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      confirmWithUser: false,
      companyName: undefined,
      callback: null,
      ellipse_show: false,
      long_desc: false,
    }
  }
































  getProfile = () => {
    const { client, profileRequest, publicProfileRequest, params } = this.props
    /*
    console.log('%c Profile getProfile props:', 'color: blue; font-weight: bold;')
    console.log({ client, profileRequest, publicProfileRequest, params })
    */

    if (params.slug)
      return publicProfileRequest(client, params.slug)
    else if (client && client.token)
      return profileRequest(client)
    return false
  }


































  UNSAFE_componentWillMount() {
    window.scrollTo(0, 0)
    // console.log('%c User’s profile information is requested when Profile mounts here in UNSAFE_componentWillMount:', 'font-style: italic;')
    this.getProfile()

    if (this.props.client && this.props.client.token) {
      this.props.userMessagesRequest(this.props.client) //for the blocked status
    }

    document.body.style.backgroundColor = "#F5F4F5"
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = null
  }

  componentDidUpdate(prevProps) {
    if (this.props.params.slug !== prevProps.params.slug) {
      this.getProfile()
    }
    if (this.props.profile.current.description !== prevProps.profile.current.description) {
      if (document.getElementById("description_parent")?.clientHeight < document.getElementById("description_child")?.clientHeight){
        this.setState({
          ellipse_show: true,
          long_desc: false
        })
      }
      else{
        this.setState({
          ellipse_show: false,
          long_desc: false
        })
      }
    }
  }

  componentDidMount() {
    if (document.getElementById("description_parent")?.clientHeight < document.getElementById("description_child")?.clientHeight){
      this.setState({
        ellipse_show: true,
        long_desc: false
      })
    }
    else{
      this.setState({
        ellipse_show: false,
        long_desc: false
      })
    }
  }

  handleClick = (companyName, callback) => {
    const {
      client,
    } = this.props

    if (client && client.token) {
      this.setState({
        confirmWithUser: true,
        companyName,
        callback
      })
    }
  }

  handleConfirm = () => {
    const {
      client
    } = this.props

    if (client && client.token && this.state.callback !== null) {
      this.state.callback()
    }

    this.setState({
      confirmWithUser: false,
      companyName: undefined,
      callback: null
    })
  }

  handleClose = () => {
    this.setState({
      confirmWithUser: false,
      companyName: undefined,
      callback: null
    })
  }

  onDrop = (acceptedFiles) => {
    const {
      client,
    } = this.props

    this.setState({
      ...this.state,
      files: acceptedFiles,
    })

    if (acceptedFiles.length > 0) {
      this.props.profileFileUploadRequest(client, { files: acceptedFiles })
    }
  }

  getFilename = (url) => url.substring(url.lastIndexOf('/') + 1)

  renderProfileSidebar(isOrganization, connections, editable, isOrganizationEditing) {
    const {
      profile: {
        current: {
          id,
          first_name,
          last_name,
          title,
          business_name,
          slug,
          email,
          photo_file_name,
          city,
          greenbelt_location,
          website,
          twitter,
          instagram,
          facebook,
          linkedin,
          phone,
          cell,
          fax,
          onf_users,
        },
        authed,
        fetch_public_profile
      },
      messages,
      client,
    } = this.props;

    let blockedProfiles = {};
    if (messages && !isEmpty(messages.user_messages)) {
      forEach(messages.user_messages.results, conversation => {
        if (conversation.silenced) {
          blockedProfiles[conversation.last_message.messages_meta[0].account.id] = true
          blockedProfiles[conversation.last_message.messages_meta[1].account.id] = true
        }
      })
    }
    if (authed.id) {
      blockedProfiles[authed.id] = false
    }

    return fetch_public_profile.requesting ? <div>
      <InlineLoader backgroundColor="rgb(245, 244, 245)" />
      <br />
      <br />
      <CreateMessageModal disabled />
      <ProfilePageMenu disabled/>
    </div>
    : <div className={styles.profileSidebar}>
      {
          editable && isOrganizationEditing &&
          <div className={styles.profileImageEditButton}><EditImageModal type="profile" /></div>
      }
      { isIE() ?
      <div className={styles.profileImageIE}
            style={{ backgroundImage: 'url(' + photo_file_name + ')' }}
      />
      :
      <div className={styles.profileImage}>
        <img alt="" src={photo_file_name || "invalid_link"} onError={(e) => { e.target.src = ProfilePlaceholder }} />
      </div>
      }
      {
        editable && isOrganizationEditing &&
          <EditProfileItemsModal type="businessName" data={business_name} id={id} />
      }
      <h1 className={styles.profileTitle}>{business_name || "Business"}</h1>
      {onf_users && onf_users.length > 0 &&
        <div className={styles.contactInformation}>
          {first_name &&
            <div>
              <strong>
                { first_name +
                  (last_name ? (" " + last_name) : "")
                }
              </strong>
            </div>
          }
          {title &&
            <div><strong>{title}</strong></div>
          }
          {email &&
            <div><a href={`mailto:${email}`}>{email}</a></div>
          }
          {phone &&
            <div><strong>Phone: </strong><a href={`tel:${formatSimplePhoneNumber(phone)}`}>{formatPhoneNumber(phone)}</a></div>
          }
          {fax &&
            <div><strong>Fax: </strong><a href={`tel:${formatSimplePhoneNumber(fax)}`}>{formatPhoneNumber(fax)}</a></div>
          }
          {cell &&
            <div><strong>Cell: </strong><a href={`tel:${formatSimplePhoneNumber(cell)}`}>{formatPhoneNumber(cell)}</a></div>
          }
        </div>
      }

      <div className={styles.profileDetails}>

        { website && <a href={(!website.startsWith("http") ? '//' : '') + website} target="_blank" rel="noopener noreferrer"><LinkIcon style={svgStyles} /></a> }
        { twitter && <Icon icon="twitter" link={(!twitter.startsWith("http") ? '//' : '') + twitter} />}
        { instagram && <a href={(!instagram.startsWith("http") ? '//' : '') + instagram} target="_blank" rel="noopener noreferrer">
                        <img src={InstagramIcon} style={{ width: 24, height: 24, verticalAlign: 'middle', marginRight: 6, marginBottom: 0 }} alt="IG handle" />
                        </a>
        }
        { facebook && <Icon icon="facebook" link={(!facebook.startsWith("http") ? '//' : '') + facebook} />}
        { linkedin && <Icon icon="linkedin" link={(!linkedin.startsWith("http") ? '//' : '') + linkedin} />}

        <div style={{marginTop: 15}}>
          {fetch_public_profile.successful && ('Location: ' + (city || "Ontario"))}
          {greenbelt_location &&
            <p><em style={{ color: "rgb(0, 112, 60)" }}>This business is located in the Greenbelt!</em></p>
          }
        </div>
      </div>
      <CreateMessageModal
        disabled={!id || (authed.id === id) || blockedProfiles[id]}
        nextPageAfterLogin={`/profiles/${slug}`}
      />
      { client.token &&
        !editable &&
        authed.roles &&
        ((authed.roles.indexOf(4) > -1 && !isOrganization) || (authed.roles.indexOf(4) === -1 && isOrganization)) && //profiles can only send requests to organizations and vice versa
        findIndex(connections, org => org.id === authed.id) === -1 &&
        <RequestConnectionModal isSenderAnOrganization={authed.roles.indexOf(4) > -1} />
      }
      <ProfilePageMenu disabled={fetch_public_profile.error} />
    </div>
  }























































  renderCentreCard(isOrganization, connections, editable, isOrganizationEditing) {
    const {
      profile: {
        current: {
          id,
          business_name,
          roles,
          category,
          description,
          onboarding,
          is_manager,
          files,
          services_needed,
          services_provided
        },
        fetch_public_profile
      },
      params,
      client,
      deleteConnectionRequest
    } = this.props
    
    const rolesFiltered = filter(roles, role => role.value !== 'organization' && role.value !== 'service_provider')
    const allCategories = category

    return fetch_public_profile.requesting ?
      <StyledCard
        cardTitle={<InlineLoader />}
        cardText={<InlineLoader />}
      />
    : params.component === "contact" ?
      <ProfileContact />
    : params.component === "photos" ?
      <GalleryPhotos
        isOrganizationEditing={isOrganizationEditing}
      />
    : params.component === "classifieds" ?
      <ProfileClassifieds />
    : <div>
      {/*
        (editable && onboarding) &&
          <Onboarding />
      */}
      <StyledCard
        cardTitle={<span style={{fontSize: '1.125rem'}}>{`About ${business_name || "Business"}`}</span>}
        cardText={
          <div style={{marginBottom: '-1rem'}}>
            {
              editable && isOrganizationEditing &&
                <EditProfileItemsModal
                  headerEdit type="description"
                  data={business_name}
                  id={id}
                />
            }
            <div >
              <div className={this.state.long_desc?styles.profileDescriptionLong: styles.profileDescription} id="description_parent">
                {<div id="description_child">
                  {(description && formatText(description)) || "This profile does not currently have a description"}
                  </div>} 
              </div>
              {this.state.ellipse_show && <div><b className={styles.ellipse} onClick={ () => { this.setState({long_desc: !this.state.long_desc}); }}>...</b></div>}
            </div>
            { (editable || (allCategories && some(allCategories))) &&
              <div className={styles.businessTypesSection}>
                <h6 className={styles.subHeader}>I am a</h6>
                {
                  editable && isOrganizationEditing &&
                    <EditProfileItemsModal
                      subheaderEdit
                      type="businessType"
                      data={business_name}
                      id={id}
                    />
                }
                <Divider style={{marginLeft: -16, marginRight: -16}} />
                <Row style={{fontWeight: 600, color: "rgb(0, 112, 60)", marginTop: '0.5rem', marginBottom: '1.45rem'}}>
                  {allCategories && some(allCategories) ?
                    map(allCategories, category =>
                    <Col key={category} xs={12} sm={6} style={{padding: 0}}>
                      <ul style={{marginTop: 0, marginBottom: 0}}>
                        <li>{category}</li>
                      </ul>
                    </Col>
                    )
                    :
                    <ul style={{marginTop: 0, marginBottom: 0}}>
                      <li>No Business Type</li>
                    </ul>
                  }
                </Row>
              </div>
            }
            <div className={styles.businessTypesSection}>
              <ServicesProvidedCard
                data={{services_needed, services_provided}}
                editable={editable && isOrganizationEditing}
              />
            </div>
            { isOrganization && (editable || isOrganization.data.role_details.edited) &&
              <div className={styles.businessTypesSection}>
                <h6 className={styles.subHeader}>Other:</h6>
                <Divider style={{ marginLeft: -16, marginRight: -16 }} />
                <li>Do We Require Third-Party Insurance: <strong>{isOrganization.data.role_details.edited ? (isOrganization.data.role_details.third_party_insurance ? 'Yes' : 'No') : ''}</strong></li>
              </div>
            }
            {(editable && isOrganizationEditing || (files && files.length > 0)) &&
              <div className={styles.businessTypesSection}>
                <h6 className={styles.subHeader}>Attachments</h6>
                <Divider style={{ marginLeft: -16, marginRight: -16 }} />
              </div>
            }
            {editable && isOrganizationEditing &&
              <i style={{fontSize: 12}}>This is an opportunity to provide more detailed information to prospective business partners, such as brochures and product lists. The title of the document is displayed on your profile.</i>
            }
            <div className={styles.files}>
              {editable && isOrganizationEditing &&
                <Dropzone
                  accept="image/*,application/pdf,.doc,.docx,application/msword,application/vnd.ms-excel"
                  className={styles.dropzone}
                  onDrop={this.onDrop.bind(this)}
                  multiple={false}
                >
                  <a className={styles.uploadFileButton}>
                    <AttachIcon />
                    <span style={{ marginLeft: 4, marginRight: 4}}>Attach a photo or PDF</span>
                  </a>
                </Dropzone>
              }
              { files && files.length > 0 &&
                map(files, file =>
                  <div className={styles.uploadFileButton} key={file.id}>
                    <DownloadIcon />
                    <a href={filePrefix + file.file_data} className={styles.uploadFileLabel} target="_blank" rel="noopener noreferrer">{this.getFilename(file.file_data)}</a>
                    {editable && isOrganizationEditing && <CancelIcon hoverColor={"gray"} onClick={() => this.props.profileFileDeleteRequest(client, {file_id: file.id})} />}
                  </div>
                )
              }
            </div>
          </div>
        } 
      />
      {/* <!-- Role Specific Info --> */}
      {/* If one profile, show card directly - otherwise, show Tabbed view */}

      {rolesFiltered && rolesFiltered.length === 1 &&
                <ProfileTypeCard role={rolesFiltered[0]} editable={editable && isOrganizationEditing} />
      }
      {rolesFiltered && rolesFiltered.length > 1 &&
        <Tabs
          inkBarStyle={{ backgroundColor: '#00703C', height: 5, marginTop: -5 }}
          tabItemContainerStyle={{ backgroundColor: '#E9E9E9' }}
        >
          {map(rolesFiltered.sort((a, b) => rolePriority(a) - rolePriority(b)), (role, key) =>
            <Tab label={role.label} key={key} style={{ color: '#424242' }}>
              <ProfileTypeCard role={role} editable={editable && isOrganizationEditing} />
            </Tab>
          )}
        </Tabs>
      }
      { (isOrganization || is_manager) && connections.length > 0 &&
        <StyledCard cardTitle={<span style={{fontSize: '1.125rem'}}>Membership</span>} cardText={
          <Row>
            { map(connections, (item, key) =>
              editable && isOrganizationEditing ?
              <Col key={item.slug} xs={12} sm={12} md={6}>
                <Row around="xs">
                  <Col xs={10}>
                    <Link to={`/profiles/${item.slug}`} style={{ 'textDecoration': 'none' }}>
                      <ListItem
                        leftAvatar={<Avatar src={item.photo_file_name || "invalid_link"} style={{objectFit: 'cover'}} onError={(e) => { e.target.src = ProfilePlaceholder }} />}
                        primaryText={<div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.business_name} </div>}
                      />
                    </Link>
                  </Col>

                  <Col xs={2} className={styles.cancelButton}>
                    <CancelIcon hoverColor={"gray"} onClick={(e) => this.handleClick(item.business_name, () => deleteConnectionRequest(client, item.connection))} />
                  </Col>
                </Row>
              </Col>
              :
              <Col key={item.slug} xs={12} sm={12} md={6}>
                <Link to={`/profiles/${item.slug}`} style={{ 'textDecoration': 'none' }}>
                  <ListItem
                    leftAvatar={<Avatar src={item.photo_file_name || "invalid_link"} style={{objectFit: 'cover'}} onError={(e) => { e.target.src = ProfilePlaceholder }} />}
                    primaryText={<div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.business_name} </div>}
                  />
                </Link>
              </Col>
            )}
          </Row>
        }/>
      }
    </div>
  }


































































  renderWebsiteAndConnections (isOrganization, connections, editable) {
    const {
      profile: {
        current: {
          is_manager,
          online_store,
          roles,
        },
        fetch_public_profile
      },
      client,
      deleteConnectionRequest
    } = this.props

    const isSeller = find(roles, role => role.value === 'seller');
    const isProcessor = find(roles, role => role.value === 'processor');

    return fetch_public_profile.requesting ?
      <InlineLoader backgroundColor="rgb(245, 244, 245)" />
    : [
      (isSeller || isProcessor) && (editable || online_store) ? <StyledCard key='website' cardTitle={<span style={{fontSize: '1.125rem'}}>Buy Online</span>} cardText={<SocialLinks />}/> : undefined,
      !(isOrganization || is_manager) && connections.length > 0 ?
        <StyledCard key='connections' cardTitle={<span style={{ fontSize: '1.125rem' }}>Membership</span>} cardText={
          <Row>
            { map(connections, (item, key) =>
            editable ?
              <Col key={item.slug} xs={12}>
                <Row around="xs">
                  <Col xs={10}>
                    <Link to={`/profiles/${item.slug}`} style={{ 'textDecoration': 'none' }}>
                      <ListItem
                        leftAvatar={<Avatar src={item.photo_file_name || "invalid_link"} style={{objectFit: 'cover'}} onError={(e) => { e.target.src = ProfilePlaceholder }} />}
                        primaryText={<div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.business_name} </div>}
                      />
                    </Link>
                  </Col>

                  <Col xs={2} className={styles.cancelButton}>
                    <CancelIcon hoverColor={"gray"} onClick={(e) => this.handleClick(item.business_name, () => deleteConnectionRequest(client, item.connection))} />
                  </Col>
                </Row>
              </Col>
              :
              <Col key={item.slug} xs={12}>
                <Link to={`/profiles/${item.slug}`} style={{ 'textDecoration': 'none' }}>
                  <ListItem
                    leftAvatar={<Avatar src={item.photo_file_name || "invalid_link"} style={{objectFit: 'cover'}} onError={(e) => { e.target.src = ProfilePlaceholder }} />}
                    primaryText={<div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.business_name} </div>}
                  />
                </Link>
              </Col>
            )}
          </Row>
        }/> : undefined,
    ]
  }
  



















































  render() {
    const {
      profile: {
        current: {
          business_name,
          roles,
          organizations,
          accounts,
        },
        fetch_public_profile
      },
      messages,
    } = this.props
    /*
    console.log('%c profile props:', 'color: blue; font-weight: bold;')
    console.log({ props: this.props })
    */
    // console.log('%c profile profile.current appears to be missing!', 'color: red; font-weight: bold; text-decoration: underline;')

    /*
    console.log('%c <Profile />’s props.client, props.profile:', 'color: blue; font-weight: bold;')
    console.log({ client: this.props.client, profile: this.props.profile })
    */
    /*
    console.log('%c <Profile />’s props.params.slug:', 'color: blue; font-weight: bold;')
    console.log({ slug: this.props.params.slug })
    */
    /*
    console.log('%c organizations, accounts:', 'color: green; font-weight: bold;')
    console.log({ organizations, accounts })
    */

    /*
      ALERT: Here’s where the “editable” variable is determined.
    */
    const editable = window.location.pathname.startsWith('/viewProfile') ?
        false
      : (this.props.profile && this.props.profile.current && this.props.profile.current.editable)
    // const editable = false;
    const isOrganization = find(roles, role => role.value === 'organization');
    const connections = (organizations && accounts) ? (organizations.concat(accounts)).sort((a, b) => b.photo_file_name.length - a.photo_file_name.length || a.business_name.localeCompare(b.business_name)) : []
    // for (let i = 0; i < (roles || []).length; i++ ) {
    //   Object.assign(allCategories, roles[i].data.category, { "Co-op": allCategories["Co-op"] || roles[i].data.category["Co-op"] })
    // }
    const isOrganizationEditing = this.props.profile.authed.id !== this.props.profile.current.id;
    /*
    console.log('%c isOrganizationEditing:', 'color: tomato; font-weight: bold;')
    console.log({ isOrganizationEditing })
    */
    return (
      <div className={styles.profileContainer}>
        <Grid fluid className={styles.profileInfo}>
          <div className={styles.breadCrumbs}>
            <span><Link to="/search">All Profiles</Link> / </span>
            { !fetch_public_profile.requesting &&
              <span className={styles.currentCrumb}>{business_name}</span>
            }
          </div>

          <Row>
            <Col xs={12} sm={3} >
              {this.renderProfileSidebar(isOrganization, connections, editable, isOrganizationEditing)}
            </Col>

            <Col xs={12} sm={6}>
              {this.renderCentreCard(isOrganization, connections, editable, isOrganizationEditing)}
            </Col>

            <Col xs={12} sm={3}>
              {this.renderWebsiteAndConnections(isOrganization, connections, editable)}
            </Col>
          </Row>
          <span className={styles.scrollToTop} onClick={() => window.scrollTo(0, 0)}>Back to the top</span>
        </Grid>

        <ConfirmationDialog
          open={this.state.confirmWithUser}
          confirmationTitle={'Confirmation Required'}
          confirmationMessage={'You are about to remove your connection with ' + this.state.companyName + '.\n\nAre you sure you would like to proceed?'}
          confirmationLabel={'Remove Connection'}
          cancelLabel={'Cancel'}
          handleConfirm={this.handleConfirm}
          handleClose={this.handleClose}
        />

        <Snackbar
          open={messages.notify}
          message="Successfully Sent Message!"
          autoHideDuration={4000}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  client: state.client,
  profile: state.profile,
  messages: state.messages,
})

const connected = connect(mapStateToProps, {
  profileRequest,
  publicProfileRequest,
  deleteConnectionRequest,
  profileFileUploadRequest,
  profileFileDeleteRequest,
  userMessagesRequest
})

export default connected(Profile)
