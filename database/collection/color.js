const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri, { family: 4 });
const db = client.db('world-of-floors');
const collection = db.collection('colors');

const initColors = async () => {
  let result = [];
  result.push(await collection.deleteMany({}));
  result.push(await collection.insertMany(data));
  //console.table(result);
  // process.exit();
  return result;
};

const data = [
  { label: 'Gray', active: true },
  { label: 'Earth Tone', active: true },
  { label: 'Taupe', active: true },
  { label: 'Other', active: true }
];

module.exports = { initColors };