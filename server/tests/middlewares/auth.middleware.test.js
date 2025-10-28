const jwt = require('jsonwebtoken');
const { authenticateToken } = require('../../src/middlewares/auth.middleware');
const User = require('../../src/database/entities/User');

jest.mock('jsonwebtoken');
jest.mock('../../src/database/entities/User');

describe('Auth Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = { headers: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  it('should return 401 if no token provided', () => {
    authenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Access token is required' });
  });

  it('should return 401 if token is invalid', () => {
    req.headers.authorization = 'Bearer invalid-token';
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(new Error('Invalid token'), null);
    });

    authenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid or expired token' });
  });

  it('should call next if token is valid', () => {
    req.headers.authorization = 'Bearer valid-token';
    const mockDecoded = { username: 'admin' };
    const mockUser = { token: 'valid-token', tokenExpiration: Date.now() + 3600000 };

    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(null, mockDecoded);
    });

    User.findByUsername.mockImplementation((username, callback) => {
      callback(null, mockUser);
    });

    authenticateToken(req, res, next);

    expect(req.user).toEqual(mockDecoded);
    expect(next).toHaveBeenCalled();
  });
});
