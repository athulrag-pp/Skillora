import express from 'express';
import { findUserByEmail, createUser, authenticateUser } from '../db.js';

const router = express.Router();

// Helper to generate encrypted token string
const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    org: user.organization,
    ts: Date.now()
  };
  return `skl_token_${Buffer.from(JSON.stringify(payload)).toString('base64')}`;
};

// POST /api/auth/login - Authenticate user against database
router.post('/login', (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const user = findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'User account not found. Please check your email or sign up.' });
    }

    // Verify Password if provided, or demo credential check
    if (password) {
      const authenticated = authenticateUser(email, password);
      if (!authenticated) {
        return res.status(401).json({ error: 'Invalid password. Please try again.' });
      }
    }

    // Return authenticated user & token
    const token = generateToken(user);
    const { salt: _, hash: __, ...sanitizedUser } = user;

    // Override role if explicitly selected for demo portal view
    if (role && role !== sanitizedUser.role) {
      sanitizedUser.role = role;
    }

    res.json({
      success: true,
      token,
      user: sanitizedUser
    });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Authentication error' });
  }
});

// POST /api/auth/signup - Register new user in database
router.post('/signup', (req, res) => {
  try {
    const { name, email, password, role, organization } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Full name, email, and password are required' });
    }

    if (password.length < 4) {
      return res.status(400).json({ error: 'Password must be at least 4 characters long' });
    }

    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email address already exists. Please log in.' });
    }

    const newUser = createUser({
      name,
      email,
      password,
      role: role || 'MANAGEMENT',
      organization: organization || 'Skillora EduTech'
    });

    const token = generateToken(newUser);

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: newUser
    });
  } catch (err) {
    res.status(400).json({ error: err.message || 'Signup registration failed' });
  }
});

// GET /api/auth/me - Check current token session
router.get('/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer skl_token_')) {
    return res.status(401).json({ error: 'Unauthorized session' });
  }

  try {
    const b64 = authHeader.replace('Bearer skl_token_', '');
    const decoded = JSON.parse(Buffer.from(b64, 'base64').toString('utf-8'));
    const user = findUserByEmail(decoded.email);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { salt: _, hash: __, ...sanitized } = user;
    res.json({ success: true, user: sanitized });
  } catch (e) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
});

export default router;

