import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { DemoRoleBar } from './components/common/DemoRoleBar';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { ToastContainer } from './components/common/ToastContainer';

// Module Pages
import { InstitutionDashboardPage } from './pages/InstitutionDashboardPage';
import { FarmersPage } from './pages/FarmersPage';
import { FarmParcelsPage } from './pages/FarmParcelsPage';
import { SoilIntelligencePage } from './pages/SoilIntelligencePage';
import { WeatherIntelligencePage } from './pages/WeatherIntelligencePage';
import { CropIntelligencePage } from './pages/CropIntelligencePage';
import { ResourcePlannerPage } from './pages/ResourcePlannerPage';
import { MarketIntelligencePage } from './pages/MarketIntelligencePage';
import { ProfitAnalysisPage } from './pages/ProfitAnalysisPage';
import { ExpertReviewPage } from './pages/ExpertReviewPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';
import { GovernmentSchemesPage } from './pages/GovernmentSchemesPage';
import { FarmerPortalPage } from './pages/FarmerPortalPage';
import { ResearchLibraryPage } from './pages/ResearchLibraryPage';

const AppLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { role } = useApp();
  const location = useLocation();

  const isFarmerRoute = location.pathname === '/farmer-view';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      {/* Demo Access Mode Banner (Evaluation Only) */}
      <DemoRoleBar />

      {/* Main Top Bar Contract Header */}
      <Header
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Notification Toasts */}
      <ToastContainer />

      {/* Body Layout: Sidebar + Main Content */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Navigation Sidebar (hidden on mobile unless opened) */}
        {!isFarmerRoute && (
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <main
          className={`flex-1 p-4 sm:p-6 lg:p-8 min-w-0 transition-all ${
            isFarmerRoute ? 'max-w-4xl mx-auto' : ''
          }`}
        >
          <Routes>
            <Route path="/" element={<InstitutionDashboardPage />} />
            <Route path="/farmers" element={<FarmersPage />} />
            <Route path="/farms" element={<FarmParcelsPage />} />
            <Route path="/soil" element={<SoilIntelligencePage />} />
            <Route path="/weather" element={<WeatherIntelligencePage />} />
            <Route path="/crops" element={<CropIntelligencePage />} />
            <Route path="/research" element={<ResearchLibraryPage />} />
            <Route path="/resources" element={<ResourcePlannerPage />} />
            <Route path="/market" element={<MarketIntelligencePage />} />
            <Route path="/profit" element={<ProfitAnalysisPage />} />
            <Route path="/review" element={<ExpertReviewPage />} />
            <Route path="/schemes" element={<GovernmentSchemesPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/farmer-view" element={<FarmerPortalPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      {/* Quiet Institutional Footer */}
      <footer className="no-print border-t border-slate-200 bg-white py-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div>
            <span className="font-semibold text-slate-700">Annadatha Platform</span> · Pilot Deployment at Gudlavalleru Hub (Krishna District, AP).
          </div>
          <div className="text-[11px] text-slate-400">
            Demo data — not official data · Scalable pan-India architecture
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppLayout />
      </AppProvider>
    </BrowserRouter>
  );
}
