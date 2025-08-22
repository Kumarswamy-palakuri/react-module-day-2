import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// In-memory "database"
let users = [
  { id: 1, name: 'Ada Lovelace' },
  { id: 2, name: 'Alan Turing' }
];

// Health check
app.get('/', (_req, res) => res.send('User API is running'));

// GET /users - return list of users
app.get('/users', (_req, res) => {
  res.json(users);
});

// POST /users - add a user { name }
app.post('/users', (req, res) => {
  const { name } = req.body || {};
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Name is required' });
  }
  const newUser = { id: Date.now(), name: name.trim() };
  users.unshift(newUser);
  res.status(201).json(newUser);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
