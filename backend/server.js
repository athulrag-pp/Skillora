import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import leadsRoutes from './routes/leads.js';
import studentsRoutes from './routes/students.js';
import operationsRoutes from './routes/operations.js';
import financeRoutes from './routes/finance.js';
import aiRoutes from './routes/ai.js';
import eventsRoutes from './routes/events.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '../dist');

const app = express();
const PORT = process.env.PORT || 5005;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api/students', studentsRoutes);
app.use('/api', operationsRoutes);
app.use('/api', financeRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/events', eventsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'SKILLORA Real-Time Event-Driven Platform',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// Serve Single Unified Web Application Static Assets
app.use(express.static(distPath));

// Fallback all SPA routes to index.html
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(distPath, 'index.html'));
  } else {
    res.status(404).json({ error: 'API endpoint not found' });
  }
});

// Start Single Unified Real-Time Web Server
app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 SKILLORA REAL-TIME PLATFORM SERVER ONLINE`);
  console.log(`👉 PRESENTATION URL: http://localhost:${PORT}/`);
  console.log(`==================================================\n`);
});
