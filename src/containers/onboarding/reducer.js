import {
  DISMISS_ONBOARDING,
} from './constants'

const initialState = {
  onboarding: true,
}

const reducer = function onboardingReducer (state = initialState, action) {
  switch (action.type) {
    case DISMISS_ONBOARDING:
      return {
        ...state,
        onboarding: false
      }

  default:
    return state
  }
}

export default reducer