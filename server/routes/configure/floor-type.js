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
      let data;
      switch (request.query.type) {
        case 'active':
        case 'inactive':
          data = await floorTypes.find({ active : request.query.type === 'active' }).toArray();
          break;

        case 'all':
        default:
          data = await floorTypes.find().toArray();
          break;
      }

      response.json(data);
      console.log(`[HTTP][GET] ${route}: shared floorTypes[${data.length}] to ${request.token.email}`);
    });

    // POST /configure/floor-type (CREATE)
    app.post(route, cors(), async (request, response) => {
      response.json(await floorTypes.insertOne(request.body));
      console.log(`[HTTP][POST] ${route}: ${request.token.email} created a new ${request.body['label']} floor type.`);
    });

    // PATCH /configure/floor-type (UPDATE)
    app.patch(route, cors(), async (request, response) => {
      response.json(await floorTypes.updateOne(
        {_id: new ObjectId(request.body._id)},
        { $set: { name: request.body.name }},
        {}
      ));
      console.log(`[HTTP][PATCH] ${route}: ${request.token.email} updated a floor type.`);
    });

    // DELETE /configure/floor-type (DELETE)
    app.delete(route, cors(), async (request, response) => {
      response.json(
        await floorTypes.deleteMany({
          _id: { $in: request.body.map(id => (new ObjectId(id))) }
        })
      );
      console.log(`[HTTP][DELETE] ${route}: ${request.token.email} deleted ${request.body.length} floor type(s).`);
    });
};

const initFloorType = (app, route) => {
  initRest(app, route);

  return {stage: 'INIT', http: 'HTTP', ws: null, route: route};
};

module.exports = { initFloorType };