require('dotenv').config({path: '.env'});
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require("mongodb");

const dbURL = process.env.WOF_DATABASE;
const port = process.env.WOF_SERVER_PORT;

const client = new MongoClient(dbURL, {
  family: 4 // Node 17+ requirement
});

var expressWs = require('express-ws');
var expressWs = expressWs(express());
var app = expressWs.app;

app.use(express.json()); // body parser
app.use(express.urlencoded({ extended: true })); // url-encoded bodies
app.use(cors()); // CORS because we're on different port :(

app.post('/sign-in', cors(), (request, response, next) => {
  const auth = atob(request.headers.authorization.split(' ')[1]).split(':');
  console.log(auth);
  response.json({
    success: auth[1] === '123456'
  });
});

// GET /products
app.get('/products', cors(), async (request, response, next) => {
    const database = client.db('world-of-floors');
    const products = database.collection('products');
    response.json(await products.find().toArray());
});

// POST /products
app.post('/products', cors(), async (request, response, next) => {
  console.log(request.body);
  const database = client.db('world-of-floors');
  const products = database.collection('products');

  response.json(await products.insertOne(request.body));
  const t = JSON.stringify(await products.find().toArray());
  appWss.clients.forEach((client, k) => {
    client.send(t);
  });
});

// PATCH /products
app.patch('/products', cors(), async (request, response, next) => {
  console.log(request.body);
  const database = client.db('world-of-floors');
  const products = database.collection('products');

  response.json(await products.updateOne(
      {_id: new ObjectId(request.body._id)},
      { $set: { name: request.body.name, cost: request.body.cost}},
      {}
    ));
    const t = JSON.stringify(await products.find().toArray());
    appWss.clients.forEach((client, k) => {
      client.send(t);
    });
  });

// DELETE /products
app.delete('/products', cors(), async (request, response, next) => {
  const database = client.db('world-of-floors');
  const products = database.collection('products');
  response.json(
    await products.deleteMany({
      _id: {
        $in: request.body.map(id => (new ObjectId(id)))
      }
    })
  );

  const t = JSON.stringify(await products.find().toArray());
  appWss.clients.forEach((client, k) => {
    client.send(t);
  });
});

var appWss = expressWs.getWss('/products');

// iOS/Android Web Sockets
app.ws('/products', async (ws, req) => {
  const database = client.db('world-of-floors');
  const products = database.collection('products');
  const t = JSON.stringify(await products.find().toArray());
  console.log(appWss);
  ws.send(t);
});

// The Backend SERVER
app.listen(port, () => {
  console.log(`CORS-enabled web server on ${port}.`);
  console.log(`WOF Database ${dbURL}`);
});