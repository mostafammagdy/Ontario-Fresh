import { fork, call, put, takeLatest } from 'redux-saga/effects'
import Axios from 'axios'

import {
  MANAGED_PROFILE_REPORTS_REQUESTING,
  MANAGED_PROFILE_REPORTS_REQUEST_SUCCESS,
  MANAGED_PROFILE_REPORTS_REQUEST_ERROR,
} from './constants'

const businessTypesReportUrl = `${process.env.REACT_APP_API_URL}/accounts/reports/organization/business_types/`
const categoriesByBusinessTypeReportUrl = `${process.env.REACT_APP_API_URL}/accounts/reports/organization/categories_by_business_type/`

function getManagedProfilesReports(client, slug) {
  return Promise.all([
    Axios({
      url: businessTypesReportUrl,
      method: 'get',
      headers: { Authorization: "Bearer " + client.token || undefined },
      params: {
        slug
      }
    }),
    Axios({
      url: categoriesByBusinessTypeReportUrl,
      method: 'get',
      headers: { Authorization: "Bearer " + client.token || undefined },
      params: {
        slug
      }
    })
  ]);
  // .then(([a, b]) => [a.data, b.data])
  // .then(json => json.map(data => ({count: data.count, role: roles[data.role]})))
}

function* getManagedProfilesReportsFlow(action) {
  try {
    const { client } = action
    const [businessTypesResponse, categoriesByBusinessTypeResponse] = yield call(getManagedProfilesReports, client)

    yield put({ type: MANAGED_PROFILE_REPORTS_REQUEST_SUCCESS, response: {
      businessTypes: businessTypesResponse.data,
      categoriesByBusinessType: categoriesByBusinessTypeResponse.data,
      availableBusinessTypes: Object.keys(categoriesByBusinessTypeResponse.data.reduce((acc, datum) => ({...acc, [datum.role]: true}), {})).map(key => +key)
    }})
  } catch (error) {
    yield put({ type: MANAGED_PROFILE_REPORTS_REQUEST_ERROR, error })
  }
}


function* profileManagerReportsWatcher() {
  yield fork(takeLatest, MANAGED_PROFILE_REPORTS_REQUESTING, getManagedProfilesReportsFlow)
}

export default profileManagerReportsWatcher
