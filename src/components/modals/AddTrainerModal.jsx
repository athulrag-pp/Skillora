import React, { useState } from 'react';
import { useSkillora } from '../../context/SkilloraContext';
import { X, UserCheck, ShieldCheck } from 'lucide-react';

export const AddTrainerModal = ({ isOpen, onClose }) => {
  const { addTrainer, showToast } = useSkillora();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [expertise, setExpertise] = useState('AI & Machine Learning, PyTorch');
  const [expYears, setExpYears] = useState(6);
  const [salary, setSalary] = useState(80000);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    addTrainer({
      name,
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@skillora.demo`,
      expertise: expertise.split(',').map(s => s.trim()),
      experienceYears: Number(expYears),
      monthlyCost: Number(salary),
      availability: 'Available (Full Time)'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-panel bg-gray-950 border border-purple-500/40 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-purple-900/80 to-indigo-900/80 border-b border-purple-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-purple-300" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Management Onboard New Teacher</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
          <div>
            <label className="text-gray-300 font-bold block mb-1">Teacher Full Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Dr. Anish Kapoor"
              className="w-full bg-gray-900 border border-gray-800 text-white rounded-xl px-3 py-2 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="text-gray-300 font-bold block mb-1">Teacher Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="anish.k@skillora.demo"
              className="w-full bg-gray-900 border border-gray-800 text-white rounded-xl px-3 py-2 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="text-gray-300 font-bold block mb-1">Expertise Tags (comma separated)</label>
            <input
              type="text"
              value={expertise}
              onChange={(e) => setExpertise(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 text-white rounded-xl px-3 py-2 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-gray-300 font-bold block mb-1">Experience (Years)</label>
              <input
                type="number"
                value={expYears}
                onChange={(e) => setExpYears(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 text-white rounded-xl px-3 py-2 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="text-gray-300 font-bold block mb-1">Monthly Salary (₹)</label>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 text-white rounded-xl px-3 py-2 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-xl glow-primary transition-all flex items-center justify-center space-x-1.5"
          >
            <UserCheck className="w-4 h-4" />
            <span>Onboard Teacher into Management Database</span>
          </button>
        </form>
      </div>
    </div>
  );
};
