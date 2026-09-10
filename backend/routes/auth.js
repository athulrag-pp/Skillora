import express from 'express';

const router = express.Router();

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, role } = req.body;
  
  res.json({
    success: true,
    token: `mock-jwt-token-for-${role || 'MANAGEMENT'}`,
    user: {
      email: email || 'manager@skillora.demo',
      role: role || 'MANAGEMENT',
      name: `${role || 'Management'} User`
    }
  });
});

export default router;
