import React from 'react';
import { useSkillora } from '../../context/SkilloraContext';
import { 
  LayoutDashboard, Users, GraduationCap, DollarSign, BarChart3, 
  Settings, BookOpen, Calendar, Bot, Target, FileText, CheckSquare, 
  Sparkles, Award, ShieldAlert, PieChart, Layers, HelpCircle, LogOut 
} from 'lucide-react';

export const Sidebar = () => {
  const { theme, currentRole, activePage, navigateTo, changeRole } = useSkillora();

  // Navigation Items per Role
  const getNavItems = () => {
    switch (currentRole) {
      case 'SALES':
        return [
          { id: 'crm', label: 'Sales CRM & Kanban', icon: Target, badge: 'AI Leads' },
          { id: 'customer360', label: 'Customer 360', icon: Users },
          { id: 'analytics', label: 'Lead Source ROI', icon: BarChart3 },
          { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard }
        ];

      case 'OPERATIONS':
        return [
          { id: 'operations', label: 'Courses & Batches', icon: Layers, badge: 'Live' },
          { id: 'students', label: 'Student Intelligence', icon: GraduationCap },
          { id: 'dashboard', label: 'Management View', icon: LayoutDashboard }
        ];

      case 'TRAINER':
        return [
          { id: 'trainer_portal', label: 'Trainer Dashboard', icon: CheckSquare, badge: 'Today' },
          { id: 'students', label: 'Student Performance', icon: GraduationCap },
          { id: 'operations', label: 'My Batches & Schedule', icon: Calendar }
        ];

      case 'FINANCE':
        return [
          { id: 'finance', label: 'Finance & Payments', icon: DollarSign, badge: 'Profit' },
          { id: 'analytics', label: 'Business Analytics', icon: PieChart },
          { id: 'customer360', label: 'Customer Billing', icon: Users }
        ];

      case 'STUDENT':
        return [
          { id: 'student_portal', label: 'My Student Portal', icon: GraduationCap, badge: 'Active' },
          { id: 'student_curriculum', label: 'Course Curriculum', icon: BookOpen }
        ];

      case 'PARENT':
        return [
          { id: 'parent_portal', label: 'Parent Monitoring', icon: ShieldAlert, badge: 'Alerts' }
        ];

      case 'ADMIN':
        return [
          { id: 'admin', label: 'Admin & Multi-Tenant', icon: Settings, badge: 'System' },
          { id: 'dashboard', label: 'Management Dashboard', icon: LayoutDashboard },
          { id: 'students', label: 'Student Directory', icon: GraduationCap },
          { id: 'finance', label: 'Financial Audit', icon: DollarSign }
        ];

      case 'MANAGEMENT':
      default:
        return [
          { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
          { id: 'crm', label: 'Sales CRM & Pipeline', icon: Target, badge: '🔥 HOT' },
          { id: 'customer360', label: 'Customer 360', icon: Users },
          { id: 'operations', label: 'Batches & Operations', icon: Layers },
          { id: 'students', label: 'Student Intelligence', icon: GraduationCap, badge: 'Core' },
          { id: 'finance', label: 'Finance & Profitability', icon: DollarSign },
          { id: 'analytics', label: 'Business Analytics', icon: BarChart3 },
          { id: 'admin', label: 'Admin Portal', icon: Settings }
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <aside className={`w-64 border-r flex flex-col h-screen sticky top-0 z-40 select-none transition-colors ${
      theme === 'dark'
        ? 'glass-panel border-gray-800/80 bg-gray-950/80'
        : 'bg-white border-slate-200 shadow-sm text-slate-800'
    }`}>
      {/* Brand Logo & Tagline Header */}
      <div className={`p-4 border-b flex flex-col ${theme === 'dark' ? 'border-gray-800/80' : 'border-slate-200'}`}>
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className={`text-xl font-black tracking-wider ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent'
                : 'text-indigo-900'
            }`}>
              SKILLORA
            </h1>
            <p className={`text-[10px] font-medium tracking-tight ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
              Lead → Learning → Profit
            </p>
          </div>
        </div>
        <div className={`mt-3 border rounded-lg p-2 flex items-center justify-between ${
          theme === 'dark'
            ? 'bg-indigo-950/40 border-indigo-500/20'
            : 'bg-indigo-50 border-indigo-200'
        }`}>
          <span className={`text-[11px] font-medium ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'}`}>Active Role:</span>
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
            theme === 'dark'
              ? 'text-white bg-indigo-600/40 border-indigo-500/40'
              : 'text-indigo-900 bg-indigo-200/60 border-indigo-300'
          }`}>
            {currentRole}
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className={`px-3 pb-2 text-[10px] font-extrabold uppercase tracking-wider ${
          theme === 'dark' ? 'text-gray-500' : 'text-slate-400'
        }`}>
          Main Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 glow-primary'
                  : (theme === 'dark'
                      ? 'text-gray-400 hover:text-white hover:bg-gray-800/60'
                      : 'text-slate-600 hover:text-indigo-700 hover:bg-slate-100')
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                  isActive 
                    ? 'text-white' 
                    : (theme === 'dark' ? 'text-gray-400 group-hover:text-indigo-400' : 'text-slate-500 group-hover:text-indigo-600')
                }`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                  isActive 
                    ? 'bg-white/20 text-white' 
                    : (theme === 'dark' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-indigo-100 text-indigo-700 border border-indigo-200')
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Branding & Switch Portal Shortcut */}
      <div className={`p-3 border-t ${
        theme === 'dark' ? 'border-gray-800/80 bg-gray-950/60' : 'border-slate-200 bg-slate-50'
      }`}>
        <button
          onClick={() => navigateTo('login')}
          className={`w-full flex items-center justify-center space-x-2 text-xs font-medium py-2 rounded-lg border transition-colors ${
            theme === 'dark'
              ? 'bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white border-gray-800'
              : 'bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border-slate-300 shadow-xs'
          }`}
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Switch Portal Login</span>
        </button>
        <p className={`text-[9px] text-center mt-2 font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
          SKILLORA Hackathon Edition v2.5
        </p>
      </div>
    </aside>
  );
};
