import React from 'react';
import { useSkillora } from '../context/SkilloraContext';
import { leadSourceROIData } from '../data/initialFinance';
import { BarChart3, TrendingUp, DollarSign, Target, PieChart } from 'lucide-react';

export const AnalyticsPage = () => {
  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-purple-400" />
            <span>Business Analytics & Lead Source ROI Engine</span>
          </h1>
          <p className="text-xs text-gray-400">
            Multi-dimensional profitability breakdown by lead channel, course revenue, and marketing return on investment.
          </p>
        </div>
      </div>

      {/* Lead Source ROI Table (Requirement #43) */}
      <div className="glass-panel rounded-2xl p-5 border border-gray-800 space-y-4">
        <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">Lead Source Marketing ROI Matrix</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-900 text-gray-400 uppercase text-[10px] font-extrabold border-b border-gray-800">
              <tr>
                <th className="p-3">Lead Channel</th>
                <th className="p-3">Total Leads</th>
                <th className="p-3">Conversions</th>
                <th className="p-3">Generated Revenue</th>
                <th className="p-3">Marketing Spend</th>
                <th className="p-3">Net Channel Profit</th>
                <th className="p-3">Marketing ROI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 font-medium">
              {leadSourceROIData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-800/40 transition-colors">
                  <td className="p-3 font-bold text-white flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    <span>{row.source}</span>
                  </td>
                  <td className="p-3 text-gray-300">{row.leads}</td>
                  <td className="p-3 text-emerald-400 font-bold">{row.conversions}</td>
                  <td className="p-3 font-bold text-white">₹{row.revenue.toLocaleString()}</td>
                  <td className="p-3 text-amber-400">₹{row.cost.toLocaleString()}</td>
                  <td className="p-3 font-bold text-emerald-400">₹{row.profit.toLocaleString()}</td>
                  <td className="p-3">
                    <span className="bg-indigo-500/20 text-indigo-300 px-2.5 py-0.5 rounded-full font-black text-[10px] border border-indigo-500/30">
                      {row.roi} ROI
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
