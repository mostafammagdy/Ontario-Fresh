import { call, put, takeLatest, fork } from 'redux-saga/effects'
import Axios from 'axios'

import {
  PRODUCT_CATEGORIES_REQUESTING,
  PRODUCT_CATEGORIES_REQUEST_SUCCESS,
  PRODUCT_CATEGORIES_REQUEST_ERROR,
} from './constants'

const getProductCategoriesUrl = `${process.env.REACT_APP_API_URL}/accounts/productcategories_list/`

function getProductCategoriesApi() {
  return Axios({
    url: getProductCategoriesUrl,
    method: 'get'
  })
    .then(response => response.data)
    .then(json => {
      json.push({id: 0, label: 'Other'})
      return json
    })
}

function* getProductCategoriesFlow(action) {
  try {
    const response = yield call(getProductCategoriesApi)

    yield put({ type: PRODUCT_CATEGORIES_REQUEST_SUCCESS, response })
  } catch (error) {
    yield put({ type: PRODUCT_CATEGORIES_REQUEST_ERROR, error })
  }
}

function* editProductsWatcher() {
  yield fork(takeLatest, PRODUCT_CATEGORIES_REQUESTING, getProductCategoriesFlow)
}

export default editProductsWatcher