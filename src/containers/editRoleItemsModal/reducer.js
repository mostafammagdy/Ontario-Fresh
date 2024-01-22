import {
  ROLE_UPDATING,
  ROLE_UPDATE_SUCCESS,
  ROLE_UPDATE_ERROR,
} from './constants'

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
}

const reducer = function editRoleItemsReducer (state = initialState, action) {
  switch (action.type) {

    case ROLE_UPDATING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [{
          body: "Role being updated",
          time: new Date(),
        }],
        errors: [],
      }

    case ROLE_UPDATE_SUCCESS:
      return {
        requesting: false,
        successful: true,
        messages: [{
          body: "Successfully updated Role!",
          time: new Date(),
        }],
        errors: [],
      }

    case ROLE_UPDATE_ERROR:
      return {
        requesting: false,
        successful: false,
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
