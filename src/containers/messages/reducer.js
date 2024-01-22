import ReactGA from 'react-ga'

import {
  USER_MESSAGES_REQUESTING,
  USER_MESSAGES_SUCCESS,
  USER_MESSAGES_ERROR,

  CONVERSATION_REQUESTING,
  CONVERSATION_REQUEST_SUCCESS,
  CONVERSATION_REQUEST_ERROR,

  BLOCK_CONVERSATION_REQUESTING,
  BLOCK_CONVERSATION_REQUEST_SUCCESS,
  BLOCK_CONVERSATION_REQUEST_ERROR,

  MESSAGE_SENDING,
  MESSAGE_SEND_SUCCESS,
  MESSAGE_SEND_ERROR,

  MESSAGE_FILE_UPLOAD_REQUEST,
  MESSAGE_FILE_UPLOAD_SUCCESS,
  MESSAGE_FILE_UPLOAD_ERROR,
  CLEAR_MESSAGE_FILE,

  UNREAD_MESSAGES_REQUESTING,
  UNREAD_MESSAGES_REQUEST_SUCCESS,
  UNREAD_MESSAGES_REQUEST_ERROR,

  CLEAR_SEND_MESSAGE_NOTIFICATION,
} from './constants'

import {
  LOGOUT
} from '../login/constants'

import {
  HIJACK_REQUESTING
} from '../../components/hijack/constants'

const initialState = {
  current: {},
  conversations: {},
  user_messages: {},
  lastUserMessagesFetchTime: undefined,
  requesting: false,
  fetchRequest: false, //this is used by the messages/index.js UI to know when to show a loading screen
  successful: false,
  notify: false,
  unread: null,
  file_id: [],
  uploadRequesting: false,
  uploadSuccessful: false,
  uploadFailed: false,
  messages: [],
  errors: [],
}

const reducer = function messagesReducer (state = initialState, action) {
  switch (action.type) {

    case USER_MESSAGES_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [{ body: 'Getting user messages...', time: new Date() }],
        errors: [],
      }

  case USER_MESSAGES_SUCCESS:
      return {
        ...state,
        user_messages: action.response,
        errors: [],
        messages: [],
        requesting: false,
        successful: true,
        lastUserMessagesFetchTime: new Date(),
      }

  case USER_MESSAGES_ERROR:
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

    case CONVERSATION_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        fetchRequest: true,
        messages: [{ body: 'Getting conversation...', time: new Date() }],
        errors: [],
      }

    case CONVERSATION_REQUEST_SUCCESS:
      return {
        ...state,
        conversations: action.response,
        errors: [],
        messages: [],
        requesting: false,
        fetchRequest: false,
        successful: true,
      }

    case CONVERSATION_REQUEST_ERROR:
      return {
        ...state,
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
        messages: [],
        requesting: false,
        fetchRequest: false,
        successful: false,
      }

    case BLOCK_CONVERSATION_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [{ body: 'Blocking conversation...', time: new Date() }],
        errors: [],
      }

    case BLOCK_CONVERSATION_REQUEST_SUCCESS:
      let user_messages = JSON.parse(JSON.stringify(state.user_messages))
      for (let i = 0; i < user_messages.results.length; i++) {
        if (action.data.conversation_id === user_messages.results[i].id) {
          user_messages.results[i].silenced = action.data.silenced;
          break;
        }
      }

      if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'development') {
        ReactGA.event({
          category: 'Messages',
          action: action.data.silenced ? 'Blocked a conversation' : 'Unblocked a conversation',
        })
      }

      return {
        ...state,
        errors: [],
        messages: [],
        user_messages,
        requesting: false,
        successful: true,
      }

    case BLOCK_CONVERSATION_REQUEST_ERROR:
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

    case MESSAGE_SENDING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [{ body: 'Sending message...', time: new Date() }],
        errors: [],
      }

    case MESSAGE_SEND_SUCCESS:
      if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'development') {
        ReactGA.event({
          category: 'Messages',
          action: 'Sent a message',
        })
      }

      return {
        ...state,
        errors: [],
        messages: [],
        file_id: [],
        requesting: false,
        successful: true,
        notify: true,
      }

    case MESSAGE_SEND_ERROR:
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

    case MESSAGE_FILE_UPLOAD_REQUEST:
      return {
        ...state,
        file_id: [],
        uploadRequesting: true,
        uploadFailed: false,
        uploadSuccessful: false,
        messages: [{ body: `Uploading ${action.data.files.length} files`, time: new Date() }],
        errors: [],
      }

    case MESSAGE_FILE_UPLOAD_SUCCESS:
      return {
        ...state,
        file_id: action.data,
        errors: [],
        messages: [],
        uploadRequesting: false,
        uploadFailed: false,
        uploadSuccessful: true
      }

    case MESSAGE_FILE_UPLOAD_ERROR:
      return {
        ...state,
        file_id: [],
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
        messages: [],
        uploadRequesting: false,
        uploadFailed: true,
        uploadSuccessful: false,
      }

    case CLEAR_MESSAGE_FILE:
      return {
        ...state,
        file_id: [],
        errors: [],
        messages: [{ body: 'Clearing attachments...', time: new Date() }],
        uploadRequesting: false,
        uploadFailed: false,
        uploadSuccessful: false,
      }

    case UNREAD_MESSAGES_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [{ body: 'Getting unread messages...', time: new Date() }],
        errors: [],
      }

    case UNREAD_MESSAGES_REQUEST_SUCCESS:
      return {
        ...state,
        unread: action.response,
        errors: [],
        messages: [],
        requesting: false,
        successful: true,
      }

    case UNREAD_MESSAGES_REQUEST_ERROR:
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

    case CLEAR_SEND_MESSAGE_NOTIFICATION:
      return {
        ...state,
        notify: false,
      }

    case LOGOUT:
    case HIJACK_REQUESTING:
      return initialState

    default:
      return state
  }
}

export default reducer
