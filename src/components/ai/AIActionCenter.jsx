import React from 'react';
import { useSkillora } from '../../context/SkilloraContext';
import { Sparkles, Flame, AlertTriangle, DollarSign, GraduationCap, TrendingDown, ArrowRight } from 'lucide-react';

export const AIActionCenter = () => {
  const { navigateTo, setSelectedStudentId, setSelectedCustomerId } = useSkillora();

  const actionCards = [
    {
      id: "action-1",
      title: "🔥 HOT LEAD CONVERSION",
      subtitle: "ABC College has a 91% purchase probability (₹4.0L deal).",
      type: "hot_lead",
      icon: Flame,
      color: "from-orange-500/20 to-amber-500/10 border-orange-500/40 text-orange-400",
      buttonText: "View Lead Pipeline",
      onClick: () => {
        setSelectedCustomerId("LEAD-101");
        navigateTo("crm");
      }
    },
    {
      id: "action-2",
      title: "⚠️ PAYMENT RISK WARNING",
      subtitle: "₹85,000 payment from ABC Institute is overdue by 16 days.",
      type: "payment_risk",
      icon: DollarSign,
      color: "from-rose-500/20 to-red-500/10 border-rose-500/40 text-rose-400",
      buttonText: "Review Invoice",
      onClick: () => navigateTo("finance")
    },
    {
      id: "action-3",
      title: "⚠️ ATTENDANCE RISK ALERT",
      subtitle: "12 students in AIML-04 have attendance below 75% threshold.",
      type: "attendance_risk",
      icon: AlertTriangle,
      color: "from-amber-500/20 to-yellow-500/10 border-amber-500/40 text-amber-400",
      buttonText: "View Students Matrix",
      onClick: () => {
        setSelectedStudentId("STU-1002");
        navigateTo("students");
      }
    },
    {
      id: "action-4",
      title: "📚 ACADEMIC INTERVENTION",
      subtitle: "8 students scored below passing academic threshold (Grade D/F).",
      type: "academic_risk",
      icon: GraduationCap,
      color: "from-purple-500/20 to-indigo-500/10 border-purple-500/40 text-purple-400",
      buttonText: "Intervene Now",
      onClick: () => navigateTo("students")
    },
    {
      id: "action-5",
      title: "📉 BATCH HEALTH DECLINE",
      subtitle: "Batch AIML-04 attendance dropped to 68%. Health Score: 62.",
      type: "batch_risk",
      icon: TrendingDown,
      color: "from-blue-500/20 to-cyan-500/10 border-blue-500/40 text-blue-400",
      buttonText: "View Batch Details",
      onClick: () => navigateTo("operations")
    },
    {
      id: "action-6",
      title: "💰 PROFIT MARGIN ALERT",
      subtitle: "Cybersecurity Batch CS-03 has high expense-to-revenue ratio.",
      type: "profit_alert",
      icon: DollarSign,
      color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-400",
      buttonText: "Analyze Profitability",
      onClick: () => navigateTo("finance")
    }
  ];

  return (
    <div className="glass-panel rounded-2xl p-5 border border-indigo-500/30">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-400">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white tracking-wide">AI Action Center</h2>
            <p className="text-xs text-gray-400">Know what needs attention before it becomes a problem.</p>
          </div>
        </div>
        <span className="text-[11px] font-bold text-indigo-300 bg-indigo-950/60 px-2.5 py-1 rounded-full border border-indigo-500/30">
          6 Active AI Signals
        </span>
      </div>

      {/* Grid of Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {actionCards.map((card) => {
          const Icon = card.icon;
          return (
            <div 
              key={card.id}
              className={`p-4 rounded-xl border bg-gradient-to-br transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between ${card.color}`}
            >
              <div>
                <div className="flex items-center space-x-2">
                  <Icon className="w-4 h-4" />
                  <span className="text-xs font-black tracking-wide uppercase">{card.title}</span>
                </div>
                <p className="mt-2 text-xs font-medium text-gray-200 leading-snug">{card.subtitle}</p>
              </div>

              <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-end">
                <button
                  onClick={card.onClick}
                  className="flex items-center space-x-1.5 text-xs font-bold bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg border border-white/20 transition-all"
                >
                  <span>{card.buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
