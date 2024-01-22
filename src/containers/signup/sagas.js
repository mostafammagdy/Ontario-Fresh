import { call, put, takeLatest } from 'redux-saga/effects'  // redux-saga’s delay effect is the problem.
import { delay } from 'redux-saga'  // redux-saga’s delay effect is the problem.
import { browserHistory } from 'react-router'
import Axios from 'axios'

import {
  SIGNUP_REQUESTING,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  CLEAR_SIGNUP_STATE,
  RESEND_CONFIRMATION_REQUESTING,
  RESEND_CONFIRMATION_SUCCESS,
  RESEND_CONFIRMATION_ERROR,
  CLEAR_RESEND_NOTIFICATION
} from './constants'

const signupUrl = `${process.env.REACT_APP_API_URL}/accounts/signup/`

function signupApi (email, password, first_name, last_name, title, business_name, roles, email_consent) {
  console.log('%c signupApi will now post the action object assembled in signupFlow to the signup endpoint.', 'color: black; font-style: italic;')
  return Axios.post(signupUrl, {
    email: email,
    password: password,
    first_name: first_name,
    last_name: last_name,
    business_name: business_name,
    title: title,
    roles: roles,
    email_consent: email_consent,
  })
  .then(response => response)
  .then(json => json)
  .catch(function (error) {
    throw(Error((error.response && error.response.data.message) || "Unknown Error"))
  })
}

function* signupFlow (action) {
  console.log('%c signupFlow action:', 'color: blue; font-weight: bold;')
  console.log({ action })
  try {
    const { email, password, first_name, last_name, title, business_name, roles, email_consent } = action
    const response = yield call(signupApi, email, password, first_name, last_name, title, business_name, roles, email_consent)

    yield put({ type: SIGNUP_SUCCESS, response })
    browserHistory.push('/confirm') // redirect to confirm page
    yield call(delay, 2000)
    yield put({ type: CLEAR_SIGNUP_STATE })
  } catch (error) {
    yield put({ type: SIGNUP_ERROR, error })
  }
}

const resendConfirmationUrl = `${process.env.REACT_APP_API_URL}/accounts/resend_verification/`

function resendConfirmationApi(account_id) {
  return Axios.post(resendConfirmationUrl, {
    account_id
  })
  .then(response => response)
  .then(json => json)
  .catch(function (error) {
    throw Error((error.response && error.response.data && error.response.data[0]) || "Unknown Error")
  })
}

function* resendConfirmationFlow(action) {
  try {
    const { account_id } = action
    const response = yield call(resendConfirmationApi, account_id)

    yield put({ type: RESEND_CONFIRMATION_SUCCESS, response })
  } catch (error) {
    yield put({ type: RESEND_CONFIRMATION_ERROR, error })
  }
  yield call(delay, 2000)
  yield put({ type: CLEAR_RESEND_NOTIFICATION })
}

function* signupWatcher () {
  console.log('%c signupWatcher is apparently watching for any returned objects that contain the SIGNUP_REQUESTING constant as its “type” property. If it’s present, it triggers the “signupFlow()” function on this page.', 'color: black; font-style: italic;')
  yield takeLatest(SIGNUP_REQUESTING, signupFlow)
  yield takeLatest(RESEND_CONFIRMATION_REQUESTING, resendConfirmationFlow)
}

export default signupWatcher
