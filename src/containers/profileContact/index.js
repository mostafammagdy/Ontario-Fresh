import React from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { map } from 'lodash'

import Avatar from 'material-ui/Avatar'
import {List, ListItem} from 'material-ui/List'

import EditProfileItemsModal from '../editProfileItemsModal'
import CreateContactModal from '../createContactModal'
import EditContactModal from '../editContactModal'
import CreateAddressModal from '../createAddressModal'
import EditAddressModal from '../editAddressModal'

//import ResizableButton from '../../components/resizableButton'
import StyledCard from '../../components/styledCard'

import BuildingIcon from 'material-ui/svg-icons/social/location-city'
import PhoneIcon from 'material-ui/svg-icons/communication/contact-phone'
import EmailIcon from 'material-ui/svg-icons/communication/email'

import styles from './styles.module.scss'

class ProfileContact extends React.Component {
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
  }

  render () {
    const {
      profile: {
        current: {
          id,
          business_name,
          first_name,
          last_name,
          title,
          email,
          phone,
          fax,
          cell,
          address_1,
          city,
          postal_code,
          contacts,
          addresses,
        }
      }
    } = this.props

    const editable = window.location.pathname.startsWith('/viewProfile') ? false : (this.props.profile && this.props.profile.current && this.props.profile.current.editable)

    const primaryContactName = "" + (first_name ? first_name : "") + (first_name && last_name ? (" " + last_name) : "") + (title ? (" - " + title) : "")
    const primaryContactDetails = <div style={{height: 'auto'}}>
      {phone && <div className={styles.telephoneEmailInfo}><strong>Tel: </strong>{phone}</div>}
      {fax && <div className={styles.telephoneEmailInfo}><strong>Fax: </strong>{fax}</div>}
      {cell && <div className={styles.telephoneEmailInfo}><strong>Cell: </strong>{cell}</div>}
      {email && <div className={styles.telephoneEmailInfo}><strong>Email: </strong>{email}</div>}
      {address_1 && <div>{ address_1 + (city ? (', ' + city)  : "") + (city && postal_code ? ', ON, ' + postal_code : '')}</div>}
    </div>

    return (
      <div>
        <StyledCard
          cardTitle={`Contact ${business_name || "Business"}`}
          cardText={
            <List>
              {first_name &&
              <ListItem
                key="primaryContact"
                secondaryTextLines={2}
                leftAvatar={first_name ? <Avatar>{first_name[0]}</Avatar> : null}
                primaryText={primaryContactName}
                secondaryText={primaryContactDetails}
                rightIcon={editable ? <EditProfileItemsModal contactEdit type="description" data={business_name} id={id} /> : null}
              />
              }
              {contacts && contacts.length > 0 &&
                map(contacts, (item, key) =>
                  <ListItem
                    key={"name"+key+item.name+item.id}
                    hoverColor="white"
                    secondaryTextLines={2}
                    leftAvatar={<Avatar icon={!item.name && item.email ? <EmailIcon /> : !item.name ? <PhoneIcon /> : null}>{item.name ? item.name[0] : null}</Avatar>}
                    primaryText={item.name && <div>{item.name + (item.position ? (' - ' + item.position) : '')}</div>}
                    secondaryText={<div style={{height: 'auto'}}>
                      {item.phone && <div className={styles.telephoneEmailInfo}><strong>Tel:</strong> {item.phone}</div>}
                      {item.fax && <div className={styles.telephoneEmailInfo}><strong>Fax: </strong>{item.fax}</div>}
                      {item.cell && <div className={styles.telephoneEmailInfo}><strong>Cell: </strong>{item.cell}</div>}
                      {item.email && <div><strong className={styles.telephoneEmailInfo}>Email:</strong> {item.email}</div>}
                    </div>}
                    rightIcon={editable ? <EditContactModal contact_id={item.id} /> : null}
                  />
                )
              }
              {addresses && addresses.length > 0 &&
                map(addresses, (item, key) =>
                  <ListItem
                    key={"address"+key+item.address_1+item.id}
                    hoverColor="white"
                    secondaryTextLines={2}
                    leftAvatar={<Avatar icon={<BuildingIcon />} />}
                    primaryText={item.description && <div>{item.description}</div>}
                    secondaryText={<div style={{height: 'auto'}}>
                      <div>{item.address_1} {item.address_2 && `- ${item.address_2}`}</div>
                      <div>{item.city}, {item.province} {item.postal_code}</div>
                      {item.phone && <div className={styles.telephoneEmailInfo}>Tel: {item.phone}</div>}
                    </div>}
                    rightIcon={editable ? <EditAddressModal address_id={item.id} /> : null}
                  />
                )
              }
              {/* {contacts && addresses && (contacts.length + addresses.length) === 0  &&
                <div>
                  <ResizableButton
                    fullWidth
                    disabled
                    primary
                    size="1.2"
                    label="No Contact Information Available"
                  />
                  <br/>
                </div>
              } */}
              <br/>
              
              {editable &&
                <div>
                  <CreateContactModal />
                  {/*
                  <br />
                  <CreateAddressModal />
                  */}
                </div>
              }
            </List>
          } 
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  client: state.client,
  profile: state.profile,
})

const connected = connect(mapStateToProps)

export default connected(ProfileContact)
