import { takeLatest, fork, call, put } from 'redux-saga/effects'  // redux-saga’s delay effect is the problem.
import { delay } from 'redux-saga'  // redux-saga’s delay effect is the problem.
import { browserHistory } from 'react-router'
import Axios from 'axios'

import {
  ACTIVATE_ACCOUNT_REQUESTING,
  ACTIVATE_ACCOUNT_SUCCESS,
  ACTIVATE_ACCOUNT_ERROR,
} from './constants'

const activateAccountUrl = `${process.env.REACT_APP_API_URL}/accounts/activate_account/`

function activateAccountApi(token) {
  return Axios.post(activateAccountUrl, {
    token: token,
  })
    .then(response => response)
    .then(json => json)
    .catch(function (error) {
      throw (Error((error.response && error.response.data.message) || "Unknown Error"))
    })
}

function* activateAccountFlow (action) {
  try {
    const { token } = action
    yield call(activateAccountApi, token)
    
    yield put ({ type: ACTIVATE_ACCOUNT_SUCCESS })
    yield call(delay, 2000)
    browserHistory.push('/login')
  } catch (error) {
    yield put ({ type: ACTIVATE_ACCOUNT_ERROR, error })
  }
}

function* activateAccountWatcher () {
  yield fork(takeLatest, ACTIVATE_ACCOUNT_REQUESTING, activateAccountFlow)
}

export default activateAccountWatcher