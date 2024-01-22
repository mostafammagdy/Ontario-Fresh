import {
  PROFILE_IMAGE_UPDATING,
  PROFILE_IMAGE_UPDATE_SUCCESS,
  PROFILE_IMAGE_UPDATE_ERROR,

  GALLERY_IMAGE_UPDATING,
  GALLERY_IMAGE_UPDATE_SUCCESS,
  GALLERY_IMAGE_UPDATE_ERROR,

} from './constants'

export const profileImageUpdate = function profileImageUpdate(client, data) {
  return {
    type: PROFILE_IMAGE_UPDATING,
    client,
    data
  }
}

export const profileImageUpdateSuccess = function profileImageUpdateSuccess(data) {
  return {
    type: PROFILE_IMAGE_UPDATE_SUCCESS,
    data,
  }
}

export const profileImageUpdateError = function profileImageUpdateError(error) {
  return {
    type: PROFILE_IMAGE_UPDATE_ERROR,
    error,
  }
}

export const galleryImageUpdate = function galleryImageUpdate(client, data) {
  return {
    type: GALLERY_IMAGE_UPDATING,
    client,
    data
  }
}

export const galleryImageUpdateSuccess = function galleryImageUpdateSuccess(data) {
  return {
    type: GALLERY_IMAGE_UPDATE_SUCCESS,
    data,
  }
}

export const galleryImageUpdateError = function galleryImageUpdateError(error) {
  return {
    type: GALLERY_IMAGE_UPDATE_ERROR,
    error,
  }
}