import {
  MESSAGE_ALL,
  MESSAGE_ALL_SUCCESS,
  MESSAGE_ALL_ERROR,

  MESSAGE_ALL_FILE_UPLOAD_REQUEST,
  MESSAGE_ALL_FILE_UPLOAD_SUCCESS,
  MESSAGE_ALL_FILE_UPLOAD_ERROR,
  CLEAR_MESSAGE_ALL_FILE
} from './constants'

export const messageAllCreate = function contactCreate(client, data) {
  return {
    type: MESSAGE_ALL,
    client,
    data
  }
}

export const messageAllCreateSuccess = function contactCreateSuccess(data) {
  return {
    type: MESSAGE_ALL_SUCCESS,
    data,
  }
}

export const messageAllCreateError = function contactCreateError(error) {
  return {
    type: MESSAGE_ALL_ERROR,
    error,
  }
}

export const fileUploadMessageAllRequest = function fileUploadRequest(client, data) {
  return {
    type: MESSAGE_ALL_FILE_UPLOAD_REQUEST,
    client,
    data
  }
}

export const fileUploadMessageAllSuccess = function fileUploadSuccess(data) {
  return {
    type: MESSAGE_ALL_FILE_UPLOAD_SUCCESS,
    data
  }
}

export const fileUploadMessageAllError = function fileUploadError(error) {
  return {
    type: MESSAGE_ALL_FILE_UPLOAD_ERROR,
    error
  }
}

export const clearMessageAllFile = function clearMessageFile() {
  return {
    type: CLEAR_MESSAGE_ALL_FILE
  }
}
