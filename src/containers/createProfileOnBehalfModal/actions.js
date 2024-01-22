import {
  CREATING_PROFILE_ON_BEHALF,
  CREATING_PROFILE_ON_BEHALF_SUCCESS,
  CREATING_PROFILE_ON_BEHALF_ERROR,
  OPEN_CREATING_PROFILE_ON_BEHALF_MODAL,
  CLOSE_CREATING_PROFILE_ON_BEHALF_MODAL
} from './constants'

export const createAProfileOnBehalf = function createAProfileOnBehalf(client, data) {
  return {
    type: CREATING_PROFILE_ON_BEHALF,
    client,
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    business_name: data.business_name,
    roles: data.roles,
  }
}

export const createAProfileOnBehalfSuccess = function createAProfileOnBehalf(data) {
  return {
    type: CREATING_PROFILE_ON_BEHALF_SUCCESS,
    data,
  }
}

export const createAProfileOnBehalfError = function createAProfileOnBehalfError(error) {
  return {
    type: CREATING_PROFILE_ON_BEHALF_ERROR,
    error,
  }
}

export const openCreateAProfileOnBehalfModal = function openCreateAProfileOnBehalfModal() {
  return {
    type: OPEN_CREATING_PROFILE_ON_BEHALF_MODAL
  }
}

export const closeCreateAProfileOnBehalfModal = function closeCreateAProfileOnBehalfModal() {
  return {
    type: CLOSE_CREATING_PROFILE_ON_BEHALF_MODAL
  }
}
