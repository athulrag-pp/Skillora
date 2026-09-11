import React from 'react';
import { useSkillora } from '../../context/SkilloraContext';
import { 
  X, ShieldCheck, Star, Award, BookOpen, Users, DollarSign, 
  Phone, Mail, Calendar, CheckCircle2, TrendingUp, Trash2
} from 'lucide-react';

export const TrainerDetailModal = ({ isOpen, onClose, trainer }) => {
  const { deleteTrainer, showToast } = useSkillora();

  if (!isOpen || !trainer) return null;

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to remove teacher "${trainer.name}" from management database?`)) {
      if (deleteTrainer) {
        deleteTrainer(trainer.id);
      }
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-xl glass-panel bg-gray-950 border border-indigo-500/40 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        {/* Header Banner */}
        <div className="p-6 bg-gradient-to-r from-purple-950/80 via-indigo-950/80 to-slate-950/80 border-b border-indigo-500/30 flex items-start justify-between relative">
          <div className="flex items-start space-x-4">
            <img 
              src={trainer.avatar} 
              alt={trainer.name} 
              className="w-20 h-20 rounded-2xl object-cover border-2 border-purple-500 shadow-lg"
            />
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  Faculty & Teacher Record
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                  trainer.status === 'Top Performer' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                }`}>
                  {trainer.status || 'Active Staff'}
                </span>
              </div>

              <h2 className="text-xl font-black text-white tracking-tight">{trainer.name}</h2>
              <p className="text-xs text-gray-400 font-mono">{trainer.id} • {trainer.experienceYears || 6}+ Years Teaching Experience</p>

              <div className="flex items-center space-x-3 pt-1 text-xs">
                <span className="flex items-center space-x-1 font-bold text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{trainer.rating || 4.8} / 5.0 Rating</span>
                </span>
                <span className="text-gray-500">•</span>
                <span className="text-emerald-400 font-bold">₹{((trainer.monthlyCost || 80000)/1000).toFixed(0)}k/mo Salary</span>
              </div>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Details Body */}
        <div className="p-6 space-y-5 text-xs">
          {/* Bio & Philosophy */}
          <div>
            <h3 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-1">Educator Profile & Bio</h3>
            <p className="text-gray-200 bg-gray-900/60 p-3 rounded-xl border border-gray-800/80 leading-relaxed">
              {trainer.bio || `${trainer.name} is a certified senior instructor specializing in technical curriculum delivery and student performance mentoring.`}
            </p>
          </div>

          {/* Contact & Financial Telemetry */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-900/60 p-3 rounded-xl border border-gray-800 space-y-1.5">
              <span className="text-[10px] font-extrabold text-gray-400 uppercase">Contact Email</span>
              <div className="font-mono text-purple-300 font-bold flex items-center space-x-1">
                <Mail className="w-3.5 h-3.5 text-purple-400" />
                <span>{trainer.email}</span>
              </div>
            </div>

            <div className="bg-gray-900/60 p-3 rounded-xl border border-gray-800 space-y-1.5">
              <span className="text-[10px] font-extrabold text-gray-400 uppercase">Contact Phone</span>
              <div className="font-mono text-emerald-300 font-bold flex items-center space-x-1">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{trainer.phone || '+91 98123 45678'}</span>
              </div>
            </div>
          </div>

          {/* Expertise Chips */}
          <div>
            <h3 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-1.5">Core Technical Expertise</h3>
            <div className="flex flex-wrap gap-1.5">
              {(trainer.expertise || ["Computer Science", "AI"]).map((exp, i) => (
                <span key={i} className="bg-purple-950/60 text-purple-200 border border-purple-500/30 font-bold px-2.5 py-1 rounded-lg text-[11px]">
                  {exp}
                </span>
              ))}
            </div>
          </div>

          {/* Batches & Student Outcomes */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-900 p-3 rounded-xl border border-gray-800 text-center">
              <span className="text-[10px] text-gray-400 uppercase font-bold block">Assigned Batches</span>
              <span className="text-lg font-black text-white mt-1 block">{(trainer.activeBatches || []).join(', ') || 'N/A'}</span>
            </div>

            <div className="bg-gray-900 p-3 rounded-xl border border-gray-800 text-center">
              <span className="text-[10px] text-gray-400 uppercase font-bold block">Students Taught</span>
              <span className="text-lg font-black text-indigo-400 mt-1 block">{trainer.assignedStudentsCount || 25}</span>
            </div>

            <div className="bg-gray-900 p-3 rounded-xl border border-gray-800 text-center">
              <span className="text-[10px] text-gray-400 uppercase font-bold block">Performance Score</span>
              <span className="text-lg font-black text-emerald-400 mt-1 block">{trainer.performanceScore || 92}%</span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-800">
            <button
              onClick={handleDelete}
              className="bg-rose-600/20 hover:bg-rose-600/40 text-rose-300 font-bold px-3.5 py-2 rounded-xl border border-rose-500/40 flex items-center space-x-1.5 transition-all"
            >
              <Trash2 className="w-4 h-4" />
              <span>Remove Teacher</span>
            </button>

            <button
              onClick={() => {
                showToast(`Management performance report generated for ${trainer.name}`, 'success');
                onClose();
              }}
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2 rounded-xl transition-all shadow-md"
            >
              Generate Audit Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
