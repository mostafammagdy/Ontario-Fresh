import { call, put, takeLatest } from 'redux-saga/effects'
import Axios from 'axios'

import {
  CONTACT_UPDATING,
  CONTACT_UPDATE_SUCCESS,
  CONTACT_UPDATE_ERROR,

  CONTACT_DELETING,
  CONTACT_DELETE_SUCCESS,
  CONTACT_DELETE_ERROR,
} from './constants'

import {
  PROFILE_REQUESTING,
} from '../../containers/profile/constants'

/* Update Contact */

const updateContactUrl = `${process.env.REACT_APP_API_URL}/accounts/update_contact/`

function updateContactApi(client, data) {

  return Axios({
    url: updateContactUrl,
    method: 'post',
    headers: {
      Authorization: "Bearer " + client.token || undefined,
    },
    data: {
      id: data.contact_id,
      name: data.values.name,
      position: data.values.position,
      phone: data.values.phone,
      fax: data.values.fax,
      cell: data.values.cell,
      email: data.values.email
    }
  })
    .then(response => response.data)
    .then(json => json)
}

function* updateContactFlow(action) {
  try {
    const { client, data } = action
    const response = yield call(updateContactApi, client, data)

    yield put({ type: CONTACT_UPDATE_SUCCESS, response })
    let profile = response.slug
    yield put({ type: PROFILE_REQUESTING, client, profile })
  } catch (error) {
    yield put({ type: CONTACT_UPDATE_ERROR, error })
  }
}

/* Delete Contact */

const deleteContactUrl = `${process.env.REACT_APP_API_URL}/accounts/delete_contact/`

function deleteContactApi(client, data) {

  return Axios({
    url: deleteContactUrl,
    method: 'post',
    headers: {
      Authorization: "Bearer " + client.token || undefined,
    },
    data: {
      id: data.contact_id,
    }
  })
    .then(response => response.data)
    .then(json => json)
}

function* deleteContactFlow(action) {
  try {
    const { client, data } = action
    const response = yield call(deleteContactApi, client, data)

    yield put({ type: CONTACT_DELETE_SUCCESS, response })
    let profile = response.slug
    yield put({ type: PROFILE_REQUESTING, client, profile })
  } catch (error) {
    yield put({ type: CONTACT_DELETE_ERROR, error })
  }
}

function* manageContactsWatcher() {
  yield takeLatest(CONTACT_UPDATING, updateContactFlow)
  yield takeLatest(CONTACT_DELETING, deleteContactFlow)
}

export default manageContactsWatcher