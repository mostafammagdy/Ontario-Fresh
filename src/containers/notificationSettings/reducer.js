import {
  NOTIFICATION_SETTING_UPDATE_REQUESTING,
  NOTIFICATION_SETTING_UPDATE_REQUEST_SUCCESS,
  NOTIFICATION_SETTING_UPDATE_REQUEST_ERROR,
  NOTIFICATION_SETTINGS_REQUESTING,
  NOTIFICATION_SETTINGS_REQUEST_SUCCESS,
  NOTIFICATION_SETTINGS_REQUEST_ERROR
} from "./constants";

const initialState = {
  settings: [],
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case NOTIFICATION_SETTINGS_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [...state.messages, {
          body: "Retriving notification settings",
          time: new Date(),
        }],
        errors: state.errors,
      }
    case NOTIFICATION_SETTINGS_REQUEST_SUCCESS:
      return {
        ...state,
        settings: action.settings.sort((a, b) => a.verb - b.verb),
        requesting: false,
        successful: true,
        messages: [...state.messages, {
          body: "Successfully retreieved notification settings!",
          time: new Date(),
        }],
        errors: state.errors,
      }
    case NOTIFICATION_SETTINGS_REQUEST_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: state.messages,
        errors: [...state.errors, {
          body: action.error.toString(),
          time: new Date(),
        }],
      }
    case NOTIFICATION_SETTING_UPDATE_REQUESTING:
      return {
        ...state,
        settings: [
          ...state.settings.filter(setting => setting.verb !== action.setting),
          {
            verb: action.setting,
            enable: action.value
          }
        ].sort((a, b) => a.verb - b.verb),
        requesting: true,
        successful: false,
        messages: [...state.messages, {
          body: "Updating notification settings",
          time: new Date(),
        }],
        errors: state.errors,
      }
    case NOTIFICATION_SETTING_UPDATE_REQUEST_SUCCESS:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: [...state.messages, {
          body: "Successfully updated notification settings!",
          time: new Date(),
        }],
        errors: state.errors,
      }
    case NOTIFICATION_SETTING_UPDATE_REQUEST_ERROR:
      return {
        ...state,
        settings: [
          ...state.settings.filter(setting => setting.verb !== action.setting),
          {
            verb: action.setting,
            enable: action.oldValue
          }
        ].sort((a, b) => a.verb - b.verb),
        requesting: false,
        successful: false,
        messages: state.messages,
        errors: [...state.errors, {
          body: action.error.toString(),
          time: new Date(),
        }],
      }

    default:
      return state;
  }
}

export default reducer;