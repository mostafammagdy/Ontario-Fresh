import {
  PROFILE_CLASSIFIEDS_REQUESTING,
  PROFILE_CLASSIFIEDS_REQUEST_SUCCESS,
  PROFILE_CLASSIFIEDS_REQUEST_ERROR,

  PUBLIC_CLASSIFIEDS_REQUESTING,
  PUBLIC_CLASSIFIEDS_REQUEST_SUCCESS,
  PUBLIC_CLASSIFIEDS_REQUEST_ERROR,
} from './constants'

export const profileClassifiedsRequest = function profileClassifiedsRequest (client, id) {
  return {
    type: PROFILE_CLASSIFIEDS_REQUESTING,
    client,
    id
  }
}

export const profileClassifiedsRequestSuccess = function profileClassifiedsRequestSuccess (profile) {
  return {
    type: PROFILE_CLASSIFIEDS_REQUEST_SUCCESS,
    profile,
  }
}

export const profileClassifiedsRequestError = function profileClassifiedsRequestError (error) {
  return {
    type: PROFILE_CLASSIFIEDS_REQUEST_ERROR,
    error,
  }
}

export const publicClassifiedsRequest = function publicClassifiedsRequest () {
  return {
    type: PUBLIC_CLASSIFIEDS_REQUESTING,
  }
}

export const publicClassifiedsRequestSuccess = function publicClassifiedsRequestSuccess(classifieds) {
  return {
    type: PUBLIC_CLASSIFIEDS_REQUEST_SUCCESS,
    classifieds,
  }
}

export const publicClassifiedsRequestError = function publicClassifiedsRequestError(error) {
  return {
    type: PUBLIC_CLASSIFIEDS_REQUEST_ERROR,
    error,
  }
}


