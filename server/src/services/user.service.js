const User = require('../database/entities/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'pokemon_secret_key';
const TOKEN_EXPIRATION_HOURS = 2;

const login = async (username, password) => {
  return new Promise((resolve, reject) => {
    User.findByUsername(username, async (err, user) => {
      if (err) {
        return reject({ status: 500, message: 'Database error' });
      }

      if (!user) {
        return reject({ status: 401, message: 'Invalid credentials' });
      }

      try {
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
          return reject({ status: 401, message: 'Invalid credentials' });
        }

        const now = Date.now();
        
        // Check if existing token is still valid
        if (user.token && user.tokenExpiration && now < user.tokenExpiration) {
          return resolve({
            username: user.username,
            lastLoginTime: user.lastLoginTime,
            token: user.token
          });
        }

        // Generate new token
        const tokenExpiration = now + (TOKEN_EXPIRATION_HOURS * 60 * 60 * 1000);
        const token = jwt.sign(
          { 
            username: user.username, 
            lastLoginTime: now 
          }, 
          JWT_SECRET, 
          { expiresIn: `${TOKEN_EXPIRATION_HOURS}h` }
        );

        User.updateToken(username, token, tokenExpiration, (err) => {
          if (err) {
            console.error('Error updating token:', err.message);
          }
        });

        resolve({
          username: user.username,
          lastLoginTime: now,
          token
        });
      } catch (error) {
        reject({ status: 500, message: 'Error validating password' });
      }
    });
  });
};

const logout = (username) => {
  return new Promise((resolve, reject) => {
    User.clearToken(username, (err) => {
      if (err) {
        reject(new Error('Error during logout'));
      } else {
        resolve({ message: 'Logout successful' });
      }
    });
  });
};

module.exports = {
  login,
  logout
};
