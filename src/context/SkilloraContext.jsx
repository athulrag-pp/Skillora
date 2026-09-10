import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';
import { generateBulkLeads } from '../data/initialLeads';
import { generateBulkStudents, calculateStudentMetrics } from '../data/initialStudents';
import { initialCoursesData, initialBatchesData } from '../data/initialCourses';
import { initialTrainersData } from '../data/initialTrainers';
import { initialFinanceSummary, initialInvoicesData, initialExpensesData } from '../data/initialFinance';
import { initialNotificationsData } from '../data/initialNotifications';

const SkilloraContext = createContext();

export const SkilloraProvider = ({ children }) => {
  // Theme State: 'dark' | 'light'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('skillora_theme') || 'dark';
  });

  // Authentication & Active View State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('skillora_user');
      return saved ? JSON.parse(saved) : { name: 'Executive Manager', email: 'manager@skillora.demo', role: 'MANAGEMENT', organization: 'Apex EduTech Global' };
    } catch (e) {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('skillora_token') || 'skl_token_demo');
  const [isAuthenticated, setIsAuthenticated] = useState(() => true);

  const [currentRole, setCurrentRole] = useState(() => {
    try {
      const saved = localStorage.getItem('skillora_user');
      if (saved) return JSON.parse(saved).role || 'MANAGEMENT';
    } catch (e) {}
    return 'MANAGEMENT';
  });

  const [activePage, setActivePage] = useState('dashboard');
  const [selectedCustomerId, setSelectedCustomerId] = useState('LEAD-101');
  const [selectedStudentId, setSelectedStudentId] = useState('STU-1002');
  
  // Mandatory Role Switching Auth Modal Gate State
  const [isRoleAuthModalOpen, setIsRoleAuthModalOpen] = useState(false);
  const [targetRoleToSwitch, setTargetRoleToSwitch] = useState(null);

  // Real-time Event Stream Indicator
  const [isRealtimeActive, setIsRealtimeActive] = useState(false);

  // Interconnected Core Data Collections
  const [leads, setLeads] = useState(() => generateBulkLeads());
  const [students, setStudents] = useState(() => generateBulkStudents());
  const [courses, setCourses] = useState(initialCoursesData);
  const [batches, setBatches] = useState(initialBatchesData);
  const [trainers, setTrainers] = useState(initialTrainersData);
  const [invoices, setInvoices] = useState(initialInvoicesData);
  const [expenses, setExpenses] = useState(initialExpensesData);
  const [financeSummary, setFinanceSummary] = useState(initialFinanceSummary);
  const [notifications, setNotifications] = useState(initialNotificationsData);

  // Modals UI State
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isAddTrainerOpen, setIsAddTrainerOpen] = useState(false);
  const [demoStep, setDemoStep] = useState(-1);
  const [toast, setToast] = useState(null);

  // Real DB Authentication & Signup Actions
  const loginWithCredentials = async (email, password, role) => {
    try {
      const res = await api.login(email, password, role);
      if (res && res.success) {
        setToken(res.token);
        setCurrentUser(res.user);
        setIsAuthenticated(true);
        setCurrentRole(res.user.role || role || 'MANAGEMENT');
        localStorage.setItem('skillora_token', res.token);
        localStorage.setItem('skillora_user', JSON.stringify(res.user));
        return res.user;
      }
      throw new Error(res.error || 'Authentication failed');
    } catch (err) {
      throw err;
    }
  };

  const signupUser = async (formData) => {
    try {
      const res = await api.signup(formData);
      if (res && res.success) {
        setToken(res.token);
        setCurrentUser(res.user);
        setIsAuthenticated(true);
        setCurrentRole(res.user.role || 'MANAGEMENT');
        localStorage.setItem('skillora_token', res.token);
        localStorage.setItem('skillora_user', JSON.stringify(res.user));
        showToast(`Welcome ${res.user.name}! Account registered in database.`, 'success');
        triggerConfetti();
        return res.user;
      }
      throw new Error(res.error || 'Sign up registration failed');
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    setToken('');
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('skillora_token');
    localStorage.removeItem('skillora_user');
    setActivePage('login');
    showToast('Logged out of session', 'info');
  };

  const changeRole = (newRole, bypassGate = false) => {
    if (bypassGate || (currentUser && currentUser.role === newRole)) {
      setCurrentRole(newRole);
      if (currentUser) {
        const updated = { ...currentUser, role: newRole };
        setCurrentUser(updated);
        localStorage.setItem('skillora_user', JSON.stringify(updated));
      }
      switch (newRole) {
        case 'TRAINER': setActivePage('trainer_portal'); break;
        case 'STUDENT': setActivePage('student_portal'); break;
        case 'PARENT': setActivePage('parent_portal'); break;
        case 'SALES': setActivePage('crm'); break;
        case 'OPERATIONS': setActivePage('operations'); break;
        case 'FINANCE': setActivePage('finance'); break;
        case 'ADMIN': setActivePage('admin'); break;
        case 'MANAGEMENT': default: setActivePage('dashboard'); break;
      }
      showToast(`Switched view to ${newRole} Portal`, 'info');
    } else {
      setTargetRoleToSwitch(newRole);
      setIsRoleAuthModalOpen(true);
    }
  };

  // Theme Sync Effect
  useEffect(() => {
    localStorage.setItem('skillora_theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light-mode');
      document.body.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
      document.body.classList.remove('light-mode');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      showToast(`Switched to ${next.toUpperCase()} Theme`, 'info');
      return next;
    });
  };

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 3500);
  };

  const triggerConfetti = () => {
    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}
  };

  // Sync with Express REST API & SSE Real-time Stream on mount
  useEffect(() => {
    const syncBackend = async () => {
      const health = await api.checkHealth();
      if (health && health.status === 'online') {
        const backendLeads = await api.getLeads();
        if (backendLeads && backendLeads.length) setLeads(backendLeads);

        const backendStudents = await api.getStudents();
        if (backendStudents && backendStudents.length) setStudents(backendStudents);

        const backendSummary = await api.getFinanceSummary();
        if (backendSummary) setFinanceSummary(backendSummary);
      }
    };
    syncBackend();

    // Subscribe to SSE Real-time Event Stream
    let eventSource;
    try {
      const getApiBase = () => typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5005';
      eventSource = new EventSource(`${getApiBase()}/api/events/stream`);

      eventSource.onopen = () => setIsRealtimeActive(true);

      eventSource.onmessage = (e) => {
        try {
          const data = JSON.parse(e.data);
          if (data.type === 'STUDENT_ADDED') {
            setStudents(prev => [data.payload, ...prev]);
            showToast(`⚡ Realtime Event: Student "${data.payload.name}" enrolled!`, 'success');
            triggerConfetti();
          } else if (data.type === 'TRAINER_ADDED') {
            setTrainers(prev => [data.payload, ...prev]);
            showToast(`⚡ Realtime Event: Teacher "${data.payload.name}" onboarded!`, 'success');
            triggerConfetti();
          } else if (data.type === 'STUDENT_UPDATED') {
            setStudents(prev => prev.map(s => s.id === data.payload.id ? data.payload : s));
          }
        } catch (err) {}
      };

      eventSource.onerror = () => setIsRealtimeActive(false);
    } catch (err) {}

    return () => {
      if (eventSource) eventSource.close();
    };
  }, []);

  const navigateTo = (page) => {
    setActivePage(page);
  };

  // Management CRUD: Add New Student
  const addStudent = async (studentData) => {
    const res = await api.addStudent(studentData);
    if (res && res.id) {
      setStudents(prev => [res, ...prev]);
    } else {
      const metrics = calculateStudentMetrics(studentData.academic || 85, studentData.attendance || 90, 85, 80);
      const localStu = {
        id: `STU-${1000 + students.length + 1}`,
        avatar: `https://i.pravatar.cc/150?img=${(students.length % 70) + 1}`,
        ...studentData,
        ...metrics
      };
      setStudents(prev => [localStu, ...prev]);
    }
    triggerConfetti();
    showToast(`New student "${studentData.name}" enrolled into Realtime Platform!`, 'success');
  };

  // Management CRUD: Add New Teacher / Trainer
  const addTrainer = async (trainerData) => {
    const res = await api.addTrainer(trainerData);
    if (res && res.id) {
      setTrainers(prev => [res, ...prev]);
    } else {
      const localTrn = {
        id: `TRN-${100 + trainers.length + 1}`,
        avatar: `https://i.pravatar.cc/150?img=${(trainers.length % 50) + 10}`,
        rating: 4.8,
        activeBatches: ['AIML-01'],
        assignedStudentsCount: 25,
        performanceScore: 90,
        status: 'Active',
        ...trainerData
      };
      setTrainers(prev => [localTrn, ...prev]);
    }
    triggerConfetti();
    showToast(`Teacher "${trainerData.name}" onboarded into Management Database!`, 'success');
  };

  // CRM Action: Convert Lead to Customer
  const convertLeadToCustomer = async (leadId) => {
    const targetLead = leads.find(l => l.id === leadId);
    if (!targetLead) return;

    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, stage: 'Won', status: 'HOT', purchaseProbability: 100 } : l));

    const res = await api.convertLead(leadId);
    if (res && res.invoice) {
      setInvoices(prev => [res.invoice, ...prev]);
      if (res.financeSummary) setFinanceSummary(res.financeSummary);
    }
    triggerConfetti();
    showToast(`Lead "${targetLead.name}" converted into active customer!`, 'success');
  };

  // Attendance & Marks Update Action
  const updateStudentAttendanceAndMarks = async (studentId, newAttendance, newAcademic) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        const updated = calculateStudentMetrics(
          newAcademic !== undefined ? newAcademic : s.academic,
          newAttendance !== undefined ? newAttendance : s.attendance,
          s.assignment,
          s.progress
        );
        return { ...s, ...updated };
      }
      return s;
    }));

    await api.updateStudentMetrics(studentId, newAttendance, newAcademic);
    showToast(`Student metrics updated and broadcast in real-time!`, 'info');
  };

  // Invoice Payment Recording Action
  const addInvoicePayment = async (invoiceId, paymentAmount) => {
    setInvoices(prev => prev.map(inv => {
      if (inv.id === invoiceId) {
        const newPaid = Math.min(inv.totalAmount, inv.paidAmount + paymentAmount);
        const newOutstanding = Math.max(0, inv.totalAmount - newPaid);
        return {
          ...inv,
          paidAmount: newPaid,
          outstandingAmount: newOutstanding,
          status: newOutstanding === 0 ? 'Fully Paid' : 'Partially Paid'
        };
      }
      return inv;
    }));

    const res = await api.recordPayment(invoiceId, paymentAmount);
    if (res && res.financeSummary) setFinanceSummary(res.financeSummary);

    triggerConfetti();
    showToast(`Payment of ₹${paymentAmount.toLocaleString()} recorded!`, 'success');
  };

  // Expense Entry Action
  const addExpense = async (newExpense) => {
    const res = await api.addExpense(newExpense);
    if (res && res.expense) {
      setExpenses(prev => [res.expense, ...prev]);
      if (res.financeSummary) setFinanceSummary(res.financeSummary);
    }
    showToast(`Expense logged and synced with database!`, 'info');
  };

  const markNotificationRead = (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  };

  return (
    <SkilloraContext.Provider value={{
      theme,
      toggleTheme,
      currentUser,
      token,
      isAuthenticated,
      loginWithCredentials,
      signupUser,
      logout,
      currentRole,
      changeRole,
      isRoleAuthModalOpen,
      setIsRoleAuthModalOpen,
      targetRoleToSwitch,
      activePage,
      navigateTo,
      selectedCustomerId,
      setSelectedCustomerId,
      selectedStudentId,
      setSelectedStudentId,
      isRealtimeActive,
      leads,
      setLeads,
      students,
      setStudents,
      courses,
      batches,
      trainers,
      invoices,
      expenses,
      financeSummary,
      notifications,
      markNotificationRead,
      addStudent,
      addTrainer,
      convertLeadToCustomer,
      updateStudentAttendanceAndMarks,
      addInvoicePayment,
      addExpense,
      isCopilotOpen,
      setIsCopilotOpen,
      isSearchOpen,
      setIsSearchOpen,
      isAddStudentOpen,
      setIsAddStudentOpen,
      isAddTrainerOpen,
      setIsAddTrainerOpen,
      demoStep,
      setDemoStep,
      toast,
      showToast,
      triggerConfetti
    }}>
      {children}
    </SkilloraContext.Provider>
  );
};

export const useSkillora = () => useContext(SkilloraContext);
