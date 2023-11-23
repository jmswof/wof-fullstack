const cors = require('cors');
const admin = require("firebase-admin");

const initRest = (app, route) => {

    // GET /users (READ)
    app.get(route, cors(), async (request, response) => {
      if (!request.headers.authorization) {
        response.status(403).end();
        console.log(`[HTTP][GET] /users: unauthorized header, return a 403 response...`);
        return;
      }

      const clientToken = atob(request.headers.authorization.split(' ')[1]);

      await admin.auth().verifyIdToken(clientToken)
        .then(async token => {
          let users = [];
          const listUsers = async (nextToken) => {
            await admin.auth().listUsers(1000, nextToken)
              .then((result) => {
                result.users.forEach(async user => {
                  users.push(user.toJSON())
                  if (result.pageToken) {
                    await listUsers(result.pageToken);
                  }
                })
              })
              .catch((error) => {
                // Shouldn't happen
                console.log(`[HTTP][GET] /users: error in users list ${error}`);
                console.log(error);
              })
          };
          await listUsers();
          response.json(users);
          console.log(`[HTTP][GET] /users: verified token - response with array of users[${users.length}] to ${token.email}`);
        })
        .catch(error => {
          console.log(`[HTTP][GET] /users: unauthorized header ${error}`);
          response.status(403).end();
        });
    });

    // POST /users (CREATE)
    app.post(route, cors(), async (request, response) => {
      console.log(request.body);
    });

    // PATCH /users (UPDATE)
    app.patch(route, cors(), async (request, response) => {
      console.log(request.body);
    });

    // DELETE /users (DELETE)
    app.delete(route, cors(), async (request, response) => {
      console.log(request.body);
    });

    console.log(`[INIT] initialized REST on ${route} CRUD routes...`);
};

const initUsers = (app, route) => initRest(app, route);

module.exports = { initUsers };