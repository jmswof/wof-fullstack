const cors = require('cors');
const { MongoClient, ObjectId } = require("mongodb");

const dbURL = process.env.WOF_DATABASE;

const client = new MongoClient(dbURL, {
  family: 4 // Node 17+ requirement
});

const database = client.db('world-of-floors');
const products = database.collection('products');

const initWs = (socketio, name) => {
    
    const nsp = socketio.of(name);

    return nsp.on('connection', async (socket) => {
        console.log(`socketio.of(${name})`)

        socket.on('message', (data) => {
            //console.log(`[MESSAGE] /products, message connection key: ${request.headers['sec-websocket-key']}, clients size: ${socketio.clients.size}`);
            console.log(`[MESSAGE] /products, contents: ${data}`);
        });
      
        socket.on('close', () => {
            socketio.clients.delete(connection);
            //console.log(`[CLOSE] /products, closed connection key: ${request.headers['sec-websocket-key']}, clients size: ${socketio.clients.size}`);
        });

        socket.emit('list', await products.find().toArray());
        console.log('emitted products to socket');
        //console.log(`[CONNECTION] /products, emit list to key: ${request.headers['sec-websocket-key']}, clients size: ${socketio.clients.size}`);
        //console.log(connection);
    });
};

const initRest = (wss, app, name) => {

    // GET /products (READ)
    app.get('/products', cors(), async (request, response, next) => {
        response.json(await products.find().toArray());
    });

    // POST /products (CREATE)
    app.post('/products', cors(), async (request, response, next) => {
        console.log(request.body);
        response.json(await products.insertOne(request.body));
        const t = JSON.stringify(await products.find().toArray());

        wss.clients.forEach((client, k) => {
            client.send(t);
        });
    });

    // PATCH /products (UPDATE)
    app.patch('/products', cors(), async (request, response, next) => {
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
    app.delete('/products', cors(), async (request, response, next) => {
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

    console.log("Mapped product routes and sockets");
};

const initProducts = (socketio, app, name) => {
    initRest(
        initWs(socketio, name),
        app,
        name
    );
};

module.exports = { initProducts };