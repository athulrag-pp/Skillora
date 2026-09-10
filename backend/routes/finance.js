import express from 'express';
import { loadDb, saveDb } from '../db.js';

const router = express.Router();

// GET /api/finance/summary
router.get('/summary', (req, res) => {
  const db = loadDb();
  res.json(db.financeSummary);
});

// GET /api/invoices
router.get('/invoices', (req, res) => {
  const db = loadDb();
  res.json(db.invoices);
});

// POST /api/invoices/:id/pay (Record payment)
router.post('/invoices/:id/pay', (req, res) => {
  const db = loadDb();
  const amount = Number(req.body.amount || 0);
  const invIndex = db.invoices.findIndex(i => i.id === req.params.id);
  if (invIndex === -1) {
    return res.status(404).json({ error: "Invoice not found" });
  }

  const inv = db.invoices[invIndex];
  inv.paidAmount = Math.min(inv.totalAmount, inv.paidAmount + amount);
  inv.outstandingAmount = Math.max(0, inv.totalAmount - inv.paidAmount);
  if (inv.outstandingAmount === 0) {
    inv.status = "Fully Paid";
    inv.paymentRisk = "LOW";
  } else {
    inv.status = "Partially Paid";
  }

  db.financeSummary.collectedAmount += amount;
  db.financeSummary.outstandingAmount = Math.max(0, db.financeSummary.outstandingAmount - amount);

  saveDb(db);

  res.json({
    success: true,
    invoice: inv,
    financeSummary: db.financeSummary
  });
});

// GET /api/expenses
router.get('/expenses', (req, res) => {
  const db = loadDb();
  res.json(db.expenses);
});

// POST /api/expenses (Log expense)
router.post('/expenses', (req, res) => {
  const db = loadDb();
  const amount = Number(req.body.amount || 0);
  const newExp = {
    id: `EXP-${Date.now()}`,
    category: req.body.category || 'General',
    vendorOrPerson: req.body.vendorOrPerson || 'Vendor',
    amount: amount,
    date: new Date().toISOString().split('T')[0],
    courseName: req.body.courseName || 'All Courses',
    status: 'Approved & Paid'
  };

  db.expenses.unshift(newExp);
  db.financeSummary.totalExpenses += amount;
  db.financeSummary.netProfit = db.financeSummary.totalRevenue - db.financeSummary.totalExpenses;
  db.financeSummary.profitMarginPct = Number(((db.financeSummary.netProfit / db.financeSummary.totalRevenue) * 100).toFixed(1));

  saveDb(db);

  res.status(201).json({
    success: true,
    expense: newExp,
    financeSummary: db.financeSummary
  });
});

export default router;
