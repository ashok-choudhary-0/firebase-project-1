const { auth } = require('firebase-admin');
const { uploadProfilePhoto } = require("../helper/helperFunctions")
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
    const user = await auth().createUser({
      email,
      password,
    });
    fireStore.collection("users").doc(user.uid).set({
      firstName,
      address,
      lastName,
    });
    const date = Date.now()
    const profileImageFileName = `${date}${profileImage}`;
    await uploadProfilePhoto(profileImage, profileImageFileName)
    res.status(200).send({ message: "Data uploaded successfully ", user })
  } catch (err) {
    res.status(500).send(err.message)
  }
}
const addFriend = async (req, res) => {
  const { friendsId } = req.body;
  var { user_id } = req.headers;
  try {
    const friendsDocRef = fireStore.collection("friends").doc(user_id);
    const getFriendsDocument = await friendsDocRef.get();
    const currentFriends = getFriendsDocument.exists ? getFriendsDocument.data().friends || [] : [];
    if (currentFriends.includes(friendsId)) {
      res.status(200).send({ message: "Friend already added in the friends list" })
      return;
    }
    currentFriends.push(friendsId);
    await fireStore.collection("friends").doc(user_id).set({
      friends: currentFriends
    })
    res.status(200).send({ message: "Friend added successfully" })
  } catch (err) {
    res.status(500).send(err.message)
  }
}
module.exports = { signUp, addFriend }