import { CLIENT_SET, CLIENT_UNSET } from './constants'
import jwt_decode from 'jwt-decode'

const initialSate = {
  username: null,
  user_id: null,
  email: null,
  exp: null,
  account_id: null,
  token: null,
}

const reducer = function clientReducer (state = initialSate, action) {
  switch (action.type) {
    case CLIENT_SET:
      const decoded = jwt_decode(action.token)
      const raw = JSON.parse(action.token).token
      return {
        username: decoded.username,
        user_id: decoded.user_id,
        email: decoded.email,
        exp: decoded.exp,
        account_id: decoded.account_id,
        token: raw,
      }

    case CLIENT_UNSET:
      return {
        username: null,
        user_id: null,
        email: null,
        exp: null,
        account_id: null,
        token: null,
      }

    default:
      return state
  }
}

export default reducer
