import {
  ADDRESS_CREATING,
  ADDRESS_CREATE_SUCCESS,
  ADDRESS_CREATE_ERROR,
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

    case ADDRESS_CREATING:
      return {
        ...state,
        requesting: true,
        successful: false,
        editing: false,
        messages: [{
          body: "Address being created",
          time: new Date(),
        }],
        errors: [],
      }

    case ADDRESS_CREATE_SUCCESS:
      return {
        requesting: false,
        successful: true,
        editing: false,
        messages: [{
          body: "Successfully created Address!",
          time: new Date(),
        }],
        errors: [],
      }

    case ADDRESS_CREATE_ERROR:
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
