const admin = require('../firebase/admin');

const protect = async (req, res, next) => {
  let token;

  // check if Authorization header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token from "Bearer <token>"
      token = req.headers.authorization.split(' ')[1];

      // Verify token with Firebase Admin
      const decodedToken = await admin.auth().verifyIdToken(token);

      // Attach user info (uid, email) to the request object
      req.user = {
        uid: decodedToken.uid,
        email: decodedToken.email
      };

      next();
    } catch (error) {
      console.error('Auth Error:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = protect;