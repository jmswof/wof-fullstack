const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri, { family: 4 });
const db = client.db('world-of-floors');
const collection = db.collection('job-services');

const initJobServices = async () => {
  let result = [];
  result.push(await collection.deleteMany({}));
  result.push(await collection.insertMany(data));
  //console.table(result);
  // process.exit();
  return result;
};

const data = [
  { label: 'Tackless', short: '', active: true, unit: 'sqft' },
  { label: 'Glue Down', short: '', active: true, unit: 'sqft' },
  { label: 'Nail / Staple', short: '', active: true, unit: 'sqft' },
  { label: 'Appliance', short: '', active: true, unit: 'each' },
  { label: 'Shoe Molding', short: '', active: true, unit: 'lnft' },
  { label: 'Regular', short: '', active: true, unit: 'sqft' },
  { label: 'Base Molding', short: '', active: true, unit: 'lnft' },
  { label: 'Toilet', short: '', active: true, unit: 'each' },
  { label: 'Laundry Tub', short: '', active: true, unit: 'each' },
  { label: 'Piano (Upright Only)', short: '', active: true, unit: 'each' },
  { label: 'Pool Table (no slate)', short: '', active: true, unit: 'each' },
  { label: 'Carpet (Tackless)', short: '', active: true, unit: 'sqft' },
  { label: 'Carpet (Glue)', short: '', active: true, unit: 'sqft' },
  { label: 'Wood (Nail/Staple)', short: '', active: true, unit: 'sqft' },
  { label: 'Wood (Glue)', short: '', active: true, unit: 'sqft' },
  { label: 'Ceramic over Backer Board', short: '', active: true, unit: 'sqft' },
  { label: 'Ceramic over Wood', short: '', active: true, unit: 'sqft' },
  { label: 'Nail w/Glue Assist', short: '', active: true, unit: 'sqft' },
  { label: 'Float (Click)', short: '', active: true, unit: 'sqft' },
  { label: 'Float (Glue)', short: '', active: true, unit: 'sqft' },
  { label: 'Large/Extra', short: '', active: true, unit: 'sqft' },
  { label: 'Pedestal Sink', short: '', active: true, unit: 'each' },
  { label: 'Loose Lay', short: '', active: true, unit: 'sqft' },
  { label: 'Vinyl/LVP/Laminate (Glue)', short: '', active: true, unit: 'sqft' },
  { label: 'LVP/Laminate (Click)', short: '', active: true, unit: 'sqft' },
  { label: 'Plywood', short: '', active: true, unit: 'sqft' },
  { label: 'T-Molding', short: '', active: true, unit: 'lnft' },
  { label: 'Reducer', short: '', active: true, unit: 'lnft' },
  { label: 'Stair Nose', short: '', active: true, unit: 'lnft' },
  { label: 'Stringer', short: '', active: true, unit: 'lnft' },
  { label: 'Spindle', short: '', active: true, unit: 'each' },
  { label: 'Diagonal', short: '', active: true, unit: 'sqft' },
  { label: 'Grout', short: '', active: true, unit: 'sqft' },
  { label: 'Outdoor', short: '', active: true, unit: 'sqft' },
  { label: 'On Wall', short: '', active: true, unit: 'sqft' },
  { label: 'Embossing Leveler', short: '', active: true, unit: 'sqft' },
  { label: 'Skim Coat', short: '', active: true, unit: 'sqft' },
  { label: 'Shim', short: '', active: true, unit: 'lnft' },
  { label: 'Plywood', short: '', active: true, unit: 'sqft' },
  { label: 'Glue Down (Click)', short: '', active: true, unit: 'sqft' },
  { label: 'VCT Tile', short: '', active: true, unit: 'sqft' },
  { label: 'Regular', short: '', active: true, unit: 'each' },
  { label: 'Regular Landing', short: '', active: true, unit: 'each' },
  { label: 'Regular Tread Only', short: '', active: true, unit: 'each' },
  { label: 'Regular Tread Only Landing', short: '', active: true, unit: 'each' },
  { label: 'Single Cap', short: '', active: true, unit: 'each' },
  { label: 'Single Cap Landing', short: '', active: true, unit: 'each' },
  { label: 'Single Cap Tread Only', short: '', active: true, unit: 'each' },
  { label: 'Single Cap Tread Only Landing', short: '', active: true, unit: 'each' },
  { label: 'Double Cap', short: '', active: true, unit: 'each' },
  { label: 'Double Cap Landing', short: '', active: true, unit: 'each' },
  { label: 'Double Cap Tread Only', short: '', active: true, unit: 'each' },
  { label: 'Double Cap Tread Only Landing', short: '', active: true, unit: 'each' },
  { label: 'UPH', short: '', active: true, unit: 'each' },
  { label: 'UPH Landing', short: '', active: true, unit: 'each' },
  { label: 'UPH Tread Only', short: '', active: true, unit: 'each' },
  { label: 'UPH Tread Only Landing', short: '', active: true, unit: 'each' },
  { label: 'Pie', short: '', active: true, unit: 'each' },
  { label: 'Pie Landing', short: '', active: true, unit: 'each' },
  { label: 'Pie Tread Only', short: '', active: true, unit: 'each' },
  { label: 'Pie Tread Only Landing', short: '', active: true, unit: 'each' },
  { label: 'Birdcage', short: '', active: true, unit: 'each' },
  { label: 'Birdcage Landing', short: '', active: true, unit: 'each' },
  { label: 'Birdcage Tread Only', short: '', active: true, unit: 'each' },
  { label: 'Birdcage Tread Only Landing', short: '', active: true, unit: 'each' },
  { label: 'Double Birdcage', short: '', active: true, unit: 'each' },
  { label: 'Double Birdcage Landing', short: '', active: true, unit: 'each' },
  { label: 'Double Birdcage Tread Only', short: '', active: true, unit: 'each' },
  { label: 'Double Birdcage Tread Only Landing', short: '', active: true, unit: 'each' },
  { label: 'Wrapped', short: '', active: true, unit: 'each' },
  { label: 'Wrapped Landing', short: '', active: true, unit: 'each' },
  { label: 'Complex Reducer', short: '', active: true, unit: 'lnft' },
  { label: 'Minor Prep', short: '', active: true, unit: 'lnft' },
  { label: 'Metal Gripper', short: '', active: true, unit: 'lnft' },
  { label: 'Metal Flat Bar', short: '', active: true, unit: 'lnft'}
];

module.exports = { initJobServices };