const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri, {
  family: 4
});

async function run() {
  try {
    const database = client.db('world-of-floors');
    const products = database.collection('products');
    const query = [
      { name: 'A product', cost: 2.99 },
      { name: 'B product', cost: 3.99 },
      { name: 'C product', cost: 4.99 }
    ];
    await products.insertMany(query);
    console.log(await products.countDocuments());
  } finally {
    await client.close();
  }
}

run().catch(console.dir);