import { call, put, takeLatest } from 'redux-saga/effects';

import {
  SAVE_USER_REQUESTING
} from './constants';

import {
  saveUserRequestSuccess,
  saveUserRequestError
} from './actions';
import {
  setClient
} from '../../utils/client/actions'

import Axios from 'axios';
import { searchQueryRequestError } from '../searchComponent/actions';

const updateUserEndpoint = `${process.env.REACT_APP_API_URL}/accounts/update_user/`;

function* saveUserFlow(action) {
  const { client, data } = action;
  try {
    const response = yield call(
      () => Axios({
        url: updateUserEndpoint,
        method: 'post',
        headers: { Authorization: "Bearer " + client.token || undefined },
        data
      })
    );
    if (response.status >= 400) {
      throw new Error('Could not save user settings.');
    }
    let rawToken = JSON.stringify(response.data)
    yield put(setClient(JSON.stringify(rawToken)))
    localStorage.setItem('jwt', rawToken)
    yield put(saveUserRequestSuccess())
  } catch (error) {
    if (error.response && error.response.data && error.response.data.length > 0) {
      yield put(saveUserRequestError(error.response.data[0]))
    }
    else {
      yield put(saveUserRequestError('Could not save user settings.'))
    }
    yield put(searchQueryRequestError(error));
  }
}

function* userSettingsWatcher() {
  yield takeLatest(SAVE_USER_REQUESTING, saveUserFlow);
}

export default userSettingsWatcher;