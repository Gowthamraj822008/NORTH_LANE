import React, { useState } from 'react';
import {
  ShieldCheck,
  Building,
  Briefcase,
  Users,
  CheckCircle2,
  XCircle,
  Star,
  Trash2,
  Activity,
  Award,
  Sparkles,
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminDashboardView: React.FC = () => {
  const {
    organizations,
    toggleOrganizationVerification,
    internships,
    updateInternship,
    deleteInternship,
    applications
  } = useApp();

  const [activeTab, setActiveTab] = useState<'orgs' | 'listings' | 'audit'>('orgs');
  const [searchQuery, setSearchQuery] = useState('');

  // Metrics
  const totalOrgs = organizations.length;
  const verifiedOrgs = organizations.filter(o => o.isVerified).length;
  const totalListings = internships.length;
  const totalApps = applications.length;
  const avgCompatibility = Math.round(
    applications.reduce((acc, a) => acc + a.compatibilityScore, 0) / Math.max(1, applications.length)
  );

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2D3139] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-white tracking-wider uppercase">
              NORTHLANE PLATFORM ADMINISTRATION
            </h1>
            <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-bold">
              SUPERADMIN CONSOLE
            </span>
          </div>
          <p className="text-[#8A919B] text-xs mt-1">
            Institutional verification, employer audit governance, and marketplace moderation
          </p>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="p-3 rounded bg-[#16191E] border border-[#2D3139]">
          <span className="text-[10px] text-[#8A919B] uppercase block">ORGANIZATIONS</span>
          <div className="text-xl font-bold text-white mt-1">{totalOrgs}</div>
          <span className="text-[9px] text-green-400">{verifiedOrgs} Verified</span>
        </div>

        <div className="p-3 rounded bg-[#16191E] border border-[#2D3139]">
          <span className="text-[10px] text-[#8A919B] uppercase block">ACTIVE LISTINGS</span>
          <div className="text-xl font-bold text-white mt-1">{totalListings}</div>
          <span className="text-[9px] text-[#3B82F6]">Across 6 Categories</span>
        </div>

        <div className="p-3 rounded bg-[#16191E] border border-[#2D3139]">
          <span className="text-[10px] text-[#8A919B] uppercase block">APPLICATIONS</span>
          <div className="text-xl font-bold text-white mt-1">{totalApps}</div>
          <span className="text-[9px] text-purple-400">Transmitted</span>
        </div>

        <div className="p-3 rounded bg-[#16191E] border border-[#2D3139]">
          <span className="text-[10px] text-[#8A919B] uppercase block">AVG MATCH SCORE</span>
          <div className="text-xl font-bold text-green-400 mt-1">{avgCompatibility}%</div>
          <span className="text-[9px] text-[#8A919B]">Algorithmic Fit</span>
        </div>

        <div className="p-3 rounded bg-[#16191E] border border-[#2D3139]">
          <span className="text-[10px] text-[#8A919B] uppercase block">SYSTEM STATUS</span>
          <div className="text-xl font-bold text-green-400 mt-1">99.98%</div>
          <span className="text-[9px] text-[#8A919B]">All Nodes Healthy</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#2D3139] gap-6 text-xs">
        <button
          onClick={() => setActiveTab('orgs')}
          className={`pb-2.5 font-bold transition-colors flex items-center gap-2 ${
            activeTab === 'orgs'
              ? 'text-[#3B82F6] border-b-2 border-[#3B82F6]'
              : 'text-[#8A919B] hover:text-white'
          }`}
        >
          <Building className="w-3.5 h-3.5" />
          <span>EMPLOYER_VERIFICATION_QUEUE ({organizations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('listings')}
          className={`pb-2.5 font-bold transition-colors flex items-center gap-2 ${
            activeTab === 'listings'
              ? 'text-[#3B82F6] border-b-2 border-[#3B82F6]'
              : 'text-[#8A919B] hover:text-white'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>LISTINGS_MODERATION ({internships.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`pb-2.5 font-bold transition-colors flex items-center gap-2 ${
            activeTab === 'audit'
              ? 'text-[#3B82F6] border-b-2 border-[#3B82F6]'
              : 'text-[#8A919B] hover:text-white'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>SYSTEM_AUDIT_LOG</span>
        </button>
      </div>

      {/* TAB 1: EMPLOYER VERIFICATION */}
      {activeTab === 'orgs' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-[#8A919B]">
              Only verified organizations receive institutional placement access and applicant contact feeds.
            </p>
          </div>

          <div className="space-y-2.5">
            {organizations.map(org => (
              <div
                key={org.id}
                className="p-3.5 rounded bg-[#16191E] border border-[#2D3139] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={org.logo}
                    alt={org.name}
                    className="w-10 h-10 rounded border border-[#2D3139] object-cover bg-white/5 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{org.name}</span>
                      {org.isVerified ? (
                        <span className="px-1.5 py-0.2 rounded bg-green-500/20 text-green-400 border border-green-500/30 text-[9px] font-bold">
                          VERIFIED
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[9px] font-bold">
                          PENDING VERIFICATION
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[#8A919B] mt-0.5">
                      {org.industry} • {org.location} • {org.contactEmail}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  {org.isVerified ? (
                    <button
                      onClick={() => toggleOrganizationVerification(org.id, false)}
                      className="px-3 py-1 rounded bg-[#111418] hover:bg-[#1E2228] text-red-400 border border-red-500/30 text-xs font-bold"
                    >
                      REVOKE_VERIFICATION
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleOrganizationVerification(org.id, true)}
                      className="px-3 py-1 rounded bg-green-600 hover:bg-green-500 text-white text-xs font-bold flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>APPROVE_VERIFY</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: LISTINGS MODERATION */}
      {activeTab === 'listings' && (
        <div className="space-y-3">
          <div className="space-y-2.5">
            {internships.map(internship => (
              <div
                key={internship.id}
                className="p-3.5 rounded bg-[#16191E] border border-[#2D3139] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{internship.title}</span>
                    {internship.isFeatured && (
                      <span className="px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[9px] font-bold">
                        FEATURED
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-[#8A919B] mt-0.5">
                    {internship.organizationName} • {internship.stipend} • {internship.applicantsCount} Applicants
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => updateInternship(internship.id, { isFeatured: !internship.isFeatured })}
                    className={`px-2.5 py-1 rounded border text-xs font-bold flex items-center gap-1 ${
                      internship.isFeatured
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                        : 'bg-[#111418] text-[#8A919B] hover:text-white border-[#2D3139]'
                    }`}
                  >
                    <Star className={`w-3 h-3 ${internship.isFeatured ? 'fill-purple-300' : ''}`} />
                    <span>{internship.isFeatured ? 'UNFEATURE' : 'FEATURE'}</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Remove listing "${internship.title}"?`)) {
                        deleteInternship(internship.id);
                      }
                    }}
                    className="p-1 rounded text-[#8A919B] hover:text-red-400 border border-[#2D3139] hover:border-red-500/30"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: AUDIT LOG */}
      {activeTab === 'audit' && (
        <div className="p-4 rounded bg-[#16191E] border border-[#2D3139] space-y-3 font-mono text-xs">
          <span className="text-[10px] text-[#8A919B] uppercase block">IMMUTABLE ACTIVITY LOG STREAM</span>
          <div className="space-y-2 text-[11px] text-[#C5CAD3]">
            <div className="p-2 rounded bg-[#111418] border border-[#2D3139] flex justify-between">
              <span>[2026-09-14 22:50] Automated ATS skill parsing engine initialized successfully.</span>
              <span className="text-green-400">INFO</span>
            </div>
            <div className="p-2 rounded bg-[#111418] border border-[#2D3139] flex justify-between">
              <span>[2026-09-14 21:14] Application Dossier submitted for Amazon AWS Data Engineering Intern.</span>
              <span className="text-[#3B82F6]">DISPATCH</span>
            </div>
            <div className="p-2 rounded bg-[#111418] border border-[#2D3139] flex justify-between">
              <span>[2026-09-14 19:40] Verified organization status granted to Microsoft Azure Talent.</span>
              <span className="text-purple-400">SECURITY</span>
            </div>
            <div className="p-2 rounded bg-[#111418] border border-[#2D3139] flex justify-between">
              <span>[2026-09-14 18:02] Algorithmic skill matching benchmark computed with 84% score.</span>
              <span className="text-green-400">INFO</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
