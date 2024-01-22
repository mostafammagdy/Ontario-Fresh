import ReactGA from 'react-ga'

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

import {
  LOGOUT
} from '../login/constants'

import {
  HIJACK_REQUESTING
} from '../../components/hijack/constants'

const initialState = {
  feed: {},
  stats: {},
  connection_requests: {},
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
}

const reducer = function messagesReducer (state = initialState, action) {
  switch (action.type) {

    case ACTIVITY_FEED_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [{ body: 'Getting activity feed...', time: new Date() }],
        errors: [],
      }

    case ACTIVITY_FEED_REQUEST_SUCCESS:
      return {
        ...state,
        feed: action.response,
        errors: [],
        messages: [],
        requesting: false,
        successful: true,
      }

    case ACTIVITY_FEED_REQUEST_ERROR:
      return {
        ...state,
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
        messages: [],
        requesting: false,
        successful: false,
      }

    case DASHBOARD_STATS_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [{ body: 'Getting activity feed...', time: new Date() }],
        errors: [],
      }

    case DASHBOARD_STATS_REQUEST_SUCCESS:
      return {
        ...state,
        stats: action.response,
        errors: [],
        messages: [],
        requesting: false,
        successful: true,
      }

    case DASHBOARD_STATS_REQUEST_ERROR:
      return {
        ...state,
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
        messages: [],
        requesting: false,
        successful: false,
      }

    case CONNECTION_REQUESTS_LIST_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [{ body: 'Getting connection requests...', time: new Date() }],
        errors: [],
      }

    case CONNECTION_REQUESTS_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        connection_requests: action.response,
        errors: [],
        messages: [],
        requesting: false,
        successful: true,
      }

    case CONNECTION_REQUESTS_LIST_REQUEST_ERROR:
      return {
        ...state,
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
        messages: [],
        requesting: false,
        successful: false,
      }

    case ACCEPT_DENY_CONNECTION_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [{ body: 'Setting connection request status...', time: new Date() }],
        errors: [],
      }

    case ACCEPT_DENY_CONNECTION_REQUEST_SUCCESS:
      if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'development') {
        ReactGA.event({
          category: 'Connections',
          action: action.accept ? 'Accepted a connection' : 'Denied a connection',
        })
      }

      return {
        ...state,
        errors: [],
        messages: [],
        requesting: false,
        successful: true,
      }

    case ACCEPT_DENY_CONNECTION_REQUEST_ERROR:
      return {
        ...state,
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
        messages: [],
        requesting: false,
        successful: false,
      }

    case LOGOUT:
    case HIJACK_REQUESTING:
      return initialState

    default:
      return state
  }
}

export default reducer
