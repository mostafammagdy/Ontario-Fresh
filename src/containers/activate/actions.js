import {
  ACTIVATE_ACCOUNT_REQUESTING,
} from './constants'

export const activateAccountRequest = function activateAccountRequest(token) {
  return {
    type: ACTIVATE_ACCOUNT_REQUESTING,
    token,
  }
}
