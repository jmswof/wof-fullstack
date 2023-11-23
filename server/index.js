require('dotenv').config({path: '.env'});
const { initJobs } = require('./routes/job');
const { initProducts } = require('./routes/product');
// const { initDevices } = require('./routes/device');
const express = require('express');
const { initUsers } = require('./routes/user');
const app = express();
const server = require('http').createServer(app);
const socketio = require('socket.io')(server);

// https://firebase.google.com/docs/admin/setup
const admin = require("firebase-admin");
const config = require("./wof-server.json");
admin.initializeApp( { credential: admin.credential.cert(config) } );


const port = process.env.WOF_SERVER_PORT;
const dbURL = process.env.WOF_DATABASE;

app.use(express.json()); // body parser
app.use(express.urlencoded({ extended: true })); // url-encoded bodies
app.use(require('cors')()); // CORS because we're on different port :(

// We use firebase UI/UX, and verify requests with JWT token.

initProducts(socketio, app, '/products');
initJobs(socketio, app, '/jobs');
initUsers(app, '/users');
//initDevices(server, app);

server.listen(port, () => {
  console.log(`CORS-enabled web server on ${port}.`);
  console.log(`WOF Database ${dbURL}`);
});