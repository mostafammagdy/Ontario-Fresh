import {
  PRODUCT_CATEGORIES_REQUESTING,
  PRODUCT_CATEGORIES_REQUEST_SUCCESS,
  PRODUCT_CATEGORIES_REQUEST_ERROR,
} from './constants'

export const productCategoriesRequest = function productCategoriesRequest(client, data) {
  return {
    type: PRODUCT_CATEGORIES_REQUESTING,
    client,
    data
  }
}

export const productCategoriesRequestSuccess = function productCategoriesRequestSuccess(data) {
  return {
    type: PRODUCT_CATEGORIES_REQUEST_SUCCESS,
    data,
  }
}

export const productCategoriesRequestError = function productCategoriesRequestError(error) {
  return {
    type: PRODUCT_CATEGORIES_REQUEST_ERROR,
    error,
  }
}
