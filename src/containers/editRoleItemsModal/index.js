import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { reduxForm, Field, isPristine, reset, initialize, getFormValues } from 'redux-form'
import { map } from 'lodash'

import { Row, Col } from 'react-flexbox-grid'
import { find } from 'lodash'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'
import RadioButton from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox'

import EditIcon from 'material-ui/svg-icons/editor/mode-edit'

import { RadioButtonGroup } from 'redux-form-material-ui'

import ScaleTabs from '../../components/scaleTabs'

import styles from './styles.module.scss'

import {
  roleUpdate,
  paymentMethodsUpdate, 
} from './actions'

import { describeBusinessSizes, describeSellerBusinessSizes, describeProcessorBusinessSizes } from '../../utils/warnings'
import { convertObjectToSortedArrayWithKey } from '../../utils/display-data'
import { isIE } from '../../utils/ie-detection'

class EditRoleItemsModal extends React.Component {
  constructor(props) {
    super(props)
    const modifiedPaymentData = convertObjectToSortedArrayWithKey(this.props.payment_data)
    this.state = {
      open: false,
      hasChanged: false,
      payment_form: this.props.payment_data,
      sortedPaymentData: modifiedPaymentData
    }
  }

  handleInitializeValues = () => {
    this.setState({
      ...this.state
    })
    
    const initialFormValues = {
      'delivery': find(this.props.profile.current.roles, ['id', this.props.id]).data.role_details.delivery,
      'co_packing': find(this.props.profile.current.roles, ['id', this.props.id]).data.role_details.co_packing,
      'third_party_insurance': find(this.props.profile.current.roles, ['id', this.props.id]).data.role_details.third_party_insurance,
      'business_scale': find(this.props.profile.current.roles, ['id', this.props.id]).data.role_details.business_scale,
      'private_label': find(this.props.profile.current.roles, ['id', this.props.id]).data.role_details.private_label,
      'custom_process': find(this.props.profile.current.roles, ['id', this.props.id]).data.role_details.custom_process,
    }

    this.props.dispatch(initialize('editRoleItemsModal', initialFormValues))
  }

  handleOpen = () => {
    this.handleInitializeValues()
    this.setState({
      open: true,
      payment_form: this.props.payment_data
     })
  }

  handleClose = () => {
    this.setState({ open: false , hasChanged: false})
  }

  handleUpdateCheck = ( key ) => {
    this.setState({
      payment_form: {
        ...this.state.payment_form,
        [key]: {
          ...this.state.payment_form[key],
          value: !this.state.payment_form[key].value,
        }
      }
    })

    this.setState({ hasChanged: true })
  }

  handleSubmitPayment = () => {
    if (this.state.payment_form) {
      const {
          payment_id,
          client,
       } = this.props
      const details = this.state.payment_form
      if (client && client.token) {
        this.props.paymentMethodsUpdate(client, {"id":payment_id, "details":details})
      }
    }
  }

  handleSubmitForm = (values) => {
    const {
      id,
      client,
      roleUpdate,
     } = this.props
     
    if (client && client.token) {
      roleUpdate(client, { id, values })
    }
    this.handleSubmitPayment();
    this.handleClose()
  }

  render () {
    const { sortedPaymentData, hasChanged } = this.state

    const {
      handleSubmit,
      pristine,
      type,
      role_details: {
        edited
      },
      label,
      textLink,
      customText
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
        form="roleDetails"
        disabled={edited && pristine && !hasChanged}
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
        form="roleDetails"
        disabled={edited && pristine && !hasChanged}
      />
    ]
    return (
      <div>
        { !!textLink && customText ?
            <a onClick={this.handleOpen}>
              <span className="textLink">{customText}</span>
            </a>
          : !!textLink && type === "seller" ?
            <a onClick={this.handleOpen}>
              <div>Add additional <span className="textLink">seller-specific</span> details</div>
            </a>
          : !!textLink && type === "buyer" ?
            <a onClick={this.handleOpen}>
              <div>Add addional <span className="textLink">buyer-specific</span> details</div>
            </a>
          : !!textLink && type === "processor" ?
            <a onClick={this.handleOpen}>
              <div>Add additional <span className="textLink">processor-specific details about your business</span></div>
            </a>
          : !!textLink && type === "service_provider" ?
            <a onClick={this.handleOpen}>
              <div>Add information about <span className="textLink">your business type</span></div>
            </a>
          :
          <span className={styles.headerEditButton}>
            <IconButton
              tooltip="Update Business Info"
              tooltipPosition="bottom-center"
              onClick={this.handleOpen}
            >
              <EditIcon />
            </IconButton>
          </span>
        }
        <Dialog
          autoScrollBodyContent
          modal
          title={`Additional ${type === 'service_provider' ? 'Service Provider' : type}-Specific Details`}
          titleStyle={{ textTransform: 'capitalize' }}
          actions={isIE() ? null : actions}
          contentClassName='responsiveDialog'
          open={this.state.open}
        >
          <span className="close-modal" onClick={this.handleClose}>&times;</span>
          <form id="roleDetails" onSubmit={handleSubmit(this.handleSubmitForm)}>
            <Row style={{ paddingTop: '1rem' }}>
              <Col xs={12}>
                { type === "buyer" &&
                <div>
                  <label className="fieldLabel">What are your typical purchase volumes?</label>
                  <Field
                    name="business_scale"
                    type="text"
                    id="business_scale"
                    warn={describeBusinessSizes}
                    component={ScaleTabs}
                  />
                </div>
                }
                { type === "seller" &&
                  <div>
                    <label className="fieldLabel">What is the general size of your operations?</label>
                    <Field
                      name="business_scale"
                      type="text"
                      id="business_scale"
                      warn={describeSellerBusinessSizes}
                      component={ScaleTabs}
                    />
                  </div>
                }
                { type === "processor" &&
                  <div>
                    <label className="fieldLabel">How would you describe your processing volumes?</label>
                    <Field
                      name="business_scale"
                      type="text"
                      id="business_scale"
                      warn={describeProcessorBusinessSizes}
                      component={ScaleTabs}
                    />
                  </div>
                }
                { type === "buyer" &&
                  <div>
                    <label className="fieldLabel">Do you need the product delivered to you?</label>
                    <Field
                      component={RadioButtonGroup}
                      name="delivery"
                      normalize={v => Number(v)}
                    >
                      <RadioButton value={1} label="Yes" />
                      <RadioButton value={2} label="No" />
                      <RadioButton value={3} label="Negotiable" />
                    </Field>
                  </div>
                }
                { type === "seller" &&
                  <div>
                    <label className="fieldLabel">Do you offer delivery?</label>
                    <Field
                      component={RadioButtonGroup}
                      name="delivery"
                      normalize={v => Number(v)}
                    >
                      <RadioButton value={1} label="Yes" />
                      <RadioButton value={2} label="No" />
                      <RadioButton value={3} label="Negotiable" />
                    </Field>

                    <br />

                    <label className="fieldLabel">Do you have third-party liability insurance?</label>
                    <Field
                      component={RadioButtonGroup}
                      label="Third-Party Insurance"
                      name="third_party_insurance"
                      normalize={v => v === "true"}
                    >
                      <RadioButton value={true} label="Yes" />
                      <RadioButton value={false} label="No" />
                    </Field>
                  </div>
                }
                { type === "processor" &&
                  <div>
                    <label className="fieldLabel">Do you offer delivery?</label>
                    <Field
                      component={RadioButtonGroup}
                      name="delivery"
                      normalize={v => Number(v)}
                    >
                      <RadioButton value={1} label="Yes" />
                      <RadioButton value={2} label="No" />
                      <RadioButton value={3} label="Negotiable" />
                    </Field>
                    <label className="fieldLabel">Do you offer co-packing services?</label>
                    <Field
                      component={RadioButtonGroup}
                      name="co_packing"
                      normalize={v => Number(v)}
                    >
                      <RadioButton value={1} label="Yes" />
                      <RadioButton value={2} label="No" />
                      <RadioButton value={3} label="Negotiable" />
                    </Field>

                    <label className="fieldLabel">Do you offer private label services?</label>
                    <Field
                      component={RadioButtonGroup}
                      name="private_label"
                      normalize={v => Number(v)}
                    >
                      <RadioButton value={1} label="Yes" />
                      <RadioButton value={2} label="No" />
                      <RadioButton value={3} label="Negotiable" />
                    </Field>

                    <label className="fieldLabel">Do you custom process or take special orders?</label>
                    <Field
                      component={RadioButtonGroup}
                      name="custom_process"
                      normalize={v => Number(v)}
                    >
                      <RadioButton value={1} label="Yes" />
                      <RadioButton value={2} label="No" />
                      <RadioButton value={3} label="Negotiable" />
                    </Field>
                    <label className="fieldLabel">Do you have third-party liability insurance?</label>
                    <Field
                      component={RadioButtonGroup}
                      label="Third-Party Insurance"
                      name="third_party_insurance"
                      normalize={v => v === "true"}
                    >
                      <RadioButton value={true} label="Yes" />
                      <RadioButton value={false} label="No" />
                    </Field>
                  </div>
                }
                { type !== "seller" && type !== "service_provider" && type !== "processor" &&
                  <div>
                    <br />

                    <label className="fieldLabel">Do you require suppliers to have third-party liability insurance?</label>
                    <Field
                      component={RadioButtonGroup}
                      label="Third-Party Insurance"
                      name="third_party_insurance"
                      normalize={v => v === "true"}
                    >
                      <RadioButton value={true} label="Yes" />
                      <RadioButton value={false} label="No" />
                    </Field>

                  </div>
                }
                { (type === "buyer" || type === "seller") &&
                  <div>

                    <br />
                      
                    <label><b>What are your preferred payment methods?</b></label>
                     <ul style={{ listStyle: 'none', width: '100%', marginLeft: '0' }}>
                       {map(sortedPaymentData, (item, key) =>
                        <li key={item.key}>
                          <Checkbox
                            key={item.key}
                            checked={this.state.payment_form[item.key].value}
                            label={item.display}
                            onCheck={() => this.handleUpdateCheck(item.key)}
                          />
                        </li>
                      )}
                    </ul>
                  </div>
                }
              </Col>
            </Row>
            {isIE() ? actions : null}
          </form>
        </Dialog>
      </div>
    )
  }
}

const resetForm = (result, dispatch) =>
  dispatch(reset('editRoleItemsModal'))

const mapStateToProps = () => ( state ) => ({
  client: state.client,
  profile: state.profile,
  editRoleItemsModal: state.editRoleItemsModal,
  form_values: getFormValues('editRoleItemsModal')(state),
  pristine: isPristine('editRoleItemsModal')(state),
})

export default compose(
  connect(mapStateToProps, {
    roleUpdate,
    paymentMethodsUpdate,
  }),
  reduxForm({
    form: 'editRoleItemsModal',
    onSubmitSuccess: resetForm
  })
)(EditRoleItemsModal)
