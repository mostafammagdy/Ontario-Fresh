import {
  CREATING_PROFILE_ON_BEHALF,
  CREATING_PROFILE_ON_BEHALF_SUCCESS,
  CREATING_PROFILE_ON_BEHALF_ERROR,
  OPEN_CREATING_PROFILE_ON_BEHALF_MODAL,
  CLOSE_CREATING_PROFILE_ON_BEHALF_MODAL,
  CLEAR_CREATE_PROFILE_ON_BEHALF_NOTIFICATION
} from './constants'

const initialState = {
  requesting: false,
  successful: false,
  open: false,
  notify: false,
  messages: [],
  errors: [],
}

const reducer = function createProfileOnBehalfReducer (state = initialState, action) {
  switch (action.type) {
    case CREATING_PROFILE_ON_BEHALF:
      return {
        ...state,
        requesting: true,
        successful: false,
        notify: false,
        messages: [{
          body: "Attempting to create a profile",
          time: new Date(),
        }],
        errors: [],
      }

    case CREATING_PROFILE_ON_BEHALF_SUCCESS:
      return {
        ...state,
        requesting: false,
        successful: true,
        open: false,
        notify: true,
        messages: [{
          body: "Created a profile!",
          time: new Date(),
        }],
        errors: [],
      }

    case CREATING_PROFILE_ON_BEHALF_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        notify: false,
        messages: [],
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
      }

    case OPEN_CREATING_PROFILE_ON_BEHALF_MODAL:
      return {
        ...state,
        open: true,
        notify: false
      }

    case CLOSE_CREATING_PROFILE_ON_BEHALF_MODAL:
      return {
        ...state,
        open: false,
        notify: false,
        errors: []
      }
    
    case CLEAR_CREATE_PROFILE_ON_BEHALF_NOTIFICATION:
      return {
        ...state,
        notify: false
      }

    default:
      return state
  }
}

export default reducer
