import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';

const users = new Map();

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { username: user.username },
    process.env.ACCESS_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { username: user.username },
    process.env.REFRESH_SECRET,
    { expiresIn: '7d' }
  );
  return { accessToken, refreshToken };
};

export const register = async (req, res) => {
  const { username, password } = req.body;
  if (users.has(username)) return res.status(400).json({ error: 'User already exists' });
  
  const hashedPassword = await bcrypt.hash(password, 10);
  users.set(username, { username, password: hashedPassword });

  res.status(201).json({ message: 'User registered successfully' });
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = users.get(username);
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const tokens = generateTokens(user);
  res.json(tokens);
};

export const refreshToken = (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ error: 'Token required' });
  
  jwt.verify(token, process.env.REFRESH_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid refresh token' });
    const tokens = generateTokens(user);
    res.json(tokens);
  });
};

export const logout = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};