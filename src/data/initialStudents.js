// Helper function to derive student status metrics accurately according to SKILLORA specifications
export const calculateStudentMetrics = (academic, attendance, assignment, progress) => {
  // 1. Academic Grade & Category
  let grade = "D/F";
  let academicCategory = "Below Average";
  if (academic >= 85) {
    grade = "A";
    academicCategory = "Excellent";
  } else if (academic >= 75) {
    grade = "B";
    academicCategory = "Good";
  } else if (academic >= 65) {
    grade = "C";
    academicCategory = "Average / Pass";
  } else {
    grade = "D/F";
    academicCategory = "Below Average";
  }

  // 2. Attendance Status (Evaluated SEPARATELY)
  let attendanceStatus = "Attendance Risk";
  if (attendance >= 90) {
    attendanceStatus = "Excellent";
  } else if (attendance >= 80) {
    attendanceStatus = "Good";
  } else if (attendance >= 75) {
    attendanceStatus = "Average";
  } else {
    attendanceStatus = "Attendance Risk";
  }

  // 3. Overall Performance Score Formula:
  // Overall = Academic * 0.50 + Attendance * 0.20 + Assignment * 0.15 + Course Progress * 0.15
  const overallScore = Math.round(
    academic * 0.50 + attendance * 0.20 + assignment * 0.15 + progress * 0.15
  );

  let overallGrade = "D/F";
  if (overallScore >= 85) overallGrade = "A";
  else if (overallScore >= 75) overallGrade = "B";
  else if (overallScore >= 65) overallGrade = "C";

  // 4. AI Risk Level Calculation:
  // Risk triggers if Academic < 65 OR Attendance < 75 OR Assignment < 60 OR Overall < 65
  let riskLevel = "LOW";
  const academicRisk = academic < 65;
  const attendanceRisk = attendance < 75;
  const assignmentRisk = assignment < 60;
  const overallRisk = overallScore < 65;

  const riskCount = [academicRisk, attendanceRisk, assignmentRisk, overallRisk].filter(Boolean).length;

  if (academicRisk && attendanceRisk) {
    riskLevel = "CRITICAL";
  } else if (riskCount >= 2) {
    riskLevel = "HIGH";
  } else if (riskCount === 1) {
    riskLevel = "MEDIUM";
  } else {
    riskLevel = "LOW";
  }

  // 5. AI Insight synthesis
  let aiInsight = "";
  if (academic >= 85 && attendance < 75) {
    aiInsight = "Student is academically excellent (Grade A) but has attendance risk (<75%). Focus intervention strictly on attendance.";
  } else if (academic < 65 && attendance >= 90) {
    aiInsight = "Student has excellent attendance (90%+) but is struggling academically. Recommend dedicated academic tutoring.";
  } else if (academic < 65 && attendance < 75) {
    aiInsight = "Critical Risk: Student faces both severe academic deficits and attendance non-compliance. Immediate counselor intervention needed.";
  } else if (overallScore >= 85) {
    aiInsight = "Top performer demonstrating high mastery across academic assignments and class participation.";
  } else if (assignment < 60) {
    aiInsight = "Pending assignments are dragging down overall performance score despite fair attendance.";
  } else {
    aiInsight = "Steady performance. On track for course completion certification.";
  }

  return {
    academic,
    grade,
    academicCategory,
    attendance,
    attendanceStatus,
    assignment,
    progress,
    overallScore,
    overallGrade,
    riskLevel,
    aiInsight
  };
};

export const initialStudentsData = [
  // 1. High Academic + High Attendance (Top Performer)
  {
    id: "STU-1001",
    name: "Aarav Sharma",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    email: "aarav.s@gmail.com",
    parentName: "Sanjay Sharma",
    parentEmail: "sanjay.sharma@gmail.com",
    parentPhone: "+91 98111 00101",
    courseId: "CRS-001",
    courseName: "AI & Machine Learning Masterclass",
    batchId: "AIML-01",
    batchName: "AI-ML Batch 01",
    trainerName: "Arun Kumar",
    ...calculateStudentMetrics(94, 96, 92, 95)
  },
  // 2. High Academic + LOW Attendance (ATTENDANCE RISK - Example Student A / Rahul)
  {
    id: "STU-1002",
    name: "Rahul Verma",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    email: "rahul.verma@gmail.com",
    parentName: "Mahesh Verma",
    parentEmail: "m.verma@gmail.com",
    parentPhone: "+91 98222 00202",
    courseId: "CRS-001",
    courseName: "AI & Machine Learning Masterclass",
    batchId: "AIML-01",
    batchName: "AI-ML Batch 01",
    trainerName: "Arun Kumar",
    ...calculateStudentMetrics(92, 68, 88, 80)
  },
  // 3. Low Academic + High Attendance (ACADEMIC INTERVENTION - Example Student B)
  {
    id: "STU-1003",
    name: "Sneha Reddy",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    email: "sneha.r@gmail.com",
    parentName: "Venkat Reddy",
    parentEmail: "v.reddy@gmail.com",
    parentPhone: "+91 98333 00303",
    courseId: "CRS-002",
    courseName: "Full Stack MERN Development",
    batchId: "MERN-02",
    batchName: "MERN Stack Batch 02",
    trainerName: "Pooja Malhotra",
    ...calculateStudentMetrics(58, 94, 54, 75)
  },
  // 4. Low Academic + Low Attendance (CRITICAL RISK - Example Student C)
  {
    id: "STU-1004",
    name: "Karan Patel",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    email: "karan.p@gmail.com",
    parentName: "Dinesh Patel",
    parentEmail: "d.patel@gmail.com",
    parentPhone: "+91 98444 00404",
    courseId: "CRS-003",
    courseName: "Cybersecurity & Ethical Hacking",
    batchId: "CS-03",
    batchName: "Cybersecurity Batch 03",
    trainerName: "Rajesh Iyer",
    ...calculateStudentMetrics(52, 61, 48, 55)
  },
  // 5. Good Academic + Good Attendance
  {
    id: "STU-1005",
    name: "Ananya Deshmukh",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    email: "ananya.d@gmail.com",
    parentName: "Prakash Deshmukh",
    parentEmail: "p.deshmukh@gmail.com",
    parentPhone: "+91 98555 00505",
    courseId: "CRS-001",
    courseName: "AI & Machine Learning Masterclass",
    batchId: "AIML-01",
    batchName: "AI-ML Batch 01",
    trainerName: "Arun Kumar",
    ...calculateStudentMetrics(82, 86, 85, 88)
  },
  // 6. Average Academic + Good Attendance
  {
    id: "STU-1006",
    name: "Rohan Gupta",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    email: "rohan.g@gmail.com",
    parentName: "Anil Gupta",
    parentEmail: "anil.g@gmail.com",
    parentPhone: "+91 98666 00606",
    courseId: "CRS-004",
    courseName: "Cloud DevOps & AWS Architect",
    batchId: "DEVOPS-01",
    batchName: "DevOps Batch 01",
    trainerName: "Vikramaditya Shah",
    ...calculateStudentMetrics(71, 84, 75, 78)
  },
  // 7. Average Academic + Poor Attendance
  {
    id: "STU-1007",
    name: "Meera Nair",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
    email: "meera.nair@gmail.com",
    parentName: "Gopinath Nair",
    parentEmail: "g.nair@gmail.com",
    parentPhone: "+91 98777 00707",
    courseId: "CRS-002",
    courseName: "Full Stack MERN Development",
    batchId: "MERN-02",
    batchName: "MERN Stack Batch 02",
    trainerName: "Pooja Malhotra",
    ...calculateStudentMetrics(69, 72, 70, 68)
  },
  // 8. Below Average Academic + Good Attendance
  {
    id: "STU-1008",
    name: "Aditya Roy",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    email: "aditya.roy@gmail.com",
    parentName: "Siddharth Roy",
    parentEmail: "s.roy@gmail.com",
    parentPhone: "+91 98888 00808",
    courseId: "CRS-003",
    courseName: "Cybersecurity & Ethical Hacking",
    batchId: "CS-03",
    batchName: "Cybersecurity Batch 03",
    trainerName: "Rajesh Iyer",
    ...calculateStudentMetrics(61, 88, 60, 65)
  }
];

// Generate 45 additional realistic student records to total 180+ batch representation
export const generateBulkStudents = () => {
  const names = [
    "Vihaan Joshi", "Diya Saxena", "Kabir Mehta", "Ishaan Malhotra", "Tanvi Bhat", 
    "Devansh Rao", "Riya Sen", "Arjun Nambiar", "Kavya Hegde", "Siddharth Pillai",
    "Pari Choudhury", "Yash Singhal", "Zoya Khan", "Aaryan Menon", "Bhavya Trivedi"
  ];
  const courses = [
    { id: "CRS-001", name: "AI & Machine Learning Masterclass", batchId: "AIML-01", batchName: "AI-ML Batch 01", trainer: "Arun Kumar" },
    { id: "CRS-002", name: "Full Stack MERN Development", batchId: "MERN-02", batchName: "MERN Stack Batch 02", trainer: "Pooja Malhotra" },
    { id: "CRS-003", name: "Cybersecurity & Ethical Hacking", batchId: "CS-03", batchName: "Cybersecurity Batch 03", trainer: "Rajesh Iyer" },
    { id: "CRS-004", name: "Cloud DevOps & AWS Architect", batchId: "DEVOPS-01", batchName: "DevOps Batch 01", trainer: "Vikramaditya Shah" },
    { id: "CRS-005", name: "Data Science & Big Analytics", batchId: "DS-04", batchName: "Data Science Batch 04", trainer: "Dr. Meenakshi S" }
  ];

  const bulk = [...initialStudentsData];
  for (let i = 9; i <= 60; i++) {
    const c = courses[i % courses.length];
    const name = names[i % names.length] + ` (${i})`;
    
    // Vary scores to hit every quadrant
    let acad = 50 + (i * 17) % 48;
    let att = 60 + (i * 13) % 38;
    let ass = 55 + (i * 11) % 43;
    let prog = 60 + (i * 7) % 38;

    bulk.push({
      id: `STU-${1000 + i}`,
      name: name,
      avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
      email: `student${i}@skillora.demo`,
      parentName: `Parent of ${name}`,
      parentEmail: `parent${i}@skillora.demo`,
      parentPhone: `+91 99${1000000 + i * 5432}`,
      courseId: c.id,
      courseName: c.name,
      batchId: c.batchId,
      batchName: c.batchName,
      trainerName: c.trainer,
      ...calculateStudentMetrics(acad, att, ass, prog)
    });
  }

  return bulk;
};
