import {
  CLASSIFIED_CREATING,
  CLASSIFIED_CREATE_SUCCESS,
  CLASSIFIED_CREATE_ERROR,
  CLEAR_CREATE_CLASSIFIED_NOTIFICATION
} from './constants'

export const classifiedCreate = function classifiedCreate(client, data, fetchPublicClassifieds) {
  return {
    type: CLASSIFIED_CREATING,
    client,
    data,
    fetchPublicClassifieds
  }
}

export const classifiedCreateSuccess = function classifiedCreateSuccess(data) {
  return {
    type: CLASSIFIED_CREATE_SUCCESS,
    data,
  }
}

export const classifiedCreateError = function classifiedCreateError(error) {
  return {
    type: CLASSIFIED_CREATE_ERROR,
    error,
  }
}

export const clearSendClassifiedNotification = function clearSendClassifiedNotification() {
  return {
    type: CLEAR_CREATE_CLASSIFIED_NOTIFICATION
  }
}
