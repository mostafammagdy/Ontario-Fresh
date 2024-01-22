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

export const safetyStandardsUpdate = function safetyStandardsUpdate(client, data) {
  return {
    type: SAFETY_STANDARDS_UPDATING,
    client,
    data,
  }
}

export const safetyStandardsUpdateSuccess = function safetyStandardsUpdateSuccess(data) {
  return {
    type: SAFETY_STANDARDS_UPDATE_SUCCESS,
    data,
  }
}

export const safetyStandardsUpdateError = function safetyStandardsUpdateError(error) {
  return {
    type: SAFETY_STANDARDS_UPDATE_ERROR,
    error,
  }
}

export const classificationsUpdate = function classificationsUpdate(client, data) {
  return {
    type: CLASSIFICATIONS_UPDATING,
    client,
    data,
  }
}

export const classificationsUpdateSuccess = function classificationsUpdateSuccess(data) {
  return {
    type: CLASSIFICATIONS_UPDATE_SUCCESS,
    data,
  }
}

export const classificationsUpdateError = function classificationsUpdateError(error) {
  return {
    type: CLASSIFICATIONS_UPDATE_ERROR,
    error,
  }
}

export const processingTypesUpdate = function processingTypesUpdate(client, data) {
  return {
    type: PROCESSING_TYPES_UPDATING,
    client,
    data,
  }
}

export const processingTypesUpdateSuccess = function processingTypesUpdateSuccess(data) {
  return {
    type: PROCESSING_TYPES_UPDATE_SUCCESS,
    data,
  }
}

export const processingTypesUpdateError = function processingTypesUpdateError(error) {
  return {
    type: PROCESSING_TYPES_UPDATE_ERROR,
    error,
  }
}

export const marketTypesUpdate = function marketTypesUpdate(client, data) {
  return {
    type: MARKET_TYPES_UPDATING,
    client,
    data,
  }
}

export const marketTypesUpdateSuccess = function marketTypesUpdateSuccess(data) {
  return {
    type: MARKET_TYPES_UPDATE_SUCCESS,
    data,
  }
}

export const marketTypesUpdateError = function marketTypesUpdateError(error) {
  return {
    type: MARKET_TYPES_UPDATE_ERROR,
    error,
  }
}

export const servicesUpdate = function servicesUpdate(client, data) {
  return {
    type: SERVICES_UPDATING,
    client,
    data,
  }
}

export const servicesUpdateSuccess = function servicesUpdateSuccess(data) {
  return {
    type: SERVICES_UPDATE_SUCCESS,
    data,
  }
}

export const servicesUpdateError = function servicesUpdateError(error) {
  return {
    type: SERVICES_UPDATE_ERROR,
    error,
  }
}
