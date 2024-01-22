import React, { Component } from 'react'
import { reduxForm, Field, initialize } from 'redux-form'
import MediaQuery from 'react-responsive'

import { connect } from 'react-redux'
import { compose } from 'recompose'

import { map, isEmpty } from 'lodash'
import { Row, Col } from 'react-flexbox-grid'
import { Checkbox } from 'redux-form-material-ui'

import Subheader from 'material-ui/Subheader'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

import StyledInput from '../../components/styledInput'
import StyledCard from '../../components/styledCard'
import InlineLoader from '../../components/inlineLoader'
import ResizableButton from '../../components/resizableButton'

import {
  checkRequired,
} from '../../utils/client-side-validation'

import {
  basicProfileRequest
} from '../profile/actions'

import { 
  shippingRatesRequest,
  sortShippingRates,
  shippingRatesLoadToRequest,
} from './actions'

import UpArrow from 'material-ui/svg-icons/navigation/arrow-drop-up'
import DownArrow from 'material-ui/svg-icons/navigation/arrow-drop-down'

import styles from './styles.module.scss'


class Shipping extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ascending: true,
      type: "rate",
      loadedInitialAddress: false,
      shouldScroll: false,
    }
  }

  UNSAFE_componentWillMount() {
    window.scrollTo(0, 0)
    document.body.style.backgroundColor = "#F5F4F5"
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = null
  }

  componentDidMount() {
    const {
      client,
      basicProfileRequest
    } = this.props

    if (client && client.token) {
      basicProfileRequest(client)
    }
  }

  handleInitializeValues() {
    const {
      profile: {
        authed: {
          address_1,
          city,
          postal_code
        }
      }
    } = this.props
    const initialFormValues = {
      "from_street1": address_1 ? address_1 : "",
      "from_city": city ? city : "",
      "from_postal_code": postal_code ? postal_code : "",
    }

    this.props.dispatch(initialize('shippingForm', initialFormValues))
  }

  componentDidUpdate() {
    const {
      loadedInitialAddress
    } = this.state

    const {
      shipping
    } = this.props

    const {
      profile: {
        authed
      }
    } = this.props
    
    if (!loadedInitialAddress && !isEmpty(authed)) {
      this.handleInitializeValues()
      this.setState({loadedInitialAddress: true})
    }

    if (shipping && shipping.successful && this.state.shouldScroll) {
      this.setState({
        shouldScroll: false,
      })

      window.scrollTo({
        top: document.getElementById('resultsRef').offsetTop, 
        behavior: "smooth"
      })
    }
  }

  getCarrierServiceName (carrierService) {
    switch (carrierService) {
      case "FEDEX_GROUND":
        return "Ground";
      case "ExpeditedParcel":
        return "Expedited Parcel";
      case "RegularParcel":
        return "Regular Parcel";
      case "UPSStandard":
        return "Standard";
      case "NextDayAirSaver":
        return "Next Day Air Saver";
      case "PurolatorGround":
        return "Ground";
      case "PurolatorExpress":
        return "Express";
      case "STANDARD_OVERNIGHT":
        return "Standard Overnight";
      case "FEDEX_2_DAY":
        return "2 Day";
      case "FEDEX_EXPRESS_SAVER":
        return "Express Saver";
      case "NextDayAir":
        return "Next Day Air";
      case "PRIORITY_OVERNIGHT":
        return "Priority Overnight";
      case "PurolatorExpress1030AM":
        return "Express 1030AM";
      case "PurolatorExpressEvening":
        return "Express Evening";
      case "FIRST_OVERNIGHT":
        return "First Overnight";
      case "PurolatorExpress9AM":
        return "Express 9AM";
      case "NextDayAirEarlyAM":
        return "Next Day Air Early AM";
      default:
        return carrierService;
    }
  }

  getWebsiteURL (object) {
    const {
      from_address,
      buyer_address,
      parcel: {
        length,
        width,
        height,
        weight
      }
    } = this.props.shipping.options

    switch (object.carrier) {
      case "CanadaPost":
        return `https://www.canadapost.ca/cpotools/apps/far/business/findARate?fromPostalCode=${from_address.zip}&toPostalCode=${buyer_address.zip}&length=${length}&width=${width}&height=${height}&weight=${weight}`;
      case "UPS":
        return `https://wwwapps.ups.com/ctc/request?loc=en_CA&origCity=${from_address.city}&destCity=${buyer_address.city}`;
      case "Purolator":
        return `https://eshiponline.purolator.com/shiponline/estimates/estimate.aspx?lang=e`;
      case "FedEx":
        return `https://www.fedex.com/ratefinder/home`;
      case "Erb Shipping":
        return `http://erbgroup.com/services/cold-storage/`;
      case "Challenger":
        return `https://www.challenger.com/request-a-quote/`;
      case "Manitoulin Transport":
        return `https://www.mtdirect.ca/menu/index.html?CMID=REQQUOTE_A`;
      case "Loomis Express":
        return `http://www.loomisexpress.com/webship/wfRateCalculator.aspx`;
      case "TAS Distribution":
        return `https://www.tas-refrig.com/en/services/refrigerated-transportation`;
      case "TNT Express":
        return `https://www.tnt.com/express/en_ca/site/home/applications/app_panel_pricing.html?respCountry=ca&respLang=en&navigation=0&buttonTextPrice=Get+price&buttonTextTimes=Get+times&rdoTimeOrPrice=price&collectionCountry=CA&deliveryCountry=CA`;
      case "KW Delivery":
        return `http://kwdelivery.ca/estimates/`;
      case "Cavalier":
        return `http://www.cavalier.ca/en/resources_shipping_rate_request.asp`;
      case "Galaxy Transport Inc.":
        return `http://www.galaxytransport.ca/request-a-rate-quote/`;
      case "SLH Transport Inc.":
        return `https://www.slh.ca/en/resources_rate_request_truckload_shipping.asp`;
      case "Kriska":
        return `http://www.kriska.com/kriska/en-ca/services/temperaturecontrol.aspx`;
      case "Atlantic Transport Inc.":
        return `http://www.altanic.ca/`;
      default:
        return undefined;
    }
  }

  handleToggleSort = (type) => {
    const {
      shipping
    } = this.props

    if (shipping.requesting) {
      return;
    }

    const {
      ascending,
    } = this.state

    let newAscending = type === this.state.type ? !ascending : true;

    this.setState({
      ascending: newAscending,
      type: type,
    })

    let order = newAscending ? "asc" : 'desc'
    this.props.sortShippingRates(type, order)
  }

  // handleScrollPage = () => {
  //   let formDiv = document.getElementById("shippingRates")
  //   window.scroll(0, formDiv.scrollHeight)
  // }
 
  handleGetShippingRates = (values) => {
    const {
      client,
      shippingRatesRequest
    } = this.props

    if (client && client.token) {
      this.setState({
        ascending: true,
        type: "rate",
        shouldScroll: true,
      })

      return shippingRatesRequest(client, values)
    }
  }

  render () {
    const {
      handleSubmit,
      shipping,
      // shippingRatesLoadToRequest
    } = this.props

    const {
      ascending,
      type,
    } = this.state

    return (
      <div className={styles.shippingPageContainer}>
        <Row>
          <Col xs={12} id="shippingForm" className={styles.shippingForm}>
            <StyledCard
              cardTitle={<span style={{ fontSize: '1.125rem'}}>Shipping Calculator</span>}
              cardText={
                <div style={{ padding: '1rem' }}>
                  <h4>Find a shipping carrier that works for you.</h4>
                  <form onSubmit={handleSubmit(this.handleGetShippingRates)}>
                    <Row>
                      <Col sm={12} md={4}>
                        <Subheader>1. Where are you shipping from?</Subheader>
                        <Field
                          component={StyledInput}
                          disabled={shipping.requesting}
                          validate={checkRequired}
                          label="Street Address"
                          name="from_street1"
                          type="text"
                        />                 
                        <Field
                          half
                          component={StyledInput}
                          disabled={shipping.requesting}
                          validate={checkRequired}
                          label="City"
                          name="from_city"
                          type="text"
                        />
                        <Field
                          half
                          component={StyledInput}
                          disabled={shipping.requesting}
                          validate={checkRequired}
                          label="Postal Code"
                          name="from_postal_code"
                          type="text"
                        />
                        <Field
                          component={Checkbox}
                          disabled={shipping.requesting}
                          label="This is a residential address"
                          name="from_residential"
                          type="checkbox"
                        />
                      </Col>
                      <Col sm={12} md={4}>
                        <Subheader>2. What are you shipping?</Subheader>
                        <Field
                          half
                          component={StyledInput}
                          disabled={shipping.requesting}
                          validate={checkRequired}
                          label="Length (cm)"
                          name="parcel.length"
                          type="number"
                          min="0.01"
                          step="0.01"
                        />
                        <Field
                          half
                          component={StyledInput}
                          disabled={shipping.requesting}
                          validate={checkRequired}
                          label="Width (cm)"
                          name="parcel.width"
                          type="number"
                          min="0.01"
                          step="0.01"
                        />
                        <Field
                          half
                          component={StyledInput}
                          disabled={shipping.requesting}
                          validate={checkRequired}
                          label="Height (cm)"
                          name="parcel.height"
                          type="number"
                          min="0.01"
                          step="0.01"
                        />
                        <Field
                          half
                          component={StyledInput}
                          disabled={shipping.requesting}
                          validate={checkRequired}
                          label="Weight (lb)"
                          name="parcel.weight"
                          type="number"
                          min="0.01"
                          step="0.01"
                        />
                        <Field
                          component={Checkbox}
                          disabled={shipping.requesting}
                          label="I am shipping temperature sensitive items"
                          name="dry_ice"
                          type="checkbox"
                          min="0.01"
                          step="0.01"
                        />

                      </Col>
                      <Col sm={12} md={4}>
                        <Subheader>3. Where are you shipping to?</Subheader>
                        <Field
                          component={StyledInput}
                          disabled={shipping.requesting}
                          validate={checkRequired}
                          label="Street Address"
                          name="to_street1"
                          type="text"
                        />   
                        <Field
                          half
                          component={StyledInput}
                          disabled={shipping.requesting}
                          validate={checkRequired}
                          label="City"
                          name="to_city"
                          type="text"
                        />
                        <Field
                          half
                          component={StyledInput}
                          disabled={shipping.requesting}
                          validate={checkRequired}
                          label="Postal Code"
                          name="to_postal_code"
                          type="text"
                        />
                        <Field
                          component={Checkbox}
                          disabled={shipping.requesting}
                          label="This is a residential address"
                          name="to_residential"
                          type="checkbox"
                        />
                      </Col>
                      <Col xs>
                        <ResizableButton
                          fullWidth
                          primary
                          disabled={shipping.requesting}
                          type="submit"
                          label="Get Shipping Rates"
                          size="1.3"
                          style={{ marginTop: 20 }}
                        />
                      </Col>
                    </Row>
                  </form>
                </div>
              }
            />
          </Col>
          {(shipping.requesting || shipping.successful) &&
            <Col xs={12} id="shippingRates" style={{marginTop: "1rem"}}>
              <h1 id='resultsRef'>Shipping Rates {shipping.successful && `(${shipping.options.rates.length})`}</h1>
              <MediaQuery minWidth={768}>
                <Table style={{ marginBottom: 0 }}>
                  <TableHeader
                    displaySelectAll={false}
                    adjustForCheckbox={false}
                    style={{ backgroundColor: '#E9E9E9' }}
                  >
                    <TableRow>
                      <TableHeaderColumn
                        style={{ textTransform: 'uppercase', fontWeight: 500, color: '#424242' }}
                        id="carrier"
                      >
                      <div className={styles.alignRow} style={{ 'cursor': 'pointer' }} onClick={(e) => (this.handleToggleSort("carrier"))}>
                          {type === "carrier" ? <strong>Carrier Details</strong> : "Carrier Details" }
                          {type === "carrier" && ascending ? <UpArrow /> : <DownArrow />}
                        </div>
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        style={{ textTransform: 'uppercase', fontWeight: 500, color: '#424242' }}
                        id="rate"
                      >
                        <div className={styles.alignRow} style={{ 'cursor': 'pointer' }} onClick={(e) => (this.handleToggleSort("rate"))}>
                          {type === "rate" ? <strong>Quote</strong> : "Quote" }
                          {type === "rate" && ascending ? <UpArrow /> : <DownArrow />}
                        </div>
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        style={{ textTransform: 'uppercase', fontWeight: 500, color: '#424242' }}
                        id="delivery_days"
                      >
                        <div className={styles.alignRow} style={{ 'cursor': 'pointer' }} onClick={(e) => (this.handleToggleSort("delivery_days"))}>
                          {type === "delivery_days" ? <strong>Delivery Days</strong> : "Delivery Days"}
                          {type === "delivery_days" && ascending ? <UpArrow /> : <DownArrow />}
                        </div>
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        style={{ textTransform: 'uppercase', fontWeight: 500, color: '#424242' }}
                        id="link"
                      >
                        Visit Carrier
                        {/* {shipping.options.rates && shipping.options.rates.length} Total */}
                      </TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody
                    displayRowCheckbox={false}
                  >
                    {
                      shipping.requesting ?
                        <TableRow>
                          <TableRowColumn><InlineLoader /></TableRowColumn>
                          <TableRowColumn><InlineLoader /></TableRowColumn>
                          <TableRowColumn><InlineLoader /></TableRowColumn>
                          <TableRowColumn><InlineLoader /></TableRowColumn>
                        </TableRow>
                        :
                        shipping.successful && shipping.options.rates && !isEmpty(shipping.options.rates) ?
                          map(shipping.options.rates, (item, key) =>
                            <TableRow key={key}>
                              <TableRowColumn><strong>{item.carrier} {this.getCarrierServiceName(item.service)}</strong></TableRowColumn>
                              <TableRowColumn>{item.rate ? ("$" + item.rate.toFixed(2)) : "Please Contact"}</TableRowColumn>
                              <TableRowColumn>{item.delivery_days ? (item.delivery_days + (item.delivery_days === 1 ? ' Day' : ' Days')) : '' }</TableRowColumn>
                              <TableRowColumn><a href={this.getWebsiteURL(item)} target="_blank" rel="noopener noreferrer"><FlatButton primary label="Visit Website" style={{marginLeft: -16}} /></a></TableRowColumn>
                            </TableRow>
                          )
                      :
                      <TableRow selectable={false}>
                        <TableRowColumn><strong>No rates available.</strong></TableRowColumn>
                      </TableRow>
                    }
                  </TableBody>
                </Table>
              </MediaQuery>
              <MediaQuery maxWidth={767}>
                <Table style={{ marginBottom: 0 }}>
                  <TableHeader
                    displaySelectAll={false}
                    adjustForCheckbox={false}
                    style={{ backgroundColor: '#E9E9E9' }}
                  >
                    <TableRow>
                      <TableHeaderColumn
                        style={{ textTransform: 'uppercase', fontWeight: 500, color: '#424242' }}
                      >
                        <strong>Carrier Details</strong>
                      </TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody
                    displayRowCheckbox={false}
                  >
                    {
                      shipping.requesting ?
                        <TableRow>
                          <TableRowColumn><InlineLoader /></TableRowColumn>
                        </TableRow>
                        :
                        shipping.successful && shipping.options.rates && !isEmpty(shipping.options.rates) ?
                          map(shipping.options.rates, (item, key) =>
                            <TableRow key={key}>
                              <TableRowColumn>
                                <Col xs={12} sm={4}>
                                  <strong>{item.carrier} {this.getCarrierServiceName(item.service)}</strong>
                                </Col>
                                <Col xs={12} sm={4}>{item.rate ? ("$" + item.rate.toFixed(2)) : "Please Contact"}</Col>
                                {item.delivery_days && <Col xs={12} sm={4}>{(item.delivery_days + (item.delivery_days === 1 ? ' Day' : ' Days'))}</Col>}
                                <Col xs={12} sm={4}><a href={this.getWebsiteURL(item)} target="_blank" rel="noopener noreferrer"><FlatButton primary label="Visit Website" style={{marginLeft: -16}} /></a></Col>
                              </TableRowColumn>
                            </TableRow>
                          )
                      :
                      <TableRow selectable={false}>
                        <TableRowColumn><strong>No rates available.</strong></TableRowColumn>
                      </TableRow>
                    }
                  </TableBody>
                </Table>
              </MediaQuery>
            </Col>
          }
        </Row>
        <span className={styles.scrollToTop} onClick={() => window.scrollTo(0, 0)}>Back to the top</span>
      </div>
    )
  }
}

// const resetForm = (result, dispatch) =>
//   dispatch(reset('shippingForm'))

const mapStateToProps = state => ({
  client: state.client,
  profile: state.profile,
  shipping: state.shipping
})

export default compose(
  connect(mapStateToProps,
  {
    basicProfileRequest,
    shippingRatesRequest,
    sortShippingRates,
    shippingRatesLoadToRequest
  }),
  reduxForm({
    form: 'shippingForm',
    //enableReinitialize: true, //allow the form to populate with initialization values again if the initialization values change
  })
)(Shipping)
