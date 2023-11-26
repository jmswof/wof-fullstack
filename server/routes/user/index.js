const cors = require('cors');
const admin = require("firebase-admin");

const initRest = (app, route) => {

    // GET /users (READ)
    app.get(route, cors(), async (request, response) => {
      let users = [];
      const listUsers = async (nextToken) => {
        await admin.auth().listUsers(1000, nextToken)
          .then((result) => {
            result.users.forEach(async user => {
              users.push({
                uid: user.uid,
                email: user.email,
                disabled: user.disabled,
                emailVerified: user.emailVerified,
                creationTime: user.metadata.creationTime,
                lastSignInTime: user.metadata.lastSignInTime
              });
              if (result.pageToken) {
                await listUsers(result.pageToken);
              }
            })
          })
          .catch((error) => {
            // Shouldn't happen
            console.log(`[HTTP][GET] ${route}: error in users list ${error}`);
            console.log(error);
          })
      };
      await listUsers();
      response.json(users);
      console.log(`[HTTP][GET] ${route}: shared users[${users.length}] to ${request.token.email}`);
    });

    // POST /users (CREATE)
    app.post(route, cors(), async (request, response) => {
      console.log(`[HTTP][POST] ${route}: not implemented yet`);
    });

    // PATCH /users (UPDATE)
    app.patch(route, cors(), async (request, response) => {
      console.log(`[HTTP][PATCH] ${route}: not implemented yet`);
    });

    // DELETE /users (DELETE)
    app.delete(route, cors(), async (request, response) => {
      console.log(`[HTTP][DELETE] ${route}: not implemented yet`);
    });
};

const initUsers = (app, route) => {
  initRest(app, route)

  return {stage: 'INIT', http: 'HTTP', ws: null, route: route};
};

module.exports = { initUsers };