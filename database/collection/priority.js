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
  { label: 'Price', active: true },
  { label: 'Color', active: true },
  { label: 'Waterproof', active: true },
  { label: 'Scratch Resistant', active: true },
  { label: 'Cleaning', active: true },
  { label: 'Durability', active: true },
  { label: 'Other', active: true }
];

module.exports = { initPriorities };