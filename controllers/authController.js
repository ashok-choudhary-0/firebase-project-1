const { createUserWithEmailAndPassword } = require("firebase/auth")
const { auth } = require("../config/firebaseConfig")
const signup = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(404).send({ message: "Please fill all the required fields" })
  }
  try {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    res.status(200).send(data)
  } catch (err) {
    res.status(500).send(err.message)
  }
}
module.exports = { signup }