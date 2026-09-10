import express from 'express';
import { loadDb, saveDb } from '../db.js';
import { broadcastEvent } from './events.js';

const router = express.Router();

// GET /api/courses
router.get('/courses', (req, res) => {
  const db = loadDb();
  res.json(db.courses);
});

// GET /api/batches
router.get('/batches', (req, res) => {
  const db = loadDb();
  res.json(db.batches);
});

// GET /api/trainers
router.get('/trainers', (req, res) => {
  const db = loadDb();
  res.json(db.trainers);
});

// POST /api/trainers (Add New Teacher / Trainer - Management CRUD)
router.post('/trainers', (req, res) => {
  const db = loadDb();
  const newTrainer = {
    id: `TRN-${100 + db.trainers.length + 1}`,
    name: req.body.name || 'New Faculty',
    avatar: req.body.avatar || `https://i.pravatar.cc/150?img=${(db.trainers.length % 50) + 10}`,
    email: req.body.email || `trainer${Date.now()}@skillora.demo`,
    phone: req.body.phone || '+91 98000 11111',
    expertise: req.body.expertise || ['AI & Machine Learning'],
    rating: 4.8,
    experienceYears: Number(req.body.experienceYears || 5),
    activeBatches: req.body.activeBatches || ['AIML-01'],
    assignedStudentsCount: 25,
    availability: req.body.availability || 'Available (Full Time)',
    monthlyCost: Number(req.body.monthlyCost || 75000),
    performanceScore: 90,
    studentAvgGrade: "A (87%)",
    studentAvgAttendance: 85,
    revenueGenerated: 200000,
    status: "Active"
  };

  db.trainers.unshift(newTrainer);
  saveDb(db);

  // Broadcast Real-Time SSE Event
  broadcastEvent('TRAINER_ADDED', newTrainer);

  res.status(201).json(newTrainer);
});

// GET /api/trainers/recommend
router.get('/trainers/recommend', (req, res) => {
  const db = loadDb();
  const matched = db.trainers.map(t => {
    let score = 75;
    if (t.rating >= 4.8) score += 15;
    if (t.experienceYears >= 8) score += 10;
    return {
      trainer: t,
      matchScore: Math.min(99, score),
      matchReasons: [
        `High student rating (${t.rating}/5.0)`,
        `${t.experienceYears}+ years domain expertise`,
        `Schedule status: ${t.availability}`
      ]
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  res.json(matched);
});

export default router;
