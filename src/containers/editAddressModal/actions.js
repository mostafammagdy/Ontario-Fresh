import {
  ADDRESS_UPDATING,
  ADDRESS_UPDATE_SUCCESS,
  ADDRESS_UPDATE_ERROR,

  ADDRESS_DELETING,
  ADDRESS_DELETE_SUCCESS,
  ADDRESS_DELETE_ERROR,

} from './constants'

export const addressUpdate = function addressUpdate(client, data) {
  return {
    type: ADDRESS_UPDATING,
    client,
    data
  }
}

export const addressUpdateSuccess = function addressUpdateSuccess(data) {
  return {
    type: ADDRESS_UPDATE_SUCCESS,
    data,
  }
}

export const addressUpdateError = function addressUpdateError(error) {
  return {
    type: ADDRESS_UPDATE_ERROR,
    error,
  }
}

export const addressDelete = function addressDelete(client, data) {
  return {
    type: ADDRESS_DELETING,
    client,
    data
  }
}

export const addressDeleteSuccess = function addressDeleteSuccess(data) {
  return {
    type: ADDRESS_DELETE_SUCCESS,
    data,
  }
}

export const addressDeleteError = function addressDeleteError(error) {
  return {
    type: ADDRESS_DELETE_ERROR,
    error,
  }
}