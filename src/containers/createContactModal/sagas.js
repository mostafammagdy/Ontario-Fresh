import { call, put, takeLatest } from 'redux-saga/effects'
import Axios from 'axios'

import {
  CONTACT_CREATING,
  CONTACT_CREATE_SUCCESS,
  CONTACT_CREATE_ERROR,
} from './constants'

import {
  PROFILE_REQUESTING,
} from '../../containers/profile/constants'

/* Create Contact */

const createContactUrl = `${process.env.REACT_APP_API_URL}/accounts/create_contact/`

function createContactApi(client, data) {

  return Axios({
    url: createContactUrl,
    method: 'post',
    headers: {
      Authorization: "Bearer " + client.token || undefined,
    },
    data: {
      profile_id: data.id,
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

function* createContactFlow(action) {
  try {
    const { client, data } = action
    const response = yield call(createContactApi, client, data)

    yield put({ type: CONTACT_CREATE_SUCCESS, response })
    let profile = response.slug
    yield put({ type: PROFILE_REQUESTING, client, profile })
  } catch (error) {
    yield put({ type: CONTACT_CREATE_ERROR, error })
  }
}

function* manageContactsWatcher() {
  yield takeLatest(CONTACT_CREATING, createContactFlow)
}

export default manageContactsWatcher