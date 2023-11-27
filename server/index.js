require('dotenv').config({path: '.env'});
const port = process.env.WOF_SERVER_PORT;
const dbURL = process.env.WOF_DATABASE;

const { initJobs } = require('./routes/job');
const { initProducts } = require('./routes/product');
const { initFloorType } = require('./routes/configure/floor-type');
const { initFirebaseUser } = require('./routes/firebase-user');
const { initAppointments } = require('./routes/appointment');
const { initReference } = require('./routes/configure/reference');
const { initColor } = require('./routes/configure/color');
const { initPriority } = require('./routes/configure/priority');
const { initUState } = require('./routes/configure/us-state');
const { initSaleAgent } = require('./routes/configure/sale-agent');
// const { initDevices } = require('./routes/device');

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socketio = require('socket.io')(server);

// https://firebase.google.com/docs/admin/setup
const admin = require("firebase-admin");
const config = require("./wof-server.json");
admin.initializeApp( { credential: admin.credential.cert(config) } );

// https://expressjs.com/en/guide/writing-middleware.html
const verifyToken = async (request, response, next) => {
  const bearerHeader = request.headers['authorization'];
  if ('OPTIONS' === request.method) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
    response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    response.sendStatus(200);
  } else if (typeof bearerHeader !== 'undefined') {
    const bearerToken = atob(request.headers.authorization.split(' ')[1]);
    await admin.auth().verifyIdToken(bearerToken, true)
      .then(token => {
        console.log(`[HTTP][${request.method}] ${request.url}: verified token`);
        request.token = token;
        next()
      })
      .catch(error => {
        request.token = null;
        console.log(`[MIDDLEWARE][AWAIT] ${request.url} ${error}`);
        response.sendStatus(401);
      });
  } else {
    console.log(`[MIDDLEWARE][${request.method}] ${request.url} response with 400 Bad Request`);
    response.sendStatus(400);
  }
};

app.use(verifyToken);
app.use(express.json()); // body parser
app.use(express.urlencoded({ extended: true })); // url-encoded bodies
app.use(require('cors')()); // CORS because we're on different port :(

/**
 * FE use firebase to create token and attach to request header as bearer token. 
 * BE use firebase-admin to verify request header that has bearer token.
 */
const inits = {
  product: initProducts(socketio, app, '/products'),
  job: initJobs(socketio, app, '/jobs'),
  firebaseUser: initFirebaseUser(app, '/configure/firebase-user'),
  floorType: initFloorType(app, '/configure/floor-type'),
  reference: initReference(app, '/configure/reference'),
  color: initColor(app, '/configure/color'),
  priority: initPriority(app, '/configure/priority'),
  ustate: initUState(app, '/configure/us-state'),
  saleAgent: initSaleAgent(app, '/configure/sale-agent'),
  appointment: initAppointments(socketio, app, '/appointments')
};

//initDevices(server, app);
server.listen(port, () => {
  console.table({
    express: {stage: 'INIT', http: 'HTTP', ws: 'WS', route: `http://localhost:${port}/*`},
    mongoDB: {stage: 'INIT', http: null, ws: null, route: dbURL}
  });

  console.table(inits);
});