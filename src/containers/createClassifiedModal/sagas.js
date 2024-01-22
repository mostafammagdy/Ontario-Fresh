import { call, put, takeLatest } from 'redux-saga/effects'  // redux-saga’s delay effect is the problem.
import { delay } from 'redux-saga'  // redux-saga’s delay effect is the problem.
import Axios from 'axios'

import {
  CLASSIFIED_CREATING,
  CLASSIFIED_CREATE_SUCCESS,
  CLASSIFIED_CREATE_ERROR,
  CLEAR_CREATE_CLASSIFIED_NOTIFICATION
} from './constants'

import {
  PUBLIC_CLASSIFIEDS_REQUESTING,
  PROFILE_CLASSIFIEDS_REQUESTING,
} from '../../containers/profileClassifieds/constants'

/* Create Classified */

const createClassifiedUrl = `${process.env.REACT_APP_API_URL}/accounts/create_classified/`

function createClassifiedApi(client, data) {
  const formData = new FormData();
  formData.append('profile_id', data.id);
  formData.append('title', data.values.title);
  formData.append('description', data.values.description);
  formData.append('needed_by', data.values.needed_by);
  formData.append('looking_for', data.looking_for);
  formData.append('category', data.values.category);
  formData.append('picture', data.file);

  return Axios({
    url: createClassifiedUrl,
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

function* createClassifiedFlow(action) {
  try {
    const { client, data, fetchPublicClassifieds } = action
    const response = yield call(createClassifiedApi, client, data)

    let id = data.id

    yield put({ type: CLASSIFIED_CREATE_SUCCESS, response })

    if (fetchPublicClassifieds) {
      yield put({ type: PUBLIC_CLASSIFIEDS_REQUESTING, client, id })
    }
    else {
      yield put({ type: PROFILE_CLASSIFIEDS_REQUESTING, client, id})
    }

    yield call(delay, 4000)
    yield put({ type: CLEAR_CREATE_CLASSIFIED_NOTIFICATION })
  } catch (error) {
    yield put({ type: CLASSIFIED_CREATE_ERROR, error })
  }
}

function* createClassifiedWatcher() {
  yield takeLatest(CLASSIFIED_CREATING, createClassifiedFlow)
}

export default createClassifiedWatcher
