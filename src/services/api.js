// Unified API Client for SKILLORA Single Web Application Presentation

const getApiBaseUrl = () => {
  if (typeof window !== 'undefined' && window.location) {
    const { origin, port, hostname } = window.location;
    if (port === '5005' || (!hostname.includes('localhost') && !hostname.includes('127.0.0.1'))) {
      return `${origin}/api`;
    }
  }
  return 'http://localhost:5005/api';
};

const API_BASE_URL = getApiBaseUrl();

// Local Browser Database Fallback for Standalone SPA Mode
const getLocalUsers = () => {
  try {
    const raw = localStorage.getItem('skillora_db_users');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

const saveLocalUser = (user) => {
  const users = getLocalUsers();
  users.push(user);
  localStorage.setItem('skillora_db_users', JSON.stringify(users));
};

export const api = {
  checkHealth: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      if (res.ok) return await res.json();
      return null;
    } catch (e) {
      return null;
    }
  },

  login: async (email, password, role) => {
    const cleanEmail = (email || '').toLowerCase().trim();
    if (!cleanEmail) {
      throw new Error('Email address is required.');
    }

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password, role })
      });
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        return await res.json();
      }
      if (!res.ok && contentType.includes('application/json')) {
        const data = await res.json();
        throw new Error(data.error || 'Login failed');
      }
    } catch (e) {
      if (e.message && !e.message.includes('string did not match') && !e.message.includes('JSON') && !e.message.includes('Failed to fetch')) {
        throw e;
      }
    }

    // Fallback: Check against registered local database users and seed accounts
    const localUsers = getLocalUsers();
    const registeredSeedEmails = [
      'manager@skillora.demo', 'sales@skillora.demo', 'ops@skillora.demo',
      'trainer@skillora.demo', 'finance@skillora.demo', 'student@skillora.demo',
      'parent@skillora.demo', 'admin@skillora.demo',
      'aarav.s@gmail.com', 'rahul.verma@gmail.com', 'sneha.r@gmail.com',
      'karan.p@gmail.com', 'ananya.d@gmail.com', 'rohan.g@gmail.com',
      'meera.nair@gmail.com', 'aditya.roy@gmail.com'
    ];

    const foundLocal = localUsers.find(u => u.email.toLowerCase() === cleanEmail);
    const isSeedRegistered = registeredSeedEmails.includes(cleanEmail);

    if (!foundLocal && !isSeedRegistered) {
      throw new Error(`No registered account found with email "${email}". Only registered emails can log into the portal. Please check your email or sign up.`);
    }

    const userObj = foundLocal || {
      id: `USR-${Date.now()}`,
      name: `${role || 'Registered'} User`,
      email: cleanEmail,
      role: role || 'MANAGEMENT',
      organization: 'Apex EduTech Global'
    };

    return {
      success: true,
      token: `skl_token_${btoa(JSON.stringify(userObj))}`,
      user: userObj
    };
  },

  forgotPassword: async (email) => {
    const cleanEmail = (email || '').toLowerCase().trim();
    if (!cleanEmail) {
      throw new Error('Email address is required.');
    }

    try {
      const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail })
      });
      if (res.ok) return await res.json();
      const data = await res.json();
      if (data && data.error) throw new Error(data.error);
    } catch (e) {
      if (e.message && !e.message.includes('Failed to fetch') && !e.message.includes('JSON')) {
        throw e;
      }
    }

    // Fallback: Verify registered email
    const localUsers = getLocalUsers();
    const registeredSeedEmails = [
      'manager@skillora.demo', 'sales@skillora.demo', 'ops@skillora.demo',
      'trainer@skillora.demo', 'finance@skillora.demo', 'student@skillora.demo',
      'parent@skillora.demo', 'admin@skillora.demo',
      'aarav.s@gmail.com', 'rahul.verma@gmail.com', 'sneha.r@gmail.com',
      'karan.p@gmail.com', 'ananya.d@gmail.com', 'rohan.g@gmail.com',
      'meera.nair@gmail.com', 'aditya.roy@gmail.com'
    ];

    const isRegistered = localUsers.some(u => u.email.toLowerCase() === cleanEmail) || registeredSeedEmails.includes(cleanEmail);

    if (!isRegistered) {
      throw new Error(`No registered account found with email "${email}". Only registered emails can reset passwords.`);
    }

    return {
      success: true,
      message: `Password reset link dispatched to ${email}`,
      email: cleanEmail,
      resetToken: `rst_${Date.now()}`
    };
  },

  resetPassword: async (email, newPassword, resetToken) => {
    const cleanEmail = (email || '').toLowerCase().trim();
    try {
      const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, newPassword, resetToken })
      });
      if (res.ok) return await res.json();
      const data = await res.json();
      if (data && data.error) throw new Error(data.error);
    } catch (e) {
      if (e.message && !e.message.includes('Failed to fetch') && !e.message.includes('JSON')) {
        throw e;
      }
    }

    return {
      success: true,
      message: `Password for ${cleanEmail} updated successfully!`
    };
  },

  signup: async ({ name, email, password, role, organization }) => {
    const cleanEmail = (email || '').toLowerCase().trim();
    try {
      const res = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email: cleanEmail, password, role, organization })
      });
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        return await res.json();
      }
      if (!res.ok && contentType.includes('application/json')) {
        const data = await res.json();
        throw new Error(data.error || 'Sign up failed');
      }
    } catch (e) {
      if (e.message && !e.message.includes('string did not match') && !e.message.includes('JSON') && !e.message.includes('Failed to fetch')) {
        throw e;
      }
    }

    // Fallback: Register user in local database storage
    const localUsers = getLocalUsers();
    const existing = localUsers.find(u => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      throw new Error('An account with this email address already exists. Please log in.');
    }

    const newUser = {
      id: `USR-${Date.now()}`,
      name: name || 'Registered User',
      email: cleanEmail,
      role: role || 'MANAGEMENT',
      organization: organization || 'Apex EduTech Global',
      createdAt: new Date().toISOString()
    };

    saveLocalUser(newUser);

    return {
      success: true,
      token: `skl_token_${btoa(JSON.stringify(newUser))}`,
      user: newUser
    };
  },

  getMe: async (token) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) return null;
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  getLeads: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/leads`);
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  convertLead: async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/leads/${id}/convert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  getStudents: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/students`);
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  addStudent: async (studentData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData)
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  addTrainer: async (trainerData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/trainers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trainerData)
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  updateStudentMetrics: async (id, attendance, academic) => {
    try {
      const res = await fetch(`${API_BASE_URL}/students/${id}/metrics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attendance, academic })
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  updateStudentProfile: async (id, profileData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/students/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  deleteStudent: async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/students/${id}`, {
        method: 'DELETE'
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  getFinanceSummary: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/summary`);
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  recordPayment: async (invoiceId, amount) => {
    try {
      const res = await fetch(`${API_BASE_URL}/invoices/${invoiceId}/pay`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  addExpense: async (expenseData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expenseData)
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  askCopilot: async (question) => {
    try {
      const res = await fetch(`${API_BASE_URL}/ai/copilot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  }
};
