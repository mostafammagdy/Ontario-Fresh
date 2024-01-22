import React, { useState, useLayoutEffect } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import ReactGA from 'react-ga'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import Helmet from 'react-helmet'
import Header from './components/header'
import HeaderHub from './components/headerHub'
import Footer from './components/footer'
import DialogContainer from './components/DialogContainer'

import * as Sentry from '@sentry/browser'

import 'core-js'

import './App.scss'

const theme = getMuiTheme({
  fontFamily: '"Open Sans", "Helvetica Neue", sans-serif',
  palette: {
    primary1Color: '#00703C',
    primary2Color: '#424242',
    accent1Color: '#424242',
    secondary1Color: '#FFFFFF',
    accent2Color: '#00703C',
  },
  datePicker: {
    selectColor: '#00703C',
    headerColor: '#00703C',
  },
  slider: {
    selectionColor: '#50B948',
    handleFillColor: '#50B948',
  },
})

const appStyle = {
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
}

const appWithDialogOpenStyle = {
  ...appStyle,
  width: '100%',
  height: '100%',
  position: 'fixed',
  overflow: 'hidden'
}

const App = props => {
  const { client, profile } = props
  /*
  const [ comingSoonVisible, setComingSoonVisible ] = useState(false)
  const localStorageDialogVariable = 'dontShowComingSoonDialog'
  useLayoutEffect(() => {
    *
    console.log('%c localStorage.getItem("dontShowComingSoonDialog"):', 'color: red; font-weight: bold; font-style: italic;')
    console.log(localStorage.getItem(localStorageDialogVariable))
    *
    if (!localStorage.getItem(localStorageDialogVariable))
      setComingSoonVisible(true)
  }, [])
  */
  if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'development') {
    ReactGA.initialize('UA-28308412-1');
    ReactGA.pageview(window.location.pathname + window.location.search);

    Sentry.init({
      dsn: "https://5cde2bcb679c468c9008e45bf76f6e80@sentry.io/1312467"
    });
  }

  /*
  console.log('%c process.env.REACT_APP_API_URL:', 'color: blue; font-weight: bold;')
  console.log(`${process.env.REACT_APP_API_URL}`)
  HOPE THIS WORKS!!!
  */
  /*
  console.log('%c client, profile:', 'color: red; font-weight: bold;')
  console.log({ client, profile })
  */

  let loggedIn = !!client.username

  return (
    <MuiThemeProvider muiTheme={theme}>
      {/* <div style={comingSoonVisible ? appWithDialogOpenStyle : appStyle}> */}
      <div style={appStyle}>
        {/*
        <div
          tabIndex={comingSoonVisible ? '-1' : null}
          aria-hidden={comingSoonVisible ? 'true' : null}
        >
        */}
        <div>
          <Helmet
            title="Ontariofresh | Growing the Business of Local Food"
            meta={[
              {
                name: 'description',
                content:
                  'If you’re selling or sourcing Ontario food, Ontariofresh.ca offers you the easiest and most effective way to showcase your business and connect with potential partners. Create your free, customized profile today!'
              },
              {
                name: 'keywords',
                content: 'ontariofresh, ontario fresh, ontario, local food',
              },
            ]}
          >
            <link href="//fonts.googleapis.com/css?family=Open+Sans:100,300,400,500,600,700" rel="stylesheet" type='text/css' />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=0" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=0" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=0" />
            <link rel="manifest" href="/manifest.json?v=0" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg?v=0" color="#00703c" />
            <meta name="theme-color" content="#00703c" />
          </Helmet>
          <Header />
          {/*
          <HeaderHub />
          */}

          <section
            className="App-body"
            style={{
              marginTop: (loggedIn && profile.authed && !profile.authed.is_manager) ? null : '4rem',
              flex: '1 1 auto',
              position: 'relative',
              minHeight: 300
            }}
          >
            {props.children}
          </section>
          <Footer />
        </div>
        {/*
           comingSoonVisible &&
            <DialogContainer
              localStorageVariable={localStorageDialogVariable}
              setDialogVisible={setComingSoonVisible}
              dialogContainer='comingSoonDialogContainer'
              elementsToReceiveFocus='h1[tabindex="0"], a[href]:not([disabled]), button:not([disabled]), input[type="email"]:not([disabled])'
              closeButton='comingSoonDialogCloseButton'
            />
        */}
      </div>
    </MuiThemeProvider>
  )
}

App.propTypes = {
  children: PropTypes.node,
}

const mapStateToProps = state => ({
  client: state.client,
  profile: state.profile
})

export default connect(mapStateToProps)(App)
