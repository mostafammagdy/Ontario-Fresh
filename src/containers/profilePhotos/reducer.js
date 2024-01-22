import {
  PROFILE_PHOTOS_REQUESTING,
  PROFILE_PHOTOS_REQUEST_SUCCESS,
  PROFILE_PHOTOS_REQUEST_ERROR,

  PROFILE_PHOTO_DELETING,
  PROFILE_PHOTO_DELETE_SUCCESS,
  PROFILE_PHOTO_DELETE_ERROR,

} from './constants'

const initialState = {
  current: {},
  requesting: false,
  successful: false,
  editing: false,
  messages: [],
  errors: [],
}

const reducer = function profilePhotosReducer (state = initialState, action) {
  switch (action.type) {
    case PROFILE_PHOTOS_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        editing: false,
        messages: [{
          body: "Profile photo gallery being requested",
          time: new Date(),
        }],
        errors: [],
      }

    case PROFILE_PHOTOS_REQUEST_SUCCESS:
      return {
        current: action.profile,
        requesting: false,
        successful: true,
        editing: false,
        messages: [{
          body: "Successfully retreieved profile photo gallery!",
          time: new Date(),
        }],
        errors: [],
      }
    
    case PROFILE_PHOTOS_REQUEST_ERROR:
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

    case PROFILE_PHOTO_DELETING:
      return {
        ...state,
        requesting: true,
        successful: false,
        editing: false,
        messages: [{
          body: "Profile photo gallery item deleting",
          time: new Date(),
        }],
        errors: [],
      }

    case PROFILE_PHOTO_DELETE_SUCCESS:
      return {
        ...state,
        requesting: false,
        successful: true,
        editing: false,
        messages: [{
          body: "Successfully deleted photo gallery item",
          time: new Date(),
        }],
        errors: [],
      }

    case PROFILE_PHOTO_DELETE_ERROR:
      return {
        ...state,
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
