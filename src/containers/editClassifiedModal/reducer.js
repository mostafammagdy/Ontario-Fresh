import ReactGA from 'react-ga'

import {
  CLASSIFIED_UPDATING,
  CLASSIFIED_UPDATE_SUCCESS,
  CLASSIFIED_UPDATE_ERROR,

  CLASSIFIED_DELETING,
  CLASSIFIED_DELETE_SUCCESS,
  CLASSIFIED_DELETE_ERROR,
} from './constants'

const initialState = {
  requesting: false,
  successful: false,
  editing: false,
  messages: [],
  errors: [],
}

const reducer = function manageClassifiedReducer (state = initialState, action) {
  switch (action.type) {

    case CLASSIFIED_UPDATING:
      return {
        ...state,
        requesting: true,
        successful: false,
        editing: false,
        messages: [{
          body: "Classified being updated",
          time: new Date(),
        }],
        errors: [],
      }

    case CLASSIFIED_UPDATE_SUCCESS:
      if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'development') {
        ReactGA.event({
          category: 'Classifieds',
          action: 'Edited a Classified',
        })
      }

      return {
        requesting: false,
        successful: true,
        editing: false,
        messages: [{
          body: "Successfully updated Classified!",
          time: new Date(),
        }],
        errors: [],
      }

    case CLASSIFIED_UPDATE_ERROR:
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

    case CLASSIFIED_DELETING:
      return {
        ...state,
        requesting: true,
        successful: false,
        editing: false,
        messages: [{
          body: "Classified being deleted",
          time: new Date(),
        }],
        errors: [],
      }

    case CLASSIFIED_DELETE_SUCCESS:
      if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'development') {
        ReactGA.event({
          category: 'Classifieds',
          action: 'Deleted a Classified',
        })
      }

      return {
        requesting: false,
        successful: true,
        editing: false,
        messages: [{
          body: "Successfully deleted Classified!",
          time: new Date(),
        }],
        errors: [],
      }

    case CLASSIFIED_DELETE_ERROR:
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
