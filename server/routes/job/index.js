const cors = require('cors');
const { MongoClient, ObjectId } = require("mongodb");
const admin = require("firebase-admin");
const dbURL = process.env.WOF_DATABASE;
const client = new MongoClient(dbURL, { family: 4 /* Node 17+ requirement */ });
const database = client.db('world-of-floors');
const products = database.collection('products');

const initWs = (socketio, route) => {

  const nsp = socketio.of(route);

  nsp.on('connection', async (socket) => {
    await admin.auth().verifyIdToken(socket.handshake.auth.token)
      .then(async token => {
        // console.log(token);
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
        response.json(await products.find().toArray());
    });

    // POST /jobs (CREATE)
    app.post(route, cors(), async (request, response, next) => {
      console.log(request.body);
      response.json(await products.insertOne(request.body));
    });

    // PATCH /jobs (UPDATE)
    app.patch(route, cors(), async (request, response, next) => {
      console.log(request.body);
      response.json(await products.updateOne(
        {_id: new ObjectId(request.body._id)},
        { $set: { name: request.body.name, cost: request.body.cost}},
        {}
      ));
    });

    // DELETE /jobs (DELETE)
    app.delete(route, cors(), async (request, response, next) => {
      response.json(
        await products.deleteMany({
          _id: { $in: request.body.map(id => (new ObjectId(id))) }
        })
      );
    });

    console.log(`[INIT] initialized REST and WS on ${route} for CRUD routes...`);
};

const initJobs = (socketio, app, route) => {
  initRest(
    initWs(socketio, route),
    app,
    route
  );
};

module.exports = { initJobs };