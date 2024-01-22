import { fork, call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import Axios from 'axios'

import { map, uniqWith } from 'lodash'

import {
  ACTIVITY_FEED_REQUESTING,
  ACTIVITY_FEED_REQUEST_SUCCESS,
  ACTIVITY_FEED_REQUEST_ERROR,

  DASHBOARD_STATS_REQUESTING,
  DASHBOARD_STATS_REQUEST_SUCCESS,
  DASHBOARD_STATS_REQUEST_ERROR,

  CONNECTION_REQUESTS_LIST_REQUESTING,
  CONNECTION_REQUESTS_LIST_REQUEST_SUCCESS,
  CONNECTION_REQUESTS_LIST_REQUEST_ERROR,

  ACCEPT_DENY_CONNECTION_REQUEST,
  ACCEPT_DENY_CONNECTION_REQUEST_SUCCESS,
  ACCEPT_DENY_CONNECTION_REQUEST_ERROR,
} from './constants'

const getActivityFeedUrl = `${process.env.REACT_APP_API_URL}/accounts/activity_feeds/`

function getActivityFeedApi(client, data) {
  return Axios({
    url: getActivityFeedUrl,
    method: 'post',
    headers: { Authorization: "Bearer " + client.token || undefined },
  })
  .then(response => response.data)
  .then(json =>
    uniqWith(map(json.hits.hits, (item) => Object.assign(item._source, { created_at: new Date(item._source.created_at) })),
            (item1, item2) => //only keep activity feeds that aren't the same as the previous one and are on different days
              item1.verb === item2.verb &&
              item1.actee.id === item2.actee.id &&
              item1.actor.id === item2.actor.id &&
              item1.created_at.getFullYear() === item2.created_at.getFullYear() &&
              item1.created_at.getMonth() === item2.created_at.getMonth() &&
              item1.created_at.getDate() === item2.created_at.getDate()
            )
  )
}

function* getActivityFeedFlow(action) {
  try {
    const { client, data } = action
    const response = yield call(getActivityFeedApi, client, data)

    yield put({ type: ACTIVITY_FEED_REQUEST_SUCCESS, response })
  } catch (error) {
    yield put({ type: ACTIVITY_FEED_REQUEST_ERROR, error })
  }
}


const getDashboardStatsUrl = `${process.env.REACT_APP_API_URL}/accounts/dashboard_stats/`

function getDashboardStatsApi(client, data) {
  return Axios({
    url: getDashboardStatsUrl,
    method: 'get',
    headers: { Authorization: "Bearer " + client.token || undefined },
  })
    .then(response => response.data)
    .then(json => json)
}

function* getDashboardStatsFlow(action) {
  try {
    const { client, data } = action
    const response = yield call(getDashboardStatsApi, client, data)

    yield put({ type: DASHBOARD_STATS_REQUEST_SUCCESS, response })
  } catch (error) {
    yield put({ type: DASHBOARD_STATS_REQUEST_ERROR, error })
  }
}

const getConnectionRequestsUrl = `${process.env.REACT_APP_API_URL}/accounts/connection_requests_list/`

function getConnectionRequestsApi(client, data) {
  return Axios({
    url: getConnectionRequestsUrl,
    method: 'get',
    headers: { Authorization: "Bearer " + client.token || undefined },
  })
    .then(response => response.data)
    .then(json => json)
}

function* getConnectionRequestsFlow(action) {
  try {
    const { client, data } = action
    const response = yield call(getConnectionRequestsApi, client, data)

    yield put({ type: CONNECTION_REQUESTS_LIST_REQUEST_SUCCESS, response })
  } catch (error) {
    yield put({ type: CONNECTION_REQUESTS_LIST_REQUEST_ERROR, error })
  }
}

const acceptDenyConnectionRequestUrl = `${process.env.REACT_APP_API_URL}/accounts/accept_connection_request/`

function acceptDenyConnectionRequestApi(client, data) {
  return Axios({
    url: acceptDenyConnectionRequestUrl,
    method: 'post',
    headers: { Authorization: "Bearer " + client.token || undefined },
    data: {
      id: data.id,
      accept: data.accept,
    }
  })
    .then(response => response.data)
    .then(json => json)
}

function* acceptDenyConnectionRequestFlow(action) {
  try {
    const { client, data } = action
    const response = yield call(acceptDenyConnectionRequestApi, client, data)

    yield put({ type: ACCEPT_DENY_CONNECTION_REQUEST_SUCCESS, response, accept: data.accept })
    yield put({ type: CONNECTION_REQUESTS_LIST_REQUESTING, client })
  } catch (error) {
    yield put({ type: ACCEPT_DENY_CONNECTION_REQUEST_ERROR, error })
  }
}

function* messagesWatcher() {
  yield fork(takeLatest, ACTIVITY_FEED_REQUESTING, getActivityFeedFlow)
  yield fork(takeLatest, DASHBOARD_STATS_REQUESTING, getDashboardStatsFlow)
  yield fork(takeLatest, CONNECTION_REQUESTS_LIST_REQUESTING, getConnectionRequestsFlow)
  yield fork(takeEvery, ACCEPT_DENY_CONNECTION_REQUEST, acceptDenyConnectionRequestFlow)
}

export default messagesWatcher
