import { fork, call, put, takeLatest } from 'redux-saga/effects'
import Axios from 'axios'

import {
  DISMISS_ONBOARDING,
} from './constants'

import { PROFILE_REQUESTING } from '../profile/constants'

const dismissOnboardingUrl = `${process.env.REACT_APP_API_URL}/accounts/set_onboarding/`

function dismissOnboardingApi(client) {
  return Axios({
    url: dismissOnboardingUrl,
    method: 'get',
    headers: { Authorization: "Bearer " + client.token || undefined },
  })
    .then(response => response.data)
    .then(json => json)
}

function* dismissOnboardingFlow(action) {
  try {
    const { client } = action

    yield call(dismissOnboardingApi, client)
    yield put({ type: PROFILE_REQUESTING, client }) // Profile Managers - Hide?
  } catch (error) {
  }
}

function* onboardingWatcher() {
  yield fork(takeLatest, DISMISS_ONBOARDING, dismissOnboardingFlow)
}

export default onboardingWatcher
