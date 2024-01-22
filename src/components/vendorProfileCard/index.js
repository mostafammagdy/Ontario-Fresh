import React from 'react'

import Divider from 'material-ui/Divider'

import StyledCard from '../styledCard'
import ProfileListEditModal from '../profileListEditModal'
import EditProductsModal from '../../containers/editProductsModal'
import RoleItemEditModal from '../roleItemEditModal'
import CreateMessageModal from '../../containers/createMessageModal'

import { Row, Col } from 'react-flexbox-grid'
import { map, filter, some } from 'lodash'

import styles from './styles.module.scss'

import { sentenceConstructor } from '../../utils/volume-size-sentence-constructor'
import { convertObjectToSortedArray } from '../../utils/display-data'
import { getProductCategories, displayProductHierarchy } from '../../utils/product-hierarchy'

class VendorProfileCard extends React.Component {

  render () {
    const {
      data: {
        classifications,
        payment_methods,
        products,
        safety_standards,
        role_details,
        services_provided
      },
      id,
      type,
      editable,
    } = this.props

    /*
    console.log('%c SellerProfileCard products, editable:', 'color: blue; font-weight: bold;')
    console.log({ SellerProfileCardProducts: products, editable })
    */
    

    // const rootProducts = getProductCategories(products)
    const rootProducts = getProductCategories(products)
    /*
    console.log('%c rootProducts:', 'color: red; font-weight: bold;')
    console.log({ rootProducts })
    */
    /*
    console.log('%c services_provided:', 'color: LightSlateGrey; font-weight: bold;')
    console.log({ services_provided })
    */
    return (
      <StyledCard cardText={
        <div>
          <Row>
            <Col xs={12}>
              {/* <h6 className={styles.cardSubHeader}> */}
              {/*
                role_details.edited && role_details.business_scale.length > 0 ?
                    ('We sell' + sentenceConstructor(role_details.business_scale))
                  : !editable ?
                      'Seller'
                    : 'In What Volumes Do You Sell?'
              */}
              {/*
                role_details.business_scale.length > 0 ?
                    ('We vend' + sentenceConstructor(role_details.business_scale))
                  : 'Vendor'
              */}
              {/* </h6> */}
              {/*
                editable &&
                  <RoleItemEditModal
                    type={type}
                    id={id}
                    payment_data={payment_methods}
                    role_details={role_details}
                  />
              */}
              {/* <Divider style={{ marginLeft: -16, marginRight: -16 }} /> */}
              <h6 className={styles.cardSubHeader}>Products</h6>
              {editable && <EditProductsModal products={products} role_id={id} headerEdit type="vendor" />}
              <Divider style={{ marginLeft: -16, marginRight: -16 }} />
              {
                rootProducts && rootProducts.length > 0 ?
                    displayProductHierarchy(rootProducts, products)
                  : editable ?
                      <ul><li>
                        <EditProductsModal
                          textLink
                          products={products}
                          role_id={id}
                          type="vendor"
                        />
                      </li></ul>
                  :
                  <ul><li>We are not currently selling any products</li></ul>
              }
              {/*
                rootProducts && rootProducts.length > 0 ?
                    displayProductHierarchy(rootProducts, products)
                  : editable ?
                      <ul><li>List the products that you are looking to sell in Ontario</li></ul>
                  :
                  <ul><li>We are not currently selling any products</li></ul>
              */}
              {/*
                rootProducts && rootProducts.length > 0 ?
                    displayProductHierarchy(rootProducts, products)
                  :
                  <ul><li>We are not currently selling any products</li></ul>
            */}
            </Col>

            {/*
              classifications && (some(classifications.details, 'value') || editable) &&
                <Col xs={12}>
                  <h6 className={styles.cardSubHeader}>Business Classifications</h6>
                  {
                    editable &&
                      <ProfileListEditModal
                        type="classifications"
                        data={classifications}
                        headerEdit
                        title="No business practices and product classifications added"
                      />
                  }
                  <Divider style={{ marginLeft: -16, marginRight: -16 }} />
                  {
                    some(classifications.details, 'value') ?
                        <ul>
                          {
                            map(convertObjectToSortedArray(filter(classifications.details, 'value')), (item, key) =>
                              <li key={key}>{item.display}</li>
                            )
                          }
                        </ul>
                    :
                    <ul>
                      <li>
                        <ProfileListEditModal
                          textLink
                          type="classifications"
                          label="business practices and product classifications"
                          data={classifications}
                          title="Add business classifications for the products you sell"
                        />
                      </li>
                    </ul>
                  }
                </Col>
                */}

            {/*
              safety_standards && (some(safety_standards.details, 'value') || editable) &&
                <Col xs={12}>
                  <h6 className={styles.cardSubHeader}>Food Safety &amp; Traceability Standards</h6>
                  {
                    editable &&
                      <ProfileListEditModal
                        type="safetyStandards"
                        data={safety_standards}
                        headerEdit
                        title="Food Safety and Traceability Standards"
                        subtitle="Select all of the Food Safety and Traceability Standards that you are certified to meet"
                      />
                  }
                  <Divider style={{ marginLeft: -16, marginRight: -16 }} />
                  {
                    some(safety_standards.details, 'value') ?
                        <ul>
                          {
                            map(convertObjectToSortedArray(filter(safety_standards.details, 'value')), (item, key) =>
                              <li key={key}>{item.display}</li>
                            )
                          }
                        </ul>
                      :
                      <ul>
                        <li>
                          <ProfileListEditModal
                            textLink
                            type="safetyStandards"
                            label="Food Safety and Traceability Standards added"
                            data={safety_standards}
                            title="Food Safety and Traceability Standards"
                            subtitle="Select all of the Food Safety and Traceability Standards that you are certified to meet"
                          />
                        </li>
                      </ul>
                  }
                </Col>
            */}
            {/*
              <Col xs={12}>
                <h6 className={styles.cardSubHeader}>Additional Vendor-Specific Details</h6>
                {
                  editable &&
                    <RoleItemEditModal
                      type={type}
                      id={id}
                      payment_data={payment_methods}
                      role_details={role_details}
                    />
                }
                {
                  editable &&
                    <span />
                }
                <Divider style={{ marginLeft: -16, marginRight: -16 }} />
                <Row>
                  <Col xs={6}>
                    {
                      (!role_details.edited && !editable) ?
                          <ul className="noMarginBottom">
                            <li><CreateMessageModal textLink /></li>
                          </ul>
                        :
                        <ul>
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
                                    role_details.third_party_insurance ? 'We have third-party liability insurance' : 'We do not have third-party liability insurance'
                                  }
                                </li>,
                              ]
                          }
                    </ul>
                    }
                  </Col>
                  <Col xs={6}>
                    { (role_details.edited || editable) &&
                    <ul>
                      <li>Preferred Payment Methods:</li>
                      {payment_methods && some(payment_methods.details, 'value') ?
                        <ul>
                          {map(convertObjectToSortedArray(filter(payment_methods.details, 'value')), (item, key) =>
                            <li key={key}>{item.display}</li>
                          )}
                        </ul>
                        :
                          <ul><li>No Payment Methods Identified</li></ul>
                      }
                    </ul>
                    }
                  </Col>
                </Row>
              </Col>
              */}
          </Row>
        </div>
      } />
    )
  }
}

export default VendorProfileCard
