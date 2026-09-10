import React, { useState } from 'react';
import { useSkillora } from '../../context/SkilloraContext';
import { Shield, X, Key, User, Lock, ArrowRight, CheckCircle2, UserPlus } from 'lucide-react';

export const RoleAuthModal = () => {
  const { 
    theme, 
    isRoleAuthModalOpen, 
    setIsRoleAuthModalOpen, 
    targetRoleToSwitch, 
    loginWithCredentials, 
    showToast,
    navigateTo 
  } = useSkillora();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('demo123');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isRoleAuthModalOpen || !targetRoleToSwitch) return null;

  const demoAccounts = {
    MANAGEMENT: { email: 'manager@skillora.demo', label: 'Management Portal' },
    SALES: { email: 'sales@skillora.demo', label: 'Sales / CRM Portal' },
    OPERATIONS: { email: 'ops@skillora.demo', label: 'Operations Portal' },
    TRAINER: { email: 'trainer@skillora.demo', label: 'Trainer Portal' },
    FINANCE: { email: 'finance@skillora.demo', label: 'Finance Portal' },
    STUDENT: { email: 'student@skillora.demo', label: 'Student Portal' },
    PARENT: { email: 'parent@skillora.demo', label: 'Parent Portal' },
    ADMIN: { email: 'admin@skillora.demo', label: 'Admin Portal' }
  };

  const targetAccount = demoAccounts[targetRoleToSwitch] || { email: `${targetRoleToSwitch.toLowerCase()}@skillora.demo`, label: `${targetRoleToSwitch} Portal` };

  const handleQuickFill = () => {
    setEmail(targetAccount.email);
    setPassword('demo123');
    setErrorMsg('');
  };

  const handleVerifyAndSwitch = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    const emailToUse = email || targetAccount.email;
    
    setLoading(true);
    try {
      await loginWithCredentials(emailToUse, password || 'demo123', targetRoleToSwitch);
      setIsRoleAuthModalOpen(false);
      showToast(`Authenticated & switched to ${targetRoleToSwitch} Portal!`, 'success');
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed. Invalid password or account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className={`w-full max-w-md border rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-200 ${
        theme === 'dark'
          ? 'glass-panel bg-gray-950 border-indigo-500/40'
          : 'bg-white border-slate-200 shadow-2xl text-slate-900'
      }`}>
        {/* Header */}
        <div className={`p-4 border-b flex items-center justify-between ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-indigo-950/90 to-purple-950/90 border-indigo-500/30 text-white'
            : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-200'
        }`}>
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-white/20 text-white">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white">Role Authentication Gate</h3>
              <p className="text-[11px] text-indigo-100 font-medium">Log in to unlock {targetRoleToSwitch} Portal</p>
            </div>
          </div>
          <button 
            onClick={() => setIsRoleAuthModalOpen(false)}
            className="p-1 rounded-lg hover:bg-white/20 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4">
          <div className={`p-3 rounded-xl border flex items-center justify-between ${
            theme === 'dark'
              ? 'bg-indigo-950/40 border-indigo-500/30 text-indigo-300'
              : 'bg-indigo-50 border-indigo-200 text-indigo-900'
          }`}>
            <div>
              <div className="text-[10px] uppercase font-bold text-indigo-400">Target Role</div>
              <div className="text-xs font-black">{targetAccount.label}</div>
            </div>
            <button
              type="button"
              onClick={handleQuickFill}
              className="text-[10px] font-bold bg-indigo-600 text-white px-2.5 py-1 rounded-lg shadow-xs hover:bg-indigo-500 transition-colors"
            >
              Fill Demo Login
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleVerifyAndSwitch} className="space-y-3">
            <div>
              <label className={`text-xs font-semibold block mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                User Email
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={targetAccount.email}
                  className={`w-full border rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-indigo-500 ${
                    theme === 'dark'
                      ? 'bg-gray-900 border-gray-800 text-white placeholder-gray-500'
                      : 'bg-slate-100 border-slate-300 text-slate-900 placeholder-slate-400 font-medium'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`text-xs font-semibold block mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className={`w-full border rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-indigo-500 ${
                    theme === 'dark'
                      ? 'bg-gray-900 border-gray-800 text-white placeholder-gray-500'
                      : 'bg-slate-100 border-slate-300 text-slate-900 placeholder-slate-400 font-medium'
                  }`}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-extrabold text-xs shadow-lg glow-primary transition-all flex items-center justify-center space-x-1.5"
            >
              {loading ? (
                <span>Verifying Credentials...</span>
              ) : (
                <>
                  <span>Authenticate & Unlock {targetRoleToSwitch}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 border-t border-gray-800/60 flex items-center justify-between text-[11px]">
            <span className={theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}>Don't have an account?</span>
            <button
              onClick={() => {
                setIsRoleAuthModalOpen(false);
                navigateTo('login');
              }}
              className="font-bold text-indigo-500 hover:underline flex items-center space-x-1"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Create New User</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
