import { call, put, takeLatest, all } from 'redux-saga/effects'  // redux-saga’s delay effect is the problem.
import { delay } from 'redux-saga'  // redux-saga’s delay effect is the problem.
import Axios from 'axios'

import {
  MESSAGE_ALL,
  MESSAGE_ALL_SUCCESS,
  MESSAGE_ALL_ERROR,

  CLEAR_MESSAGE_ALL_NOTIFICATION,

  MESSAGE_ALL_FILE_UPLOAD_REQUEST
} from './constants'

import {
  fileUploadMessageAllSuccess,
  fileUploadMessageAllError
} from './actions'

/* Create Contact */

const sendBulkMessageUrl = `${process.env.REACT_APP_API_URL}/conversations/send_messages/`

function sendBulkMessageApi(client, data) {
  return Axios({
    url: sendBulkMessageUrl,
    method: 'post',
    headers: { Authorization: "Bearer " + client.token || undefined },
    data: data.to.map(to => ({
      recipient: to,
      content: data.message,
      files: data.files
    }))
  })
    .then(response => response.data)
    .then(json => json)
}

function* sendBulkMessageFlow(action) {
  try {
    const { client, data } = action
    const response = yield call(sendBulkMessageApi, client, data)

    yield put({ type: MESSAGE_ALL_SUCCESS, response })
    //if (data.conversation) yield put({ type: CONVERSATION_REQUESTING, client, data: data.conversation })
    yield call(delay, 4000)
    yield put({ type: CLEAR_MESSAGE_ALL_NOTIFICATION })
  } catch (error) {
    yield put({ type: MESSAGE_ALL_ERROR, error })
  }
}

const uploadFileUrl = `${process.env.REACT_APP_API_URL}/files/file`

function uploadFileApi(client, data) {
  const formData = new FormData()
  formData.append('public', false)
  data.receiver_ids.forEach(id => formData.append('can_view', id))
  formData.append('file_data', data.file)

  return Axios({
    url: uploadFileUrl,
    method: 'post',
    headers: {
      Authorization: "Bearer " + client.token || undefined,
      'Content-Type': 'multipart/form-data'
    },
    data: formData,
  })
  .then(response => response.data)
  .then(json => json.id)
}

function* uploadFileMessageAllFlow(action) {
  try {
    const { client, data } = action

    const responseArray = []

    yield* data.files.map(function* (file) {
      const response = yield call(uploadFileApi, client, { receiver_ids: data.receiver_ids, file })
      responseArray.push(response)
    })

    yield all(responseArray)

    yield put(fileUploadMessageAllSuccess(responseArray))
  } catch (error) {
    yield put(fileUploadMessageAllError(error))
  }
}

function* sendBulkMessageWatcher() {
  yield takeLatest(MESSAGE_ALL, sendBulkMessageFlow)
  yield takeLatest(MESSAGE_ALL_FILE_UPLOAD_REQUEST, uploadFileMessageAllFlow)
}

export default sendBulkMessageWatcher
