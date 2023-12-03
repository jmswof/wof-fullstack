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
  { label: 'Tackless', active: true },
  { label: 'Glue Down', active: true },
  { label: 'Nail / Staple', active: true },
  { label: 'Appliance', active: true },
  { label: 'Shoe Molding', active: true },
  { label: 'Base Molding', active: true },
  { label: 'Toilet', active: true },
  { label: 'Laundry Tub', active: true },
  { label: 'Piano (Upright Only)', active: true },
  { label: 'Pool Table (no slate)', active: true },
  { label: 'Carpet (Tackless)', active: true },
  { label: 'Carpet (Glue)', active: true },
  { label: 'Wood (Nail/Staple)', active: true },
  { label: 'Wood (Glue)', active: true },
  { label: 'Ceramic over Backer Board', active: true },
  { label: 'Ceramic over Wood', active: true },
  { label: 'Nail w/Glue Assist', active: true },
  { label: 'Float (Click)', active: true },
  { label: 'Float (Glue)', active: true },
  { label: 'Large/Extra', active: true },
  { label: 'Pedestal Sink', active: true },
  { label: 'Loose Lay', active: true },
  { label: 'Vinyl/LVP/Laminate (Glue)', active: true },
  { label: 'LVP/Laminate (Click)', active: true },
  { label: 'T-Molding', active: true },
  { label: 'Reducer', active: true },
  { label: 'Stair Nose', active: true },
  { label: 'Stringer', active: true },
  { label: 'Spindle', active: true },
  { label: 'Diagonal', active: true },
  { label: 'Grout', active: true },
  { label: 'Outdoor', active: true },
  { label: 'On Wall', active: true },
  { label: 'Embossing Leveler', active: true },
  { label: 'Skim Coat', active: true },
  { label: 'Shim', active: true },
  { label: 'Plywood', active: true },
  { label: 'Glue Down (Click)', active: true },
  { label: 'VCT Tile', active: true },
  { label: 'Regular', active: true },
  { label: 'Regular Landing', active: true },
  { label: 'Regular Tread Only', active: true },
  { label: 'Regular Tread Only Landing', active: true },
  { label: 'Single Cap', active: true },
  { label: 'Single Cap Landing', active: true },
  { label: 'Single Cap Tread Only', active: true },
  { label: 'Single Cap Tread Only Landing', active: true },
  { label: 'Double Cap', active: true },
  { label: 'Double Cap Landing', active: true },
  { label: 'Double Cap Tread Only', active: true },
  { label: 'Double Cap Tread Only Landing', active: true },
  { label: 'UPH', active: true },
  { label: 'UPH Landing', active: true },
  { label: 'UPH Tread Only', active: true },
  { label: 'UPH Tread Only Landing', active: true },
  { label: 'Pie', active: true },
  { label: 'Pie Landing', active: true },
  { label: 'Pie Tread Only', active: true },
  { label: 'Pie Tread Only Landing', active: true },
  { label: 'Birdcage', active: true },
  { label: 'Birdcage Landing', active: true },
  { label: 'Birdcage Tread Only', active: true },
  { label: 'Birdcage Tread Only Landing', active: true },
  { label: 'Double Birdcage', active: true },
  { label: 'Double Birdcage Landing', active: true },
  { label: 'Double Birdcage Tread Only', active: true },
  { label: 'Double Birdcage Tread Only Landing', active: true },
  { label: 'Wrapped', active: true },
  { label: 'Wrapped Landing', active: true },
  { label: 'Complex Reducer', active: true },
  { label: 'Minor Prep', active: true },
  { label: 'Metal Gripper', active: true },
  { label: 'Metal Flat Bar', active: true }
];

module.exports = { initJobServices };