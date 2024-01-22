import {
  PASSWORD_RESET_REQUESTING,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_ERROR,

  SET_NEW_PASSWORD,
  SET_NEW_PASSWORD_SUCCESS,
  SET_NEW_PASSWORD_ERROR,

  CLEAR_PASSWORD_RESET_NOTIFICATIONS,
  CLEAR_SUCCESS_STATE
} from './constants'

const initialState = {
  emailNotify: false,
  passwordSetNotify: false,
  requesting: false,
  successful: false,
  resetSuccessful: false,
  messages: [],
  errors: [],
}

const reducer = function passwordResetReducer (state = initialState, action) {
  switch (action.type) {
    case PASSWORD_RESET_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [{ body: 'Sending password reset email...', time: new Date() }],
        errors: [],
      }

    case PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        errors: [],
        messages: [{
          body: `Successfully sent password reset request!`,
          time: new Date(),
        }],
        requesting: false,
        successful: true,
        emailNotify: true,
      }

    case PASSWORD_RESET_ERROR:
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

    case SET_NEW_PASSWORD:
      return {
        ...state,
        requesting: true,
        successful: false,
        resetSuccessful: false,
        messages: [{ body: 'Sending new password...', time: new Date() }],
        errors: [],
      }

    case SET_NEW_PASSWORD_SUCCESS:
      return {
        ...state,
        errors: [],
        messages: [{
          body: `Successfully set new password!`,
          time: new Date(),
        }],
        requesting: false,
        successful: true,
        resetSuccessful: true,
        passwordSetNotify: true,
      }

    case SET_NEW_PASSWORD_ERROR:
      return {
        ...state,
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
        messages: [],
        requesting: false,
        successful: false,
        resetSuccessful: false,
      }

    case CLEAR_PASSWORD_RESET_NOTIFICATIONS:
      return {
        ...state,
        emailNotify: false,
        passwordSetNotify: false,
      }

    case CLEAR_SUCCESS_STATE:
      return {
        ...state,
        resetSuccessful: false,
        successful: false,
      }

    default:
      return state
  }
}

export default reducer
