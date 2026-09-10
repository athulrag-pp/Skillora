export const initialNotificationsData = [
  {
    id: "NOTIF-01",
    title: "🔥 Hot Lead Alert",
    message: "ABC College has reached a 91% purchase probability with 200 prospective students.",
    type: "hot_lead",
    severity: "high",
    time: "10 mins ago",
    read: false,
    actionText: "View Lead",
    targetPage: "crm"
  },
  {
    id: "NOTIF-02",
    title: "⚠️ Attendance Risk Alert",
    message: "12 students in AIML-04 batch have attendance below the 75% critical threshold.",
    type: "attendance_risk",
    severity: "warning",
    time: "25 mins ago",
    read: false,
    actionText: "View Students",
    targetPage: "students"
  },
  {
    id: "NOTIF-03",
    title: "💰 Overdue Payment Alert",
    message: "Invoice INV-1045 for ABC Institute has an outstanding balance of ₹85,000 overdue by 16 days.",
    type: "payment_risk",
    severity: "high",
    time: "1 hour ago",
    read: false,
    actionText: "Review Invoice",
    targetPage: "finance"
  },
  {
    id: "NOTIF-04",
    title: "📉 Declining Batch Health",
    message: "Batch AIML-04 health score dropped to 62/100 due to attendance drops.",
    type: "batch_risk",
    severity: "warning",
    time: "2 hours ago",
    read: false,
    actionText: "Analyze Batch",
    targetPage: "operations"
  },
  {
    id: "NOTIF-05",
    title: "🎉 New Lead Conversion!",
    message: "Horizon Skills Center accepted quotation for UI/UX course (₹1.5L deal).",
    type: "conversion",
    severity: "success",
    time: "3 hours ago",
    read: true,
    actionText: "View Invoice",
    targetPage: "finance"
  }
];
