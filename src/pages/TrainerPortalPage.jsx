import React, { useState } from 'react';
import { useSkillora } from '../context/SkilloraContext';
import { EditProfileModal } from '../components/modals/EditProfileModal';
import { 
  CheckSquare, Calendar, Users, Sparkles, CheckCircle2, 
  AlertTriangle, UserCheck, Search, Filter, Eye, ArrowRight, Phone, Mail, Edit3, Trash2, UserPlus, Star, Award, BookOpen, Clock, Video
} from 'lucide-react';

export const TrainerPortalPage = () => {
  const { 
    currentUser, trainers, students, batches, 
    updateStudentAttendanceAndMarks, deleteStudent, showToast, 
    setSelectedStudentId, navigateTo, setIsAddStudentOpen 
  } = useSkillora();

  const [editingStudent, setEditingStudent] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSelfProfileEditOpen, setIsSelfProfileEditOpen] = useState(false);

  // Find active logged-in trainer profile from dataset or construct fallback from currentUser
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
    bio: "Lead Educator & Senior Instructor. Specialized in Neural Networks and practical AI pipelines."
  };

  // Default selected batch to trainer's assigned batch
  const defaultTrainerBatch = (activeTrainer.activeBatches && activeTrainer.activeBatches.length > 0) 
    ? activeTrainer.activeBatches[0] 
    : 'AIML-01';

  const [selectedBatch, setSelectedBatch] = useState(defaultTrainerBatch);
  const [studentFilter, setStudentFilter] = useState('ALL'); // ALL, ATT_RISK, ACAD_RISK, GRADE_A
  const [searchQ, setSearchQ] = useState('');

  // Trainer assigned batches list
  const trainerBatches = batches.filter(b => 
    activeTrainer.activeBatches?.includes(b.id) || b.trainerName?.toLowerCase().includes(activeTrainer.name.toLowerCase())
  );
  const displayBatches = trainerBatches.length > 0 ? trainerBatches : batches;

  // Selected batch students
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

  // Mock upcoming lecture schedule for logged-in trainer
  const trainerSchedule = [
    { time: '10:00 AM - 11:30 AM', batch: selectedBatch, topic: 'Deep Learning & Neural Network Optimization', room: 'Lab 302', type: 'Live Session' },
    { time: '02:00 PM - 03:30 PM', batch: 'AIML-04', topic: 'Model Deployment with FastAPI & Docker', room: 'Virtual Classroom 1', type: 'Interactive Lab' },
    { time: '04:30 PM - 05:30 PM', batch: selectedBatch, topic: 'Student 1-on-1 Academic Counseling & Code Review', room: 'Office Hours', type: 'Mentorship' }
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Personalized Trainer Hero Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-950/70 via-indigo-950/50 to-slate-950/80 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start sm:items-center space-x-4">
            <img 
              src={activeTrainer.avatar} 
              alt={activeTrainer.name} 
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-purple-500 shadow-xl"
            />
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center space-x-1">
                  <Award className="w-3 h-3 text-purple-400" />
                  <span>Personal Trainer Dashboard</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {activeTrainer.status || 'Active Educator'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Welcome back, {activeTrainer.name}!
              </h1>

              <p className="text-xs text-gray-300 max-w-xl line-clamp-2">
                {activeTrainer.bio || 'Managing batch progress, evaluating student performances, and logging live attendance.'}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-gray-400">
                <span className="flex items-center space-x-1 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{activeTrainer.rating} Rating</span>
                </span>
                <span>•</span>
                <span className="font-semibold text-gray-300">{activeTrainer.experienceYears || 8} Years Experience</span>
                <span>•</span>
                <span className="font-mono text-purple-300">{activeTrainer.email}</span>
              </div>
            </div>
          </div>

          {/* Trainer Quick Controls */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full lg:w-auto shrink-0">
            <button
              onClick={() => setIsSelfProfileEditOpen(true)}
              className="bg-gray-900/80 hover:bg-gray-800 text-purple-300 border border-purple-500/40 font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center space-x-1.5 shadow-md"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit My Profile</span>
            </button>

            <button
              onClick={() => setIsAddStudentOpen(true)}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs px-4 py-2 rounded-xl transition-all shadow-lg glow-purple flex items-center space-x-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ Add New Student</span>
            </button>
          </div>
        </div>
      </div>

      {/* Trainer Personalized Key Performance Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="glass-card p-4 rounded-2xl border border-purple-500/30 bg-purple-950/20">
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Assigned Batches</span>
            <BookOpen className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white">{displayBatches.length} Batches</div>
          <div className="text-[10px] text-purple-300 mt-1">{displayBatches.map(b => b.id).join(', ')}</div>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-indigo-500/30 bg-indigo-950/20">
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Monitored Students</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-white">{batchStudents.length} Students</div>
          <div className="text-[10px] text-indigo-300 mt-1">Batch: {selectedBatch}</div>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/20">
          <div className="flex items-center justify-between text-emerald-400 mb-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Grade A Performers</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">
            {batchStudents.filter(s => s.grade === 'A').length}
          </div>
          <div className="text-[10px] text-emerald-300 mt-1">High Achievers</div>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-amber-500/30 bg-amber-950/20">
          <div className="flex items-center justify-between text-amber-400 mb-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Attendance Risk</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">
            {batchStudents.filter(s => s.attendanceStatus === 'Attendance Risk').length}
          </div>
          <div className="text-[10px] text-amber-300 mt-1">Requires Notice (&lt;75%)</div>
        </div>
      </div>

      {/* Today's Teaching Schedule for Logged-In Trainer */}
      <div className="glass-panel p-5 rounded-2xl border border-gray-800 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-black text-white uppercase tracking-wider flex items-center space-x-2">
            <Clock className="w-4 h-4 text-purple-400" />
            <span>Today's Interactive Teaching Schedule ({activeTrainer.name})</span>
          </h2>
          <span className="text-[10px] font-bold text-purple-300 bg-purple-900/40 border border-purple-500/30 px-2 py-0.5 rounded-lg">
            3 Sessions Today
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {trainerSchedule.map((item, idx) => (
            <div key={idx} className="bg-gray-900/70 p-3.5 rounded-xl border border-gray-800 space-y-2 hover:border-purple-500/40 transition-colors">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-mono text-purple-400 font-bold flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{item.time}</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {item.batch}
                </span>
              </div>
              <div className="font-bold text-white text-xs leading-snug">{item.topic}</div>
              <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1 border-t border-gray-800/60">
                <span>{item.room} • {item.type}</span>
                <button 
                  onClick={() => showToast(`Launching virtual classroom session for ${item.batch}`, 'success')}
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

      {/* AI Risk Notice Dispatch Alert Banner */}
      <div className="glass-panel p-4 rounded-2xl border border-purple-500/40 bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-slate-950/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-purple-600/30 text-purple-300 border border-purple-500/40">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">Teacher Student Monitoring Alert</h3>
            <p className="text-xs text-gray-300">
              {batchStudents.filter(s => s.attendanceStatus === 'Attendance Risk').length} students in <strong>{selectedBatch}</strong> have attendance below 75% threshold.
            </p>
          </div>
        </div>
        <button
          onClick={() => showToast(`Dispatched alert notification to ${batchStudents.filter(s => s.attendanceStatus === 'Attendance Risk').length} students in ${selectedBatch}`, 'info')}
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl transition-all shadow-md shrink-0"
        >
          Dispatch Reminder Notices
        </button>
      </div>

      {/* Batch Roster Controls & Student Table Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monitored Students Table */}
        <div className="lg:col-span-8 glass-panel p-5 rounded-2xl border border-gray-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <h2 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center space-x-2">
                <Users className="w-4 h-4 text-purple-400" />
                <span>Monitored Roster ({filteredStudents.length})</span>
              </h2>

              {/* Active Batch Switcher */}
              <div className="flex items-center space-x-1.5 bg-gray-900 border border-gray-800 rounded-xl px-2 py-1">
                <span className="text-[10px] font-bold text-gray-400">Batch:</span>
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
                  className="bg-transparent text-white text-xs font-extrabold focus:outline-none"
                >
                  {displayBatches.map(b => (
                    <option key={b.id} value={b.id}>{b.id} - {b.batchName}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center space-x-1.5 overflow-x-auto">
              <button
                onClick={() => setStudentFilter('ALL')}
                className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all ${
                  studentFilter === 'ALL' ? 'bg-purple-600 text-white border-purple-500' : 'bg-gray-900 text-gray-400 border-gray-800'
                }`}
              >
                All
              </button>

              <button
                onClick={() => setStudentFilter('ATT_RISK')}
                className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all ${
                  studentFilter === 'ATT_RISK' ? 'bg-amber-600 text-white border-amber-500' : 'bg-gray-900 text-amber-400 border-gray-800'
                }`}
              >
                Att Risk (&lt;75%)
              </button>

              <button
                onClick={() => setStudentFilter('ACAD_RISK')}
                className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all ${
                  studentFilter === 'ACAD_RISK' ? 'bg-rose-600 text-white border-rose-500' : 'bg-gray-900 text-rose-400 border-gray-800'
                }`}
              >
                Academic Risk
              </button>

              <button
                onClick={() => setStudentFilter('GRADE_A')}
                className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all ${
                  studentFilter === 'GRADE_A' ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-gray-900 text-emerald-400 border-gray-800'
                }`}
              >
                Grade A
              </button>
            </div>
          </div>

          {/* Table */}
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
                        s.grade === 'C' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-rose-500/20 text-rose-400'
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
                          title="Analyze Student"
                        >
                          Analyze
                        </button>

                        <button
                          onClick={() => {
                            setEditingStudent(s);
                            setIsEditModalOpen(true);
                          }}
                          className="bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 font-bold px-2 py-1 rounded text-[10px] border border-indigo-500/40 flex items-center space-x-1"
                          title="Edit Student Profile"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to permanently delete student "${s.name}" (${s.id})?`)) {
                              deleteStudent(s.id);
                            }
                          }}
                          className="bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 font-bold px-2 py-1 rounded text-[10px] border border-rose-500/40 flex items-center space-x-1"
                          title="Delete Student Profile"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Marks & Attendance Logger Widget */}
        <div className="lg:col-span-4 glass-panel p-5 rounded-2xl border border-gray-800 space-y-4">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center space-x-2">
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>Teacher Marks & Attendance Entry</span>
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-400 font-bold block mb-1">Select Student ({selectedBatch})</label>
              <select
                value={selectedStudentForLog}
                onChange={(e) => {
                  setSelectedStudentForLog(e.target.value);
                  const st = students.find(s => s.id === e.target.value);
                  if (st) {
                    setAttendanceVal(st.attendance);
                    setAcademicVal(st.academic);
                  }
                }}
                className="w-full bg-gray-900 border border-gray-800 text-white text-xs font-bold rounded-xl px-3 py-2 focus:outline-none"
              >
                {batchStudents.map(s => (
                  <option key={s.id} value={s.id}>{s.name} (Current: {s.attendance}% Att)</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-400 font-bold block mb-1">Attendance Rate (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={attendanceVal}
                onChange={(e) => setAttendanceVal(Number(e.target.value))}
                className="w-full bg-gray-900 border border-gray-800 text-white text-xs font-bold rounded-xl px-3 py-2 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 font-bold block mb-1">Academic Score (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={academicVal}
                onChange={(e) => setAcademicVal(Number(e.target.value))}
                className="w-full bg-gray-900 border border-gray-800 text-white text-xs font-bold rounded-xl px-3 py-2 focus:outline-none"
              />
            </div>

            <button
              onClick={handleLog}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg glow-emerald transition-all"
            >
              Update Student Record
            </button>
          </div>
        </div>
      </div>

      {/* Edit Selected Student Profile Modal */}
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
