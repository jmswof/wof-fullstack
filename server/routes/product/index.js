const cors = require('cors');
const { MongoClient, ObjectId } = require("mongodb");

const dbURL = process.env.WOF_DATABASE;

const client = new MongoClient(dbURL, {
  family: 4 // Node 17+ requirement
});

const database = client.db('world-of-floors');
const products = database.collection('products');

const initWs = (socketio, route) => {
  const nsp = socketio.of(route);

  nsp.on('connection', async (socket) => {
    socket.on('message', (data) => {
      console.log(`[WS][MESSAGE] ${route}, contents: ${data}`);
    });

    socket.on('disconnect', () => {
      console.log(`[WS][DISCONNECT] ${route}, current clients size: ${nsp.sockets.size}`);
    });

    socket.on('error', () => {
      console.log("error");
    });

    socket.emit('list', await products.find().toArray());
    console.log('emitted products to socket');
    console.log("Socket size: " + nsp.sockets.size);
  });

  return nsp;
};

const initRest = (wss, app, route) => {

  // GET /products (READ)
  app.get(route, cors(), async (request, response, next) => {
    response.json(await products.find().toArray());
  });

    // POST /products (CREATE)
  app.post(route, cors(), async (request, response, next) => {
    console.log(request.body);
    response.json(await products.insertOne(request.body));
    const t = JSON.stringify(await products.find().toArray());

    wss.clients.forEach((client, k) => {
      client.send(t);
    });
  });

  // PATCH /products (UPDATE)
  app.patch(route, cors(), async (request, response, next) => {
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
  app.delete(route, cors(), async (request, response, next) => {
    response.json(
      await products.deleteMany({
        _id: { $in: request.body.map(id => (new ObjectId(id))) }
      })
    );

    const t = JSON.stringify(await products.find().toArray());
    wss.clients.forEach((client) => {
      client.send(t);
    });
  });
};

const initProducts = (socketio, app, route) => {
  initRest(
    initWs(socketio, route),
    app,
    route
  );

  return {stage: 'INIT', http: 'HTTP', ws: 'WS', route: route};
};

module.exports = { initProducts };