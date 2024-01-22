import { call, put, takeLatest } from 'redux-saga/effects'
import Axios from 'axios'

import {
  ADDRESS_UPDATING,
  ADDRESS_UPDATE_SUCCESS,
  ADDRESS_UPDATE_ERROR,

  ADDRESS_DELETING,
  ADDRESS_DELETE_SUCCESS,
  ADDRESS_DELETE_ERROR,
} from './constants'

import {
  PROFILE_REQUESTING,
} from '../../containers/profile/constants'

/* Update Address */

const updateAddressUrl = `${process.env.REACT_APP_API_URL}/accounts/update_address/`

function updateAddressApi(client, data) {

  return Axios({
    url: updateAddressUrl,
    method: 'post',
    headers: {
      Authorization: "Bearer " + client.token || undefined,
    },
    data: {
      id: data.address_id,
      description: data.values.description,
      address_1: data.values.address_1,
      address_2: data.values.address_2,
      city: data.values.city,
      province: data.values.province,
      country: data.values.country,
      postal_code: data.values.postal_code,
      phone: data.values.phone,
    }
  })
    .then(response => response.data)
    .then(json => json)
}

function* updateAddressFlow(action) {
  try {
    const { client, data } = action
    const response = yield call(updateAddressApi, client, data)

    yield put({ type: ADDRESS_UPDATE_SUCCESS, response })
    let profile = response.slug
    yield put({ type: PROFILE_REQUESTING, client, profile })
  } catch (error) {
    yield put({ type: ADDRESS_UPDATE_ERROR, error })
  }
}

/* Delete Address */

const deleteAddressUrl = `${process.env.REACT_APP_API_URL}/accounts/delete_address/`

function deleteContactApi(client, data) {

  return Axios({
    url: deleteAddressUrl,
    method: 'post',
    headers: {
      Authorization: "Bearer " + client.token || undefined,
    },
    data: {
      id: data.address_id,
    }
  })
    .then(response => response.data)
    .then(json => json)
}

function* deleteAddressFlow(action) {
  try {
    const { client, data } = action
    const response = yield call(deleteContactApi, client, data)

    yield put({ type: ADDRESS_DELETE_SUCCESS, response })
    let profile = response.slug
    yield put({ type: PROFILE_REQUESTING, client, profile })
  } catch (error) {
    yield put({ type: ADDRESS_DELETE_ERROR, error })
  }
}

function* manageContactsWatcher() {
  yield takeLatest(ADDRESS_UPDATING, updateAddressFlow)
  yield takeLatest(ADDRESS_DELETING, deleteAddressFlow)
}

export default manageContactsWatcher