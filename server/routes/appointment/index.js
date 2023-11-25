const cors = require('cors');
const { MongoClient, ObjectId } = require("mongodb");
const dbURL = process.env.WOF_DATABASE;
const client = new MongoClient(dbURL, { family: 4 /* Node 17+ requirement */ });
const database = client.db('world-of-floors');
const appointments = database.collection('appointments');

const initRest = (app, route) => {

    // GET /appointments (READ)
    app.get(route, cors(), async (request, response) => {
      response.json(await appointments.find().toArray());
      console.log(`[HTTP][GET] ${route}: shared appointments[${appointments.length}] to ${request.token.email}`);
    });

    // POST /appointments (CREATE)
    app.post(route, cors(), async (request, response) => {
      response.json(await appointments.insertOne(request.body));
      console.log(`[HTTP][POST] ${route}: ${request.token.email} created new appointment for ${request.body.scheduleDate}`);
    });

    // PATCH /appointments (UPDATE)
    app.patch(route, cors(), async (request, response) => {
      console.log(`[HTTP][PATCH] ${route}: ${request.token.email} not implemented yet`);
    });

    // DELETE /appointments (DELETE)
    app.delete(route, cors(), async (request, response) => {
      console.log(`[HTTP][DELETE] ${route}: ${request.token.email} not implemented yet`);
    });

    console.log(`[INIT][HTTP] ${route}`);
};

const initAppointments = (app, route) => initRest(app, route);

module.exports = { initAppointments };