import { CLIENT_SET, CLIENT_UNSET, LOGOUT_REQUEST } from './constants'

export function setClient (token) {
  return {
    type: CLIENT_SET,
    token,
  }
}

export function unsetClient () {
  return {
    type: CLIENT_UNSET,
  }
}

export function logoutRequest () {
  return {
    type: LOGOUT_REQUEST,
  }
}