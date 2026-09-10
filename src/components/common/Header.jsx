import React from 'react';
import { useSkillora } from '../../context/SkilloraContext';
import { 
  Search, Bell, Sparkles, Building2, ChevronDown, User, Shield, 
  HelpCircle, LogOut, CheckCircle2, UserPlus, ShieldCheck, Zap, Sun, Moon 
} from 'lucide-react';

export const Header = () => {
  const { 
    theme,
    toggleTheme,
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
    <header className={`sticky top-0 z-30 h-16 border-b px-4 lg:px-6 flex items-center justify-between transition-colors ${
      theme === 'dark' 
        ? 'glass-panel border-gray-800/60 bg-gray-950/80' 
        : 'bg-white border-slate-200 shadow-sm text-slate-800'
    }`}>
      {/* Left: Global Search Trigger & Realtime Indicator */}
      <div className="flex items-center space-x-3">
        <div className={`hidden sm:flex items-center space-x-2 border rounded-lg px-3 py-1.5 text-xs transition-colors ${
          theme === 'dark'
            ? 'bg-gray-900/80 border-gray-800 text-gray-300'
            : 'bg-slate-100 border-slate-200 text-slate-800 shadow-xs'
        }`}>
          <Building2 className="w-4 h-4 text-indigo-500" />
          <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Apex EduTech Global</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded flex items-center space-x-1 font-extrabold border ${
            theme === 'dark'
              ? 'bg-emerald-950 text-emerald-400 border-emerald-500/30'
              : 'bg-emerald-100 text-emerald-700 border-emerald-300'
          }`}>
            <Zap className="w-3 h-3 animate-pulse" />
            <span>Realtime Live</span>
          </span>
        </div>

        {/* Global Search Button */}
        <button 
          onClick={() => setIsSearchOpen(true)}
          className={`flex items-center space-x-2 border rounded-lg px-3.5 py-1.5 text-xs transition-all w-36 sm:w-56 ${
            theme === 'dark'
              ? 'bg-gray-900/80 hover:bg-gray-800/90 text-gray-400 hover:text-gray-200 border-gray-800'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border-slate-200 shadow-xs'
          }`}
        >
          <Search className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`} />
          <span className="truncate">Search system...</span>
          <kbd className={`hidden md:inline-block ml-auto text-[10px] px-1.5 py-0.5 rounded border font-mono ${
            theme === 'dark'
              ? 'bg-gray-800 text-gray-400 border-gray-700'
              : 'bg-white text-slate-700 border-slate-300 shadow-xs'
          }`}>⌘K</kbd>
        </button>
      </div>

      {/* Right: Theme Switcher, Management Add Buttons, AI Copilot, Notifications & Role Switcher */}
      <div className="flex items-center space-x-2.5">
        {/* Light Mode / Dark Mode Theme Switcher */}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg border transition-all flex items-center space-x-1.5 ${
            theme === 'dark'
              ? 'bg-gray-900/80 hover:bg-gray-800 border-gray-800 text-yellow-400 hover:text-yellow-300'
              : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-indigo-600 hover:text-indigo-800 shadow-xs'
          }`}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400 animate-pulse" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-600" />
          )}
          <span className={`text-[11px] font-bold hidden xl:inline ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
            {theme === 'dark' ? 'Light' : 'Dark'}
          </span>
        </button>

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
          className={`relative p-2 rounded-lg border transition-colors ${
            theme === 'dark'
              ? 'bg-gray-900/80 hover:bg-gray-800 border-gray-800 text-gray-300 hover:text-white'
              : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700 hover:text-slate-900 shadow-xs'
          }`}
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

          <div className={`absolute right-0 mt-1 w-56 border rounded-xl shadow-2xl py-2 hidden group-hover:block z-50 ${
            theme === 'dark'
              ? 'glass-panel bg-gray-950/95 border-gray-800'
              : 'bg-white border-slate-200 shadow-xl'
          }`}>
            <div className={`px-3 py-1.5 border-b text-[11px] font-semibold uppercase tracking-wider ${
              theme === 'dark' ? 'border-gray-800 text-gray-400' : 'border-slate-100 text-slate-500'
            }`}>
              Switch User Role
            </div>
            {roleOptions.map((opt) => (
              <button
                key={opt.role}
                onClick={() => changeRole(opt.role)}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                  theme === 'dark'
                    ? (currentRole === opt.role ? 'text-indigo-400 font-semibold bg-gray-900/60' : 'text-gray-300 hover:bg-gray-800/80')
                    : (currentRole === opt.role ? 'text-indigo-600 font-semibold bg-indigo-50' : 'text-slate-700 hover:bg-slate-100')
                }`}
              >
                <span>{opt.label}</span>
                {currentRole === opt.role && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
