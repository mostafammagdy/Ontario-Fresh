import {
  CREATE_PRODUCT,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,

  UPDATE_PRODUCT,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,

  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,

  GET_PRODUCT_SUGGESTIONS,
  GET_PRODUCT_SUGGESTIONS_SUCCESS,
  GET_PRODUCT_SUGGESTIONS_ERROR
} from './constants'

const initialState = {
  requesting: false,
  successful: false,
  editing: false,
  suggestions: [],
  messages: [],
  errors: [],
}


const reducer = function editProductsComponentReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_PRODUCT:
      return {
        ...state,
        requesting: true,
        successful: false,
        editing: false,
        messages: [{
          body: "Creating product",
          time: new Date(),
        }],
        errors: [],
      }

    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        requesting: false,
        successful: true,
        editing: false,
        messages: [{
          body: "Successfully created product!",
          time: new Date(),
        }],
        errors: [],
      }

    case CREATE_PRODUCT_ERROR:
      return {
        requesting: false,
        successful: false,
        editing: false,
        messages: [],
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
      }

    case UPDATE_PRODUCT:
      return {
        ...state,
        requesting: true,
        successful: false,
        editing: false,
        messages: [{
          body: "Updating product",
          time: new Date(),
        }],
        errors: [],
      }
      case UPDATE_PRODUCT_SUCCESS:
        return {
          ...state,
          requesting: false,
          successful: true,
          editing: false,
          messages: [{
            body: "Successfully updated product!",
            time: new Date(),
          }],
          errors: [],
        }
  
      case UPDATE_PRODUCT_ERROR:
        return {
          requesting: false,
          successful: false,
          editing: false,
          messages: [],
          errors: state.errors.concat([{
            body: action.error.toString(),
            time: new Date(),
          }]),
        }

    case DELETE_PRODUCT:
      return {
        ...state,
        requesting: true,
        successful: false,
        editing: false,
        messages: [{
          body: "Deleting product",
          time: new Date(),
        }],
        errors: [],
      }

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        requesting: false,
        successful: true,
        editing: false,
        messages: [{
          body: "Successfully deleted product!",
          time: new Date(),
        }],
        errors: [],
      }

    case DELETE_PRODUCT_ERROR:
      return {
        requesting: false,
        successful: false,
        editing: false,
        messages: [],
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
      }

    case GET_PRODUCT_SUGGESTIONS:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [{
          body: "Requesting product suggestions",
          time: new Date(),
        }],
        errors: [],
      }

    case GET_PRODUCT_SUGGESTIONS_SUCCESS:
      return {
        ...state,
        requesting: false,
        successful: true,
        suggestions: action.data,
        messages: [{
          body: "Received product suggestions",
          time: new Date(),
        }],
        errors: [],
      }

    case GET_PRODUCT_SUGGESTIONS_ERROR:
      return {
        requesting: false,
        successful: false,
        messages: [{
          body: "Product suggestions failed",
          time: new Date(),
        }],
        errors: [],
      }

    default:
      return state
  }
}

export default reducer
