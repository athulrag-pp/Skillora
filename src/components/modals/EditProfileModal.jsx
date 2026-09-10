import React, { useState, useEffect } from 'react';
import { useSkillora } from '../../context/SkilloraContext';
import { X, User, Mail, Phone, Image, Check, Sparkles, Shield, Camera } from 'lucide-react';

export const EditProfileModal = ({ isOpen, onClose, studentProfile }) => {
  const { theme, currentUser, updateUserProfile } = useSkillora();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Preset avatar choices
  const avatarPresets = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
  ];

  useEffect(() => {
    if (studentProfile) {
      setName(studentProfile.name || currentUser?.name || '');
      setEmail(studentProfile.email || currentUser?.email || '');
      setAvatar(studentProfile.avatar || currentUser?.avatar || avatarPresets[0]);
      setParentName(studentProfile.parentName || '');
      setParentEmail(studentProfile.parentEmail || '');
      setParentPhone(studentProfile.parentPhone || '');
    } else if (currentUser) {
      setName(currentUser.name || '');
      setEmail(currentUser.email || '');
      setAvatar(currentUser.avatar || avatarPresets[0]);
    }
  }, [studentProfile, currentUser, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const updated = {
      id: studentProfile?.id || currentUser?.id,
      name,
      email,
      avatar,
      parentName,
      parentEmail,
      parentPhone
    };

    updateUserProfile(updated);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className={`w-full max-w-lg rounded-3xl border shadow-2xl overflow-hidden transition-all max-h-[90vh] flex flex-col ${
        theme === 'dark'
          ? 'glass-panel border-gray-800 bg-gray-950/95 text-white'
          : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
      }`}>
        {/* Modal Header */}
        <div className={`p-5 border-b flex items-center justify-between ${
          theme === 'dark' ? 'border-gray-800 bg-gray-900/60' : 'border-slate-100 bg-slate-50'
        }`}>
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black tracking-tight">Edit Profile & Account Details</h2>
              <p className={`text-[11px] ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                Update your personal information, avatar, and guardian contacts
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-xl border transition-colors ${
              theme === 'dark'
                ? 'bg-gray-900 hover:bg-gray-800 border-gray-800 text-gray-400 hover:text-white'
                : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-900'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Avatar Selector Section */}
          <div className="space-y-3">
            <label className={`text-xs font-extrabold uppercase tracking-wider block ${
              theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
            }`}>
              Profile Photo / Avatar
            </label>
            
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <img 
                  src={avatar || avatarPresets[0]} 
                  alt="Profile Preview" 
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500 shadow-lg"
                />
                <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <Camera className="w-5 h-5 text-white" />
                </div>
              </div>

              <div className="flex-1 space-y-2">
                <span className={`text-[11px] block font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                  Choose a preset or enter image URL:
                </span>
                <div className="flex items-center space-x-2">
                  {avatarPresets.map((presetUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setAvatar(presetUrl)}
                      className={`relative w-8 h-8 rounded-xl overflow-hidden border-2 transition-transform hover:scale-105 ${
                        avatar === presetUrl ? 'border-indigo-500 ring-2 ring-indigo-500/40' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={presetUrl} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" />
                      {avatar === presetUrl && (
                        <div className="absolute inset-0 bg-indigo-600/60 flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative">
              <Image className={`w-4 h-4 absolute left-3 top-3 ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`} />
              <input
                type="text"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder="Or paste custom image URL (https://...)"
                className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border transition-all ${
                  theme === 'dark'
                    ? 'bg-gray-900/90 border-gray-800 text-white focus:border-indigo-500'
                    : 'bg-white border-slate-300 text-slate-900 focus:border-indigo-500 shadow-xs'
                }`}
              />
            </div>
          </div>

          {/* Personal Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className={`text-xs font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                Full Name
              </label>
              <div className="relative">
                <User className={`w-4 h-4 absolute left-3 top-2.5 ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`} />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter full name"
                  className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border transition-all font-semibold ${
                    theme === 'dark'
                      ? 'bg-gray-900/90 border-gray-800 text-white focus:border-indigo-500'
                      : 'bg-white border-slate-300 text-slate-900 focus:border-indigo-500 shadow-xs'
                  }`}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className={`text-xs font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                Email Address
              </label>
              <div className="relative">
                <Mail className={`w-4 h-4 absolute left-3 top-2.5 ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border transition-all font-semibold ${
                    theme === 'dark'
                      ? 'bg-gray-900/90 border-gray-800 text-white focus:border-indigo-500'
                      : 'bg-white border-slate-300 text-slate-900 focus:border-indigo-500 shadow-xs'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Parent / Emergency Contact Details */}
          <div className={`p-4 rounded-2xl border space-y-3 ${
            theme === 'dark' ? 'bg-indigo-950/20 border-indigo-500/20' : 'bg-indigo-50/60 border-indigo-100'
          }`}>
            <div className="flex items-center space-x-2 text-xs font-extrabold text-indigo-400 uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5" />
              <span>Parent / Emergency Contact (Optional)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className={`text-[11px] font-bold ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                  Parent Name
                </label>
                <input
                  type="text"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="Guardian Name"
                  className={`w-full px-3 py-1.5 text-xs rounded-lg border transition-all ${
                    theme === 'dark'
                      ? 'bg-gray-900 border-gray-800 text-white'
                      : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className={`text-[11px] font-bold ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                  Parent Email
                </label>
                <input
                  type="email"
                  value={parentEmail}
                  onChange={(e) => setParentEmail(e.target.value)}
                  placeholder="parent@email.com"
                  className={`w-full px-3 py-1.5 text-xs rounded-lg border transition-all ${
                    theme === 'dark'
                      ? 'bg-gray-900 border-gray-800 text-white'
                      : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className={`text-[11px] font-bold ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                  Parent Phone
                </label>
                <input
                  type="text"
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  placeholder="+91 98000 00000"
                  className={`w-full px-3 py-1.5 text-xs rounded-lg border transition-all ${
                    theme === 'dark'
                      ? 'bg-gray-900 border-gray-800 text-white'
                      : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Modal Actions Footer */}
          <div className="pt-2 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 text-xs font-bold rounded-xl border transition-colors ${
                theme === 'dark'
                  ? 'bg-gray-900 hover:bg-gray-800 text-gray-300 border-gray-800'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
              }`}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-extrabold rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg flex items-center space-x-2 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
