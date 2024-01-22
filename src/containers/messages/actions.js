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

export const userMessagesRequest = function userMessagesRequest(client) {
  return {
    type: USER_MESSAGES_REQUESTING,
    client,
  }
}

export const userMessagesRequestSuccess = function userMessagesRequestSuccess(data) {
  return {
    type: USER_MESSAGES_SUCCESS,
    data,
  }
}

export const userMessagesRequestError = function userMessagesRequestError(error) {
  return {
    type: USER_MESSAGES_ERROR,
    error,
  }
}

export const conversationRequest = function conversationRequest(client, data) {
  return {
    type: CONVERSATION_REQUESTING,
    client,
    data,
  }
}

export const conversationRequestSuccess = function conversationRequestSuccess(data) {
  return {
    type: CONVERSATION_REQUEST_SUCCESS,
    data,
  }
}

export const conversationRequestError = function conversationRequestError(error) {
  return {
    type: CONVERSATION_REQUEST_ERROR,
    error,
  }
}

export const blockConversationRequest = function blockConversationRequest(client, data) {
  return {
    type: BLOCK_CONVERSATION_REQUESTING,
    client,
    data,
  }
}

export const blockConversationRequestSuccess = function blockConversationRequestSuccess(data) {
  return {
    type: BLOCK_CONVERSATION_REQUEST_SUCCESS,
    data,
  }
}

export const blockConversationRequestError = function blockConversationRequestError(error) {
  return {
    type: BLOCK_CONVERSATION_REQUEST_ERROR,
    error,
  }
}


export const sendMessage = function sendMessage(client, data) {
  return {
    type: MESSAGE_SENDING,
    client,
    data,
  }
}

export const sendMessageSuccess = function sendMessageSuccess(data) {
  return {
    type: MESSAGE_SEND_SUCCESS,
    data,
  }
}

export const sendMessageError = function sendMessageError(error) {
  return {
    type: MESSAGE_SEND_ERROR,
    error,
  }
}

export const fileUploadRequest = function fileUploadRequest(client, data) {
  return {
    type: MESSAGE_FILE_UPLOAD_REQUEST,
    client,
    data
  }
}

export const fileUploadSuccess = function fileUploadSuccess(data) {
  return {
    type: MESSAGE_FILE_UPLOAD_SUCCESS,
    data
  }
}

export const fileUploadError = function fileUploadError(error) {
  return {
    type: MESSAGE_FILE_UPLOAD_ERROR,
    error
  }
}

export const clearMessageFile = function clearMessageFile() {
  return {
    type: CLEAR_MESSAGE_FILE
  }
}

export const unreadMessagesRequest = function unreadMessagesRequest(client) {
  return {
    type: UNREAD_MESSAGES_REQUESTING,
    client,
  }
}

export const unreadMessagesRequestSuccess = function unreadMessagesRequestSuccess(data) {
  return {
    type: UNREAD_MESSAGES_REQUEST_SUCCESS,
    data,
  }
}

export const unreadMessagesRequestError = function unreadMessagesRequestError(error) {
  return {
    type: UNREAD_MESSAGES_REQUEST_ERROR,
    error,
  }
}



export const clearSendMessageNotification = function clearSendMessageNotification() {
  return {
    type: CLEAR_SEND_MESSAGE_NOTIFICATION,
  }
}
