const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri, { family: 4 });
const db = client.db('world-of-floors');
const collection = db.collection('appointments');

const initAppointments = async (colors, firebaseUsers, floorTypes, priorities, references, saleAgents, states) => {
  let result = [];
  result.push(await collection.deleteMany({}));
  result.push(await collection.insertMany(
    data(
      firebaseUsers,
      colors[1].insertedIds,
      floorTypes[1].insertedIds,
      priorities[1].insertedIds,
      references[1].insertedIds,
      saleAgents[1].insertedIds,
      states[1].insertedIds
    )
  ));  
  //console.table(result);
  // process.exit();
  return result;
};

const data = (firebaseUsers, colors, floorTypes, priorities, references, saleAgents, states) => [
  {
    active: true,
    agent: {
      _id: saleAgents[0],
      firstName: 'Jason',
      lastName: 'Schwebke',
      active: true,
      firebase: firebaseUsers.find(user => user.email === 'jmsweb@wof.com')
    },
    date: '2023-12-30T17:08:04.000Z',
    totalRooms: 5,
    floorType: [
      {_id: floorTypes[0], label: 'Carpet', active: true},
      {_id: floorTypes[1], label: 'Luxury Vinyl', active: true},
      {_id: floorTypes[3], label: 'Wood', active: true}
    ],
    reference: [
      {_id: references[2], label: 'Search Engine', active: true},
      {_id: references[3], label: 'Social Media', active: true},
      {_id: references[4], label: 'Print Ad', active: true},
      {_id: references[5], label: 'Television', active: true},
      {_id: references[6], label: 'Billboard', active: true},
      {_id: references[10], label: 'Fest Italiana', active: true}
    ],
    internalNotes: 'A new customer.',
    salesNotes: 'Do not allow the customer to keep the demonstration materials at home. ',
    colorPreference: [
      {_id: colors[1], label: 'Earth Tone', active: true},
      {_id: colors[3], label: 'Other', active: true}
    ],
    priority: [
      {_id: priorities[0], label: 'Price', active: true},
      {_id: priorities[1], label: 'Color', active: true},
      {_id: priorities[2], label: 'Waterproof', active: true},
      {_id: priorities[3], label: 'Scratch Resistant', active: true},
      {_id: priorities[4], label: 'Cleaning', active: true},
      {_id: priorities[5], label: 'Durability', active: true},
    ],
    customer: {
      firstName: 'Homer',
      lastName: 'Simpsons',
      mobileNumber: '586-555-6832',
      phoneNumber: '800-555-6752',
      email: 'homer@simpsons.com',
      address: {
        street1: '742 Evergreen Terrace',
        city: 'Springfield',
        ustate: {_id: states[13], label: 'California', short: 'CA', active: true},
        zipCode: '90210',
        isResidential: true
      }
    }
  },
  {
    active: true,
    agent: {
      _id: saleAgents[0],
      firstName: 'Jason',
      lastName: 'Schwebke',
      active: true,
      firebase: firebaseUsers.find(user => user.email === 'jmsweb@wof.com')
    },
    date: '2023-12-24T17:08:04.000Z',
    totalRooms: 3,
    floorType: [
      {_id: floorTypes[0], label: 'Carpet', active: true},
      {_id: floorTypes[4], label: 'Laminate', active: true}
    ],
    reference: [
      {_id: references[0], label: 'Return Customer', active: true},
      {_id: references[8], label: 'HomeAdvisor', active: true},
      {_id: references[9], label: 'Polish Festival', active: true},
      {_id: references[10], label: 'Fest Italiana', active: true},
    ],
    internalNotes: 'One of our favorites.',
    salesNotes: 'Allow the customer to keep the demonstration materials at home for as long as needed.',
    colorPreference: [
      {_id: colors[2], label: 'Taupe', active: true},
      {_id: colors[3], label: 'Other', active: true}
    ],
    priority: [
      {_id: priorities[0], label: 'Price', active: true},
      {_id: priorities[6], label: 'Other', active: true},
    ],
    customer: {
      firstName: 'Ned',
      lastName: 'Flanders',
      mobileNumber: '502-555-7823',
      phoneNumber: '586-555-8904',
      email: 'ned@flanders.com',
      address: {
        street1: '740 Evergreen Terrace',
        city: 'Springfield',
        ustate: {_id: states[13], label: 'California', short: 'CA', active: true},
        zipCode: '90210',
        isResidential: true
      }
    }
  },
  {
    active: true,
    agent: {
      _id: saleAgents[1],
      firstName: 'Emil',
      lastName: 'Pedick',
      active: true,
      firebase: firebaseUsers.find(user => user.email === 'emil@worldoffloors.com')
    },
    date: '2023-12-15T17:08:04.000Z',
    totalRooms: 15,
    floorType: [
      {_id: floorTypes[0], label: 'Carpet', active: true},
      {_id: floorTypes[2], label: 'Tile', active: true},
      {_id: floorTypes[4], label: 'Laminate', active: true}
    ],
    reference: [
      {_id: references[0], label: 'Return Customer', active: true}
    ],
    internalNotes: 'This is not residential address.',
    salesNotes: '15+ potential rooms.',
    colorPreference: [
      {_id: colors[2], label: 'Taupe', active: true},
      {_id: colors[3], label: 'Other', active: true}
    ],
    priority: [
      {_id: priorities[0], label: 'Price', active: true},
      {_id: priorities[3], label: 'Scratch Resistant', active: true},
      {_id: priorities[4], label: 'Cleaning', active: true},
      {_id: priorities[5], label: 'Durability', active: true},
    ],
    customer: {
      firstName: 'Monty',
      lastName: 'Burns',
      mobileNumber: '502-401-8678',
      phoneNumber: '800-555-5246',
      email: 'ceo@nuclear.com',
      address: {
        street1: '100 Industrial Way',
        city: 'Springfield',
        ustate: {_id: states[13], label: 'California', short: 'CA', active: true},
        zipCode: '90212',
        isResidential: false
      }
    }
  },
  {
    active: true,
    agent: null,
    date: '2023-12-15T17:08:04.000Z',
    totalRooms: 2,
    floorType: [
      {_id: floorTypes[0], label: 'Carpet', active: true},
      {_id: floorTypes[4], label: 'Laminate', active: true}
    ],
    reference: [
      {_id: references[1], label: 'Referral', active: true}
    ],
    internalNotes: 'Two appointments at same address.',
    salesNotes: 'Do not allow either one of the customers to keep the demonstration materials at home. ',
    colorPreference: [
      {_id: colors[2], label: 'Taupe', active: true}
    ],
    priority: [
      {_id: priorities[4], label: 'Cleaning', active: true},
      {_id: priorities[5], label: 'Durability', active: true},
    ],
    customer: {
      firstName: 'Marge',
      lastName: 'Simpsons',
      mobileNumber: '586-555-6832',
      phoneNumber: '800-555-6752',
      email: 'marge@simpsons.com',
      address: {
        street1: '742 Evergreen Terrace',
        city: 'Springfield',
        ustate: {_id: states[13], label: 'California', short: 'CA', active: true},
        zipCode: '90210',
        isResidential: true
      }
    }
  }
];

module.exports = { initAppointments };