import React, { useState } from 'react';
import { useSkillora } from '../context/SkilloraContext';
import { recommendTrainer } from '../services/aiEngine';
import { Layers, BookOpen, Users, Calendar, Sparkles, CheckCircle2, Award, Clock, DollarSign, Star, AlertTriangle, ShieldCheck } from 'lucide-react';

export const OperationsPage = () => {
  const { courses, batches, trainers, showToast } = useSkillora();
  const [selectedCourseForMatch, setSelectedCourseForMatch] = useState(courses[0].id);

  const matchedTrainers = recommendTrainer(selectedCourseForMatch, trainers);

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
            <Layers className="w-6 h-6 text-blue-400" />
            <span>Operations & Teacher Performance Management</span>
          </h1>
          <p className="text-xs text-gray-400">
            Monitor teacher ratings, student academic/attendance outcomes, active batches, and AI Trainer Matching.
          </p>
        </div>
      </div>

      {/* 1. LIST OF TEACHERS MONITORED BY MANAGEMENT */}
      <div className="glass-panel p-5 rounded-2xl border border-indigo-500/40 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/40">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">Teachers Monitored by Management ({trainers.length} Active Staff)</h2>
              <p className="text-xs text-gray-400">Tracking teacher ratings, student outcomes, active batches, monthly costs, and performance status.</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-900 text-gray-400 uppercase text-[10px] font-extrabold border-b border-gray-800">
              <tr>
                <th className="p-3">Teacher / Trainer</th>
                <th className="p-3">Expertise</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Assigned Batches</th>
                <th className="p-3">Students</th>
                <th className="p-3">Student Avg Grade</th>
                <th className="p-3">Student Avg Att.</th>
                <th className="p-3">Monthly Cost</th>
                <th className="p-3">Management Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 font-medium">
              {trainers.map(t => (
                <tr key={t.id} className="hover:bg-gray-800/40 transition-colors">
                  <td className="p-3">
                    <div className="flex items-center space-x-3">
                      <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover border border-indigo-400" />
                      <div>
                        <div className="font-bold text-white text-xs">{t.name}</div>
                        <div className="text-[10px] text-gray-400">{t.experienceYears}+ yrs exp • {t.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {t.expertise.slice(0, 2).map((exp, i) => (
                        <span key={i} className="text-[9px] bg-gray-900 text-indigo-300 px-1.5 py-0.5 rounded border border-gray-800">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center space-x-1 font-bold text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{t.rating} / 5.0</span>
                    </div>
                  </td>
                  <td className="p-3 text-gray-200 font-bold">{t.activeBatches.join(', ')}</td>
                  <td className="p-3 text-white font-bold">{t.assignedStudentsCount}</td>
                  <td className="p-3 text-emerald-400 font-bold">{t.studentAvgGrade || 'A (88%)'}</td>
                  <td className="p-3 text-gray-200">{t.studentAvgAttendance || 86}%</td>
                  <td className="p-3 text-amber-400 font-bold">₹{(t.monthlyCost/1000).toFixed(0)}k/mo</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                      t.status === 'Top Performer' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      t.status === 'Attendance Alert' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    }`}>
                      {t.status || 'Active'}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => showToast(`Management audit dispatched for ${t.name}`, 'info')}
                      className="bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 font-bold px-2.5 py-1 rounded text-[10px] border border-indigo-500/40"
                    >
                      Audit Teacher
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. AI Trainer Recommendation Engine */}
      <div className="glass-panel p-5 rounded-2xl border border-indigo-500/40 bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-950/40 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/40">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">AI Trainer Recommendation Engine</h2>
              <p className="text-xs text-gray-400">Matches trainer expertise, student rating, availability, and batch capacity.</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-300 font-medium">Select Course:</span>
            <select
              value={selectedCourseForMatch}
              onChange={(e) => setSelectedCourseForMatch(e.target.value)}
              className="bg-gray-900 border border-gray-800 text-white text-xs font-bold rounded-xl px-3 py-1.5 focus:outline-none"
            >
              {courses.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matchedTrainers.slice(0, 2).map((m) => (
            <div key={m.trainer.id} className="glass-card p-4 rounded-xl border border-indigo-500/30 flex items-start space-x-3">
              <img src={m.trainer.avatar} alt={m.trainer.name} className="w-12 h-12 rounded-full object-cover border-2 border-indigo-400 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-white">{m.trainer.name}</h3>
                    <p className="text-[10px] text-gray-400">{m.trainer.experienceYears}+ years exp • Rating: {m.trainer.rating}/5.0</p>
                  </div>
                  <span className="text-xs font-black text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/40 shadow-lg">
                    {m.matchScore}% MATCH
                  </span>
                </div>

                <div className="space-y-1">
                  {m.matchReasons.map((reason, idx) => (
                    <div key={idx} className="text-[10px] text-indigo-200 flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => showToast(`Assigned ${m.trainer.name} to course batch roster!`, 'success')}
                  className="mt-2 w-full py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] transition-all"
                >
                  Assign Trainer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Live Batches Grid */}
      <div className="space-y-4">
        <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">Active Training Batches</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {batches.map((b) => (
            <div key={b.id} className="glass-card rounded-2xl p-4 border border-gray-800 space-y-3 shadow-xl">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-500/30">
                    {b.id}
                  </span>
                  <h3 className="text-xs font-bold text-white mt-1.5">{b.batchName}</h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-400">Batch Health</span>
                  <div className={`text-lg font-black ${b.healthScore >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {b.healthScore}/100
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-gray-300">
                <div className="flex justify-between"><span>Trainer:</span><strong className="text-white">{b.trainerName}</strong></div>
                <div className="flex justify-between"><span>Enrolled:</span><strong className="text-white">{b.studentCount} / {b.capacity} Students</strong></div>
                <div className="flex justify-between"><span>Attendance:</span><strong className={b.attendanceRate < 75 ? "text-amber-400" : "text-emerald-400"}>{b.attendanceRate}%</strong></div>
                <div className="flex justify-between"><span>Progress:</span><strong className="text-purple-400">{b.courseProgress}%</strong></div>
              </div>

              <div className="pt-2 border-t border-gray-800 text-[10px] text-gray-400 flex items-center justify-between">
                <span>{b.schedule}</span>
                <span className="font-bold text-emerald-400">Profit: ₹{(b.profit/1000).toFixed(0)}k</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
