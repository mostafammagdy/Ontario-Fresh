import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { reduxForm, Field, isPristine, reset } from 'redux-form'
import { DatePicker, SelectField } from 'redux-form-material-ui'

import { Row, Col } from 'react-flexbox-grid'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem'
import {Tabs, Tab} from 'material-ui/Tabs'

import Dropzone from 'react-dropzone'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

import ResizableButton from '../../components/resizableButton'

import StyledInput from '../../components/styledInput'

import { checkRequired, minDateToToday } from '../../utils/client-side-validation'
import { isIE } from '../../utils/ie-detection'
import '../../utils/toBlob-polyfill'

import styles from './styles.module.scss'

import {
  classifiedCreate,
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

class CreateClassifiedModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      files: [],
      looking_for: true,
      cropped: null,
      needed_by: null
    }
  }

  static propTypes = {
    posterID: PropTypes.number, //this is for if a profile manager posts on someone's behalf. If poster is the user, this should be blank
    dashboard: PropTypes.bool, //this is to indicate showing the button as a flatbutton. originally used in the profile manager dashboard
    onBehalfOf: PropTypes.string
  }

  onDrop(files) {
    this.setState({
      files,
    })
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    let file = this.state.files[0]
    file && window.URL.revokeObjectURL(file.preview)

    this.setState({
      open: false,
      files: [],
      looking_for: true,
      cropped: null,
      needed_by: null
    })
  }

  handleChangeLookingFor = (value) => {
    this.setState({ looking_for: value })
  }

  handleSubmitForm = (values) => {
    const {
      profile: {
        current: {
          id,
        }
      },
      client,
      classifiedCreate,
      posterID,
      homepage,
      callback
    } = this.props

    const looking_for = this.state.looking_for
    const modifiedValues = Object.assign({}, values, { needed_by: values.needed_by.toISOString() })

    if (this.refs.cropper) {
      this.refs.cropper.getCroppedCanvas().toBlob(file => {
        if (client && client.token) classifiedCreate(client, { id: posterID || id, values: modifiedValues, file, looking_for }, !!homepage)
      });
    } else if (client && client.token) {
      classifiedCreate(client, { id: posterID || id, values: modifiedValues, undefined, looking_for }, !!homepage)
    }
    if (typeof callback === "function") callback()

    this.handleClose()
  }

  render () {
    const file = this.state.files[0]
    const {
      handleSubmit,
      pristine,
      dashboard,
      homepage,
      onBehalfOf
    } = this.props

    const actions = isIE() ? <div style={{ paddingTop: 40, paddingBottom: 20, float: 'right' }}>
      <FlatButton
        primary
        label="Cancel"
        onClick={this.handleClose}
      />
      <RaisedButton
        primary
        type="submit"
        label="Submit"
        form="classifiedDetails"
        disabled={pristine}
      />
    </div>
    :
    [
      <FlatButton
        primary
        label="Cancel"
        onClick={this.handleClose}
      />,
      <RaisedButton
        primary
        type="submit"
        label="Submit"
        form="classifiedDetails"
        disabled={pristine}
      />
    ]

    return (
      <div>
        { dashboard ?
            <FlatButton
              primary
              label="Post a Classified"
              labelStyle={{ color: "white" }}
              style={{ backgroundColor: "rgb(0, 112, 60)"}}
              onClick={this.handleOpen}
            />
          :
          homepage ?
            <ResizableButton
              size="1.4"
              primary
              label="Post Classified"
              longText
              onClick={this.handleOpen}
            />
          :
            <ResizableButton
              fullWidth
              primary
              size="1.2"
              label="Post a Classified"
              longText
              onClick={this.handleOpen}
            />
        }
        <Dialog
          autoScrollBodyContent
          modal
          title={onBehalfOf ? ("Post a Classified on Behalf of " + onBehalfOf) : "Post a Classified"}
          actions={isIE() ? null : actions}
          contentClassName='responsiveDialog'
          open={this.state.open}
        >
          <span className="close-modal" onClick={this.handleClose}>&times;</span>
          <form id="classifiedDetails" onSubmit={handleSubmit(this.handleSubmitForm)} style={{marginBottom: 0}}>
            <Tabs
              className={styles.inkbar}
              inkBarStyle={{ backgroundColor: '#00703C', height: 5, marginTop: -5, marginBottom: 15 }}
              tabItemContainerStyle={{ backgroundColor: '#E9E9E9' }}
            >
              <Tab onActive={() => this.handleChangeLookingFor(true)} buttonStyle={{ color: '#424242' }} label="Buying" >
              </Tab>
              <Tab onActive={() => this.handleChangeLookingFor(false)} buttonStyle={{ color: '#424242' }} label="Selling" >
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
                        </span> to Choose File
                      </div>
                      }
                    </div>
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
                <div style={{ padding: "0px 0.3rem" }}>
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
                    {[{ value: '', name: '' }].concat(Object.entries(category_map).map(([item, value]) => ({ value: parseInt(item, 10), name: value }))).map((item) =>
                      <MenuItem
                        key={item.value}
                        value={item.value}
                        primaryText={item.name}
                      />
                    )}
                  </Field>
                </div>
                <div style={{ padding: "0px 0.3rem" }}>
                  <label className="fieldLabel">{`When do you need this ${!this.state.looking_for ? 'sold ' : ''}by?`}</label>
                  <Field
                    component={DatePicker}
                    validate={[checkRequired, minDateToToday]}
                    name="needed_by"
                    hintText="Select a date"
                    format={null}
                  />
                  <sup>We'll post this classified on the homepage. It will be deleted 48 hours after the date listed above.</sup>
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

const resetForm = (result, dispatch) => {
  dispatch(reset('createClassifiedModal'))
}

const mapStateToProps = state => ({
  client: state.client,
  profile: state.profile,
  profileClassifieds: state.profileClassifieds,
  pristine: isPristine('createClassifiedModal')(state)
})

export default compose(
  connect(mapStateToProps, {
    classifiedCreate,
  }),
  reduxForm({
    form: 'createClassifiedModal',
    onSubmitSuccess: resetForm,
  })
)(CreateClassifiedModal)
