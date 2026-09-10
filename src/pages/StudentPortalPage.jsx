import React from 'react';
import { useSkillora } from '../context/SkilloraContext';
import { GraduationCap, Sparkles, BookOpen, Award, CheckCircle2, AlertTriangle, Calendar } from 'lucide-react';

export const StudentPortalPage = () => {
  const { students } = useSkillora();
  // Default logged in student profile: Rahul Verma (STU-1002)
  const student = students.find(s => s.id === 'STU-1002') || students[0];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Student Welcome Header */}
      <div className="glass-panel p-6 rounded-3xl border border-indigo-500/40 bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-950/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <img src={student.avatar} alt={student.name} className="w-14 h-14 rounded-full object-cover border-2 border-indigo-400 shadow-xl" />
          <div>
            <h1 className="text-xl font-black text-white tracking-tight flex items-center space-x-2">
              <span>Welcome back, {student.name}!</span>
              <span className="text-xs font-bold text-cyan-400 bg-cyan-950/80 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                Student Portal
              </span>
            </h1>
            <p className="text-xs text-indigo-200 mt-1">{student.courseName} • {student.batchName}</p>
          </div>
        </div>

        <div className="bg-gray-900/80 p-3 rounded-2xl border border-gray-800 text-xs flex items-center space-x-4">
          <div><span className="text-gray-400 block text-[10px] uppercase font-bold">Overall Score</span><strong className="text-white text-base font-black">{student.overallScore}%</strong></div>
          <div><span className="text-gray-400 block text-[10px] uppercase font-bold">Academic Grade</span><strong className="text-emerald-400 text-base font-black">Grade {student.grade}</strong></div>
        </div>
      </div>

      {/* KPI Cards Breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-2xl border border-emerald-500/30">
          <span className="text-[10px] uppercase font-bold text-gray-400">Academic Score</span>
          <div className="text-2xl font-black text-emerald-400 mt-1">{student.academic}%</div>
          <span className="text-[10px] font-bold text-emerald-300">Grade {student.grade} (Excellent)</span>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-amber-500/30">
          <span className="text-[10px] uppercase font-bold text-gray-400">Attendance Rate</span>
          <div className="text-2xl font-black text-amber-400 mt-1">{student.attendance}%</div>
          <span className="text-[10px] font-extrabold text-amber-400 flex items-center space-x-1 mt-0.5">
            <AlertTriangle className="w-3 h-3" />
            <span>Attendance Risk (&lt;75%)</span>
          </span>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-purple-500/30">
          <span className="text-[10px] uppercase font-bold text-gray-400">Assignments Done</span>
          <div className="text-2xl font-black text-purple-400 mt-1">{student.assignment}%</div>
          <span className="text-[10px] font-bold text-purple-300">8/9 Modules Completed</span>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-cyan-500/30">
          <span className="text-[10px] uppercase font-bold text-gray-400">Course Progress</span>
          <div className="text-2xl font-black text-cyan-400 mt-1">{student.progress}%</div>
          <span className="text-[10px] font-bold text-cyan-300">On Track for Cert.</span>
        </div>
      </div>

      {/* AI Personalized Learning Recommendation */}
      <div className="glass-panel p-5 rounded-2xl border border-indigo-500/40 bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-950/40 space-y-3">
        <div className="flex items-center space-x-2 text-indigo-300 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-yellow-300 animate-spin-slow" />
          <span>AI Personal Learning Assistant Insight</span>
        </div>
        <p className="text-xs text-white leading-relaxed font-medium">
          {student.aiInsight}
        </p>
      </div>
    </div>
  );
};
