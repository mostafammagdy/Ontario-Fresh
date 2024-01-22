import { fork, call, put, takeLatest } from 'redux-saga/effects'
import Axios from 'axios'
import { sortBy } from 'lodash'

import {
  MANAGED_PROFILES_REQUESTING,
  MANAGED_PROFILES_REQUEST_SUCCESS,
  MANAGED_PROFILES_REQUEST_ERROR,

  CONNECTION_REQUEST_SENDING,
  CONNECTION_REQUEST_SEND_SUCCESS,
  CONNECTION_REQUEST_SEND_ERROR,
} from './constants'

const getManagedProfilesUrl = `${process.env.REACT_APP_API_URL}/accounts/managed_profiles/`

function getActivityFeedApi(client) {
  return Axios({
    url: getManagedProfilesUrl,
    method: 'get',
    headers: { Authorization: "Bearer " + client.token || undefined },
  })
  .then(response => response.data)
  .then(json => Object.assign(json, {results: sortBy(json.results, ['business_name'])}))
}

function* getActivityFeedFlow(action) {
  try {
    const { client } = action
    const response = yield call(getActivityFeedApi, client)

    yield put({ type: MANAGED_PROFILES_REQUEST_SUCCESS, response })
  } catch (error) {
    yield put({ type: MANAGED_PROFILES_REQUEST_ERROR, error })
  }
}

const sendConnectionRequestUrl = `${process.env.REACT_APP_API_URL}/accounts/request_connection/`

function sendConnectionRequestApi(client, data) {
  return Axios({
    url: sendConnectionRequestUrl,
    method: 'post',
    headers: { Authorization: "Bearer " + client.token || undefined },
    data: {
      recipient: data.id,
      manage: data.manage,
    }
  })
    .then(response => response.data)
    .then(json => json)
}

function* sendConnectionRequestFlow(action) {
  try {
    const { client, data } = action
    const response = yield call(sendConnectionRequestApi, client, data)

    yield put({ type: CONNECTION_REQUEST_SEND_SUCCESS, response })
  } catch (error) {
    yield put({ type: CONNECTION_REQUEST_SEND_ERROR, error })
  }
}


function* profileManagerWatcher() {
  yield fork(takeLatest, MANAGED_PROFILES_REQUESTING, getActivityFeedFlow)
  yield fork(takeLatest, CONNECTION_REQUEST_SENDING, sendConnectionRequestFlow)
}

export default profileManagerWatcher
