import { fork, call, put, takeLatest } from 'redux-saga/effects'
import Axios from 'axios'
import { map } from 'lodash'

import {
  SHIPPING_RATES_REQUESTING,
  SHIPPING_RATES_SUCCESS,
  SHIPPING_RATES_ERROR,
} from './constants'

const shippingBaseUrl = `${process.env.REACT_APP_API_URL}/shipping/shipping_api_proxy/`

function getShippingRatesApi (client, data) {
  return Axios({
    url: shippingBaseUrl + "?url=shipments",
    method: 'post',
    headers: { Authorization: "Bearer " + client.token || undefined },
    data: {
      "shipment[to_address][country]": "Canada",
      "shipment[to_address][state]": "Ontario",
      "shipment[to_address][zip]": data.to_postal_code,
      "shipment[to_address][city]": data.to_city,
      "shipment[to_address][street1]": data.to_street1,
      "shipment[to_address][residential]": data.to_residential,
      
      "shipment[from_address][country]": "Canada",
      "shipment[from_address][state]": "Ontario",
      "shipment[from_address][zip]": data.from_postal_code,
      "shipment[from_address][city]": data.from_city,
      "shipment[from_address][street1]": data.from_street1,
      "shipment[from_address][residential]": data.from_residential,

      "shipment[parcel][length]": data.parcel.length * 0.393701, // converting from cm to inches
      "shipment[parcel][width]": data.parcel.width * 0.393701,
      "shipment[parcel][height]": data.parcel.height * 0.393701,
      "shipment[parcel][weight]": data.parcel.weight * 16, // converting from ounces to pounds

      "shipment[options][dry_ice]": data.dry_ice,
      "shipment[options][currency]": "CAD",
    }
  })
  .then(response => response.data)
  .then(json => ({ ...json, rates: map(json.rates, item => ({ ...item, rate: parseFloat(item.rate) })) }) )
}

function* getShippingRatesFlow(action) {
  try {
    const { client, data } = action
    const response = yield call(getShippingRatesApi, client, data)

    yield put({ type: SHIPPING_RATES_SUCCESS, response })
  } catch (error) {
    yield put({ type: SHIPPING_RATES_ERROR, error })
  }
}

function* shippingRatesWatcher() {
  yield fork(takeLatest, SHIPPING_RATES_REQUESTING, getShippingRatesFlow)
}

export default shippingRatesWatcher
