import React, { useState } from 'react';
import { useSkillora } from '../context/SkilloraContext';
import { predictPaymentRisk } from '../services/aiEngine';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend 
} from 'recharts';
import { 
  DollarSign, Wallet, AlertTriangle, TrendingUp, Plus, 
  CheckCircle2, Sparkles, PieChart, FileText, ArrowRight 
} from 'lucide-react';

export const FinancePage = () => {
  const { financeSummary, invoices, expenses, addInvoicePayment, addExpense, showToast } = useSkillora();

  const [paymentAmount, setPaymentAmount] = useState(50000);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(invoices[0]?.id || 'INV-1045');
  const [expenseCat, setExpenseCat] = useState('Trainer Payments');
  const [expenseVendor, setExpenseVendor] = useState('External Guest Faculty');
  const [expenseAmount, setExpenseAmount] = useState(25000);

  const handleRecordPayment = (e) => {
    e.preventDefault();
    addInvoicePayment(selectedInvoiceId, Number(paymentAmount));
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    addExpense({
      category: expenseCat,
      vendorOrPerson: expenseVendor,
      amount: expenseAmount,
      courseName: 'All Active Batches'
    });
  };

  const forecastData = [
    { month: "May", actual: 5.2, expected: 5.0, best: 5.5, risk: 4.8 },
    { month: "Jun", actual: 6.4, expected: 6.2, best: 6.8, risk: 5.9 },
    { month: "Jul", actual: 7.5, expected: 7.4, best: 8.0, risk: 7.0 },
    { month: "Aug", actual: 8.4, expected: 8.1, best: 9.0, risk: 7.8 },
    { month: "Sep (Current)", actual: 8.4, expected: 9.5, best: 10.5, risk: 8.8 },
    { month: "Oct (Forecast)", actual: null, expected: 11.5, best: 12.8, risk: 9.8 }
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
            <DollarSign className="w-6 h-6 text-emerald-400" />
            <span>Finance & Profitability Engine</span>
          </h1>
          <p className="text-xs text-gray-400">
            Invoices, payment risk ageing prediction, revenue forecasting, and expense profitability.
          </p>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="glass-card p-4 rounded-2xl border border-emerald-500/30">
          <span className="text-[10px] uppercase font-bold text-gray-400">Total Billed Revenue</span>
          <div className="text-2xl font-black text-emerald-400 mt-1">₹{(financeSummary.totalRevenue/100000).toFixed(2)}L</div>
        </div>
        <div className="glass-card p-4 rounded-2xl border border-emerald-500/30">
          <span className="text-[10px] uppercase font-bold text-gray-400">Collected Cash</span>
          <div className="text-2xl font-black text-emerald-400 mt-1">₹{(financeSummary.collectedAmount/100000).toFixed(2)}L</div>
        </div>
        <div className="glass-card p-4 rounded-2xl border border-rose-500/30">
          <span className="text-[10px] uppercase font-bold text-gray-400">Outstanding</span>
          <div className="text-2xl font-black text-rose-400 mt-1">₹{(financeSummary.outstandingAmount/100000).toFixed(2)}L</div>
        </div>
        <div className="glass-card p-4 rounded-2xl border border-amber-500/30">
          <span className="text-[10px] uppercase font-bold text-gray-400">Total Expenses</span>
          <div className="text-2xl font-black text-amber-400 mt-1">₹{(financeSummary.totalExpenses/100000).toFixed(2)}L</div>
        </div>
        <div className="glass-card p-4 rounded-2xl border border-indigo-500/30">
          <span className="text-[10px] uppercase font-bold text-gray-400">Net Profit</span>
          <div className="text-2xl font-black text-white mt-1">₹{(financeSummary.netProfit/100000).toFixed(2)}L</div>
          <span className="text-[10px] font-bold text-emerald-400">{financeSummary.profitMarginPct}% Margin</span>
        </div>
      </div>

      {/* AI Revenue Forecast Section (Requirement #20) */}
      <div className="glass-panel p-5 rounded-2xl border border-indigo-500/40 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-yellow-300 animate-spin-slow" />
            <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">AI Revenue Forecast & Scenario Analysis</h2>
          </div>
          <div className="flex items-center space-x-3 text-xs font-bold">
            <span className="text-emerald-400">Best Case: ₹12.8L</span>
            <span className="text-indigo-400">Expected: ₹11.5L</span>
            <span className="text-amber-400">Risk Case: ₹9.8L</span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecastData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
              <XAxis dataKey="month" stroke="#6b7280" fontSize={11} />
              <YAxis stroke="#6b7280" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#090d16', borderColor: '#374151', borderRadius: '12px', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Area type="monotone" dataKey="best" stroke="#10b981" fill="#10b981" fillOpacity={0.1} name="Best Case Scenario (₹L)" />
              <Area type="monotone" dataKey="expected" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} name="Expected Forecast (₹L)" />
              <Area type="monotone" dataKey="risk" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} name="Risk Adjusted (₹L)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payment Action Forms & AI Risk Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Record Invoice Payment Form */}
        <div className="lg:col-span-6 glass-panel p-5 rounded-2xl border border-gray-800 space-y-3">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center space-x-2">
            <Wallet className="w-4 h-4 text-emerald-400" />
            <span>Record Invoice Payment Received</span>
          </h3>

          <form onSubmit={handleRecordPayment} className="space-y-3">
            <div>
              <label className="text-xs text-gray-400 font-bold block mb-1">Select Invoice</label>
              <select
                value={selectedInvoiceId}
                onChange={(e) => setSelectedInvoiceId(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 text-white text-xs font-bold rounded-xl px-3 py-2 focus:outline-none"
              >
                {invoices.map(inv => (
                  <option key={inv.id} value={inv.id}>
                    {inv.id} - {inv.customerName} (Outstanding: ₹{inv.outstandingAmount.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-400 font-bold block mb-1">Payment Amount (₹)</label>
              <input
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(Number(e.target.value))}
                className="w-full bg-gray-900 border border-gray-800 text-white text-xs font-bold rounded-xl px-3 py-2 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg glow-emerald transition-all"
            >
              Record Payment Received & Update Cash KPI
            </button>
          </form>
        </div>

        {/* Log Operational Expense Form */}
        <div className="lg:col-span-6 glass-panel p-5 rounded-2xl border border-gray-800 space-y-3">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center space-x-2">
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Log Operational Expense</span>
          </h3>

          <form onSubmit={handleAddExpense} className="space-y-3">
            <div>
              <label className="text-xs text-gray-400 font-bold block mb-1">Expense Category</label>
              <select
                value={expenseCat}
                onChange={(e) => setExpenseCat(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 text-white text-xs font-bold rounded-xl px-3 py-2 focus:outline-none"
              >
                <option value="Trainer Payments">Trainer Payments</option>
                <option value="Lab & Cloud Infrastructure">Lab & Cloud Infrastructure</option>
                <option value="Course Licensing & Materials">Course Licensing & Materials</option>
                <option value="Travel & Accommodation">Travel & Accommodation</option>
                <option value="Marketing & Lead Acquisition">Marketing & Lead Acquisition</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400 font-bold block mb-1">Vendor / Person</label>
                <input
                  type="text"
                  value={expenseVendor}
                  onChange={(e) => setExpenseVendor(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 text-white text-xs font-bold rounded-xl px-3 py-2 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 font-bold block mb-1">Amount (₹)</label>
                <input
                  type="number"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(Number(e.target.value))}
                  className="w-full bg-gray-900 border border-gray-800 text-white text-xs font-bold rounded-xl px-3 py-2 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              Log Expense & Update Net Profit Engine
            </button>
          </form>
        </div>
      </div>

      {/* AI Payment Risk & Invoices Table (Requirement #19) */}
      <div className="glass-panel rounded-2xl border border-gray-800 overflow-hidden shadow-2xl space-y-3 p-4">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Invoices & AI Payment Risk Ageing Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-900 text-gray-400 uppercase text-[10px] font-extrabold border-b border-gray-800">
              <tr>
                <th className="p-3">Invoice ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Total Amount</th>
                <th className="p-3">Paid</th>
                <th className="p-3">Outstanding</th>
                <th className="p-3">Status</th>
                <th className="p-3">AI Payment Risk</th>
                <th className="p-3">Recommended Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 font-medium">
              {invoices.map(inv => {
                const risk = predictPaymentRisk(inv);
                return (
                  <tr key={inv.id} className="hover:bg-gray-800/40 transition-colors">
                    <td className="p-3 font-bold text-white">{inv.id}</td>
                    <td className="p-3 text-gray-300">{inv.customerName}</td>
                    <td className="p-3 font-bold text-white">₹{inv.totalAmount.toLocaleString()}</td>
                    <td className="p-3 text-emerald-400">₹{inv.paidAmount.toLocaleString()}</td>
                    <td className="p-3 text-rose-400 font-bold">₹{inv.outstandingAmount.toLocaleString()}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        inv.status === 'Fully Paid' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                        risk.risk === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse' :
                        risk.risk === 'HIGH' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                        risk.risk === 'MEDIUM' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {risk.risk} ({risk.ageing})
                      </span>
                    </td>
                    <td className="p-3 text-[11px] text-gray-400 line-clamp-1">{risk.action}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
