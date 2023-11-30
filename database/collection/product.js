const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri, { family: 4 });
const db = client.db('world-of-floors');
const collection = db.collection('products');

const initProducts = async () => {
  let result = [];
  result.push(await collection.deleteMany({}));
  result.push(await collection.insertMany(data));
  //console.table(result);
  // process.exit();
  return result;
};

const data = [
  { name: 'A product', cost: 2.99 },
  { name: 'B product', cost: 3.99 },
  { name: 'C product', cost: 4.99 }
];

module.exports = { initProducts };