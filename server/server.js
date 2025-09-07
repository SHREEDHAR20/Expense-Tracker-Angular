// 📦 Dependencies
const express = require('express');
const multer = require('multer');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// 🚀 Server setup
const app = express();
const PORT = process.env.PORT || 3000;

// 🧩 Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// 🗂️ Ensure uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// 🛠️ Multer config
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadsDir),
  filename: (_, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// 🗄️ MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mathiyazhagan@123', 
  database: 'project'
});

db.connect(err => {
  if (err) {
    console.error('❌ DB Connection failed:', err.message);
    return;
  }
  console.log('✅ MySQL Connected...');
});

// 👤 Signup
app.post('/api/sighnup', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);

  db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashedPassword],
    (err) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ message: 'Email already exists.' });
        }
        return res.status(500).json({ message: 'Database error.' });
      }

      res.json({ message: 'User registered successfully!' });
    }
  );
});

// 🔐 Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
    if (err) return res.status(500).json({ message: 'DB error.' });
    if (result.length === 0) return res.status(401).json({ message: 'User not found.' });

    const user = result[0];
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials.' });

    res.json({
      message: 'Login successful',
      user: { id: user.id, name: user.name, email: user.email }
    });
  });
});

// 🧾 Create expenses table if not exists
const createTableQuery = `
CREATE TABLE IF NOT EXISTS expenses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  amount DECIMAL(10,2),
  description VARCHAR(255),
  type VARCHAR(100)
);
`;
db.query(createTableQuery, err => {
  if (err) console.error('Failed to create table:', err);
});

// ➕ Add expense
app.post('/api/expenses', (req, res) => {
  const { amount, description, type } = req.body;
  const query = 'INSERT INTO expenses (amount, description, type) VALUES (?, ?, ?)';
  db.query(query, [amount, description, type], (err) => {
    if (err) {
      console.error('Insert error:', err);
      return res.status(500).json({ message: 'Error saving expense' });
    }
    res.status(200).json({ message: 'Expense saved' });
  });
});

// 📊 Get all expenses
app.get('/api/expenses', (req, res) => {
  const query = 'SELECT * FROM expenses';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Fetch error:', err);
      return res.status(500).json({ message: 'Error fetching expenses' });
    }
    res.json(results);
  });
});

// 🏁 Start Server (only one listen call)
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
