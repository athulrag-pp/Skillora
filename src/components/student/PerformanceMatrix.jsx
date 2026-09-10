import React from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, Cell, ReferenceLine } from 'recharts';
import { useSkillora } from '../../context/SkilloraContext';

export const PerformanceMatrix = ({ onSelectStudent }) => {
  const { students } = useSkillora();

  // Custom tooltip for scatter plot items
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass-panel p-3 rounded-xl border border-indigo-500/40 shadow-2xl text-xs space-y-1 z-50">
          <div className="font-bold text-white flex items-center space-x-1.5">
            <span>{data.name}</span>
            <span className="text-[10px] text-gray-400">({data.id})</span>
          </div>
          <div className="text-gray-300">Academic: <strong className="text-indigo-400">{data.academic}%</strong> (Grade {data.grade})</div>
          <div className="text-gray-300">Attendance: <strong className={data.attendance < 75 ? "text-amber-400 font-bold" : "text-emerald-400"}>{data.attendance}%</strong> ({data.attendanceStatus})</div>
          <div className="text-gray-300">Overall Score: <strong className="text-purple-400">{data.overallScore}%</strong></div>
          <div className="text-[11px] font-bold mt-1 text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-500/30">
            Risk Level: {data.riskLevel}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card rounded-2xl p-5 border border-indigo-500/30">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
        <div>
          <h3 className="text-base font-extrabold text-white">Academic vs Attendance 4-Quadrant Scatter Matrix</h3>
          <p className="text-xs text-gray-400">Evaluates Academic Mastery (Y-axis) separately from Attendance Compliance (X-axis).</p>
        </div>
        <div className="flex items-center space-x-3 text-[11px]">
          <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span><span className="text-gray-300">Top Performer</span></span>
          <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span><span className="text-gray-300">Attendance Risk</span></span>
          <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span><span className="text-gray-300">Academic Intervention</span></span>
          <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span><span className="text-gray-300">Critical Risk</span></span>
        </div>
      </div>

      <div className="h-72 w-full relative">
        {/* Quadrant Overlay Labels */}
        <div className="absolute top-2 left-12 text-[10px] font-bold text-blue-400 bg-blue-950/60 px-2 py-1 rounded border border-blue-500/30 pointer-events-none z-10">
          Academic Intervention Needed (Low Acad / High Att)
        </div>
        <div className="absolute top-2 right-4 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded border border-emerald-500/30 pointer-events-none z-10">
          High Performers (High Acad / High Att)
        </div>
        <div className="absolute bottom-10 left-12 text-[10px] font-bold text-rose-400 bg-rose-950/60 px-2 py-1 rounded border border-rose-500/30 pointer-events-none z-10">
          Critical Risk (Low Acad / Low Att)
        </div>
        <div className="absolute bottom-10 right-4 text-[10px] font-bold text-amber-400 bg-amber-950/60 px-2 py-1 rounded border border-amber-500/30 pointer-events-none z-10">
          Attendance Risk (High Acad / Low Att)
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
            <XAxis 
              type="number" 
              dataKey="attendance" 
              name="Attendance" 
              unit="%" 
              domain={[40, 100]}
              stroke="#6b7280"
              fontSize={11}
            />
            <YAxis 
              type="number" 
              dataKey="academic" 
              name="Academic" 
              unit="%" 
              domain={[40, 100]}
              stroke="#6b7280"
              fontSize={11}
            />
            <Tooltip content={<CustomTooltip />} />
            {/* Reference Threshold Lines */}
            <ReferenceLine x={75} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: '75% Att Risk', fill: '#f59e0b', fontSize: 10, position: 'insideTopLeft' }} />
            <ReferenceLine y={65} stroke="#6366f1" strokeDasharray="4 4" label={{ value: '65% Pass Grade', fill: '#6366f1', fontSize: 10, position: 'insideBottomRight' }} />
            <Scatter 
              data={students} 
              onClick={(entry) => onSelectStudent && onSelectStudent(entry.id)}
              className="cursor-pointer"
            >
              {students.map((student, index) => {
                let color = "#10b981"; // Emerald default
                if (student.academic >= 65 && student.attendance < 75) color = "#f59e0b"; // Amber: High Acad / Low Att
                else if (student.academic < 65 && student.attendance >= 75) color = "#3b82f6"; // Blue: Low Acad / High Att
                else if (student.academic < 65 && student.attendance < 75) color = "#f43f5e"; // Rose: Critical Risk

                return <Cell key={`cell-${index}`} fill={color} r={6} stroke="#ffffff" strokeWidth={1} />;
              })}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
