import {
  PROFILE_CLASSIFIEDS_REQUESTING,
  PROFILE_CLASSIFIEDS_REQUEST_SUCCESS,
  PROFILE_CLASSIFIEDS_REQUEST_ERROR,

  PUBLIC_CLASSIFIEDS_REQUESTING,
  PUBLIC_CLASSIFIEDS_REQUEST_SUCCESS,
  PUBLIC_CLASSIFIEDS_REQUEST_ERROR, 
} from './constants'

const initialState = {
  current: {},
  requesting: false,
  successful: false,
  editing: false,
  messages: [],
  errors: [],
}

const reducer = function profileClassifiedsReducer (state = initialState, action) {
  switch (action.type) {
    case PROFILE_CLASSIFIEDS_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        editing: false,
        messages: [{
          body: "Profile classifieds being requested",
          time: new Date(),
        }],
        errors: [],
      }

    case PROFILE_CLASSIFIEDS_REQUEST_SUCCESS:
      return {
        current: action.profile,
        requesting: false,
        successful: true,
        editing: false,
        messages: [{
          body: "Successfully retreieved profile classifieds!",
          time: new Date(),
        }],
        errors: [],
      }
    
    case PROFILE_CLASSIFIEDS_REQUEST_ERROR:
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

    case PUBLIC_CLASSIFIEDS_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        editing: false,
        messages: [{
          body: "Public classifieds being requested",
          time: new Date(),
        }],
        errors: [],
      }

    case PUBLIC_CLASSIFIEDS_REQUEST_SUCCESS:
      return {
        current: action.classifieds,
        requesting: false,
        successful: true,
        editing: false,
        messages: [{
          body: "Successfully retreieved public classifieds!",
          time: new Date(),
        }],
        errors: [],
      }

    case PUBLIC_CLASSIFIEDS_REQUEST_ERROR:
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
