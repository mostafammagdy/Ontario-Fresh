import {
  SIGNUP_REQUESTING,
  CLEAR_SIGNUP_STATE,
  RESEND_CONFIRMATION_REQUESTING
 } from './constants'

export const signupRequest = function signupRequest ({ email, password, first_name, last_name, title, business_name, roles, email_consent }) {
  console.log('%c signupRequest returned object:', 'color: blue; font-weight: bold;')
  console.log({
    type: SIGNUP_REQUESTING,
    email,
    password,
    first_name,
    last_name,
    title,
    business_name,
    roles,
    email_consent,
  })  
  return {
    type: SIGNUP_REQUESTING,
    email,
    password,
    first_name,
    last_name,
    title,
    business_name,
    roles,
    email_consent,
  }
}

export const clearSignupState = function clearSignupState() {
  return {
    type: CLEAR_SIGNUP_STATE,
  }
}

export const resendConfirmationRequest = function signupRequest(account_id) {
  return {
    type: RESEND_CONFIRMATION_REQUESTING,
    account_id
  }
}
