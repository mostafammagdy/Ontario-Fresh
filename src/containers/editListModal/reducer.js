import {
  SAFETY_STANDARDS_UPDATING,
  SAFETY_STANDARDS_UPDATE_SUCCESS,
  SAFETY_STANDARDS_UPDATE_ERROR,

  CLASSIFICATIONS_UPDATING,
  CLASSIFICATIONS_UPDATE_SUCCESS,
  CLASSIFICATIONS_UPDATE_ERROR,

  PROCESSING_TYPES_UPDATING,
  PROCESSING_TYPES_UPDATE_SUCCESS,
  PROCESSING_TYPES_UPDATE_ERROR,

  MARKET_TYPES_UPDATING,
  MARKET_TYPES_UPDATE_SUCCESS,
  MARKET_TYPES_UPDATE_ERROR,

  SERVICES_UPDATING,
  SERVICES_UPDATE_SUCCESS,
  SERVICES_UPDATE_ERROR,
} from './constants'

const initialState = {
  requesting: false,
  successful: false,
  editing: false,
  messages: [],
  errors: [],
}

const reducer = function editListReducer (state = initialState, action) {
  switch (action.type) {
    case SAFETY_STANDARDS_UPDATING:
      return {
        ...state,
        requesting: true,
        successful: false,
        editing: false,
        messages: [{
          body: "Safety Standards being updated",
          time: new Date(),
        }],
        errors: [],
      }

    case SAFETY_STANDARDS_UPDATE_SUCCESS:
      return {
        requesting: false,
        successful: true,
        editing: false,
        messages: [{
          body: "Successfully updated Safety Standards!",
          time: new Date(),
        }],
        errors: [],
      }

    case SAFETY_STANDARDS_UPDATE_ERROR:
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

    case CLASSIFICATIONS_UPDATING:
      return {
        ...state,
        requesting: true,
        successful: false,
        editing: false,
        messages: [{
          body: "Classifications being updated",
          time: new Date(),
        }],
        errors: [],
      }

    case CLASSIFICATIONS_UPDATE_SUCCESS:
      return {
        requesting: false,
        successful: true,
        editing: false,
        messages: [{
          body: "Successfully updated Classifications!",
          time: new Date(),
        }],
        errors: [],
      }

    case CLASSIFICATIONS_UPDATE_ERROR:
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

    case PROCESSING_TYPES_UPDATING:
      return {
        ...state,
        requesting: true,
        successful: false,
        editing: false,
        messages: [{
          body: "Processing Types being updated",
          time: new Date(),
        }],
        errors: [],
      }

    case PROCESSING_TYPES_UPDATE_SUCCESS:
      return {
        requesting: false,
        successful: true,
        editing: false,
        messages: [{
          body: "Successfully updated Processing Types!",
          time: new Date(),
        }],
        errors: [],
      }

    case PROCESSING_TYPES_UPDATE_ERROR:
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

    case MARKET_TYPES_UPDATING:
      return {
        ...state,
        requesting: true,
        successful: false,
        editing: false,
        messages: [{
          body: "Market Types being updated",
          time: new Date(),
        }],
        errors: [],
      }

    case MARKET_TYPES_UPDATE_SUCCESS:
      return {
        requesting: false,
        successful: true,
        editing: false,
        messages: [{
          body: "Successfully updated Market Types!",
          time: new Date(),
        }],
        errors: [],
      }

    case MARKET_TYPES_UPDATE_ERROR:
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

    case SERVICES_UPDATING:
      return {
        ...state,
        requesting: true,
        successful: false,
        editing: false,
        messages: [{
          body: "Services being updated",
          time: new Date(),
        }],
        errors: [],
      }

    case SERVICES_UPDATE_SUCCESS:
      return {
        requesting: false,
        successful: true,
        editing: false,
        messages: [{
          body: "Successfully updated Services!",
          time: new Date(),
        }],
        errors: [],
      }

    case SERVICES_UPDATE_ERROR:
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
