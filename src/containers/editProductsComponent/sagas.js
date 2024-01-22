import { call, put, takeLatest, fork } from 'redux-saga/effects'
import Axios from 'axios'

import {
  CREATE_PRODUCT,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,

  UPDATE_PRODUCT,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,

  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,

  GET_PRODUCT_SUGGESTIONS,
  GET_PRODUCT_SUGGESTIONS_SUCCESS,
  GET_PRODUCT_SUGGESTIONS_ERROR
} from './constants'

import {
  PROFILE_REQUESTING
} from '../../containers/profile/constants'

/* Create Product */

export const createProductUrl = `${process.env.REACT_APP_API_URL}/accounts/create_product/`

function createProductApi(client, data) {
  return Axios({
    url: createProductUrl,
    method: 'post',
    headers: { Authorization: "Bearer " + client.token || undefined },
    data: {
      role_id: data.role_id,
      category_id: data.category_id,
      name: data.name,
      parent: data.parent
    }
  })
    .then(response => response.data)
    .then(json => json)
}

function* createProductFlow(action) {
  try {
    const { client, data } = action
    const response = yield call(createProductApi, client, data)

    yield put({ type: CREATE_PRODUCT_SUCCESS, response })
    let profile = response.slug
    yield put({ type: PROFILE_REQUESTING, client, profile })
  } catch (error) {
    yield put({ type: CREATE_PRODUCT_ERROR, error })
  }
}

/* Update Product */

const updateProductUrl = `${process.env.REACT_APP_API_URL}/accounts/update_product/`

function updateProductApi(client, data) {
  return Axios({
    url: updateProductUrl,
    method: 'post',
    headers: { Authorization: "Bearer " + client.token || undefined },
    data: {
      product_id: data.product_id,
      category_order: data.category_order,
    }
  })
    .then(response => response.data)
    .then(json => json)
}

function* updateProductFlow(action) {
  try {
    const { client, data } = action
    const response = yield call(updateProductApi, client, data)

    yield put({ type: UPDATE_PRODUCT_SUCCESS, response })
    let profile = response.slug
    yield put({ type: PROFILE_REQUESTING, client, profile })
  } catch (error) {
    yield put({ type: UPDATE_PRODUCT_ERROR, error })
  }
}

/* Delete Product */

export const deleteProductUrl = `${process.env.REACT_APP_API_URL}/accounts/delete_product/`

function deleteProductApi(client, data) {
  return Axios({
    url: deleteProductUrl,
    method: 'post',
    headers: { Authorization: "Bearer " + client.token || undefined },
    data: {
      product_id: data.product_id,
    }
  })
    .then(response => response.data)
    .then(json => json)
}

function* deleteProductFlow(action) {
  try {
    const { client, data } = action
    const response = yield call(deleteProductApi, client, data)

    yield put({ type: DELETE_PRODUCT_SUCCESS, response })
    let profile = response.slug
    yield put({ type: PROFILE_REQUESTING, client, profile })
  } catch (error) {
    yield put({ type: DELETE_PRODUCT_ERROR, error })
  }
}

/* Get Products */

export const getProductSuggestionsUrl = `${process.env.REACT_APP_API_URL}/search/suggest_products/`

function getProductSuggestionsApi(client, data) {
  return Axios({
    url: getProductSuggestionsUrl,
    method: 'post',
    headers: { Authorization: "Bearer " + client.token || undefined },
    data: {
      query: data.query
    }
  })
  .then(response => response.data)
  .then(json => json)
}

function* getProductSuggestionsFlow(action) {
  try {
    const { client, data } = action
    if (data.query && data.query !== "") {
      const response = yield call(getProductSuggestionsApi, client, data)

      yield put({ type: GET_PRODUCT_SUGGESTIONS_SUCCESS, data: response })
    }
    else {
      yield put({ type: GET_PRODUCT_SUGGESTIONS_SUCCESS, data: [] })
    }
  } catch (error) {
    yield put({ type: GET_PRODUCT_SUGGESTIONS_ERROR, error })
  }
}

function* editProductsComponentWatcher() {
  yield fork(takeLatest, CREATE_PRODUCT, createProductFlow)
  yield fork(takeLatest, UPDATE_PRODUCT, updateProductFlow)
  yield fork(takeLatest, DELETE_PRODUCT, deleteProductFlow)
  yield fork(takeLatest, GET_PRODUCT_SUGGESTIONS, getProductSuggestionsFlow)
}

export default editProductsComponentWatcher
