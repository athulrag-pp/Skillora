import React, { useState } from 'react';
import { useSkillora } from '../../context/SkilloraContext';
import { sortStudents, filterStudents } from '../../services/sortingUtils';
import { 
  ArrowUpDown, Filter, Search, Eye, AlertTriangle, MessageSquare, 
  Sparkles, CheckCircle2, ChevronDown, User, BookOpen 
} from 'lucide-react';

export const StudentTable = ({ onSelectStudent }) => {
  const { students, courses, batches } = useSkillora();

  const [sortBy, setSortBy] = useState('overallScore');
  const [sortOrder, setSortOrder] = useState('desc');
  const [quickFilter, setQuickFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('ALL');
  const [selectedAttendanceStatus, setSelectedAttendanceStatus] = useState('ALL');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('ALL');
  const [selectedCourse, setSelectedCourse] = useState('ALL');

  // Compute summary count metrics
  const totalCount = students.length;
  const excellentCount = students.filter(s => s.grade === 'A').length;
  const goodCount = students.filter(s => s.grade === 'B').length;
  const averageCount = students.filter(s => s.grade === 'C').length;
  const belowAverageCount = students.filter(s => s.grade === 'D/F').length;
  const attendanceRiskCount = students.filter(s => s.attendanceStatus === 'Attendance Risk').length;
  const highRiskCount = students.filter(s => s.riskLevel === 'HIGH' || s.riskLevel === 'CRITICAL').length;

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const filtered = filterStudents(students, {
    grade: selectedGrade,
    attendanceStatus: selectedAttendanceStatus,
    riskLevel: selectedRiskLevel,
    courseId: selectedCourse,
    searchQuery,
    quickFilter
  });

  const sortedStudents = sortStudents(filtered, sortBy, sortOrder);

  return (
    <div className="space-y-4">
      {/* 1. Performance Summary KPI Cards (Requirement #29) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        <button 
          onClick={() => setQuickFilter('all')}
          className={`p-3 rounded-xl border text-left transition-all ${
            quickFilter === 'all' ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg' : 'glass-card border-gray-800 text-gray-400'
          }`}
        >
          <div className="text-[10px] font-bold uppercase tracking-wider">Total Students</div>
          <div className="text-xl font-black text-white mt-1">{totalCount}</div>
        </button>

        <button 
          onClick={() => setQuickFilter('excellent')}
          className={`p-3 rounded-xl border text-left transition-all ${
            quickFilter === 'excellent' ? 'bg-emerald-600/30 border-emerald-500 text-white shadow-lg' : 'glass-card border-gray-800 text-gray-400'
          }`}
        >
          <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Grade A (Excel)</div>
          <div className="text-xl font-black text-emerald-400 mt-1">{excellentCount}</div>
        </button>

        <button 
          onClick={() => setQuickFilter('good')}
          className={`p-3 rounded-xl border text-left transition-all ${
            quickFilter === 'good' ? 'bg-blue-600/30 border-blue-500 text-white shadow-lg' : 'glass-card border-gray-800 text-gray-400'
          }`}
        >
          <div className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Grade B (Good)</div>
          <div className="text-xl font-black text-blue-400 mt-1">{goodCount}</div>
        </button>

        <button 
          onClick={() => setQuickFilter('average')}
          className={`p-3 rounded-xl border text-left transition-all ${
            quickFilter === 'average' ? 'bg-purple-600/30 border-purple-500 text-white shadow-lg' : 'glass-card border-gray-800 text-gray-400'
          }`}
        >
          <div className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Grade C (Pass)</div>
          <div className="text-xl font-black text-purple-400 mt-1">{averageCount}</div>
        </button>

        <button 
          onClick={() => setQuickFilter('belowAverage')}
          className={`p-3 rounded-xl border text-left transition-all ${
            quickFilter === 'belowAverage' ? 'bg-rose-600/30 border-rose-500 text-white shadow-lg' : 'glass-card border-gray-800 text-gray-400'
          }`}
        >
          <div className="text-[10px] font-bold uppercase tracking-wider text-rose-400">Grade D/F (Low)</div>
          <div className="text-xl font-black text-rose-400 mt-1">{belowAverageCount}</div>
        </button>

        <button 
          onClick={() => setQuickFilter('attendanceRisk')}
          className={`p-3 rounded-xl border text-left transition-all ${
            quickFilter === 'attendanceRisk' ? 'bg-amber-600/30 border-amber-500 text-white shadow-lg' : 'glass-card border-gray-800 text-gray-400'
          }`}
        >
          <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Att. Risk (&lt;75%)</div>
          <div className="text-xl font-black text-amber-400 mt-1">{attendanceRiskCount}</div>
        </button>

        <button 
          onClick={() => setQuickFilter('atRisk')}
          className={`p-3 rounded-xl border text-left transition-all ${
            quickFilter === 'atRisk' ? 'bg-red-600/30 border-red-500 text-white shadow-lg' : 'glass-card border-gray-800 text-gray-400'
          }`}
        >
          <div className="text-[10px] font-bold uppercase tracking-wider text-red-400">High Risk</div>
          <div className="text-xl font-black text-red-400 mt-1">{highRiskCount}</div>
        </button>
      </div>

      {/* 2. Controls, Sorting & Filtering Bar */}
      <div className="glass-panel rounded-2xl p-4 border border-gray-800 flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student name, ID..."
            className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          {/* Grade Filter */}
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="bg-gray-900 border border-gray-800 text-gray-300 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none"
          >
            <option value="ALL">Academic Grade: All</option>
            <option value="A">Grade A (85-100)</option>
            <option value="B">Grade B (75-84)</option>
            <option value="C">Grade C (65-74)</option>
            <option value="D/F">Grade D/F (0-64)</option>
          </select>

          {/* Attendance Status Filter */}
          <select
            value={selectedAttendanceStatus}
            onChange={(e) => setSelectedAttendanceStatus(e.target.value)}
            className="bg-gray-900 border border-gray-800 text-gray-300 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none"
          >
            <option value="ALL">Attendance: All</option>
            <option value="Excellent">Excellent (90%+)</option>
            <option value="Good">Good (80-89%)</option>
            <option value="Average">Average (75-79%)</option>
            <option value="Attendance Risk">Attendance Risk (&lt;75%)</option>
          </select>

          {/* Risk Level Filter */}
          <select
            value={selectedRiskLevel}
            onChange={(e) => setSelectedRiskLevel(e.target.value)}
            className="bg-gray-900 border border-gray-800 text-gray-300 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none"
          >
            <option value="ALL">AI Risk: All</option>
            <option value="LOW">Low Risk</option>
            <option value="MEDIUM">Medium Risk</option>
            <option value="HIGH">High Risk</option>
            <option value="CRITICAL">Critical Risk</option>
          </select>

          {/* Sort By Preset Selector */}
          <div className="flex items-center space-x-1 bg-gray-900 border border-gray-800 rounded-xl px-2 py-1">
            <span className="text-[10px] text-gray-400 uppercase font-bold">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs text-indigo-400 font-bold focus:outline-none"
            >
              <option value="overallScore">Overall Score</option>
              <option value="academic">Academic %</option>
              <option value="grade">Academic Grade</option>
              <option value="attendance">Attendance %</option>
              <option value="attendanceStatus">Attendance Status</option>
              <option value="riskLevel">AI Risk Level</option>
              <option value="name">Student Name</option>
            </select>
            <button 
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="p-1 text-gray-400 hover:text-white"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Main Sortable Student Table */}
      <div className="glass-panel rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-900/90 text-gray-400 font-extrabold uppercase text-[10px] tracking-wider border-b border-gray-800">
              <tr>
                <th className="py-3.5 px-4 cursor-pointer hover:text-white" onClick={() => handleSort('name')}>Student & ID</th>
                <th className="py-3.5 px-3 cursor-pointer hover:text-white" onClick={() => handleSort('academic')}>Academic %</th>
                <th className="py-3.5 px-3 cursor-pointer hover:text-white" onClick={() => handleSort('grade')}>Grade</th>
                <th className="py-3.5 px-3 cursor-pointer hover:text-white" onClick={() => handleSort('attendance')}>Attendance %</th>
                <th className="py-3.5 px-3 cursor-pointer hover:text-white" onClick={() => handleSort('attendanceStatus')}>Att. Status</th>
                <th className="py-3.5 px-3 cursor-pointer hover:text-white" onClick={() => handleSort('assignment')}>Assignment %</th>
                <th className="py-3.5 px-3 cursor-pointer hover:text-white" onClick={() => handleSort('overallScore')}>Overall Score</th>
                <th className="py-3.5 px-3 cursor-pointer hover:text-white" onClick={() => handleSort('riskLevel')}>AI Risk Level</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 font-medium">
              {sortedStudents.map((s) => (
                <tr key={s.id} className="hover:bg-gray-800/40 transition-colors">
                  {/* Name & Avatar */}
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-full object-cover border border-gray-700" />
                      <div>
                        <div className="font-bold text-white text-xs">{s.name}</div>
                        <div className="text-[10px] text-gray-400">{s.id} • {s.batchId}</div>
                      </div>
                    </div>
                  </td>

                  {/* Academic % */}
                  <td className="py-3 px-3">
                    <span className={`font-black text-xs ${s.academic >= 85 ? 'text-emerald-400' : s.academic >= 65 ? 'text-indigo-300' : 'text-rose-400'}`}>
                      {s.academic}%
                    </span>
                  </td>

                  {/* Academic Grade */}
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                      s.grade === 'A' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      s.grade === 'B' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                      s.grade === 'C' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                      'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}>
                      Grade {s.grade}
                    </span>
                  </td>

                  {/* Attendance % */}
                  <td className="py-3 px-3">
                    <span className={`font-black text-xs ${s.attendance >= 90 ? 'text-emerald-400' : s.attendance >= 75 ? 'text-gray-200' : 'text-amber-400 font-bold'}`}>
                      {s.attendance}%
                    </span>
                  </td>

                  {/* Attendance Status (EVALUATED SEPARATELY) */}
                  <td className="py-3 px-3">
                    {s.attendanceStatus === 'Attendance Risk' ? (
                      <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-extrabold px-2 py-0.5 rounded flex items-center space-x-1 w-fit">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Att. Risk</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-gray-300">{s.attendanceStatus}</span>
                    )}
                  </td>

                  {/* Assignment % */}
                  <td className="py-3 px-3 text-gray-300">
                    {s.assignment}%
                  </td>

                  {/* Overall Score */}
                  <td className="py-3 px-3">
                    <div className="font-extrabold text-xs text-white">{s.overallScore}%</div>
                    <div className="text-[9px] text-gray-400">Grade {s.overallGrade}</div>
                  </td>

                  {/* AI Risk Level */}
                  <td className="py-3 px-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                      s.riskLevel === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse' :
                      s.riskLevel === 'HIGH' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                      s.riskLevel === 'MEDIUM' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {s.riskLevel}
                    </span>
                  </td>

                  {/* Row Action Buttons */}
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onSelectStudent && onSelectStudent(s.id)}
                      className="bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 font-bold px-2.5 py-1 rounded-lg border border-indigo-500/40 transition-all flex items-center space-x-1 ml-auto"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Analyze</span>
                    </button>
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
