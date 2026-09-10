import React from 'react';
import { SkilloraProvider, useSkillora } from './context/SkilloraContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { NotificationCenter } from './components/common/NotificationCenter';
import { DemoFlowBanner } from './components/common/DemoFlowBanner';
import { AICopilotModal } from './components/ai/AICopilotModal';
import { AddStudentModal } from './components/modals/AddStudentModal';
import { AddTrainerModal } from './components/modals/AddTrainerModal';
import { RoleAuthModal } from './components/modals/RoleAuthModal';

// Pages
import { LoginLanding } from './pages/LoginLanding';
import { ManagementDashboard } from './pages/ManagementDashboard';
import { CRMPage } from './pages/CRMPage';
import { Customer360Page } from './pages/Customer360Page';
import { OperationsPage } from './pages/OperationsPage';
import { StudentIntelligencePage } from './pages/StudentIntelligencePage';
import { TrainerPortalPage } from './pages/TrainerPortalPage';
import { StudentPortalPage } from './pages/StudentPortalPage';
import { ParentPortalPage } from './pages/ParentPortalPage';
import { FinancePage } from './pages/FinancePage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AdminPage } from './pages/AdminPage';

import { CheckCircle2, Info } from 'lucide-react';

const MainLayout = () => {
  const { activePage, toast, isAddStudentOpen, setIsAddStudentOpen, isAddTrainerOpen, setIsAddTrainerOpen } = useSkillora();

  if (activePage === 'login') {
    return <LoginLanding />;
  }

  const renderPage = () => {
    switch (activePage) {
      case 'crm': return <CRMPage />;
      case 'customer360': return <Customer360Page />;
      case 'operations': return <OperationsPage />;
      case 'students': return <StudentIntelligencePage />;
      case 'trainer_portal': return <TrainerPortalPage />;
      case 'student_portal': return <StudentPortalPage />;
      case 'parent_portal': return <ParentPortalPage />;
      case 'finance': return <FinancePage />;
      case 'analytics': return <AnalyticsPage />;
      case 'admin': return <AdminPage />;
      case 'dashboard':
      default:
        return <ManagementDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-[#0b0f19] text-gray-100 overflow-hidden font-sans">
      {/* Role-Filtered Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto relative">
        {/* Global Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 pb-16">
          {renderPage()}
        </main>

        {/* Global Modals & Overlay Drawers */}
        <AICopilotModal />
        <GlobalSearchModal />
        <NotificationCenter />
        <RoleAuthModal />
        <AddStudentModal isOpen={isAddStudentOpen} onClose={() => setIsAddStudentOpen(false)} />
        <AddTrainerModal isOpen={isAddTrainerOpen} onClose={() => setIsAddTrainerOpen(false)} />

        {/* Toast Notification Container */}
        {toast && (
          <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom duration-250">
            <div className={`px-4 py-3 rounded-2xl shadow-2xl border flex items-center space-x-2.5 text-xs font-bold ${
              toast.type === 'success' ? 'bg-emerald-950/95 border-emerald-500/50 text-emerald-300' :
              toast.type === 'error' ? 'bg-rose-950/95 border-rose-500/50 text-rose-300' :
              'bg-indigo-950/95 border-indigo-500/50 text-indigo-300'
            }`}>
              {toast.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Info className="w-4 h-4 text-indigo-400" />}
              <span>{toast.message}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <SkilloraProvider>
      <MainLayout />
    </SkilloraProvider>
  );
}
