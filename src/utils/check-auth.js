import { setClient } from './client/actions'
import jwt_decode from 'jwt-decode'

function checkAuthorization (dispatch) {
  // attempt to grab the token from localstorage
  const storedToken = localStorage.getItem('jwt')

  // if it exists
  if (storedToken) {
    const decoded = jwt_decode(storedToken)
    const expiry = decoded.exp

    if (expiry <= (Date.now()/1000|0)) return false

    // otherwise, dispatch the token to our setClient action
    // which will update our redux state with the token and return true
    dispatch(setClient(storedToken))
    return true
  }
  return false
}

export function checkIndexAuthorization ({ dispatch }) {
  // by having a function that returns a function we satisfy 2 goals:
  //
  // 1. grab access to our Redux Store and thus Dispatch to call actions
  // 2. Return a function that includes all the proper .. properties that
  //    React Router expects for us to include and use
  //
  // `nextState` - the next "route" we're navigating to in the router
  // `replace` - a helper to change the route
  // `next` - what we call when we're done messing around
  //
  return (nextState, replace, next) => {
    // If we pass the authentication check, cool
    checkAuthorization(dispatch)
    return next()
  }
}

//This function is borrowed from https://html-online.com/articles/get-url-parameters-javascript/
function getUrlVars() {
  var vars = {};
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
  });
  return vars;
}

export function checkLoginAuthorization ({ dispatch, getState }) {

  return (nextState, replace, next) => {
    // reference to the `client` piece of state
    const client = getState().client

    // is it defined and does it have a token? good, go ahead to dashboard
    if (client && client.token) return next()

    // not set yet?  Let's try and set it and if so, go ahead to dashboard
    if (checkAuthorization(dispatch)) return next()

    // nope?  okay back to login
    if (!getUrlVars()['next']) { //adding this check to avoid a bug where the nex parametert is appended to the url multiple times
      const redirectAfterLogin = window.location.pathname
      const url = 'login' + window.location.search + (window.location.search ? '&' : '?') + 'next=' + redirectAfterLogin
      replace(url)
    }

    return next()
  }
}
