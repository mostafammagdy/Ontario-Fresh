import {
  GET_PARTICIPANT_SUGGESTIONS,
  GET_PARTICIPANT_SUGGESTIONS_SUCCESS,
  GET_PARTICIPANT_SUGGESTIONS_ERROR
} from './constants'

export const getParticipantSuggestions = function getParticipantSuggestions(client, data) {
  return {
    type: GET_PARTICIPANT_SUGGESTIONS,
    client,
    data
  }
}

export const getParticipantSuggestionsSuccess = function getParticipantSuggestionsSuccess(data) {
  return {
    type: GET_PARTICIPANT_SUGGESTIONS_SUCCESS,
    data
  }
}

export const getParticipantSuggestionsError = function getParticipantSuggestionsError(error) {
  return {
    type: GET_PARTICIPANT_SUGGESTIONS_ERROR,
    error
  }
}
