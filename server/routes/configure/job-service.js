const cors = require('cors');
const { MongoClient, ObjectId } = require("mongodb");
const dbURL = process.env.WOF_DATABASE;
const client = new MongoClient(dbURL, { family: 4 /* Node 17+ requirement */ });

const database = client.db('world-of-floors');
const jobServices = database.collection('job-services');

const initRest = (app, route) => {

    // GET /configure/job-service (READ)
    app.get(route, cors(), async (request, response) => {
      let data;
      switch (request.query.type) {
        case 'active':
        case 'inactive':
          data = await jobServices.find({ active : request.query.type === 'active' }).toArray();
          break;

        case 'all':
        default:
          data = await jobServices.find().toArray();
          break;
      }

      response.json(data);
      console.log(`[HTTP][GET] ${route}: shared jobServices[${data.length}] to ${request.token.email}`);
    });

    // POST /configure/job-service (CREATE)
    app.post(route, cors(), async (request, response) => {
      const data = request.body;
      if (!data.hasOwnProperty('active') || !data.hasOwnProperty('label')) {
        console.log(`[HTTP][${request.method}] ${request.url} invalid POST data, response with 400 Bad Request`);
        response.sendStatus(400);
        return;
      }

      response.json(await jobServices.insertOne(data));
      console.log(`[HTTP][POST] ${route}: ${request.token.email} created a new ${data['label']} Job Service.`);
    });

    // PATCH /configure/job-service (UPDATE)
    app.patch(route, cors(), async (request, response) => {
      // response.json(await floorTypes.updateOne(
      //   {_id: new ObjectId(request.body._id)},
      //   { $set: { name: request.body.name }},
      //   {}
      // ));
      console.log(`[HTTP][PATCH] ${route}: ${request.token.email} updated a job service.`);
    });

    // DELETE /configure/job-service (DELETE)
    app.delete(route, cors(), async (request, response) => {
      // response.json(
      //   await floorTypes.deleteMany({
      //     _id: { $in: request.body.map(id => (new ObjectId(id))) }
      //   })
      // );
      console.log(`[HTTP][DELETE] ${route}: ${request.token.email} deleted ${request.body.length} job service(s).`);
    });
};

const initJobService = (app, route) => {
  initRest(app, route);

  return {stage: 'INIT', http: 'HTTP', ws: null, route: route};
};

module.exports = { initJobService };