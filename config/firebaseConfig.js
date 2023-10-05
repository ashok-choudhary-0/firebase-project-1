const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccount.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://fir-project-1-1bea7.appspot.com',
});
const fireStore = admin.firestore()
module.exports = { fireStore };