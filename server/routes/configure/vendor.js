const cors = require('cors');
const { MongoClient, ObjectId } = require("mongodb");
const dbURL = process.env.WOF_DATABASE;
const client = new MongoClient(dbURL, { family: 4 /* Node 17+ requirement */ });

const database = client.db('world-of-floors');
const vendors = database.collection('vendors');

const initRest = (app, route) => {

    // GET /configure/vendor (READ)
    app.get(route, cors(), async (request, response) => {
      let data;
      switch (request.query.type) {
        case 'active':
        case 'inactive':
          data = await vendors.find({ active : request.query.type === 'active' }).toArray();
          break;

        case 'all':
        default:
          data = await vendors.find().toArray();
          break;
      }

      response.json(data);
      console.log(`[HTTP][GET] ${route}: shared vendors[${data.length}] to ${request.token.email}`);
    });

    // POST /configure/vendors (CREATE)
    app.post(route, cors(), async (request, response) => {
      const data = request.body;
      if (
        !data.hasOwnProperty('active') ||
        !data.hasOwnProperty('label') ||
        !data.hasOwnProperty('short')
      ) {
        console.log(`[HTTP][${request.method}] ${request.url} invalid POST data, response with 400 Bad Request`);
        response.sendStatus(400);
        return;
      }

      response.json(await vendors.insertOne(data));
      console.log(`[HTTP][POST] ${route}: ${request.token.email} created a new ${data['label']} Vendor.`);
    });

    // PATCH /configure/vendors (UPDATE)
    app.patch(route, cors(), async (request, response) => {
      // response.json(await floorTypes.updateOne(
      //   {_id: new ObjectId(request.body._id)},
      //   { $set: { name: request.body.name }},
      //   {}
      // ));
      console.log(`[HTTP][PATCH] ${route}: ${request.token.email} updated a vendor.`);
    });

    // DELETE /configure/vendors (DELETE)
    app.delete(route, cors(), async (request, response) => {
      // response.json(
      //   await floorTypes.deleteMany({
      //     _id: { $in: request.body.map(id => (new ObjectId(id))) }
      //   })
      // );
      console.log(`[HTTP][DELETE] ${route}: ${request.token.email} deleted ${request.body.length} vendors(s).`);
    });
};

const initVendor= (app, route) => {
  initRest(app, route);

  return {stage: 'INIT', http: 'HTTP', ws: null, route: route};
};

module.exports = { initVendor };