import React, { Component } from 'react'

import { Row, Col } from 'react-flexbox-grid'
import { Link } from 'react-router'

import Paper from 'material-ui/Paper'

import styles from './styles.module.scss'

import growerProducer from '../../assets/images/svg/image1.svg'
//import wholesale from '../../assets/images/svg/image2.svg'
//import brewery from '../../assets/images/svg/image3.svg'
//import greenhouse from '../../assets/images/svg/image4.svg'
//import csa from '../../assets/images/svg/image5.svg'
//import foodserviceProvider from '../../assets/images/svg/image6.svg'
//import aggregatorOrHub from '../../assets/images/svg/image7.svg'
//import winery from '../../assets/images/svg/image8.svg'

import restaurants from '../../assets/images/svg/image9.svg'
//import institutions from '../../assets/images/svg/image10.svg'
//import chainGroceries from '../../assets/images/svg/image11.svg'
import chefs from '../../assets/images/svg/image12.svg'
import retailOperator from '../../assets/images/svg/image13.svg'
//import nursery from '../../assets/images/svg/image14.svg'
//import schoolOrCafeteria from '../../assets/images/svg/image15.svg'
//import groupPurchasingOrganization from '../../assets/images/svg/image16.svg'
//import independentGrocery from '../../assets/images/svg/image17.svg'

import distributors from '../../assets/images/svg/image18.svg'
//import packers from '../../assets/images/svg/image19.svg'
import marketingAdvertising from '../../assets/images/svg/image20.svg'
//import healthNutrition from '../../assets/images/svg/image21.svg'
//import economicDevAndTourism from '../../assets/images/svg/image22.svg'
//import government from '../../assets/images/svg/image23.svg'
//import inputProvider from '../../assets/images/svg/image24.svg'
//import packagingAndLabeling from '../../assets/images/svg/image25.svg'
import logistics from '../../assets/images/svg/image26.svg'
//import warehouse from '../../assets/images/svg/image27.svg'
import equipmentAndMachinerySales from '../../assets/images/svg/image28.svg'

import processor from '../../assets/images/svg/image29.svg'

//import agriculturalAssociation from '../../assets/images/svg/image30.svg'
//import culinaryTrail from '../../assets/images/svg/image31.svg'
//import farmersMarket from '../../assets/images/svg/image32.svg'
//import regionalFoodNetwork from '../../assets/images/svg/image33.svg'

class BusinessCategoriesBox extends Component {
  render() {
    const liStylings = {backgroundSize: 30, height: 30, paddingLeft: 34, paddingTop: 2, marginBottom: 25};
    const liPadding = {paddingLeft: 10, fontSize: 14};

    return (
      <Paper className={styles.box} style={{ boxShadow: "0 1px 2px 0 rgba(0,0,0,.2)"}}>
        <Row>
          <Col xs={12} md>
            <h4><Link to="/search?profile_type=SELLS">Suppliers</Link></h4>
            <ul className={styles.noBullet}>
              <li style={{background: `url(${growerProducer}) no-repeat left top`, ...liStylings }}>
                <Link to="/search?category=Grower%2FProducer" style={liPadding}>Growers & Producers</Link>
              </li>
              <li style={{ background: `url(${distributors}) no-repeat left top`, ...liStylings }}>
                <Link to="/search?category=Distributor" style={liPadding}>Distributors</Link>
              </li>
              <li style={{ background: `url(${processor}) no-repeat left top`, ...liStylings }}>
                <Link to="/search?category=Processor" style={liPadding}>Processors</Link>
              </li>
            </ul>
          </Col>
          <Col xs={12} md>
            <h4><Link to="/search?profile_type=BUYS">Buyers</Link></h4>
            <ul className={styles.noBullet}>
              <li style={{ background: `url(${chefs}) no-repeat left top`, ...liStylings }}>
                <Link to="/search?category=Chef" style={liPadding}>Chefs</Link>
              </li>
              <li style={{background: `url(${restaurants}) no-repeat left top`, ...liStylings }}>
                <Link to="/search?category=Restaurant" style={liPadding}>Restaurants</Link>
              </li>
              <li style={{ background: `url(${retailOperator}) no-repeat left top`, ...liStylings }}>
                <Link to="/search?category=Retail+Operator" style={liPadding}>Retail Operators</Link>
              </li>
            </ul>
          </Col>
          <Col xs={12} md>
            <h4><Link to="/search?profile_type=BUSINESS OPPORTUNITIES">Service Providers</Link></h4>
            <ul className={styles.noBullet}>
              <li style={{ background: `url(${marketingAdvertising}) no-repeat left top`, ...liStylings }}>
                <Link to="/search?category=Marketing+and+Advertising" style={liPadding}>Marketing & Advertising</Link>
              </li>
              <li style={{ background: `url(${logistics}) no-repeat left top`, ...liStylings }}>
                <Link to="/search?category=Logistics" style={liPadding}>Logistics</Link>
              </li>
              <li style={{ background: `url(${equipmentAndMachinerySales}) no-repeat left top`, ...liStylings }}>
                <Link to="/search?category=Equipment+%26+Machinery+Sales" style={liPadding}>Equipment & Machinery Sales</Link>
              </li>
            </ul>
          </Col>
          {/*
          <Col xs={12} md>
            <h4><Link to="/search?profile_type=ORG">Organization</Link></h4>
            <ul className={styles.noBullet}>
              <li style={{background: `url(${agriculturalAssociation}) no-repeat left top`, ...liStylings }}>
                <Link to="/search?category=Agricultural+Association" style={liPadding}>Agricultural Association</Link>
              </li>
              <li style={{background: `url(${farmersMarket}) no-repeat left top`, ...liStylings }}>
                <Link to="/search?category=Farmers'+Market" style={liPadding}>Farmers' Markets</Link>
              </li>
              <li style={{background: `url(${regionalFoodNetwork}) no-repeat left top`, ...liStylings }}>
                <Link to="/search?category=Regional+Food+Network" style={liPadding}>Regional Food Networks</Link>
              </li>
            </ul>
          </Col>
          */}
        </Row>
      </Paper>
    )
  }
}

export default BusinessCategoriesBox