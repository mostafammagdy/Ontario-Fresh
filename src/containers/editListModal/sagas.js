import { call, put, take, fork, race } from 'redux-saga/effects'
import Axios from 'axios'

import {
  SAFETY_STANDARDS_UPDATING,
  SAFETY_STANDARDS_UPDATE_SUCCESS,
  SAFETY_STANDARDS_UPDATE_ERROR,

  CLASSIFICATIONS_UPDATING,
  CLASSIFICATIONS_UPDATE_SUCCESS,
  CLASSIFICATIONS_UPDATE_ERROR,

  PROCESSING_TYPES_UPDATING,
  PROCESSING_TYPES_UPDATE_SUCCESS,
  PROCESSING_TYPES_UPDATE_ERROR,

  MARKET_TYPES_UPDATING,
  MARKET_TYPES_UPDATE_SUCCESS,
  MARKET_TYPES_UPDATE_ERROR,

  SERVICES_UPDATING,
  SERVICES_UPDATE_SUCCESS,
  SERVICES_UPDATE_ERROR,
} from './constants'

import {
  PROFILE_REQUESTING
} from '../../containers/profile/constants'

/* Update Safety Standards */

const updateSafetyStandardsUrl = `${process.env.REACT_APP_API_URL}/accounts/update_safetystandard/`

function safetyStandardUpdateApi(client, data) {
  return Axios({
    url: updateSafetyStandardsUrl,
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

function* safetyStandardsUpdateFlow(action) {
  try {
    const { client, data } = action 
    const response = yield call(safetyStandardUpdateApi, client, data)

    yield put({ type: SAFETY_STANDARDS_UPDATE_SUCCESS, response})
    let profile = response.slug
    yield put({ type: PROFILE_REQUESTING, client, profile })
  } catch (error) {
    yield put({ type: SAFETY_STANDARDS_UPDATE_ERROR, error })
  }
}

/* Update Classifications */

const updateClassificationsUrl = `${process.env.REACT_APP_API_URL}/accounts/update_classification/`

function classificationsUpdateApi(client, data) {
  return Axios({
    url: updateClassificationsUrl,
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

function* classificationsUpdateFlow(action) {
  try {
    const { client, data } = action 
    const response = yield call(classificationsUpdateApi, client, data)

    yield put({ type: CLASSIFICATIONS_UPDATE_SUCCESS, response })
    let profile = response.slug
    yield put({ type: PROFILE_REQUESTING, client, profile })
  } catch (error) {
    yield put({ type: CLASSIFICATIONS_UPDATE_ERROR, error })
  }
}

/* Update Processing Types */

const updateProcessingTypesUrl = `${process.env.REACT_APP_API_URL}/accounts/update_processing/`

function processingTypesUpdateApi(client, data) {
  return Axios({
    url: updateProcessingTypesUrl,
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

function* processingTypesUpdateFlow(action) {
  try {
    const { client, data } = action
    const response = yield call(processingTypesUpdateApi, client, data)

    yield put({ type: PROCESSING_TYPES_UPDATE_SUCCESS, response })
    let profile = response.slug
    yield put({ type: PROFILE_REQUESTING, client, profile })
  } catch (error) {
    yield put({ type: PROCESSING_TYPES_UPDATE_ERROR, error })
  }
}

/* Update Market Types */

const updateMarketTypesUrl = `${process.env.REACT_APP_API_URL}/accounts/update_market/`

function marketTypesUpdateApi(client, data) {
  return Axios({
    url: updateMarketTypesUrl,
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

function* marketTypesUpdateFlow(action) {
  try {
    const { client, data } = action
    const response = yield call(marketTypesUpdateApi, client, data)

    yield put({ type: MARKET_TYPES_UPDATE_SUCCESS, response })
    let profile = response.slug
    yield put({ type: PROFILE_REQUESTING, client, profile })
  } catch (error) {
    yield put({ type: MARKET_TYPES_UPDATE_ERROR, error })
  }
}

/* Update Services */

const updateServicesUrl = `${process.env.REACT_APP_API_URL}/accounts/update_service/`

function servicesUpdateApi(client, data) {
  return Axios({
    url: updateServicesUrl,
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

function* servicesUpdateFlow(action) {
  try {
    const { client, data } = action
    const response = yield call(servicesUpdateApi, client, data)

    yield put({ type: SERVICES_UPDATE_SUCCESS, response })
    let profile = response.slug
    yield put({ type: PROFILE_REQUESTING, client, profile })
  } catch (error) {
    yield put({ type: SERVICES_UPDATE_ERROR, error })
  }
}

function* editListWatcher() {
  while(true) {
    const { 
      safetyStandards,
      classifications,
      processingTypes,
      marketTypes,
      services,
    } = yield race({
      classifications: take(CLASSIFICATIONS_UPDATING),
      safetyStandards: take(SAFETY_STANDARDS_UPDATING),
      processingTypes: take(PROCESSING_TYPES_UPDATING),
      marketTypes: take(MARKET_TYPES_UPDATING),
      services: take(SERVICES_UPDATING)
    })

    if (safetyStandards) yield fork(safetyStandardsUpdateFlow, safetyStandards)
    else if (classifications) yield fork(classificationsUpdateFlow, classifications)
    else if (processingTypes) yield fork(processingTypesUpdateFlow, processingTypes)
    else if (marketTypes) yield fork(marketTypesUpdateFlow, marketTypes)
    else if (services) yield fork(servicesUpdateFlow, services)
  }
}

export default editListWatcher