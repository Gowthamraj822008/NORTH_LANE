import React, { useState } from 'react';
import {
  Menu,
  Sparkles,
  Target,
  Compass,
  RefreshCw,
  Bell,
  Briefcase,
  ShieldCheck,
  Building,
  User,
  CheckCircle2,
  Upload
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NotificationsPopover } from './NotificationsPopover';
import { ResumeUploadModal } from './ResumeUploadModal';
import { UserPersona } from '../types';

interface HeaderProps {
  onToggleMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileMenu }) => {
  const {
    activePage,
    setActivePage,
    profile,
    readiness,
    roadmapProgress,
    resetAllData,
    notifications,
    currentPersona,
    setCurrentPersona,
    bookmarkedInternshipIds,
    applications
  } = useApp();

  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const getPageTitle = () => {
    switch (activePage) {
      case 'dashboard':
        return 'Student Career Dashboard';
      case 'profile':
        return 'Student Profile & Background';
      case 'target-role':
        return 'Target Role Selection & Benchmark';
      case 'assessment':
        return 'Interactive Skill Assessment';
      case 'skill-gap':
        return 'Skill Gap Analysis & Diagnostics';
      case 'roadmap':
        return 'Personalized Learning Roadmap';
      case 'readiness':
        return 'Placement Readiness Score';
      case 'progress':
        return 'Roadmap Progress Tracking';
      case 'saved-internships':
        return 'Saved & Bookmarked Opportunities';
      case 'internships':
        return 'Internship & Job Match Browser';
      case 'applications':
        return 'My Internship Applications';
      case 'organization-portal':
        return 'Organization Employer Portal';
      case 'admin-dashboard':
        return 'Superadmin Console & Governance';
      case 'settings':
        return 'Platform Settings';
      default:
        return 'NorthLane Platform';
    }
  };

  return (
    <header className="sticky top-0 z-30 h-12 border-b border-[#2D3139] flex items-center justify-between px-3 sm:px-4 bg-[#16191E] shrink-0 font-sans">
      <div className="flex items-center gap-2.5 min-w-0">
        {/* Mobile menu toggle */}
        <button
          id="mobile-menu-toggle-btn"
          onClick={onToggleMobileMenu}
          className="p-1.5 rounded text-[#8A919B] hover:text-white hover:bg-[#1E2228] lg:hidden focus:outline-hidden border border-[#2D3139]"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 truncate">
          <div className="w-2 h-2 rounded-full bg-green-500 hidden sm:block shrink-0" />
          <h1 className="text-xs sm:text-sm font-bold text-white tracking-tight font-mono uppercase truncate">
            {getPageTitle()}
          </h1>
          <span className="hidden md:inline-block px-1.5 py-0.5 text-[9px] font-mono rounded bg-[#1E2228] text-[#8A919B] border border-[#2D3139]">
            {profile.branch.split(' ')[0]}_{profile.graduationYear}
          </span>
        </div>
      </div>

      {/* Right controls - High Density Compact Tools */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        {/* Persona Switcher Dropdown */}
        <div className="flex items-center gap-1 bg-[#111418] border border-[#2D3139] rounded px-1.5 py-0.5 font-mono text-[11px]">
          <span className="text-[10px] text-[#8A919B] hidden sm:inline uppercase">ROLE:</span>
          <select
            id="persona-switcher-select"
            value={currentPersona}
            onChange={e => {
              const newPersona = e.target.value as UserPersona;
              setCurrentPersona(newPersona);
              if (newPersona === 'organization') setActivePage('organization-portal');
              if (newPersona === 'admin') setActivePage('admin-dashboard');
              if (newPersona === 'student' && (activePage === 'organization-portal' || activePage === 'admin-dashboard')) {
                setActivePage('dashboard');
              }
            }}
            className="bg-transparent text-white font-bold focus:outline-hidden text-xs cursor-pointer"
          >
            <option value="student">Student / Candidate</option>
            <option value="organization">Hiring Organization</option>
            <option value="admin">Platform Superadmin</option>
          </select>
        </div>

        {/* Target role pill (Student view) */}
        {currentPersona === 'student' && (
          <div
            onClick={() => setActivePage('target-role')}
            className="hidden xl:flex items-center gap-1.5 px-2 py-1 rounded bg-[#0F1115] border border-[#2D3139] hover:border-[#3B82F6]/50 cursor-pointer transition-colors text-[11px] font-mono"
            title="Click to change target role"
          >
            <Target className="w-3 h-3 text-[#3B82F6]" />
            <span className="text-[#8A919B]">ROLE:</span>
            <span className="font-semibold text-white">{profile.targetRole.toUpperCase()}</span>
          </div>
        )}

        {/* Readiness Pill (Student view) */}
        {currentPersona === 'student' && (
          <div
            onClick={() => setActivePage('readiness')}
            className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded bg-[#1E2228] border border-[#3B82F6]/40 cursor-pointer hover:border-[#3B82F6] transition-all text-[11px] font-mono"
            title="View detailed placement readiness"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[#8A919B]">SCORE:</span>
            <span className="font-bold text-white">
              {readiness.overallScore}
              <span className="text-[#8A919B] text-[9px] font-normal">/100</span>
            </span>
          </div>
        )}

        {/* Quick Resume Upload Button */}
        <button
          id="header-resume-upload-btn"
          onClick={() => setIsResumeModalOpen(true)}
          className="flex items-center gap-1 px-2 py-1 rounded bg-[#1E2228] hover:bg-[#282D36] text-[#3B82F6] border border-[#3B82F6]/40 text-[11px] font-mono font-bold"
          title="Upload or Parse Resume"
        >
          <Upload className="w-3 h-3" />
          <span className="hidden sm:inline">RESUME</span>
        </button>

        {/* Notifications Popover Bell */}
        <NotificationsPopover />

        {/* Switch to Landing Page or Reset */}
        <div className="flex items-center gap-1">
          <button
            id="header-landing-btn"
            onClick={() => setActivePage(activePage === 'landing' ? 'dashboard' : 'landing')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono font-medium bg-[#3B82F6] hover:bg-[#2563EB] text-white transition-colors border border-[#3B82F6]"
          >
            {activePage === 'landing' ? (
              <>
                <Compass className="w-3 h-3" />
                <span>WORKSPACE</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3 h-3" />
                <span className="hidden sm:inline">LANDING</span>
              </>
            )}
          </button>

          <button
            id="header-reset-btn"
            onClick={() => {
              if (window.confirm('Reset sample student data to default Gowtham R (Data Engineer @ Amazon)?')) {
                resetAllData();
              }
            }}
            className="p-1 rounded text-[#8A919B] hover:text-white hover:bg-[#1E2228] border border-[#2D3139] transition-colors"
            title="Reset to default sample data"
            aria-label="Reset to default demo data"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Global Resume Upload Modal */}
      <ResumeUploadModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </header>
  );
};
