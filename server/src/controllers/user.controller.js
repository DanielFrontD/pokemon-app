const userService = require('../services/user.service');

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const result = await userService.login(username, password);

    res.status(200).json({
      message: 'Login successful',
      token: result.token
    });
  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const result = await userService.logout(req.user.username);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  login,
  logout
};
