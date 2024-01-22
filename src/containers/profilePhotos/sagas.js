import { call, put, takeLatest } from 'redux-saga/effects'
import Axios from 'axios'

import {
  PROFILE_PHOTOS_REQUESTING, 

  PROFILE_PHOTO_DELETING,
  PROFILE_PHOTO_DELETE_SUCCESS,
  PROFILE_PHOTO_DELETE_ERROR,
} from './constants'

import {
  profilePhotosRequestSuccess,
  profilePhotosRequestError,
} from './actions'

/** Requesting Profile Photos */

const getprofilePhotosUrl = `${process.env.REACT_APP_API_URL}/accounts/photo_gallery/`

function profilePhotosRequestApi (client, id) {
  return Axios({
    url: getprofilePhotosUrl,
    method: 'get',
    headers: client.token ? { Authorization: "Bearer " + client.token } : undefined,
    params: {
      profile_id: id || client.account_id,
    }
  })
  .then(response => response.data)
  .then(json => json)
}

function* profilePhotosRequestFlow (action) {
  try {
    const { client, id } = action
    
    const profilePhotos = yield call(profilePhotosRequestApi, client, id)

    yield put(profilePhotosRequestSuccess(profilePhotos))
  } catch (error) {
    yield put(profilePhotosRequestError(error))
  }
}

/** Deleting Gallery Profile Photo */

export const deleteProfileGalleryPhotoUrl = `${process.env.REACT_APP_API_URL}/accounts/delete_photo_gallery/`

function profilePhotoDeleteApi(client, data) {
  return Axios({
    url: deleteProfileGalleryPhotoUrl,
    method: 'post',
    headers: client.token ? { Authorization: "Bearer " + client.token } : undefined,
    data: {
      photo_id: data.photo_id,
    }
  })
    .then(response => response.data)
    .then(json => json)
}

function* profilePhotoDeleteFlow(action) {
  try {
    const { client, data } = action
    const response = yield call(profilePhotoDeleteApi, client, data)
    let id = client.account_id

    yield put({ type: PROFILE_PHOTO_DELETE_SUCCESS, response })
    yield put({ type: PROFILE_PHOTOS_REQUESTING, client, id })
  } catch (error) {
    yield put({ type: PROFILE_PHOTO_DELETE_ERROR, error })
  }
}

function* profilePhotoWatcher() {
  yield [
    takeLatest(PROFILE_PHOTOS_REQUESTING, profilePhotosRequestFlow),
    takeLatest(PROFILE_PHOTO_DELETING, profilePhotoDeleteFlow),
  ]
}

export default profilePhotoWatcher