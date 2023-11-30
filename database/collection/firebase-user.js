// https://firebase.google.com/docs/admin/setup
const admin = require("firebase-admin");
const config = require("../wof-server.json");
admin.initializeApp( { credential: admin.credential.cert(config) } );

const initFirebaseUsers = async () => {
  const listUsers = async (nextToken) => {
    await admin.auth().listUsers(1000, nextToken)
      .then((result) => {
        result.users.forEach(async user => {
          data.push({
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
        console.log(`error in users list ${error}`);
        console.log(error);
      })
  };
  await listUsers();
  //console.table(result);
  // process.exit();
  return data;
};

let data = [];

module.exports = { initFirebaseUsers };