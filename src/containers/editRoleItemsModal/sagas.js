import { call, put, takeLatest } from 'redux-saga/effects'
import Axios from 'axios'

import {
  ROLE_UPDATING,
  ROLE_UPDATE_SUCCESS,
  ROLE_UPDATE_ERROR,
} from './constants'

import {
 PROFILE_REQUESTING
} from '../../containers/profile/constants'

/* Update Role */

const updateRoleUrl = `${process.env.REACT_APP_API_URL}/accounts/update_role/`

function roleUpdateApi(client, data) {
  return Axios({
    url: updateRoleUrl,
    method: 'post',
    headers: { Authorization: "Bearer " + client.token || undefined },
    data: {
      id: data.id,
      details: {...data.values, edited: true},
    }
  })
    .then(response => response.data)
    .then(json => json)
}

function* roleUpdateFlow(action) {
  try {
    const { client, data } = action 
    const response = yield call(roleUpdateApi, client, data)

    yield put({ type: ROLE_UPDATE_SUCCESS, response })
    let profile = response.slug
    yield put({ type: PROFILE_REQUESTING, client, profile })
  } catch (error) {
    yield put({ type: ROLE_UPDATE_ERROR, error })
  }
}

function* editRoleItemsWatcher() {
  yield takeLatest(ROLE_UPDATING, roleUpdateFlow)
}

export default editRoleItemsWatcher
