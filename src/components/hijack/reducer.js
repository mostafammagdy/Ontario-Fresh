import { HIJACK_REQUESTING, HIJACK_ERROR, HIJACK_SUCCESS } from './constants'

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
}

const reducer = function searchComponentReducer (state = initialState, action) {
  switch (action.type) {

    case HIJACK_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [
          ...state.messages,
          {
            body: 'Searching with query...',
            time: new Date()
          }
        ],
        errors: state.errors,
      }

    case HIJACK_SUCCESS:
        return {
          ...state,
          errors: state.errors,
          messages: state.messages,
          requesting: false,
          successful: true,
        }

    case HIJACK_ERROR:
        return {
          ...state,
          errors: [
            ...state.errors,
            {
              body: action.error.toString(),
              time: new Date(),
            }
          ],
          messages: state.messages,
          requesting: false,
          successful: false,
        }

    default:
      return state
  }
}

export default reducer
