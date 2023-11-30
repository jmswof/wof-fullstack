const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri, { family: 4 });
const db = client.db('world-of-floors');
const collection = db.collection('appointments');

const initAppointments = async (colors, floorTypes, priorities, references, saleAgents, states) => {
  let result = [];
  result.push(await collection.deleteMany({}));
  result.push(await collection.insertMany(data(colors[1].insertedIds, floorTypes[1].insertedIds, priorities[1].insertedIds, references[1].insertedIds, saleAgents[1].insertedIds, states[1].insertedIds)));  
  //console.table(result);
  // process.exit();
  return result;
};

const data = (colors, floorTypes, priorities, references, saleAgents, states) => [
  {
    active: true,
    agent: saleAgents[0],
    date: '2023-12-30T17:08:04.000Z',
    totalRooms: 5,
    floorType: [floorTypes[0], floorTypes[1], floorTypes[3]],
    reference: [references[2], references[3], references[4], references[5], references[6], references[10]],
    internalNotes: 'A new customer.',
    salesNotes: 'Do not allow the customer to keep the demonstration materials at home. ',
    colorPreference: [colors[1], colors[3]],
    priority: [priorities[0], priorities[1], priorities[2], priorities[3], priorities[4], priorities[5]],
    customer: {
      firstName: 'Homer',
      lastName: 'Simpson',
      mobileNumber: '586-555-6832',
      phoneNumber: '800-555-6752',
      email: 'homer@simpson.com',
      address: {
        street1: '742 Evergreen Terrace',
        city: 'Springfield',
        ustate: states[13],
        zipCode: '90210',
        isResidential: true
      }
    }
  },
  {
    active: true,
    agent: saleAgents[0],
    date: '2023-12-24T17:08:04.000Z',
    totalRooms: 3,
    floorType: [floorTypes[0], floorTypes[4]],
    reference: [references[0], references[8], references[9], references[10]],
    internalNotes: 'One of our favorites.',
    salesNotes: 'Allow the customer to keep the demonstration materials at home for as long as needed.',
    colorPreference: [colors[2], colors[3]],
    priority: [priorities[0], priorities[6]],
    customer: {
      firstName: 'Ned',
      lastName: 'Flanders',
      mobileNumber: '502-555-7823',
      phoneNumber: '586-555-8904',
      email: 'ned@flanders.com',
      address: {
        street1: '740 Evergreen Terrace',
        city: 'Springfield',
        ustate: states[13],
        zipCode: '90210',
        isResidential: true
      }
    }
  },
  {
    active: true,
    agent: saleAgents[1],
    date: '2023-12-15T17:08:04.000Z',
    totalRooms: 15,
    floorType: [floorTypes[0], floorTypes[2], floorTypes[4]],
    reference: [references[0]],
    internalNotes: 'This is not residential address.',
    salesNotes: '15+ potential rooms.',
    colorPreference: [colors[2], colors[3]],
    priority: [priorities[0], priorities[3], priorities[4], priorities[5]],
    customer: {
      firstName: 'Monty',
      lastName: 'Burns',
      mobileNumber: '502-401-8678',
      phoneNumber: '800-555-5246',
      email: 'ceo@nuclear.com',
      address: {
        street1: '100 Industrial Way',
        city: 'Springfield',
        ustate: states[13],
        zipCode: '90212',
        isResidential: false
      }
    }
  }
];

module.exports = { initAppointments };