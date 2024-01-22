import { fork, call, put, takeLatest, takeEvery, take, cancel, all } from 'redux-saga/effects'  // redux-saga’s delay effect is the problem.
import { filter } from 'lodash'
import { delay } from 'redux-saga'  // redux-saga’s delay effect is the problem.
import Axios from 'axios'
import moment from 'moment'

import {
  USER_MESSAGES_REQUESTING,
  USER_MESSAGES_SUCCESS,
  USER_MESSAGES_ERROR,

  CONVERSATION_REQUESTING,
  CONVERSATION_REQUEST_SUCCESS,
  CONVERSATION_REQUEST_ERROR,

  BLOCK_CONVERSATION_REQUESTING,

  MESSAGE_SENDING,
  MESSAGE_SEND_SUCCESS,
  MESSAGE_SEND_ERROR,

  MESSAGE_FILE_UPLOAD_REQUEST,

  UNREAD_MESSAGES_REQUESTING,
  UNREAD_MESSAGES_REQUEST_SUCCESS,
  UNREAD_MESSAGES_REQUEST_ERROR,

  CLEAR_SEND_MESSAGE_NOTIFICATION,
  
} from './constants'

import {
  blockConversationRequestSuccess,
  blockConversationRequestError,

  fileUploadSuccess,
  fileUploadError,
} from './actions'

import { 
  LOGOUT
} from '../login/constants'

const getUserMessagesUrl = `${process.env.REACT_APP_API_URL}/conversations/conversations_by_user/`

function getUserMessagesApi (client) {
  return Axios({
    url: getUserMessagesUrl,
    method: 'get',
    headers: { Authorization: "Bearer " + client.token || undefined },
  })
  .then(response => response.data)
  .then(json => Object.assign( //filter out conversations of deleted accounts
                  {...json},
                  { results: filter(json.results, conversation => conversation.conversation_participations && conversation.conversation_participations.length === 2) }
                )
  )
}

function* getUserMessagesFlow(action) {
  try {
    const { client } = action
    const response = yield call(getUserMessagesApi, client)

    yield put({ type: USER_MESSAGES_SUCCESS, response })
  } catch (error) {
    yield put({ type: USER_MESSAGES_ERROR, error })
  }
}

const getConversationUrl = `${process.env.REACT_APP_API_URL}/conversations/messages_by_conversation/`

function getConversationApi(client, data) {
  return Axios({
    url: getConversationUrl,
    method: 'get',
    headers: { Authorization: "Bearer " + client.token || undefined },
    params: {
      conversation_id: data
    }
  })
  .then(response => response.data)
  .then(json => {
    for (let i = 0; i < json.results.length; i++) {
      const message = json.results[i]
      message.updated_at = moment(message.updated_at).format('MM/DD/YY, h:mm a')
    }
    return json
  })
}

function* getConversationFlow(action) {
  try {
    const { client, data } = action
    if (data !== null) {
      const response = yield call(getConversationApi, client, data)

      yield put({ type: CONVERSATION_REQUEST_SUCCESS, response })
    } else {
      yield put({ type: CONVERSATION_REQUEST_SUCCESS, response: {} })
    }
  } catch (error) {
    yield put({ type: CONVERSATION_REQUEST_ERROR, error })
  }
}

const sendMessageUrl = `${process.env.REACT_APP_API_URL}/conversations/send_message/`

function sendMessageApi(client, data) {
  return Axios({
    url: sendMessageUrl,
    method: 'post',
    headers: { Authorization: "Bearer " + client.token || undefined },
    data: {
      recipient: data.to,
      content: data.message,
      files: data.files
    }
  })
    .then(response => response.data)
    .then(json => json)
}

function* sendMessageFlow(action) {
  try {
    const { client, data } = action
    const response = yield call(sendMessageApi, client, data)

    yield put({ type: MESSAGE_SEND_SUCCESS, response })
    if (data.conversation) yield put({ type: CONVERSATION_REQUESTING, client, data: data.conversation })
    yield call(delay, 4000)
    yield put({ type: CLEAR_SEND_MESSAGE_NOTIFICATION })
  } catch (error) {
    yield put({ type: MESSAGE_SEND_ERROR, error })
  }
}

const blockConversationUrl = `${process.env.REACT_APP_API_URL}/conversations/silence_conversation/`

function blockConversationApi(client, data) {
  return Axios({
    url: blockConversationUrl,
    method: 'post',
    headers: { Authorization: "Bearer " + client.token || undefined },
    data: {
      from: data.slug,
      silenced: data.silenced,
    }
  })
  .then(response => response.data)
  .then(json => json)
}

function* blockConversationFlow(action) {
  try {
    const { client, data } = action
    yield call(blockConversationApi, client, data)

    yield put(blockConversationRequestSuccess(data))
  } catch (error) {
    yield put(blockConversationRequestError(error))
  }
}

const uploadFileUrl = `${process.env.REACT_APP_API_URL}/files/file`

function uploadFileApi(client, data) {
  const formData = new FormData()
  formData.append('public', false)
  formData.append('can_view', [data.receiver_id])
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

function* uploadFileFlow(action) {
  try {
    const { client, data } = action

    const responseArray = []

    yield* data.files.map(function* (file) {
      const response = yield call(uploadFileApi, client, {receiver_id: data.receiver_id, file})
      responseArray.push(response)
    })

    yield all(responseArray)

    yield put(fileUploadSuccess(responseArray))
  } catch (error) {
    yield put(fileUploadError(error))
  }
}

const getUnreadMessagesCountUrl = `${process.env.REACT_APP_API_URL}/conversations/unread_messages_count/`

function getUnreadMessagesCountApi(client) {
  return Axios({
    url: getUnreadMessagesCountUrl,
    method: 'get',
    headers: { Authorization: "Bearer " + client.token || undefined },
  })
    .then(response => response.data)
    .then(json => json)
}

function* getUnreadMessagesCountFlow(action) {
  try {
    while(true) {
      const { client } = action
      const response = yield call(getUnreadMessagesCountApi, client)
      yield put({ type: UNREAD_MESSAGES_REQUEST_SUCCESS, response })

      yield call(delay, 10000)  
    }
  } catch (error) {
    yield put({ type: UNREAD_MESSAGES_REQUEST_ERROR, error })
  }
}

function* messagesWatcher() {
  yield fork(takeLatest, USER_MESSAGES_REQUESTING, getUserMessagesFlow)
  yield fork(takeLatest, CONVERSATION_REQUESTING, getConversationFlow)
  yield fork(takeEvery, MESSAGE_SENDING, sendMessageFlow)
  yield fork(takeEvery, BLOCK_CONVERSATION_REQUESTING, blockConversationFlow)
  yield fork(takeEvery, MESSAGE_FILE_UPLOAD_REQUEST, uploadFileFlow)
  while(true) {
    let fetchNewMessages = yield takeLatest(UNREAD_MESSAGES_REQUESTING, getUnreadMessagesCountFlow)
    yield take(LOGOUT)
    yield cancel(fetchNewMessages)
  }
}

export default messagesWatcher
