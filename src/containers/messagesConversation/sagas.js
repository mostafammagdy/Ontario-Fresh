import { fork, call, put, takeLatest } from 'redux-saga/effects'
import Axios from 'axios'

import { map, filter } from 'lodash'

import {
  GET_PARTICIPANT_SUGGESTIONS,
  GET_PARTICIPANT_SUGGESTIONS_SUCCESS,
  GET_PARTICIPANT_SUGGESTIONS_ERROR
} from './constants'

const searchQueryUrl = `${process.env.REACT_APP_API_URL}/search/profiles/`

function getParticipantsApi (client, data) {
  return Axios({
    url: searchQueryUrl,
    method: 'post',
    headers: client.token ? { Authorization: "Bearer " + client.token } : undefined,
    data: {
      size: 24,
      from: 0,
      keywords: data.query,
      profiletype_filters: 'ALL',
      list_filters: {},
      autocomplete: true,
    }
  })
  .then(response => response.data)
  .then(json => {
    const modifiedJSON = map(json.hits.hits, profile => profile._source)
    return data.blacklistID ? filter(modifiedJSON, profile => profile.id !== data.blacklistID) : modifiedJSON
  })
}

function* getParticipantsFlow(action) {
  try {
    const { client, data } = action

    if (data.query && data.query !== '') {
      const response = yield call(getParticipantsApi, client, data)

      yield put({ type: GET_PARTICIPANT_SUGGESTIONS_SUCCESS, data: response })
    }
    else {
      yield put({ type: GET_PARTICIPANT_SUGGESTIONS_SUCCESS, data: [] })
    }
  } catch (error) {
    yield put({ type: GET_PARTICIPANT_SUGGESTIONS_ERROR, error })
  }
}

function* messagesConversationWatcher() {
  yield fork(takeLatest, GET_PARTICIPANT_SUGGESTIONS, getParticipantsFlow)
}

export default messagesConversationWatcher
