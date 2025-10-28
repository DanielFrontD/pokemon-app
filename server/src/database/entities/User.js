const db = require('../connection');
const bcrypt = require('bcrypt');

class User {
  constructor(username, password, lastLoginTime = null) {
    this.username = username;
    this.password = password;
    this.lastLoginTime = lastLoginTime;
  }

  static async createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        lastLoginTime DATETIME,
        token TEXT,
        tokenExpiration DATETIME
      )
    `;
    
    db.run(sql, async (err) => {
      if (err) {
        console.error('Error creating users table:', err.message);
      } else {
        await User.createDefaultUser();
      }
    });
  }

  static async createDefaultUser() {
    const defaultUsername = 'admin';
    const defaultPassword = 'pokemon123';
    
    User.findByUsername(defaultUsername, async (err, user) => {
      if (err || user) return;
      
      try {
        const hashedPassword = await bcrypt.hash(defaultPassword, 10);
        const insertSql = 'INSERT INTO users (username, password) VALUES (?, ?)';
        
        db.run(insertSql, [defaultUsername, hashedPassword], (err) => {
          if (err) {
            console.error('Error creating default user:', err.message);
          } else {
            console.log('Default user created successfully');
          }
        });
      } catch (error) {
        console.error('Error hashing default password:', error.message);
      }
    });
  }

  static findByUsername(username, callback) {
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.get(sql, [username], callback);
  }

  static updateLastLogin(username, callback) {
    const sql = 'UPDATE users SET lastLoginTime = ? WHERE username = ?';
    db.run(sql, [Date.now(), username], callback);
  }

  static updateToken(username, token, tokenExpiration, callback) {
    const sql = 'UPDATE users SET token = ?, tokenExpiration = ?, lastLoginTime = ? WHERE username = ?';
    db.run(sql, [token, tokenExpiration, Date.now(), username], callback);
  }

  static clearToken(username, callback) {
    const sql = 'UPDATE users SET token = NULL, tokenExpiration = NULL WHERE username = ?';
    db.run(sql, [username], callback);
  }
}

module.exports = User;
