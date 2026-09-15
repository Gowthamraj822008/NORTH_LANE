import React, { useState } from 'react';
import {
  Building,
  Plus,
  Edit,
  Trash2,
  Users,
  Eye,
  CheckCircle2,
  Clock,
  Briefcase,
  AlertCircle,
  Video,
  Save,
  X,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Internship, ApplicationStatus, Organization, RequirementSkill } from '../types';

export const OrganizationPortalView: React.FC = () => {
  const {
    organizations,
    activeOrganizationId,
    setActiveOrganizationId,
    currentOrganization,
    updateOrganizationProfile,
    registerOrganization,
    internships,
    addInternship,
    updateInternship,
    deleteInternship,
    applications,
    updateApplicationStatus
  } = useApp();

  const [activeTab, setActiveTab] = useState<'listings' | 'applicants' | 'profile'>('listings');

  // Modals
  const [isRegisterOrgOpen, setIsRegisterOrgOpen] = useState(false);
  const [editingInternship, setEditingInternship] = useState<Internship | null>(null);
  const [isNewListingModalOpen, setIsNewListingModalOpen] = useState(false);

  // New/Edit Listing Form State
  const [listingForm, setListingForm] = useState({
    title: '',
    location: 'Bangalore / Hybrid',
    workMode: 'hybrid' as 'remote' | 'hybrid' | 'onsite',
    stipend: '₹50,000 / month',
    stipendNumeric: 50000,
    duration: '6 Months',
    category: 'Software Development',
    description: '',
    responsibilitiesText: '',
    eligibility: 'Graduation in 2026/2027 with minimum 7.0 CGPA',
    deadline: '2026-12-31',
    requirements: [
      { skillName: 'Python', importance: 'critical' as const, minLevel: 'intermediate' as const },
      { skillName: 'SQL', importance: 'high' as const, minLevel: 'beginner' as const }
    ] as RequirementSkill[]
  });

  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillImportance, setNewSkillImportance] = useState<'critical' | 'high' | 'medium'>('high');
  const [newSkillLevel, setNewSkillLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');

  // Candidate Interview Schedule Modal State
  const [scheduleInterviewModalAppId, setScheduleInterviewModalAppId] = useState<string | null>(null);
  const [interviewDate, setInterviewDate] = useState('2026-09-25');
  const [interviewTime, setInterviewTime] = useState('15:00 IST');
  const [interviewLink, setInterviewLink] = useState('https://meet.google.com/xyz-northlane');
  const [interviewNotes, setInterviewNotes] = useState('Round 1: Problem Solving & Technical Architecture.');

  // Register New Org Form State
  const [newOrgForm, setNewOrgForm] = useState({
    name: '',
    industry: 'Cloud & Enterprise Software',
    location: 'Bangalore, India',
    website: 'https://',
    size: '50-200 employees',
    bio: '',
    contactEmail: '',
    recruiterName: '',
    logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80'
  });

  // Filter listings belonging to this active organization
  const orgListings = internships.filter(i => i.organizationId === activeOrganizationId);

  // Filter applications for this organization's listings
  const orgListingIds = orgListings.map(i => i.id);
  const orgApplications = applications.filter(a => orgListingIds.includes(a.internshipId));

  // Handle Edit Internship
  const handleOpenEdit = (internship: Internship) => {
    setEditingInternship(internship);
    setListingForm({
      title: internship.title,
      location: internship.location,
      workMode: internship.workMode,
      stipend: internship.stipend,
      stipendNumeric: internship.stipendNumeric || 0,
      duration: internship.duration,
      category: internship.category,
      description: internship.description,
      responsibilitiesText: (internship.responsibilities || []).join('\n'),
      eligibility: internship.eligibility,
      deadline: internship.deadline,
      requirements: [...internship.requirements]
    });
  };

  const handleOpenNewListing = () => {
    setEditingInternship(null);
    setListingForm({
      title: '',
      location: currentOrganization.location || 'Bangalore / Hybrid',
      workMode: 'hybrid',
      stipend: '₹50,000 / month',
      stipendNumeric: 50000,
      duration: '6 Months',
      category: 'Software Development',
      description: 'Looking for enthusiastic engineering student with strong fundamental problem solving.',
      responsibilitiesText: 'Design and build backend APIs.\nCollaborate with engineering team.\nWrite unit and integration tests.',
      eligibility: 'B.Tech/B.E. students graduating in 2026 or 2027.',
      deadline: '2026-11-30',
      requirements: [
        { skillName: 'Python', importance: 'critical', minLevel: 'intermediate' },
        { skillName: 'SQL', importance: 'high', minLevel: 'beginner' }
      ]
    });
    setIsNewListingModalOpen(true);
  };

  const handleSaveListing = () => {
    if (!listingForm.title.trim()) return;

    const responsibilities = listingForm.responsibilitiesText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    if (editingInternship) {
      updateInternship(editingInternship.id, {
        title: listingForm.title,
        location: listingForm.location,
        workMode: listingForm.workMode,
        stipend: listingForm.stipend,
        stipendNumeric: listingForm.stipendNumeric,
        duration: listingForm.duration,
        category: listingForm.category,
        description: listingForm.description,
        responsibilities,
        requirements: listingForm.requirements,
        eligibility: listingForm.eligibility,
        deadline: listingForm.deadline
      });
      setEditingInternship(null);
    } else {
      addInternship({
        title: listingForm.title,
        organizationId: currentOrganization.id,
        organizationName: currentOrganization.name,
        organizationLogo: currentOrganization.logo,
        location: listingForm.location,
        workMode: listingForm.workMode,
        stipend: listingForm.stipend,
        stipendNumeric: listingForm.stipendNumeric,
        duration: listingForm.duration,
        category: listingForm.category,
        description: listingForm.description,
        responsibilities,
        requirements: listingForm.requirements,
        eligibility: listingForm.eligibility,
        deadline: listingForm.deadline,
        isFeatured: false,
        status: 'active'
      });
      setIsNewListingModalOpen(false);
    }
  };

  const handleAddRequirementSkill = () => {
    if (!newSkillName.trim()) return;
    setListingForm(prev => ({
      ...prev,
      requirements: [
        ...prev.requirements,
        {
          skillName: newSkillName.trim(),
          importance: newSkillImportance,
          minLevel: newSkillLevel
        }
      ]
    }));
    setNewSkillName('');
  };

  const handleRemoveRequirementSkill = (index: number) => {
    setListingForm(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const handleConfirmScheduleInterview = () => {
    if (!scheduleInterviewModalAppId) return;
    updateApplicationStatus(
      scheduleInterviewModalAppId,
      'interview_scheduled',
      `Technical Interview scheduled on ${interviewDate} at ${interviewTime}. Link: ${interviewLink}. ${interviewNotes}`
    );
    setScheduleInterviewModalAppId(null);
  };

  const handleRegisterNewOrg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrgForm.name.trim()) return;
    registerOrganization({
      name: newOrgForm.name,
      logo: newOrgForm.logo,
      industry: newOrgForm.industry,
      location: newOrgForm.location,
      website: newOrgForm.website,
      size: newOrgForm.size,
      bio: newOrgForm.bio,
      isVerified: true,
      contactEmail: newOrgForm.contactEmail,
      recruiterName: newOrgForm.recruiterName
    });
    setIsRegisterOrgOpen(false);
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Top Banner & Switcher */}
      <div className="p-4 rounded bg-[#16191E] border border-[#2D3139] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src={currentOrganization.logo}
            alt={currentOrganization.name}
            className="w-12 h-12 rounded border border-[#2D3139] object-cover bg-white/5 shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-white uppercase">{currentOrganization.name}</h1>
              {currentOrganization.isVerified && (
                <span className="px-1.5 py-0.2 rounded bg-green-500/20 text-green-400 border border-green-500/30 text-[9px] font-bold flex items-center gap-1">
                  <ShieldCheck className="w-2.5 h-2.5" />
                  VERIFIED
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#8A919B]">
              {currentOrganization.industry} • {currentOrganization.location}
            </p>
            <p className="text-[10px] text-[#555C68]">
              Recruiter: {currentOrganization.recruiterName || 'Campus Team'} ({currentOrganization.contactEmail})
            </p>
          </div>
        </div>

        {/* Organization Switcher & Registration Button */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative">
            <select
              id="org-switcher-select"
              value={activeOrganizationId}
              onChange={e => setActiveOrganizationId(e.target.value)}
              className="bg-[#111418] border border-[#2D3139] rounded px-3 py-1.5 text-xs text-white focus:outline-hidden focus:border-[#3B82F6] cursor-pointer"
            >
              {organizations.map(org => (
                <option key={org.id} value={org.id}>
                  Switch: {org.name}
                </option>
              ))}
            </select>
          </div>

          <button
            id="register-new-org-btn"
            onClick={() => setIsRegisterOrgOpen(true)}
            className="px-3 py-1.5 rounded bg-[#111418] hover:bg-[#1E2228] text-[#3B82F6] border border-[#3B82F6]/40 text-xs font-bold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>REGISTER_NEW_COMPANY</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#2D3139] gap-6 text-xs">
        <button
          onClick={() => setActiveTab('listings')}
          className={`pb-2.5 font-bold transition-colors flex items-center gap-2 ${
            activeTab === 'listings'
              ? 'text-[#3B82F6] border-b-2 border-[#3B82F6]'
              : 'text-[#8A919B] hover:text-white'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>INTERNSHIP_LISTINGS ({orgListings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('applicants')}
          className={`pb-2.5 font-bold transition-colors flex items-center gap-2 ${
            activeTab === 'applicants'
              ? 'text-[#3B82F6] border-b-2 border-[#3B82F6]'
              : 'text-[#8A919B] hover:text-white'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>CANDIDATE_APPLICATIONS ({orgApplications.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-2.5 font-bold transition-colors flex items-center gap-2 ${
            activeTab === 'profile'
              ? 'text-[#3B82F6] border-b-2 border-[#3B82F6]'
              : 'text-[#8A919B] hover:text-white'
          }`}
        >
          <Building className="w-3.5 h-3.5" />
          <span>ORGANIZATION_PROFILE</span>
        </button>
      </div>

      {/* TAB 1: LISTINGS */}
      {activeTab === 'listings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white uppercase">ACTIVE JOB POSTINGS</h2>
              <p className="text-[11px] text-[#8A919B]">
                Manage requirements, edit listings, and review candidate applicant pipelines
              </p>
            </div>

            <button
              id="create-new-internship-btn"
              onClick={handleOpenNewListing}
              className="px-3.5 py-1.5 rounded bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-500/20"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>POST_NEW_INTERNSHIP</span>
            </button>
          </div>

          <div className="space-y-3">
            {orgListings.length === 0 ? (
              <div className="p-8 text-center rounded bg-[#16191E] border border-[#2D3139] text-[#8A919B] space-y-2">
                <Briefcase className="w-8 h-8 mx-auto text-[#555C68]" />
                <p className="text-white font-bold">No active internship listings for {currentOrganization.name}</p>
                <p className="text-xs">Create your first role posting with technical requirements.</p>
                <button
                  onClick={handleOpenNewListing}
                  className="px-3 py-1.5 rounded bg-[#3B82F6] text-white font-bold text-xs mt-2"
                >
                  Create Listing
                </button>
              </div>
            ) : (
              orgListings.map(internship => (
                <div
                  key={internship.id}
                  className="p-4 rounded bg-[#16191E] border border-[#2D3139] hover:border-[#3E4450] transition-colors space-y-2.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-white">{internship.title}</h3>
                        <span className="px-1.5 py-0.2 rounded bg-green-500/10 text-green-400 border border-green-500/20 text-[9px] uppercase">
                          {internship.status}
                        </span>
                        <span className="px-1.5 py-0.2 rounded bg-[#111418] text-[#8A919B] border border-[#2D3139] text-[9px] uppercase">
                          {internship.workMode}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-[#8A919B] mt-1">
                        <span>{internship.location}</span>
                        <span>•</span>
                        <span className="text-green-400">{internship.stipend}</span>
                        <span>•</span>
                        <span>{internship.duration}</span>
                        <span>•</span>
                        <span>Deadline: {internship.deadline}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => handleOpenEdit(internship)}
                        className="px-2.5 py-1.5 rounded bg-[#111418] hover:bg-[#1E2228] text-[#C5CAD3] hover:text-white border border-[#2D3139] text-xs flex items-center gap-1"
                      >
                        <Edit className="w-3 h-3 text-[#3B82F6]" />
                        <span>EDIT</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete internship "${internship.title}"? This cannot be undone.`)) {
                            deleteInternship(internship.id);
                          }
                        }}
                        className="px-2.5 py-1.5 rounded bg-[#111418] hover:bg-[#1E2228] text-[#8A919B] hover:text-red-400 border border-[#2D3139] hover:border-red-500/30 text-xs flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>DELETE</span>
                      </button>
                    </div>
                  </div>

                  {/* Skills Requirements Pills */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] text-[#555C68] uppercase font-bold">REQUIRED SKILLS:</span>
                    {internship.requirements.map((req, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-[#111418] border border-[#2D3139] text-[10px] text-[#C5CAD3] flex items-center gap-1"
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            req.importance === 'critical' ? 'bg-red-400' : 'bg-[#3B82F6]'
                          }`}
                        />
                        {req.skillName} ({req.importance})
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 2: APPLICANTS */}
      {activeTab === 'applicants' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-sm font-bold text-white uppercase">CANDIDATE APPLICATIONS PIPELINE</h2>
            <p className="text-[11px] text-[#8A919B]">
              Review student dossiers, verified ATS compatibility scores, and move candidates through interview rounds
            </p>
          </div>

          <div className="space-y-3">
            {orgApplications.length === 0 ? (
              <div className="p-8 text-center rounded bg-[#16191E] border border-[#2D3139] text-[#8A919B] space-y-2">
                <Users className="w-8 h-8 mx-auto text-[#555C68]" />
                <p className="text-white font-bold">No candidate applications received yet</p>
                <p className="text-xs">Active postings are broadcast to matching students across affiliated colleges.</p>
              </div>
            ) : (
              orgApplications.map(app => (
                <div
                  key={app.id}
                  className="p-4 rounded bg-[#16191E] border border-[#2D3139] space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{app.studentName}</span>
                        <span className="text-[11px] text-[#8A919B]">({app.studentEmail})</span>
                        <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] font-bold">
                          {app.compatibilityScore}% Skill Compatibility
                        </span>
                      </div>
                      <div className="text-[11px] text-[#8A919B] mt-0.5">
                        Applied for: <span className="text-white">{app.internshipTitle}</span> • Date: {app.appliedDate}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 self-end sm:self-auto">
                      <select
                        value={app.status}
                        onChange={e => updateApplicationStatus(app.id, e.target.value as ApplicationStatus)}
                        className="bg-[#111418] border border-[#2D3139] rounded px-2.5 py-1 text-xs text-white focus:outline-hidden"
                      >
                        <option value="applied">Status: Applied</option>
                        <option value="under_review">Status: Under Review</option>
                        <option value="shortlisted">Status: Shortlisted</option>
                        <option value="interview_scheduled">Status: Interview Scheduled</option>
                        <option value="offer_extended">Status: Offer Extended</option>
                        <option value="rejected">Status: Rejected</option>
                      </select>

                      {app.status !== 'interview_scheduled' ? (
                        <button
                          onClick={() => setScheduleInterviewModalAppId(app.id)}
                          className="px-2.5 py-1 rounded bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-bold flex items-center gap-1"
                        >
                          <Video className="w-3 h-3" />
                          <span>SCHEDULE_INTERVIEW</span>
                        </button>
                      ) : (
                        <span className="px-2 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                          INTERVIEW_ACTIVE
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Cover Pitch & Resume info */}
                  <div className="p-2.5 rounded bg-[#111418] border border-[#2D3139] text-[11px] space-y-1">
                    <div className="flex justify-between text-[10px] text-[#8A919B]">
                      <span>ATTACHED RESUME: {app.resumeFileName}</span>
                      <span className="text-[#3B82F6]">VERIFIED DOSSIER</span>
                    </div>
                    <p className="text-[#C5CAD3] font-sans italic">{app.coverNote}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 3: ORGANIZATION PROFILE */}
      {activeTab === 'profile' && (
        <div className="p-4 rounded bg-[#16191E] border border-[#2D3139] space-y-4 max-w-2xl">
          <h2 className="text-sm font-bold text-white uppercase">ORGANIZATION PROFILE DETAILS</h2>

          <div className="space-y-3">
            <div>
              <label className="text-[10px] text-[#8A919B] block mb-1">COMPANY NAME</label>
              <input
                type="text"
                value={currentOrganization.name}
                onChange={e => updateOrganizationProfile(currentOrganization.id, { name: e.target.value })}
                className="w-full bg-[#111418] border border-[#2D3139] rounded p-2 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-[#8A919B] block mb-1">INDUSTRY / SECTOR</label>
                <input
                  type="text"
                  value={currentOrganization.industry}
                  onChange={e => updateOrganizationProfile(currentOrganization.id, { industry: e.target.value })}
                  className="w-full bg-[#111418] border border-[#2D3139] rounded p-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#8A919B] block mb-1">LOCATION</label>
                <input
                  type="text"
                  value={currentOrganization.location}
                  onChange={e => updateOrganizationProfile(currentOrganization.id, { location: e.target.value })}
                  className="w-full bg-[#111418] border border-[#2D3139] rounded p-2 text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-[#8A919B] block mb-1">WEBSITE URL</label>
                <input
                  type="text"
                  value={currentOrganization.website}
                  onChange={e => updateOrganizationProfile(currentOrganization.id, { website: e.target.value })}
                  className="w-full bg-[#111418] border border-[#2D3139] rounded p-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#8A919B] block mb-1">COMPANY SIZE</label>
                <input
                  type="text"
                  value={currentOrganization.size}
                  onChange={e => updateOrganizationProfile(currentOrganization.id, { size: e.target.value })}
                  className="w-full bg-[#111418] border border-[#2D3139] rounded p-2 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-[#8A919B] block mb-1">COMPANY BIO / MISSION</label>
              <textarea
                rows={3}
                value={currentOrganization.bio}
                onChange={e => updateOrganizationProfile(currentOrganization.id, { bio: e.target.value })}
                className="w-full bg-[#111418] border border-[#2D3139] rounded p-2 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-[#8A919B] block mb-1">RECRUITER / TALENT LEAD NAME</label>
                <input
                  type="text"
                  value={currentOrganization.recruiterName || ''}
                  onChange={e => updateOrganizationProfile(currentOrganization.id, { recruiterName: e.target.value })}
                  className="w-full bg-[#111418] border border-[#2D3139] rounded p-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#8A919B] block mb-1">CAMPUS CONTACT EMAIL</label>
                <input
                  type="email"
                  value={currentOrganization.contactEmail || ''}
                  onChange={e => updateOrganizationProfile(currentOrganization.id, { contactEmail: e.target.value })}
                  className="w-full bg-[#111418] border border-[#2D3139] rounded p-2 text-xs text-white"
                />
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[11px] text-green-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Profile changes automatically saved locally.</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* MODAL: POST / EDIT INTERNSHIP LISTING                         */}
      {/* ============================================================= */}
      {(isNewListingModalOpen || editingInternship) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs font-mono">
          <div className="bg-[#16191E] border border-[#2D3139] rounded-md max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-3.5 border-b border-[#2D3139] flex items-center justify-between bg-[#111418]">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                {editingInternship ? 'EDIT INTERNSHIP POSTING' : 'CREATE NEW INTERNSHIP LISTING'}
              </h3>
              <button
                onClick={() => {
                  setIsNewListingModalOpen(false);
                  setEditingInternship(null);
                }}
                className="text-[#8A919B] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-3.5 overflow-y-auto flex-1 text-xs">
              <div>
                <label className="text-[10px] text-[#8A919B] block mb-1">POSITION TITLE *</label>
                <input
                  id="internship-title-input"
                  type="text"
                  value={listingForm.title}
                  onChange={e => setListingForm({ ...listingForm, title: e.target.value })}
                  placeholder="e.g. Cloud DevOps Engineering Intern"
                  className="w-full bg-[#111418] border border-[#2D3139] rounded p-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] text-[#8A919B] block mb-1">WORK MODE</label>
                  <select
                    value={listingForm.workMode}
                    onChange={e => setListingForm({ ...listingForm, workMode: e.target.value as any })}
                    className="w-full bg-[#111418] border border-[#2D3139] rounded p-2 text-xs text-white"
                  >
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="onsite">On-Site</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-[#8A919B] block mb-1">STIPEND (PER MONTH)</label>
                  <input
                    type="text"
                    value={listingForm.stipend}
                    onChange={e => setListingForm({ ...listingForm, stipend: e.target.value })}
                    placeholder="e.g. ₹60,000 / month"
                    className="w-full bg-[#111418] border border-[#2D3139] rounded p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#8A919B] block mb-1">DURATION</label>
                  <input
                    type="text"
                    value={listingForm.duration}
                    onChange={e => setListingForm({ ...listingForm, duration: e.target.value })}
                    placeholder="e.g. 6 Months"
                    className="w-full bg-[#111418] border border-[#2D3139] rounded p-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-[#8A919B] block mb-1">LOCATION</label>
                  <input
                    type="text"
                    value={listingForm.location}
                    onChange={e => setListingForm({ ...listingForm, location: e.target.value })}
                    className="w-full bg-[#111418] border border-[#2D3139] rounded p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#8A919B] block mb-1">DEADLINE</label>
                  <input
                    type="date"
                    value={listingForm.deadline}
                    onChange={e => setListingForm({ ...listingForm, deadline: e.target.value })}
                    className="w-full bg-[#111418] border border-[#2D3139] rounded p-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-[#8A919B] block mb-1">OVERVIEW / ROLE DESCRIPTION</label>
                <textarea
                  rows={3}
                  value={listingForm.description}
                  onChange={e => setListingForm({ ...listingForm, description: e.target.value })}
                  className="w-full bg-[#111418] border border-[#2D3139] rounded p-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#8A919B] block mb-1">RESPONSIBILITIES (ONE PER LINE)</label>
                <textarea
                  rows={3}
                  value={listingForm.responsibilitiesText}
                  onChange={e => setListingForm({ ...listingForm, responsibilitiesText: e.target.value })}
                  className="w-full bg-[#111418] border border-[#2D3139] rounded p-2 text-xs text-white"
                />
              </div>

              {/* Technical Skill Requirements Entry */}
              <div className="space-y-2 pt-2 border-t border-[#2D3139]">
                <span className="text-xs font-bold text-white uppercase block">
                  TECHNICAL REQUIREMENTS & IMPORTANCE WEIGHTS
                </span>
                <p className="text-[10px] text-[#8A919B]">
                  NorthLane's AI matching engine evaluates candidate compatibility against these requirements.
                </p>

                {/* Current skills list */}
                <div className="space-y-1.5 max-h-36 overflow-y-auto">
                  {listingForm.requirements.map((req, idx) => (
                    <div
                      key={idx}
                      className="p-1.5 rounded bg-[#111418] border border-[#2D3139] flex items-center justify-between text-[11px]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold">{req.skillName}</span>
                        <span className="text-[10px] text-[#8A919B]">
                          [Min: {req.minLevel || 'beginner'} | Weight: {req.importance}]
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveRequirementSkill(idx)}
                        className="text-red-400 hover:text-red-300 p-0.5"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add new requirement row */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={newSkillName}
                    onChange={e => setNewSkillName(e.target.value)}
                    placeholder="Requirement (e.g. Docker, Spark)..."
                    className="flex-1 min-w-[140px] bg-[#111418] border border-[#2D3139] rounded px-2.5 py-1 text-xs text-white"
                  />

                  <select
                    value={newSkillImportance}
                    onChange={e => setNewSkillImportance(e.target.value as any)}
                    className="bg-[#111418] border border-[#2D3139] rounded px-2 py-1 text-xs text-white"
                  >
                    <option value="critical">Critical (3x weight)</option>
                    <option value="high">High (2x weight)</option>
                    <option value="medium">Medium (1x weight)</option>
                  </select>

                  <select
                    value={newSkillLevel}
                    onChange={e => setNewSkillLevel(e.target.value as any)}
                    className="bg-[#111418] border border-[#2D3139] rounded px-2 py-1 text-xs text-white"
                  >
                    <option value="beginner">Min: Beginner</option>
                    <option value="intermediate">Min: Intermediate</option>
                    <option value="advanced">Min: Advanced</option>
                  </select>

                  <button
                    type="button"
                    onClick={handleAddRequirementSkill}
                    className="px-3 py-1 rounded bg-[#1E2228] hover:bg-[#282D36] text-[#3B82F6] border border-[#3B82F6]/40 text-xs font-bold"
                  >
                    + ADD_REQUIREMENT
                  </button>
                </div>
              </div>
            </div>

            <div className="p-3 border-t border-[#2D3139] bg-[#111418] flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setIsNewListingModalOpen(false);
                  setEditingInternship(null);
                }}
                className="px-3 py-1.5 rounded text-[#8A919B] hover:text-white"
              >
                CANCEL
              </button>

              <button
                id="save-internship-listing-btn"
                type="button"
                onClick={handleSaveListing}
                className="px-4 py-1.5 rounded bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/20"
              >
                <Save className="w-3.5 h-3.5" />
                <span>SAVE_LISTING</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* MODAL: SCHEDULE TECHNICAL INTERVIEW                           */}
      {/* ============================================================= */}
      {scheduleInterviewModalAppId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs font-mono">
          <div className="bg-[#16191E] border border-[#2D3139] rounded-md max-w-md w-full shadow-2xl overflow-hidden flex flex-col">
            <div className="p-3.5 border-b border-[#2D3139] flex items-center justify-between bg-[#111418]">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-[#3B82F6]" />
                SCHEDULE CANDIDATE INTERVIEW
              </h3>
              <button
                onClick={() => setScheduleInterviewModalAppId(null)}
                className="text-[#8A919B] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-[#8A919B] block mb-1">DATE</label>
                  <input
                    type="date"
                    value={interviewDate}
                    onChange={e => setInterviewDate(e.target.value)}
                    className="w-full bg-[#111418] border border-[#2D3139] rounded p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#8A919B] block mb-1">TIME</label>
                  <input
                    type="text"
                    value={interviewTime}
                    onChange={e => setInterviewTime(e.target.value)}
                    className="w-full bg-[#111418] border border-[#2D3139] rounded p-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-[#8A919B] block mb-1">VIDEO MEETING LINK</label>
                <input
                  type="text"
                  value={interviewLink}
                  onChange={e => setInterviewLink(e.target.value)}
                  className="w-full bg-[#111418] border border-[#2D3139] rounded p-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#8A919B] block mb-1">INSTRUCTIONS / INTERVIEW ROUND</label>
                <textarea
                  rows={2}
                  value={interviewNotes}
                  onChange={e => setInterviewNotes(e.target.value)}
                  className="w-full bg-[#111418] border border-[#2D3139] rounded p-2 text-xs text-white"
                />
              </div>
            </div>

            <div className="p-3 border-t border-[#2D3139] bg-[#111418] flex items-center justify-between">
              <button
                onClick={() => setScheduleInterviewModalAppId(null)}
                className="px-3 py-1.5 rounded text-[#8A919B] hover:text-white"
              >
                CANCEL
              </button>

              <button
                onClick={handleConfirmScheduleInterview}
                className="px-4 py-1.5 rounded bg-green-600 hover:bg-green-500 text-white font-bold flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>CONFIRM_INTERVIEW</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* MODAL: REGISTER NEW ORGANIZATION                              */}
      {/* ============================================================= */}
      {isRegisterOrgOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs font-mono">
          <div className="bg-[#16191E] border border-[#2D3139] rounded-md max-w-lg w-full shadow-2xl overflow-hidden flex flex-col">
            <div className="p-3.5 border-b border-[#2D3139] flex items-center justify-between bg-[#111418]">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-[#3B82F6]" />
                REGISTER NEW HIRING ORGANIZATION
              </h3>
              <button
                onClick={() => setIsRegisterOrgOpen(false)}
                className="text-[#8A919B] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRegisterNewOrg} className="p-4 space-y-3 text-xs">
              <div>
                <label className="text-[10px] text-[#8A919B] block mb-1">COMPANY / STARTUP NAME *</label>
                <input
                  required
                  type="text"
                  value={newOrgForm.name}
                  onChange={e => setNewOrgForm({ ...newOrgForm, name: e.target.value })}
                  placeholder="e.g. Apex Data Intelligence"
                  className="w-full bg-[#111418] border border-[#2D3139] rounded p-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-[#8A919B] block mb-1">INDUSTRY</label>
                  <input
                    type="text"
                    value={newOrgForm.industry}
                    onChange={e => setNewOrgForm({ ...newOrgForm, industry: e.target.value })}
                    className="w-full bg-[#111418] border border-[#2D3139] rounded p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#8A919B] block mb-1">LOCATION</label>
                  <input
                    type="text"
                    value={newOrgForm.location}
                    onChange={e => setNewOrgForm({ ...newOrgForm, location: e.target.value })}
                    className="w-full bg-[#111418] border border-[#2D3139] rounded p-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-[#8A919B] block mb-1">CAMPUS RECRUITER CONTACT EMAIL</label>
                <input
                  type="email"
                  value={newOrgForm.contactEmail}
                  onChange={e => setNewOrgForm({ ...newOrgForm, contactEmail: e.target.value })}
                  placeholder="talent@company.io"
                  className="w-full bg-[#111418] border border-[#2D3139] rounded p-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#8A919B] block mb-1">BRIEF COMPANY BIO</label>
                <textarea
                  rows={2}
                  value={newOrgForm.bio}
                  onChange={e => setNewOrgForm({ ...newOrgForm, bio: e.target.value })}
                  placeholder="What makes your engineering team and culture unique..."
                  className="w-full bg-[#111418] border border-[#2D3139] rounded p-2 text-xs text-white"
                />
              </div>

              <div className="p-3 border-t border-[#2D3139] -mx-4 -mb-4 mt-4 bg-[#111418] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsRegisterOrgOpen(false)}
                  className="px-3 py-1.5 rounded text-[#8A919B] hover:text-white"
                >
                  CANCEL
                </button>
                <button
                  id="submit-register-org-btn"
                  type="submit"
                  className="px-4 py-1.5 rounded bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold flex items-center gap-1.5"
                >
                  <Building className="w-3 h-3" />
                  <span>COMPLETE_REGISTRATION</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
