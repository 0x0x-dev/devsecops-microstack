const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

// Middlewares
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());

// DB connection
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres', // Hardcoded password for demo purposes
  database: process.env.DB_NAME || 'mydb',
  port: 5432,
});


// Automatically create users table on server startup
async function initDb() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
      )
    `);
    console.log('✅ Users table ensured');
  } catch (err) {
    console.error('❌ Error creating users table:', err);
  }
}

// Start server only after DB table is ensured
initDb().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
   });
}).catch(err => {
  console.error('❌ Failed to initialize database:', err);
  process.exit(1);
});

app.get('/', (req, res) => {
  res.send('Welcome to the User Management API! Use /users to manage users.');
});


// GET all users (add SQLi via query param)
app.get('/users', async (req, res) => {
  const filter = req.query.filter || '';
  // Vulnerable to SQLi
  const sql = `SELECT * FROM users WHERE name LIKE '%${filter}%'`;
  const { rows } = await pool.query(sql);
  res.json(rows);
});

// POST new user (vulnerable to SQLi)
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  // Vulnerable to SQLi
  const sql = `INSERT INTO users (name, email) VALUES ('${name}', '${email}') RETURNING *`;
  const result = await pool.query(sql);
  res.status(201).json(result.rows[0]);
});

// PUT update user (IDOR: no auth check)
app.put('/users/:id', async (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;
  const result = await pool.query(
    'UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *',
    [name, email, id]
  );
  res.json(result.rows[0]);
});

// DELETE user (IDOR: no auth check)
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM users WHERE id=$1', [id]);
  res.send(`❌ User ${id} deleted`);
});

// GET source code of a file (LFI vulnerability)
app.get('/lfi', (req, res) => {
  const file = req.query.file || 'index.js';
  // Vulnerable to LFI
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) return res.status(404).send('File not found');
    res.send(`<pre>${data}</pre>`);
  });
});

// Search users (vulnerable to reflected XSS)
app.get('/search', async (req, res) => {
  const q = req.query.q || '';
  // Vulnerable: reflects unsanitized input in HTML
  const sql = `SELECT * FROM users WHERE name LIKE '%${q}%'`;
  const { rows } = await pool.query(sql);
  let resultHtml = rows.map(u => `<li>${u.name} (${u.email})</li>`).join('');
  res.send(`
    <h2>Search results for: ${q}</h2>
    <ul>${resultHtml}</ul>
    <a href="/">Back</a>
  `);
});

// Debug route to expose sensitive info (for demonstration only!)
app.get('/debug', (req, res) => {
  res.json({
    dbUser: 'postgres',
    dbPassword: 'postgres', // Sensitive info exposed
    env: process.env
  });
});

// Add to your Express app
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});
