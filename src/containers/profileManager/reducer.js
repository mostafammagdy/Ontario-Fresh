import {
  MANAGED_PROFILES_REQUESTING,
  MANAGED_PROFILES_REQUEST_SUCCESS,
  MANAGED_PROFILES_REQUEST_ERROR,

  CONNECTION_REQUEST_SENDING,
  CONNECTION_REQUEST_SEND_SUCCESS,
  CONNECTION_REQUEST_SEND_ERROR,
} from './constants'

import {
  LOGOUT
} from '../login/constants'

import {
  HIJACK_REQUESTING
} from '../../components/hijack/constants'

const initialState = {
  profiles: {},
  send_request: {},
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
}

const reducer = function profileManagerReducer (state = initialState, action) {
  switch (action.type) {

    case MANAGED_PROFILES_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [{ body: 'Getting managed profiles...', time: new Date() }],
        errors: [],
      }

    case MANAGED_PROFILES_REQUEST_SUCCESS:
      return {
        ...state,
        profiles: action.response,
        errors: [],
        messages: [],
        requesting: false,
        successful: true,
      }

    case MANAGED_PROFILES_REQUEST_ERROR:
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

    case CONNECTION_REQUEST_SENDING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [{ body: 'Sending connection request...', time: new Date() }],
        errors: [],
      }

    case CONNECTION_REQUEST_SEND_SUCCESS:
      return {
        ...state,
        send_request: action.response,
        errors: [],
        messages: [],
        requesting: false,
        successful: true,
      }

    case CONNECTION_REQUEST_SEND_ERROR:
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

    case LOGOUT:
    case HIJACK_REQUESTING:
      return initialState

    default:
      return state
  }
}

export default reducer
