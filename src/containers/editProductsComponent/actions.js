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

export const createProduct = function createProduct(client, data) {
  return {
    type: CREATE_PRODUCT,
    client,
    data,
  }
}

export const createProductSuccess = function createProductSuccess(data) {
  return {
    type: CREATE_PRODUCT_SUCCESS,
    data,
  }
}

export const createProductError = function createProductError(error) {
  return {
    type: CREATE_PRODUCT_ERROR,
    error,
  }
}

export const updateProduct = function updateProduct(client, data) {
  return {
    type: UPDATE_PRODUCT,
    client,
    data,
  }
}

export const updateProductSuccess = function updateProductSuccess(data) {
  return {
    type: UPDATE_PRODUCT_SUCCESS,
    data,
  }
}

export const updateProductError = function updateProductError(error) {
  return {
    type: UPDATE_PRODUCT_ERROR,
    error,
  }
}

export const deleteProduct = function deleteProduct(client, data) {
  return {
    type: DELETE_PRODUCT,
    client,
    data,
  }
}

export const deleteProductSuccess = function deleteProductSuccess(data) {
  return {
    type: DELETE_PRODUCT_SUCCESS,
    data,
  }
}

export const deleteProductError = function deleteProductError(error) {
  return {
    type: DELETE_PRODUCT_ERROR,
    error,
  }
}

export const getProductSuggestions = function getAutocompleteSuggestions(client, data) {
  return {
    type: GET_PRODUCT_SUGGESTIONS,
    client,
    data
  }
}

export const getProductSuggestionsSuccess = function getAutocompleteSuggestions(data) {
  return {
    type: GET_PRODUCT_SUGGESTIONS_SUCCESS,
    data
  }
}

export const getProductSuggestionsError = function getAutocompleteSuggestionsError(error) {
  return {
    type: GET_PRODUCT_SUGGESTIONS_ERROR,
    error
  }
}
