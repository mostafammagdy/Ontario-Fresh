import {
  GET_PARTICIPANT_SUGGESTIONS,
  GET_PARTICIPANT_SUGGESTIONS_SUCCESS,
  GET_PARTICIPANT_SUGGESTIONS_ERROR
} from './constants'

const initialState = {
  requesting: false,
  successful: false,
  suggestions: [],
  errors: [],
}

const reducer = function editProductsComponentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PARTICIPANT_SUGGESTIONS:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [{
          body: "Requesting participant suggestions",
          time: new Date(),
        }],
        errors: [],
      }

    case GET_PARTICIPANT_SUGGESTIONS_SUCCESS:
      return {
        ...state,
        requesting: false,
        successful: true,
        suggestions: action.data,
        messages: [{
          body: "Received participant suggestions",
          time: new Date(),
        }],
        errors: [],
      }

    case GET_PARTICIPANT_SUGGESTIONS_ERROR:
      return {
        requesting: false,
        successful: false,
        messages: [{
          body: "Product participant failed",
          time: new Date(),
        }],
        errors: [],
      }

    default:
      return state
  }
}

export default reducer
