import { delay } from 'redux-saga'  // redux-saga’s delay effect is the problem.
import { fork, call, put, takeLatest } from 'redux-saga/effects'  // redux-saga’s delay effect is the problem.
import Axios from 'axios'

import { forEach, uniq } from 'lodash'
import { flatten } from 'flat'

import {
  SEARCH_AUTOCOMPLETE_REQUEST,
  SEARCH_AUTOCOMPLETE_SUCCESS,
  SEARCH_AUTOCOMPLETE_ERROR,

  SEARCH_QUERY_REQUESTING,
  SEARCH_QUERY_SUCCESS,
  SEARCH_QUERY_ERROR,

  CLASSIFIEDS_SEARCH_REQUESTING,
  CLASSIFIEDS_SEARCH_SUCCESS,
  CLASSIFIEDS_SEARCH_ERROR,

  GET_SERVICES_LIST,
  GET_SERVICES_LIST_SUCCESS,
  GET_SERVICES_LIST_ERROR,

  GET_CLASSIFICATIONS_LIST,
  GET_CLASSIFICATIONS_LIST_SUCCESS,
  GET_CLASSIFICATIONS_LIST_ERROR,

  GET_PAYMENT_METHODS_LIST,
  GET_PAYMENT_METHODS_LIST_SUCCESS,
  GET_PAYMENT_METHODS_LIST_ERROR,

  GET_SAFETY_STANDARDS_LIST,
  GET_SAFETY_STANDARDS_LIST_SUCCESS,
  GET_SAFETY_STANDARDS_LIST_ERROR,

  GET_PROCESSING_TYPES_LIST,
  GET_PROCESSING_TYPES_LIST_SUCCESS,
  GET_PROCESSING_TYPES_LIST_ERROR,

  GET_MARKET_TYPES_LIST,
  GET_MARKET_TYPES_LIST_SUCCESS,
  GET_MARKET_TYPES_LIST_ERROR,

  GET_CATEGORIES_LIST,
  GET_CATEGORIES_LIST_SUCCESS,
  GET_CATEGORIES_LIST_ERROR,

} from './constants'

const searchAutocompleteUrl = `${process.env.REACT_APP_API_URL}/search/suggest_terms/`

function searchAutocompleteApi(data) {
  return Axios({
    url: searchAutocompleteUrl,
    method: 'post',
    data: {
      query: data
    }
  })
  .then(response => response.data)
  .then(json => json)
}

function* searchAutocompleteFlow(action) {
  try {
    const { data } = action
    if (!data) {
      yield put({ type: SEARCH_AUTOCOMPLETE_SUCCESS, response: [] })
    }
    else {
      const response = yield call(searchAutocompleteApi, data)

      yield put({ type: SEARCH_AUTOCOMPLETE_SUCCESS, response })
    }
  } catch (error) {
    yield put({ type: SEARCH_AUTOCOMPLETE_ERROR, error })
  }
}

const searchQueryUrl = `${process.env.REACT_APP_API_URL}/search/profiles/`

function searchQueryApi (client, data) {
  const list_filters = flatten(data.values.list_filters)

  /**
   * value_filters needs to be safeguarded but list_filters doesn't.
   * This is because list_filters has two attributes, whereas value_filters only has one, and data.values.value_filters
   * will evaluate to undefined when it is unchecked through the UI
   **/
  const value_filters = data.values.value_filters ? flatten(data.values.value_filters) : {}
  /////////////////////////////////////////////////////////////////////////////////////////

  if (typeof list_filters['category'] === 'object') {
    delete list_filters['category']
  }
  if (typeof list_filters['roles.data'] === 'object') {
    delete list_filters['roles.data']
  }
  if (typeof value_filters['roles.data'] === 'object') {
    delete value_filters['roles.data']
  }
  var key;
  for (key in list_filters) {
    if (list_filters[key] === '') {
      delete list_filters[key];
    }
  }
  for (key in value_filters) {
    if (value_filters[key] === '') {
      delete value_filters[key];
    }
  }
  return data.values.profile_type === 'ALL' ?
    Axios({
      url: searchQueryUrl,
      method: 'post',
      headers: client.token ? { Authorization: "Bearer " + client.token } : undefined,
      data: {
        size: 24 * (Math.floor(data.page + 1) || 1),
        from: 0,
        keywords: data.values.search_query ? data.values.search_query.toLowerCase() : '',
        role_level_filters: data.values.filters && flatten(data.values.filters),
        profiletype_filters: data.values.profile_type,
        list_filters,
        value_filters,
        autocomplete: false,
        distance: data.values.distance
      }
    })
    .then(response => response.data)
  :
    Promise.all([
      Axios({
        url: searchQueryUrl,
        method: 'post',
        headers: client.token ? { Authorization: "Bearer " + client.token } : undefined,
        data: {
          size: 0,
          from: 0,
          keywords: data.values.search_query ? data.values.search_query.toLowerCase() : '',
          role_level_filters: data.values.filters && flatten(data.values.filters),
          profiletype_filters: 'ALL',
          list_filters,
          value_filters,
          autocomplete: false,
          distance: data.values.distance
        }
      }),
      Axios({
        url: searchQueryUrl,
        method: 'post',
        headers: client.token ? { Authorization: "Bearer " + client.token } : undefined,
        data: {
          size: 24 * (Math.floor(data.page + 1) || 1),
          from: 0,
          keywords: data.values.search_query ? data.values.search_query.toLowerCase() : '',
          role_level_filters: data.values.filters && flatten(data.values.filters),
          profiletype_filters: data.values.profile_type,
          list_filters,
          value_filters,
          autocomplete: false,
          distance: data.values.distance
        }
      })
    ])
    .then(response => {
      const results = Object.assign({}, response[1].data, { aggregations: response[0].data.aggregations })
      results.hits.total = response[0].data.hits.total
      return results
    })
}

function* searchQueryFlow(action) {
  try {
    const { client, data } = action
    yield call(delay, 300)
    const response = yield call(searchQueryApi, client, data)

    yield put({ type: SEARCH_QUERY_SUCCESS, response })
  } catch (error) {
    yield put({ type: SEARCH_QUERY_ERROR, error })
  }
}

const searchClassifiedsUrl = `${process.env.REACT_APP_API_URL}/search/classifieds/`

function searchClassifiedsApi(client, data) {
  const list_filters = (data.values && data.values.classified_filters) ? flatten(data.values.classified_filters) : {}
  var key;
  for (key in list_filters) {
    if (list_filters[key] === '') {
      delete list_filters[key];
    }
  }

  let expiringDate
  if (data.values.expired_by) {
    expiringDate = new Date()
    expiringDate.setDate(expiringDate.getDate() + 7) //set date to 7 days from current time
  }

  return Axios({
    url: searchClassifiedsUrl,
    method: 'post',
    headers: client.token ? { Authorization: "Bearer " + client.token } : undefined,
    data: {
      size: 24 * (Math.floor(data.page + 1) || 1),
      from: 0,
      keywords: data.values.search_query ? data.values.search_query.toLowerCase() : '',
      looking_for: data.values.looking_for,
      expired_by: expiringDate || undefined,
      autocomplete: false,
      list_filters,
      distance: data.values.distance
    }
  })
    .then(response => response.data)
    .then(json => json)
}

function* searchClassifiedsFlow(action) {
  try {
    const { client, data } = action
    yield call(delay, 500)
    const response = yield call(searchClassifiedsApi, client, data)

    yield put({ type: CLASSIFIEDS_SEARCH_SUCCESS, response })
  } catch (error) {
    yield put({ type: CLASSIFIEDS_SEARCH_ERROR, error })
  }
}


const getServicesListUrl = `${process.env.REACT_APP_API_URL}/accounts/servicestypes_list/`

function getServicesListApi() {
  return Axios({
    url: getServicesListUrl,
    method: 'get'
  })
    .then(response => response.data)
    .then(json => json)
}

function* getServicesListFlow(action) {
  try {
    const response = yield call(getServicesListApi)

    yield put({ type: GET_SERVICES_LIST_SUCCESS, response })
  } catch (error) {
    yield put({ type: GET_SERVICES_LIST_ERROR, error })
  }
}

const getClassificationsListUrl = `${process.env.REACT_APP_API_URL}/accounts/classifications_list/`

function getClassificationsListApi() {
  return Axios({
    url: getClassificationsListUrl,
    method: 'get'
  })
    .then(response => response.data)
    .then(json => json)
}

function* getClassificationsListFlow(action) {
  try {
    const response = yield call(getClassificationsListApi)

    yield put({ type: GET_CLASSIFICATIONS_LIST_SUCCESS, response })
  } catch (error) {
    yield put({ type: GET_CLASSIFICATIONS_LIST_ERROR, error })
  }
}

const getPaymentMethodsListUrl = `${process.env.REACT_APP_API_URL}/accounts/paymentmethods_list/`

function getPaymentMethodsListApi() {
  return Axios({
    url: getPaymentMethodsListUrl,
    method: 'get'
  })
    .then(response => response.data)
    .then(json => json)
}

function* getPaymentMethodsListFlow(action) {
  try {
    const response = yield call(getPaymentMethodsListApi)

    yield put({ type: GET_PAYMENT_METHODS_LIST_SUCCESS, response })
  } catch (error) {
    yield put({ type: GET_PAYMENT_METHODS_LIST_ERROR, error })
  }
}

const getSafetyStandardsListUrl = `${process.env.REACT_APP_API_URL}/accounts/safetystandardtypes_list/`

function getSafetyStandardsListApi() {
  return Axios({
    url: getSafetyStandardsListUrl,
    method: 'get'
  })
    .then(response => response.data)
    .then(json => json)
}

function* getSafetyStandardsListFlow(action) {
  try {
    const response = yield call(getSafetyStandardsListApi)

    yield put({ type: GET_SAFETY_STANDARDS_LIST_SUCCESS, response })
  } catch (error) {
    yield put({ type: GET_SAFETY_STANDARDS_LIST_ERROR, error })
  }
}

const getProcessingTypesListUrl = `${process.env.REACT_APP_API_URL}/accounts/processingtypes_list/`

function getProcessingTypesListApi() {
  return Axios({
    url: getProcessingTypesListUrl,
    method: 'get'
  })
    .then(response => response.data)
    .then(json => json)
}

function* getProcessingTypesListFlow(action) {
  try {
    const response = yield call(getProcessingTypesListApi)

    yield put({ type: GET_PROCESSING_TYPES_LIST_SUCCESS, response })
  } catch (error) {
    yield put({ type: GET_PROCESSING_TYPES_LIST_ERROR, error })
  }
}

const getMarketTypesListUrl = `${process.env.REACT_APP_API_URL}/accounts/markettypes_list/`

function getMarketTypesListApi() {
  return Axios({
    url: getMarketTypesListUrl,
    method: 'get'
  })
    .then(response => response.data)
    .then(json => json)
}

function* getMarketTypesListFlow(action) {
  try {
    const response = yield call(getMarketTypesListApi)

    yield put({ type: GET_MARKET_TYPES_LIST_SUCCESS, response })
  } catch (error) {
    yield put({ type: GET_MARKET_TYPES_LIST_ERROR, error })
  }
}

const getCategoriesListUrl = `${process.env.REACT_APP_API_URL}/accounts/categories_list/`

function getCategoriesListApi() {
  return Axios({
    url: getCategoriesListUrl,
    method: 'get'
  })
  .then(response => response.data)
  .then(json => {
    let categoriesList = []
    forEach(json, array => categoriesList = categoriesList.concat(array))
    categoriesList = uniq(categoriesList)
    categoriesList.sort()
    return categoriesList
  })
}

function* getCategoriesListFlow(action) {
  try {
    const response = yield call(getCategoriesListApi)

    yield put({ type: GET_CATEGORIES_LIST_SUCCESS, response })
  } catch (error) {
    yield put({ type: GET_CATEGORIES_LIST_ERROR, error })
  }
}

function* searchComponentWatcher() {
  yield fork(takeLatest, SEARCH_AUTOCOMPLETE_REQUEST, searchAutocompleteFlow)
  yield fork(takeLatest, SEARCH_QUERY_REQUESTING, searchQueryFlow)
  yield fork(takeLatest, CLASSIFIEDS_SEARCH_REQUESTING, searchClassifiedsFlow)
  yield fork(takeLatest, GET_SERVICES_LIST, getServicesListFlow)
  yield fork(takeLatest, GET_CLASSIFICATIONS_LIST, getClassificationsListFlow)
  yield fork(takeLatest, GET_PAYMENT_METHODS_LIST, getPaymentMethodsListFlow)
  yield fork(takeLatest, GET_SAFETY_STANDARDS_LIST, getSafetyStandardsListFlow)
  yield fork(takeLatest, GET_PROCESSING_TYPES_LIST, getProcessingTypesListFlow)
  yield fork(takeLatest, GET_MARKET_TYPES_LIST, getMarketTypesListFlow)
  yield fork(takeLatest, GET_CATEGORIES_LIST, getCategoriesListFlow)
}

export default searchComponentWatcher
