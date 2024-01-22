import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { Row, Col } from 'react-flexbox-grid'

import Dialog from 'material-ui/Dialog'
import ProfilePlaceholder from '../../assets/images/ontario-fresh-profile-placeholder.jpg'
import FlatButton from 'material-ui/FlatButton'

import CreateMessageModal from '../../containers/createMessageModal'

import styles from './styles.module.scss'

import { formatText } from '../../utils/markup'

const category_map = {
  0: 'Other',
  1: 'Alcoholic Beverages',
  2: 'Dairy and Eggs',
  3: 'Fish',
  4: 'Fruit',
  5: 'Grains',
  6: 'Meat',
  7: 'Non-Alcoholic Beverages',
  8: 'Nuts, Seeds, & Herbs',
  9: 'Prepared Food & Condiments',
  10: 'Vegetables',
}

class ClassifiedsDetailedViewModal extends React.Component {
  render () {
    const {
      open,
      handleClose,
      data: {
        account,
        photo_file_name,
        title,
        description,
        looking_for,
        needed_by,
        category
      },
      profile: {
        authed: {
          id
        }
      }
    } = this.props

    const actions = [
      <FlatButton
        style={{ color: '#e74c3c'}}
        secondary
        label="Close"
        onClick={handleClose}
      />
    ]

    if (account && id !== account.id) {
      actions.push(<CreateMessageModal actionButton recipient={account} nextPageAfterLogin={'search/classifieds'} />)
    }

    return account ? (
      <Dialog
        autoScrollBodyContent
        modal
        title={(looking_for ? "Wanted" : "For Sale") + " - " + title}
        actions={actions}
        contentClassName='responsiveDialog'
        open={open}
      >
        <span className="close-modal" onClick={handleClose}>&times;</span>
        <Row>
          <Col xs={12} sm={4}>
            <img alt="" className={styles.classifiedImage} src={photo_file_name || "invalid_link"} onError={(e) => { e.target.src = ProfilePlaceholder }} />
          </Col>
          <Col xs={12} sm={8}>
            <span className={styles.fieldLabel}>Posted by:</span>
            <p><a href={`/profiles/${account.slug}`}>{account.business_name}</a></p>
            <span className={styles.fieldLabel}>{looking_for ? "Needed by:" : "Expiry:" }</span>
            <p>{moment(needed_by).utc().format('dddd, MMMM Do YYYY')}</p>
            {
              (category !== undefined || category !== null) && <div>
                <span className={styles.fieldLabel}>Category</span>
                <p>{category_map[category]}</p>    
              </div>
            }
          </Col>
        </Row>
        <h4>Description</h4>
        <div className={styles.classifiedsDescription}>
          {formatText(description)}
        </div>
      </Dialog>
    )
    :
    null
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
})

const connected = connect(mapStateToProps)

export default connected(ClassifiedsDetailedViewModal)