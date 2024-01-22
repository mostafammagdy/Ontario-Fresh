import { call, put, takeLatest } from 'redux-saga/effects'
import Axios from 'axios'

import {
  CLASSIFIED_UPDATING,
  CLASSIFIED_UPDATE_SUCCESS,
  CLASSIFIED_UPDATE_ERROR,

  CLASSIFIED_DELETING,
  CLASSIFIED_DELETE_SUCCESS,
  CLASSIFIED_DELETE_ERROR,
} from './constants'

import {
  PROFILE_CLASSIFIEDS_REQUESTING,
} from '../../containers/profileClassifieds/constants'

/* Update Classified */

const updateClassifiedUrl = `${process.env.REACT_APP_API_URL}/accounts/update_classified/`

function updateClassifiedApi(client, data) {

  const formData = new FormData()
  formData.append('classified_id', data.classified_id)
  formData.append('title', data.values.title)
  formData.append('description', data.values.description)
  formData.append('needed_by', data.values.needed_by)
  formData.append('looking_for', data.values.looking_for)
  formData.append('category', data.values.category)
  formData.append('picture', data.file)

  return Axios({
    url: updateClassifiedUrl,
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

function* updateClassifiedFlow(action) {
  try {
    const { client, data } = action
    const response = yield call(updateClassifiedApi, client, data)
    const id = data.id

    yield put({ type: CLASSIFIED_UPDATE_SUCCESS, response })
    yield put({ type: PROFILE_CLASSIFIEDS_REQUESTING, client, id })
  } catch (error) {
    yield put({ type: CLASSIFIED_UPDATE_ERROR, error })
  }
}

/* Delete Classified */

const deleteClassifiedUrl = `${process.env.REACT_APP_API_URL}/accounts/delete_classified/`

function deleteClassifiedApi(client, data) {

  return Axios({
    url: deleteClassifiedUrl,
    method: 'post',
    headers: {
      Authorization: "Bearer " + client.token || undefined,
    },
    data: {
      classified_id: data.classified_id,
    }
  })
    .then(response => response.data)
    .then(json => json)
}

function* deleteClassifiedFlow(action) {
  try {
    const { client, data } = action
    const response = yield call(deleteClassifiedApi, client, data)
    const id = data.id

    yield put({ type: CLASSIFIED_DELETE_SUCCESS, response })
    yield put({ type: PROFILE_CLASSIFIEDS_REQUESTING, client, id })
  } catch (error) {
    yield put({ type: CLASSIFIED_DELETE_ERROR, error })
  }
}

function* manageClassifiedsWatcher() {
  yield takeLatest(CLASSIFIED_UPDATING, updateClassifiedFlow)
  yield takeLatest(CLASSIFIED_DELETING, deleteClassifiedFlow)
}

export default manageClassifiedsWatcher