import React, { useState } from 'react';
import { useSkillora } from '../context/SkilloraContext';
import { 
  Building2, Phone, Mail, User, DollarSign, BookOpen, Layers, 
  Sparkles, Calendar, FileText, CheckCircle2, Clock, Activity 
} from 'lucide-react';

export const Customer360Page = () => {
  const { leads, selectedCustomerId, setSelectedCustomerId, invoices, students, navigateTo } = useSkillora();

  const [activeTab, setActiveTab] = useState('overview'); // overview, sales, training, finance, activity, ai_insights

  const customer = leads.find(l => l.id === selectedCustomerId) || leads[0];
  const customerInvoices = invoices.filter(i => i.customerName === customer.name);

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Customer Header Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
              <span>{customer.name}</span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                Customer 360 View
              </span>
            </h1>
            <p className="text-xs text-gray-400">{customer.contactPerson} • {customer.email} • {customer.phone}</p>
          </div>
        </div>

        {/* Customer Selector Dropdown */}
        <select
          value={selectedCustomerId}
          onChange={(e) => setSelectedCustomerId(e.target.value)}
          className="bg-gray-900 border border-gray-800 text-white text-xs font-bold rounded-xl px-3 py-2 focus:outline-none"
        >
          {leads.map(l => (
            <option key={l.id} value={l.id}>{l.name} ({l.stage})</option>
          ))}
        </select>
      </div>

      {/* Tabs Header */}
      <div className="flex items-center space-x-1 border-b border-gray-800 overflow-x-auto pb-1">
        {['overview', 'sales', 'training', 'finance', 'activity', 'ai_insights'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-extrabold uppercase tracking-wider rounded-t-xl transition-all ${
              activeTab === tab 
                ? 'bg-indigo-600 text-white shadow-lg glow-primary' 
                : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
            }`}
          >
            {tab.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="glass-panel rounded-2xl p-6 border border-gray-800 space-y-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="glass-card p-4 rounded-xl border border-gray-800">
                <span className="text-[10px] uppercase font-bold text-gray-400">Total Enrolled Students</span>
                <div className="text-2xl font-black text-white mt-1">{customer.studentCount}</div>
              </div>
              <div className="glass-card p-4 rounded-xl border border-gray-800">
                <span className="text-[10px] uppercase font-bold text-gray-400">Total Deal Revenue</span>
                <div className="text-2xl font-black text-emerald-400 mt-1">₹{(customer.expectedRevenue/100000).toFixed(2)}L</div>
              </div>
              <div className="glass-card p-4 rounded-xl border border-gray-800">
                <span className="text-[10px] uppercase font-bold text-gray-400">Lead Score</span>
                <div className="text-2xl font-black text-indigo-400 mt-1">{customer.leadScore}/100</div>
              </div>
              <div className="glass-card p-4 rounded-xl border border-gray-800">
                <span className="text-[10px] uppercase font-bold text-gray-400">Lead Stage</span>
                <div className="text-2xl font-black text-purple-400 mt-1">{customer.stage}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-4 rounded-xl border border-gray-800 space-y-3">
                <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider">Account Details</h3>
                <div className="space-y-2 text-xs text-gray-300">
                  <div>Contact Person: <strong className="text-white">{customer.contactPerson}</strong></div>
                  <div>Email: <strong className="text-white">{customer.email}</strong></div>
                  <div>Phone: <strong className="text-white">{customer.phone}</strong></div>
                  <div>Lead Source: <strong className="text-indigo-400">{customer.leadSource}</strong></div>
                  <div>Assigned Salesperson: <strong className="text-white">{customer.assignedTo}</strong></div>
                </div>
              </div>

              <div className="glass-card p-4 rounded-xl border border-gray-800 space-y-3">
                <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider">Active Course Program</h3>
                <div className="text-sm font-extrabold text-white">{customer.courseName}</div>
                <p className="text-xs text-gray-400">{customer.notes}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sales' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Sales Pipeline Timeline</h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 flex justify-between">
                <div><strong>Enquiry Created:</strong> Initial request for {customer.studentCount} students.</div>
                <span className="text-gray-400">{customer.createdDate}</span>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 flex justify-between">
                <div><strong>Quotation Sent:</strong> Proposed ₹{(customer.expectedRevenue/100000).toFixed(2)}L package.</div>
                <span className="text-gray-400">{customer.lastContactDate}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'finance' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Invoices & Payment Records</h3>
            {customerInvoices.map(inv => (
              <div key={inv.id} className="p-4 bg-gray-900 rounded-xl border border-gray-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">{inv.id} - {inv.courseName}</div>
                  <div className="text-[11px] text-gray-400">Total: ₹{inv.totalAmount.toLocaleString()} • Paid: ₹{inv.paidAmount.toLocaleString()}</div>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded border border-emerald-500/30">
                  {inv.status}
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'ai_insights' && (
          <div className="p-4 bg-gradient-to-r from-indigo-950/60 to-purple-950/60 rounded-xl border border-indigo-500/40 space-y-3">
            <div className="flex items-center space-x-2 text-indigo-300 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>AI Account Health Assessment</span>
            </div>
            <p className="text-xs text-white leading-relaxed">
              Account has high conversion likelihood (Score: {customer.leadScore}). Recommended Next Action: <strong>{customer.nextBestAction}</strong>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
