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
  { label: 'Cali', short: 'CL', active: true },
  { label: 'DreamWeaver', short: 'DW', active: true },
  { label: 'Rong Gean', short: 'RG', active: true },
  { label: 'CDC', short: 'CD', active: true },
  { label: 'LWM', short: 'LW', active: true },
  { label: 'Engineered', short: 'EN', active: true },
  { label: 'WF', short: 'WF', active: true },
  { label: 'Nature', short: 'NA', active: true }
];

module.exports = { initVendor };