import React from 'react'
import { map, some } from 'lodash'

import Divider from 'material-ui/Divider'

import CreateMessageModal from '../../containers/createMessageModal'

import ProfileConnections from '../../containers/profileConnections'

import StyledCard from '../../components/styledCard'

import { Row, Col } from 'react-flexbox-grid'

import styles from './styles.module.scss'

class OrgProfileCard extends React.Component {

  render () {
    const {
      data: {
        products,
        safety_standards,
        role_details,
        third_party_insurance,
        category,
      }
    } = this.props 
    
    return (
      <div>
        <StyledCard cardText={
          <div>
            <Row>
              { products &&
                <Col xs={12} sm={6}>
                  <h6 className={styles.cardSubHeader}>{'Looking For:'}</h6>
                  <Divider style={{marginLeft: -16, marginRight: -16}} />
                  <ul>
                    { Object.keys(products).map((product) =>
                      <li key={product.name}>{product.name}</li>
                    )}
                  </ul>
                </Col>
              }
              { safety_standards &&
                <Col xs={12} sm={6}>
                  <h6 className={styles.cardSubHeader}>{'We require the following Food Safety and Traceability Standards:'}</h6>
                  <Divider style={{marginLeft: -16, marginRight: -16}} />
                  <ul>
                    { Object.keys(safety_standards).map((standard) =>
                      <li key={standard.label}>{standard.label}</li>
                    )}
                  </ul>
                </Col>
              }
              {
                <Col xs={12}>
                  <h6 className={styles.cardSubHeader}>Other:</h6>
                  <Divider style={{ marginLeft: -16, marginRight: -16 }} />
                  <ul>
                    { !role_details.edited &&
                      <li><CreateMessageModal textLink /></li>
                    }
                    { role_details.edited && role_details.delivery && 
                      <li>Do We Require Delivery: <strong>{role_details.edited ? (role_details.delivery === 1 ? 'Yes' : role_details.delivery === 2 ? 'No' : 'Negotiable') : ''}</strong></li>
                    }
                    { role_details.edited && third_party_insurance && 
                      <li>Do We Require Third-Party Insurance: <strong>{role_details.edited ? (role_details.third_party_insurance ? 'Yes' : 'No') : ''}</strong></li>
                    }
                    <li>Business Types: </li>
                    {category && some(category) ?
                      <ul className="noMarginBottom">
                        {map(category, (key, item) => {
                          if (key === true) return <li key={item}>{item}</li>
                        }
                        )}
                      </ul>
                      :
                      <ul><li>No Business Types</li></ul>
                    }
                  </ul>
                </Col>
              }
            </Row>
          </div>
          }
        />
        <ProfileConnections />
      </div>
    )
  }
}

export default OrgProfileCard