const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri, { family: 4 });
const db = client.db('world-of-floors');
const collection = db.collection('priorities');

const initPriorities = async () => {
  let result = [];
  result.push(await collection.deleteMany({}));
  result.push(await collection.insertMany(data));
  //console.table(result);
  // process.exit();
  return result;
};

const data = [
  { label: 'Price', short: 'PR', active: true },
  { label: 'Color', short: 'CR', active: true },
  { label: 'Waterproof', short: 'WP', active: true },
  { label: 'Scratch Resistant', short: 'SR', active: true },
  { label: 'Cleaning', short: 'CL', active: true },
  { label: 'Durability', short: 'DR', active: true },
  { label: 'Other', short: 'OR', active: true }
];

module.exports = { initPriorities };