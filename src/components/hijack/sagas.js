import { fork, call, put, takeLatest } from 'redux-saga/effects'  // redux-saga’s delay effect is the problem.
import { delay } from 'redux-saga'  // redux-saga’s delay effect is the problem.
import { browserHistory } from 'react-router'
import Axios from 'axios'

import { setClient } from '../../utils/client/actions';

import { HIJACK_REQUESTING, HIJACK_ERROR, HIJACK_SUCCESS } from './constants'

import jwt_decode from 'jwt-decode'

import {
  BASIC_PROFILE_REQUESTING
} from '../../containers/profile/constants'

function* hijackFlow(action) {
  try {
    const { client, id } = action
    const response = yield call((client, id) => Axios({
      url: `${process.env.REACT_APP_API_URL}/accounts/hijack/${id}`,
      method: 'get'
    }).then(response => response.data), client, id)
    const rawToken = JSON.stringify(response)
    yield put(setClient(rawToken))
    localStorage.setItem('jwt', rawToken)
    yield put({ type: HIJACK_SUCCESS, response })

    const decoded = jwt_decode(rawToken)
    const newClient = {
      username: decoded.username,
      user_id: decoded.user_id,
      email: decoded.email,
      exp: decoded.exp,
      account_id: decoded.account_id,
      token: response.token,
    }

    yield put({ type: BASIC_PROFILE_REQUESTING, client: newClient, profile: 'basic' })
    yield call(delay, 1500)
    browserHistory.replace('/profile')
  } catch (error) {
    yield put({ type: HIJACK_ERROR, error })
  }
}

function* hijackComponentWatcher() {
  yield fork(takeLatest, HIJACK_REQUESTING, hijackFlow)
}

export default hijackComponentWatcher
