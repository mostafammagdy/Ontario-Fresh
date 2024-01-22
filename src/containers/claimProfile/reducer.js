import {
  CLAIM_PROFILE_REQUESTING,
  CLAIM_PROFILE_ERROR,
  CLAIM_PROFILE_SUCCESS,
} from './constants'

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
}

const reducer = function activateReducer (state = initialState, action) {
  switch (action.type) {
      case CLAIM_PROFILE_REQUESTING:
        return {
          requesting: true,
          successful: false,
          messages: [{ body: 'Claiming Profile - Please Wait...', time: new Date() }],
          errors: [],
        }

      case CLAIM_PROFILE_SUCCESS:
        return {
          requesting: false,
          successful: true,
          messages: [{ body: 'Profile Successfully Claimed!', time: new Date() }],
          errors: [],
        }

      case CLAIM_PROFILE_ERROR:
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
