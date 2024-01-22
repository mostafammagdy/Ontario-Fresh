import {
  MESSAGE_ALL,
  MESSAGE_ALL_SUCCESS,
  MESSAGE_ALL_ERROR,

  CLEAR_MESSAGE_ALL_NOTIFICATION,

  MESSAGE_ALL_FILE_UPLOAD_REQUEST,
  MESSAGE_ALL_FILE_UPLOAD_SUCCESS,
  MESSAGE_ALL_FILE_UPLOAD_ERROR,
  CLEAR_MESSAGE_ALL_FILE
} from './constants'

const initialState = {
  requesting: false,
  successful: false,
  editing: false,
  notify: false,
  messages: [],
  file_id: [],
  uploadRequesting: false,
  uploadSuccessful: false,
  uploadFailed: false,
  errors: [],
}

const reducer = function manageContactsReducer (state = initialState, action) {
  switch (action.type) {

    case MESSAGE_ALL:
      return {
        ...state,
        requesting: true,
        successful: false,
        editing: false,
        notify: false,
        messages: [{
          body: "Sending messages to all members",
          time: new Date(),
        }],
        errors: [],
      }

    case MESSAGE_ALL_SUCCESS:
      return {
        requesting: false,
        successful: true,
        editing: false,
        notify: true,
        messages: [{
          body: "Successfully sent all messages!",
          time: new Date(),
        }],
        errors: [],
      }

    case MESSAGE_ALL_ERROR:
      return {
        requesting: false,
        successful: false,
        editing: false,
        messages: [],
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
      }

    case MESSAGE_ALL_FILE_UPLOAD_REQUEST:
      return {
        ...state,
        file_id: [],
        uploadRequesting: true,
        uploadFailed: false,
        uploadSuccessful: false,
        messages: [{ body: `Uploading ${action.data.files.length} files for message all`, time: new Date() }],
        errors: [],
      }

    case MESSAGE_ALL_FILE_UPLOAD_SUCCESS:
      return {
        ...state,
        file_id: action.data,
        errors: [],
        messages: [],
        uploadRequesting: false,
        uploadFailed: false,
        uploadSuccessful: true
      }

    case MESSAGE_ALL_FILE_UPLOAD_ERROR:
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

    case CLEAR_MESSAGE_ALL_FILE:
      return {
        ...state,
        file_id: [],
        errors: [],
        messages: [{ body: 'Clearing attachments for message all...', time: new Date() }],
        uploadRequesting: false,
        uploadFailed: false,
        uploadSuccessful: false,
      }

    case CLEAR_MESSAGE_ALL_NOTIFICATION:
      return {
        ...state,
        notify: false
      }

    default:
      return state
  }
}

export default reducer
