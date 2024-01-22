import {
  CLASSIFIED_UPDATING,
  CLASSIFIED_UPDATE_SUCCESS,
  CLASSIFIED_UPDATE_ERROR,

  CLASSIFIED_DELETING,
  CLASSIFIED_DELETE_SUCCESS,
  CLASSIFIED_DELETE_ERROR,

} from './constants'

export const classifiedUpdate = function classifiedUpdate(client, data) {
  return {
    type: CLASSIFIED_UPDATING,
    client,
    data
  }
}

export const classifiedUpdateSuccess = function classifiedUpdateSuccess(data) {
  return {
    type: CLASSIFIED_UPDATE_SUCCESS,
    data,
  }
}

export const classifiedUpdateError = function classifiedUpdateError(error) {
  return {
    type: CLASSIFIED_UPDATE_ERROR,
    error,
  }
}

export const classifiedDelete = function classifiedDelete(client, data) {
  return {
    type: CLASSIFIED_DELETING,
    client,
    data
  }
}

export const classifiedDeleteSuccess = function classifiedDeleteSuccess(data) {
  return {
    type: CLASSIFIED_DELETE_SUCCESS,
    data,
  }
}

export const classifiedDeleteError = function classifiedDeleteError(error) {
  return {
    type: CLASSIFIED_DELETE_ERROR,
    error,
  }
}