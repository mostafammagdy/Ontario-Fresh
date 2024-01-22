import {
  CONTACT_UPDATING,
  CONTACT_UPDATE_SUCCESS,
  CONTACT_UPDATE_ERROR,

  CONTACT_DELETING,
  CONTACT_DELETE_SUCCESS,
  CONTACT_DELETE_ERROR,

} from './constants'

export const contactUpdate = function contactUpdate(client, data) {
  return {
    type: CONTACT_UPDATING,
    client,
    data
  }
}

export const contactUpdateSuccess = function contactUpdateSuccess(data) {
  return {
    type: CONTACT_UPDATE_SUCCESS,
    data,
  }
}

export const contactUpdateError = function contactUpdateError(error) {
  return {
    type: CONTACT_UPDATE_ERROR,
    error,
  }
}

export const contactDelete = function contactDelete(client, data) {
  return {
    type: CONTACT_DELETING,
    client,
    data
  }
}

export const contactDeleteSuccess = function contactDeleteSuccess(data) {
  return {
    type: CONTACT_DELETE_SUCCESS,
    data,
  }
}

export const contactDeleteError = function contactDeleteError(error) {
  return {
    type: CONTACT_DELETE_ERROR,
    error,
  }
}