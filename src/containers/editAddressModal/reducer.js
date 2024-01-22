import {
  ADDRESS_UPDATING,
  ADDRESS_UPDATE_SUCCESS,
  ADDRESS_UPDATE_ERROR,

  ADDRESS_DELETING,
  ADDRESS_DELETE_SUCCESS,
  ADDRESS_DELETE_ERROR,
} from './constants'

const initialState = {
  requesting: false,
  successful: false,
  editing: false,
  messages: [],
  errors: [],
}

const reducer = function manageAddressReducer (state = initialState, action) {
  switch (action.type) {

    case ADDRESS_UPDATING:
      return {
        ...state,
        requesting: true,
        successful: false,
        editing: false,
        messages: [{
          body: "Address being updated",
          time: new Date(),
        }],
        errors: [],
      }

    case ADDRESS_UPDATE_SUCCESS:
      return {
        requesting: false,
        successful: true,
        editing: false,
        messages: [{
          body: "Successfully updated Address!",
          time: new Date(),
        }],
        errors: [],
      }

    case ADDRESS_UPDATE_ERROR:
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

    case ADDRESS_DELETING:
      return {
        ...state,
        requesting: true,
        successful: false,
        editing: false,
        messages: [{
          body: "Address being deleted",
          time: new Date(),
        }],
        errors: [],
      }

    case ADDRESS_DELETE_SUCCESS:
      return {
        requesting: false,
        successful: true,
        editing: false,
        messages: [{
          body: "Successfully deleted Address!",
          time: new Date(),
        }],
        errors: [],
      }

    case ADDRESS_DELETE_ERROR:
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

    default:
      return state
  }
}

export default reducer
