import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { DashboardView } from './components/DashboardView';
import { ProfileView } from './components/ProfileView';
import { TargetRoleView } from './components/TargetRoleView';
import { SkillAssessmentView } from './components/SkillAssessmentView';
import { SkillGapAnalysisView } from './components/SkillGapAnalysisView';
import { RoadmapView } from './components/RoadmapView';
import { PlacementReadinessView } from './components/PlacementReadinessView';
import { ProgressView } from './components/ProgressView';
import { SettingsView } from './components/SettingsView';
import { InternshipBrowserView } from './components/InternshipBrowserView';
import { ApplicationTrackingView } from './components/ApplicationTrackingView';
import { OrganizationPortalView } from './components/OrganizationPortalView';
import { AdminDashboardView } from './components/AdminDashboardView';

const MainAppContent: React.FC = () => {
  const { activePage } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // If user selected Landing Page, render the dedicated high-impact Landing Page
  if (activePage === 'landing') {
    return <LandingPage />;
  }

  // Render the SaaS Application Workspace
  const renderActiveView = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardView />;
      case 'internships':
        return <InternshipBrowserView />;
      case 'applications':
        return <ApplicationTrackingView />;
      case 'organization-portal':
        return <OrganizationPortalView />;
      case 'admin-dashboard':
        return <AdminDashboardView />;
      case 'profile':
        return <ProfileView />;
      case 'target-role':
        return <TargetRoleView />;
      case 'assessment':
        return <SkillAssessmentView />;
      case 'skill-gap':
        return <SkillGapAnalysisView />;
      case 'roadmap':
        return <RoadmapView />;
      case 'readiness':
        return <PlacementReadinessView />;
      case 'progress':
        return <ProgressView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1115] text-[#E0E0E0] font-sans flex">
      {/* Left Sidebar */}
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top Header */}
        <Header onToggleMobileMenu={() => setMobileSidebarOpen(prev => !prev)} />

        {/* Page Content Body - High Density Layout */}
        <main className="flex-1 px-3 sm:px-6 py-4 overflow-y-auto bg-[#0F1115]">
          {renderActiveView()}
        </main>

        {/* High Density IDE Telemetry Footer */}
        <footer className="h-8 bg-[#111418] border-t border-[#2D3139] px-4 flex items-center justify-between text-[10px] text-[#8A919B] shrink-0 font-mono select-none">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ENGINE: ACTIVE
            </span>
            <span className="hidden md:inline">SYSTEM: NORTHLANE v2.4</span>
            <span className="hidden sm:inline text-[#4B5563]">|</span>
            <span className="hidden sm:inline">AI ATS: MULTI-ENTITY</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden lg:inline text-[#4B5563]">UTF-8 • SPACES: 2</span>
            <span className="text-[#8A919B]">
              POWERED BY <strong className="text-[#3B82F6]">NORYX TECHNOLOGIES</strong>
            </span>
            <div className="w-20 h-1.5 bg-[#1E2228] rounded-full overflow-hidden border border-[#2D3139] hidden sm:block">
              <div className="h-full bg-[#3B82F6] w-[75%]" />
            </div>
            <span className="text-[#4B5563] hidden sm:inline">MEM: 242MB</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
