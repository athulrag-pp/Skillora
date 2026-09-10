// AI Engine Service Functions for SKILLORA

export const calculateLeadScore = (lead) => {
  let score = 50;
  if (lead.studentCount >= 150) score += 20;
  else if (lead.studentCount >= 80) score += 12;

  if (lead.expectedRevenue >= 300000) score += 15;
  else if (lead.expectedRevenue >= 150000) score += 8;

  if (lead.daysInactive <= 3) score += 10;
  else if (lead.daysInactive > 7) score -= 15;

  score = Math.max(10, Math.min(99, score));
  const status = score >= 80 ? 'HOT' : score >= 60 ? 'WARM' : 'COLD';
  const prob = Math.min(98, score + 4);

  return {
    leadScore: score,
    status: status,
    purchaseProbability: prob,
    reason: `${lead.studentCount} students, ₹${(lead.expectedRevenue/100000).toFixed(1)}L valuation, ${lead.daysInactive} days since last contact.`
  };
};

export const predictPaymentRisk = (invoice) => {
  const overdue = invoice.overdueDays || 0;
  const ratio = invoice.outstandingAmount / (invoice.totalAmount || 1);

  if (overdue > 60 || ratio > 0.8) {
    return { risk: 'CRITICAL', ageing: '61-90 Days', action: 'Escalate to legal & halt future batch enrollment.' };
  } else if (overdue > 14 || ratio > 0.4) {
    return { risk: 'HIGH', ageing: '31-60 Days', action: 'Schedule executive collection call with Dean.' };
  } else if (overdue > 0 || ratio > 0.2) {
    return { risk: 'MEDIUM', ageing: '0-30 Days', action: 'Send automated WhatsApp invoice notice.' };
  }
  return { risk: 'LOW', ageing: 'On Time', action: 'Standard invoice processing.' };
};

export const recommendTrainer = (courseId, trainers) => {
  return trainers.map(t => {
    let match = 70;
    if (t.rating >= 4.8) match += 15;
    if (t.experienceYears >= 8) match += 10;
    if (t.availability.includes('Available')) match += 5;
    match = Math.min(98, match);
    return {
      trainer: t,
      matchScore: match,
      matchReasons: [
        `High student rating (${t.rating}/5.0)`,
        `${t.experienceYears}+ years industry domain expertise`,
        `Schedule status: ${t.availability}`
      ]
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
};

export const generateInterventionPlan = (student) => {
  return {
    studentId: student.id,
    studentName: student.name,
    targetAreas: [
      student.academic < 65 ? "Academic Retest & Doubts Clearing" : null,
      student.attendance < 75 ? "Parent Attendance Tele-Counseling" : null,
      student.assignment < 60 ? "Assignment Extension & Peer Study Group" : null
    ].filter(Boolean),
    timeline: "2 Weeks Intensive Support",
    assignedMentor: student.trainerName || "Arun Kumar",
    actionSteps: [
      "Step 1: Conduct 1-on-1 performance audit with Trainer",
      "Step 2: Dispatch personalized parent alert notification",
      "Step 3: Assign tailored lab practice exercises & mock quizzes",
      "Step 4: Re-evaluate academic status after 14 days"
    ]
  };
};

export const askManagementCopilot = (question, state) => {
  const q = question.toLowerCase();

  if (q.includes("students need attention") || q.includes("struggling")) {
    const atRisk = state.students.filter(s => s.riskLevel === 'HIGH' || s.riskLevel === 'CRITICAL');
    const attRisk = state.students.filter(s => s.attendanceStatus === 'Attendance Risk');
    const acadRisk = state.students.filter(s => s.academic < 65);
    return {
      answer: `Currently, **${atRisk.length} students** require urgent attention.

**Breakdown of Risk Factors:**
- ⚠️ **Attendance Risk (<75%):** ${attRisk.length} students
- 📚 **Academic Deficiency (Grade D/F):** ${acadRisk.length} students
- 🚨 **Critical Dual Risk:** ${state.students.filter(s => s.academic < 65 && s.attendance < 75).length} students

**Recommended Priority Action:**
Intervene immediately with **Rahul Verma** (AIML-01, 92% Academic but 68% Attendance Risk) and **Sneha Reddy** (MERN-02, 58% Academic with 94% Attendance).`,
      suggestedAction: "View Student Intelligence Matrix",
      actionPage: "students"
    };
  }

  if (q.includes("profitable") || q.includes("profit") || q.includes("revenue")) {
    return {
      answer: `**Financial Health Summary:**
- 💰 **Total Revenue:** ₹${(state.financeSummary.totalRevenue/100000).toFixed(1)}L
- 📊 **Net Profit:** ₹${(state.financeSummary.netProfit/100000).toFixed(1)}L (Margin: ${state.financeSummary.profitMarginPct}%)
- 🏆 **Most Profitable Course:** *AI & Machine Learning Masterclass* (₹1.75L Net Profit)
- 📉 **Lowest Profitability Warning:** *Cybersecurity Batch CS-03* (High trainer & licensing costs relative to 18 enrolled students).`,
      suggestedAction: "Open Finance & Profitability Engine",
      actionPage: "finance"
    };
  }

  if (q.includes("call today") || q.includes("lead") || q.includes("sales")) {
    const hotLeads = state.leads.filter(l => l.status === 'HOT' && l.stage !== 'Won');
    return {
      answer: `**Sales Action Priority:**
Your team has **${hotLeads.length} HOT leads** ready for conversion:

1. 🔥 **ABC Institute of Technology** (Purchase Prob: 91%, Deal: ₹4.0L) -> *Action: Schedule final decision meeting*
2. 🔥 **Metropolis PolyTech** (Purchase Prob: 88%, Deal: ₹6.0L) -> *Action: Conduct live demo presentation*
3. ⚠️ **Stalled Lead Alert:** XYZ Institute has been inactive for 11 days. Initiate AI Lead Rescue!`,
      suggestedAction: "Open CRM Kanban Board",
      actionPage: "crm"
    };
  }

  if (q.includes("invoices") || q.includes("overdue") || q.includes("outstanding")) {
    return {
      answer: `**Payment Collection Risk:**
Total Outstanding: **₹${(state.financeSummary.outstandingAmount/100000).toFixed(2)}L**.

- 🔴 **CRITICAL:** Invoice INV-1048 (XYZ Institute) overdue by 62 days (₹60,000).
- 🟠 **HIGH:** Invoice INV-1045 (ABC Institute) overdue by 16 days (₹85,000).

Recommend triggering automated WhatsApp reminders and scheduling collection calls immediately.`,
      suggestedAction: "View Payment Risk Matrix",
      actionPage: "finance"
    };
  }

  return {
    answer: `SKILLORA AI Copilot analyzed your EduTech operational data.

- **Active Students:** ${state.students.length} across ${state.batches.length} active batches
- **Active Revenue:** ₹${(state.financeSummary.totalRevenue/100000).toFixed(1)}L
- **Overall System Health:** 88%

How else can I assist your management team today?`,
    suggestedAction: "Explore Management Dashboard",
    actionPage: "dashboard"
  };
};
