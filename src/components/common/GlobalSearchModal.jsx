import React, { useState, useEffect } from 'react';
import { useSkillora } from '../../context/SkilloraContext';
import { Search, X, GraduationCap, Target, DollarSign, Layers, User, ArrowRight } from 'lucide-react';

export const GlobalSearchModal = () => {
  const { theme, isSearchOpen, setIsSearchOpen, students, leads, courses, batches, invoices, trainers, navigateTo, setSelectedStudentId, setSelectedCustomerId } = useSkillora();
  const [query, setQuery] = useState('');

  // Handle Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  // Search Results
  const matchedStudents = q ? students.filter(s => s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q) || s.courseName.toLowerCase().includes(q)).slice(0, 4) : [];
  const matchedLeads = q ? leads.filter(l => l.name.toLowerCase().includes(q) || l.contactPerson.toLowerCase().includes(q) || l.id.toLowerCase().includes(q)).slice(0, 4) : [];
  const matchedInvoices = q ? invoices.filter(i => i.id.toLowerCase().includes(q) || i.customerName.toLowerCase().includes(q)).slice(0, 3) : [];
  const matchedBatches = q ? batches.filter(b => b.batchName.toLowerCase().includes(q) || b.id.toLowerCase().includes(q)).slice(0, 3) : [];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-start justify-center pt-20 px-4">
      <div className={`w-full max-w-2xl border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 ${
        theme === 'dark'
          ? 'glass-panel bg-gray-950 border-gray-800'
          : 'bg-white border-slate-200 shadow-2xl text-slate-900'
      }`}>
        {/* Search Bar Input */}
        <div className={`p-4 border-b flex items-center space-x-3 ${
          theme === 'dark' ? 'border-gray-800' : 'border-slate-200 bg-slate-50'
        }`}>
          <Search className="w-5 h-5 text-indigo-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search students, leads, courses, invoices, trainers..."
            className={`flex-1 bg-transparent text-sm focus:outline-none ${
              theme === 'dark' ? 'text-white placeholder-gray-500' : 'text-slate-900 placeholder-slate-400 font-medium'
            }`}
            autoFocus
          />
          <button 
            onClick={() => setIsSearchOpen(false)}
            className={`p-1 rounded-lg transition-colors ${
              theme === 'dark' ? 'hover:bg-gray-800 text-gray-400 hover:text-white' : 'hover:bg-slate-200 text-slate-500 hover:text-slate-900'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {!q && (
            <div className={`text-center py-8 text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>
              Type to search across Students, CRM Leads, Batches, Invoices & Trainers...
            </div>
          )}

          {/* Students Results */}
          {matchedStudents.length > 0 && (
            <div>
              <div className={`text-[10px] font-bold uppercase mb-2 flex items-center space-x-1.5 ${
                theme === 'dark' ? 'text-gray-400' : 'text-slate-500'
              }`}>
                <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
                <span>Students</span>
              </div>
              <div className="space-y-1">
                {matchedStudents.map(s => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedStudentId(s.id);
                      navigateTo('students');
                      setIsSearchOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-colors ${
                      theme === 'dark' ? 'hover:bg-gray-800/70 text-white' : 'hover:bg-slate-100 text-slate-900'
                    }`}
                  >
                    <div>
                      <div className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{s.name} ({s.id})</div>
                      <div className={`text-[11px] ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>{s.courseName} • Grade: {s.grade} • Attendance: {s.attendance}%</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Leads Results */}
          {matchedLeads.length > 0 && (
            <div>
              <div className={`text-[10px] font-bold uppercase mb-2 flex items-center space-x-1.5 ${
                theme === 'dark' ? 'text-gray-400' : 'text-slate-500'
              }`}>
                <Target className="w-3.5 h-3.5 text-emerald-500" />
                <span>CRM Leads</span>
              </div>
              <div className="space-y-1">
                {matchedLeads.map(l => (
                  <button
                    key={l.id}
                    onClick={() => {
                      setSelectedCustomerId(l.id);
                      navigateTo('crm');
                      setIsSearchOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-colors ${
                      theme === 'dark' ? 'hover:bg-gray-800/70 text-white' : 'hover:bg-slate-100 text-slate-900'
                    }`}
                  >
                    <div>
                      <div className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{l.name} - Score: {l.leadScore}</div>
                      <div className={`text-[11px] ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>{l.courseName} • Stage: {l.stage} • ₹{(l.expectedRevenue/100000).toFixed(1)}L</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Invoices Results */}
          {matchedInvoices.length > 0 && (
            <div>
              <div className={`text-[10px] font-bold uppercase mb-2 flex items-center space-x-1.5 ${
                theme === 'dark' ? 'text-gray-400' : 'text-slate-500'
              }`}>
                <DollarSign className="w-3.5 h-3.5 text-amber-500" />
                <span>Invoices</span>
              </div>
              <div className="space-y-1">
                {matchedInvoices.map(inv => (
                  <button
                    key={inv.id}
                    onClick={() => {
                      navigateTo('finance');
                      setIsSearchOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-colors ${
                      theme === 'dark' ? 'hover:bg-gray-800/70 text-white' : 'hover:bg-slate-100 text-slate-900'
                    }`}
                  >
                    <div>
                      <div className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{inv.id} - {inv.customerName}</div>
                      <div className={`text-[11px] ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>Total: ₹{inv.totalAmount.toLocaleString()} • Status: {inv.status}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
