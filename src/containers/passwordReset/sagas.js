import { call, put, takeLatest } from 'redux-saga/effects'  // redux-saga’s delay effect is the problem.
import { delay } from 'redux-saga'  // redux-saga’s delay effect is the problem.
import Axios from 'axios'
import { browserHistory } from 'react-router'

import {
  PASSWORD_RESET_REQUESTING,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_ERROR,

  SET_NEW_PASSWORD,
  SET_NEW_PASSWORD_SUCCESS,
  SET_NEW_PASSWORD_ERROR,

  CLEAR_PASSWORD_RESET_NOTIFICATIONS,
  CLEAR_SUCCESS_STATE,
} from './constants'

const passwordResetUrl = `${process.env.REACT_APP_API_URL}/accounts/password_reset/`

function passwordResetApi (data) {
  return Axios.post(passwordResetUrl, {
    email: data.email,
  })
  .then(response => response)
  .then(json => json)
  .catch(function (error) {
    throw(Error((error.response && error.response.data.message) || "Unknown Error"))
  })
}

function* passwordResetFlow (action) {
  try {
    const { data } = action
    const response = yield call(passwordResetApi, data)

    yield put({ type: PASSWORD_RESET_SUCCESS, response })
    yield call(delay, 4000)
    yield put({ type: CLEAR_PASSWORD_RESET_NOTIFICATIONS })
  } catch (error) {
    yield put({ type: PASSWORD_RESET_ERROR, error })
  }
}

const setPasswordUrl = `${process.env.REACT_APP_API_URL}/accounts/set_new_password/`

function setPasswordApi(password, token) {
  return Axios.post(setPasswordUrl, {
    password,
    token,
  })
    .then(response => response)
    .then(json => json)
    .catch(function (error) {
      throw (Error((error.response && error.response.data.message) || "Unknown Error"))
    })
}

function* setPasswordFlow(action) {
  try {
    const { password, token } = action
    const response = yield call(setPasswordApi, password, token)

    yield put({ type: SET_NEW_PASSWORD_SUCCESS, response })
    yield call(delay, 4000)
    yield put({ type: CLEAR_PASSWORD_RESET_NOTIFICATIONS })
    yield put({ type: CLEAR_SUCCESS_STATE })
    browserHistory.push('/login')
  } catch (error) {
    yield put({ type: SET_NEW_PASSWORD_ERROR, error })
  }
}

function* passwordResetWatcher () {
  yield takeLatest(PASSWORD_RESET_REQUESTING, passwordResetFlow)
  yield takeLatest(SET_NEW_PASSWORD, setPasswordFlow)
}

export default passwordResetWatcher
