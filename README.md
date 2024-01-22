# OntarioFresh 2.1 FrontEnd

Created by Shubhagata Sengupta for Local Line Inc. and OntarioFresh
Ammended by Michael Anderson for Pixelpusher Corp.

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
