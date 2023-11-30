const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri, { family: 4 });
const db = client.db('world-of-floors');
const collection = db.collection('labor-types');

const initLaborTypes = async () => {
  let result = [];
  result.push(await collection.deleteMany({}));
  result.push(await collection.insertMany(data));
  //console.table(result);
  // process.exit();
  return result;
};

const data = [
  { label: 'Floor Prep', short: 'FP', active: true },
  { label: 'Furniture', short: 'FN', active: true },
  { label: 'Installation', short: 'IN', active: true },
  { label: 'Installation Upcharge', short: 'IU', active: true },
  { label: 'Miscellaneous', short: 'MC', active: true },
  { label: 'New Wall Finish', short: 'NF', active: true },
  { label: 'Rip-Up & Haul Away', short: 'RH', active: true },
  { label: 'R&R', short: 'RR', active: true },
  { label: 'Stair Accessories', short: 'SA', active: true },
  { label: 'Steps', short: 'SP', active: true },
  { label: 'Transition', short: 'TN', active: true }
];

module.exports = { initLaborTypes };