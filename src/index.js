import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import Home from './containers/homepage'
import {
  checkIndexAuthorization,
  checkLoginAuthorization,
} from './utils/check-auth'

// Import all of our components
import App from './App'

import Hijack from './components/hijack'

// Public Routes
import Partners from './containers/partners'
import AboutUs from './containers/aboutUs'
import KeyFeatures from './containers/keyFeatures'
import AboutGreenbeltFund from './containers/aboutGreenbeltFund'
//import MarketAccess from './containers/marketAccessGrantStream'
//import LocalFoodLiteracy from './containers/localFoodLiteracyGrantStream'
import ContactUs from './containers/contactUs'
import TermsOfUse from './containers/termsOfUse'
import PrivacyPolicy from './containers/privacyPolicy'
import Login from './containers/login'
import Signup from './containers/signup'
import CreateAnAccount from './containers/create-an-account'
import Confirm from './components/confirm'
import Activate from './containers/activate'
import ClaimProfile from './containers/claimProfile'
import PasswordReset from './containers/passwordReset'
import UserSettings from './containers/userSettings'

// Protected Routes
import Dashboard from './containers/dashboard'
import Messages from './containers/messages'
import Shipping from './containers/shipping'

import SearchComponent from './containers/searchComponent'

import Profile from './containers/profile'
import ProfileManager from './containers/profileManager'
import ProfileManagerReports from './containers/profileManagerReports'

import ProfileHub from './containers/profile-hub'


import './index.scss'

// Import the index reducer and sagas
import IndexReducer from './index-reducer'
import IndexSagas from './index-sagas'

// Setup the middleware to watch between the Reducers and the Actions
const sagaMiddleware = createSagaMiddleware()

/*eslint-disable */
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
/*eslint-enable */

const store = createStore(
  IndexReducer,
  composeSetup(applyMiddleware(sagaMiddleware)), // allows redux devtools to watch sagas
)

// Begin our Index Saga
sagaMiddleware.run(IndexSagas)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route 
        path="/"
        component={App}
        onEnter={checkIndexAuthorization(store)}
      >
        <IndexRoute component={Home} />

        <Route
          path="/about-us/meet-our-partners"
          component={Partners}
        />
        <Route
          path="/about-us"
          component={AboutUs}
        />
        <Route
          path="/key-features"
          component={KeyFeatures}
        />
        <Route
          path="/about-greenbelt-fund"
          component={AboutGreenbeltFund}
        />
        {/*
        <Route
          path="/about-greenbelt-fund/market-access-grant-stream"
          component={MarketAccess}
        />
        <Route
          path="/about-greenbelt-fund/local-food-literacy-grant-stream"
          component={LocalFoodLiteracy}
        />
        */}
        <Route
          path="/contact-us"
          component={ContactUs}
        />
        <Route
          path="/terms-use"
          component={TermsOfUse}
        />
        <Route
          path='/privacy-policy'
          component={PrivacyPolicy}
        />
        <Route 
          path="/login"
          component={Login} 
        />
        <Route
          path="messages/login"
          component={Login}
        />
        <Route
          path="dashboard/login"
          component={Login}
        />
        <Route
          path="settings/login"
          component={Login}
        />
        {/*
        <Route
          path="/register"
          component={Signup}
        />
        */}
        {/*
          ************************************************
          ALERT: New Register container is being temporarily inserted here:
          ************************************************
        <Route
          path="/create-an-account"
          component={CreateAnAccount}
        />
        */}
        <Route
          path="/register"
          component={CreateAnAccount}
        />
        <Route
          path="/confirm"
          component={Confirm}
        />
        <Route
          path="/forgot(/:token)"
          component={PasswordReset}
        />
        <Route
          path="/activate(/:token)"
          component={Activate}
        />
        <Route
          path="/claim"
          component={ClaimProfile}
        />
        <Route
          path="/search(/:query)"
          component={SearchComponent}
        />
        <Route
          path="/profiles/:slug(/:component)"
          component={Profile}
        />
        {/*
          ************************************************
          ALERT: New Profile container is being temporarily inserted here:
          ************************************************

        <Route
          path="/profile-hub"
          component={ProfileHub}
        />
        */}
        <Route
          onEnter={checkLoginAuthorization(store)}
          path="/profile-hub"
          component={ProfileHub}
        />
        <Route
          onEnter={checkLoginAuthorization(store)}
          path="/dashboard"
          component={Dashboard}
        />
        <Route
          onEnter={checkLoginAuthorization(store)}
          path="/messages"
          component={Messages}
        />
        <Route
          onEnter={checkLoginAuthorization(store)}
          path="/shipping"
          component={Shipping}
        />
        <Route
          onEnter={checkLoginAuthorization(store)}
          path="/profile(/:component)"
          component={Profile}
        />
        <Route
          onEnter={checkLoginAuthorization(store)}
          path="/viewProfile(/:component)"
          component={Profile}
        />

        <Route
          onEnter={checkLoginAuthorization(store)}
          path="/profile-manager"
          component={ProfileManager}
        />

        <Route
          onEnter={checkLoginAuthorization(store)}
          path="/reports/:slug"
          component={ProfileManagerReports}
        />
        <Route
          onEnter={checkLoginAuthorization(store)}
          path="/settings"
          component={UserSettings}
        />
        <Route
          path="/hijack/:id"
          component={Hijack}
        />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'),
)
