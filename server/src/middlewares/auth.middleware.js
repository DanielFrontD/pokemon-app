const jwt = require('jsonwebtoken');
const User = require('../database/entities/User');

const JWT_SECRET = 'pokemon_secret_key';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token is required' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    User.findByUsername(decoded.username, (err, user) => {
      if (err || !user || user.token !== token || Date.now() > user.tokenExpiration) {
        return res.status(401).json({ error: 'Invalid or expired token' });
      }

      req.user = decoded;
      next();
    });
  });
};

module.exports = {
  authenticateToken
};
