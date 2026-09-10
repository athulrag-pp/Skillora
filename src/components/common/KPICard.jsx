import React from 'react';

export const KPICard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  trendType = 'up', // up, down, neutral
  color = 'indigo', 
  onClick 
}) => {
  const colorMap = {
    indigo: 'from-indigo-500/20 to-purple-500/10 border-indigo-500/30 text-indigo-400',
    emerald: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
    rose: 'from-rose-500/20 to-red-500/10 border-rose-500/30 text-rose-400',
    amber: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400',
    cyan: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400'
  };

  const currentStyle = colorMap[color] || colorMap.indigo;

  return (
    <div 
      onClick={onClick}
      className={`glass-card rounded-2xl p-4 border bg-gradient-to-br transition-all duration-300 ${onClick ? 'cursor-pointer hover:scale-[1.02]' : ''}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-400 tracking-wide uppercase">{title}</span>
        {Icon && (
          <div className={`p-2.5 rounded-xl border ${currentStyle}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-2 flex items-baseline justify-between">
        <h3 className="text-2xl font-black text-white tracking-tight">{value}</h3>
        {trend && (
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1 ${
            trendType === 'up' 
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
              : trendType === 'down'
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              : 'bg-gray-800 text-gray-400'
          }`}>
            <span>{trend}</span>
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1 text-[11px] text-gray-400 truncate">{subtitle}</p>
      )}
    </div>
  );
};
