import {
  CLAIM_PROFILE_REQUESTING,
} from './constants'

export const claimAccountRequest = function claimAccountRequest(act_token, pw_token, password, email_consent) {
  return {
    type: CLAIM_PROFILE_REQUESTING,
    act_token,
    pw_token,
    password,
    email_consent
  }
}
