import {
  CONTACT_CREATING,
  CONTACT_CREATE_SUCCESS,
  CONTACT_CREATE_ERROR,
} from './constants'

const initialState = {
  requesting: false,
  successful: false,
  editing: false,
  messages: [],
  errors: [],
}

const reducer = function manageContactsReducer (state = initialState, action) {
  switch (action.type) {

    case CONTACT_CREATING:
      return {
        ...state,
        requesting: true,
        successful: false,
        editing: false,
        messages: [{
          body: "Contact being created",
          time: new Date(),
        }],
        errors: [],
      }

    case CONTACT_CREATE_SUCCESS:
      return {
        requesting: false,
        successful: true,
        editing: false,
        messages: [{
          body: "Successfully created Contact!",
          time: new Date(),
        }],
        errors: [],
      }

    case CONTACT_CREATE_ERROR:
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
