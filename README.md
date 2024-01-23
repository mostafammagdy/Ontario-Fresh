# OntarioFresh 2.1 FrontEnd

Created by Shubhagata Sengupta for Local Line Inc. and OntarioFresh
Ammended by Michael Anderson for Pixelpusher Corp.
# Ontario Fresh React Application

Welcome to the Ontario Fresh React application repository! This React application powers Ontario Fresh, a platform dedicated to growing the business of local food in Ontario. Below, you'll find information about the key components, features, and integration details.

## Table of Contents
- [Application Overview](#application-overview)
- [Installation](#installation)
- [Key Components](#key-components)
- [Redux Store and Routing](#redux-store-and-routing)
- [MailChimp Integration](#mailchimp-integration)
- [Inspiration](#inspiration)

---

## Application Overview

The Ontario Fresh React application is a modern web platform built using React, Redux, and various UI components from Material-UI. It aims to connect businesses in the local food industry, providing them with tools for showcasing their products, managing profiles, and fostering partnerships. The application also includes user authentication, protected routes, and MailChimp integration for newsletter subscriptions.

---

## Installation

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd ontario-fresh-react
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**
   Create a `.env` file in the root of the project and set the necessary environment variables. You may refer to the existing environment variables in the `App.js` file.

4. **Run the Application:**
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000` by default.

---

## Key Components

### `App.js`
This file represents the main component of the application. It includes the theme setup, routing, and integration with third-party services like Google Analytics and Sentry for error tracking.

### `index.js`
The `index.js` file sets up the Redux store, integrates middleware, and renders the main `App` component. It also defines routes using React Router and includes public and protected routes.

### `useMailChimp.js`
This file contains a custom React hook, `useMailChimp`, for seamless integration with MailChimp. It handles newsletter subscriptions, updates the status, and manages errors.

---

## Redux Store and Routing

The application utilizes Redux for state management and includes middleware for handling asynchronous actions. React Router is used for navigation, with public and protected routes ensuring a secure user experience.

---

## MailChimp Integration

The `useMailChimp.js` hook simplifies the integration with MailChimp for newsletter subscriptions. It communicates with the MailChimp API and updates the application state based on the subscription status.

For a detailed breakdown of the `useMailChimp` hook, refer to [this link](https://jfelix.info/blog/kick-start-your-newsletter-mailchimp-custom-form-with-react).

---

Thank you for your interest in the Ontario Fresh React Application!

Things you will need:

- node (>= 15.12.0)
- yarn

Things that are nice to have:

- React dev tools (Chrome)
- Redux dev tools (Chrome)

Installing Yarn:

- do not install yarn through installing `cmdtest` like the console suggests
- install through the instructions on the official webpage "yarnpkg.com"

Getting started:

- Clone the repo
- run `yarn install`

To run the project:

- run `yarn start`

To build the project for static hosting:

- run `yarn build`

To add a dependency, if somehow you need to do this:

- run `yarn add THING`

## Deploying to production:

`git pull; yarn build; rm build/static/js/*.map; scp -r build onapp:~; ssh onapp "rm -r web_app; mv build web_app"`

## WARNING!

Whatever you do, **DO NOT** attempt to upgrade the _redux-saga_ package to version 1.0.0 or greater! Doing so will prevent Axios from performing its Ajax GET and POST methods, and the console will provide you with no informtion as to what’s preventing the Ajax methods from happening. The app. will cease to connect to the A.P.I. endpoints and there will be no errors to help you to troubleshoot the problem.

If you choose to do this, be prepared for some serious debugging.
