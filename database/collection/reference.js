const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri, { family: 4 });
const db = client.db('world-of-floors');
const collection = db.collection('references');

const initReferences = async () => {
  let result = [];
  result.push(await collection.deleteMany({}));
  result.push(await collection.insertMany(data));
  //console.table(result);
  // process.exit();
  return result;
};

const data = [
  { label: 'Return Customer', active: true },
  { label: 'Referral', active: true },
  { label: 'Search Engine', active: true },
  { label: 'Social Media', active: true },
  { label: 'Print Ad', active: true },
  { label: 'Television', active: true },
  { label: 'Billboard', active: true },
  { label: 'Angi', active: true },
  { label: 'HomeAdvisor', active: true },
  { label: 'Polish Festival', active: true },
  { label: 'Fest Italiana', active: true }
];

module.exports = { initReferences };