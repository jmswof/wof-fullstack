const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri, { family: 4 });
const db = client.db('world-of-floors');
const collection = db.collection('sale-agents');

const initSaleAgents = async (firebaseUsers) => {
  let result = [];
  result.push(await collection.deleteMany({}));
  result.push(await collection.insertMany([
    {firstName: 'Jason', lastName: 'Schwebke', active: true, firebase: firebaseUsers.find(user => user.email === 'jmsweb@wof.com')},
    {firstName: 'Emil', lastName: 'Pedick', active: true, firebase: firebaseUsers.find(user => user.email === 'emil@worldoffloors.com')}
  ]));
  //console.table(result);
  // process.exit();
  return result;
};

module.exports = { initSaleAgents };