import {
  ADDRESS_CREATING,
  ADDRESS_CREATE_SUCCESS,
  ADDRESS_CREATE_ERROR,
} from './constants'

export const addressCreate = function addressCreate(client, data) {
  return {
    type: ADDRESS_CREATING,
    client,
    data
  }
}

export const addressCreateSuccess = function addressCreateSuccess(data) {
  return {
    type: ADDRESS_CREATE_SUCCESS,
    data,
  }
}

export const addressCreateError = function addressCreateError(error) {
  return {
    type: ADDRESS_CREATE_ERROR,
    error,
  }
}