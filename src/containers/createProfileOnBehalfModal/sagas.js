import { call, put, takeLatest } from 'redux-saga/effects'  // redux-saga’s delay effect is the problem.
import { delay } from 'redux-saga'  // redux-saga’s delay effect is the problem.
import Axios from 'axios'

import {
  CREATING_PROFILE_ON_BEHALF,
  CREATING_PROFILE_ON_BEHALF_SUCCESS,
  CREATING_PROFILE_ON_BEHALF_ERROR,
  CLEAR_CREATE_PROFILE_ON_BEHALF_NOTIFICATION
} from './constants'

/* Create Classified */

const signupUrl = `${process.env.REACT_APP_API_URL}/accounts/signup/`

function createProfileOnBehalfApi (client, email, first_name, last_name, business_name, roles) {
  return Axios({
    url: signupUrl,
    method: 'post',
    headers: { Authorization: "Bearer " + client.token || undefined },
    data: {
      email,
      first_name,
      last_name,
      business_name,
      roles,
      on_behalf: true
    }
  })
  .then(response => response)
  .then(json => json)
  .catch(function (error) {
    throw(Error((error.response && error.response.data.message) || "Unknown Error"))
  })
}

function* createProfileOnBehalfFlow(action) {
  try {
    const { client, email, first_name, last_name, business_name, roles } = action
    const response = yield call(createProfileOnBehalfApi, client, email, first_name, last_name, business_name, roles)

    yield put({ type: CREATING_PROFILE_ON_BEHALF_SUCCESS, response })

    yield call(delay, 4000)
    yield put({ type: CLEAR_CREATE_PROFILE_ON_BEHALF_NOTIFICATION })
  } catch (error) {
    yield put({ type: CREATING_PROFILE_ON_BEHALF_ERROR, error })
  }
}

function* createProfileOnBehalfWatcher() {
  yield takeLatest(CREATING_PROFILE_ON_BEHALF, createProfileOnBehalfFlow)
}

export default createProfileOnBehalfWatcher
