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

export const activityFeedRequest = function activityFeedRequest(client) {
  return {
    type: ACTIVITY_FEED_REQUESTING,
    client,
  }
}

export const activityFeedRequestSuccess = function activityFeedRequestSuccess(data) {
  return {
    type: ACTIVITY_FEED_REQUEST_SUCCESS,
    data,
  }
}

export const activityFeedRequestError = function activityFeedRequestError(error) {
  return {
    type: ACTIVITY_FEED_REQUEST_ERROR,
    error,
  }
}

export const dashboardStatsRequest = function dashboardStatsRequest(client) {
  return {
    type: DASHBOARD_STATS_REQUESTING,
    client,
  }
}

export const dashboardStatsRequestSuccess = function dashboardStatsRequestSuccess(data) {
  return {
    type: DASHBOARD_STATS_REQUEST_SUCCESS,
    data,
  }
}

export const dashboardStatsRequestError = function dashboardStatsRequestError(error) {
  return {
    type: DASHBOARD_STATS_REQUEST_ERROR,
    error,
  }
}

export const connectionRequestsListRequest = function connectionRequestsListRequest(client) {
  return {
    type: CONNECTION_REQUESTS_LIST_REQUESTING,
    client,
  }
}

export const connectionRequestsListRequestSuccess = function connectionRequestsListRequestSuccess(data) {
  return {
    type: CONNECTION_REQUESTS_LIST_REQUEST_SUCCESS,
    data,
  }
}

export const connectionRequestsListRequestError = function connectionRequestsListRequestError(error) {
  return {
    type: CONNECTION_REQUESTS_LIST_REQUEST_ERROR,
    error,
  }
}

export const acceptDenyConnectionRequest = function acceptDenyConnectionRequest(client, data) {
  return {
    type: ACCEPT_DENY_CONNECTION_REQUEST,
    client,
    data,
  }
}

export const acceptDenyConnectionRequestSuccess = function acceptDenyConnectionRequestSuccess(data, accept) {
  return {
    type: ACCEPT_DENY_CONNECTION_REQUEST_SUCCESS,
    data,
    accept,
  }
}

export const acceptDenyConnectionRequestError = function acceptDenyConnectionRequestError(error) {
  return {
    type: ACCEPT_DENY_CONNECTION_REQUEST_ERROR,
    error,
  }
}
