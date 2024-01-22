import {
  SHIPPING_RATES_REQUESTING,
  SHIPPING_RATES_SUCCESS,
  SHIPPING_RATES_ERROR,
  SHIPPING_RATES_POPULATE_TO,

  SORT_SHIPPING_RATES,
} from './constants'

import { orderBy, concat, filter } from 'lodash'

const initialState = {
  options: {},
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
}

const otherRatesRefrigerated = [
  { carrier: "Erb Shipping", service: "Refrigerated" },
  { carrier: "TAS Distribution", service: "Refrigerated" },
  { carrier: "Galaxy Transport Inc.", service: "Refrigerated" },
  { carrier: "Kriska", service: "Refrigerated" },
];

const otherRates = [
  { carrier: "Challenger", service: "" },
  { carrier: "Manitoulin Transport", service: "" },
  { carrier: "Loomis Express", service: "" },
  { carrier: "TNT Express", service: "" },
  { carrier: "KW Delivery", service: "" },
  { carrier: "Cavalier", service: "" },
  { carrier: "SLH Transport Inc.", service: "" },
  { carrier: "Atlantic Transport Inc.", service: "" },
]

const reducer = function shippingReducer (state = initialState, action) {
  switch (action.type) {
    case SHIPPING_RATES_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [{ body: 'Getting shipping rates...', time: new Date() }],
        errors: [],
      }

    case SHIPPING_RATES_SUCCESS:
      return {
        ...state,
        options: {
          ...action.response,
          rates: orderBy([...concat(action.response.rates, action.response.options.dry_ice ? otherRatesRefrigerated : otherRates)], "rate", "asc"),
        },
        errors: [],
        messages: [],
        requesting: false,
        successful: true,
      }

    case SHIPPING_RATES_ERROR:
      return {
        ...state,
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
        messages: [],
        requesting: false,
        successful: false,
      }

    case SORT_SHIPPING_RATES:
      return {
        ...state,
        options: {
          ...state.options,
          rates: (action.by === "rate" || action.by === "delivery_days") ? (orderBy(filter(state.options.rates, (item) => !!item[action.by]), action.by, action.order)).concat(filter(state.options.rates, (item) => !item[action.by]))
                                                                         : orderBy(state.options.rates, action.by, action.order)
        }
      }

    case SHIPPING_RATES_POPULATE_TO:
      return {
        ...state,
        data: action.data,
      }

    default:
      return state
  }
}

export default reducer
