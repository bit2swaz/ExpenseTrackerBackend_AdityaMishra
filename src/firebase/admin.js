const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

// init firebase admin sdk
// allows us to verify tokens and create users securely
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    // handle the newline characters in the private key string
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
});

module.exports = admin;