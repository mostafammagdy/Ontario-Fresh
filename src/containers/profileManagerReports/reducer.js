import {
  MANAGED_PROFILE_REPORTS_REQUESTING,
  MANAGED_PROFILE_REPORTS_REQUEST_SUCCESS,
  MANAGED_PROFILE_REPORTS_REQUEST_ERROR,
} from './constants'

const initialState = {
  profiles: {},
  send_request: {},
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
  businessTypes: null,
  categoriesByBusinessType: null
}

const reducer = function profileManagerReducer (state = initialState, action) {
  switch (action.type) {

    case MANAGED_PROFILE_REPORTS_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [{ body: 'Getting managed profiles reports...', time: new Date() }],
        errors: [],
      }

    case MANAGED_PROFILE_REPORTS_REQUEST_SUCCESS:
      return {
        ...state,
        businessTypes: action.response.businessTypes,
        categoriesByBusinessType: action.response.categoriesByBusinessType,
        availableBusinessTypes: action.response.availableBusinessTypes,
        errors: [],
        messages: [],
        requesting: false,
        successful: true,
      }

    case MANAGED_PROFILE_REPORTS_REQUEST_ERROR:
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

    default:
      return state
  }
}

export default reducer
