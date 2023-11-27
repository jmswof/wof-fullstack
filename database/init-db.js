const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri, {
  family: 4
});

async function run() {
  try {
    const db = client.db('world-of-floors');
    let results = [];

    results.push(
      await initialize(
        db.collection('appointments'),
        [
          {
            active: true,
            agent: null,
            date: '2023-12-30T17:08:04.000Z',
            totalRooms: 5,
            floorType: [ 'CP', 'LV', 'WD' ],
            reference: [ 'SE', 'SM', 'PA', 'BB', 'TV', 'FI' ],
            internalNotes: 'A new customer.',
            salesNotes: 'Do not allow the customer to keep the demonstration materials at home. ',
            colorPreference: [ 'ET', 'OR' ],
            priority: [ 'CR', 'PR', 'SR', 'WP', 'CL', 'DR' ],
            customer: {
              firstName: 'Homer',
              lastName: 'Simpson',
              mobileNumber: '586-555-6832',
              phoneNumber: '800-555-6752',
              email: 'homer@simpson.com',
              address: {
                street1: '742 Evergreen Terrace',
                city: 'Springfield',
                ustate: 'CA',
                zipCode: '90210',
                isResidential: true
              }
            }
          },
          {
            active: true,
            agent: null,
            date: '2023-12-24T17:08:04.000Z',
            totalRooms: 3,
            floorType: [ 'CP', 'LM' ],
            reference: [ 'RC', 'HA', 'PF', 'FI' ],
            internalNotes: 'One of our favorites.',
            salesNotes: 'Allow the customer to keep the demonstration materials at home for as long as needed.',
            colorPreference: [ 'TP', 'OR' ],
            priority: [ 'CL', 'PR' ],
            customer: {
              firstName: 'Ned',
              lastName: 'Flanders',
              mobileNumber: '502-555-7823',
              phoneNumber: '586-555-8904',
              email: 'ned@flanders.com',
              address: {
                street1: '740 Evergreen Terrace',
                city: 'Springfield',
                ustate: 'CA',
                zipCode: '90210',
                isResidential: true
              }
            }
          },
          {
            active: true,
            agent: null,
            date: '2023-12-15T17:08:04.000Z',
            totalRooms: 15,
            floorType: [ 'CP', 'LM', 'TL' ],
            reference: [ 'RC' ],
            internalNotes: 'This is not residential address.',
            salesNotes: '15+ potential rooms.',
            colorPreference: [ 'TP', 'OR' ],
            priority: [ 'CL', 'PR', 'DR', 'SR' ],
            customer: {
              firstName: 'Monty',
              lastName: 'Burns',
              mobileNumber: '502-401-8678',
              phoneNumber: '800-555-5246',
              email: 'ceo@nuclear.com',
              address: {
                street1: '100 Industrial Way',
                city: 'Springfield',
                ustate: 'CA',
                zipCode: '90212',
                isResidential: false
              }
            }
          },
        ]
      )
    )

    results.push(
      await initialize(
        db.collection('colors'),
        [
          { label: 'Gray', short: 'GR', active: true },
          { label: 'Earth Tone', short: 'ET', active: true },
          { label: 'Taupe', short: 'TP', active: true },
          { label: 'Other', short: 'OR', active: true }
        ]
      )
    );

    results.push(
      await initialize(
        db.collection('floor-types'),
        [
          { label: 'Carpet', short: 'CP', active: true },
          { label: 'Luxury Vinyl', short: 'LV', active: true },
          { label: 'Tile', short: 'TL', active: true },
          { label: 'Wood', short: 'WD', active: true },
          { label: 'Laminate', short: 'LM', active: true }
        ]
      )
    );

    results.push(
      await initialize(
        db.collection('priorities'),
        [
          { label: 'Price', short: 'PR', active: true },
          { label: 'Color', short: 'CR', active: true },
          { label: 'Waterproof', short: 'WP', active: true },
          { label: 'Scratch Resistant', short: 'SR', active: true },
          { label: 'Cleaning', short: 'CL', active: true },
          { label: 'Durability', short: 'DR', active: true },
          { label: 'Other', short: 'OR', active: true }
        ]
      )
    );

    results.push(
      await initialize(
        db.collection('products'),
        [
          { name: 'A product', cost: 2.99 },
          { name: 'B product', cost: 3.99 },
          { name: 'C product', cost: 4.99 }
        ]
      )
    );

    results.push(
      await initialize(
        db.collection('references'),
        [
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
        ]
      )
    );

    results.push(
      await initialize(
        db.collection('vendors'),
        [
          { label: 'Cali', short: 'CL', active: true },
          { label: 'DreamWeaver', short: 'DW', active: true },
          { label: 'Rong Gean', short: 'RG', active: true },
          { label: 'CDC', short: 'CD', active: true },
          { label: 'LWM', short: 'LW', active: true },
          { label: 'Engineered', short: 'EN', active: true },
          { label: 'WF', short: 'WF', active: true },
          { label: 'Nature', short: 'NA', active: true }
        ]
      )
    );

    results.push(
      await initialize(
        db.collection('labor-types'),
        [
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
        ]
      )
    );

    results.push(
      await initialize(
        db.collection('us-states'),
        [
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
        ]
      )
    );

    results.forEach(result => {
      console.table(result);
    });

  } finally {
    await client.close();
  }
}

async function initialize(collection, query) {
  let data = [];
  data.push(await collection.deleteMany({}));
  data.push(await collection.insertMany(query));
  return data;
}

run().catch(console.dir);