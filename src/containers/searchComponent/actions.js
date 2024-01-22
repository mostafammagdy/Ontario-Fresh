import {
  SEARCH_AUTOCOMPLETE_REQUEST,
  SEARCH_AUTOCOMPLETE_SUCCESS,
  SEARCH_AUTOCOMPLETE_ERROR,

  SEARCH_QUERY_REQUESTING,
  SEARCH_QUERY_SUCCESS,
  SEARCH_QUERY_ERROR,

  CLEAR_SEARCH_QUERY,

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

export const searchAutocompleteRequest = function (data) {
  return {
    type: SEARCH_AUTOCOMPLETE_REQUEST,
    data: data.query,
  }
}

export const searchAutocompleteSuccess = function (data) {
  return {
    type: SEARCH_AUTOCOMPLETE_SUCCESS,
    data,
  }
}

export const searchAutocompleteError = function (error) {
  return {
    type: SEARCH_AUTOCOMPLETE_ERROR,
    error,
  }
}

export const searchQueryRequest = function searchQueryRequest(client, data) {
  return {
    type: SEARCH_QUERY_REQUESTING,
    client,
    data,
  }
}

export const searchQueryRequestSuccess = function searchQueryRequestSuccess(data) {
  return {
    type: SEARCH_QUERY_SUCCESS,
    data,
  }
}

export const searchQueryRequestError = function searchQueryRequestError(error) {
  return {
    type: SEARCH_QUERY_ERROR,
    error,
  }
}

export const clearSearchQuery = function clearSearchQuery() {
  return {
    type: CLEAR_SEARCH_QUERY,
  }
}


export const classifiedsSearchRequest = function classifiedsSearchRequest(client, data) {
  return {
    type: CLASSIFIEDS_SEARCH_REQUESTING,
    client,
    data,
  }
}

export const classifiedsSearchRequestSuccess = function classifiedsSearchRequestSuccess(data) {
  return {
    type: CLASSIFIEDS_SEARCH_SUCCESS,
    data,
  }
}

export const classifiedsSearchRequestError = function classifiedsSearchRequestError(error) {
  return {
    type: CLASSIFIEDS_SEARCH_ERROR,
    error,
  }
}

export const getServicesList = function getServicesList() {
  return {
    type: GET_SERVICES_LIST,
  }
}

export const getServicesListSuccess = function getServicesListSuccess(data) {
  return {
    type: GET_SERVICES_LIST_SUCCESS,
    data,
  }
}

export const getServicesListError = function getServicesListError(error) {
  return {
    type: GET_SERVICES_LIST_ERROR,
    error,
  }
}

export const getClassificationsList = function getClassificationsList() {
  return {
    type: GET_CLASSIFICATIONS_LIST,
  }
}

export const getClassificationsListSuccess = function getClassificationsListSuccess(data) {
  return {
    type: GET_CLASSIFICATIONS_LIST_SUCCESS,
    data,
  }
}

export const getClassificationsListError = function getClassificationsListError(error) {
  return {
    type: GET_CLASSIFICATIONS_LIST_ERROR,
    error,
  }
}

export const getPaymentMethodsList = function getPaymentMethodsList() {
  return {
    type: GET_PAYMENT_METHODS_LIST,
  }
}

export const getPaymentMethodsListSuccess = function getPaymentMethodsListSuccess(data) {
  return {
    type: GET_PAYMENT_METHODS_LIST_SUCCESS,
    data,
  }
}

export const getPaymentMethodsListError = function getPaymentMethodsListError(error) {
  return {
    type: GET_PAYMENT_METHODS_LIST_ERROR,
    error,
  }
}

export const getSafetyStandardsList = function getSafetyStandardsList() {
  return {
    type: GET_SAFETY_STANDARDS_LIST,
  }
}

export const getSafetyStandardsListSuccess = function getSafetyStandardsListSuccess(data) {
  return {
    type: GET_SAFETY_STANDARDS_LIST_SUCCESS,
    data,
  }
}

export const getSafetyStandardsListError = function getSafetyStandardsListError(error) {
  return {
    type: GET_SAFETY_STANDARDS_LIST_ERROR,
    error,
  }
}

export const getProcessingTypesList = function getProcessingTypesList() {
  return {
    type: GET_PROCESSING_TYPES_LIST,
  }
}

export const getProcessingTypesListSuccess = function getProcessingTypesListSuccess(data) {
  return {
    type: GET_PROCESSING_TYPES_LIST_SUCCESS,
    data,
  }
}

export const getProcessingTypesListError = function getProcessingTypesListError(error) {
  return {
    type: GET_PROCESSING_TYPES_LIST_ERROR,
    error,
  }
}

export const getMarketTypesList = function getMarketTypesList() {
  return {
    type: GET_MARKET_TYPES_LIST,
  }
}

export const getMarketTypesListSuccess = function getMarketTypesListSuccess(data) {
  return {
    type: GET_MARKET_TYPES_LIST_SUCCESS,
    data,
  }
}

export const getMarketTypesListError = function getMarketTypesListError(error) {
  return {
    type: GET_MARKET_TYPES_LIST_ERROR,
    error,
  }
}

export const getCategoriesList = function getCategoriesList() {
  return {
    type: GET_CATEGORIES_LIST,
  }
}

export const getCategoriesListSuccess = function getCategoriesListSuccess(data) {
  return {
    type: GET_CATEGORIES_LIST_SUCCESS,
    data,
  }
}

export const getCategoriesListError = function getCategoriesListError(error) {
  return {
    type: GET_CATEGORIES_LIST_ERROR,
    error,
  }
}
