import express from 'express';
import { loadDb, saveDb } from '../db.js';

const router = express.Router();

// GET /api/leads
router.get('/', (req, res) => {
  const db = loadDb();
  res.json(db.leads);
});

// POST /api/leads (Create lead)
router.post('/', (req, res) => {
  const db = loadDb();
  const newLead = {
    id: `LEAD-${100 + db.leads.length + 1}`,
    ...req.body,
    createdDate: new Date().toISOString().split('T')[0],
    daysInactive: 0,
    stage: req.body.stage || 'Enquiry'
  };
  db.leads.unshift(newLead);
  saveDb(db);
  res.status(201).json(newLead);
});

// POST /api/leads/:id/convert (Convert lead to customer & update revenue/invoices)
router.post('/:id/convert', (req, res) => {
  const db = loadDb();
  const leadIndex = db.leads.findIndex(l => l.id === req.params.id);
  if (leadIndex === -1) {
    return res.status(404).json({ error: "Lead not found" });
  }

  const targetLead = db.leads[leadIndex];
  targetLead.stage = "Won";
  targetLead.status = "HOT";
  targetLead.purchaseProbability = 100;

  // Generate Invoice
  const newInvoice = {
    id: `INV-${1050 + db.invoices.length + 1}`,
    customerName: targetLead.name,
    courseName: targetLead.courseName,
    totalAmount: targetLead.expectedRevenue,
    paidAmount: Math.round(targetLead.expectedRevenue * 0.5),
    outstandingAmount: Math.round(targetLead.expectedRevenue * 0.5),
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    overdueDays: 0,
    status: 'Partially Paid',
    paymentRisk: 'LOW',
    riskReason: '50% deposit received. Remaining balance on schedule.',
    recommendedAction: 'Send invoice receipt & confirm batch start date.'
  };

  db.invoices.unshift(newInvoice);

  // Update Finance Summary
  db.financeSummary.totalRevenue += targetLead.expectedRevenue;
  db.financeSummary.collectedAmount += Math.round(targetLead.expectedRevenue * 0.5);
  db.financeSummary.outstandingAmount += Math.round(targetLead.expectedRevenue * 0.5);
  db.financeSummary.netProfit += Math.round(targetLead.expectedRevenue * 0.6);

  saveDb(db);

  res.json({
    success: true,
    message: `Lead ${targetLead.name} converted! Invoice generated.`,
    lead: targetLead,
    invoice: newInvoice,
    financeSummary: db.financeSummary
  });
});

export default router;
