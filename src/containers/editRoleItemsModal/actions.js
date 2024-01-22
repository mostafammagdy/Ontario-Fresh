import {
  ROLE_UPDATING,
  ROLE_UPDATE_SUCCESS,
  ROLE_UPDATE_ERROR,
  PAYMENT_METHODS_UPDATING,
  PAYMENT_METHODS_UPDATE_SUCCESS,
  PAYMENT_METHODS_UPDATE_ERROR,
} from './constants'

export const roleUpdate = function roleUpdate(client, data) {
  return {
    type: ROLE_UPDATING,
    client,
    data
  }
}

export const roleUpdateSuccess = function roleUpdateSuccess(data) {
  return {
    type: ROLE_UPDATE_SUCCESS,
    data,
  }
}

export const roleUpdateError = function roleUpdateError(error) {
  return {
    type: ROLE_UPDATE_ERROR,
    error,
  }
}

export const paymentMethodsUpdate = function paymentMethodsUpdate(client, data) {
  return {
    type: PAYMENT_METHODS_UPDATING,
    client,
    data,
  }
}

export const paymentMethodsUpdateSuccess = function paymentMethodsUpdateSuccess(data) {
  return {
    type: PAYMENT_METHODS_UPDATE_SUCCESS,
    data,
  }
}

export const paymentMethodsUpdateError = function paymentMethodsUpdateError(error) {
  return {
    type: PAYMENT_METHODS_UPDATE_ERROR,
    error,
  }
}