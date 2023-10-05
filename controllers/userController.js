const admin = require('firebase-admin');
const { fireStore } = require("../config/firebaseConfig");
const signUp = async (req, res) => {
  const { email, password, confirmPassword, address, firstName, lastName, profileImage } = req.body;
  if (!email || !password) {
    res.status(404).send({ message: "Please fill all the required fields" })
  }
  if (password != confirmPassword) {
    res.status(401).send({ message: "Password and confirmPassword should be same" })
  }
  try {
    const user = await admin.auth().createUser({
      email,
      password,
    });
    fireStore.collection("users").doc(user.uid).set({
      firstName,
      address,
      lastName,
      profileImage
    });
    res.status(200).send({ message: "Data uploaded successfully ", user })
  } catch (err) {
    res.status(500).send(err.message)
  }
}
module.exports = { signUp }