import React from 'react'

import Divider from 'material-ui/Divider'

import StyledCard from '../../components/styledCard'
import ProfileListEditModal from '../../components/profileListEditModal'
import EditProductsModal from '../../containers/editProductsModal'
import RoleItemEditModal from '../../components/roleItemEditModal'
import CreateMessageModal from '../../containers/createMessageModal'

import { Row, Col } from 'react-flexbox-grid'
import { map, filter, some } from 'lodash'

import styles from './styles.module.scss'

import { sentenceConstructor } from '../../utils/volume-size-sentence-constructor'
import { convertObjectToSortedArray } from '../../utils/display-data'
import { getProductCategories, displayProductHierarchy } from '../../utils/product-hierarchy'

class ProcessProfileCard extends React.Component {

  render () {
    const {
      data: {
        classifications,
        safety_standards,
        products,
        role_details,
        processing_types,
        market_types,
      },
      id,
      type,
      editable,
    } = this.props
    const rootProducts = getProductCategories(products)

    return (
      <StyledCard cardText={
        <div>
          <Row>
            <Col xs={12}>
              <h6 className={styles.cardSubHeader}>
                {
                  role_details.edited && role_details.business_scale.length > 0 ? ('We process'+sentenceConstructor(role_details.business_scale)) :
                  !editable ? 'Processor' :
                  'In What Volumes Do You Process?'
                }
                {/*
                  role_details.business_scale.length > 0 ?
                      ('We process'+sentenceConstructor(role_details.business_scale))
                    : 'Processor'
              */}
              </h6>
              {editable && <RoleItemEditModal type={type} id={id} role_details={role_details} />}
              <Divider style={{ marginLeft: -16, marginRight: -16 }} />
              <h6 className={styles.cardSubHeader} style={{marginTop: 12}}>Products</h6>
              {editable && <EditProductsModal products={products} role_id={id} headerEdit type="processor" />}
              <Divider style={{ marginLeft: -16, marginRight: -16 }} />
              {rootProducts && rootProducts.length > 0 ?
                displayProductHierarchy(rootProducts, products)
                : editable ?
                  <ul><li>
                    <EditProductsModal
                      textLink
                      products={products}
                      role_id={id}
                      type="processor"
                    />
                  </li></ul>
                  :
                  <ul><li>We are not currently processing any products</li></ul>
              }
              {/*
                rootProducts && rootProducts.length > 0 ?
                    displayProductHierarchy(rootProducts, products)
                  :
                  <ul><li>We are not currently processing any products</li></ul>
            */}
            </Col>
            {
              processing_types && (some(processing_types.details, 'value') || editable) &&
                <Col xs={12} sm={12}>
                  <h6 className={styles.cardSubHeader}>Processing Methods Available</h6>
                    {
                      editable &&
                        <ProfileListEditModal
                          type="processingTypes"
                          data={processing_types}
                          headerEdit
                          title="Processing Methods Available"
                        />
                    }
                  <Divider style={{marginLeft: -16, marginRight: -16}} />
                  {
                    some(processing_types.details, 'value') ?
                        <ul>
                          {
                            map(convertObjectToSortedArray(filter(processing_types.details, 'value')), (item) =>
                              <li key={item.display}>{item.display}</li>
                            )
                          }
                        </ul>
                    :
                    <ul>
                      <li>
                        <ProfileListEditModal
                          textLink
                          type="processingTypes"
                          label="processing services you offer"
                          data={processing_types}
                          title="Processing Methods Available"
                        />
                      </li>
                    </ul>
                  }
                </Col>
            }
            {
              classifications && (some(classifications.details, 'value') || editable) &&
                <Col xs={12}>
                  <h6 className={styles.cardSubHeader}>Business Classifications</h6>
                  {
                    editable &&
                      <ProfileListEditModal
                        type="classifications"
                        data={classifications}
                        headerEdit
                        title="Add business classifications for the products you process"
                      />
                  }
                  <Divider style={{marginLeft: -16, marginRight: -16}} />
                  {
                    some(classifications.details, 'value') ?
                        <ul>
                          {
                            map(convertObjectToSortedArray(filter(classifications.details, 'value')), (item) =>
                              <li key={item.display}>{item.display}</li>
                            )
                          }
                        </ul>
                      :
                      <ul>
                        <li>
                          <ProfileListEditModal
                            textLink
                            type="classifications"
                            label="business practice and product classifications added"
                            data={classifications}
                            title="Add business classifications for the products you process"
                          />
                        </li>
                      </ul>
                  }
                </Col>
            }
            {
              safety_standards && (some(safety_standards.details, 'value') || editable) &&
                <Col xs={12}>
                  <h6 className={styles.cardSubHeader}>Food Safety &amp; Traceability Standards</h6>
                  {
                    editable &&
                      <ProfileListEditModal
                        type="safetyStandards"
                        accountRole="processor"
                        data={safety_standards}
                        headerEdit
                        title="Food Safety and Traceability Standards"
                        subtitle="Select all of the Food Safety and Traceability Standards that you require from suppliers"
                      />
                  }
                  <Divider style={{marginLeft: -16, marginRight: -16}} />
                  {
                    some(safety_standards.details, 'value') ?
                        <ul>
                          {
                            map(convertObjectToSortedArray(filter(safety_standards.details, 'value')), (item) =>
                              <li key={item.display}>{item.display}</li>
                            )
                          }
                        </ul>
                      :
                      <ul>
                        <li>
                          <ProfileListEditModal
                            textLink
                            accountRole="processor"
                            type="safetyStandards"
                            label="food traceability and safety accreditations"
                            data={safety_standards}
                            title="Food Safety and Traceability Standards"
                            subtitle="Select the Food Safety and Traceability Standards that you adhere to."
                          />
                        </li>
                      </ul>
                    }
                </Col>
            }
            {
              market_types && (some(market_types.details, 'value') || editable) &&
                <Col xs={12}>
                  <h6 className={styles.cardSubHeader}>Processing Formats</h6>
                  {
                    editable &&
                      <ProfileListEditModal
                        type="marketTypes"
                        data={market_types}
                        headerEdit
                        title="General Processing Formats"
                      />
                  }
                  <Divider style={{ marginLeft: -16, marginRight: -16 }} />
                  {
                    some(market_types.details, 'value') ?
                        <ul>
                          {map(convertObjectToSortedArray(filter(market_types.details, 'value')), (item) =>
                            <li key={item.display}>{item.display}</li>
                          )}
                        </ul>
                      :
                      <ul>
                        <li>
                          <ProfileListEditModal
                            textLink
                            type="marketTypes"
                            label="markets you process for"
                            data={market_types}
                            title="General Processing Formats"
                          />
                        </li>
                      </ul>
                  }
                </Col>
            }
            {
              <Col xs={12}>
                <h6 className={styles.cardSubHeader}>Business Info</h6>
                <Divider style={{ marginLeft: -16, marginRight: -16 }} />
                {
                  (!role_details.edited && !editable) ?
                      <ul className="noMarginBottom">
                        <li><CreateMessageModal textLink /></li>
                      </ul>
                    :
                    <ul>
                      {editable && <RoleItemEditModal type={type} id={id} role_details={role_details} />}
                      {
                        editable ?
                            [
                              <li key="delivery">
                                Do We Offer Delivery?&nbsp;
                                <strong>
                                  {
                                    role_details.delivery === 1 ? 'Yes' : role_details.delivery === 2 ? 'No' : 'Negotiable'
                                  }
                                </strong>
                              </li>,
                              <li key="insurance">
                                Do We Have Third-Party Insurance?&nbsp;
                                <strong>
                                  {
                                    role_details.third_party_insurance ? 'Yes' : 'No'
                                  }
                                  </strong>
                                </li>,
                              <li key="co_packing">
                                Do We Offer Co-Packing?&nbsp;
                                <strong>
                                  {
                                    role_details.co_packing === 1 ? 'Yes' : role_details.co_packing === 2 ? 'No' : 'Negotiable'
                                  }
                                </strong>
                              </li>,
                              <li key="private">
                                Do We Offer Private Labelling Services?&nbsp;
                                <strong>
                                  {
                                    role_details.private_label === 1 ? 'Yes' : role_details.private_label === 2 ? 'No' : 'Negotiable'
                                  }
                                </strong>
                              </li>,
                              <li key="custom">
                                Do We Handle Special Orders?&nbsp;
                                <strong>
                                  {
                                    role_details.custom_process === 1 ? 'Yes' : role_details.custom_process === 2 ? 'No' : 'Negotiable'
                                  }
                                </strong>
                              </li>
                            ]
                          :
                          [
                            <li key="delivery">
                              {
                                role_details.delivery === 1 ? 'We offer delivery' : role_details.delivery === 2 ? 'We do not offer delivery' : 'Delivery is negotiable'
                              }
                            </li>,
                            <li key="insurance">
                              {
                                role_details.third_party_insurance ? 'We have third-party insurance' : 'We do not have third-party insurance'
                              }
                            </li>,
                            <li key="co_packing">
                              {
                                role_details.co_packing === 1 ? 'We offer co-packing' : role_details.co_packing === 2 ? 'We do not offer co-packing' : 'Co-packing is negotiable'
                              }
                            </li>,
                            <li key="private">
                              {
                                role_details.private_label === 1 ? 'We offer private labelling services' : role_details.private_label === 2 ? 'We do not offer private labelling services' : 'Private labelling services is negotiable'
                              }
                            </li>,
                            <li key="custom">
                              {
                                role_details.custom_process === 1 ? 'We handle special orders' : role_details.custom_process === 2 ? 'We do not handle special orders' : 'Special orders is negotiable'
                              }
                            </li>
                          ]
                      }
                    </ul>
                }
              </Col>
            }
          </Row>
        </div>
      } />
    )
  }
}

export default ProcessProfileCard