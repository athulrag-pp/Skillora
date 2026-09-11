import React, { useState } from 'react';
import { useSkillora } from '../../context/SkilloraContext';
import { X, UserPlus, GraduationCap, CheckCircle2 } from 'lucide-react';

export const AddStudentModal = ({ isOpen, onClose }) => {
  const { addStudent, courses, batches, trainers, showToast } = useSkillora();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [selectedBatchId, setSelectedBatchId] = useState('AIML-01');
  const [academic, setAcademic] = useState(88);
  const [attendance, setAttendance] = useState(92);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const batchObj = batches.find(b => b.id === selectedBatchId) || batches[0];
    const courseObj = courses.find(c => c.id === batchObj.courseId) || courses[0];

    addStudent({
      name,
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@skillora.demo`,
      parentName: parentName || `Parent of ${name}`,
      parentPhone: parentPhone || '+91 98765 00000',
      batchId: batchObj.id,
      batchName: batchObj.batchName,
      courseId: courseObj.id,
      courseName: courseObj.name,
      trainerName: batchObj.trainerName,
      academic: Number(academic),
      attendance: Number(attendance)
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-panel bg-gray-950 border border-indigo-500/40 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-indigo-900/80 to-purple-900/80 border-b border-indigo-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <UserPlus className="w-5 h-5 text-indigo-300" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Add & Register New Student Details</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
          <div>
            <label className="text-gray-300 font-bold block mb-1">Student Full Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Vikram Malhotra"
              className="w-full bg-gray-900 border border-gray-800 text-white rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-gray-300 font-bold block mb-1">Student Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vikram@gmail.com"
                className="w-full bg-gray-900 border border-gray-800 text-white rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-gray-300 font-bold block mb-1">Assign Batch *</label>
              <select
                value={selectedBatchId}
                onChange={(e) => setSelectedBatchId(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 text-white rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500 font-bold"
              >
                {batches.map(b => (
                  <option key={b.id} value={b.id}>{b.id} - {b.batchName}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-gray-300 font-bold block mb-1">Parent Name</label>
              <input
                type="text"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                placeholder="Rajesh Malhotra"
                className="w-full bg-gray-900 border border-gray-800 text-white rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-gray-300 font-bold block mb-1">Parent Phone</label>
              <input
                type="text"
                value={parentPhone}
                onChange={(e) => setParentPhone(e.target.value)}
                placeholder="+91 98123 45678"
                className="w-full bg-gray-900 border border-gray-800 text-white rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-gray-300 font-bold block mb-1">Initial Academic (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={academic}
                onChange={(e) => setAcademic(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 text-white rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-gray-300 font-bold block mb-1">Initial Attendance (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={attendance}
                onChange={(e) => setAttendance(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 text-white rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-extrabold text-xs shadow-xl glow-primary transition-all flex items-center justify-center space-x-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Enroll Student into Real-Time Platform</span>
          </button>
        </form>
      </div>
    </div>
  );
};
