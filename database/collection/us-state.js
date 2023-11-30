const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri, { family: 4 });
const db = client.db('world-of-floors');
const collection = db.collection('us-states');

const initStates = async () => {
  let result = [];
  result.push(await collection.deleteMany({}));
  result.push(await collection.insertMany(data));
  //console.table(result);
  // process.exit();
  return result;
};

const data = [
  { label: 'Alabama', short: 'AL', active: true },
  { label: 'Alaska', short: 'AK', active: true },
  { label: 'Arizona', short: 'AZ', active: true },
  { label: 'Arkansas', short: 'AR', active: true },
  { label: 'California', short: 'CA', active: true },
  { label: 'Colorado', short: 'CO', active: true },
  { label: 'Connecticut', short: 'CT', active: true },
  { label: 'Delaware', short: 'DE', active: true },
  { label: 'District Of Columbia', short: 'DC', active: true },
  { label: 'Florida', short: 'FL', active: true },
  { label: 'Georgia', short: 'GA', active: true },
  { label: 'Hawaii', short: 'HI', active: true },
  { label: 'Idaho', short: 'ID', active: true },
  { label: 'Illinois', short: 'IL', active: true },
  { label: 'Indiana', short: 'IN', active: true },
  { label: 'Iowa', short: 'IA', active: true },
  { label: 'Kansas', short: 'KS', active: true },
  { label: 'Kentucky', short: 'KY', active: true },
  { label: 'Louisiana', short: 'LA', active: true },
  { label: 'Maine', short: 'ME', active: true },
  { label: 'Maryland', short: 'MD', active: true },
  { label: 'Massachusetts', short: 'MA', active: true },
  { label: 'Michigan', short: 'MI', active: true },
  { label: 'Minnesota', short: 'MN', active: true },
  { label: 'Mississippi', short: 'MS', active: true },
  { label: 'Missouri', short: 'MO', active: true },
  { label: 'Montana', short: 'MT', active: true },
  { label: 'Nebraska', short: 'NE', active: true },
  { label: 'Nevada', short: 'NV', active: true },
  { label: 'New Hampshire', short: 'NH', active: true },
  { label: 'New Jersey', short: 'NJ', active: true },
  { label: 'New Mexico', short: 'NM', active: true },
  { label: 'New York', short: 'NY', active: true },
  { label: 'North Carolina', short: 'NC', active: true },
  { label: 'North Dakota', short: 'ND', active: true },
  { label: 'Ohio', short: 'OH', active: true },
  { label: 'Oklahoma', short: 'OK', active: true },
  { label: 'Oregon', short: 'OR', active: true },
  { label: 'Pennsylvania', short: 'PA', active: true },
  { label: 'Rhode Island', short: 'RI', active: true },
  { label: 'South Carolina', short: 'SC', active: true },
  { label: 'South Dakota', short: 'SD', active: true },
  { label: 'Tennessee', short: 'TN', active: true },
  { label: 'Texas', short: 'TX', active: true },
  { label: 'Utah', short: 'UT', active: true },
  { label: 'Vermont', short: 'VT', active: true },
  { label: 'Virginia', short: 'VA', active: true },
  { label: 'Washington', short: 'WA', active: true },
  { label: 'West Virginia', short: 'WV', active: true },
  { label: 'Wisconsin', short: 'WI', active: true },
  { label: 'Wyoming', short: 'WY', active: true }
];

module.exports = { initStates };