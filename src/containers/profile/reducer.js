import { filter } from 'lodash'

import {
  PROFILE_REQUESTING,
  PROFILE_REQUEST_SUCCESS,
  PROFILE_REQUEST_ERROR,

  BASIC_PROFILE_REQUESTING,
  BASIC_PROFILE_REQUEST_SUCCESS,
  BASIC_PROFILE_REQUEST_ERROR,

  PUBLIC_PROFILE_REQUESTING,
  PUBLIC_PROFILE_REQUEST_SUCCESS,
  PUBLIC_PROFILE_REQUEST_ERROR,

  FEATURED_PROFILES_REQUESTING,
  FEATURED_PROFILES_REQUEST_SUCCESS,
  FEATURED_PROFILES_REQUEST_ERROR,

  NEW_PROFILES_REQUESTING,
  NEW_PROFILES_REQUEST_SUCCESS,
  NEW_PROFILES_REQUEST_ERROR,

  DELETE_CONNECTION_REQUESTING,
  DELETE_CONNECTION_REQUEST_SUCCESS,
  DELETE_CONNECTION_REQUEST_ERROR,

  PROFILE_FILE_UPLOAD_REQUEST,
  PROFILE_FILE_UPLOAD_REQUEST_SUCCESS,
  PROFILE_FILE_UPLOAD_REQUEST_ERROR,

  PROFILE_FILE_DELETE_REQUEST,
  PROFILE_FILE_DELETE_REQUEST_SUCCESS,
  PROFILE_FILE_DELETE_REQUEST_ERROR,
} from './constants'

import {
  LOGOUT
} from '../login/constants'

import {
  HIJACK_REQUESTING
} from '../../components/hijack/constants'

const initialState = {
  current: {},
  authed: {},
  featured: {},
  newProfiles: {},
  fetch_public_profile : {
    requesting: false,
    successful: false,
    error: false,
  },
  requesting: false,
  successful: false,
  uploadRequesting: false,
  uploadSuccessful: false,
  editing: false,
  profileFiles: [],
  messages: [],
  errors: [],
}

const reducer = function profileReducer (state = initialState, action) {
  switch (action.type) {
    case PROFILE_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        editing: false,
        messages: [{
          body: "Profile being requested",
          time: new Date(),
        }],
        errors: [],
      }

    case PROFILE_REQUEST_SUCCESS:
      return {
        ...state,
        current: action.profile,
        requesting: false,
        successful: true,
        editing: false,
        messages: [{
          body: "Successfully retreieved profile!",
          time: new Date(),
        }],
        errors: [],
      }
    
    case PROFILE_REQUEST_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        editing: false,
        messages: [],
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
      }

    case BASIC_PROFILE_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        editing: false,
        messages: [{
          body: "Basic profile for authed user being requested",
          time: new Date(),
        }],
        errors: [],
      }

    case BASIC_PROFILE_REQUEST_SUCCESS:
      return {
        ...state,
        authed: action.profile,
        requesting: false,
        successful: true,
        editing: false,
        messages: [{
          body: "Successfully retreieved basic profile!",
          time: new Date(),
        }],
        errors: [],
      }

    case BASIC_PROFILE_REQUEST_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        editing: false,
        messages: [],
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
      }

    case PUBLIC_PROFILE_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        fetch_public_profile : {
          requesting: true,
          successful: false,
          error: false,
        },
        editing: false,
        messages: [{
          body: "Public profile being requested",
          time: new Date(),
        }],
        errors: [],
      }

    case PUBLIC_PROFILE_REQUEST_SUCCESS:
      return {
        ...state,
        current: action.profile,
        requesting: false,
        successful: true,
        fetch_public_profile : {
          requesting: false,
          successful: true,
          error: false,
        },
        editing: false,
        messages: [{
          body: "Successfully retreieved public profile!",
          time: new Date(),
        }],
        errors: [],
      }

    case PUBLIC_PROFILE_REQUEST_ERROR:
      return {
        ...state,
        current: {},
        requesting: false,
        successful: false,
        fetch_public_profile : {
          requesting: false,
          successful: false,
          error: true,
        },
        editing: false,
        messages: [],
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
      }

    case FEATURED_PROFILES_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        editing: false,
        messages: [{
          body: "Featured profiles being requested",
          time: new Date(),
        }],
        errors: [],
      }

    case FEATURED_PROFILES_REQUEST_SUCCESS:
      return {
        ...state,
        featured: action.featured,
        requesting: false,
        successful: true,
        editing: false,
        messages: [{
          body: "Successfully retreieved featured profiles!",
          time: new Date(),
        }],
        errors: [],
      }

    case FEATURED_PROFILES_REQUEST_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        editing: false,
        messages: [],
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
      }

    case NEW_PROFILES_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        editing: false,
        messages: [{
          body: "New profiles being requested",
          time: new Date(),
        }],
        errors: [],
      }

    case NEW_PROFILES_REQUEST_SUCCESS:
      return {
        ...state,
        newProfiles: action.data,
        requesting: false,
        successful: true,
        editing: false,
        messages: [{
          body: "Successfully retreieved new profiles!",
          time: new Date(),
        }],
        errors: [],
      }

    case NEW_PROFILES_REQUEST_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        editing: false,
        messages: [],
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
      }

    case DELETE_CONNECTION_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        editing: false,
        messages: [{
          body: "Connection deletion being requested",
          time: new Date(),
        }],
        errors: [],
      }

    case DELETE_CONNECTION_REQUEST_SUCCESS:
      const organizations = [...state.current.organizations]
      const oi = state.current.organizations.findIndex(org => org.connection === action.connection_id)
      if (oi !== -1) {
        organizations.splice(oi, 1)
      }
      const accounts = [...state.current.accounts]
      const ai = state.current.accounts.findIndex(acc => acc.connection === action.connection_id)
      if (ai !== -1) {
        accounts.splice(ai, 1)
      }
      return {
        ...state,
        current: {
          ...state.current,
          organizations,
          accounts
        },
        featured: action.featured,
        requesting: false,
        successful: true,
        editing: false,
        messages: [{
          body: "Successfully deleted connection!",
          time: new Date(),
        }],
        errors: [],
      }

    case DELETE_CONNECTION_REQUEST_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        editing: false,
        messages: [],
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
      }

    case PROFILE_FILE_UPLOAD_REQUEST:
      return {
        ...state,
        uploadRequesting: true,
        uploadSuccessful: false,
        messages: [{
          body: "Fetching files for current profile!",
          time: new Date(),
        }],
        errors: [],
      }

    case PROFILE_FILE_UPLOAD_REQUEST_SUCCESS:
      return {
        ...state,
        current: {
          ...state.current,
          files: state.current.files.concat(action.data.response),
        },
        uploadRequesting: false,
        uploadSuccessful: true,
        messages: [],
        errors: [],
      }

    case PROFILE_FILE_UPLOAD_REQUEST_ERROR:
      return {
        ...state,
        uploadRequesting: false,
        uploadSuccessful: false,
        messages: [],
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
      }

    case PROFILE_FILE_DELETE_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [{
          body: "Deleting file id for current profile!",
          time: new Date(),
        }],
      }

    case PROFILE_FILE_DELETE_REQUEST_SUCCESS:
      return {
        ...state,
        current: {
          ...state.current,
          files: filter(state.current.files, (file) => file.id !== action.data.file_id),
        },
        requesting: false,
        successful: true,
        messages: [],
        errors: [],
      }

    case PROFILE_FILE_DELETE_REQUEST_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: [],
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
      }

    case LOGOUT:
    case HIJACK_REQUESTING:
      return initialState

    default:
      return state
  }
}

export default reducer
