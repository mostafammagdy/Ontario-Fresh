import {
  PRODUCT_CATEGORIES_REQUESTING,
  PRODUCT_CATEGORIES_REQUEST_SUCCESS,
  PRODUCT_CATEGORIES_REQUEST_ERROR,
} from './constants'

const initialState = {
  requesting: false,
  successful: false,
  editing: false,
  messages: [],
  errors: [],
  categories: [],
}

const reducer = function editProductsReducer (state = initialState, action) {
  switch (action.type) {
    case PRODUCT_CATEGORIES_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        editing: false,
        messages: [{
          body: "Retrieving Product Categories",
          time: new Date(),
        }],
        errors: [],
        categories: [],
      }

    case PRODUCT_CATEGORIES_REQUEST_SUCCESS:
      return {
        requesting: false,
        successful: true,
        editing: false,
        messages: [{
          body: "Successfully retrieved Product Categories",
          time: new Date(),
        }],
        errors: [],
        categories: action.response,
      }

    case PRODUCT_CATEGORIES_REQUEST_ERROR:
      return {
        requesting: false,
        successful: false,
        editing: false,
        messages: [],
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
        categories: [],
      }

    default:
      return state
  }
}

export default reducer
