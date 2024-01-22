import {
  MANAGED_PROFILE_REPORTS_REQUESTING,
  MANAGED_PROFILE_REPORTS_REQUEST_SUCCESS,
  MANAGED_PROFILE_REPORTS_REQUEST_ERROR
} from './constants'

export const reportOrganizationBusinessTypesRequesting = (client) => ({
  type: MANAGED_PROFILE_REPORTS_REQUESTING,
  client,
})

export const reportOrganizationBusinessTypesRequestSuccess = (data) => ({
  type: MANAGED_PROFILE_REPORTS_REQUEST_SUCCESS,
  data,
})

export const reportOrganizationBusinessTypesRequestError = (error) => ({
  type: MANAGED_PROFILE_REPORTS_REQUEST_ERROR,
  error,
})