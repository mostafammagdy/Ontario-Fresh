import { takeLatest, fork, call, put } from 'redux-saga/effects'  // redux-saga’s delay effect is the problem.
import { delay } from 'redux-saga'  // redux-saga’s delay effect is the problem.
import { browserHistory } from 'react-router'
import Axios from 'axios'

import {
  CLAIM_PROFILE_REQUESTING,
  CLAIM_PROFILE_SUCCESS,
  CLAIM_PROFILE_ERROR,
} from './constants'

const activateAccountAndSetPasswordUrl = `${process.env.REACT_APP_API_URL}/accounts/activate_account_and_set_password/`

function activateAccountAndSetPasswordApi(act_token, pw_token, password, email_consent) {
  return Axios.post(activateAccountAndSetPasswordUrl, {
    act_token,
    pw_token,
    password,
    email_consent
  })
    .then(response => response)
    .then(json => json)
    .catch(function (error) {
      throw (Error((error.response && error.response.data.message) || "Unknown Error"))
    })
}

function* claimProfileFlow (action) {
  try {
    const { act_token, pw_token, password, email_consent } = action
    yield call(activateAccountAndSetPasswordApi, act_token, pw_token, password, email_consent)
    
    yield put ({ type: CLAIM_PROFILE_SUCCESS })
    yield call(delay, 2000)
    browserHistory.push('/login')
  } catch (error) {
    yield put ({ type: CLAIM_PROFILE_ERROR, error })
  }
}

function* claimProfileWatcher () {
  yield fork(takeLatest, CLAIM_PROFILE_REQUESTING, claimProfileFlow)
}

export default claimProfileWatcher