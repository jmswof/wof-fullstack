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
  { label: 'Floor Prep', active: true },
  { label: 'Furniture', active: true },
  { label: 'Installation', active: true },
  { label: 'Installation Upcharge', active: true },
  { label: 'Miscellaneous', active: true },
  { label: 'New Wall Finish', active: true },
  { label: 'Rip-Up & Haul Away', active: true },
  { label: 'R&R', active: true },
  { label: 'Stair Accessories', active: true },
  { label: 'Steps', active: true },
  { label: 'Transition', active: true }
];

module.exports = { initLaborTypes };