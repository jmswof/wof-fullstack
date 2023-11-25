const cors = require('cors');
const { MongoClient, ObjectId } = require("mongodb");
const dbURL = process.env.WOF_DATABASE;
const client = new MongoClient(dbURL, { family: 4 /* Node 17+ requirement */ });
const database = client.db('world-of-floors');
const appointments = database.collection('appointments');

const initRest = (app, route) => {

    // GET /appointments (READ)
    app.get(route, cors(), async (request, response) => {
      const data = await appointments.find().toArray();
      response.json(data);
      console.log(`[HTTP][GET] ${route}: shared appointments[${data.length}] to ${request.token.email}`);
    });

    // POST /appointments (CREATE)
    app.post(route, cors(), async (request, response) => {
      response.json(await appointments.insertOne(request.body));
      console.log(`[HTTP][POST] ${route}: ${request.token.email} created new appointment for ${request.body.scheduleDate}`);
    });

    // PATCH /appointments (UPDATE)
    app.patch(route, cors(), async (request, response) => {
      response.json(await appointments.updateOne(
        {_id: new ObjectId(request.body._id)},
        { $set: { 
          agent: request.body.agent,
          floorTypes: request.body.floorTypes,
          scheduleDate: request.body.scheduleDate
        }},
        {}
      ));
      console.log(`[HTTP][PATCH] ${route}: ${request.token.email} updated an appointment.`);
    });

    // DELETE /appointments (DELETE)
    app.delete(route, cors(), async (request, response) => {
      response.json(
        await appointments.deleteMany({
          _id: { $in: request.body.map(id => (new ObjectId(id))) }
        })
      );
      console.log(`[HTTP][DELETE] ${route}: ${request.token.email} deleted ${request.body.length} appointment(s).`);
    });

    console.log(`[INIT][HTTP] ${route}`);
};

const initAppointments = (app, route) => initRest(app, route);

module.exports = { initAppointments };