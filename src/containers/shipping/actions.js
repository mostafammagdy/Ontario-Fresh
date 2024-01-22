import {
  SHIPPING_RATES_REQUESTING,
  SHIPPING_RATES_SUCCESS,
  SHIPPING_RATES_ERROR,
  SHIPPING_RATES_POPULATE_TO,

  SORT_SHIPPING_RATES,
} from './constants'

export const shippingRatesRequest = function shippingRatesRequest(client, data) {
  return {
    type: SHIPPING_RATES_REQUESTING,
    client,
    data,
  }
}

export const shippingRatesRequestSuccess = function shippingRatesRequestSuccess(data) {
  return {
    type: SHIPPING_RATES_SUCCESS,
    data,
  }
}

export const shippingRatesRequestError = function shippingRatesRequestError(error) {
  return {
    type: SHIPPING_RATES_ERROR,
    error,
  }
}

export const shippingRatesLoadToRequest = function shippingRatesLoadToRequest (data) {
  return {
    type: SHIPPING_RATES_POPULATE_TO,
    data,
  }
}

export const sortShippingRates = function sortShippingRates(by, order="asc") {
  return {
    type: SORT_SHIPPING_RATES,
    by,
    order,
  }
}
