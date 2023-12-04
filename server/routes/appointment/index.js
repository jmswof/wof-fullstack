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
        const list = await appointments.find({'agent.firebase.uid': token.uid}).toArray();
        socket.emit('list', list);
        console.log(`[WS][CONNECTION] ${route}: clients[${nsp.sockets.size}], send appointments[${list.length}] to ${token.email} at socket::list ${socket.id}`);
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
      let data;
      switch (request.query.type) {
        case 'unassigned':
          data = await appointments.find({ agent : null, active: true }).toArray();
          break;

      case 'assigned':
          data = await appointments.find({ agent : !null, active: true }).toArray();
          break;

      case 'active':
        data = await appointments.find({ active : true }).toArray();
        break;

      case 'inactive':
        data = await appointments.find({ active : false }).toArray();
        break;

      case 'single':
        if (!ObjectId.isValid(request.query.id)) {
          console.log(`[HTTP][${request.method}] ${request.url} invalid PUT data, response with 400 Bad Request`);
          response.sendStatus(400);
          return;
        }
        data = await appointments.findOne({ _id : new ObjectId(request.query.id)});
        break;

      case 'all':
      default:
        data = await appointments.find().toArray();
        break;
      }

      response.json(data);
      console.log(`[HTTP][GET] ${route}: shared appointments[${data.length ?? 'object'}] to ${request.token.email}`);
    });

    // POST /appointments (CREATE)
    app.post(route, cors(), async (request, response) => {
      response.json(await appointments.insertOne(request.body));
      console.log(`[HTTP][POST] ${route}: ${request.token.email} created new appointment for ${request.body.date}`);
    });

    // PATCH /appointments (UPDATE) ASSIGN AGENT TO APPOINTMENT
    app.patch(route, cors(), async (request, response) => {

      const data = request.body.map(
        async (data) => await appointments.updateOne(
          { _id: new ObjectId(data.appointment._id) },
          { $set: { agent: data.saleAgent }},
          {}
        )
      );
      response.json(data);
      console.log(`[HTTP][PATCH] ${route}: ${request.token.email} updated ${data.length} appointment(s).`);
    });

    // PUT /appointments (UPDATE)
    app.put(route, cors(), async (request, response) => {
      const data = await appointments.updateOne(
        {_id: new ObjectId(request.body._id)},
        {
          $set: {
            active: request.body.active,
            agent: request.body.agent,
            date: request.body.date,
            totalRooms: request.body.totalRooms,
            floorType: request.body.floorType,
            reference: request.body.reference,
            internalNotes: request.body.internalNotes,
            salesNotes: request.body.salesNotes,
            colorPreference: request.body.colorPreference,
            priority: request.body.priority,
            customer: {
              firstName: request.body.customer.firstName,
              lastName: request.body.customer.lastName,
              mobileNumber: request.body.customer.mobileNumber,
              phoneNumber: request.body.customer.phoneNumber,
              email: request.body.customer.email,
              address: {
                street1: request.body.customer.address.street1,
                city: request.body.customer.address.city,
                ustate: request.body.customer.address.ustate,
                zipCode: request.body.customer.address.zipCode,
                isResidential: request.body.customer.address.isResidential,
              }
            }
          }
        },
        {}
      );
      response.json(data);
      console.log(`[HTTP][PUT] ${route}: ${request.token.email} updated a single appointment.`);
    });

    // DELETE /appointments (DELETE)
    app.delete(route, cors(), async (request, response) => {
      response.json(
        await appointments.updateMany(
          { _id: { $in: request.body.map(appointment => (new ObjectId(appointment._id))) } },
          { $set: { active: false }}
        )
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