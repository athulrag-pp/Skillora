import React from 'react';
import { useSkillora } from '../context/SkilloraContext';
import { Settings, Shield, Building2, Users, FileText, CheckCircle2 } from 'lucide-react';

export const AdminPage = () => {
  const auditLogs = [
    { time: "10 mins ago", action: "Lead Converted", user: "Vikram Mehta", details: "Converted ABC Institute into active customer (INV-1045 generated)." },
    { time: "25 mins ago", action: "Attendance Logged", user: "Arun Kumar", details: "Updated AIML-01 attendance session roster." },
    { time: "1 hour ago", action: "Payment Recorded", user: "Finance Admin", details: "Recorded ₹3,15,000 partial payment for INV-1045." },
    { time: "2 hours ago", action: "Expense Approved", user: "Management", details: "Approved ₹30,000 trainer travel expense." }
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
            <Settings className="w-6 h-6 text-red-400" />
            <span>Admin & Multi-Tenant Platform Settings</span>
          </h1>
          <p className="text-xs text-gray-400">
            Organization tenant isolation, user role RBAC permissions, and system audit logs.
          </p>
        </div>
      </div>

      {/* Audit Log (Requirement #48) */}
      <div className="glass-panel rounded-2xl p-5 border border-gray-800 space-y-4">
        <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">System Audit & Action Traceability Log</h2>
        <div className="space-y-2 text-xs">
          {auditLogs.map((log, idx) => (
            <div key={idx} className="p-3 bg-gray-900 rounded-xl border border-gray-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-indigo-400">{log.action}:</span> <span className="text-gray-200">{log.details}</span>
                <div className="text-[10px] text-gray-500">Performed by {log.user}</div>
              </div>
              <span className="text-[10px] text-gray-400">{log.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
