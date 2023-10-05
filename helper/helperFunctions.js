const { storage } = require('firebase-admin');
const uploadProfilePhoto = async (file, filename) => {
  const storageBucket = storage().bucket();
  return storageBucket.upload(file, { destination: filename })
}
module.exports = { uploadProfilePhoto }