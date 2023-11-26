const cors = require('cors');
const admin = require("firebase-admin");
const { MongoClient, ObjectId } = require("mongodb");
const dbURL = process.env.WOF_DATABASE;
const client = new MongoClient(dbURL, { family: 4 /* Node 17+ requirement */ });
const database = client.db('world-of-floors');

const initWs = (socketio, route) => {

  const nsp = socketio.of(route);

  nsp.on('connection', async (socket) => {
    await admin.auth().verifyIdToken(socket.handshake.auth.token)
      .then(async token => {
        console.log(token);
        db.test.find({"_id" : ObjectId("4ecc05e55dd98a436ddcc47c")}) 
        socket.emit('list', await products.find().toArray());
        console.log(`[WS][CONNECTION] ${route}: verified token, emit jobs payload to socket::list ${socket.id}`);
        console.log(`[WS][CONNECTION] ${route}: current clients size: ${nsp.sockets.size}`);
      })
      .catch(error => {
        console.log(`[WS][CONNECTION] ${route}: firebase error ${error.code}`);
        console.log(`[WS][CONNECTION] ${route}: emit error and then terminate this socket ${socket.id}`);
        socket.emit('error', 'Invalid credentials, terminating connection...');
        socket.disconnect();
      });

    socket.on('message', (data) => {
      console.log(`[WS][MESSAGE] ${route}: contents = ${data}`);
    });

    socket.on('disconnect', () => {
      console.log(`[WS][DISCONNECT] ${route}: current clients size = ${nsp.sockets.size}`);
    });

    socket.on('error', (error) => {
      console.log(`[WS][ERROR] ${route}: error'd = ${error}`);
    });
  });

  return nsp;
};

const initRest = (wss, app, route) => {

    // GET /jobs (READ)
    app.get(route, cors(), async (request, response, next) => {
        console.log(request.body);
    });

    // POST /jobs (CREATE)
    app.post(route, cors(), async (request, response, next) => {
      console.log(request.body);
    });

    // PATCH /jobs (UPDATE)
    app.patch(route, cors(), async (request, response, next) => {
      console.log(request.body);
    });

    // DELETE /jobs (DELETE)
    app.delete(route, cors(), async (request, response, next) => {
      console.log(request.body);
    });
};

const initJobs = (socketio, app, route) => {
  initRest(
    initWs(socketio, route),
    app,
    route
  );

  return {stage: 'INIT', http: 'HTTP', ws: 'WS', route: route};
};

module.exports = { initJobs };