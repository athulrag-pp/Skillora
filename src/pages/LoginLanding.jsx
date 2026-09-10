import React, { useState } from 'react';
import { useSkillora } from '../context/SkilloraContext';
import { Bot, Sparkles, Shield, User, Key, ArrowRight, CheckCircle2, Building2 } from 'lucide-react';

export const LoginLanding = () => {
  const { changeRole, navigateTo } = useSkillora();
  const [selectedRole, setSelectedRole] = useState('MANAGEMENT');
  const [email, setEmail] = useState('manager@skillora.demo');
  const [password, setPassword] = useState('••••••••••••');

  const demoAccounts = [
    { role: 'MANAGEMENT', email: 'manager@skillora.demo', label: 'Management Portal', desc: 'Executive KPIs, Profitability & AI Copilot' },
    { role: 'SALES', email: 'sales@skillora.demo', label: 'Sales / CRM Portal', desc: 'Kanban Pipeline, AI Lead Score & Rescue' },
    { role: 'OPERATIONS', email: 'ops@skillora.demo', label: 'Operations Portal', desc: 'Courses, Batches & AI Trainer Matcher' },
    { role: 'TRAINER', email: 'trainer@skillora.demo', label: 'Trainer Portal', desc: 'Attendance Logger, Marks & Class Schedule' },
    { role: 'FINANCE', email: 'finance@skillora.demo', label: 'Finance Portal', desc: 'Invoices, Payment Risk & Profit Engine' },
    { role: 'STUDENT', email: 'student@skillora.demo', label: 'Student Portal', desc: 'My Grades, Attendance & AI Learning Tips' },
    { role: 'PARENT', email: 'parent@skillora.demo', label: 'Parent Portal', desc: 'Child Monitoring & Risk Notifications' },
    { role: 'ADMIN', email: 'admin@skillora.demo', label: 'Admin Portal', desc: 'Multi-Tenant Orgs, Users & Audit Logs' }
  ];

  const handleSelectDemo = (acc) => {
    setSelectedRole(acc.role);
    setEmail(acc.email);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    changeRole(selectedRole);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-4xl z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-3 bg-indigo-950/80 border border-indigo-500/30 px-4 py-2 rounded-2xl shadow-xl">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center shadow-lg">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent tracking-wider">
              SKILLORA
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            "From Lead to Learning to Profit."
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
            AI-Powered EduTech CRM & Training Business Management Platform. Select a demo portal role below for an instant walkthrough.
          </p>
        </div>

        {/* Login Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 glass-panel rounded-3xl p-6 border border-indigo-500/30 shadow-2xl">
          {/* Left Column: Quick Demo Roles Selector */}
          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>Select Demo Portal Account</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {demoAccounts.map((acc) => (
                <button
                  key={acc.role}
                  type="button"
                  onClick={() => handleSelectDemo(acc)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    selectedRole === acc.role
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 border-indigo-400 text-white shadow-lg glow-primary scale-[1.02]'
                      : 'bg-gray-900/80 border-gray-800 hover:border-gray-700 text-gray-300 hover:bg-gray-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold">{acc.label}</span>
                    {selectedRole === acc.role && <CheckCircle2 className="w-4 h-4 text-yellow-300" />}
                  </div>
                  <div className="text-[10px] text-gray-300 mt-1 opacity-90">{acc.email}</div>
                  <div className="text-[9px] text-gray-400 mt-1 line-clamp-1">{acc.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Credentials Form */}
          <div className="lg:col-span-5 bg-gray-900/90 rounded-2xl p-5 border border-gray-800 flex flex-col justify-between">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Active Role Target</span>
                <div className="mt-1 text-sm font-extrabold text-indigo-400 bg-indigo-950/60 border border-indigo-500/30 px-3 py-1.5 rounded-xl">
                  {selectedRole} PORTAL
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-400 block mb-1">Email / User ID</label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-400 block mb-1">Password</label>
                <div className="relative">
                  <Key className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-400">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-gray-800 text-indigo-600 focus:ring-0" />
                  <span>Remember me</span>
                </label>
                <span className="text-indigo-400 hover:underline cursor-pointer">Forgot password?</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-extrabold text-xs shadow-xl glow-primary transition-all flex items-center justify-center space-x-2"
              >
                <span>Enter {selectedRole} Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-4 pt-3 border-t border-gray-800 text-[10px] text-gray-400 text-center">
              SKILLORA Platform • Enterprise EduTech Multi-Tenant Architecture
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
