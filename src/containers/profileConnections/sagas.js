import { call, put, takeLatest } from 'redux-saga/effects'
import Axios from 'axios'

import {
  PROFILE_CONNECTIONS_REQUESTING, 
} from './constants'

import {
  profileConnectionsRequestSuccess,
  profileConnectionsRequestError,

} from './actions'

const getprofileConnectionsUrl = `${process.env.REACT_APP_API_URL}/accounts/connected_profiles/`

/** Requesting Profile Connections */

function profileConnectionsRequestApi (client, slug = '') {
  return Axios({
    url: getprofileConnectionsUrl + slug + '/',
    method: 'get',
    headers: client.token ? { Authorization: "Bearer " + client.token } : undefined,
  })
  .then(response => response.data)
  .then(json => json)
}

function* profileConnectionsRequestFlow (action) {
  try {
    const { client, slug } = action
    
    const profileConnections = yield call(profileConnectionsRequestApi, client, slug)

    yield put(profileConnectionsRequestSuccess(profileConnections))
  } catch (error) {
    yield put(profileConnectionsRequestError(error))
  }
}

function* profileConnectionsWatcher() {
  yield [
    takeLatest(PROFILE_CONNECTIONS_REQUESTING, profileConnectionsRequestFlow),
  ]
}

export default profileConnectionsWatcher