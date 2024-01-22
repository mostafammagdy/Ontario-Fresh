import React from 'react'

import Divider from 'material-ui/Divider'

//import StyledCard from '../../components/styledCard'
import ProfileListEditModal from '../../components/profileListEditModal'
//import RoleItemEditModal from '../../components/roleItemEditModal'

import { Row, Col } from 'react-flexbox-grid'
import { map, filter, some } from 'lodash'

import styles from './styles.module.scss'

import { convertObjectToSortedArray } from '../../utils/display-data'


class ServiceProfileCard extends React.Component {
  render () {
    const {
      data: {
        services_needed,
        services_provided,
        //role_details,
        //category,
      },
      //id,
      //type,
      editable,
    } = this.props

    return (
      //<StyledCard cardText={
        <div>
          <Row>
            {
              (editable || (services_needed && some(services_needed.details, 'value'))) &&
                <Col xs={12}>
                  <h6 className={styles.cardSubHeader}>Services that I need:</h6>
                  {
                    editable &&
                      <ProfileListEditModal
                        type="services"
                        data={services_needed}
                        headerEdit
                        title="Services that I need"
                      />
                  }
                  <Divider style={{ marginLeft: -16, marginRight: -16 }} />
                  <Row>
                    <ul>
                      {
                        services_needed &&
                          some(services_needed.details, 'value') ?
                              map(convertObjectToSortedArray(filter(services_needed.details, 'value')), (item, key) => <li key={key}>{item.display}</li>)
                            : editable ?
                                <li>
                                  {
                                  <ProfileListEditModal
                                    textLink
                                    type="services"
                                    id={services_needed.id}
                                    data={services_needed}
                                    label="services your business needs"
                                    title="Services that I need"
                                  />
                                  }
                                </li>
                              :
                            <li>None</li>
                      }
                    </ul>
                  </Row>
                </Col>
            }
            {
              (editable || (services_provided && some(services_provided.details, 'value'))) &&
                <Col xs={12}>
                  <h6 className={styles.cardSubHeader}>Services that I offer:</h6>
                  {
                    editable &&
                      <ProfileListEditModal type="services" data={services_provided} headerEdit title="Services that I offer" />
                  }
                  <Divider style={{marginLeft: -16, marginRight: -16}} />
                  <Row>
                    <ul>
                      {
                        services_provided && some(services_provided.details, 'value') ?
                            map(convertObjectToSortedArray(filter(services_provided.details, 'value')), (item, key) => <li key={key}>{item.display}</li>)
                          : editable ?
                              <li>
                                <ProfileListEditModal
                                  textLink
                                  type="services"
                                  id={services_provided.id}
                                  data={services_provided}
                                  label="services your business offers"
                                  title="Services that I offer"
                                />
                              </li>
                            :
                            <li>None</li>
                      }
                    </ul>
                  </Row>
                </Col>
            }
            {/*
              <Col xs={12}>
                <h6 className={styles.cardSubHeader}>Business Info</h6>
                <Divider />
                <Row>
                  <Col xs>
                    <ul className="noMarginBottom">
                      {editable && <RoleItemEditModal type={type} id={id} role_details={role_details} />}
                      <li>Business Types: </li>
                      <ul className="noMarginBottom">
                        {category && some(category) ?
                          map(category, (key, item) =>
                            (key === true ? <li key={item}>{item}</li> :
                                            null
                            )
                          )
                          :
                          <li>No Business Types</li>
                      }
                      </ul>
                    </ul>
                  </Col>
                </Row>
              </Col>
            */}
          </Row>
        </div>
      //} />
    )
  }
}

export default ServiceProfileCard
