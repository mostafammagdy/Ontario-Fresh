import { HIJACK_REQUESTING, HIJACK_ERROR, HIJACK_SUCCESS } from './constants'

export const hijackRequest = function hijackRequest(client, id) {
  return {
    type: HIJACK_REQUESTING,
    client,
    id,
  }
}

export const hijackRequestSuccess = function hijackRequestSuccess(data) {
  return {
    type: HIJACK_SUCCESS,
    data,
  }
}

export const hijackRequestError = function hijackRequestError(error) {
  return {
    type: HIJACK_ERROR,
    error,
  }
}
