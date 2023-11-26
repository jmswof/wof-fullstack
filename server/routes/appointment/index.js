const cors = require('cors');
const admin = require("firebase-admin");
const { MongoClient, ObjectId } = require("mongodb");
const dbURL = process.env.WOF_DATABASE;
const client = new MongoClient(dbURL, { family: 4 /* Node 17+ requirement */ });
const database = client.db('world-of-floors');
const appointments = database.collection('appointments');


const initWs = (socketio, route) => {

  const nsp = socketio.of(route);
  nsp.on('connection', async (socket) => {
    await admin.auth().verifyIdToken(socket.handshake.auth.token)
      .then(async token => {
        socket.emit('list', await appointments.find({"agent": token.uid}).toArray());
        console.log(`[WS][CONNECTION] ${route}: clients[${nsp.sockets.size}], send appointments to ${token.email} at socket::list ${socket.id}`);
      })
      .catch(error => {
        console.log(`[WS][CONNECTION] ${route}: firebase error ${error}, terminating ${socket.id}`);
        socket.emit('error', 'Invalid credentials, terminating connection...');
        socket.disconnect();
      });

    socket.on('disconnect', () => {
      console.log(`[WS][DISCONNECT] ${route}: current clients size = ${nsp.sockets.size}`);
    });

    socket.on('error', (error) => {
      console.log(`[WS][ERROR] ${route}: error'd = ${error}`);
    });
  });

  return nsp;
}

const initRest = (wss, app, route) => {

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
};

const initAppointments = (socketio, app, route) => {

  initRest(
    initWs(socketio, route),
    app,
    route
  );

  return {stage: 'INIT', http: 'HTTP', ws: 'WS', route: route};
};

module.exports = { initAppointments };