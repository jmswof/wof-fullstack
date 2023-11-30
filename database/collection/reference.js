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
  { label: 'Return Customer', short: 'RC', active: true },
  { label: 'Referral', short: 'RF', active: true },
  { label: 'Search Engine', short: 'SE', active: true },
  { label: 'Social Media', short: 'SM', active: true },
  { label: 'Print Ad', short: 'PA', active: true },
  { label: 'Television', short: 'TV', active: true },
  { label: 'Billboard', short: 'BB', active: true },
  { label: 'Angi', short: 'AN', active: true },
  { label: 'HomeAdvisor', short: 'HA', active: true },
  { label: 'Polish Festival', short: 'PF', active: true },
  { label: 'Fest Italiana', short: 'FI', active: true }
];

module.exports = { initReferences };