import React, { useState } from 'react';
import {
  Briefcase,
  CheckCircle2,
  Clock,
  Calendar,
  Video,
  ExternalLink,
  ChevronRight,
  AlertCircle,
  XCircle,
  FileText,
  Building,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ApplicationStatus, InternshipApplication } from '../types';

export const ApplicationTrackingView: React.FC = () => {
  const { applications, withdrawApplication, setActivePage } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeAppModal, setActiveAppModal] = useState<InternshipApplication | null>(null);

  const filteredApplications = applications.filter(app => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'active') return app.status !== 'withdrawn' && app.status !== 'rejected';
    return app.status === selectedFilter;
  });

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'applied':
        return {
          label: 'SUBMITTED',
          color: 'text-[#8A919B] border-[#2D3139] bg-[#1E2228]'
        };
      case 'under_review':
        return {
          label: 'UNDER REVIEW',
          color: 'text-[#3B82F6] border-blue-500/30 bg-blue-500/10'
        };
      case 'shortlisted':
        return {
          label: 'SHORTLISTED',
          color: 'text-purple-400 border-purple-500/30 bg-purple-500/10'
        };
      case 'interview_scheduled':
        return {
          label: 'INTERVIEW SCHEDULED',
          color: 'text-amber-400 border-amber-500/30 bg-amber-500/10'
        };
      case 'offer_extended':
        return {
          label: 'OFFER EXTENDED',
          color: 'text-green-400 border-green-500/30 bg-green-500/10'
        };
      case 'rejected':
        return {
          label: 'POSITION CLOSED',
          color: 'text-red-400 border-red-500/30 bg-red-500/10'
        };
      case 'withdrawn':
        return {
          label: 'WITHDRAWN',
          color: 'text-[#555C68] border-[#2D3139] bg-[#111418]'
        };
      default:
        return {
          label: (status as string).toUpperCase(),
          color: 'text-white border-[#2D3139]'
        };
    }
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2D3139] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-white tracking-wider uppercase">
              APPLICATION TRACKING PIPELINE
            </h1>
            <span className="px-2 py-0.5 rounded bg-green-500/20 text-green-400 border border-green-500/30 text-[10px] font-bold">
              {applications.length} TOTAL
            </span>
          </div>
          <p className="text-[#8A919B] text-xs mt-1">
            Real-time status updates, ATS compatibility score audits, and recruiter interview milestones
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#16191E] p-1 rounded border border-[#2D3139]">
          {[
            { id: 'all', label: 'ALL' },
            { id: 'active', label: 'ACTIVE' },
            { id: 'shortlisted', label: 'SHORTLISTED' },
            { id: 'interview_scheduled', label: 'INTERVIEWS' },
            { id: 'offer_extended', label: 'OFFERS' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-2.5 py-1 rounded text-[10px] font-bold transition-colors ${
                selectedFilter === tab.id
                  ? 'bg-[#3B82F6] text-white'
                  : 'text-[#8A919B] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.length === 0 ? (
          <div className="p-12 text-center rounded bg-[#16191E] border border-[#2D3139] text-[#8A919B] space-y-3">
            <Briefcase className="w-8 h-8 mx-auto text-[#555C68]" />
            <p className="text-white font-bold text-sm">No Applications in Current Pipeline Filter</p>
            <p className="text-xs">Browse open opportunities and use NorthLane One-Click Match to apply.</p>
            <button
              onClick={() => setActivePage('internships')}
              className="px-4 py-2 rounded bg-[#3B82F6] text-white font-bold text-xs inline-flex items-center gap-2 mt-2"
            >
              <span>BROWSE_INTERNSHIPS</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          filteredApplications.map(app => {
            const badge = getStatusBadge(app.status);

            return (
              <div
                key={app.id}
                className="p-4 rounded bg-[#16191E] border border-[#2D3139] hover:border-[#3E4450] transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={app.organizationLogo}
                      alt={app.organizationName}
                      className="w-10 h-10 rounded border border-[#2D3139] object-cover bg-white/5 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-white">{app.internshipTitle}</h3>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${badge.color}`}>
                          {badge.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[#8A919B] text-[11px] mt-0.5">
                        <span className="text-[#C5CAD3] font-bold flex items-center gap-1">
                          <Building className="w-3 h-3 text-[#8A919B]" />
                          {app.organizationName}
                        </span>
                        <span>•</span>
                        <span>Applied: {app.appliedDate}</span>
                        <span>•</span>
                        <span className="text-green-400 font-bold flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          {app.compatibilityScore}% Compatibility Match
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => setActiveAppModal(app)}
                      className="px-3 py-1.5 rounded bg-[#111418] hover:bg-[#1E2228] text-white border border-[#2D3139] text-xs flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#3B82F6]" />
                      <span>VIEW_AUDIT_LOG</span>
                    </button>

                    {app.status !== 'withdrawn' && app.status !== 'rejected' && (
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to withdraw this application?')) {
                            withdrawApplication(app.id);
                          }
                        }}
                        className="px-2.5 py-1.5 rounded text-[#8A919B] hover:text-red-400 border border-[#2D3139] hover:border-red-500/30 text-xs"
                      >
                        WITHDRAW
                      </button>
                    )}
                  </div>
                </div>

                {/* Interview Highlight if scheduled */}
                {app.interviewDetails && (
                  <div className="p-3 rounded bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 text-amber-300">
                      <Video className="w-4 h-4 text-amber-400 shrink-0" />
                      <div>
                        <span className="font-bold">UPCOMING TECHNICAL ROUND: </span>
                        <span>{app.interviewDetails.date} at {app.interviewDetails.time}</span>
                        <p className="text-[10px] text-[#C5CAD3]">{app.interviewDetails.notes}</p>
                      </div>
                    </div>
                    {app.interviewDetails.meetLink && (
                      <a
                        href={app.interviewDetails.meetLink}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs inline-flex items-center gap-1 shrink-0"
                      >
                        <span>JOIN_MEETING</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                )}

                {/* Timeline Progress Bar */}
                <div className="pt-2 border-t border-[#2D3139]/60">
                  <div className="flex items-center justify-between text-[10px] text-[#8A919B] mb-1.5">
                    <span>TIMELINE STATUS PROGRESSION:</span>
                    <span className="text-[#C5CAD3]">{app.timeline[app.timeline.length - 1]?.message}</span>
                  </div>

                  <div className="grid grid-cols-4 gap-1">
                    {[
                      { step: 'Applied', reached: true },
                      { step: 'Under Review', reached: ['under_review', 'shortlisted', 'interview_scheduled', 'offer_extended'].includes(app.status) },
                      { step: 'Shortlisted', reached: ['shortlisted', 'interview_scheduled', 'offer_extended'].includes(app.status) },
                      { step: 'Interview / Offer', reached: ['interview_scheduled', 'offer_extended'].includes(app.status) }
                    ].map((s, idx) => (
                      <div
                        key={idx}
                        className={`h-1.5 rounded-full transition-all ${
                          s.reached ? 'bg-[#3B82F6]' : 'bg-[#2D3139]'
                        }`}
                        title={s.step}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Application Audit & Timeline Modal */}
      {activeAppModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs font-mono">
          <div className="bg-[#16191E] border border-[#2D3139] rounded-md max-w-lg w-full shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-3.5 border-b border-[#2D3139] flex items-center justify-between bg-[#111418]">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#3B82F6]" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  APPLICATION AUDIT RECORD
                </h3>
              </div>
              <button
                onClick={() => setActiveAppModal(null)}
                className="text-[#8A919B] hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-4 space-y-4 overflow-y-auto text-xs">
              <div className="p-3 rounded bg-[#111418] border border-[#2D3139] space-y-1">
                <p className="text-white font-bold">{activeAppModal.internshipTitle}</p>
                <p className="text-[#8A919B]">{activeAppModal.organizationName}</p>
                <div className="pt-2 flex justify-between text-[10px]">
                  <span className="text-[#8A919B]">Candidate: {activeAppModal.studentName}</span>
                  <span className="text-green-400 font-bold">{activeAppModal.compatibilityScore}% Compatibility</span>
                </div>
                <div className="text-[10px] text-[#8A919B]">
                  Resume File: {activeAppModal.resumeFileName}
                </div>
              </div>

              {/* Cover Note */}
              <div className="space-y-1">
                <span className="text-[#8A919B] text-[10px] uppercase">COVER NOTE TRANSMITTED:</span>
                <p className="p-2.5 rounded bg-[#111418] border border-[#2D3139] text-[#C5CAD3] font-sans text-xs">
                  {activeAppModal.coverNote}
                </p>
              </div>

              {/* Chronological Event Log */}
              <div className="space-y-2">
                <span className="text-[#8A919B] text-[10px] uppercase">CHRONOLOGICAL EVENT TRAIL:</span>
                <div className="space-y-2">
                  {activeAppModal.timeline.map((event, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded bg-[#111418] border border-[#2D3139] flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#3B82F6] shrink-0 mt-0.5" />
                      <div className="space-y-0.5 flex-1">
                        <div className="flex justify-between">
                          <span className="text-white font-bold uppercase text-[10px]">{event.status.replace('_', ' ')}</span>
                          <span className="text-[#8A919B] text-[10px]">{event.date}</span>
                        </div>
                        <p className="text-[#8A919B] text-[11px] font-sans">{event.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 border-t border-[#2D3139] bg-[#111418] flex justify-end">
              <button
                onClick={() => setActiveAppModal(null)}
                className="px-4 py-1.5 rounded bg-[#1E2228] hover:bg-[#282D36] text-white text-xs font-bold"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
