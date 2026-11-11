const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const db = new sqlite3.Database('./store.db', (err) => {
  if (err) console.error('Database connection error:', err);
  else console.log('SQLite database connected.');
});

// Setup Tables & Seed Sample Products
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL, description TEXT
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, items TEXT, total REAL, date DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.get("SELECT COUNT(*) AS count FROM products", (err, row) => {
    if (row && row.count === 0) {
      const stmt = db.prepare("INSERT INTO products (name, price, description) VALUES (?, ?, ?)");
      stmt.run("Mechanical Keyboard", 3499, "RGB backlight with blue mechanical switches");
      stmt.run("Wireless Mouse", 1299, "Ergonomic 2.4GHz optical gaming mouse");
      stmt.run("Gaming Headset", 2499, "7.1 Surround Sound with noise-canceling mic");
      stmt.finalize();
    }
  });
});

// 1. Get Product List API
app.get('/api/products', (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// 2. User Registration API
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, password], function(err) {
    if (err) return res.status(400).json({ error: "Username already exists" });
    res.json({ message: "User registered successfully!" });
  });
});

// 3. User Login API[cite: 1, 2]
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, user) => {
    if (err || !user) return res.status(401).json({ error: "Invalid username or password" });
    res.json({ message: "Login successful", username: user.username });
  });
});

// 4. Order Processing API
app.post('/api/orders', (req, res) => {
  const { username, items, total } = req.body;
  db.run("INSERT INTO orders (username, items, total) VALUES (?, ?, ?)", 
    [username, JSON.stringify(items), total], 
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Order placed successfully!", orderId: this.lastID });
    }
  );
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));