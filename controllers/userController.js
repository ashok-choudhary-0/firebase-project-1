const admin = require('firebase-admin');
const signUp = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(404).send({ message: "Please fill all the required fields" })
  }
  try {
    const user = await admin.auth().createUser({
      email,
      password,
    });
    res.status(200).send(user)
  } catch (err) {
    res.status(500).send(err.message)
  }
}
module.exports = { signUp }