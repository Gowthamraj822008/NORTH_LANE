import React from 'react';
import {
  LayoutDashboard,
  UserCheck,
  Target,
  ClipboardCheck,
  Layers,
  MapPin,
  Award,
  TrendingUp,
  Settings,
  Compass,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Briefcase,
  FileCheck2,
  Building,
  Upload,
  Bookmark
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ActivePage, UserPersona } from '../types';

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const {
    activePage,
    setActivePage,
    profile,
    readiness,
    roadmapProgress,
    internships,
    applications,
    currentPersona,
    setCurrentPersona,
    bookmarkedInternshipIds,
    currentOrganization
  } = useApp();

  const handleNavClick = (pageId: ActivePage) => {
    setActivePage(pageId);
    setMobileOpen(false);
  };

  const studentNavItems: {
    id: ActivePage;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }[] = [
    { id: 'dashboard', label: 'Career Dashboard', icon: LayoutDashboard },
    { id: 'internships', label: 'Internships & Jobs', icon: Briefcase, badge: `${internships.length}` },
    { id: 'saved-internships', label: 'Saved Internships', icon: Bookmark, badge: bookmarkedInternshipIds.length ? `${bookmarkedInternshipIds.length}` : undefined },
    { id: 'applications', label: 'My Applications', icon: FileCheck2, badge: `${applications.length}` },
    { id: 'skill-gap', label: 'Skill Gap Analysis', icon: Layers, badge: 'AI Fit' },
    { id: 'profile', label: 'Profile & Resume', icon: UserCheck, badge: profile.resume?.atsScore ? `ATS ${profile.resume.atsScore}` : undefined },
    { id: 'roadmap', label: 'Learning Roadmap', icon: MapPin, badge: `${roadmapProgress}%` },
    { id: 'assessment', label: 'Skill Assessment', icon: ClipboardCheck },
    { id: 'target-role', label: 'Target Benchmark', icon: Target, badge: profile.targetRole.split(' ')[0] },
    { id: 'readiness', label: 'Placement Readiness', icon: Award, badge: `${readiness.overallScore}/100` },
    { id: 'progress', label: 'Progress Tracking', icon: TrendingUp },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 flex flex-col bg-[#111418] border-r border-[#2D3139] transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-3 bg-[#16191E] border-b border-[#2D3139]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[#3B82F6] flex items-center justify-center shadow-sm text-white font-bold shrink-0">
                <Compass className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold tracking-tight text-white font-mono">
                    NORTHLANE
                  </span>
                  <span className="px-1 py-0.2 rounded bg-[#1E2228] text-[#8A919B] text-[8px] border border-[#2D3139] font-mono">
                    AI ATS
                  </span>
                </div>
              </div>
            </div>

            {/* Persona Indicator Badge */}
            <span
              className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold uppercase border ${
                currentPersona === 'student'
                  ? 'bg-blue-500/20 text-[#3B82F6] border-blue-500/30'
                  : currentPersona === 'organization'
                  ? 'bg-green-500/20 text-green-400 border-green-500/30'
                  : 'bg-red-500/20 text-red-400 border-red-500/30'
              }`}
            >
              {currentPersona}
            </span>
          </div>

          {/* Quick Target Indicator */}
          <div className="mt-2.5 p-2 rounded bg-[#0F1115] border border-[#2D3139] flex items-center justify-between text-[11px] font-mono">
            {currentPersona === 'organization' ? (
              <div className="flex items-center gap-2 min-w-0">
                <img
                  src={currentOrganization.logo}
                  alt={currentOrganization.name}
                  className="w-5 h-5 rounded object-cover shrink-0"
                />
                <div className="truncate">
                  <span className="text-[#8A919B] block text-[9px] uppercase">ACTIVE EMPLOYER</span>
                  <span className="font-semibold text-white truncate block text-[11px]">
                    {currentOrganization.name}
                  </span>
                </div>
              </div>
            ) : currentPersona === 'admin' ? (
              <div className="flex items-center gap-1.5 min-w-0">
                <ShieldCheck className="w-4 h-4 text-red-400 shrink-0" />
                <div className="truncate">
                  <span className="text-[#8A919B] block text-[9px] uppercase">SUPERADMIN ACCESS</span>
                  <span className="font-semibold text-white truncate block text-[11px]">
                    SYSTEM CONSOLE
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0 animate-pulse" />
                <div className="truncate">
                  <span className="text-[#8A919B] block text-[9px] uppercase tracking-wider">TARGET ROLE</span>
                  <span className="font-semibold text-white truncate block text-[11px]">{profile.targetRole}</span>
                </div>
              </div>
            )}

            {currentPersona === 'student' && (
              <span className="text-[9px] text-[#3B82F6] font-semibold px-1.5 py-0.5 rounded bg-[#1E2228] border border-[#2D3139] shrink-0">
                @{profile.targetCompany || 'TECH'}
              </span>
            )}
          </div>
        </div>

        {/* Navigation links */}
        <div className="flex-1 overflow-y-auto px-2 py-2.5 space-y-1 font-mono">
          {/* Section: Student Workspace */}
          <div className="px-2 pb-1 text-[10px] font-bold text-[#4B5563] tracking-widest uppercase">
            Candidate Core
          </div>

          {studentNavItems.map(item => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                id={`nav-btn-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-[11px] transition-all group ${
                  isActive
                    ? 'bg-[#1E2228] border border-[#3B82F6]/50 text-white font-medium shadow-xs'
                    : 'text-[#8A919B] hover:text-[#E0E0E0] hover:bg-[#16191E] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon
                    className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                      isActive ? 'text-[#3B82F6]' : 'text-[#8A919B] group-hover:text-[#3B82F6]'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                        isActive
                          ? 'bg-[#3B82F6]/20 text-[#3B82F6] border border-[#3B82F6]/30'
                          : 'bg-[#16191E] text-[#8A919B] border border-[#2D3139]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-3 h-3 text-[#3B82F6]" />}
                </div>
              </button>
            );
          })}

          {/* Section: Enterprise & Admin Management */}
          <div className="pt-3 px-2 pb-1 text-[10px] font-bold text-[#4B5563] tracking-widest uppercase">
            Enterprise &amp; Admin
          </div>

          <button
            id="nav-btn-org-portal"
            onClick={() => handleNavClick('organization-portal')}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-[11px] transition-all group ${
              activePage === 'organization-portal'
                ? 'bg-[#1E2228] border border-green-500/50 text-white font-medium'
                : 'text-[#8A919B] hover:text-[#E0E0E0] hover:bg-[#16191E] border border-transparent'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Building className="w-3.5 h-3.5 text-green-400" />
              <span>Organization Portal</span>
            </div>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-green-500/10 text-green-400 border border-green-500/20">
              Employer
            </span>
          </button>

          <button
            id="nav-btn-admin-dash"
            onClick={() => handleNavClick('admin-dashboard')}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-[11px] transition-all group ${
              activePage === 'admin-dashboard'
                ? 'bg-[#1E2228] border border-red-500/50 text-white font-medium'
                : 'text-[#8A919B] hover:text-[#E0E0E0] hover:bg-[#16191E] border border-transparent'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
              <span>Admin Dashboard</span>
            </div>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-red-500/10 text-red-400 border border-red-500/20">
              Admin
            </span>
          </button>

          {/* Section: Platform Settings */}
          <div className="pt-3 px-2 pb-1 text-[10px] font-bold text-[#4B5563] tracking-widest uppercase">
            System
          </div>

          <button
            id="nav-btn-landing"
            onClick={() => handleNavClick('landing')}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-[11px] transition-all group ${
              activePage === 'landing'
                ? 'bg-[#1E2228] border border-[#3B82F6]/50 text-white'
                : 'text-[#8A919B] hover:text-[#E0E0E0] hover:bg-[#16191E] border border-transparent'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Landing Page</span>
            </div>
            <ExternalLink className="w-3 h-3 text-[#4B5563] group-hover:text-purple-400" />
          </button>

          <button
            id="nav-btn-settings"
            onClick={() => handleNavClick('settings')}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-[11px] transition-all group ${
              activePage === 'settings'
                ? 'bg-[#1E2228] border border-[#3B82F6]/50 text-white'
                : 'text-[#8A919B] hover:text-[#E0E0E0] hover:bg-[#16191E] border border-transparent'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Settings className="w-3.5 h-3.5 text-[#8A919B] group-hover:text-[#E0E0E0]" />
              <span>Settings &amp; Config</span>
            </div>
          </button>
        </div>

        {/* Student Profile Card Footer */}
        <div className="p-3 border-t border-[#2D3139] bg-[#111418]">
          <div
            onClick={() => handleNavClick('profile')}
            className="flex items-center gap-2.5 p-1.5 rounded hover:bg-[#16191E] border border-transparent hover:border-[#2D3139] cursor-pointer transition-colors"
          >
            <div className="w-7 h-7 rounded bg-[#1E2228] border border-[#2D3139] flex items-center justify-center font-mono font-bold text-white text-[11px] text-[#3B82F6]">
              {profile.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0 font-mono">
              <p className="text-[11px] font-bold text-white truncate">{profile.name}</p>
              <p className="text-[9px] text-[#8A919B] truncate">
                {profile.degree} • CLASS {profile.graduationYear}
              </p>
            </div>
          </div>

          <div className="mt-2 pt-2 border-t border-[#2D3139] flex items-center justify-between text-[10px] text-[#4B5563] font-mono">
            <span className="flex items-center gap-1 text-green-500">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              SYSTEM ACTIVE
            </span>
            <span className="text-[#8A919B]">NORTHLANE</span>
          </div>
        </div>
      </aside>
    </>
  );
};
