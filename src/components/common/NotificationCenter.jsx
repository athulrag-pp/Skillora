import React, { useState, useEffect } from 'react';
import { useSkillora } from '../../context/SkilloraContext';
import { X, Bell, CheckCircle2, ArrowRight, AlertTriangle, Flame, DollarSign, Activity } from 'lucide-react';

export const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, markNotificationRead, navigateTo } = useSkillora();

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-notifications', handleOpen);
    return () => window.removeEventListener('open-notifications', handleOpen);
  }, []);

  if (!isOpen) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'hot_lead': return <Flame className="w-4 h-4 text-orange-400" />;
      case 'attendance_risk': return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'payment_risk': return <DollarSign className="w-4 h-4 text-rose-400" />;
      case 'conversion': return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      default: return <Activity className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-gray-950 border-l border-gray-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-250">
        {/* Drawer Header */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-indigo-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">AI Notification Center</h2>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.map((n) => (
            <div 
              key={n.id}
              className={`p-3.5 rounded-xl border transition-all ${
                n.read ? 'bg-gray-900/40 border-gray-800/60 opacity-75' : 'glass-card border-indigo-500/30'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-lg bg-gray-900 border border-gray-800">
                    {getIcon(n.type)}
                  </div>
                  <h4 className="text-xs font-bold text-white">{n.title}</h4>
                </div>
                <span className="text-[10px] text-gray-400">{n.time}</span>
              </div>

              <p className="mt-2 text-xs text-gray-300 leading-relaxed">{n.message}</p>

              <div className="mt-3 flex items-center justify-between pt-2 border-t border-gray-800/50">
                <button
                  onClick={() => {
                    markNotificationRead(n.id);
                    if (n.targetPage) navigateTo(n.targetPage);
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  <span>{n.actionText || 'View Details'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                {!n.read && (
                  <button 
                    onClick={() => markNotificationRead(n.id)}
                    className="text-[10px] text-gray-400 hover:text-gray-300"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
