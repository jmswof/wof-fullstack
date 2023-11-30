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
  { label: 'Gray', short: 'GR', active: true },
  { label: 'Earth Tone', short: 'ET', active: true },
  { label: 'Taupe', short: 'TP', active: true },
  { label: 'Other', short: 'OR', active: true }
];

module.exports = { initColors };