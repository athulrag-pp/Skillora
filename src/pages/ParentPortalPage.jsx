import React from 'react';
import { useSkillora } from '../context/SkilloraContext';
import { ShieldAlert, AlertTriangle, CheckCircle2, DollarSign, Calendar, Sparkles, Mail, Phone } from 'lucide-react';

export const ParentPortalPage = () => {
  const { students } = useSkillora();
  const student = students.find(s => s.id === 'STU-1002') || students[0];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-pink-500/40 bg-gradient-to-r from-pink-950/40 via-purple-950/40 to-slate-950/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <img src={student.avatar} alt={student.name} className="w-14 h-14 rounded-full object-cover border-2 border-pink-400 shadow-xl" />
          <div>
            <h1 className="text-xl font-black text-white tracking-tight flex items-center space-x-2">
              <span>Parent Monitoring Portal</span>
              <span className="text-xs font-bold text-pink-400 bg-pink-950/80 px-2.5 py-0.5 rounded-full border border-pink-500/30">
                Guardian View
              </span>
            </h1>
            <p className="text-xs text-pink-200 mt-1">
              Monitoring Student: <strong>{student.name}</strong> ({student.id}) • Parent: <strong>{student.parentName}</strong>
            </p>
          </div>
        </div>

        <div className="bg-gray-900/80 p-3 rounded-2xl border border-gray-800 text-xs text-right">
          <span className="text-gray-400 block text-[10px] uppercase font-bold">Trainer Contact</span>
          <strong className="text-white font-bold">{student.trainerName}</strong>
        </div>
      </div>

      {/* AI Parent Alert Banner (Requirement #17) */}
      <div className="glass-panel p-4 rounded-2xl border border-amber-500/40 bg-amber-950/30 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <AlertTriangle className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">AI Parent Notification Warning</h3>
            <p className="text-xs text-gray-300">
              Rahul's attendance has dropped to <strong>68%</strong> (Below required 75% threshold). However, academic marks remain Excellent (Grade A, 92%).
            </p>
          </div>
        </div>
      </div>

      {/* Child Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-2xl border border-emerald-500/30">
          <span className="text-[10px] uppercase font-bold text-gray-400">Academic Score</span>
          <div className="text-2xl font-black text-emerald-400 mt-1">{student.academic}%</div>
          <span className="text-[10px] font-bold text-emerald-300">Grade A (Top 10% Class)</span>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-amber-500/30">
          <span className="text-[10px] uppercase font-bold text-gray-400">Attendance</span>
          <div className="text-2xl font-black text-amber-400 mt-1">{student.attendance}%</div>
          <span className="text-[10px] font-bold text-amber-300">Attendance Risk Alert</span>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-purple-500/30">
          <span className="text-[10px] uppercase font-bold text-gray-400">Assignments</span>
          <div className="text-2xl font-black text-purple-400 mt-1">{student.assignment}%</div>
          <span className="text-[10px] font-bold text-purple-300">Completed On Time</span>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-blue-500/30">
          <span className="text-[10px] uppercase font-bold text-gray-400">Tuition Fee Status</span>
          <div className="text-xl font-black text-emerald-400 mt-1">Paid in Full</div>
          <span className="text-[10px] font-bold text-blue-300">Receipt #INV-1045</span>
        </div>
      </div>
    </div>
  );
};
