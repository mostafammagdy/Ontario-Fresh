import React from 'react'
import { connect } from 'react-redux'
import { map, findIndex } from 'lodash'

import Dialog from 'material-ui/Dialog'
import Checkbox from 'material-ui/Checkbox'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'

import EditIcon from 'material-ui/svg-icons/editor/mode-edit'

import camelCaseToString from '../../utils/convert-strings'
import { convertObjectToSortedArrayWithKey } from '../../utils/display-data'

import { Row } from 'react-flexbox-grid'

import styles from './styles.module.scss'

import {
  safetyStandardsUpdate,
  classificationsUpdate,
  processingTypesUpdate,
  marketTypesUpdate,
  servicesUpdate,
} from './actions'

class EditListModal extends React.Component {
  constructor(props) {
    super(props)
    const modifiedData = convertObjectToSortedArrayWithKey(this.props.data)
    if (props.type === 'safetyStandards') {
      let noneIndex = findIndex(modifiedData, object => object.key === 'none')
      if (noneIndex > -1 && noneIndex !== (modifiedData.length - 1)) {
        let element = modifiedData.splice(noneIndex, 1)[0]
        if (props.accountRole !== 'processor') {
          modifiedData.push(element)
        }
      }
    }

    this.state = {
      open: false,
      hasChanged: false,
      form: this.props.data,
      sortedData: modifiedData
    }
  }

  handleOpen = () => {
    this.setState({
      open: true,
      form: this.props.data,
    })
  }

  handleClose = () => {
    this.setState({
      open: false,
      hasChanged: false,
    })
  }

  handleUpdateCheck = ( key ) => {
    this.setState({
      form: {
        ...this.state.form,
        [key]: {
          ...this.state.form[key],
          value: !this.state.form[key].value,
        }
      }
    })

    this.setState({ hasChanged: true })
  }

  handleSubmit = () => {
    const {
        id,
        client,
        type,
     } = this.props
    const details = this.state.form
    if (client && client.token) {
      this.props[`${type}Update`](client, { id, details})
    }
    this.handleClose()
  }

  render () {
    const {
      textLink,
      type,
      label,
      title,
      subtitle,
      accountRole,
      headerEdit
    } = this.props

    const { sortedData } = this.state

    const actions = [
      <FlatButton
        primary
        label="Cancel"
        onClick={this.handleClose}
      />,
      <RaisedButton
        disabled={!this.state.hasChanged}
        primary
        label="Submit"
        onClick={() => this.handleSubmit()}
      />
    ]

    return (
      <div>
        {
          !!textLink && accountRole === "buyer" ?
            <a
              onClick={this.handleOpen}
            >
              Add the <span className="textLink">Food Safety and Traceability Standards</span> that you require from suppliers
            </a>
          :
          !!textLink && (accountRole === "seller" || accountRole === "processor") ?
            <a
              onClick={this.handleOpen}
            >
              Add your Food Safety and Traceability Standards
            </a>
          :
          !!textLink ?
            <a
              onClick={this.handleOpen}
            >
              Add { label || camelCaseToString(type)}
            </a>
          :
          <span
            className={ headerEdit ? styles.headerEditButton: "editButton"}
          >
            <IconButton
              tooltip="Edit Profile Item"
              tooltipPosition="bottom-center"
              onClick={this.handleOpen}
            >
              <EditIcon />
            </IconButton>
          </span>
        }
        {/*
          !!textLink && accountRole === "buyer" ?
            <span>
              Add the <span className="textLink">Food Safety and Traceability Standards</span> that you require from suppliers
            </span>
          :
          !!textLink && (accountRole === "seller" || accountRole === "processor") ?
            <span>
              No Food Safety and Traceability Standards added
            </span>
          :
          !!textLink ?
            <span>
              No { label || camelCaseToString(type)}
            </span>
          :
          <span />
      */}
        <Dialog
          autoScrollBodyContent
          modal
          title={title || "Edit Your Profile"}
          actions={actions}
          contentClassName='responsiveDialog'
          open={this.state.open}
        >
          <span className="close-modal" onClick={this.handleClose}>&times;</span>
          { subtitle &&
            <i>{subtitle}</i>
          }
          <Row style={{ paddingTop: '1rem' }}>
            <ul style={{ listStyle: 'none', width: '100%' }}>
              {map(sortedData, (item, key) =>
                <li key={item.key}>
                  <Checkbox
                    key={item.key}
                    checked={this.state.form[item.key].value}
                    label={item.display}
                    onCheck={() => this.handleUpdateCheck(item.key)}
                  />
                </li>
              )}
            </ul>
          </Row>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  client: state.client,
  profile: state.profile,
})

const connected = connect(mapStateToProps, {
  safetyStandardsUpdate,
  classificationsUpdate,
  processingTypesUpdate,
  marketTypesUpdate,
  servicesUpdate,
 })

export default connected(EditListModal)
