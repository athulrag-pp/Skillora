import React, { useState } from 'react';
import { useSkillora } from '../context/SkilloraContext';
import { Bot, Sparkles, Shield, User, Key, ArrowRight, CheckCircle2, Building2, UserPlus, Lock, Mail, HelpCircle, ArrowLeft, Check, RefreshCw } from 'lucide-react';

export const LoginLanding = () => {
  const { loginWithCredentials, signupUser, forgotPassword, resetPassword, changeRole, navigateTo, showToast } = useSkillora();
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup' | 'forgot' | 'reset'
  
  // Login Form State
  const [selectedRole, setSelectedRole] = useState('MANAGEMENT');
  const [loginEmail, setLoginEmail] = useState('manager@skillora.demo');
  const [loginPassword, setLoginPassword] = useState('demo123');

  // Sign Up Form State
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupRole, setSignupRole] = useState('MANAGEMENT');
  const [signupOrg, setSignupOrg] = useState('Apex EduTech Global');

  // Forgot / Reset Password Form State
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetNotice, setResetNotice] = useState(null);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

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
    setLoginEmail(acc.email);
    setLoginPassword('demo123');
    setErrorMsg('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    try {
      await loginWithCredentials(loginEmail, loginPassword, selectedRole);
      changeRole(selectedRole, true);
      navigateTo('dashboard');
    } catch (err) {
      setErrorMsg(err.message || 'Login failed. Only registered emails are allowed.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!signupName.trim() || !signupEmail.trim() || !signupPassword.trim()) {
      setErrorMsg('All fields are required.');
      return;
    }

    setLoading(true);
    try {
      await signupUser({
        name: signupName,
        email: signupEmail,
        password: signupPassword,
        role: signupRole,
        organization: signupOrg
      });
      changeRole(signupRole, true);
      navigateTo('dashboard');
    } catch (err) {
      setErrorMsg(err.message || 'Sign up registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setResetNotice(null);

    if (!forgotEmail.trim()) {
      setErrorMsg('Please enter your registered email address.');
      return;
    }

    setLoading(true);
    try {
      const res = await forgotPassword(forgotEmail);
      setResetToken(res.resetToken || `rst_${Date.now()}`);
      setResetNotice(res);
      setSuccessMsg(`Reset link dispatched to ${forgotEmail}. Please check your inbox or click the link below to set a new password.`);
    } catch (err) {
      setErrorMsg(err.message || 'Account not found. Only registered emails can reset passwords.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!newPassword || newPassword.length < 4) {
      setErrorMsg('New password must be at least 4 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please enter matching passwords.');
      return;
    }

    setLoading(true);
    try {
      await resetPassword(forgotEmail, newPassword, resetToken);
      setLoginEmail(forgotEmail);
      setLoginPassword(newPassword);
      setAuthMode('login');
      showToast('Password updated successfully! Logged in with new password.', 'success');
    } catch (err) {
      setErrorMsg(err.message || 'Failed to update password.');
    } finally {
      setLoading(false);
    }
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
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto font-medium">
            Strict Multi-Tenant Role Portal Authentication. Registered email addresses required for access.
          </p>
        </div>

        {/* Tab Toggle: Sign In vs Sign Up */}
        <div className="flex justify-center">
          <div className="bg-gray-900 border border-gray-800 p-1.5 rounded-2xl flex items-center space-x-2">
            <button
              onClick={() => { setAuthMode('login'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${
                authMode === 'login'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg font-extrabold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign In to Account
            </button>
            <button
              onClick={() => { setAuthMode('signup'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${
                authMode === 'signup'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg font-extrabold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Register New User (Sign Up)
            </button>
          </div>
        </div>

        {/* Main Authentication Container */}
        <div className="glass-panel rounded-3xl p-6 border border-indigo-500/30 shadow-2xl">
          {/* 1. SIGN IN MODE */}
          {authMode === 'login' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Demo Account Selector */}
              <div className="lg:col-span-7 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span>Select Registered Demo Account</span>
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
                      <div className="text-[10px] text-gray-300 mt-1 opacity-90 font-mono">{acc.email}</div>
                      <div className="text-[9px] text-gray-400 mt-1 line-clamp-1">{acc.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Credentials Form */}
              <div className="lg:col-span-5 bg-gray-900/90 rounded-2xl p-5 border border-gray-800 flex flex-col justify-between">
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Selected Role View</span>
                    <div className="mt-1 text-xs font-extrabold text-indigo-300 bg-indigo-950/80 border border-indigo-500/30 px-3 py-1.5 rounded-xl flex items-center justify-between">
                      <span>{selectedRole} PORTAL</span>
                      <Shield className="w-3.5 h-3.5 text-indigo-400" />
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold leading-relaxed">
                      {errorMsg}
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-semibold text-gray-300 block mb-1">Registered Email Address</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                      <input
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="user@skillora.demo"
                        required
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-gray-300 block">Password</label>
                      <button
                        type="button"
                        onClick={() => { setAuthMode('forgot'); setErrorMsg(''); setForgotEmail(loginEmail); }}
                        className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 hover:underline"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <Key className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                      <input
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-medium"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-extrabold text-xs shadow-xl glow-primary transition-all flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <span>Verifying Registered Account...</span>
                    ) : (
                      <>
                        <span>Sign In to {selectedRole} Portal</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-4 pt-3 border-t border-gray-800 text-[10px] text-gray-400 text-center">
                  Only registered database emails are granted portal access.
                </div>
              </div>
            </div>
          )}

          {/* 2. SIGN UP REGISTRATION MODE */}
          {authMode === 'signup' && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <UserPlus className="w-5 h-5 text-purple-400" />
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
                  Register New Encrypted Account in Database
                </h3>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSignupSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-300 block mb-1">Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      required
                      className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-300 block mb-1">Registered Email Address *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                    <input
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="rahul@skillora.demo"
                      required
                      className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-300 block mb-1">Password *</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                    <input
                      type="password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-300 block mb-1">Organization / Institution</label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={signupOrg}
                      onChange={(e) => setSignupOrg(e.target.value)}
                      placeholder="Apex EduTech Global"
                      className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs font-medium text-gray-300 block mb-1">Assigned Portal Role *</label>
                  <select
                    value={signupRole}
                    onChange={(e) => setSignupRole(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-bold"
                  >
                    <option value="MANAGEMENT">Management Portal (Executive KPIs & AI Copilot)</option>
                    <option value="SALES">Sales / CRM Portal (Kanban Pipeline & Lead Score)</option>
                    <option value="OPERATIONS">Operations Portal (Courses, Batches & Trainer Matcher)</option>
                    <option value="TRAINER">Trainer Portal (Attendance Logger & Schedules)</option>
                    <option value="FINANCE">Finance Portal (Invoices & Profit Engine)</option>
                    <option value="STUDENT">Student Portal (Individual Student Dashboard & Curriculum)</option>
                    <option value="PARENT">Parent Portal (Child Monitoring & Risk Alerts)</option>
                    <option value="ADMIN">Admin Portal (System Audit Logs & Multi-Tenant)</option>
                  </select>
                </div>

                <div className="md:col-span-2 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-xl glow-primary transition-all flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <span>Saving to Database & Encrypting...</span>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        <span>Create Account & Register in Database</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 3. FORGOT PASSWORD MODE */}
          {authMode === 'forgot' && (
            <div className="max-w-md mx-auto space-y-5">
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => { setAuthMode('login'); setErrorMsg(''); setSuccessMsg(''); }}
                  className="p-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-800"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <h3 className="text-base font-extrabold text-white">Forgot Password & Request Reset Link</h3>
                  <p className="text-xs text-gray-400">Verification for registered accounts only</p>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold leading-relaxed">
                  {errorMsg}
                </div>
              )}

              {successMsg && (
                <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs space-y-3">
                  <div className="flex items-center space-x-2 font-bold text-white">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Reset Link Dispatched!</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-emerald-300">
                    A secure password reset link has been dispatched to <strong>{forgotEmail}</strong>.
                  </p>

                  <button
                    type="button"
                    onClick={() => { setAuthMode('reset'); setErrorMsg(''); }}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg flex items-center justify-center space-x-2 transition-all"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Open Reset Password Screen & Set New Password</span>
                  </button>
                </div>
              )}

              {!successMsg && (
                <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1">
                      Enter Your Registered Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                      <input
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="e.g. manager@skillora.demo"
                        required
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold"
                      />
                    </div>
                    <span className="text-[11px] text-gray-500 mt-1.5 block">
                      Note: The reset link will only be generated for emails registered in the database.
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs shadow-xl glow-primary transition-all flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <span>Verifying Database Email...</span>
                    ) : (
                      <>
                        <Mail className="w-4 h-4" />
                        <span>Send Password Reset Link to Email</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* 4. RESET PASSWORD MODE */}
          {authMode === 'reset' && (
            <div className="max-w-md mx-auto space-y-5">
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setAuthMode('forgot')}
                  className="p-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-800"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <h3 className="text-base font-extrabold text-white">Reset & Set New Password</h3>
                  <p className="text-xs text-indigo-300 font-mono">Account: {forgotEmail}</p>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">New Encrypted Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">Confirm New Password</label>
                  <div className="relative">
                    <Check className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-xl glow-emerald transition-all flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <span>Encrypting & Updating Password...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                      <span>Save New Password & Log In</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
