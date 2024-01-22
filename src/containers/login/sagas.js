import { take, race, fork, call, put, cancelled } from 'redux-saga/effects'
import { browserHistory } from 'react-router'
import Axios from 'axios'

import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
} from './constants'

import {
  setClient,
  unsetClient,
} from '../../utils/client/actions'

import {
  CLIENT_SET,
  CLIENT_UNSET,
  LOGOUT_REQUEST,
} from '../../utils/client/constants'

import { BASIC_PROFILE_REQUESTING } from '../../containers/profile/constants'

const loginUrl = `${process.env.REACT_APP_API_URL}/accounts/login/`

function loginApi (username, password) {
  return Axios.post(loginUrl, {
    username: username,
    password: password,
  })
  .then(response => response)
  .then(json => json)
  .catch(function (error) {
    if (error.response.data.username) {
      throw(Error("Please provide a valid email address."))
    } else if (error.response.data.password) {
      throw(Error("Please enter a password."))
    }
    throw(Error((error.response && error.response.data.non_field_errors && error.response.data.non_field_errors[0]) || "Unknown Error"))
  })
}

export function* logout () {
  yield put(unsetClient())
  yield put({ type: LOGOUT })
  // will throw a LOGOUT, which clears the entire state for the Login form and component
  localStorage.removeItem('jwt')
  browserHistory.push('/login')
}

export function* softLogout () {
  // does not throw a LOGOUT to preserve errors in state
  yield put(unsetClient())
  localStorage.removeItem('jwt')
  browserHistory.push('/login')
}

function* loginFlow (username, password) {
  let token, rawToken
  try {
    token = yield call(loginApi, username, password)
    rawToken = JSON.stringify(token.data)
    yield put(setClient(JSON.stringify(rawToken)))
    yield put({ type: LOGIN_SUCCESS })
    localStorage.setItem('jwt', rawToken)
    yield put({
      type: BASIC_PROFILE_REQUESTING,
      client: token.data,
      profile: 'basic'
    })
    yield put({
      type: CLIENT_SET,
      token: rawToken
    })

    const params = (window.location.search.slice(1)).split('&')
    let redirectUrl = ''
    for (let i = params.length - 1; i >= 0; i--) {
      const keyValue = params[i].split('=')
      if (keyValue[0] === 'next') {
        redirectUrl = keyValue[1] + '?'
        break
      }
    }
    if (redirectUrl !== '') {
      params.forEach((param, index) => {
        const key = param.split('=')[0]
        if (key !== 'next') {
          redirectUrl += (param + (index > 0 ? '&' : ''))
        }
      })
      browserHistory.push(redirectUrl)
    } else {
      // browserHistory.push('/profile')
      browserHistory.push('/profile-hub')
    }
  } catch (error) {
    // send error to redux
    yield put({ type: LOGIN_ERROR, error })
  } finally {
    // No matter what, if our `forked` `task` was cancelled
    // we will then just redirect them to login
    if (yield cancelled()) {
      browserHistory.push('/login')
    }
  }
  return rawToken
}

function* loginWatcher () {
  while (true) {
    const authStatus = yield race({
      loggedOut: take(LOGIN_REQUESTING),
      loggedIn: take(CLIENT_SET)
    })

    if (authStatus.loggedOut) {
      const { username, password } = authStatus.loggedOut
      yield fork(loginFlow, username, password)
    }

    const logoutType = yield race({
      clear: take([LOGOUT_REQUEST, CLIENT_UNSET]),
      error: take(LOGIN_ERROR)
    })
    
    if (logoutType.clear) yield call(logout)
    else yield call(softLogout)
  }
}

export default loginWatcher
