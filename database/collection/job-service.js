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
  { label: 'Tackless', active: true, unit: 'sqft' },
  { label: 'Glue Down', active: true, unit: 'sqft' },
  { label: 'Nail / Staple', active: true, unit: 'sqft' },
  { label: 'Appliance', active: true, unit: 'each' },
  { label: 'Shoe Molding', active: true, unit: 'lnft' },
  { label: 'Regular', active: true, unit: 'sqft' },
  { label: 'Base Molding', active: true, unit: 'lnft' },
  { label: 'Toilet', active: true, unit: 'each' },
  { label: 'Laundry Tub', active: true, unit: 'each' },
  { label: 'Piano (Upright Only)', active: true, unit: 'each' },
  { label: 'Pool Table (no slate)', active: true, unit: 'each' },
  { label: 'Carpet (Tackless)', active: true, unit: 'sqft' },
  { label: 'Carpet (Glue)', active: true, unit: 'sqft' },
  { label: 'Wood (Nail/Staple)', active: true, unit: 'sqft' },
  { label: 'Wood (Glue)', active: true, unit: 'sqft' },
  { label: 'Ceramic over Backer Board', active: true, unit: 'sqft' },
  { label: 'Ceramic over Wood', active: true, unit: 'sqft' },
  { label: 'Nail w/Glue Assist', active: true, unit: 'sqft' },
  { label: 'Float (Click)', active: true, unit: 'sqft' },
  { label: 'Float (Glue)', active: true, unit: 'sqft' },
  { label: 'Large/Extra', active: true, unit: 'sqft' },
  { label: 'Pedestal Sink', active: true, unit: 'each' },
  { label: 'Loose Lay', active: true, unit: 'sqft' },
  { label: 'Vinyl/LVP/Laminate (Glue)', active: true, unit: 'sqft' },
  { label: 'LVP/Laminate (Click)', active: true, unit: 'sqft' },
  { label: 'Plywood', active: true, unit: 'sqft' },
  { label: 'T-Molding', active: true, unit: 'lnft' },
  { label: 'Reducer', active: true, unit: 'lnft' },
  { label: 'Stair Nose', active: true, unit: 'lnft' },
  { label: 'Stringer', active: true, unit: 'lnft' },
  { label: 'Spindle', active: true, unit: 'each' },
  { label: 'Diagonal', active: true, unit: 'sqft' },
  { label: 'Grout', active: true, unit: 'sqft' },
  { label: 'Outdoor', active: true, unit: 'sqft' },
  { label: 'On Wall', active: true, unit: 'sqft' },
  { label: 'Embossing Leveler', active: true, unit: 'sqft' },
  { label: 'Skim Coat', active: true, unit: 'sqft' },
  { label: 'Shim', active: true, unit: 'lnft' },
  { label: 'Plywood', active: true, unit: 'sqft' },
  { label: 'Glue Down (Click)', active: true, unit: 'sqft' },
  { label: 'VCT Tile', active: true, unit: 'sqft' },
  { label: 'Regular', active: true, unit: 'each' },
  { label: 'Regular Landing', active: true, unit: 'each' },
  { label: 'Regular Tread Only', active: true, unit: 'each' },
  { label: 'Regular Tread Only Landing', active: true, unit: 'each' },
  { label: 'Single Cap', active: true, unit: 'each' },
  { label: 'Single Cap Landing', active: true, unit: 'each' },
  { label: 'Single Cap Tread Only', active: true, unit: 'each' },
  { label: 'Single Cap Tread Only Landing', active: true, unit: 'each' },
  { label: 'Double Cap', active: true, unit: 'each' },
  { label: 'Double Cap Landing', active: true, unit: 'each' },
  { label: 'Double Cap Tread Only', active: true, unit: 'each' },
  { label: 'Double Cap Tread Only Landing', active: true, unit: 'each' },
  { label: 'UPH', active: true, unit: 'each' },
  { label: 'UPH Landing', active: true, unit: 'each' },
  { label: 'UPH Tread Only', active: true, unit: 'each' },
  { label: 'UPH Tread Only Landing', active: true, unit: 'each' },
  { label: 'Pie', active: true, unit: 'each' },
  { label: 'Pie Landing', active: true, unit: 'each' },
  { label: 'Pie Tread Only', active: true, unit: 'each' },
  { label: 'Pie Tread Only Landing', active: true, unit: 'each' },
  { label: 'Birdcage', active: true, unit: 'each' },
  { label: 'Birdcage Landing', active: true, unit: 'each' },
  { label: 'Birdcage Tread Only', active: true, unit: 'each' },
  { label: 'Birdcage Tread Only Landing', active: true, unit: 'each' },
  { label: 'Double Birdcage', active: true, unit: 'each' },
  { label: 'Double Birdcage Landing', active: true, unit: 'each' },
  { label: 'Double Birdcage Tread Only', active: true, unit: 'each' },
  { label: 'Double Birdcage Tread Only Landing', active: true, unit: 'each' },
  { label: 'Wrapped', active: true, unit: 'each' },
  { label: 'Wrapped Landing', active: true, unit: 'each' },
  { label: 'Complex Reducer', active: true, unit: 'lnft' },
  { label: 'Minor Prep', active: true, unit: 'lnft' },
  { label: 'Metal Gripper', active: true, unit: 'lnft' },
  { label: 'Metal Flat Bar', active: true, unit: 'lnft'}
];

module.exports = { initJobServices };