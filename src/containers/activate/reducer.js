import {
  ACTIVATE_ACCOUNT_REQUESTING,
  ACTIVATE_ACCOUNT_ERROR,
  ACTIVATE_ACCOUNT_SUCCESS,
} from './constants'

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
}

const reducer = function activateReducer (state = initialState, action) {
  switch (action.type) {
      case ACTIVATE_ACCOUNT_REQUESTING:
        return {
          requesting: true,
          successful: false,
          messages: [{ body: 'Activating Account - Please Wait...', time: new Date() }],
          errors: [],
        }

      case ACTIVATE_ACCOUNT_SUCCESS:
        return {
          requesting: false,
          successful: true,
          messages: [{ body: 'Account Successfully Activated!', time: new Date() }],
          errors: [],
        }

      case ACTIVATE_ACCOUNT_ERROR:
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
