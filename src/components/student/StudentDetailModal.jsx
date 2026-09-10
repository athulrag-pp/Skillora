import React, { useState } from 'react';
import { useSkillora } from '../../context/SkilloraContext';
import { generateInterventionPlan } from '../../services/aiEngine';
import { EditProfileModal } from '../modals/EditProfileModal';
import { X, Sparkles, AlertTriangle, CheckCircle2, Phone, Mail, GraduationCap, Calendar, User, FileText, ArrowRight, Edit3, Trash2 } from 'lucide-react';

export const StudentDetailModal = ({ studentId, onClose }) => {
  const { students, deleteStudent, showToast } = useSkillora();
  const [interventionPlan, setInterventionPlan] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const student = students.find(s => s.id === studentId);
  if (!student) return null;

  const handleGenerateIntervention = () => {
    const plan = generateInterventionPlan(student);
    setInterventionPlan(plan);
    showToast(`Generated AI Intervention Plan for ${student.name}`, 'success');
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to permanently delete student "${student.name}" (${student.id}) from the database?`)) {
      deleteStudent(student.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-3xl glass-panel bg-gray-950 border border-indigo-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="p-4 bg-gradient-to-r from-indigo-900/80 to-purple-900/80 border-b border-indigo-500/30 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-3">
            <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full object-cover border-2 border-indigo-400" />
            <div>
              <h2 className="text-sm font-bold text-white flex items-center space-x-2">
                <span>{student.name}</span>
                <span className="text-xs font-normal text-indigo-300">({student.id})</span>
              </h2>
              <p className="text-[11px] text-gray-300">{student.courseName} • {student.batchName}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 font-bold px-3 py-1.5 rounded-lg border border-indigo-500/40 text-xs flex items-center space-x-1.5 transition-all"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>

            <button
              onClick={handleDelete}
              className="bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 font-bold px-3 py-1.5 rounded-lg border border-rose-500/40 text-xs flex items-center space-x-1.5 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Student</span>
            </button>

            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="glass-card p-3 rounded-xl border border-indigo-500/30">
              <span className="text-[10px] uppercase font-bold text-gray-400">Academic Score</span>
              <div className="text-xl font-black text-white mt-1">{student.academic}%</div>
              <span className="text-[10px] font-bold text-emerald-400">Grade {student.grade}</span>
            </div>

            <div className="glass-card p-3 rounded-xl border border-amber-500/30">
              <span className="text-[10px] uppercase font-bold text-gray-400">Attendance</span>
              <div className="text-xl font-black text-amber-400 mt-1">{student.attendance}%</div>
              <span className="text-[10px] font-bold text-amber-300">{student.attendanceStatus}</span>
            </div>

            <div className="glass-card p-3 rounded-xl border border-purple-500/30">
              <span className="text-[10px] uppercase font-bold text-gray-400">Assignment Completion</span>
              <div className="text-xl font-black text-purple-400 mt-1">{student.assignment}%</div>
              <span className="text-[10px] font-bold text-purple-300">On Track</span>
            </div>

            <div className="glass-card p-3 rounded-xl border border-emerald-500/30">
              <span className="text-[10px] uppercase font-bold text-gray-400">Overall Score</span>
              <div className="text-xl font-black text-white mt-1">{student.overallScore}%</div>
              <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                student.riskLevel === 'HIGH' || student.riskLevel === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                Risk: {student.riskLevel}
              </span>
            </div>
          </div>

          {/* Formula Breakdown Banner */}
          <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-3.5 text-xs">
            <h4 className="font-bold text-indigo-300 text-[11px] uppercase tracking-wider mb-1">Overall Performance Score Formula Breakdown</h4>
            <p className="text-gray-300 font-mono text-[11px]">
              ({student.academic} × 0.50) + ({student.attendance} × 0.20) + ({student.assignment} × 0.15) + ({student.progress} × 0.15) = <strong className="text-white">{student.overallScore}%</strong>
            </p>
          </div>

          {/* AI Insight Box */}
          <div className="glass-panel p-4 rounded-xl border border-indigo-500/40 bg-gradient-to-r from-indigo-950/60 to-purple-950/60 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-indigo-300">
              <Sparkles className="w-4 h-4 text-yellow-300 animate-spin-slow" />
              <span>AI Performance & Risk Analysis</span>
            </div>
            <p className="text-xs text-white font-medium leading-relaxed">{student.aiInsight}</p>
          </div>

          {/* Parent Contact Information */}
          <div className="glass-card p-4 rounded-xl border border-gray-800 space-y-2">
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">Parent & Guardian Contact</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="text-gray-400">Name: <strong className="text-white">{student.parentName}</strong></div>
              <div className="text-gray-400 flex items-center space-x-1"><Mail className="w-3.5 h-3.5 text-indigo-400" /><span className="text-white">{student.parentEmail}</span></div>
              <div className="text-gray-400 flex items-center space-x-1"><Phone className="w-3.5 h-3.5 text-emerald-400" /><span className="text-white">{student.parentPhone}</span></div>
            </div>
          </div>

          {/* AI Intervention Plan Action */}
          <div>
            {!interventionPlan ? (
              <button
                onClick={handleGenerateIntervention}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg glow-primary transition-all flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate AI Intervention Plan</span>
              </button>
            ) : (
              <div className="glass-panel p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">AI Tailored Intervention Plan Active</h4>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
                    Assigned Mentor: {interventionPlan.assignedMentor}
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-gray-200">
                  {interventionPlan.actionSteps.map((step, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Student Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        studentProfile={student}
      />
    </div>
  );
};
