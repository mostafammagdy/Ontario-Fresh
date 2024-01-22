import {
  NOTIFICATION_SETTINGS_REQUESTING,
  NOTIFICATION_SETTINGS_REQUEST_SUCCESS,
  NOTIFICATION_SETTINGS_REQUEST_ERROR,
  NOTIFICATION_SETTING_UPDATE_REQUESTING,
  NOTIFICATION_SETTING_UPDATE_REQUEST_SUCCESS,
  NOTIFICATION_SETTING_UPDATE_REQUEST_ERROR 
} from './constants';

export const notificationSettingsRequest = client => ({
  type: NOTIFICATION_SETTINGS_REQUESTING,
  client
});

export const notificationSettingsRequestSuccess = settings => ({
  type: NOTIFICATION_SETTINGS_REQUEST_SUCCESS,
  settings
});

export const notificationSettingsRequestError = error => ({
  type: NOTIFICATION_SETTINGS_REQUEST_ERROR,
  error
});

export const notificationSettingUpdateRequest = (client, setting, value) => ({
  type: NOTIFICATION_SETTING_UPDATE_REQUESTING,
  client,
  setting,
  value
});

export const notificationSettingUpdateRequestSuccess = () => ({
  type: NOTIFICATION_SETTING_UPDATE_REQUEST_SUCCESS
});

export const notificationSettingUpdateRequestError = (error, setting, oldValue) => ({
  type: NOTIFICATION_SETTING_UPDATE_REQUEST_ERROR,
  error,
  setting,
  oldValue
});