const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../../src/services/user.service');
const User = require('../../src/database/entities/User');

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../../src/database/entities/User');

describe('User Service', () => {
  describe('login', () => {
    it('should reject with 401 if user not found', async () => {
      User.findByUsername.mockImplementation((username, callback) => {
        callback(null, null);
      });

      await expect(userService.login('nonexistent', 'password'))
        .rejects.toEqual({ status: 401, message: 'Invalid credentials' });
    });

    it('should reject with 401 if password is invalid', async () => {
      const mockUser = { username: 'admin', password: 'hashed-password' };
      
      User.findByUsername.mockImplementation((username, callback) => {
        callback(null, mockUser);
      });
      
      bcrypt.compare.mockResolvedValue(false);

      await expect(userService.login('admin', 'wrong-password'))
        .rejects.toEqual({ status: 401, message: 'Invalid credentials' });
    });

    it('should return existing token if still valid', async () => {
      const mockUser = { 
        username: 'admin', 
        password: 'hashed-password',
        token: 'existing-token',
        tokenExpiration: Date.now() + 3600000,
        lastLoginTime: Date.now()
      };
      
      User.findByUsername.mockImplementation((username, callback) => {
        callback(null, mockUser);
      });
      
      bcrypt.compare.mockResolvedValue(true);

      const result = await userService.login('admin', 'password');

      expect(result.token).toBe('existing-token');
      expect(result.username).toBe('admin');
    });

    it('should generate new token if expired', async () => {
      const mockUser = { 
        username: 'admin', 
        password: 'hashed-password',
        token: 'expired-token',
        tokenExpiration: Date.now() - 1000,
        lastLoginTime: Date.now()
      };
      
      User.findByUsername.mockImplementation((username, callback) => {
        callback(null, mockUser);
      });
      
      User.updateToken.mockImplementation((username, token, expiration, callback) => {
        callback(null);
      });
      
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('new-token');

      const result = await userService.login('admin', 'password');

      expect(result.token).toBe('new-token');
      expect(jwt.sign).toHaveBeenCalled();
    });
  });
});
