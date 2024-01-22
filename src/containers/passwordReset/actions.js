import {
  PASSWORD_RESET_REQUESTING,
  SET_NEW_PASSWORD,
 } from './constants'

export const passwordResetRequest = function passwordResetRequest (data) {
  return {
    type: PASSWORD_RESET_REQUESTING,
    data,
  }
}

export const setNewPassword = function setNewPassword (password, token) {
  return {
    type: SET_NEW_PASSWORD,
    password,
    token,
  }
}
