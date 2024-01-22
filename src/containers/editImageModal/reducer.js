import {
  PROFILE_IMAGE_UPDATING,
  PROFILE_IMAGE_UPDATE_SUCCESS,
  PROFILE_IMAGE_UPDATE_ERROR,
} from './constants'

const initialState = {
  requesting: false,
  successful: false,
  editing: false,
  messages: [],
  errors: [],
}

const reducer = function editImageReducer (state = initialState, action) {
  switch (action.type) {
    case PROFILE_IMAGE_UPDATING:
      return {
        ...state,
        requesting: true,
        successful: false,
        editing: false,
        messages: [{
          body: "Profile Image being updated",
          time: new Date(),
        }],
        errors: [],
      }

    case PROFILE_IMAGE_UPDATE_SUCCESS:
      return {
        requesting: false,
        successful: true,
        editing: false,
        messages: [{
          body: "Successfully updated Profile Image!",
          time: new Date(),
        }],
        errors: [],
      }

    case PROFILE_IMAGE_UPDATE_ERROR:
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
