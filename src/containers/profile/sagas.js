import { call, put, takeLatest, all } from 'redux-saga/effects'
import Axios from 'axios'

import {
  PROFILE_REQUESTING, 
  PUBLIC_PROFILE_REQUESTING,
  FEATURED_PROFILES_REQUESTING,
  NEW_PROFILES_REQUESTING,
  BASIC_PROFILE_REQUESTING,
  DELETE_CONNECTION_REQUESTING,
  PROFILE_FILE_UPLOAD_REQUEST,
  PROFILE_FILE_DELETE_REQUEST,
} from './constants'

import { UNREAD_MESSAGES_REQUESTING } from '../messages/constants'

import {
  profileRequestSuccess,
  profileRequestError,

  publicProfileRequestSuccess,
  publicProfileRequestError,

  featuredProfilesRequestSuccess,
  featuredProfilesRequestError,

  newProfilesRequestSuccess,
  newProfilesRequestError,

  basicProfileRequestSuccess,

  deleteConnectionRequestSuccess,
  deleteConnectionRequestError,

  profileFileUploadRequestSuccess,
  profileFileUploadRequestError,

  profileFileDeleteRequestSuccess,
  profileFileDeleteRequestError
} from './actions'

/** Requesting Profiles */

const getProfileUrl = `${process.env.REACT_APP_API_URL}/accounts/profile_by_id/`

function profileRequestApi (client, profile) {
  console.log('%c profileRequestApi!!!:', 'color: lime; font-weight: bold; font-style: italic; text-decoration: underline;')
  console.log({ client, profile })
  return Axios({
    url: getProfileUrl,
    method: 'post',
    headers: { Authorization: "Bearer " + client.token || undefined },
    data: { basic: !!profile }
    // data: { basic: false }
  })
  .then(response => response.data)
  .then(json => json)
}

function* profileRequestFlow (action) {
  try {
    const { client, profile } = action

    if (profile === "basic") {
      const retrievedBasicProfile = yield call(profileRequestApi, client, profile)
      yield put(basicProfileRequestSuccess(retrievedBasicProfile))
    }
    else if (!!profile) {
      const retrievedPublicProfile = yield call(publicProfileRequestApi, client, profile)
      yield put(publicProfileRequestSuccess(retrievedPublicProfile))
    }
    else
    {
      const retrievedProfile = yield call(profileRequestApi, client, profile)
      yield put(profileRequestSuccess(retrievedProfile))
    }
  } catch (error) {
    yield put(profileRequestError(error))
  } finally {
    const { client } = action
    yield put({ type: UNREAD_MESSAGES_REQUESTING, client })
  }
}

/** Requesting Public Profiles By Slug */

const getPublicProfileUrl = `${process.env.REACT_APP_API_URL}/accounts/profile_by_slug/`

function publicProfileRequestApi(client, profile) {
  console.log('%c getPublicProfileUrl!!!:', 'color: red; font-weight: bold; font-style: italic; text-decoration: underline;')
  return Axios({
    url: getPublicProfileUrl,
    method: 'get',
    headers: client.token ? { Authorization: "Bearer " + client.token } : undefined,
    params: {
      slug: profile
    }
  })
  .then(response => response.data)
  .then(json => json)
}

function* publicProfileRequestFlow(action) {
  try {
    const { client, profile } = action
    const retrievedPublicProfile = yield call(publicProfileRequestApi, client, profile)

    yield put(publicProfileRequestSuccess(retrievedPublicProfile))
  } catch (error) {
    yield put(publicProfileRequestError(error))
  }
}

/** Get Featured Profiles for Homepage */

const getPopularProfilesUrl = `${process.env.REACT_APP_API_URL}/search/featured_profiles/?size=3`

function featuredProfilesRequestApi() {
  return Axios({
    url: getPopularProfilesUrl,
    method: 'get',
  })
    .then(response => response.data)
    .then(json => json)
}

function* featuredProfilesRequestFlow(action) {
  try {
    const featuredProfiles = yield call(featuredProfilesRequestApi)

    yield put(featuredProfilesRequestSuccess(featuredProfiles))
  } catch (error) {
    yield put(featuredProfilesRequestError(error))
  }
}

/** Get New Profiles for Homepage */

const getFeaturedProfilesUrl = `${process.env.REACT_APP_API_URL}/search/featured_profiles/?size=4&partner=true`

function newProfilesRequestApi() {
  return Axios({
    url: getFeaturedProfilesUrl,
    method: 'get',
  })
    .then(response => response.data)
    .then(json => json)
}

function* newProfilesRequestFlow(action) {
  try {
    const newProfiles = yield call(newProfilesRequestApi)

    yield put(newProfilesRequestSuccess(newProfiles))
  } catch (error) {
    yield put(newProfilesRequestError(error))
  }
}

const deleteConnectionUrl = `${process.env.REACT_APP_API_URL}/accounts/connection/`

function deleteConnectionsApi (client, connection_id) {
  return Axios({
    url: deleteConnectionUrl + connection_id + '/',
    method: 'delete',
    headers: { Authorization: "Bearer " + client.token || undefined }
  })
  .then(response => response.data)
  .then(json => json)
}

function* deleteConnectionRequestFlow(action) {
  const { client, connection_id } = action
  try {
    yield call(deleteConnectionsApi, client, connection_id)

    yield put(deleteConnectionRequestSuccess(connection_id))
  } catch (error) {
    yield put(deleteConnectionRequestError(error))
  }
}

export const uploadFileUrl = `${process.env.REACT_APP_API_URL}/files/file`

function uploadFileApi(client, data) {
  const formData = new FormData()
  formData.append('public', true)
  formData.append('file_data', data.file)

  return Axios({
    url: uploadFileUrl,
    method: 'post',
    headers: {
      Authorization: "Bearer " + client.token || undefined,
      'Content-Type': 'multipart/form-data'
    },
    data: formData,
  })
  .then(response => response.data)
  .then(json => json)
}

function* uploadFileFlow(action) {
  try {
    const { client, data } = action

    const responseArray = []

    yield* data.files.map(function* (file) {
      const response = yield call(uploadFileApi, client, { file })
      responseArray.push(response)
    })

    yield all(responseArray)

    yield put(profileFileUploadRequestSuccess({response: responseArray}))
  } catch (error) {
    yield put(profileFileUploadRequestError(error))
  }
}

export const deleteFileUrl = `${process.env.REACT_APP_API_URL}/files/file/`

function deleteFileApi(client, file_id) {
  return Axios({
    url: deleteFileUrl + file_id,
    method: 'delete',
    headers: { Authorization: "Bearer " + client.token || undefined }
  })
    .then(response => response.data)
    .then(json => json)
}

function* deleteFileRequestFlow(action) {
  const {
    client,
    data: {
      file_id
    }
  } = action
  try {
    yield call(deleteFileApi, client, file_id)

    yield put(profileFileDeleteRequestSuccess({file_id}))
  } catch (error) {
    yield put(profileFileDeleteRequestError(error))
  }
}

function* profileWatcher() {
  yield [
    takeLatest(PROFILE_REQUESTING, profileRequestFlow),
    takeLatest(BASIC_PROFILE_REQUESTING, profileRequestFlow),
    takeLatest(PUBLIC_PROFILE_REQUESTING, publicProfileRequestFlow),
    takeLatest(FEATURED_PROFILES_REQUESTING, featuredProfilesRequestFlow),
    takeLatest(NEW_PROFILES_REQUESTING, newProfilesRequestFlow),
    takeLatest(DELETE_CONNECTION_REQUESTING, deleteConnectionRequestFlow),
    //takeLatest(PROFILE_FILE_FETCH_REQUEST, fetchFilesFlow),
    takeLatest(PROFILE_FILE_UPLOAD_REQUEST, uploadFileFlow),
    takeLatest(PROFILE_FILE_DELETE_REQUEST, deleteFileRequestFlow),
  ]
}

export default profileWatcher