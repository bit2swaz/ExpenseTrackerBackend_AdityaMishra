const admin = require('../firebase/admin');
const axios = require('axios'); // need axios to call Firebase REST API for login

// @desc    Register a new user
// @route   POST /api/register
// @access  Public
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Create user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    res.status(201).json({
      message: 'User registered successfully',
      uid: userRecord.uid,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Login user & get token
// @route   POST /api/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 2. Exchange email/password for ID Token using Firebase REST API
    const apiKey = process.env.FIREBASE_WEB_API_KEY;
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

    const response = await axios.post(url, {
      email,
      password,
      returnSecureToken: true,
    });

    res.json({
      token: response.data.idToken,
      message: 'Login successful',
    });
  } catch (error) {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// @desc    Logout user
// @route   POST /api/logout
// @access  Private (Requires token)
const logoutUser = (req, res) => {
  // Stateless logout: Client simply discards the token.
  // We just send a success response as per requirements.
  res.json({ message: 'Logout successful' });
};

module.exports = { registerUser, loginUser, logoutUser };