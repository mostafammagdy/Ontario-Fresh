import {
  CONTACT_CREATING,
  CONTACT_CREATE_SUCCESS,
  CONTACT_CREATE_ERROR,
} from './constants'

export const contactCreate = function contactCreate(client, data) {
  return {
    type: CONTACT_CREATING,
    client,
    data
  }
}

export const contactCreateSuccess = function contactCreateSuccess(data) {
  return {
    type: CONTACT_CREATE_SUCCESS,
    data,
  }
}

export const contactCreateError = function contactCreateError(error) {
  return {
    type: CONTACT_CREATE_ERROR,
    error,
  }
}