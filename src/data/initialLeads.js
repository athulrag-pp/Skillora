export const initialLeadsData = [
  {
    id: "LEAD-101",
    name: "ABC Institute of Technology",
    contactPerson: "Dr. Rajesh Sharma",
    email: "r.sharma@abcitech.edu",
    phone: "+91 98765 43210",
    courseId: "CRS-001",
    courseName: "AI & Machine Learning Masterclass",
    studentCount: 200,
    expectedRevenue: 400000,
    stage: "Negotiation", // Enquiry, Contacted, Meeting, Quotation, Negotiation, Won
    leadScore: 87,
    status: "HOT", // HOT (80-100), WARM (60-79), COLD (0-59)
    purchaseProbability: 91,
    assignedTo: "Vikram Mehta",
    createdDate: "2026-08-15",
    lastContactDate: "2026-09-08",
    daysInactive: 2,
    leadSource: "College Outreach",
    notes: "High interest in AI/ML certification for final year CS batch. Proposal viewed 4 times.",
    aiRescueSuggested: false,
    nextBestAction: "Schedule final decision meeting & send contract draft."
  },
  {
    id: "LEAD-102",
    name: "Apex Global Software",
    contactPerson: "Priya Sundaram",
    email: "priya.s@apexglobal.com",
    phone: "+91 98112 34567",
    courseId: "CRS-002",
    courseName: "Full Stack MERN Development",
    studentCount: 80,
    expectedRevenue: 240000,
    stage: "Quotation",
    leadScore: 82,
    status: "HOT",
    purchaseProbability: 85,
    assignedTo: "Neha Kapoor",
    createdDate: "2026-08-20",
    lastContactDate: "2026-09-09",
    daysInactive: 1,
    leadSource: "Google Search",
    notes: "Corporate onboarding for fresh engineering recruits.",
    aiRescueSuggested: false,
    nextBestAction: "Follow up on quotation feedback."
  },
  {
    id: "LEAD-103",
    name: "XYZ Institute of Science",
    contactPerson: "Prof. Suresh Kumar",
    email: "skumar@xyzinstitute.org",
    phone: "+91 97654 32109",
    courseId: "CRS-003",
    courseName: "Cybersecurity & Ethical Hacking",
    studentCount: 120,
    expectedRevenue: 300000,
    stage: "Contacted",
    leadScore: 54,
    status: "COLD",
    purchaseProbability: 40,
    assignedTo: "Vikram Mehta",
    createdDate: "2026-08-01",
    lastContactDate: "2026-08-30",
    daysInactive: 11,
    leadSource: "Instagram",
    notes: "Initial inquiry submitted but no response after first call.",
    aiRescueSuggested: true,
    nextBestAction: "Send automated WhatsApp re-engagement offer with 10% early-bird discount."
  },
  {
    id: "LEAD-104",
    name: "St. John Tech Academy",
    contactPerson: "Sister Anita",
    email: "anita@stjohntech.ac.in",
    phone: "+91 94321 87654",
    courseId: "CRS-004",
    courseName: "Cloud DevOps & AWS Architect",
    studentCount: 150,
    expectedRevenue: 375000,
    stage: "Meeting",
    leadScore: 74,
    status: "WARM",
    purchaseProbability: 70,
    assignedTo: "Ananya Roy",
    createdDate: "2026-08-25",
    lastContactDate: "2026-09-06",
    daysInactive: 4,
    leadSource: "Referral",
    notes: "Management board reviewing curriculum outline.",
    aiRescueSuggested: false,
    nextBestAction: "Share industry placement report and trainer profile."
  },
  {
    id: "LEAD-105",
    name: "Quantum Digital Labs",
    contactPerson: "Amitabh Sen",
    email: "amitabh@quantumdigital.io",
    phone: "+91 99887 76655",
    courseId: "CRS-005",
    courseName: "Data Science & Big Analytics",
    studentCount: 50,
    expectedRevenue: 200000,
    stage: "Quotation",
    leadScore: 68,
    status: "WARM",
    purchaseProbability: 62,
    assignedTo: "Neha Kapoor",
    createdDate: "2026-08-10",
    lastContactDate: "2026-09-01",
    daysInactive: 9,
    leadSource: "Website",
    notes: "Quotation sent 9 days ago. Client requested discount.",
    aiRescueSuggested: true,
    nextBestAction: "Call client to offer customized payment installment schedule."
  },
  {
    id: "LEAD-106",
    name: "Metropolis PolyTech",
    contactPerson: "Dean R. K. Varma",
    email: "rkvarma@metropolispoly.edu",
    phone: "+91 91234 56789",
    courseId: "CRS-001",
    courseName: "AI & Machine Learning Masterclass",
    studentCount: 300,
    expectedRevenue: 600000,
    stage: "Enquiry",
    leadScore: 89,
    status: "HOT",
    purchaseProbability: 88,
    assignedTo: "Vikram Mehta",
    createdDate: "2026-09-08",
    lastContactDate: "2026-09-08",
    daysInactive: 2,
    leadSource: "College Outreach",
    notes: "Urgent request for Q4 batch start.",
    aiRescueSuggested: false,
    nextBestAction: "Conduct live online demo presentation with lead trainer."
  },
  {
    id: "LEAD-107",
    name: "Horizon Skills Center",
    contactPerson: "Kavita Reddy",
    email: "kavita@horizonskills.org",
    phone: "+91 98450 12345",
    courseId: "CRS-006",
    courseName: "UI/UX Design Systems & Figma",
    studentCount: 60,
    expectedRevenue: 150000,
    stage: "Won",
    leadScore: 95,
    status: "HOT",
    purchaseProbability: 100,
    assignedTo: "Ananya Roy",
    createdDate: "2026-07-20",
    lastContactDate: "2026-09-05",
    daysInactive: 0,
    leadSource: "WhatsApp",
    notes: "Converted! Invoice INV-1042 issued.",
    aiRescueSuggested: false,
    nextBestAction: "Handover to Operations for batch setup."
  }
];

// Generate 40 additional realistic mock leads to total 200+ count representation in stats
export const generateBulkLeads = () => {
  const sources = ["Google Search", "College Outreach", "LinkedIn", "Referral", "Website", "Instagram", "WhatsApp"];
  const stages = ["Enquiry", "Contacted", "Meeting", "Quotation", "Negotiation", "Won"];
  const reps = ["Vikram Mehta", "Neha Kapoor", "Ananya Roy", "Rohan Verma"];
  const courses = [
    { id: "CRS-001", name: "AI & Machine Learning Masterclass", fee: 2000 },
    { id: "CRS-002", name: "Full Stack MERN Development", fee: 3000 },
    { id: "CRS-003", name: "Cybersecurity & Ethical Hacking", fee: 2500 },
    { id: "CRS-004", name: "Cloud DevOps & AWS Architect", fee: 2500 },
    { id: "CRS-005", name: "Data Science & Big Analytics", fee: 4000 }
  ];

  const bulk = [...initialLeadsData];
  for (let i = 8; i <= 60; i++) {
    const c = courses[i % courses.length];
    const cnt = 20 + (i * 7) % 180;
    const stage = stages[i % stages.length];
    const score = 40 + (i * 13) % 56;
    const status = score >= 80 ? "HOT" : score >= 60 ? "WARM" : "COLD";
    const days = (i * 3) % 12;
    bulk.push({
      id: `LEAD-${100 + i}`,
      name: `EduTech Partner ${i} College`,
      contactPerson: `Director ${String.fromCharCode(65 + (i % 26))}. Patel`,
      email: `contact@edutext${i}.edu`,
      phone: `+91 98${1000000 + i * 4321}`,
      courseId: c.id,
      courseName: c.name,
      studentCount: cnt,
      expectedRevenue: cnt * c.fee,
      stage: stage,
      leadScore: score,
      status: status,
      purchaseProbability: Math.min(99, score + 4),
      assignedTo: reps[i % reps.length],
      createdDate: `2026-08-${(i % 28) + 1}`,
      lastContactDate: `2026-09-${(i % 9) + 1}`,
      daysInactive: days,
      leadSource: sources[i % sources.length],
      notes: `Generated mock lead record #${i} for EduTech CRM simulation.`,
      aiRescueSuggested: days >= 7 && stage !== "Won",
      nextBestAction: days >= 7 ? "Initiate AI Lead Rescue Campaign." : "Follow up as scheduled."
    });
  }
  return bulk;
};
