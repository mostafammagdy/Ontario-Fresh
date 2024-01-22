import {
  PROFILE_CONNECTIONS_REQUESTING,
  PROFILE_CONNECTIONS_REQUEST_SUCCESS,
  PROFILE_CONNECTIONS_REQUEST_ERROR,

} from './constants'

export const profileConnectionsRequest = function profileConnectionsRequest (client, slug) {
  return {
    type: PROFILE_CONNECTIONS_REQUESTING,
    client,
    slug
  }
}

export const profileConnectionsRequestSuccess = function profileConnectionsRequestSuccess (connections) {
  return {
    type: PROFILE_CONNECTIONS_REQUEST_SUCCESS,
    connections,
  }
}

export const profileConnectionsRequestError = function profileConnectionsRequestError (error) {
  return {
    type: PROFILE_CONNECTIONS_REQUEST_ERROR,
    error,
  }
}
