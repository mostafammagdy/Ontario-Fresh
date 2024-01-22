import { call, put, takeLatest } from 'redux-saga/effects'
import Axios from 'axios'

import {
  ADDRESS_CREATING,
  ADDRESS_CREATE_SUCCESS,
  ADDRESS_CREATE_ERROR,
} from './constants'

import {
  PROFILE_REQUESTING,
} from '../../containers/profile/constants'

/* Create Address */

const createAddressUrl = `${process.env.REACT_APP_API_URL}/accounts/create_address/`

function createAddressApi(client, data) {

  return Axios({
    url: createAddressUrl,
    method: 'post',
    headers: {
      Authorization: "Bearer " + client.token || undefined,
    },
    data: {
      profile_id: data.id,
      description: data.values.description,
      address_1: data.values.address_1,
      address_2: data.values.address_2,
      city: data.values.city,
      province: data.values.province || "Ontario",
      country: data.values.country || "Canada",
      postal_code: data.values.postal_code,
      phone: data.values.phone,
    }
  })
    .then(response => response.data)
    .then(json => json)
}

function* createAddressFlow(action) {
  try {
    const { client, data } = action
    const response = yield call(createAddressApi, client, data)

    yield put({ type: ADDRESS_CREATE_SUCCESS, response })
    let profile = response.slug
    yield put({ type: PROFILE_REQUESTING, client, profile })
  } catch (error) {
    yield put({ type: ADDRESS_CREATE_ERROR, error })
  }
}

function* manageAddresssWatcher() {
  yield takeLatest(ADDRESS_CREATING, createAddressFlow)
}

export default manageAddresssWatcher