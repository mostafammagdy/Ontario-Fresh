import { takeLatest, call, put, takeEvery } from 'redux-saga/effects';
import Axios from 'axios';
import { notificationSettingsRequestSuccess, notificationSettingsRequestError, notificationSettingUpdateRequestSuccess, notificationSettingUpdateRequestError } from './actions';
import { NOTIFICATION_SETTINGS_REQUESTING, NOTIFICATION_SETTING_UPDATE_REQUESTING } from './constants';

const getNotificationsSettingsEndpoint = `${process.env.REACT_APP_API_URL}/notifications/preference`;

function* getNotificationsSettings(action) {
  const { client } = action;

  try {
    const settings = yield call(
      () => Axios({
        url: getNotificationsSettingsEndpoint,
        method: 'get',
        headers: { Authorization: "Bearer " + client.token || undefined }
      })
      .then(response => response.data.map(setting => ({ verb: setting.notification_verb, enable: setting.enable })))
    );
    yield put(notificationSettingsRequestSuccess(settings));
  } catch(error) {
    yield put(notificationSettingsRequestError(error));
  }
}

function* updateNotificationSetting(action) {
  const { client, setting, value } = action;
  // const state = yield select();
  // const oldValue = state.notificationSettings.settings.find(s => s.verb === setting).enable;

  try {
    const response = yield call(
      () => Axios({
        url: `${getNotificationsSettingsEndpoint}/${setting}`,
        method: 'put',
        headers: { Authorization: "Bearer " + client.token || undefined },
        data: {
          enable: value
        }
      })
    );
    if (response.status >= 400) {
      throw new Error('Could not update setting');
    }
    yield put(notificationSettingUpdateRequestSuccess());
  } catch(error) {
    yield put(notificationSettingUpdateRequestError(error, setting, !value));
  }
}

function* notificationSettingsWatcher() {
  yield [
    takeLatest(NOTIFICATION_SETTINGS_REQUESTING, getNotificationsSettings),
    takeEvery(NOTIFICATION_SETTING_UPDATE_REQUESTING, updateNotificationSetting)
  ];
}

export default notificationSettingsWatcher;