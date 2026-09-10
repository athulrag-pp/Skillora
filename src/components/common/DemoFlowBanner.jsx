import React from 'react';
import { useSkillora } from '../../context/SkilloraContext';
import { Play, CheckCircle2, ChevronRight, ChevronLeft, RotateCcw, Sparkles, X } from 'lucide-react';

export const DemoFlowBanner = () => {
  const { demoStep, setDemoStep, navigateTo, convertLeadToCustomer, updateStudentAttendanceAndMarks, addInvoicePayment, addExpense, setIsCopilotOpen, showToast } = useSkillora();

  if (demoStep === -1) {
    return (
      <div className="bg-gradient-to-r from-indigo-950/80 via-purple-950/80 to-slate-950/80 border-b border-indigo-500/30 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-yellow-400 animate-spin-slow" />
          <span className="text-xs font-bold text-white">Hackathon Presentation Mode</span>
          <span className="text-[11px] text-indigo-300 hidden md:inline">
            Run the 19-Step End-to-End Demo Flow (Lead → Learning → Profit)
          </span>
        </div>
        <button
          onClick={() => setDemoStep(0)}
          className="flex items-center space-x-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs px-3 py-1 rounded-lg shadow-md transition-all"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Start 19-Step Live Demo</span>
        </button>
      </div>
    );
  }

  const steps = [
    { num: 1, title: "ABC College Enquiry Received", desc: "ABC College enquires for 200 students (₹4.0L deal).", page: "crm" },
    { num: 2, title: "Convert Enquiry to Lead", desc: "Lead added to CRM Pipeline.", page: "crm" },
    { num: 3, title: "AI Lead Scoring (87 / HOT)", desc: "AI calculates 91% purchase probability.", page: "crm" },
    { num: 4, title: "Create Quotation", desc: "Quotation generated & sent to Dean.", page: "crm" },
    { num: 5, title: "Convert Lead to Customer", desc: "Deal closed! Invoice generated automatically.", action: () => convertLeadToCustomer('LEAD-101'), page: "finance" },
    { num: 6, title: "Setup 4 AI-ML Batches", desc: "Batches initialized in Operations Module.", page: "operations" },
    { num: 7, title: "AI Trainer Matching", desc: "AI recommends Arun Kumar (94% match).", page: "operations" },
    { num: 8, title: "Assign Trainer to Batches", desc: "Arun Kumar assigned to AIML-01 & AIML-04.", page: "operations" },
    { num: 9, title: "Enroll 200 Students", desc: "Students assigned to batch rosters.", page: "students" },
    { num: 10, title: "Trainer Logged Attendance", desc: "Attendance logged by trainer.", action: () => updateStudentAttendanceAndMarks('STU-1002', 68, 92), page: "trainer_portal" },
    { num: 11, title: "Marks & Grades Recorded", desc: "Rahul Verma scored 92% (Grade A).", page: "students" },
    { num: 12, title: "Calculate Student Performance Engine", desc: "Rahul evaluated: Grade A Academic but Attendance Risk (<75%).", page: "students" },
    { num: 13, title: "AI Action Center Risk Alert", desc: "AI flags 12 attendance risk students.", page: "dashboard" },
    { num: 14, title: "Invoice INV-1045 Created", desc: "₹4.0L invoice dispatched to finance.", page: "finance" },
    { num: 15, title: "Collect 50% Deposit Payment", desc: "₹3,15,000 paid by college.", action: () => addInvoicePayment('INV-1045', 5000), page: "finance" },
    { num: 16, title: "AI Payment Risk Analysis", desc: "Ageing updated: High Risk due to ₹85k balance.", page: "finance" },
    { num: 17, title: "Log Operations Expenses", desc: "₹30,000 trainer travel expense logged.", action: () => addExpense({ category: 'Travel', amount: 30000, vendorOrPerson: 'Taj Hotel' }), page: "finance" },
    { num: 18, title: "Executive Dashboard Synchronized", desc: "Revenue (₹8.4L), Net Profit (₹5.2L) & Batch Health updated.", page: "dashboard" },
    { num: 19, title: "AI Management Copilot Summary", desc: "Copilot synthesizes business health & next actions.", action: () => setIsCopilotOpen(true), page: "dashboard" }
  ];

  const current = steps[demoStep] || steps[0];

  const handleNext = () => {
    if (current.action) current.action();
    if (current.page) navigateTo(current.page);
    if (demoStep < steps.length - 1) {
      setDemoStep(prev => prev + 1);
    } else {
      showToast("Completed 19-Step End-to-End Demo Showcase!", "success");
    }
  };

  const handlePrev = () => {
    if (demoStep > 0) setDemoStep(prev => prev - 1);
  };

  return (
    <div className="glass-panel bg-indigo-950/95 border-b border-indigo-500/40 px-4 py-2.5 flex flex-col md:flex-row items-center justify-between gap-2 z-40 sticky top-16 shadow-xl">
      <div className="flex items-center space-x-3">
        <span className="text-xs font-black bg-indigo-600 text-white px-2.5 py-1 rounded-md">
          STEP {current.num} / {steps.length}
        </span>
        <div>
          <h4 className="text-xs font-bold text-white flex items-center space-x-2">
            <span>{current.title}</span>
          </h4>
          <p className="text-[11px] text-indigo-200">{current.desc}</p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={handlePrev}
          disabled={demoStep === 0}
          className="p-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 disabled:opacity-40 text-gray-300 border border-gray-800"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={handleNext}
          className="flex items-center space-x-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-md transition-all glow-emerald"
        >
          <span>{demoStep === steps.length - 1 ? 'Finish Demo' : 'Execute & Next Step'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => setDemoStep(-1)}
          className="p-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-white border border-gray-800"
          title="Exit Demo Banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
