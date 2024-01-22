import {
  SIGNUP_REQUESTING,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,

  CLEAR_SIGNUP_STATE,

  RESEND_CONFIRMATION_REQUESTING,
  RESEND_CONFIRMATION_SUCCESS,
  RESEND_CONFIRMATION_ERROR,

  CLEAR_RESEND_NOTIFICATION
} from './constants'

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
  notify: ""
}

const reducer = function signupReducer (state = initialState, action) {
  switch (action.type) {
    case SIGNUP_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [{ body: 'Signing up...', time: new Date() }],
        errors: [],
      }

    case SIGNUP_SUCCESS:
      return {
        ...state,
        errors: [],
        messages: [{
          body: `Successfully created account!`,
          time: new Date(),
        }],
        requesting: false,
        successful: true,
        lastSignupUser: action.response && action.response.data && action.response.data.onf_users
                        ? { email: action.response.data.onf_users[0].email, account_id: action.response.data.onf_users[0].account }
                        : undefined,
      }

    case SIGNUP_ERROR:
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

    case CLEAR_SIGNUP_STATE:
      return {
        ...state,
        messages: [],
        requesting: false,
        successful: false,
      }

    case RESEND_CONFIRMATION_REQUESTING:
      return {
        ...state,
        messages: [{ body: 'Resending email to ' + state.lastSignupUser.email + ', ' + state.lastSignupUser.account_id, time: new Date() }],
        requesting: true,
        successful: false,
      }

    case RESEND_CONFIRMATION_SUCCESS:
      return {
        ...state,
        messages: [{ body: 'Successfully resent the email', time: new Date() }],
        requesting: false,
        successful: true,
        notify: "We sent you another email!"
      }

    case RESEND_CONFIRMATION_ERROR:
      return {
        ...state,
        messages: [],
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
        requesting: false,
        successful: false,
        notify: action.error.toString()
      }

    case CLEAR_RESEND_NOTIFICATION:
      return {
        ...state,
        notify: "",
      }

    default:
      return state
  }
}

export default reducer
