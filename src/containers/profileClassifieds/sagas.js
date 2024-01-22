import { call, put, takeLatest } from 'redux-saga/effects'
import Axios from 'axios'

import {
  PROFILE_CLASSIFIEDS_REQUESTING, 
  PUBLIC_CLASSIFIEDS_REQUESTING,
} from './constants'

import {
  profileClassifiedsRequestSuccess,
  profileClassifiedsRequestError,

  publicClassifiedsRequestSuccess,
  publicClassifiedsRequestError,
} from './actions'

const getProfileClassifiedsUrl = `${process.env.REACT_APP_API_URL}/accounts/classifieds_list/`

/** Requesting Profile Classifieds */

function profileClassifiedsRequestApi (client, id) {
  return Axios({
    url: getProfileClassifiedsUrl,
    method: 'get',
    headers: client.token ? { Authorization: "Bearer " + client.token } : undefined,
    params: {
      profile_id: id || client.account_id,
    }
  })
  .then(response => response.data)
  .then(json => json)
}

function* profileClassifiedsRequestFlow (action) {
  try {
    const { client, id } = action
    
    const profileClassifieds = yield call(profileClassifiedsRequestApi, client, id)

    yield put(profileClassifiedsRequestSuccess(profileClassifieds))
  } catch (error) {
    yield put(profileClassifiedsRequestError(error))
  }
}

/** Requesting Public Classifieds */

function publicClassifiedsRequestApi() {
  return Axios({
    url: getProfileClassifiedsUrl,
    method: 'get'
  })
    .then(response => response.data)
    .then(json => json)
}

function* publicClassifiedsRequestFlow(action) {
  try {
    const publicClassifieds = yield call(publicClassifiedsRequestApi)

    yield put(publicClassifiedsRequestSuccess(publicClassifieds))
  } catch (error) {
    yield put(publicClassifiedsRequestError(error))
  }
}


function* profileClassifiedsWatcher() {
  yield [
    takeLatest(PROFILE_CLASSIFIEDS_REQUESTING, profileClassifiedsRequestFlow),
    takeLatest(PUBLIC_CLASSIFIEDS_REQUESTING, publicClassifiedsRequestFlow),
  ]
}

export default profileClassifiedsWatcher