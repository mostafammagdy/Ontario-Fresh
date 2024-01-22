import { call, put, takeLatest } from 'redux-saga/effects'
import Axios from 'axios'
import { map, isEmpty } from 'lodash'

import {
  PROFILE_UPDATING,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_ERROR,
  ONLY_UPDATE_ROLES_UPDATING,
  ONLY_UPDATE_ROLES_SUCCESS,
  ONLY_UPDATE_ROLES_ERROR
} from './constants'

import {
  PROFILE_REQUESTING,
  BASIC_PROFILE_REQUESTING
} from '../../containers/profile/constants'

/* Update Profile */

export const updateProfileUrl = `${process.env.REACT_APP_API_URL}/accounts/update_profile/`
const addRole = `${process.env.REACT_APP_API_URL}/accounts/add_role/`
const removeRole = `${process.env.REACT_APP_API_URL}/accounts/remove_role/`

function profileUpdateApi(client, data) {
  let successfulResponse = {}
  return Promise.all(map(data.addRoles, (roleId) => {
    return Axios({
      url: addRole,
      method: 'post',
      headers: { Authorization: "Bearer " + client.token || undefined },
      data: {
        account_id: data.id,
        role: roleId,
      }
    })
  }))
  .then(response => !isEmpty(response) ? Object.assign(successfulResponse, response[0]) : response) //pass along a successful response with a data object
  .then(response => {
    return Promise.all(map(data.removeRoles, (roleId) => {
      return Axios({
        url: removeRole,
        method: 'post',
        headers: { Authorization: "Bearer " + client.token || undefined },
        data: {
          account_id: data.id,
          role: roleId,
        }
      })
    }))
  })
  .then(response => !isEmpty(response) ? Object.assign(successfulResponse, response[0]) : successfulResponse) //pass along a successful response with a data object
  .then(response => {
    return !isEmpty(data.values) ? (Axios({
      url: updateProfileUrl,
      method: 'post',
      headers: { Authorization: "Bearer " + client.token || undefined },
      data: {
        id: data.id,
        details: data.values,
      }
    }))
    :
    successfulResponse
  })
  .then(response => response.data)
  .then(json => json)
}

function* profileUpdateFlow(action) {
  try {
    const { client, data } = action 
    const response = yield call(profileUpdateApi, client, data)

    yield put({ type: PROFILE_UPDATE_SUCCESS, response })
    let profile = response.slug
    yield put({ type: PROFILE_REQUESTING, client, profile })
  } catch (error) {
    yield put({ type: PROFILE_UPDATE_ERROR, error })
  }
}

function* rolesUpdateFlow(action) {
  try {
    const { client, data } = action
    const response = yield call(profileUpdateApi, client, data)

    yield put({ type: ONLY_UPDATE_ROLES_SUCCESS, response })
    let profile = 'basic'
    yield put({ type: BASIC_PROFILE_REQUESTING, client, profile })
  } catch (error) {
    yield put({ type: ONLY_UPDATE_ROLES_ERROR, error })
  }
}

function* editProfileItemsWatcher() {
  yield takeLatest(PROFILE_UPDATING, profileUpdateFlow)
  yield takeLatest(ONLY_UPDATE_ROLES_UPDATING, rolesUpdateFlow)
}

export default editProfileItemsWatcher