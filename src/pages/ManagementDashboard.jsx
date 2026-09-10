import React from 'react';
import { useSkillora } from '../context/SkilloraContext';
import { KPICard } from '../components/common/KPICard';
import { AIActionCenter } from '../components/ai/AIActionCenter';
import { PerformanceMatrix } from '../components/student/PerformanceMatrix';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, 
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area 
} from 'recharts';
import { 
  Target, Award, GraduationCap, Users, Layers, DollarSign, 
  Wallet, AlertTriangle, TrendingUp, Sparkles, ArrowRight, PieChart as PieIcon 
} from 'lucide-react';

export const ManagementDashboard = () => {
  const { financeSummary, leads, students, batches, trainers, navigateTo, setSelectedStudentId } = useSkillora();

  // Recharts Data Sets
  const salesFunnelData = [
    { stage: "Enquiry", count: 248 },
    { stage: "Contacted", count: 180 },
    { stage: "Meeting", count: 135 },
    { stage: "Quotation", count: 102 },
    { stage: "Negotiation", count: 85 },
    { stage: "Won (Converted)", count: 76 }
  ];

  const monthlyRevExpData = [
    { month: "May", revenue: 5.2, expenses: 2.1, profit: 3.1 },
    { month: "Jun", revenue: 6.4, expenses: 2.4, profit: 4.0 },
    { month: "Jul", revenue: 7.5, expenses: 2.8, profit: 4.7 },
    { month: "Aug", revenue: 8.4, expenses: 3.2, profit: 5.2 },
    { month: "Sep (Current)", revenue: 8.4, expenses: 3.2, profit: 5.2 }
  ];

  const courseRevData = [
    { name: "AI & ML", revenue: 2.6, profit: 1.75 },
    { name: "Full Stack MERN", revenue: 2.4, profit: 1.50 },
    { name: "Cybersecurity", revenue: 1.8, profit: 1.05 },
    { name: "Cloud DevOps", revenue: 1.6, profit: 0.90 }
  ];

  const gradeDistData = [
    { name: "Grade A (85-100)", count: students.filter(s => s.grade === 'A').length, color: "#10b981" },
    { name: "Grade B (75-84)", count: students.filter(s => s.grade === 'B').length, color: "#3b82f6" },
    { name: "Grade C (65-74)", count: students.filter(s => s.grade === 'C').length, color: "#8b5cf6" },
    { name: "Grade D/F (0-64)", count: students.filter(s => s.grade === 'D/F').length, color: "#f43f5e" }
  ];

  const attendanceDistData = [
    { name: "Excellent (90%+)", count: students.filter(s => s.attendance >= 90).length, color: "#10b981" },
    { name: "Good (80-89%)", count: students.filter(s => s.attendance >= 80 && s.attendance < 90).length, color: "#3b82f6" },
    { name: "Average (75-79%)", count: students.filter(s => s.attendance >= 75 && s.attendance < 80).length, color: "#8b5cf6" },
    { name: "Att. Risk (<75%)", count: students.filter(s => s.attendance < 75).length, color: "#f59e0b" }
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Executive Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
            <span>Executive Management Command Center</span>
            <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30 font-bold uppercase">Live Sync</span>
          </h1>
          <p className="text-xs text-gray-400">
            Real-time business telemetry across Sales, Training, Students, Finance, and AI Signals.
          </p>
        </div>
        <button
          onClick={() => navigateTo('analytics')}
          className="flex items-center space-x-2 bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 font-bold text-xs px-3.5 py-2 rounded-xl border border-indigo-500/40 transition-all w-fit"
        >
          <PieIcon className="w-4 h-4" />
          <span>Detailed Business Analytics</span>
        </button>
      </div>

      {/* 10 Executive KPI Cards Grid (Requirement #7) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <KPICard title="Total Leads" value="248" subtitle="Active Pipeline" icon={Target} trend="+18%" color="indigo" onClick={() => navigateTo('crm')} />
        <KPICard title="Conversions" value="76" subtitle="30.6% Win Rate" icon={Award} trend="+12%" color="emerald" onClick={() => navigateTo('crm')} />
        <KPICard title="Active Students" value={students.length.toString()} subtitle="Enrolled Roster" icon={GraduationCap} trend="+24" color="cyan" onClick={() => navigateTo('students')} />
        <KPICard title="Active Trainers" value={trainers.length.toString()} subtitle="Certified Staff" icon={Users} trend="4.8 Avg Rating" color="indigo" onClick={() => navigateTo('operations')} />
        <KPICard title="Active Batches" value={batches.length.toString()} subtitle="Running Schedules" icon={Layers} trend="82 Avg Health" color="emerald" onClick={() => navigateTo('operations')} />
        <KPICard title="Revenue" value={`₹${(financeSummary.totalRevenue/100000).toFixed(1)}L`} subtitle="Billed Operations" icon={DollarSign} trend="+22%" color="emerald" onClick={() => navigateTo('finance')} />
        <KPICard title="Collected Amount" value={`₹${(financeSummary.collectedAmount/100000).toFixed(1)}L`} subtitle="Cash Received" icon={Wallet} trend="79.7%" color="emerald" onClick={() => navigateTo('finance')} />
        <KPICard title="Outstanding" value={`₹${(financeSummary.outstandingAmount/100000).toFixed(1)}L`} subtitle="Pending Payments" icon={AlertTriangle} trend="High Risk" trendType="down" color="rose" onClick={() => navigateTo('finance')} />
        <KPICard title="Total Expenses" value={`₹${(financeSummary.totalExpenses/100000).toFixed(1)}L`} subtitle="Operational Costs" icon={DollarSign} trend="Within Budget" color="amber" onClick={() => navigateTo('finance')} />
        <KPICard title="Net Profit" value={`₹${(financeSummary.netProfit/100000).toFixed(1)}L`} subtitle={`${financeSummary.profitMarginPct}% Profit Margin`} icon={TrendingUp} trend="+34%" color="emerald" onClick={() => navigateTo('finance')} />
      </div>

      {/* Prominent AI Action Center */}
      <AIActionCenter />

      {/* Recharts Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sales Conversion Funnel */}
        <div className="lg:col-span-6 glass-card rounded-2xl p-5 border border-gray-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-white">Lead Conversion Sales Funnel</h3>
            <span className="text-[10px] text-gray-400">248 Enquiries → 76 Converted</span>
          </div>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesFunnelData} layout="vertical" margin={{ top: 10, right: 20, left: 30, bottom: 10 }}>
                <XAxis type="number" stroke="#6b7280" fontSize={11} />
                <YAxis type="category" dataKey="stage" stroke="#9ca3af" fontSize={11} width={100} />
                <Tooltip contentStyle={{ backgroundColor: '#090d16', borderColor: '#374151', borderRadius: '12px', fontSize: '12px' }} />
                <Bar dataKey="count" fill="#6366f1" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Revenue vs Expenses Trend */}
        <div className="lg:col-span-6 glass-card rounded-2xl p-5 border border-gray-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-white">Monthly Revenue vs Expenses (₹ Lakhs)</h3>
            <span className="text-[10px] text-emerald-400 font-bold">Net Profit Margin: 61.9%</span>
          </div>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevExpData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                <XAxis dataKey="month" stroke="#6b7280" fontSize={11} />
                <YAxis stroke="#6b7280" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#090d16', borderColor: '#374151', borderRadius: '12px', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" fill="#10b981" fillOpacity={0.2} name="Revenue (₹L)" />
                <Area type="monotone" dataKey="expenses" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.15} name="Expenses (₹L)" />
                <Line type="monotone" dataKey="profit" stroke="#6366f1" strokeWidth={2} name="Net Profit (₹L)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Academic Grade Distribution Pie */}
        <div className="lg:col-span-6 glass-card rounded-2xl p-5 border border-gray-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-white">Student Academic Grade Distribution</h3>
            <span className="text-[10px] text-gray-400">{students.length} Students Total</span>
          </div>
          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={gradeDistData} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`}>
                  {gradeDistData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#090d16', borderColor: '#374151', borderRadius: '12px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance Distribution Pie */}
        <div className="lg:col-span-6 glass-card rounded-2xl p-5 border border-gray-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-white">Attendance Classification</h3>
            <span className="text-[10px] text-amber-400 font-bold">{students.filter(s => s.attendance < 75).length} Attendance Risk</span>
          </div>
          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={attendanceDistData} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`}>
                  {attendanceDistData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#090d16', borderColor: '#374151', borderRadius: '12px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Core Feature: Student Academic vs Attendance Scatter Plot */}
      <PerformanceMatrix 
        onSelectStudent={(id) => {
          setSelectedStudentId(id);
          navigateTo('students');
        }}
      />
    </div>
  );
};
