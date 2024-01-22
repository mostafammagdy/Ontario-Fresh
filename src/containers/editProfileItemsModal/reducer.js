import {
  PROFILE_UPDATING,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_ERROR,
  ONLY_UPDATE_ROLES_UPDATING,
  ONLY_UPDATE_ROLES_SUCCESS,
  ONLY_UPDATE_ROLES_ERROR
} from './constants'

const initialState = {
  requesting: false,
  successful: false,
  editing: false,
  messages: [],
  errors: [],
}

const reducer = function editProfileItemsReducer (state = initialState, action) {
  switch (action.type) {
    case PROFILE_UPDATING:
      return {
        ...state,
        requesting: true,
        successful: false,
        editing: false,
        messages: [{
          body: "Profile being updated",
          time: new Date(),
        }],
        errors: [],
      }

    case PROFILE_UPDATE_SUCCESS:
      return {
        requesting: false,
        successful: true,
        editing: false,
        messages: [{
          body: "Successfully updated Profile!",
          time: new Date(),
        }],
        errors: [],
      }

    case PROFILE_UPDATE_ERROR:
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

    case ONLY_UPDATE_ROLES_UPDATING:
      return {
        ...state,
        requesting: true,
        successful: false,
        editing: false,
        messages: [{
          body: "Roles being updated",
          time: new Date(),
        }],
        errors: [],
      }

    case ONLY_UPDATE_ROLES_SUCCESS:
      return {
        requesting: false,
        successful: true,
        editing: false,
        messages: [{
          body: "Successfully updated Roles!",
          time: new Date(),
        }],
        errors: [],
      }

    case ONLY_UPDATE_ROLES_ERROR:
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
