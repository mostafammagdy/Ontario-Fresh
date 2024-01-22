import {
  SAVE_USER_REQUESTING,
  SAVE_USER_REQUEST_SUCCESS,
  SAVE_USER_REQUEST_ERROR,
  OPEN_EMAIL_MODAL,
  CLOSE_EMAIL_MODAL
} from './constants';

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
  open: false
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case SAVE_USER_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [...state.messages, {
          body: "Saving user settings",
          time: new Date(),
        }],
        errors: state.errors,
      };
    case SAVE_USER_REQUEST_SUCCESS:
      return {
        ...state,
        requesting: false,
        successful: true,
        open: false,
        messages: [...state.messages, {
          body: "Successfully saved user settings!",
          time: new Date(),
        }],
        errors: state.errors,
      };
    case SAVE_USER_REQUEST_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: state.messages,
        errors: [...state.errors, {
          body: action.error.toString(),
          time: new Date(),
        }],
      };

    //open and close modal are handled by the reducer for this component so that errors can be shown
    case OPEN_EMAIL_MODAL:
      return {
        ...state,
        open: true
      };
    case CLOSE_EMAIL_MODAL:
      return {
        ...state,
        open: false
      };
    default:
      return state;
  }
}

export default reducer;