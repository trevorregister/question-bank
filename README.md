Api for question bank. 

web: https://github.com/trevorregister/question-bank-web

api-client: https://github.com/trevorregister/question-bank-api-client

## Install
I recommend creating a question-bank directory, then a directory for each one.
1. Navigate to approriate sub-directory (api, web, or api-client)
2. Clone repo
3. `npm i` from the root of api and web. I haven't been able to figure out how to run api-client on it's own yet, so currently the only way to use it is through web (more on that below).

### api
* `npm start` to run the api on the `PORT` from the .env file
* `npm run test:int` to run integration tests in watch mode
* `npm run db:seed` to seed the database with everything but assignment responses. Still working on that.

Initial routes are defined in `routes.js` in the root. 

#### src folders
* tests - contains tests. 
* core - generic classes that are used across all domains. `enums` is a hack-ey way to use enumerated values without typescript.
* db-seed - contains script run by `npm run db:seed` command (seed.js) as well as the builder for building data for tests and seeding.
* domains - other than auth, contains controller, routes, use-cases, and database access for each domain.
  * data-access - contains model and schema.
  * use-cases - use cases that contain primary logic for performing functions in the domain
  * routes - routes for the domain
  * entities - core "parts" of the domain. Each has a toDb method (which is inherited from `src/core/entity.js`), which uses Joi to validate incoming data. toWeb is used to send data to the vue app
  * repository - functions that perform operations on the model
  * controller - directs a request to the appropriate function that calls a use case
* events - contains handlers (found in /subscribers) for when specific events (as defined in /types) are fired. Used to provide separate logic for when something happening in one domain requires another one to do something.
* middleware - contains authentication, authorization, and main error handling.

#### anatomy of a request
1. Request starts at root/routes.js and is directed to the corresponding domain route
2. domain route authorizes, then passes to the domain controller
3. controller takes request data and compiles to be sent to the use case
4. use case performs all the logic, then calls the repository
5. repository performs functions on the model
6. model performs functions on the db
7. response sent back up the chain

### web
* `npm run dev` to start the app
* not much on `main` at the moment. Most anything non-trivial is on the `feat/question-editor` branch
* uses [quasar](https://quasar.dev/) ui library.
* api-client
  * separate github repo that's set as a project dependency in `package.json`
  * uses src/shared/api-client.ts to make calls to the api. most of that is untested currently, though it has calls for all routes. 
  * `npm update question-bank-api-client` to pull the most recent version of the api-client from it's repo

The aim is to mirror the api structure by splitting things into domains. Each domain will have a components, pages, and views folder. Shared components go in src/shared. src/shared/global will eventually have components (like buttons. hyperlinks, etc.) that won't need to be manually imported and are just globally available.

Pinia will eventually be used for state management.

### api-client
Typescript client that bridges web and api. Calls for all api routes are there, but much of it is untested.

