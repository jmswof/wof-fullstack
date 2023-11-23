const cors = require('cors');
const { MongoClient, ObjectId } = require("mongodb");
const admin = require("firebase-admin")
// https://firebase.google.com/docs/admin/setup
const config = require("../wof-server.json")
admin.initializeApp( { credential: admin.credential.cert(config) } )

const dbURL = process.env.WOF_DATABASE;
const client = new MongoClient(dbURL, {
  family: 4 // Node 17+ requirement
});

const database = client.db('world-of-floors');
const products = database.collection('products');

const initWs = (socketio, name) => {
    
    const nsp = socketio.of(name);
    console.log("Socket size: " + nsp.sockets.size);
    return nsp.on('connection', async (socket) => {
        console.log(`socketio.of(${name})`)

        socket.on('message', (data) => {
            //console.log(`[MESSAGE] /products, message connection key: ${request.headers['sec-websocket-key']}, clients size: ${socketio.clients.size}`);
            console.log(`[MESSAGE] /products, contents: ${data}`);
        });
      
        socket.on('disconnect', () => {
          console.log("[DISCONNECT] /jobs, socket size: " + nsp.sockets.size);
            
            //console.log(`[CLOSE] /products, closed connection key: ${request.headers['sec-websocket-key']}, clients size: ${socketio.clients.size}`);
        });

        socket.on('error', () => {
          console.log("error");
        })

        socket.emit('list', await products.find().toArray());
        console.log('emitted jobs to socket');
        console.log("Socket size: " + nsp.sockets.size);
        admin
          .auth()
          .verifyIdToken(socket.handshake.auth.token)
          .then(token => {
            console.log(token);
          })
          .catch(error => {
            console.log(`[CONNECTION] /jobs ERROR ${error.code}`);
            console.log(`[CONNECTION] /jobs TERMINATE SOCKET ${socket.id}`);
            socket.emit('error', 'Invalid credentials, terminating connection...');
            socket.disconnect();
          })
        //console.log(`[CONNECTION] /products, emit list to key: ${request.headers['sec-websocket-key']}, clients size: ${socketio.clients.size}`);
        //console.log(connection);
    });
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