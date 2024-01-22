import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { reduxForm, Field, isPristine, reset, initialize } from 'redux-form'
import { find } from 'lodash'
import moment from 'moment'
import { SelectField } from 'redux-form-material-ui'

import { Row, Col } from 'react-flexbox-grid'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import { Tabs, Tab } from 'material-ui/Tabs'

import Dropzone from 'react-dropzone'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

import EditIcon from 'material-ui/svg-icons/editor/mode-edit'

import StyledInput from '../../components/styledInput'

import { checkRequired } from '../../utils/client-side-validation'
import { isIE } from '../../utils/ie-detection'

import '../../utils/toBlob-polyfill'

import styles from './styles.module.scss'

import {
  classifiedUpdate,
  classifiedDelete,
} from './actions'

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

class EditClassifiedModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      looking_for: undefined,
      files: [],
      cropped: null,
      modifiedTab: false
    }
  }

  handleInitializeValues = () => {
    const classified = find(this.props.profileClassifieds.current.results, ['id', this.props.classified_id])
    const initialFormValues = {
      'title': classified.title,
      'description': classified.description,
      'looking_for': classified.looking_for,
      'category': classified.category
    }

    this.props.dispatch(initialize('editClassifiedModal', initialFormValues))
  }

  onDrop(files) {
    this.setState({
      files,
    })
  }

  handleOpen = () => {
    this.handleInitializeValues()
    this.setState({ open: true })
    const classified = find(this.props.profileClassifieds.current.results, ['id', this.props.classified_id])
    this.setState({
      title: classified.title,
      looking_for: classified.looking_for,
      photo_file_name: classified.photo_file_name
    })
  }

  handleClose = () => {
    let file = this.state.files[0]
    file && window.URL.revokeObjectURL(file.preview)

    this.setState({
      open: false,
      files: [],
      looking_for: true,
      cropped: null,
    })
  }

  handleChangeLookingFor = (value) => {
    this.setState({ looking_for: value, modifiedTab: true })
  }

  handleSubmitForm = (values) => {
    const {
      client,
      classifiedUpdate,
      classified_id,
      profile: {
        current: {
          id
        }
      }
    } = this.props

    const modifiedValues = Object.assign(values, { looking_for: this.state.looking_for })

    if (this.refs.cropper) this.refs.cropper.getCroppedCanvas().toBlob(file => {
      if (client && client.token) classifiedUpdate(client, { classified_id, values: modifiedValues, file, id })
    })
    else if (client && client.token) classifiedUpdate(client, { classified_id, values: modifiedValues, id })

    this.handleClose()
  }

  handleDeleteClassified = () => {
    const {
      client,
      classifiedDelete,
      classified_id,
      profile: {
        current: {
          id
        }
      }
    } = this.props

    if (client && client.token) classifiedDelete(client, { classified_id, id })
    this.handleClose()
  }

  render () {
    const file = this.state.files[0]
    const {
      handleSubmit,
      pristine,
    } = this.props

    const actions = isIE() ? <div style={{ paddingTop: 40, paddingBottom: 20, float: 'right' }}>
      <FlatButton
        style={{ color: '#e74c3c', float: 'left' }}
        secondary
        label="Delete"
        onClick={this.handleDeleteClassified}
      />
      <FlatButton
        primary
        label="Cancel"
        onClick={this.handleClose}
      />
      <RaisedButton
        primary
        type="submit"
        label="Submit"
        form="classifiedUpdateDetails"
        disabled={pristine && !file && !this.state.modifiedTab}
      />
    </div>
    :
    [
      <FlatButton
        style={{ color: '#e74c3c', float: 'left' }}
        secondary
        label="Delete"
        onClick={this.handleDeleteClassified}
      />,
      <FlatButton
        primary
        label="Cancel"
        onClick={this.handleClose}
      />,
      <RaisedButton
        primary
        type="submit"
        label="Submit"
        form="classifiedUpdateDetails"
        disabled={pristine && !file && !this.state.modifiedTab}
      />
    ]

    return (
      <div>
        <span className="editButton">
          <IconButton
            tooltip="Edit Classified"
            tooltipPosition="bottom-center"
            onClick={this.handleOpen}
          >
            <EditIcon />
          </IconButton>
        </span>
        <Dialog
          autoScrollBodyContent
          modal
          title="Edit Classified"
          actions={isIE() ? null : actions}
          contentClassName='responsiveDialog'
          open={this.state.open}
        >
          <span className="close-modal" onClick={this.handleClose}>&times;</span>
          <form id="classifiedUpdateDetails" onSubmit={handleSubmit(this.handleSubmitForm)}>
            <Tabs
              className={styles.inkbar}
              inkBarStyle={{ backgroundColor: '#00703C', height: 5, marginTop: -5, marginBottom: 15 }}
              tabItemContainerStyle={{ backgroundColor: '#E9E9E9' }}
              value={this.state.looking_for}
            >
              <Tab onActive={() => this.handleChangeLookingFor(true)} value={true} buttonStyle={{ color: '#424242' }} label="Buying">
              </Tab>
              <Tab onActive={() => this.handleChangeLookingFor(false)} value={false} buttonStyle={{ color: '#424242' }} label="Selling">
              </Tab>
            </Tabs>
            <Row>
              <Col xs={12} sm={5}>
                {
                  file ?
                    <Cropper
                      ref='cropper'
                      src={file.preview}
                      style={{ borderRadius: '2px' }}
                      className={styles.cropperZone}
                      viewMode={1}
                    />
                    :
                    <Dropzone
                      accept="image/*"
                      activeClassName={styles.dropzoneActive}
                      className={styles.dropzone}
                      onDrop={this.onDrop.bind(this)}
                    >
                      { this.state.photo_file_name ?
                        <img src={this.state.photo_file_name} alt={this.state.title} />
                        :
                        <div className={styles.uploadZone}>
                          {
                            ('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/)) ?
                              <div style={{ width: '100%' }}>
                                <span className={styles.highlight}>Tap</span> to Choose Image
                              </div>
                              :
                              <div>
                                <span className={styles.highlight}>
                                  Drag and Drop
                                </span> Image or <span className={styles.highlight}>
                                        Click
                                </span> to Change File
                              </div>
                          }
                        </div>
                      }
                    </Dropzone>
                }
              </Col>
              <Col xs={12} sm={7}>
                <Field
                  component={StyledInput}
                  validate={checkRequired}
                  name="title"
                  label={`What Are You ${this.state.looking_for ? 'Looking For' : 'Selling'}?`}
                  type="text"
                />
                <div style={{ padding: "0px 0.3rem"}}>
                  <label className="fieldLabel">{'What Category does this classified belong to?'}</label>
                  <Field
                    component={SelectField}
                    validate={checkRequired}
                    name="category"
                    style={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px' }}
                    labelStyle={{ paddingLeft: 15 }}
                    iconStyle={{ fill: 'black', right: 0 }}
                    underlineStyle={{ border: 'none', borderColor: 'transparent', height: 0 }}
                  >
                    {Object.entries(category_map).map(([item, value]) => ({ value: parseInt(item, 10), name: value })).map((item) =>
                      <MenuItem
                        key={item.value}
                        value={item.value}
                        primaryText={item.name}
                      />
                    )}
                  </Field>
                </div>
                <div style={{ padding: "0px 0.3rem" }}>
                  <span className={styles.fieldLabel}>{`When Do You Need ${this.state.looking_for ? 'This' : 'to Sell This By'}?`}</span>
                  <p>{moment(find(this.props.profileClassifieds.current.results, ['id', this.props.classified_id]).needed_by).utc().format('dddd, MMMM Do YYYY')}</p>
                  <sup style={{ top: "-1.25rem" }}>We'll post this classified on the homepage and will be deleted 48 hours after the date posted above.</sup>
                </div>
              </Col>
            </Row>
            <Row>
              <Field
                textarea
                component={StyledInput}
                validate={checkRequired}
                name="description"
                label="Description"
                type="text"
              />

            </Row>
            {isIE() ? actions : null}
          </form>
        </Dialog>
      </div>
    )
  }
}

const resetForm = (result, dispatch) =>
  dispatch(reset('editClassifiedModal'))

const mapStateToProps = () => (state, ownProps) => ({
  client: state.client,
  profile: state.profile,
  profileClassifieds: state.profileClassifieds,
  pristine: isPristine('editClassifiedModal')(state)
})

export default compose(
  connect(mapStateToProps, {
    classifiedUpdate,
    classifiedDelete,
  }),
  reduxForm({
    form: 'editClassifiedModal',
    onSubmitSuccess: resetForm,
  })
)(EditClassifiedModal)