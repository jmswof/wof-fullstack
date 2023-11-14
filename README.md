# wof-fullstack
A quick readme for running a demo typescript/react/material-mui frontend with a mircoservice server.

## Hard Requirements

- MongoDB
- nvm 1.1.11 (optional)
- node v18.18.0
- npm 9.8.1
- Git Bash
- Web Browser

### MongoDB
   1. Open MongoDB Compass and test connection to mongodb://localhost:27017
   1. Change into database directory, run `npm install`
   1. Verify Node/MongoDB are working, run `node index.js`
   1. Create and/or populate `world-of-floors.products` schema, run `node init-db.js`

### Express Server
   1. Change into server directory, run `npm install`
   1. Start Express server, run `node index.js`

### Webpack Server
   1. Change into client directory, run `npm install`
   1. Start Webpack development server, run `npm start`
   1. The web browser should open automatically to localhost:5000.