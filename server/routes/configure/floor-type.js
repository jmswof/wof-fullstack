const cors = require('cors');
const admin = require("firebase-admin");
const { MongoClient, ObjectId } = require("mongodb");
const dbURL = process.env.WOF_DATABASE;
const client = new MongoClient(dbURL, { family: 4 /* Node 17+ requirement */ });

const database = client.db('world-of-floors');
const floorTypes = database.collection('floor-types');

const initRest = (app, route) => {

    // GET /configure/floor-type (READ)
    app.get(route, cors(), async (request, response) => {
      if (!request.headers.authorization) {
        response.status(403).end();
        console.log(`[HTTP][GET] ${route}: unauthorized header, return a 403 response...`);
        return;
      }

      const clientToken = atob(request.headers.authorization.split(' ')[1]);

      await admin.auth().verifyIdToken(clientToken)
        .then(async token => {
          const data = await floorTypes.find().toArray();
          response.json(data);
          console.log(`[HTTP][GET] ${route}: verified token - response with array of floorTypes[${data.length}] to ${token.email}`);
        })
        .catch(error => {
          console.log(`[HTTP][GET] ${route}: invalid token - ${error}`);
          response.status(403).end();
        });
    });

    // TODO VERIFY TOKEN FOR ALL TYPE OF REQUESTS BELOW!!!!

    // POST /configure/floor-type (CREATE)
    app.post(route, cors(), async (request, response) => {
      console.log(request.body);
      response.json(await floorTypes.insertOne(request.body));
    });

    // PATCH /configure/floor-type (UPDATE)
    app.patch(route, cors(), async (request, response) => {
      console.log(request.body);
      response.json(await floorTypes.updateOne(
        {_id: new ObjectId(request.body._id)},
        { $set: { name: request.body.name }},
        {}
      ));
    });

    // DELETE /configure/floor-type (DELETE)
    app.delete(route, cors(), async (request, response) => {
      console.log(request.body);
      response.json(
        await floorTypes.deleteMany({
          _id: { $in: request.body.map(id => (new ObjectId(id))) }
        })
      );
    });

    console.log(`[INIT] initialized REST on ${route} CRUD routes...`);
};

const initFloorType = (app, route) => initRest(app, route);

module.exports = { initFloorType };