const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri, { family: 4 });
const db = client.db('world-of-floors');
const collection = db.collection('floor-types');

const initFloorTypes = async () => {
  let result = [];
  result.push(await collection.deleteMany({}));
  result.push(await collection.insertMany(data));
  //console.table(result);
  // process.exit();
  return result;
};

const data = [
  { label: 'Carpet', short: 'CP', active: true },
  { label: 'Luxury Vinyl', short: 'LV', active: true },
  { label: 'Tile', short: 'TL', active: true },
  { label: 'Wood', short: 'WD', active: true },
  { label: 'Laminate', short: 'LM', active: true }
];

module.exports = { initFloorTypes };