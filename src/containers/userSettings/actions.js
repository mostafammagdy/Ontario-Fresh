import {
  SAVE_USER_REQUESTING,
  SAVE_USER_REQUEST_SUCCESS,
  SAVE_USER_REQUEST_ERROR,
  OPEN_EMAIL_MODAL,
  CLOSE_EMAIL_MODAL
} from './constants';

export const saveUserRequest = (client, data) => ({
  type: SAVE_USER_REQUESTING,
  client,
  data
});

export const saveUserRequestSuccess = () => ({
  type: SAVE_USER_REQUEST_SUCCESS
});

export const saveUserRequestError = (error) => ({
  type: SAVE_USER_REQUEST_ERROR,
  error
});

export const openEmailModal = () => ({
  type: OPEN_EMAIL_MODAL
})

export const closeEmailModal = () => ({
  type: CLOSE_EMAIL_MODAL
})
