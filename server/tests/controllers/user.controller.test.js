const userController = require('../../src/controllers/user.controller');
const userService = require('../../src/services/user.service');

jest.mock('../../src/services/user.service');

describe('User Controller', () => {
  let req, res;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('login', () => {
    it('should return 400 if username is missing', async () => {
      req.body = { password: 'test' };

      await userController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Username and password are required' });
    });

    it('should return 400 if password is missing', async () => {
      req.body = { username: 'test' };

      await userController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Username and password are required' });
    });

    it('should return 200 on successful login', async () => {
      req.body = { username: 'admin', password: 'pokemon123' };
      const mockUser = { username: 'admin', lastLoginTime: Date.now(), token: 'mock-token' };
      
      userService.login.mockResolvedValue(mockUser);

      await userController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Login successful',
        username: mockUser.username,
        lastLoginTime: mockUser.lastLoginTime,
        token: mockUser.token
      });
    });
  });
});
