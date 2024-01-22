import {
  PROFILE_REQUESTING,
  PROFILE_REQUEST_SUCCESS,
  PROFILE_REQUEST_ERROR,

  BASIC_PROFILE_REQUESTING,
  BASIC_PROFILE_REQUEST_SUCCESS,
  BASIC_PROFILE_REQUEST_ERROR,

  PUBLIC_PROFILE_REQUESTING,
  PUBLIC_PROFILE_REQUEST_SUCCESS,
  PUBLIC_PROFILE_REQUEST_ERROR,

  FEATURED_PROFILES_REQUESTING,
  FEATURED_PROFILES_REQUEST_SUCCESS,
  FEATURED_PROFILES_REQUEST_ERROR,

  NEW_PROFILES_REQUESTING,
  NEW_PROFILES_REQUEST_SUCCESS,
  NEW_PROFILES_REQUEST_ERROR,

  DELETE_CONNECTION_REQUESTING,
  DELETE_CONNECTION_REQUEST_SUCCESS,
  DELETE_CONNECTION_REQUEST_ERROR,

  PROFILE_FILE_UPLOAD_REQUEST,
  PROFILE_FILE_UPLOAD_REQUEST_SUCCESS,
  PROFILE_FILE_UPLOAD_REQUEST_ERROR,

  PROFILE_FILE_DELETE_REQUEST,
  PROFILE_FILE_DELETE_REQUEST_SUCCESS,
  PROFILE_FILE_DELETE_REQUEST_ERROR,
} from './constants'

export const profileRequest = function profileRequest (client, profile) {
  console.log('%c NOTE: profileWatcher() in sagas.js watches for any object that is returned with PROFILE_REQUESTING as its type property, and if it’s triggered, it runs the corresponding profileRequestFlow() function.', 'font-style: italic;')
  return {
    type: PROFILE_REQUESTING,
    client,
    profile
  }
}

export const profileRequestSuccess = function profileRequestSuccess (profile) {
  return {
    type: PROFILE_REQUEST_SUCCESS,
    profile,
  }
}

export const profileRequestError = function profileRequestError (error) {
  return {
    type: PROFILE_REQUEST_ERROR,
    error,
  }
}

export const basicProfileRequest = function basicProfileRequest(client, profile = "basic") {
  return {
    type: BASIC_PROFILE_REQUESTING,
    client,
    profile
  }
}

export const basicProfileRequestSuccess = function basicProfileRequestSuccess(profile) {
  return {
    type: BASIC_PROFILE_REQUEST_SUCCESS,
    profile,
  }
}

export const basicProfileRequestError = function basicProfileRequestError(error) {
  return {
    type: BASIC_PROFILE_REQUEST_ERROR,
    error,
  }
}

export const publicProfileRequest = function publicProfileRequest(client, profile) {
  return {
    type: PUBLIC_PROFILE_REQUESTING,
    client,
    profile
  }
}

export const publicProfileRequestSuccess = function publicProfileRequestSuccess(profile) {
  return {
    type: PUBLIC_PROFILE_REQUEST_SUCCESS,
    profile,
  }
}

export const publicProfileRequestError = function publicProfileRequestError(error) {
  return {
    type: PUBLIC_PROFILE_REQUEST_ERROR,
    error,
  }
}

export const featuredProfilesRequest = function featuredProfilesRequest () {
  return {
    type: FEATURED_PROFILES_REQUESTING,
  }
}

export const featuredProfilesRequestSuccess = function featuredProfilesRequestSuccess (featured) {
  return {
    type: FEATURED_PROFILES_REQUEST_SUCCESS,
    featured,
  }
}

export const featuredProfilesRequestError = function featuredProfilesRequestError (error) {
  return {
    type: FEATURED_PROFILES_REQUEST_ERROR,
    error,
  }
}

export const newProfilesRequest = function () {
  return {
    type: NEW_PROFILES_REQUESTING,
  }
}

export const newProfilesRequestSuccess = function (data) {
  return {
    type: NEW_PROFILES_REQUEST_SUCCESS,
    data,
  }
}

export const newProfilesRequestError = function (error) {
  return {
    type: NEW_PROFILES_REQUEST_ERROR,
    error,
  }
}

export const deleteConnectionRequest = function deleteConnectionRequest (client, connection_id) {
  return {
    type: DELETE_CONNECTION_REQUESTING,
    client,
    connection_id
  }
}

export const deleteConnectionRequestSuccess = function deleteConnectionRequestSuccess (connection_id) {
  return {
    type: DELETE_CONNECTION_REQUEST_SUCCESS,
    connection_id
  }
}

export const deleteConnectionRequestError = function deleteConnectionRequestError (error) {
  return {
    type: DELETE_CONNECTION_REQUEST_ERROR,
    error
  }
}

export const profileFileUploadRequest = function (client, data) {
  return {
    type: PROFILE_FILE_UPLOAD_REQUEST,
    client,
    data
  }
}

export const profileFileUploadRequestSuccess = function (data) {
  return {
    type: PROFILE_FILE_UPLOAD_REQUEST_SUCCESS,
    data
  }
}

export const profileFileUploadRequestError = function (error) {
  return {
    type: PROFILE_FILE_UPLOAD_REQUEST_ERROR,
    error
  }
}

export const profileFileDeleteRequest = function (client, data) {
  return {
    type: PROFILE_FILE_DELETE_REQUEST,
    client,
    data
  }
}

export const profileFileDeleteRequestSuccess = function (data) {
  return {
    type: PROFILE_FILE_DELETE_REQUEST_SUCCESS,
    data
  }
}

export const profileFileDeleteRequestError = function (error) {
  return {
    type: PROFILE_FILE_DELETE_REQUEST_ERROR,
    error
  }
}
