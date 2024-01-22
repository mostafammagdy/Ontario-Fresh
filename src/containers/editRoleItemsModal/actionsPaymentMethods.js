import {
  PAYMENT_METHODS_UPDATING,
  PAYMENT_METHODS_UPDATE_SUCCESS,
  PAYMENT_METHODS_UPDATE_ERROR,
} from './constantsPaymentMethods'

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