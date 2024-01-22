import {
  PROFILE_REQUESTING,
  PROFILE_REQUEST_SUCCESS,
  PROFILE_REQUEST_ERROR,

  MANAGED_PROFILES_REQUESTING,
  MANAGED_PROFILES_REQUEST_SUCCESS,
  MANAGED_PROFILES_REQUEST_ERROR,

  CONNECTION_REQUEST_SENDING,
  CONNECTION_REQUEST_SEND_SUCCESS,
  CONNECTION_REQUEST_SEND_ERROR,
} from './constants'

export const profileRequest = function profileRequest(client, profile) {
  console.log('%c NOTE: profileWatcher() in sagas.js watches for any object that is returned with PROFILE_REQUESTING as its type property, and if it’s triggered, it runs the corresponding profileRequestFlow() function.', 'font-style: italic;')
  return {
    type: PROFILE_REQUESTING,
    client,
    profile
  }
}

export const profileRequestSuccess = function profileRequestSuccess(profile) {
  return {
    type: PROFILE_REQUEST_SUCCESS,
    profile,
  }
}

export const profileRequestError = function profileRequestError(error) {
  return {
    type: PROFILE_REQUEST_ERROR,
    error,
  }
}

export const managedProfilesRequest = function managedProfilesRequest(client) {
  return {
    type: MANAGED_PROFILES_REQUESTING,
    client,
  }
}

export const managedProfilesRequestSuccess = function managedProfilesRequestSuccess(data) {
  return {
    type: MANAGED_PROFILES_REQUEST_SUCCESS,
    data,
  }
}

export const managedProfilesRequestError = function managedProfilesRequestError(error) {
  return {
    type: MANAGED_PROFILES_REQUEST_ERROR,
    error,
  }
}

export const connectionRequest = function connectionRequest(client, data) {
  return {
    type: CONNECTION_REQUEST_SENDING,
    client,
    data,
  }
}

export const connectionRequestSuccess = function connectionRequestSuccess(data) {
  return {
    type: CONNECTION_REQUEST_SEND_SUCCESS,
    data,
  }
}

export const connectionRequestError = function connectionRequestError(error) {
  return {
    type: CONNECTION_REQUEST_SEND_ERROR,
    error,
  }
}