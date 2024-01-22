import { call, put, takeLatest, fork } from 'redux-saga/effects'
import Axios from 'axios'

import {
  PROFILE_IMAGE_UPDATING,
  PROFILE_IMAGE_UPDATE_SUCCESS,
  PROFILE_IMAGE_UPDATE_ERROR,

  GALLERY_IMAGE_UPDATING,
  GALLERY_IMAGE_UPDATE_SUCCESS,
  GALLERY_IMAGE_UPDATE_ERROR,
} from './constants'

import {
  PROFILE_REQUESTING,
} from '../../containers/profile/constants'

import {
  PROFILE_PHOTOS_REQUESTING,
} from '../../containers/profilePhotos/constants'

/* Update Profile Image */

export const updateProfileImageUrl = `${process.env.REACT_APP_API_URL}/accounts/set_photo/`

export function profileImageUpdateApi(client, data) {
  
  const formData = new FormData()
  formData.append('profile_id', data.id)
  formData.append('picture', data.file)

  /*
  console.log('%c profileImageUpdateApi post object:', 'color: brown; font-weight: bold;')
  console.log({ set_photo: {
    url: updateProfileImageUrl,
    method: 'post',
    headers: { 
      'Authorization': 'Bearer ' + client.token || undefined,
      'Content-Type': 'multipart/form-data'
   },
   data: formData,
  } })
  */

  /*
  NOTE: This is the original code that is currently up on production: 
  */

  return Axios({
    url: updateProfileImageUrl,
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + client.token || undefined,
      'Content-Type': 'multipart/form-data'
    },
    data: formData,
  })
    .then(response => response.data)
    .then(json => json)

  /*

  NOTE: This block is Adem’s attempt:

  const headers = { 
      'Authorization': 'Bearer ' + client.token || undefined,
      'Content-Type': 'application/json'
    };

  return Axios.post(updateProfileImageUrl, formData, { headers })
        .then(response => response.data)
        .then(json => json)
        .catch(error => {
            this.setState({ errorMessage: error.message });
            console.error('There was an error!', error);
        });
  */

}

function* profileImageUpdateFlow(action) {
  try {
    const { client, data } = action 
    const response = yield call(profileImageUpdateApi, client, data)

    yield put({ type: PROFILE_IMAGE_UPDATE_SUCCESS, response})
    let profile = response.slug
    yield put({ type: PROFILE_REQUESTING, client, profile })
  } catch (error) {
    yield put({ type: PROFILE_IMAGE_UPDATE_ERROR, error })
  }
}

/* Update Gallery Photo */

export const updateGalleryImageUrl = `${process.env.REACT_APP_API_URL}/accounts/add_photo_gallery/`

function galleryImageUpdateApi(client, data) {

  const formData = new FormData()
  formData.append('profile_id', data.id)
  formData.append('picture', data.file)

  /*
  NOTE: This is the Axios POST to the database for the updating of gallery images.
  */

  return Axios({
    url: updateGalleryImageUrl,
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + client.token || undefined,
      'Content-Type': 'multipart/form-data'
    },
    data: formData,
  })
    .then(response => response.data)
    .then(json => json)
}

function* galleryImageUpdateFlow(action) {
  try {
    const { client, data } = action
    const response = yield call(galleryImageUpdateApi, client, data)
    let id = data.id || client.account_id

    yield put({ type: GALLERY_IMAGE_UPDATE_SUCCESS, response })
    yield put({ type: PROFILE_PHOTOS_REQUESTING, client, id })
  } catch (error) {
    yield put({ type: GALLERY_IMAGE_UPDATE_ERROR, error })
  }
}

function* editImageWatcher() {
  yield fork(takeLatest, PROFILE_IMAGE_UPDATING, profileImageUpdateFlow)
  yield fork(takeLatest, GALLERY_IMAGE_UPDATING, galleryImageUpdateFlow)

}

export default editImageWatcher
