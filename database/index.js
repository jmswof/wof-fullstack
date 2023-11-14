const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/";

// https://www.mongodb.com/docs/drivers/node/current/connection-troubleshooting/#ensure-mongodb-and-your-client-use-the-same-protocol
const client = new MongoClient(uri, {
  family: 4
});

async function run() {
  try {
    const database = client.db('world-of-floors');
    const products = database.collection('products');
    const product = await products.countDocuments();
    console.log(product);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);