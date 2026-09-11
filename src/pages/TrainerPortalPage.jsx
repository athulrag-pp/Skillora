import React, { useState } from 'react';
import { useSkillora } from '../context/SkilloraContext';
import { EditProfileModal } from '../components/modals/EditProfileModal';
import { 
  CheckSquare, Calendar, Users, Sparkles, CheckCircle2, 
  AlertTriangle, UserCheck, Search, Filter, Eye, ArrowRight, Phone, Mail, Edit3, Trash2, UserPlus, Star, Award, BookOpen, Clock, Video, FileText, Download, ShieldCheck, ChevronRight
} from 'lucide-react';

export const TrainerPortalPage = () => {
  const { 
    currentUser, trainers, students, batches, 
    updateStudentAttendanceAndMarks, deleteStudent, showToast, 
    setSelectedStudentId, navigateTo, setIsAddStudentOpen, triggerConfetti, theme
  } = useSkillora();

  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, rosters, schedule
  const [editingStudent, setEditingStudent] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSelfProfileEditOpen, setIsSelfProfileEditOpen] = useState(false);

  // Dynamically resolve logged-in trainer profile
  const activeTrainer = trainers.find(t => 
    (currentUser?.email && t.email?.toLowerCase() === currentUser.email.toLowerCase()) ||
    (currentUser?.name && t.name?.toLowerCase() === currentUser.name.toLowerCase())
  ) || {
    id: currentUser?.id || "TRN-001",
    name: currentUser?.name || "Arun Kumar",
    avatar: currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    email: currentUser?.email || "trainer@skillora.demo",
    phone: currentUser?.phone || "+91 98123 45678",
    expertise: ["AI & Machine Learning", "PyTorch", "Python", "Deep Learning"],
    rating: 4.9,
    experienceYears: 8,
    activeBatches: ["AIML-01", "AIML-04"],
    assignedStudentsCount: 47,
    status: "Top Performer",
    monthlyCost: 85000,
    bio: "Lead Educator & Senior Instructor. Specialized in Neural Networks and practical AI pipelines."
  };

  const defaultTrainerBatch = (activeTrainer.activeBatches && activeTrainer.activeBatches.length > 0) 
    ? activeTrainer.activeBatches[0] 
    : 'AIML-01';

  const [selectedBatch, setSelectedBatch] = useState(defaultTrainerBatch);
  const [studentFilter, setStudentFilter] = useState('ALL');
  const [searchQ, setSearchQ] = useState('');

  const trainerBatches = batches.filter(b => 
    activeTrainer.activeBatches?.includes(b.id) || b.trainerName?.toLowerCase().includes(activeTrainer.name.toLowerCase())
  );
  const displayBatches = trainerBatches.length > 0 ? trainerBatches : batches;

  const batchStudents = students.filter(s => s.batchId === selectedBatch);

  const filteredStudents = batchStudents.filter(s => {
    if (studentFilter === 'ATT_RISK' && s.attendanceStatus !== 'Attendance Risk') return false;
    if (studentFilter === 'ACAD_RISK' && s.academic >= 65) return false;
    if (studentFilter === 'GRADE_A' && s.grade !== 'A') return false;
    if (searchQ && !s.name.toLowerCase().includes(searchQ.toLowerCase()) && !s.id.toLowerCase().includes(searchQ.toLowerCase())) return false;
    return true;
  });

  const [selectedStudentForLog, setSelectedStudentForLog] = useState(batchStudents[0]?.id || 'STU-1002');
  const [attendanceVal, setAttendanceVal] = useState(68);
  const [academicVal, setAcademicVal] = useState(92);

  const handleLog = () => {
    updateStudentAttendanceAndMarks(selectedStudentForLog, attendanceVal, academicVal);
    showToast(`Saved Attendance (${attendanceVal}%) & Marks (${academicVal}%) for student record`, 'success');
  };

  const trainerSchedule = [
    { time: '10:00 AM - 11:30 AM', batch: selectedBatch, topic: 'Deep Learning & Neural Network Optimization', room: 'Lab 302', type: 'Live Session' },
    { time: '02:00 PM - 03:30 PM', batch: 'AIML-04', topic: 'Model Deployment with FastAPI & Docker', room: 'Virtual Classroom 1', type: 'Interactive Lab' },
    { time: '04:30 PM - 05:30 PM', batch: selectedBatch, topic: 'Student 1-on-1 Academic Counseling & Code Review', room: 'Office Hours', type: 'Mentorship' }
  ];

  const handleDownloadSalaryReceipt = () => {
    triggerConfetti();
    showToast(`Downloading Faculty Salary Receipt PDF for ${activeTrainer.name}...`, 'success');
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      {/* 1. Sleek Hero Header Card (Identical structure to Student Portal) */}
      <div className={`p-6 rounded-3xl border transition-all ${
        theme === 'dark'
          ? 'glass-panel border-purple-500/40 bg-gradient-to-r from-purple-950/90 via-indigo-950/70 to-slate-950/90 text-white'
          : 'bg-white border-slate-200 shadow-lg text-slate-900'
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img 
                src={activeTrainer.avatar} 
                alt={activeTrainer.name} 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-purple-500 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-gray-950 rounded-full" title="Online Active" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight">{activeTrainer.name.toUpperCase()}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3 text-purple-400" />
                  <span>My Trainer Profile ({activeTrainer.id})</span>
                </span>
                <button
                  onClick={() => setIsSelfProfileEditOpen(true)}
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gray-900 hover:bg-gray-800 text-purple-300 border border-purple-500/40 transition-all flex items-center space-x-1"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit Profile</span>
                </button>
              </div>

              <p className="text-xs text-gray-300">
                Specialization: <strong>{(activeTrainer.expertise || ['AI']).join(', ')}</strong> • Enrolled Batches: <strong>{displayBatches.map(b => b.id).join(', ')}</strong>
              </p>

              <div className="text-[11px] text-gray-400">
                Logged into verified trainer account (<span className="font-mono text-purple-300">{activeTrainer.email}</span>)
              </div>
            </div>
          </div>

          {/* Right Side Trainer Rating & Performance Boxes */}
          <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-end">
            <div className="bg-gray-900/80 p-3 rounded-2xl border border-gray-800 text-center min-w-[110px]">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block">FACULTY RATING</span>
              <span className="text-xl font-black text-amber-400 mt-0.5 flex items-center justify-center space-x-1">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{activeTrainer.rating || 4.9}</span>
              </span>
            </div>

            <div className="bg-purple-950/40 p-3 rounded-2xl border border-purple-500/30 text-center min-w-[130px]">
              <span className="text-[9px] font-black text-purple-300 uppercase tracking-wider block">STATUS</span>
              <span className="text-base font-black text-emerald-400 mt-0.5 block">{activeTrainer.status || 'Top Performer'}</span>
            </div>
          </div>
        </div>

        {/* 2. Navigation Tabs (Identical to Student Portal Tabs) */}
        <div className="flex items-center space-x-2 mt-6 pt-4 border-t border-gray-800/80 overflow-x-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'dashboard'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-gray-900/60 text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>My Trainer Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('rosters')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'rosters'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-gray-900/60 text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Batch Rosters & Student Grading</span>
          </button>

          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'schedule'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-gray-900/60 text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Teaching Schedule & Lab Sessions</span>
          </button>
        </div>
      </div>

      {/* 3. 4-Grid Metric Cards (Identical Layout & Styling to Student Portal) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-gray-800 space-y-2">
          <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">ASSIGNED BATCHES</span>
          <div className="text-3xl font-black text-white">{displayBatches.length} Batches</div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
            {displayBatches.map(b => b.id).join(', ')}
          </span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-indigo-500/30 space-y-2">
          <span className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-wider block">STUDENTS MONITORED</span>
          <div className="text-3xl font-black text-indigo-400">{batchStudents.length} Students</div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Active Batch: {selectedBatch}
          </span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-emerald-500/30 space-y-2">
          <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider block">AVERAGE BATCH SCORE</span>
          <div className="text-3xl font-black text-emerald-400">88%</div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Grade A Average (88%)
          </span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-amber-500/30 space-y-2">
          <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider block">ATTENDANCE RISK ALERTS</span>
          <div className="text-3xl font-black text-amber-400">
            {batchStudents.filter(s => s.attendanceStatus === 'Attendance Risk').length}
          </div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            Attendance Notice (&lt;75%)
          </span>
        </div>
      </div>

      {/* 4. AI Personal Mentor / Teacher Insight Banner */}
      <div className="glass-panel p-4 rounded-2xl border border-purple-500/40 bg-purple-950/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-start space-x-3">
          <Sparkles className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h3 className="text-xs font-black text-white uppercase tracking-wider">AI TEACHER INSIGHT FOR {activeTrainer.name.toUpperCase()}</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Batch <strong>{selectedBatch}</strong> has {batchStudents.filter(s => s.attendanceStatus === 'Attendance Risk').length} students with attendance risk (&lt;75%). Overall academic performance is strong at 88%. Dispatch attendance notices to keep batch on track for certification.
            </p>
          </div>
        </div>
        <span className="text-[10px] font-bold text-purple-300 bg-purple-900/60 border border-purple-500/40 px-2.5 py-1 rounded-lg shrink-0">
          Realtime Analysis
        </span>
      </div>

      {/* 5. Main Layout Content Grid (Left Main + Right Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8-Cols: Upcoming Live Class + Monitored Roster */}
        <div className="lg:col-span-8 space-y-6">
          {/* Upcoming Live Interactive Batch Session Card (Identical to Student Portal) */}
          <div className="glass-panel p-5 rounded-3xl border border-purple-500/40 bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-slate-950/40 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-bold text-white uppercase tracking-wider">
                <Video className="w-4 h-4 text-purple-400" />
                <span>Upcoming Live Interactive Batch Session</span>
              </div>
              <span className="text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full uppercase">
                LIVE TODAY
              </span>
            </div>

            <div className="bg-gray-900/80 p-4 rounded-2xl border border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-purple-400 uppercase tracking-wider block">BATCH: {selectedBatch}</span>
                <h4 className="text-base font-black text-white">PyTorch Backpropagation & Gradient Optimization</h4>
                <p className="text-xs text-gray-400">
                  Trainer: <strong>{activeTrainer.name}</strong> • Today at 6:00 PM IST (60 mins)
                </p>
              </div>

              <button
                onClick={() => {
                  triggerConfetti();
                  showToast(`Launching Live Interactive Class for Batch ${selectedBatch}...`, 'success');
                }}
                className="bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-purple-600/30 shrink-0 flex items-center space-x-2"
              >
                <Video className="w-4 h-4" />
                <span>Start Live Class</span>
              </button>
            </div>
          </div>

          {/* Monitored Roster Table & Quick Logger */}
          <div className="glass-panel p-5 rounded-3xl border border-gray-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <h2 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center space-x-2">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span>Monitored Roster ({filteredStudents.length})</span>
                </h2>

                {/* Batch Selector */}
                <select
                  value={selectedBatch}
                  onChange={(e) => {
                    setSelectedBatch(e.target.value);
                    const bStus = students.filter(s => s.batchId === e.target.value);
                    if (bStus.length) {
                      setSelectedStudentForLog(bStus[0].id);
                      setAttendanceVal(bStus[0].attendance);
                      setAcademicVal(bStus[0].academic);
                    }
                  }}
                  className="bg-gray-900 border border-gray-800 text-white text-xs font-bold rounded-xl px-3 py-1.5 focus:outline-none"
                >
                  {displayBatches.map(b => (
                    <option key={b.id} value={b.id}>{b.id} - {b.batchName}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsAddStudentOpen(true)}
                  className="bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs px-3.5 py-1.5 rounded-xl transition-all shadow-md flex items-center space-x-1"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>+ Add Student</span>
                </button>
              </div>
            </div>

            {/* Students Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-900 text-gray-400 uppercase text-[10px] font-extrabold border-b border-gray-800">
                  <tr>
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Academic %</th>
                    <th className="p-3">Grade</th>
                    <th className="p-3">Attendance %</th>
                    <th className="p-3">Att. Status</th>
                    <th className="p-3">Overall Score</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60 font-medium">
                  {filteredStudents.map(s => (
                    <tr key={s.id} className="hover:bg-gray-800/40 transition-colors">
                      <td className="p-3">
                        <div className="flex items-center space-x-2.5">
                          <img src={s.avatar} alt={s.name} className="w-7 h-7 rounded-full object-cover border border-gray-700" />
                          <div>
                            <div className="font-bold text-white text-xs">{s.name}</div>
                            <div className="text-[10px] text-gray-400">{s.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 font-bold text-white">{s.academic}%</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          s.grade === 'A' ? 'bg-emerald-500/20 text-emerald-400' :
                          s.grade === 'B' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-purple-500/20 text-purple-400'
                        }`}>
                          Grade {s.grade}
                        </span>
                      </td>
                      <td className="p-3 font-bold text-white">{s.attendance}%</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          s.attendanceStatus === 'Attendance Risk' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-gray-300'
                        }`}>
                          {s.attendanceStatus}
                        </span>
                      </td>
                      <td className="p-3 font-bold text-purple-400">{s.overallScore}%</td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <button
                            onClick={() => {
                              setSelectedStudentId(s.id);
                              navigateTo('students');
                            }}
                            className="bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 font-bold px-2 py-1 rounded text-[10px] border border-purple-500/40"
                          >
                            Analyze
                          </button>
                          <button
                            onClick={() => {
                              setEditingStudent(s);
                              setIsEditModalOpen(true);
                            }}
                            className="bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 font-bold px-2 py-1 rounded text-[10px] border border-indigo-500/40 flex items-center space-x-1"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete student ${s.name}?`)) deleteStudent(s.id);
                            }}
                            className="bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 font-bold px-2 py-1 rounded text-[10px] border border-rose-500/40"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Quick Marks & Attendance Logger */}
            <div className="bg-gray-900/80 p-4 rounded-2xl border border-gray-800 space-y-3">
              <h3 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center space-x-2">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span>Teacher Marks & Attendance Entry</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <select
                  value={selectedStudentForLog}
                  onChange={(e) => setSelectedStudentForLog(e.target.value)}
                  className="bg-gray-950 border border-gray-800 text-white text-xs font-bold rounded-xl px-3 py-2 focus:outline-none"
                >
                  {batchStudents.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.attendance}% Att)</option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Attendance %"
                  value={attendanceVal}
                  onChange={(e) => setAttendanceVal(Number(e.target.value))}
                  className="bg-gray-950 border border-gray-800 text-white text-xs font-bold rounded-xl px-3 py-2 focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Academic %"
                  value={academicVal}
                  onChange={(e) => setAcademicVal(Number(e.target.value))}
                  className="bg-gray-950 border border-gray-800 text-white text-xs font-bold rounded-xl px-3 py-2 focus:outline-none"
                />
              </div>
              <button
                onClick={handleLog}
                className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
              >
                Update Student Record
              </button>
            </div>
          </div>
        </div>

        {/* Right 4-Cols: Trainer Side Widgets (Compensation & Today's Teaching Schedule Timeline) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Faculty Compensation Status Widget (Identical layout to Tuition status in Student Portal) */}
          <div className="glass-panel p-5 rounded-3xl border border-gray-800 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-bold text-white uppercase tracking-wider">
              <Award className="w-4 h-4 text-purple-400" />
              <span>Faculty Compensation Status</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center text-gray-400">
                <span>Monthly Salary:</span>
                <span className="font-bold text-white font-mono">₹{(activeTrainer.monthlyCost || 85000).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-gray-400">
                <span>Disbursed Amount:</span>
                <span className="font-bold text-emerald-400 font-mono">₹{(activeTrainer.monthlyCost || 85000).toLocaleString()} (100%)</span>
              </div>
              <div className="flex justify-between items-center text-gray-400">
                <span>Payroll Status:</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase">
                  FULLY PAID
                </span>
              </div>
            </div>

            <button
              onClick={handleDownloadSalaryReceipt}
              className="w-full bg-gray-900 hover:bg-gray-800 text-purple-300 font-bold text-xs py-2.5 rounded-xl border border-gray-800 transition-all flex items-center justify-center space-x-2 shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download Salary Slip PDF</span>
            </button>
          </div>

          {/* Today's Interactive Teaching Schedule Widget */}
          <div className="glass-panel p-5 rounded-3xl border border-gray-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-bold text-white uppercase tracking-wider">
                <Clock className="w-4 h-4 text-purple-400" />
                <span>Today's Class Schedule</span>
              </div>
              <span className="text-[10px] text-purple-300 font-bold">3 Sessions</span>
            </div>

            <div className="space-y-3">
              {trainerSchedule.map((item, idx) => (
                <div key={idx} className="bg-gray-900/70 p-3 rounded-xl border border-gray-800 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono text-purple-400 font-bold">{item.time}</span>
                    <span className="text-[10px] font-bold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30">
                      {item.batch}
                    </span>
                  </div>
                  <div className="font-bold text-white text-xs leading-snug">{item.topic}</div>
                  <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1">
                    <span>{item.room}</span>
                    <button 
                      onClick={() => showToast(`Launching classroom for ${item.batch}...`, 'success')}
                      className="text-purple-400 hover:text-purple-300 font-bold flex items-center space-x-1"
                    >
                      <Video className="w-3 h-3" />
                      <span>Join Class</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Student Modal */}
      {editingStudent && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingStudent(null);
          }}
          studentProfile={editingStudent}
        />
      )}

      {/* Trainer Self Profile Edit Modal */}
      {isSelfProfileEditOpen && (
        <EditProfileModal
          isOpen={isSelfProfileEditOpen}
          onClose={() => setIsSelfProfileEditOpen(false)}
          studentProfile={null}
        />
      )}
    </div>
  );
};
