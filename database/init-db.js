const { initStates } = require("./collection/us-state");
const { initLaborTypes } = require("./collection/labor-type");
const { initJobServices } = require("./collection/job-service");
const { initVendor } = require("./collection/vendor");
const { initReferences } = require("./collection/reference");
const { initPriorities } = require("./collection/priority");
const { initColors } = require("./collection/color");
const { initFloorTypes } = require("./collection/floor-type");
const { initProducts } = require("./collection/product");
const { initAppointments } = require("./collection/appointment");
const { initFirebaseUsers } = require("./collection/firebase-user");
const { initSaleAgents } = require("./collection/sale-agent");

async function run() {
  try {
    const firebaseUsers = await initFirebaseUsers();
    const products = await initProducts();
    const floorTypes = await initFloorTypes();
    const colors = await initColors();
    const priorities = await initPriorities();
    const references = await initReferences();
    const laborTypes = await initLaborTypes();
    const states = await initStates();
    const jobServices = await initJobServices();
    const vendors = await initVendor();
    const saleAgents = await initSaleAgents(firebaseUsers);
    const appointments = await initAppointments(colors, firebaseUsers, floorTypes, priorities, references, saleAgents, states);

    [
      firebaseUsers,
      colors,
      floorTypes,
      jobServices,
      laborTypes,
      priorities,
      products,
      references,
      states,
      vendors,
      saleAgents,
      appointments
    ].forEach(result => {
      console.table(result);
    });

  } finally {
    process.exit(0);
  }
}

run().catch(console.dir);