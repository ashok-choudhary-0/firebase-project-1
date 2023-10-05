const admin = require('firebase-admin');
const { firebaseDb } = require("../config/firebaseConfig");
const signUp = async (req, res) => {
  const { email, password, address, age, gender, name } = req.body;
  if (!email || !password) {
    res.status(404).send({ message: "Please fill all the required fields" })
  }
  try {
    const user = await admin.auth().createUser({
      email,
      password,
    });
    const userDocRef = firebaseDb.collection("users").doc(user.uid);
    await userDocRef.set({
      name,
      address,
      age,
      gender,
    });
    res.status(200).send({ user, userDocRef })
  } catch (err) {
    res.status(500).send(err.message)
  }
}
module.exports = { signUp }