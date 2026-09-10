// Unified API Client for SKILLORA Single Web Application Presentation

const getApiBaseUrl = () => {
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    return `${window.location.origin}/api`;
  }
  return 'http://localhost:5005/api';
};

const API_BASE_URL = getApiBaseUrl();

export const api = {
  checkHealth: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  login: async (email, password, role) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }
      return data;
    } catch (e) {
      throw e;
    }
  },

  signup: async ({ name, email, password, role, organization }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role, organization })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Sign up failed');
      }
      return data;
    } catch (e) {
      throw e;
    }
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
