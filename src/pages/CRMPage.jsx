import React, { useState } from 'react';
import { useSkillora } from '../context/SkilloraContext';
import { 
  Target, Flame, AlertCircle, Phone, MessageSquare, Mail, 
  Calendar, CheckCircle2, Sparkles, ArrowRight, UserCheck, Plus 
} from 'lucide-react';

export const CRMPage = () => {
  const { leads, convertLeadToCustomer, setSelectedCustomerId, navigateTo, showToast } = useSkillora();

  const stages = ["Enquiry", "Contacted", "Meeting", "Quotation", "Negotiation", "Won"];

  // Stalled leads for AI Rescue (daysInactive >= 7 and not Won)
  const stalledLeads = leads.filter(l => l.daysInactive >= 7 && l.stage !== 'Won');

  const handleRescueAction = (leadName, actionType) => {
    showToast(`AI Lead Rescue: ${actionType} initiated for ${leadName}!`, 'success');
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
            <Target className="w-6 h-6 text-emerald-400" />
            <span>AI Smart Sales Engine & CRM Kanban</span>
          </h1>
          <p className="text-xs text-gray-400">
            AI-driven lead scoring (0-100), probability predictions, and automated Stalled Lead Rescue.
          </p>
        </div>
      </div>

      {/* AI Lead Rescue Banner (Requirement #10) */}
      {stalledLeads.length > 0 && (
        <div className="glass-panel p-4 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-950/40 via-purple-950/30 to-slate-950/40 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <AlertCircle className="w-4 h-4 animate-bounce" />
              </div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                AI Lead Rescue Warning ({stalledLeads.length} Stalled Deals)
              </h3>
            </div>
            <span className="text-[10px] text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">
              No response &gt;7 days
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {stalledLeads.slice(0, 2).map((lead) => (
              <div key={lead.id} className="glass-card p-3 rounded-xl border border-amber-500/30 flex flex-col justify-between space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">{lead.name}</h4>
                    <p className="text-[11px] text-gray-400">{lead.courseName} • Inactive for {lead.daysInactive} days</p>
                  </div>
                  <span className="text-[10px] font-bold text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded">
                    Prob: {lead.purchaseProbability}%
                  </span>
                </div>

                <div className="text-[11px] text-amber-200 bg-amber-950/40 p-2 rounded border border-amber-500/20">
                  🤖 <strong>AI Recommendation:</strong> {lead.nextBestAction}
                </div>

                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <button 
                    onClick={() => handleRescueAction(lead.name, 'Call Lead')}
                    className="flex items-center space-x-1 text-[10px] font-bold bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 px-2 py-1 rounded border border-emerald-500/40"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call Lead</span>
                  </button>

                  <button 
                    onClick={() => handleRescueAction(lead.name, 'WhatsApp Re-engagement')}
                    className="flex items-center space-x-1 text-[10px] font-bold bg-green-600/30 hover:bg-green-600/50 text-green-300 px-2 py-1 rounded border border-green-500/40"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>WhatsApp</span>
                  </button>

                  <button 
                    onClick={() => handleRescueAction(lead.name, 'Send Offer Email')}
                    className="flex items-center space-x-1 text-[10px] font-bold bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 px-2 py-1 rounded border border-indigo-500/40"
                  >
                    <Mail className="w-3 h-3" />
                    <span>Email</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CRM Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3.5 overflow-x-auto pb-4">
        {stages.map((stageName) => {
          const stageLeads = leads.filter(l => l.stage === stageName);
          return (
            <div key={stageName} className="glass-panel rounded-2xl p-3 border border-gray-800 flex flex-col min-w-[240px]">
              {/* Stage Header */}
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-gray-800">
                <span className="text-xs font-bold text-gray-200 uppercase tracking-wider">{stageName}</span>
                <span className="text-[10px] font-extrabold text-indigo-400 bg-gray-900 px-2 py-0.5 rounded-full border border-gray-800">
                  {stageLeads.length}
                </span>
              </div>

              {/* Cards List */}
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px] pr-1">
                {stageLeads.map((lead) => (
                  <div 
                    key={lead.id}
                    className="glass-card rounded-xl p-3.5 border border-gray-800 hover:border-indigo-500/50 transition-all space-y-2.5 shadow-lg group"
                  >
                    <div className="flex items-start justify-between">
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-md ${
                        lead.status === 'HOT' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                        lead.status === 'WARM' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                        'bg-gray-800 text-gray-400'
                      }`}>
                        {lead.status === 'HOT' ? '🔥 HOT' : lead.status} ({lead.leadScore}/100)
                      </span>
                      <span className="text-[10px] font-extrabold text-emerald-400">
                        ₹{(lead.expectedRevenue/100000).toFixed(1)}L
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {lead.name}
                      </h4>
                      <p className="text-[11px] text-gray-400 line-clamp-1">{lead.courseName}</p>
                    </div>

                    <div className="text-[10px] text-gray-400 flex items-center justify-between pt-1 border-t border-gray-800/60">
                      <span>{lead.studentCount} Students</span>
                      <span>Rep: {lead.assignedTo.split(' ')[0]}</span>
                    </div>

                    {/* Action Button: Convert or Details */}
                    <div className="pt-2 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setSelectedCustomerId(lead.id);
                          navigateTo('customer360');
                        }}
                        className="text-[10px] font-bold text-gray-400 hover:text-white"
                      >
                        360 View
                      </button>

                      {lead.stage !== 'Won' ? (
                        <button
                          onClick={() => convertLeadToCustomer(lead.id)}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] px-2.5 py-1 rounded-lg transition-all flex items-center space-x-1 shadow-md"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Convert</span>
                        </button>
                      ) : (
                        <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                          Won & Invoiced
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                {stageLeads.length === 0 && (
                  <div className="text-center py-6 text-[11px] text-gray-600 italic border border-dashed border-gray-800/80 rounded-xl">
                    No leads in {stageName}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
