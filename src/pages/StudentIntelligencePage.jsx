import React from 'react';
import { useSkillora } from '../context/SkilloraContext';
import { PerformanceMatrix } from '../components/student/PerformanceMatrix';
import { StudentTable } from '../components/student/StudentTable';
import { StudentDetailModal } from '../components/student/StudentDetailModal';
import { GraduationCap, Sparkles, Filter, Info } from 'lucide-react';

export const StudentIntelligencePage = () => {
  const { selectedStudentId, setSelectedStudentId } = useSkillora();

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
            <GraduationCap className="w-6 h-6 text-indigo-400" />
            <span>Student Academic & Attendance Intelligence</span>
          </h1>
          <p className="text-xs text-gray-400">
            Multi-factor student sorting, 4-quadrant scatter matrix, separate academic vs attendance evaluation, and AI risk intervention.
          </p>
        </div>
      </div>

      {/* Core Rules Callout Banner (Requirements #22-#24) */}
      <div className="glass-panel p-4 rounded-2xl border border-indigo-500/40 bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-950/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded-xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/40 shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Separate Academic vs Attendance Classification Matrix</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Academic Grade (A: 85-100, B: 75-84, C: 65-74, D/F: 0-64) is evaluated <strong>independently</strong> from Attendance Status (Excellent: 90%+, Good: 80-89%, Average: 75-79%, Attendance Risk: &lt;75%).
            </p>
          </div>
        </div>

        <div className="bg-gray-900/80 p-3 rounded-xl border border-gray-800 text-[11px] text-indigo-200 shrink-0">
          <div><strong>Overall Score Formula:</strong></div>
          <div className="font-mono text-gray-300">Academic (50%) + Attendance (20%) + Assignment (15%) + Progress (15%)</div>
        </div>
      </div>

      {/* 4-Quadrant Scatter Matrix */}
      <PerformanceMatrix onSelectStudent={(id) => setSelectedStudentId(id)} />

      {/* Multi-Criteria Sortable Student Table & Filters */}
      <StudentTable onSelectStudent={(id) => setSelectedStudentId(id)} />

      {/* Student 360 Detail Modal */}
      {selectedStudentId && (
        <StudentDetailModal
          studentId={selectedStudentId}
          onClose={() => setSelectedStudentId(null)}
        />
      )}
    </div>
  );
};
