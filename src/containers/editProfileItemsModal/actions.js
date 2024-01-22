import {
  PROFILE_UPDATING,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_ERROR,
  ONLY_UPDATE_ROLES_UPDATING,
  ONLY_UPDATE_ROLES_SUCCESS,
  ONLY_UPDATE_ROLES_ERROR
} from './constants'

export const profileUpdate = function profileUpdate(client, data) {
  return {
    type: PROFILE_UPDATING,
    client,
    data
  }
}

export const profileUpdateSuccess = function profileUpdateSuccess(data) {
  return {
    type: PROFILE_UPDATE_SUCCESS,
    data,
  }
}

export const profileUpdateError = function profileUpdateError(error) {
  return {
    type: PROFILE_UPDATE_ERROR,
    error,
  }
}

export const rolesUpdate = function rolesUpdate(client, data) {
  return {
    type: ONLY_UPDATE_ROLES_UPDATING,
    client,
    data
  }
}

export const rolesUpdateSuccess = function rolesUpdateSuccess(data) {
  return {
    type: ONLY_UPDATE_ROLES_SUCCESS,
    data,
  }
}

export const rolesUpdateError = function rolesUpdateError(error) {
  return {
    type: ONLY_UPDATE_ROLES_ERROR,
    error,
  }
}
