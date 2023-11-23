const cors = require('cors');
const { MongoClient, ObjectId } = require("mongodb");
const admin = require("firebase-admin");

// https://firebase.google.com/docs/admin/setup
const config = require("../../wof-server.json");
admin.initializeApp( { credential: admin.credential.cert(config) } );

const dbURL = process.env.WOF_DATABASE;
const client = new MongoClient(dbURL, { family: 4 /* Node 17+ requirement */ });
const database = client.db('world-of-floors');
const products = database.collection('products');

const initWs = (socketio, name) => {

  const nsp = socketio.of(name);

  nsp.on('connection', (socket) => {
    admin.auth().verifyIdToken(socket.handshake.auth.token)
      .then(async token => {
        // console.log(token);
        socket.emit('list', await products.find().toArray());
        console.log(`[CONNECTION] /jobs: verified token, emit jobs payload to socket::list ${socket.id}`);
        console.log(`[CONNECTION] /jobs: current clients size: ${nsp.sockets.size}`);
      })
      .catch(error => {
        console.log(`[CONNECTION] /jobs: firebase error ${error.code}`);
        console.log(`[CONNECTION] /jobs: emit error and then terminate this socket ${socket.id}`);
        socket.emit('error', 'Invalid credentials, terminating connection...');
        socket.disconnect();
      });

    socket.on('message', (data) => {
      console.log(`[MESSAGE] /jobs: contents = ${data}`);
    });

    socket.on('disconnect', () => {
      console.log(`[DISCONNECT] /jobs: current clients size = ${nsp.sockets.size}`);
    });

    socket.on('error', () => {
      console.log("error");
    });
  });

  return nsp;
};

const initRest = (wss, app, name) => {

    // GET /products (READ)
    app.get('/jobs', cors(), async (request, response, next) => {
        response.json(await products.find().toArray());
    });

    // POST /products (CREATE)
    app.post('/jobs', cors(), async (request, response, next) => {
        console.log(request.body);
        response.json(await products.insertOne(request.body));
        const t = JSON.stringify(await products.find().toArray());

        wss.clients.forEach((client, k) => {
            client.send(t);
        });
    });

    // PATCH /products (UPDATE)
    app.patch('/jobs', cors(), async (request, response, next) => {
        console.log(request.body);
        response.json(await products.updateOne(
            {_id: new ObjectId(request.body._id)},
            { $set: { name: request.body.name, cost: request.body.cost}},
            {}
        ));
        const t = JSON.stringify(await products.find().toArray());
        wss.clients.forEach((client, k) => {
            client.send(t);
        });
    });

    // DELETE /products (DELETE)
    app.delete('/jobs', cors(), async (request, response, next) => {
        response.json(
            await products.deleteMany({
                _id: {
                    $in: request.body.map(id => (new ObjectId(id)))
                }
            })
        );

        const t = JSON.stringify(await products.find().toArray());
        wss.clients.forEach((client) => {
            client.send(t);
        });
    });

    console.log("Mapped job routes and socket namespace");
};

const initJobs = (socketio, app, name) => {
    initRest(
        initWs(socketio, name),
        app,
        name
    );
};

module.exports = { initJobs };