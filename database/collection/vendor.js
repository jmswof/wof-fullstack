const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri, { family: 4 });
const db = client.db('world-of-floors');
const collection = db.collection('vendors');

const initVendor = async () => {
  let result = [];
  result.push(await collection.deleteMany({}));
  result.push(await collection.insertMany(data));
  //console.table(result);
  // process.exit();
  return result;
};

const data = [
  { label: 'Cali', active: true },
  { label: 'DreamWeaver', active: true },
  { label: 'Rong Gean', active: true },
  { label: 'CDC', active: true },
  { label: 'LWM', active: true },
  { label: 'Engineered', active: true },
  { label: 'WF', active: true },
  { label: 'Nature', active: true }
];

module.exports = { initVendor };