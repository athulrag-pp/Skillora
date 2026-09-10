import React, { useState, useEffect, useMemo } from 'react';
import { useSkillora } from '../context/SkilloraContext';
import { 
  GraduationCap, Sparkles, BookOpen, Award, CheckCircle2, AlertTriangle, 
  Calendar, Clock, FileText, Download, PlayCircle, Video, CheckSquare, 
  User, ShieldCheck, ChevronRight, BarChart2, Layers, ExternalLink, ArrowRight 
} from 'lucide-react';

export const StudentPortalPage = ({ initialTab = 'dashboard' }) => {
  const { students, currentUser, activePage, navigateTo, theme, showToast, triggerConfetti } = useSkillora();

  const [activeTab, setActiveTab] = useState(initialTab);
  const [expandedModule, setExpandedModule] = useState('mod-2');
  const [joinedClassModal, setJoinedClassModal] = useState(false);

  // Sync tab state when initialTab or activePage changes
  useEffect(() => {
    if (activePage === 'student_curriculum') {
      setActiveTab('curriculum');
    } else {
      setActiveTab(initialTab || 'dashboard');
    }
  }, [initialTab, activePage]);

  // Dynamically resolve individual student profile for currentUser
  const student = useMemo(() => {
    if (currentUser) {
      const match = students.find(s => 
        (s.email && currentUser.email && s.email.toLowerCase() === currentUser.email.toLowerCase()) ||
        (s.name && currentUser.name && s.name.toLowerCase() === currentUser.name.toLowerCase()) ||
        (s.id && currentUser.studentId && s.id === currentUser.studentId)
      );
      if (match) return match;

      // Fallback for newly created student account
      return {
        id: currentUser.id || 'STU-1002',
        name: currentUser.name || 'Rahul Verma',
        email: currentUser.email || 'student@skillora.demo',
        avatar: currentUser.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        courseName: 'AI & Machine Learning Masterclass',
        batchName: 'AIML-01',
        trainerName: 'Dr. Bill Gates / Arun Kumar',
        parentName: 'Mahesh Verma',
        parentEmail: 'm.verma@gmail.com',
        academic: 92,
        attendance: 88,
        assignment: 95,
        progress: 80,
        overallScore: 90,
        grade: 'A',
        riskLevel: 'LOW',
        aiInsight: `Student ${currentUser.name || 'Rahul'} is performing exceptionally in Machine Learning & PyTorch. High assignment completion rate (95%). Keep up the attendance to maintain top tier honors standing.`
      };
    }
    return students.find(s => s.id === 'STU-1002') || students[0];
  }, [students, currentUser]);

  // Course modules data
  const modules = [
    {
      id: 'mod-1',
      number: 'Module 1',
      title: 'Python, Mathematics & NumPy Foundations for AI',
      duration: '3 Weeks • 12 Lessons',
      status: 'Completed',
      progress: 100,
      badgeColor: theme === 'dark' ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40' : 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
      topics: [
        { name: 'Python Data Structures & OOP Concepts', type: 'Video Lecture', duration: '45 mins', done: true },
        { name: 'Linear Algebra, Vectors & Matrices for ML', type: 'Interactive Lab', duration: '60 mins', done: true },
        { name: 'Multivariate Calculus & Gradient Descent', type: 'Reading & Quiz', duration: '30 mins', done: true },
        { name: 'NumPy Vectorized Computations Benchmark', type: 'Assignment Submission', duration: 'Score: 98/100', done: true }
      ]
    },
    {
      id: 'mod-2',
      number: 'Module 2',
      title: 'Neural Networks & Deep Learning with PyTorch',
      duration: '4 Weeks • 16 Lessons',
      status: 'In Progress',
      progress: 75,
      badgeColor: theme === 'dark' ? 'bg-indigo-950 text-indigo-300 border-indigo-500/40' : 'bg-indigo-100 text-indigo-800 border-indigo-300 font-bold',
      topics: [
        { name: 'Perceptrons, Activation Functions & Loss Surfaces', type: 'Video Lecture', duration: '50 mins', done: true },
        { name: 'Backpropagation Algorithm from Scratch', type: 'Interactive Lab', duration: '75 mins', done: true },
        { name: 'Building Multi-Layer Perceptrons in PyTorch', type: 'Coding Notebook', duration: 'Score: 92/100', done: true },
        { name: 'Hyperparameter Tuning & Regularization (Dropout, L2)', type: 'Live Mentorship', duration: 'Today • 6:00 PM', done: false }
      ]
    },
    {
      id: 'mod-3',
      number: 'Module 3',
      title: 'Computer Vision, CNNs & Object Detection',
      duration: '4 Weeks • 14 Lessons',
      status: 'Next Up',
      progress: 0,
      badgeColor: theme === 'dark' ? 'bg-amber-950 text-amber-300 border-amber-500/40' : 'bg-amber-100 text-amber-800 border-amber-300 font-bold',
      topics: [
        { name: 'Convolutional Kernels, Pooling & Feature Maps', type: 'Video Lecture', duration: '45 mins', done: false },
        { name: 'ResNet, VGG & Modern CNN Architectures', type: 'Interactive Lab', duration: '60 mins', done: false },
        { name: 'Transfer Learning with Pretrained Models', type: 'Assignment', duration: 'Upcoming', done: false },
        { name: 'YOLOv8 Real-Time Object Detection Project', type: 'Capstone Lab', duration: 'Upcoming', done: false }
      ]
    },
    {
      id: 'mod-4',
      number: 'Module 4',
      title: 'Natural Language Processing, LLMs & Transformers',
      duration: '5 Weeks • 18 Lessons',
      status: 'Locked',
      progress: 0,
      badgeColor: theme === 'dark' ? 'bg-gray-800 text-gray-400 border-gray-700' : 'bg-slate-100 text-slate-600 border-slate-300 font-bold',
      topics: [
        { name: 'Tokenization, Embeddings & Word2Vec', type: 'Video Lecture', duration: '45 mins', done: false },
        { name: 'Self-Attention Mechanism & Transformer Architecture', type: 'Interactive Lab', duration: '90 mins', done: false },
        { name: 'Retrieval-Augmented Generation (RAG) Systems', type: 'Project', duration: 'Upcoming', done: false },
        { name: 'Fine-Tuning Llama 3 & Mistral on Custom Data', type: 'Advanced Lab', duration: 'Upcoming', done: false }
      ]
    }
  ];

  // Individual Assignments List
  const assignments = [
    { id: 'ASN-101', title: 'PyTorch Neural Network Training Pipeline', module: 'Module 2', dueDate: 'Sep 12, 2026', status: 'Graded', score: '95/100', feedback: 'Excellent implementation of cross-entropy loss and Adam optimizer.' },
    { id: 'ASN-102', title: 'Linear Algebra Matrix Factorization Lab', module: 'Module 1', dueDate: 'Aug 28, 2026', status: 'Graded', score: '98/100', feedback: 'Flawless mathematical proof and NumPy vectorization.' },
    { id: 'ASN-103', title: 'Custom Dropout & Regularization Benchmark', module: 'Module 2', dueDate: 'Sep 15, 2026', status: 'Submitted', score: 'Pending Review', feedback: 'Submitted on time. Awaiting evaluation.' },
    { id: 'ASN-104', title: 'Convolutional Neural Network Image Classifier', module: 'Module 3', dueDate: 'Sep 22, 2026', status: 'Upcoming', score: '--', feedback: 'Unlocks next week.' }
  ];

  const handleJoinClass = () => {
    setJoinedClassModal(true);
    triggerConfetti();
    showToast(`Joining Live Class Batch ${student.batchName}...`, 'success');
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Individual Student Welcome Banner */}
      <div className={`p-6 rounded-3xl border transition-all ${
        theme === 'dark'
          ? 'glass-panel border-indigo-500/40 bg-gradient-to-r from-indigo-950/90 via-purple-950/70 to-slate-950/90 text-white'
          : 'bg-white border-slate-200 shadow-lg text-slate-900'
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img 
                src={student.avatar} 
                alt={student.name} 
                className={`w-16 h-16 rounded-2xl object-cover border-2 shadow-xl ${
                  theme === 'dark' ? 'border-indigo-400' : 'border-indigo-600'
                }`} 
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" title="Active Online" />
            </div>
            <div>
              <div className="flex items-center space-x-2.5 flex-wrap">
                <h1 className={`text-2xl font-black tracking-tight ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  {student.name}
                </h1>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border flex items-center space-x-1 ${
                  theme === 'dark' 
                    ? 'text-cyan-300 bg-cyan-950/80 border-cyan-500/40' 
                    : 'text-cyan-900 bg-cyan-100 border-cyan-300 font-extrabold'
                }`}>
                  <ShieldCheck className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-700'}`} />
                  <span>My Student Profile ({student.id})</span>
                </span>
              </div>
              <p className={`text-xs mt-1 font-medium ${
                theme === 'dark' ? 'text-indigo-200' : 'text-slate-600'
              }`}>
                {student.courseName} • Enrolled Batch: <strong className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>{student.batchName}</strong> • Mentor: <span className={theme === 'dark' ? 'text-purple-300' : 'text-purple-700 font-bold'}>{student.trainerName}</span>
              </p>
              <p className={`text-[11px] mt-0.5 ${
                theme === 'dark' ? 'text-indigo-300/80' : 'text-slate-500'
              }`}>
                Logged into verified individual student account ({student.email})
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 self-stretch md:self-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-slate-200">
            <div className={`p-3.5 rounded-2xl border text-center min-w-[110px] ${
              theme === 'dark' 
                ? 'bg-black/40 backdrop-blur-md border-white/10 text-white' 
                : 'bg-slate-100 border-slate-200 text-slate-900 shadow-xs'
            }`}>
              <span className={`text-[10px] uppercase font-extrabold block ${
                theme === 'dark' ? 'text-indigo-300' : 'text-slate-500'
              }`}>Overall Score</span>
              <span className={`text-2xl font-black ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>{student.overallScore}%</span>
            </div>

            <div className={`p-3.5 rounded-2xl border text-center min-w-[110px] ${
              theme === 'dark' 
                ? 'bg-black/40 backdrop-blur-md border-white/10 text-white' 
                : 'bg-emerald-50 border-emerald-200 text-emerald-900 shadow-xs'
            }`}>
              <span className={`text-[10px] uppercase font-extrabold block ${
                theme === 'dark' ? 'text-indigo-300' : 'text-emerald-700'
              }`}>Grade</span>
              <span className="text-2xl font-black text-emerald-600">Grade {student.grade}</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation Header */}
        <div className={`mt-6 pt-4 border-t flex items-center space-x-2 overflow-x-auto ${
          theme === 'dark' ? 'border-white/10' : 'border-slate-200'
        }`}>
          <button
            onClick={() => { setActiveTab('dashboard'); navigateTo('student_portal'); }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'dashboard'
                ? 'bg-indigo-600 text-white shadow-lg glow-primary font-extrabold'
                : (theme === 'dark' ? 'text-indigo-200 hover:bg-white/10 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-700')
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>My Student Dashboard</span>
          </button>

          <button
            onClick={() => { setActiveTab('curriculum'); navigateTo('student_curriculum'); }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'curriculum'
                ? 'bg-indigo-600 text-white shadow-lg glow-primary font-extrabold'
                : (theme === 'dark' ? 'text-indigo-200 hover:bg-white/10 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-700')
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Course Curriculum & Modules</span>
          </button>

          <button
            onClick={() => setActiveTab('assignments')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'assignments'
                ? 'bg-indigo-600 text-white shadow-lg glow-primary font-extrabold'
                : (theme === 'dark' ? 'text-indigo-200 hover:bg-white/10 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-700')
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>Assignments & Lab Marks</span>
          </button>
        </div>
      </div>

      {/* DASHBOARD TAB VIEW */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Key KPI Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className={`p-4 rounded-2xl border transition-all ${
              theme === 'dark' ? 'glass-card border-emerald-500/30 bg-gray-900/60' : 'bg-white border-emerald-200 shadow-sm text-slate-800'
            }`}>
              <span className={`text-[10px] uppercase font-extrabold tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Academic Score</span>
              <div className="text-3xl font-black text-emerald-600 mt-1">{student.academic}%</div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-2 ${
                theme === 'dark' ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              }`}>
                Grade {student.grade} ({student.academicCategory || 'Excellent'})
              </span>
            </div>

            <div className={`p-4 rounded-2xl border transition-all ${
              theme === 'dark' ? 'glass-card border-amber-500/30 bg-gray-900/60' : 'bg-white border-amber-200 shadow-sm text-slate-800'
            }`}>
              <span className={`text-[10px] uppercase font-extrabold tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Attendance Rate</span>
              <div className="text-3xl font-black text-amber-600 mt-1">{student.attendance}%</div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center space-x-1 mt-2 ${
                student.attendance < 75 
                  ? (theme === 'dark' ? 'bg-rose-950/80 text-rose-300 border border-rose-500/30' : 'bg-rose-100 text-rose-800 border border-rose-300')
                  : (theme === 'dark' ? 'bg-amber-950/80 text-amber-300 border border-amber-500/30' : 'bg-amber-100 text-amber-800 border border-amber-300')
              }`}>
                <Clock className="w-3 h-3" />
                <span>{student.attendance < 75 ? 'Attendance Alert (<75%)' : 'Good Attendance'}</span>
              </span>
            </div>

            <div className={`p-4 rounded-2xl border transition-all ${
              theme === 'dark' ? 'glass-card border-purple-500/30 bg-gray-900/60' : 'bg-white border-purple-200 shadow-sm text-slate-800'
            }`}>
              <span className={`text-[10px] uppercase font-extrabold tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Assignments Done</span>
              <div className="text-3xl font-black text-purple-600 mt-1">{student.assignment}%</div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-2 ${
                theme === 'dark' ? 'bg-purple-950/80 text-purple-300 border border-purple-500/30' : 'bg-purple-100 text-purple-800 border border-purple-300'
              }`}>
                8 / 9 Lab Projects Completed
              </span>
            </div>

            <div className={`p-4 rounded-2xl border transition-all ${
              theme === 'dark' ? 'glass-card border-cyan-500/30 bg-gray-900/60' : 'bg-white border-cyan-200 shadow-sm text-slate-800'
            }`}>
              <span className={`text-[10px] uppercase font-extrabold tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Syllabus Progress</span>
              <div className="text-3xl font-black text-cyan-600 mt-1">{student.progress}%</div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-2 ${
                theme === 'dark' ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/30' : 'bg-cyan-100 text-cyan-800 border border-cyan-300'
              }`}>
                On Track for Certification
              </span>
            </div>
          </div>

          {/* AI Personalized Learning Mentor Card */}
          <div className={`p-5 rounded-2xl border transition-all ${
            theme === 'dark'
              ? 'glass-panel border-indigo-500/40 bg-gradient-to-r from-indigo-950/50 via-purple-950/30 to-slate-950/50 text-white'
              : 'bg-indigo-50/90 border-indigo-200 text-slate-900 shadow-sm'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className={`flex items-center space-x-2 text-xs font-extrabold uppercase tracking-wider ${
                theme === 'dark' ? 'text-indigo-300' : 'text-indigo-900'
              }`}>
                <Sparkles className="w-4 h-4 text-amber-500 animate-spin-slow" />
                <span>AI Personal Mentor Insight for {student.name}</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded border font-mono font-bold ${
                theme === 'dark' 
                  ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/30' 
                  : 'bg-indigo-100 text-indigo-800 border-indigo-300'
              }`}>
                Realtime Analysis
              </span>
            </div>
            <p className={`text-xs leading-relaxed font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-slate-800'}`}>
              {student.aiInsight}
            </p>
          </div>

          {/* Enrolled Live Batch Schedule & Upcoming Class */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className={`lg:col-span-2 p-5 rounded-2xl border ${
              theme === 'dark' ? 'glass-card border-gray-800 bg-gray-900/60 text-white' : 'bg-white border-slate-200 shadow-sm text-slate-900'
            }`}>
              <div className={`flex items-center justify-between pb-4 border-b ${
                theme === 'dark' ? 'border-gray-800/40' : 'border-slate-200'
              }`}>
                <div className="flex items-center space-x-2">
                  <Video className="w-4 h-4 text-purple-600" />
                  <h2 className="text-sm font-bold">Upcoming Live Interactive Batch Session</h2>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-700 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold">
                  LIVE TODAY
                </span>
              </div>

              <div className={`mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border ${
                theme === 'dark' 
                  ? 'border-purple-500/20 bg-purple-950/20 text-white' 
                  : 'border-purple-200 bg-purple-50/80 text-slate-900 shadow-xs'
              }`}>
                <div>
                  <div className={`text-xs font-bold uppercase tracking-wider ${
                    theme === 'dark' ? 'text-purple-300' : 'text-purple-900'
                  }`}>Batch: {student.batchName}</div>
                  <h3 className="text-base font-black mt-1">PyTorch Backpropagation & Gradient Optimization</h3>
                  <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                    Trainer: <strong className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>{student.trainerName}</strong> • Today at 6:00 PM IST (60 mins)
                  </p>
                </div>
                <button
                  onClick={handleJoinClass}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg flex items-center justify-center space-x-2 transition-all"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>Join Live Class</span>
                </button>
              </div>

              {/* Class Joined Notification Modal */}
              {joinedClassModal && (
                <div className="mt-4 p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Redirecting to Live PyTorch Virtual Classroom... Mentor is online!</span>
                  </div>
                  <button onClick={() => setJoinedClassModal(false)} className="text-emerald-400 font-bold hover:underline">
                    Dismiss
                  </button>
                </div>
              )}

              {/* Course Syllabus Preview */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`text-xs font-bold uppercase ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Current Course Roadmap</h3>
                  <button 
                    onClick={() => { setActiveTab('curriculum'); navigateTo('student_curriculum'); }}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
                  >
                    <span>View Full Syllabus</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2">
                  {modules.slice(0, 3).map(mod => (
                    <div key={mod.id} className={`p-3 rounded-xl border flex items-center justify-between ${
                      theme === 'dark' ? 'bg-gray-950/50 border-gray-800' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                          mod.status === 'Completed' ? (theme === 'dark' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-800 border border-emerald-300') :
                          mod.status === 'In Progress' ? 'bg-indigo-600 text-white shadow-sm' : (theme === 'dark' ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-800 border border-amber-300')
                        }`}>
                          {mod.number.replace('Module ', '')}
                        </div>
                        <div>
                          <div className="text-xs font-bold">{mod.title}</div>
                          <div className={`text-[10px] ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>{mod.duration}</div>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${mod.badgeColor}`}>
                        {mod.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Fee Details & Quick Resources */}
            <div className="space-y-6">
              {/* Fee Receipt Card */}
              <div className={`p-5 rounded-2xl border ${
                theme === 'dark' ? 'glass-card border-gray-800 bg-gray-900/60 text-white' : 'bg-white border-slate-200 shadow-sm text-slate-900'
              }`}>
                <div className="flex items-center space-x-2 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-3">
                  <Award className="w-4 h-4" />
                  <span>Tuition & Enrollment Status</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className={`flex justify-between py-1 border-b ${theme === 'dark' ? 'border-gray-800/40' : 'border-slate-200'}`}>
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}>Course Fee Total:</span>
                    <strong className="font-bold">₹85,000</strong>
                  </div>
                  <div className={`flex justify-between py-1 border-b ${theme === 'dark' ? 'border-gray-800/40' : 'border-slate-200'}`}>
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}>Amount Paid:</span>
                    <strong className="text-emerald-600 font-bold">₹85,000 (100%)</strong>
                  </div>
                  <div className={`flex justify-between py-1 border-b ${theme === 'dark' ? 'border-gray-800/40' : 'border-slate-200'}`}>
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}>Payment Status:</span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded border ${
                      theme === 'dark' ? 'bg-emerald-950 text-emerald-300 border-emerald-500/30' : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    }`}>
                      FULLY PAID
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => showToast('Downloading Official Tuition Fee Receipt PDF...', 'info')}
                  className={`w-full mt-4 py-2 rounded-xl border text-xs font-bold flex items-center justify-center space-x-2 transition-colors ${
                    theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-gray-200 border-gray-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                  }`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Fee Receipt PDF</span>
                </button>
              </div>

              {/* Study Resources Card */}
              <div className={`p-5 rounded-2xl border ${
                theme === 'dark' ? 'glass-card border-gray-800 bg-gray-900/60 text-white' : 'bg-white border-slate-200 shadow-sm text-slate-900'
              }`}>
                <h3 className={`text-xs font-bold uppercase mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Individual Student Study Hub</h3>
                <div className="space-y-2">
                  <a href="#lab" onClick={(e) => { e.preventDefault(); showToast('Opening PyTorch Jupyter Lab Sandbox...', 'info'); }} className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                    theme === 'dark' ? 'bg-gray-950/60 hover:bg-gray-800 border-gray-800 text-gray-200' : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                  }`}>
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-indigo-600" />
                      <span className="font-semibold">PyTorch Jupyter Notebooks</span>
                    </div>
                    <ExternalLink className="w-3 h-3 text-gray-400" />
                  </a>

                  <a href="#github" onClick={(e) => { e.preventDefault(); showToast('Opening Class GitHub Repository...', 'info'); }} className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                    theme === 'dark' ? 'bg-gray-950/60 hover:bg-gray-800 border-gray-800 text-gray-200' : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                  }`}>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-purple-600" />
                      <span className="font-semibold">Class Code & Project Repo</span>
                    </div>
                    <ExternalLink className="w-3 h-3 text-gray-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CURRICULUM TAB VIEW */}
      {activeTab === 'curriculum' && (
        <div className="space-y-6">
          <div className={`p-5 rounded-2xl border ${
            theme === 'dark' ? 'glass-card border-gray-800 bg-gray-900/60 text-white' : 'bg-white border-slate-200 shadow-sm text-slate-900'
          }`}>
            <div className={`flex items-center justify-between mb-4 pb-3 border-b ${
              theme === 'dark' ? 'border-gray-800/40' : 'border-slate-200'
            }`}>
              <div>
                <h2 className="text-base font-black">{student.courseName} - Complete Syllabus</h2>
                <p className={`text-xs mt-0.5 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                  Batch: <strong>{student.batchName}</strong> • Master 5 Modules for Industry Certification
                </p>
              </div>
              <div className="text-right">
                <span className={`text-xs font-bold block ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-700'}`}>Overall Course Progress</span>
                <span className="text-xl font-black text-indigo-600">{student.progress}%</span>
              </div>
            </div>

            {/* Course Modules Accordion / List */}
            <div className="space-y-4">
              {modules.map((mod) => {
                const isExpanded = expandedModule === mod.id;
                return (
                  <div key={mod.id} className={`rounded-2xl border transition-all overflow-hidden ${
                    theme === 'dark'
                      ? (isExpanded ? 'bg-gray-950/80 border-indigo-500/40' : 'bg-gray-950/40 border-gray-800/80')
                      : (isExpanded ? 'bg-indigo-50/60 border-indigo-300' : 'bg-slate-50 border-slate-200')
                  }`}>
                    <button
                      onClick={() => setExpandedModule(isExpanded ? null : mod.id)}
                      className="w-full p-4 flex items-center justify-between text-left"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-xl font-black text-sm flex items-center justify-center ${
                          mod.status === 'Completed' ? (theme === 'dark' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold') :
                          mod.status === 'In Progress' ? 'bg-indigo-600 text-white shadow-lg' : (theme === 'dark' ? 'bg-gray-800 text-gray-400 border border-gray-700' : 'bg-slate-200 text-slate-600 border border-slate-300')
                        }`}>
                          {mod.number.replace('Module ', '')}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs font-extrabold uppercase tracking-wider ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-700'}`}>{mod.number}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${mod.badgeColor}`}>
                              {mod.status}
                            </span>
                          </div>
                          <h3 className="text-sm font-black mt-0.5">{mod.title}</h3>
                          <p className={`text-[11px] mt-0.5 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>{mod.duration}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="hidden sm:block text-right">
                          <span className={`text-[10px] font-bold uppercase block ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Progress</span>
                          <span className="text-xs font-black">{mod.progress}%</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90 text-indigo-600' : 'text-gray-400'}`} />
                      </div>
                    </button>

                    {/* Module Topics breakdown */}
                    {isExpanded && (
                      <div className={`p-4 border-t space-y-2 ${
                        theme === 'dark' ? 'border-gray-800 bg-black/30' : 'border-slate-200 bg-white'
                      }`}>
                        <div className={`text-[10px] font-extrabold uppercase tracking-wider mb-2 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-slate-500'
                        }`}>
                          Module Curriculum & Interactive Lessons
                        </div>
                        {mod.topics.map((topic, idx) => (
                          <div key={idx} className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                            theme === 'dark' ? 'bg-gray-900/60 border-gray-800 text-gray-200' : 'bg-slate-50 border-slate-200 text-slate-800 shadow-xs'
                          }`}>
                            <div className="flex items-center space-x-3">
                              {topic.done ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                              ) : (
                                <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                              )}
                              <div>
                                <span className="font-bold">{topic.name}</span>
                                <div className={`text-[10px] ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                                  {topic.type} • {topic.duration}
                                </div>
                              </div>
                            </div>

                            <button 
                              onClick={() => showToast(`Opening lesson content: ${topic.name}`, 'info')}
                              className={`px-3 py-1 rounded-lg text-[11px] font-bold border transition-colors ${
                                theme === 'dark'
                                  ? 'bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 border-indigo-500/30'
                                  : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-900 border-indigo-300 font-extrabold'
                              }`}
                            >
                              {topic.done ? 'Review Material' : 'Start Lesson'}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ASSIGNMENTS TAB VIEW */}
      {activeTab === 'assignments' && (
        <div className="space-y-6">
          <div className={`p-5 rounded-2xl border ${
            theme === 'dark' ? 'glass-card border-gray-800 bg-gray-900/60 text-white' : 'bg-white border-slate-200 shadow-sm text-slate-900'
          }`}>
            <h2 className={`text-sm font-black uppercase tracking-wider mb-4 ${
              theme === 'dark' ? 'text-indigo-400' : 'text-indigo-900'
            }`}>
              Individual Homework & Coding Lab Submissions
            </h2>

            <div className="space-y-3">
              {assignments.map(asn => (
                <div key={asn.id} className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                  theme === 'dark' ? 'bg-gray-950/60 border-gray-800 text-gray-200' : 'bg-slate-50 border-slate-200 text-slate-800 shadow-xs'
                }`}>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                        theme === 'dark' ? 'bg-indigo-950 text-indigo-300 border-indigo-500/30' : 'bg-indigo-100 text-indigo-900 border-indigo-300 font-extrabold'
                      }`}>
                        {asn.id}
                      </span>
                      <span className={`text-xs font-bold ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>{asn.module}</span>
                    </div>
                    <h3 className="text-sm font-black mt-1">{asn.title}</h3>
                    <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                      Feedback: <span className="italic">"{asn.feedback}"</span>
                    </p>
                  </div>

                  <div className="flex items-center space-x-4 self-end sm:self-auto">
                    <div className="text-right">
                      <span className={`text-[10px] font-bold uppercase block ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Grade</span>
                      <span className="text-xs font-black text-emerald-600">{asn.score}</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                      asn.status === 'Graded' ? (theme === 'dark' ? 'bg-emerald-950 text-emerald-300 border-emerald-500/30' : 'bg-emerald-100 text-emerald-800 border-emerald-300 font-extrabold') :
                      asn.status === 'Submitted' ? (theme === 'dark' ? 'bg-indigo-950 text-indigo-300 border-indigo-500/30' : 'bg-indigo-100 text-indigo-800 border-indigo-300 font-extrabold') : (theme === 'dark' ? 'bg-amber-950 text-amber-300 border-amber-500/30' : 'bg-amber-100 text-amber-800 border-amber-300 font-extrabold')
                    }`}>
                      {asn.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
