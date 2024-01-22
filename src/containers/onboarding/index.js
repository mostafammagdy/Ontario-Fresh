import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper'
import Checkbox from 'material-ui/Checkbox'

import { map, some } from 'lodash'

import EditImageModal from '../editImageModal'
import EditProfileItemsModal from '../editProfileItemsModal'
import EditProductsModal from '../editProductsModal'
import EditRoleItemsModal from '../editRoleItemsModal'

import ProfileListEditModal from '../../components/profileListEditModal'
import StyledCard from '../../components/styledCard'

import { dismissOnboarding } from './actions'

import styles from './styles.module.scss'

class Onboarding extends Component {

  state = {
    stepIndex: 0,
  }

  handleDismissOnboarding = () => {
    const { client, dismissOnboarding } = this.props

    if (client && client.token) return dismissOnboarding(client)
  }

  render() {
    const { stepIndex } = this.state
    const {
      profile: {
        current,
      },
    } = this.props

    return (
      <StyledCard
        cardTitle={<span style={{ fontSize: '1.125rem' }}>Getting Started with <strong>Ontario</strong><em>fresh</em>.ca</span>}
        cardText={
          <div style={{ maxWidth: '80%', margin: 'auto' }}>
            <Stepper
              activeStep={stepIndex}
              linear={false}
              orientation="vertical"
            >
              <Step>
                <StepButton onClick={() => this.setState({ stepIndex: 0 })}>
                  Fill out profile information
                </StepButton>
                <StepContent className={styles.stepContent}>
                  <Checkbox
                    checked={!!current.photo_file_name}
                    label={<EditImageModal type="profile" textLink />}
                    labelStyle={{ zIndex: 3 }}
                  />
                  <Checkbox
                    checked={!!current.description}
                    label={<EditProfileItemsModal type="description" textLink />}
                    labelStyle={{ zIndex: 3 }}
                  />
                  <Checkbox
                    checked={!!current.twitter || !!current.facebook || !!current.linkedin}
                    label={<EditProfileItemsModal type="social" textLink />}
                    labelStyle={{ zIndex: 3 }}
                  />
                  <Checkbox
                    checked={some(current.services_needed.details, 'value')}
                    label={
                      <ProfileListEditModal
                        textLink
                        type="services"
                        data={current.services_needed}
                        label="services your business needs"
                        title="Services You Need"
                      />
                    }
                    labelStyle={{ zIndex: 3 }}
                  />
                  <Checkbox
                    checked={some(current.services_provided.details, 'value')}
                    label={
                      <ProfileListEditModal
                        textLink
                        type="services"
                        data={current.services_provided}
                        label="services your business offers"
                        title="Services You Offer"
                      />
                    }
                    labelStyle={{ zIndex: 3 }}
                  />
                </StepContent>
              </Step>
              { current.roles && current.roles.length > 0 &&
                map(current.roles, (role, key) =>
                  <Step key={key}>
                    <StepButton onClick={() => this.setState({ stepIndex: key + 1 })}>
                      {role.value === "organization" ? "Add members to your organization" : `Fill out ${role.value.replace(/_/g, " ")} information`}
                    </StepButton>
                    <StepContent className={styles.stepContent}>
                    { (role.value === "buyer" || role.value === "seller" || role.value === "processor") &&
                      <Checkbox
                        checked={role.data.products && role.data.products.length > 0}
                        label={
                          <EditProductsModal
                            textLink
                            products={role.data.products}
                            role_id={role.id}
                            type={role.value}
                          />
                        }
                        labelStyle={{ zIndex: 3 }}
                      />
                    }
                    { role.value === "seller" &&
                      <Checkbox
                        checked={some(role.data.classifications.details, 'value')}
                        label={
                          <ProfileListEditModal
                            textLink
                            type="classifications"
                            data={role.data.classifications}
                            label="business practice and product classifications"
                            title="Add business classifications for the products you sell"
                          />
                        }
                        labelStyle={{ zIndex: 3 }}
                      />
                    }
                    { role.value === "processor" &&
                      <Checkbox
                        checked={some(role.data.processing_types.details, 'value')}
                        label={
                          <ProfileListEditModal
                            textLink
                            type="processingTypes"
                            data={role.data.processing_types}
                            label="the kinds of processing services you offer"
                            title="Processing Services"
                          />
                        }
                        labelStyle={{ zIndex: 3 }}
                      />
                    }
                    { (role.value === "buyer" || role.value === "seller" || role.value === "processor") &&
                      <Checkbox
                        checked={some(role.data.safety_standards.details, 'value')}
                        label={
                          <ProfileListEditModal
                            textLink
                            accountRole={role.value}
                            type="safetyStandards"
                            label="your food safety and traceability requirements"
                            data={role.data.safety_standards}
                            title="Food Safety and Traceability Standards"
                            subtitle={role.value === "seller" ? "Select all of the Food Safety and Traceability Standards that you require."
                                      : role.value === "processor" ? "Select the Food Safety and Traceability Standards that you adhere to."
                                      : "Select all of the Food Safety and Traceability Standards that you require from suppliers."}
                          />
                        }
                        labelStyle={{ zIndex: 3 }}
                      />
                    }
                    { (role.value === "buyer" || role.value === "seller") &&
                      <Checkbox
                        checked={some(role.data.payment_methods.details, 'value')}
                        label={
                          <ProfileListEditModal
                            textLink
                            type="paymentMethods"
                            data={role.data.payment_methods}
                            label="your preferred payment methods"
                            title="Preferred Payment Method(s)"
                          />
                        }
                        labelStyle={{ zIndex: 3 }}
                      />
                    }
                    { (role.value === "buyer") &&
                      <Checkbox
                        checked={role.data.role_details.edited}
                        label={
                          <EditRoleItemsModal
                            textLink
                            role_details={role.data.role_details}
                            type={role.value}
                            category={role.data.category}
                            id={role.id}
                          />
                        }
                        labelStyle={{ zIndex: 3 }}
                      />
                    }
                    { (role.value === "seller") &&
                      <Checkbox
                        checked={role.data.role_details.edited}
                        label={
                          <EditRoleItemsModal
                            textLink
                            role_details={role.data.role_details}
                            type={role.value}
                            category={role.data.category}
                            id={role.id}
                          />
                        }
                        labelStyle={{ zIndex: 3 }}
                      />
                    }
                    { role.value === "organization" &&
                      <div>Search and <Link to="/search">find profiles</Link> to add members</div>
                    }
                    { role.value === "service_provider" &&
                      <div>
                        <Checkbox
                          checked={some(role.data.services_needed.details, 'value')}
                          label={
                            <ProfileListEditModal
                              textLink
                              type="services"
                              data={role.data.services_needed}
                              label="services your business needs"
                              title="Services You Need"
                            />
                          }
                          labelStyle={{ zIndex: 3 }}
                        />
                        <Checkbox
                          checked={some(role.data.services_provided.details, 'value')}
                          label={
                            <ProfileListEditModal
                              textLink
                              type="services"
                              data={role.data.services_provided}
                              label="services your business offers"
                              title="Services You Offer"
                            />
                          }
                          labelStyle={{ zIndex: 3 }}
                        />
                      </div>
                    }
                    { role.value === "processor" &&
                      <div>
                        <Checkbox
                          checked={some(role.data.classifications.details, 'value')}
                          label={
                            <ProfileListEditModal
                              textLink
                              type="classifications"
                              data={role.data.classifications}
                              label="business practice and product classifications"
                              title="Add business classifications for the products you process"
                            />
                          }
                          labelStyle={{ zIndex: 3 }}
                        />
                        <Checkbox
                          checked={some(role.data.market_types.details, 'value')}
                          label={
                            <ProfileListEditModal
                              textLink
                              type="marketTypes"
                              data={role.data.market_types}
                              label="your typical processing formats"
                              title="General Processing Formats"
                            />
                          }
                          labelStyle={{ zIndex: 3 }}
                        />
                        <Checkbox
                          checked={role.data.role_details.edited}
                          label={
                            <EditRoleItemsModal
                              textLink
                              role_details={role.data.role_details}
                              type={role.value}
                              category={role.data.category}
                              id={role.id}
                            />
                          }
                          labelStyle={{ zIndex: 3 }}
                        />
                      </div>
                    }
                    </StepContent>
                  </Step>
                )
              }
              <Step>
                <StepButton onClick={() => this.setState({ stepIndex: current.roles.length + 1 })}>
                  <span>Discover <strong>Ontario</strong><em>fresh</em>.ca</span>
                </StepButton>
                <StepContent>
                  <span>You're all set - <a className="textLink" onClick={() => this.handleDismissOnboarding()}>click here to hide this section</a> and explore <strong>Ontario</strong><em>fresh</em>.ca!</span>
                </StepContent>
              </Step>
            </Stepper>
          </div>
        }>
      </StyledCard>
    )
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  client: state.client,
})

const connected = connect(mapStateToProps, {
  dismissOnboarding,
})

export default connected(Onboarding)