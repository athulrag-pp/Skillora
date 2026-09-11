import React, { useState } from 'react';
import { useSkillora } from '../context/SkilloraContext';
import { EditProfileModal } from '../components/modals/EditProfileModal';
import { 
  CheckSquare, Calendar, Users, Sparkles, CheckCircle2, 
  AlertTriangle, UserCheck, Search, Filter, Eye, ArrowRight, Phone, Mail, Edit3, Trash2, UserPlus 
} from 'lucide-react';

export const TrainerPortalPage = () => {
  const { students, batches, updateStudentAttendanceAndMarks, deleteStudent, showToast, setSelectedStudentId, navigateTo, setIsAddStudentOpen } = useSkillora();

  const [editingStudent, setEditingStudent] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [selectedBatch, setSelectedBatch] = useState('AIML-01');
  const [studentFilter, setStudentFilter] = useState('ALL'); // ALL, ATT_RISK, ACAD_RISK, GRADE_A
  const [searchQ, setSearchQ] = useState('');

  // Selected student for quick marks/attendance logger
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

  const currentBatchObj = batches.find(b => b.id === selectedBatch) || batches[0];

  const handleLog = () => {
    updateStudentAttendanceAndMarks(selectedStudentForLog, attendanceVal, academicVal);
    showToast(`Saved Attendance (${attendanceVal}%) & Marks (${academicVal}%) for student record`, 'success');
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header & Batch Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
            <CheckSquare className="w-6 h-6 text-purple-400" />
            <span>Trainer Student Monitoring & Portal</span>
          </h1>
          <p className="text-xs text-gray-400">
            Assigned Trainer: <strong>Arun Kumar</strong> • Monitoring Batch Rosters, Adding & Editing Student Details
          </p>
        </div>

        {/* Action Controls: Add Student & Batch Selection Dropdown */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsAddStudentOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs px-3.5 py-2 rounded-xl transition-all shadow-lg flex items-center space-x-1.5"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Add New Student</span>
          </button>

          <div className="flex items-center space-x-2 bg-gray-900 border border-gray-800 rounded-xl p-1.5">
            <span className="text-xs font-bold text-gray-400 pl-2">Active Batch:</span>
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
              className="bg-gray-950 text-white text-xs font-extrabold rounded-lg px-3 py-1.5 focus:outline-none border border-gray-700"
            >
              {batches.map(b => (
                <option key={b.id} value={b.id}>{b.id} - {b.batchName} ({b.studentCount} Students)</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Trainer AI Risk Alert Banner (Requirement #15) */}
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

      {/* Batch Overview KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="glass-card p-3.5 rounded-xl border border-gray-800">
          <span className="text-[10px] font-bold text-gray-400 uppercase">Monitored Roster</span>
          <div className="text-xl font-black text-white mt-1">{batchStudents.length} Students</div>
        </div>
        <div className="glass-card p-3.5 rounded-xl border border-emerald-500/30">
          <span className="text-[10px] font-bold text-emerald-400 uppercase">Grade A Performers</span>
          <div className="text-xl font-black text-emerald-400 mt-1">{batchStudents.filter(s => s.grade === 'A').length}</div>
        </div>
        <div className="glass-card p-3.5 rounded-xl border border-amber-500/30">
          <span className="text-[10px] font-bold text-amber-400 uppercase">Attendance Risk</span>
          <div className="text-xl font-black text-amber-400 mt-1">{batchStudents.filter(s => s.attendanceStatus === 'Attendance Risk').length}</div>
        </div>
        <div className="glass-card p-3.5 rounded-xl border border-rose-500/30">
          <span className="text-[10px] font-bold text-rose-400 uppercase">Academic Deficiency</span>
          <div className="text-xl font-black text-rose-400 mt-1">{batchStudents.filter(s => s.academic < 65).length}</div>
        </div>
      </div>

      {/* Main Teacher Monitoring Table & Session Logger Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monitored Students Table */}
        <div className="lg:col-span-8 glass-panel p-5 rounded-2xl border border-gray-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center space-x-2">
              <Users className="w-4 h-4 text-purple-400" />
              <span>Students Monitored by Teacher ({filteredStudents.length})</span>
            </h2>

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

        {/* Quick Marks & Attendance Logger */}
        <div className="lg:col-span-4 glass-panel p-5 rounded-2xl border border-gray-800 space-y-4">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center space-x-2">
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>Teacher Marks & Attendance Entry</span>
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-400 font-bold block mb-1">Select Student</label>
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

      {/* Edit Student Profile Modal */}
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
    </div>
  );
};
