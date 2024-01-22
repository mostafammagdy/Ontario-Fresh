import {
  DISMISS_ONBOARDING
} from './constants'

export const dismissOnboarding = function dismissOnboarding (client) {
  return {
    type: DISMISS_ONBOARDING,
    client,
  }
}