export const initialFinanceSummary = {
  totalRevenue: 840000,
  collectedAmount: 670000,
  outstandingAmount: 170000,
  totalExpenses: 320000,
  netProfit: 520000,
  profitMarginPct: 61.9
};

export const initialInvoicesData = [
  {
    id: "INV-1045",
    customerName: "ABC Institute of Technology",
    courseName: "AI & Machine Learning Masterclass",
    totalAmount: 400000,
    paidAmount: 315000,
    outstandingAmount: 85000,
    issueDate: "2026-07-25",
    dueDate: "2026-08-25",
    overdueDays: 16,
    status: "Partially Paid",
    paymentRisk: "HIGH", // LOW, MEDIUM, HIGH, CRITICAL
    riskReason: "Payment overdue by 16 days. Outstanding amount ₹85,000.",
    recommendedAction: "Send automated payment reminder and schedule collection call with Dean."
  },
  {
    id: "INV-1042",
    customerName: "Horizon Skills Center",
    courseName: "UI/UX Design Systems & Figma",
    totalAmount: 150000,
    paidAmount: 150000,
    outstandingAmount: 0,
    issueDate: "2026-08-01",
    dueDate: "2026-08-30",
    overdueDays: 0,
    status: "Fully Paid",
    paymentRisk: "LOW",
    riskReason: "Invoice paid in full.",
    recommendedAction: "Issue receipt and feedback survey."
  },
  {
    id: "INV-1048",
    customerName: "XYZ Institute of Science",
    courseName: "Cybersecurity & Ethical Hacking",
    totalAmount: 120000,
    paidAmount: 60000,
    outstandingAmount: 60000,
    issueDate: "2026-06-10",
    dueDate: "2026-07-10",
    overdueDays: 62,
    status: "Overdue",
    paymentRisk: "CRITICAL",
    riskReason: "Payment overdue by 62 days (Ageing bucket: 61-90 Days).",
    recommendedAction: "Escalate to Finance Management & suspend next batch access."
  },
  {
    id: "INV-1050",
    customerName: "Apex Global Software",
    courseName: "Full Stack MERN Development",
    totalAmount: 170000,
    paidAmount: 145000,
    outstandingAmount: 25000,
    issueDate: "2026-08-15",
    dueDate: "2026-09-15",
    overdueDays: 0,
    status: "Partially Paid",
    paymentRisk: "MEDIUM",
    riskReason: "Remaining balance ₹25,000 due in 5 days.",
    recommendedAction: "Send gentle pre-due reminder email."
  }
];

export const initialExpensesData = [
  {
    id: "EXP-801",
    category: "Trainer Payments",
    vendorOrPerson: "Arun Kumar & Pooja Malhotra",
    amount: 160000,
    date: "2026-09-01",
    courseName: "AI & MERN Batches",
    status: "Approved & Paid"
  },
  {
    id: "EXP-802",
    category: "Lab & Hardware Infrastructure",
    vendorOrPerson: "AWS Cloud & NVIDIA Server Rental",
    amount: 65000,
    date: "2026-09-03",
    courseName: "AI & Machine Learning",
    status: "Approved & Paid"
  },
  {
    id: "EXP-803",
    category: "Course Materials & Licensing",
    vendorOrPerson: "Pearson & O'Reilly Publishing",
    amount: 45000,
    date: "2026-08-28",
    courseName: "Cybersecurity & AWS",
    status: "Approved & Paid"
  },
  {
    id: "EXP-804",
    category: "Trainer Travel & Accommodation",
    vendorOrPerson: "Taj Business Hotels & Flights",
    amount: 30000,
    date: "2026-09-05",
    courseName: "On-site Corporate Batches",
    status: "Approved & Paid"
  },
  {
    id: "EXP-805",
    category: "Marketing & Lead Acquisition",
    vendorOrPerson: "Google Ads & LinkedIn Sponsored",
    amount: 20000,
    date: "2026-09-06",
    courseName: "All Courses",
    status: "Approved & Paid"
  }
];

export const initialRevenueForecast = {
  currentRevenue: 840000,
  pipelineValue: 420000,
  expectedConversion: 310000,
  forecastTotal: 1150000,
  monthlyBreakdown: [
    { month: "May", actual: 520000, forecast: 500000, expenses: 210000 },
    { month: "Jun", actual: 640000, forecast: 620000, expenses: 240000 },
    { month: "Jul", actual: 750000, forecast: 740000, expenses: 280000 },
    { month: "Aug", actual: 840000, forecast: 810000, expenses: 320000 },
    { month: "Sep (Current)", actual: 840000, forecast: 950000, expenses: 340000 },
    { month: "Oct (Proj)", actual: 0, forecast: 1150000, expenses: 380000 }
  ],
  scenarios: {
    bestCase: 1280000,
    expectedCase: 1150000,
    riskCase: 980000
  }
};

export const leadSourceROIData = [
  { source: "College Outreach", leads: 85, conversions: 32, revenue: 380000, cost: 45000, profit: 335000, roi: "744%" },
  { source: "Google Search", leads: 62, conversions: 21, revenue: 240000, cost: 35000, profit: 205000, roi: "585%" },
  { source: "Referrals", leads: 38, conversions: 14, revenue: 130000, cost: 5000, profit: 125000, roi: "2500%" },
  { source: "LinkedIn", leads: 40, conversions: 7, revenue: 70000, cost: 25000, profit: 45000, roi: "180%" },
  { source: "Instagram / Social", leads: 23, conversions: 2, revenue: 20000, cost: 10000, profit: 10000, roi: "100%" }
];
