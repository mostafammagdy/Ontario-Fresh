import {
  PROFILE_CONNECTIONS_REQUESTING,
  PROFILE_CONNECTIONS_REQUEST_SUCCESS,
  PROFILE_CONNECTIONS_REQUEST_ERROR,

} from './constants'

const initialState = {
  current: {},
  requesting: false,
  successful: false,
  editing: false,
  messages: [],
  errors: [],
}

const reducer = function profileConnectionsReducer (state = initialState, action) {
  switch (action.type) {
    case PROFILE_CONNECTIONS_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        editing: false,
        messages: [{
          body: "Profile Memberships being requested",
          time: new Date(),
        }],
        errors: [],
      }

    case PROFILE_CONNECTIONS_REQUEST_SUCCESS:
      return {
        current: action.connections,
        requesting: false,
        successful: true, 
        editing: false,
        messages: [{
          body: "Successfully retreieved Profile Memberships!",
          time: new Date(),
        }],
        errors: [],
      }
    
    case PROFILE_CONNECTIONS_REQUEST_ERROR:
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
