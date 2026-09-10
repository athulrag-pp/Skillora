import express from 'express';
import { loadDb } from '../db.js';

const router = express.Router();

// POST /api/ai/copilot
router.post('/copilot', (req, res) => {
  const { question } = req.body;
  const db = loadDb();
  const q = (question || '').toLowerCase();

  if (q.includes("students need attention") || q.includes("struggling")) {
    const atRisk = db.students.filter(s => s.riskLevel === 'HIGH' || s.riskLevel === 'CRITICAL');
    return res.json({
      answer: `Currently, **${atRisk.length} students** require urgent attention.

- ⚠️ **Attendance Risk (<75%):** ${db.students.filter(s => s.attendance < 75).length} students
- 📚 **Academic Deficiency (Grade D/F):** ${db.students.filter(s => s.academic < 65).length} students

**Priority Action:** Intervene immediately with Rahul Verma (AIML-01, 92% Academic but 68% Attendance Risk).`,
      suggestedAction: "View Student Intelligence Matrix",
      actionPage: "students"
    });
  }

  if (q.includes("profitable") || q.includes("revenue")) {
    return res.json({
      answer: `**Financial Health Summary:**
- 💰 **Total Revenue:** ₹${(db.financeSummary.totalRevenue/100000).toFixed(1)}L
- 📊 **Net Profit:** ₹${(db.financeSummary.netProfit/100000).toFixed(1)}L (Margin: ${db.financeSummary.profitMarginPct}%)
- 🏆 **Most Profitable Course:** *AI & Machine Learning Masterclass* (₹1.75L Net Profit).`,
      suggestedAction: "Open Finance & Profitability Engine",
      actionPage: "finance"
    });
  }

  res.json({
    answer: `SKILLORA AI Copilot analyzed your EduTech operational database.

- **Active Students:** ${db.students.length}
- **Billed Revenue:** ₹${(db.financeSummary.totalRevenue/100000).toFixed(1)}L
- **Overall System Operational Health:** 88%`,
    suggestedAction: "Explore Management Dashboard",
    actionPage: "dashboard"
  });
});

export default router;
