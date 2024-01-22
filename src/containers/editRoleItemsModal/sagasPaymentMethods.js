import { call, put, take, fork, race } from 'redux-saga/effects'
import Axios from 'axios'

import {
  PAYMENT_METHODS_UPDATING,
  PAYMENT_METHODS_UPDATE_SUCCESS,
  PAYMENT_METHODS_UPDATE_ERROR,
} from './constants'

import {
  PROFILE_REQUESTING
} from '../../containers/profile/constants'

/* Update Payment Methods */

const updatePaymentMethodsUrl = `${process.env.REACT_APP_API_URL}/accounts/update_paymentmethod/`

function paymentMethodsUpdateApi(client, data) {
  return Axios({
    url: updatePaymentMethodsUrl,
    method: 'post',
    headers: { Authorization: "Bearer " + client.token || undefined },
    data: {
      id: data.id,
      details: data.details,
    }
  })
    .then(response => response.data)
    .then(json => json)
}

function* paymentMethodsUpdateFlow(action) {
  try {
    const { client, data } = action 
    const response = yield call(paymentMethodsUpdateApi, client, data)

    yield put({ type: PAYMENT_METHODS_UPDATE_SUCCESS, response })
    let profile = response.slug
    yield put({ type: PROFILE_REQUESTING, client, profile })
  } catch (error) {
    yield put({ type: PAYMENT_METHODS_UPDATE_ERROR, error })
  }
}

function* editListWatcher() {
  while(true) {
    const { 
      paymentMethods,
    } = yield race({
      paymentMethods: take(PAYMENT_METHODS_UPDATING),
    })

    if (paymentMethods) yield fork(paymentMethodsUpdateFlow, paymentMethods)
  }
}

export default editListWatcher