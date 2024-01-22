import {
  CONTACT_UPDATING,
  CONTACT_UPDATE_SUCCESS,
  CONTACT_UPDATE_ERROR,

  CONTACT_DELETING,
  CONTACT_DELETE_SUCCESS,
  CONTACT_DELETE_ERROR,
} from './constants'

const initialState = {
  requesting: false,
  successful: false,
  editing: false,
  messages: [],
  errors: [],
}

const reducer = function manageContactReducer (state = initialState, action) {
  switch (action.type) {

    case CONTACT_UPDATING:
      return {
        ...state,
        requesting: true,
        successful: false,
        editing: false,
        messages: [{
          body: "Contact being updated",
          time: new Date(),
        }],
        errors: [],
      }

    case CONTACT_UPDATE_SUCCESS:
      return {
        requesting: false,
        successful: true,
        editing: false,
        messages: [{
          body: "Successfully updated Contact!",
          time: new Date(),
        }],
        errors: [],
      }

    case CONTACT_UPDATE_ERROR:
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

    case CONTACT_DELETING:
      return {
        ...state,
        requesting: true,
        successful: false,
        editing: false,
        messages: [{
          body: "Contact being deleted",
          time: new Date(),
        }],
        errors: [],
      }

    case CONTACT_DELETE_SUCCESS:
      return {
        requesting: false,
        successful: true,
        editing: false,
        messages: [{
          body: "Successfully deleted Contact!",
          time: new Date(),
        }],
        errors: [],
      }

    case CONTACT_DELETE_ERROR:
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
