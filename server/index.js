const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri, {
  family: 4 // Node 17+ requirement
});
var app = express();

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
});

// The Backend SERVER
app.listen(8080, () => {
  console.log('CORS-enabled web server on 8080.');
});