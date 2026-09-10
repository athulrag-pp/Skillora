import React from 'react';
import { useSkillora } from '../../context/SkilloraContext';
import { 
  Search, Bell, Sparkles, Building2, ChevronDown, User, Shield, 
  HelpCircle, LogOut, CheckCircle2, UserPlus, ShieldCheck, Zap 
} from 'lucide-react';

export const Header = () => {
  const { 
    currentRole, 
    changeRole, 
    setIsSearchOpen, 
    notifications, 
    setIsCopilotOpen,
    setIsAddStudentOpen,
    setIsAddTrainerOpen,
    isRealtimeActive,
    navigateTo 
  } = useSkillora();

  const unreadCount = notifications.filter(n => !n.read).length;

  const roleOptions = [
    { role: 'MANAGEMENT', label: 'Management Portal', badge: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' },
    { role: 'SALES', label: 'Sales / CRM Portal', badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    { role: 'OPERATIONS', label: 'Operations Portal', badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    { role: 'TRAINER', label: 'Trainer Portal', badge: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
    { role: 'FINANCE', label: 'Finance Portal', badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
    { role: 'STUDENT', label: 'Student Portal', badge: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' },
    { role: 'PARENT', label: 'Parent Portal', badge: 'bg-pink-500/20 text-pink-400 border-pink-500/30' },
    { role: 'ADMIN', label: 'Admin Portal', badge: 'bg-red-500/20 text-red-400 border-red-500/30' }
  ];

  const currentOption = roleOptions.find(r => r.role === currentRole) || roleOptions[0];

  return (
    <header className="sticky top-0 z-30 h-16 glass-panel border-b border-gray-800/60 px-4 lg:px-6 flex items-center justify-between">
      {/* Left: Global Search Trigger & Realtime Indicator */}
      <div className="flex items-center space-x-3">
        <div className="hidden sm:flex items-center space-x-2 bg-gray-900/80 border border-gray-800 rounded-lg px-3 py-1.5 text-xs text-gray-300">
          <Building2 className="w-4 h-4 text-indigo-400" />
          <span className="font-semibold text-white">Apex EduTech Global</span>
          <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded flex items-center space-x-1 font-extrabold">
            <Zap className="w-3 h-3 animate-pulse" />
            <span>Realtime Live</span>
          </span>
        </div>

        {/* Global Search Button */}
        <button 
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center space-x-2 bg-gray-900/80 hover:bg-gray-800/90 text-gray-400 hover:text-gray-200 border border-gray-800 rounded-lg px-3.5 py-1.5 text-xs transition-all w-36 sm:w-56"
        >
          <Search className="w-4 h-4 text-gray-400" />
          <span className="truncate">Search system...</span>
          <kbd className="hidden md:inline-block ml-auto text-[10px] bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded border border-gray-700">⌘K</kbd>
        </button>
      </div>

      {/* Right: Management Add Buttons, AI Copilot, Notifications & Role Switcher */}
      <div className="flex items-center space-x-2.5">
        {/* Management CRUD Buttons */}
        {(currentRole === 'MANAGEMENT' || currentRole === 'ADMIN') && (
          <div className="hidden lg:flex items-center space-x-2">
            <button
              onClick={() => setIsAddStudentOpen(true)}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-md transition-all"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Add Student</span>
            </button>

            <button
              onClick={() => setIsAddTrainerOpen(true)}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-md transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Add Teacher</span>
            </button>
          </div>
        )}

        {/* AI Copilot Button */}
        <button
          onClick={() => setIsCopilotOpen(true)}
          className="flex items-center space-x-1.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-medium text-xs px-3 py-1.5 rounded-lg shadow-lg glow-primary transition-all animate-pulse-slow"
        >
          <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin-slow" />
          <span className="hidden sm:inline">AI Copilot</span>
        </button>

        {/* Notification Bell */}
        <button
          onClick={() => {
            const event = new CustomEvent('open-notifications');
            window.dispatchEvent(event);
          }}
          className="relative p-2 rounded-lg bg-gray-900/80 hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white transition-colors"
          title="Notification Center"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center animate-bounce">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Quick Role Switcher Dropdown */}
        <div className="relative group">
          <button className={`flex items-center space-x-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-all ${currentOption.badge}`}>
            <Shield className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{currentOption.label}</span>
            <ChevronDown className="w-3 h-3 ml-0.5 opacity-70 group-hover:rotate-180 transition-transform" />
          </button>

          <div className="absolute right-0 mt-1 w-56 glass-panel bg-gray-950/95 border border-gray-800 rounded-xl shadow-2xl py-2 hidden group-hover:block z-50">
            <div className="px-3 py-1.5 border-b border-gray-800 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              Switch User Role
            </div>
            {roleOptions.map((opt) => (
              <button
                key={opt.role}
                onClick={() => changeRole(opt.role)}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-gray-800/80 transition-colors ${currentRole === opt.role ? 'text-indigo-400 font-semibold bg-gray-900/60' : 'text-gray-300'}`}
              >
                <span>{opt.label}</span>
                {currentRole === opt.role && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
