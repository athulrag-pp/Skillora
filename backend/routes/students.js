import express from 'express';
import { loadDb, saveDb } from '../db.js';
import { broadcastEvent } from './events.js';

const router = express.Router();

const calculateMetrics = (academic, attendance, assignment = 85, progress = 80) => {
  let grade = "D/F";
  let academicCategory = "Below Average";
  if (academic >= 85) { grade = "A"; academicCategory = "Excellent"; }
  else if (academic >= 75) { grade = "B"; academicCategory = "Good"; }
  else if (academic >= 65) { grade = "C"; academicCategory = "Average / Pass"; }

  let attendanceStatus = "Attendance Risk";
  if (attendance >= 90) attendanceStatus = "Excellent";
  else if (attendance >= 80) attendanceStatus = "Good";
  else if (attendance >= 75) attendanceStatus = "Average";

  const overallScore = Math.round(academic * 0.50 + attendance * 0.20 + assignment * 0.15 + progress * 0.15);
  let overallGrade = "D/F";
  if (overallScore >= 85) overallGrade = "A";
  else if (overallScore >= 75) overallGrade = "B";
  else if (overallScore >= 65) overallGrade = "C";

  let riskLevel = "LOW";
  const academicRisk = academic < 65;
  const attRisk = attendance < 75;
  if (academicRisk && attRisk) riskLevel = "CRITICAL";
  else if (academicRisk || attRisk) riskLevel = "HIGH";

  let aiInsight = "Steady academic progress.";
  if (academic >= 85 && attendance < 75) {
    aiInsight = "Student is academically excellent (Grade A) but has attendance risk (<75%). Focus intervention strictly on attendance.";
  } else if (academic < 65 && attendance >= 90) {
    aiInsight = "Student has excellent attendance (90%+) but is struggling academically. Recommend dedicated academic tutoring.";
  }

  return { academic, grade, academicCategory, attendance, attendanceStatus, assignment, progress, overallScore, overallGrade, riskLevel, aiInsight };
};

// GET /api/students
router.get('/', (req, res) => {
  const db = loadDb();
  res.json(db.students);
});

// POST /api/students (Add new student - Management CRUD)
router.post('/', (req, res) => {
  const db = loadDb();
  const acad = Number(req.body.academic || 85);
  const att = Number(req.body.attendance || 90);
  const metrics = calculateMetrics(acad, att, 85, 80);

  const newStudent = {
    id: `STU-${1000 + db.students.length + 1}`,
    name: req.body.name || 'New Student',
    avatar: req.body.avatar || `https://i.pravatar.cc/150?img=${(db.students.length % 70) + 1}`,
    email: req.body.email || `student${Date.now()}@skillora.demo`,
    parentName: req.body.parentName || 'Parent Guardian',
    parentEmail: req.body.parentEmail || 'parent@gmail.com',
    parentPhone: req.body.parentPhone || '+91 98000 00000',
    courseId: req.body.courseId || 'CRS-001',
    courseName: req.body.courseName || 'AI & Machine Learning Masterclass',
    batchId: req.body.batchId || 'AIML-01',
    batchName: req.body.batchName || 'AI-ML Batch 01',
    trainerName: req.body.trainerName || 'Arun Kumar',
    ...metrics
  };

  db.students.unshift(newStudent);
  saveDb(db);

  // Broadcast Real-Time SSE Event
  broadcastEvent('STUDENT_ADDED', newStudent);

  res.status(201).json(newStudent);
});

// POST /api/students/:id/metrics (Update student metrics)
router.post('/:id/metrics', (req, res) => {
  const db = loadDb();
  const index = db.students.findIndex(s => s.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Student not found" });
  }

  const s = db.students[index];
  const newAttendance = req.body.attendance !== undefined ? req.body.attendance : s.attendance;
  const newAcademic = req.body.academic !== undefined ? req.body.academic : s.academic;

  const metrics = calculateMetrics(newAcademic, newAttendance, s.assignment, s.progress);
  db.students[index] = { ...s, ...metrics };
  saveDb(db);

  // Broadcast Real-Time SSE Event
  broadcastEvent('STUDENT_UPDATED', db.students[index]);

  res.json({
    success: true,
    student: db.students[index]
  });
});

export default router;
