import {
  PROFILE_PHOTOS_REQUESTING,
  PROFILE_PHOTOS_REQUEST_SUCCESS,
  PROFILE_PHOTOS_REQUEST_ERROR,

  PROFILE_PHOTO_DELETING,
  PROFILE_PHOTO_DELETE_SUCCESS,
  PROFILE_PHOTO_DELETE_ERROR,

} from './constants'

export const profilePhotosRequest = function profilePhotosRequest (client, id) {
  return {
    type: PROFILE_PHOTOS_REQUESTING,
    client,
    id
  }
}

export const profilePhotosRequestSuccess = function profilePhotosRequestSuccess (profile) {
  return {
    type: PROFILE_PHOTOS_REQUEST_SUCCESS,
    profile,
  }
}

export const profilePhotosRequestError = function profilePhotosRequestError (error) {
  return {
    type: PROFILE_PHOTOS_REQUEST_ERROR,
    error,
  }
}

export const profilePhotoDelete = function profilePhotoDelete(client, data) {
  return {
    type: PROFILE_PHOTO_DELETING,
    client,
    data
  }
}

export const profilePhotoDeleteSuccess = function profilePhotoDeleteSuccess(profile) {
  return {
    type: PROFILE_PHOTO_DELETE_SUCCESS,
    profile,
  }
}

export const profilePhotoDeleteError = function profilePhotoDeleteError(error) {
  return {
    type: PROFILE_PHOTO_DELETE_ERROR,
    error,
  }
}
