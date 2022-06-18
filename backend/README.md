# Node internship 05-2022

## Setup

- Clone the project from Gitlab
  - `git clone git@git.devnest.ro:react/nodejs-internship-05-2022.git`
- Install [nvm](https://github.com/nvm-sh/nvm) and after install node version 14.18.0 and use it:
  - `nvm install 14.18.0`
  - `nvm use 14.18.0`
- Install [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
- Install dependancies
  - `yarn install`
- Create env file:
  - `cp env.example .env`
- Start development server
  - `yarn start-dev`
- Verify in browser on `http://localhost:3002`
- To run tests(all tests must have `.test.js` extension)
  - `yarn test`