const express = require('express');
const cors = require('cors');
const routes = require('./src/index');
const User = require('./src/database/entities/User');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes middleware
app.use('/', routes);

// Initialize database tables
User.createTable();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
