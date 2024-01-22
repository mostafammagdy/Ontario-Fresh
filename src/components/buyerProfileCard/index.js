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

class BuyerProfileCard extends React.Component {

  render () {
    const {
      data: {
        payment_methods,
        products,
        safety_standards,
        role_details,
        category,
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
                role_details.edited && role_details.business_scale.length > 0 ? ('We buy' + sentenceConstructor(role_details.business_scale)) :
                !editable ? 'Buyer' :
                'In What Volumes Do You Buy?'
              }
              {/*
                role_details.business_scale.length > 0 ?
                    ('We buy' + sentenceConstructor(role_details.business_scale))
                  : 'Buyer'
            */}
              </h6>
              {editable && <RoleItemEditModal type={type} id={id} role_details={role_details} headerEdit payment_data={payment_methods} category={category} />}
              <Divider style={{ marginLeft: -16, marginRight: -16 }} />
              <h6 className={styles.cardSubHeader} style={{marginTop: 12}}>Products</h6>
              {editable && <EditProductsModal products={products} role_id={id} headerEdit type="buyer" />}
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
                        type="buyer"
                      />
                    </li></ul>
                    :
                    <ul><li>We are not currently selling any products</li></ul>
              }
              {/*
               rootProducts && rootProducts.length > 0 ?
                displayProductHierarchy(rootProducts, products)
                : editable ?
                  <ul><li>List the products that you are looking to buy in Ontario</li></ul>  
                :
                  <ul><li>We are not currently buying any products</li></ul>
              */}
              {/*
                rootProducts && rootProducts.length > 0 ?
                    displayProductHierarchy(rootProducts, products)
                  :
                  <ul><li>We are not currently buying any products</li></ul>
            */}
            </Col>
            
            {
              safety_standards && (some(safety_standards.details, 'value') || editable) &&
                <Col xs={12} sm={12}>
                  <h6 className={styles.cardSubHeader}>Food Safety &amp; Traceability Standards</h6>
                  {
                    editable &&
                      <ProfileListEditModal
                        type="safetyStandards"
                        data={safety_standards}
                        headerEdit
                        title="Food Safety and Traceability Standards from Suppliers"
                        subtitle="Select all of the Food Safety and Traceability Standards that you require from suppliers"
                      />
                  }
                  <Divider style={{ marginLeft: -16, marginRight: -16 }} />
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
                          type="safetyStandards"
                          label="Food Safety and Traceability Standards that you require from suppliers added"
                          data={safety_standards}
                          title="Food Safety and Traceability Standards from Suppliers"
                          subtitle="Select all of the Food Safety and Traceability Standards that you require from suppliers"
                          headerEdit
                        />
                      </li>
                    </ul>
                }
              </Col>
            }
            {
              <Col xs={12}>
                <h6 className={styles.cardSubHeader}>Business Info</h6>
                {editable && <RoleItemEditModal type={type} id={id} role_details={role_details} headerEdit payment_data={payment_methods} category={category} />}
                <Divider style={{ marginLeft: -16, marginRight: -16 }} />
                <Row>
                  <Col xs={6}>
                    <ul className="noMarginBottom">
                      {
                        (!role_details.edited && !editable) ?
                            <li><CreateMessageModal textLink /></li>
                          : editable ?
                              [
                                <li key="delivery">
                                  Do We Require Delivery?&nbsp;
                                  <strong>
                                    {
                                      role_details.delivery === 1 ? 'Yes' : role_details.delivery === 2 ? 'No' : 'Negotiable'
                                    }
                                  </strong>
                                </li>,
                                <li key="insurance">
                                  Do We Require Third-Party Insurance?&nbsp;
                                  <strong>
                                    {
                                      role_details.third_party_insurance ? 'Yes' : 'No'
                                    }
                                  </strong>
                                </li>
                              ]
                            :
                              [
                                <li key="delivery">
                                  {
                                    role_details.delivery === 1 ? 'We require delivery' : role_details.delivery === 2 ? 'We do not require delivery' : 'Delivery is negotiable'
                                  }
                                </li>,
                                <li key="insurance">
                                  {
                                    role_details.third_party_insurance ? 'We require third-party insurance' : 'We do not require third-party insurance'
                                  }
                                </li>
                              ]
                          }
                    </ul>
                  </Col>
                  <Col xs={6}>
                    { (role_details.edited || editable) &&
                    <ul className="noMarginBottom">
                      <li>Preferred Payment Methods:</li>
                        { payment_methods && some(payment_methods.details, 'value') ?
                          <ul className="noMarginBottom">
                            {map(convertObjectToSortedArray(filter(payment_methods.details, 'value')), (item, key) =>
                              <li key={item.display}>{item.display}</li>
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
            }
          </Row>
        </div>
      } />
    )
  }
}

export default BuyerProfileCard