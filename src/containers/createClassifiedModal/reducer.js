import ReactGA from 'react-ga'

import {
  CLASSIFIED_CREATING,
  CLASSIFIED_CREATE_SUCCESS,
  CLASSIFIED_CREATE_ERROR,
  CLEAR_CREATE_CLASSIFIED_NOTIFICATION
} from './constants'

const initialState = {
  requesting: false,
  successful: false,
  editing: false,
  notify: false,
  messages: [],
  errors: [],
}

const reducer = function createClssifiedReducer (state = initialState, action) {
  switch (action.type) {

    case CLASSIFIED_CREATING:
      return {
        ...state,
        requesting: true,
        successful: false,
        editing: false,
        notify: false,
        messages: [{
          body: "Classified being created",
          time: new Date(),
        }],
        errors: [],
      }

    case CLASSIFIED_CREATE_SUCCESS:
      if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'development') {
        ReactGA.event({
          category: 'Classifieds',
          action: 'Created a Classified',
          label: action.response.looking_for ? 'Buying' : 'Selling',
        })
      }

      return {
        requesting: false,
        successful: true,
        editing: false,
        notify: true,
        messages: [{
          body: "Successfully created Classified!",
          time: new Date(),
        }],
        errors: [],
      }

    case CLASSIFIED_CREATE_ERROR:
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

    case CLEAR_CREATE_CLASSIFIED_NOTIFICATION:
      return {
        ...state,
        notify: false,
      }

    default:
      return state
  }
}

export default reducer
