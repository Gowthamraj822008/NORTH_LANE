import React, { useState } from 'react';
import {
  UserCheck,
  GraduationCap,
  Briefcase,
  Plus,
  X,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Building,
  Calendar,
  Layers,
  FileText,
  Upload,
  Code,
  Globe,
  Trash2,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Phone,
  Heart
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TARGET_ROLES } from '../data/rolesData';
import { ResumeUploadModal } from './ResumeUploadModal';

export const ProfileView: React.FC = () => {
  const {
    profile,
    updateProfile,
    addSkillToProfile,
    removeSkillFromProfile,
    addExperienceToProfile,
    removeExperienceFromProfile,
    addProjectToProfile,
    removeProjectFromProfile,
    setActivePage
  } = useApp();

  const [newSkillInput, setNewSkillInput] = useState('');
  const [isSavedNotice, setIsSavedNotice] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  // New Experience Form Modal State
  const [isAddingExp, setIsAddingExp] = useState(false);
  const [expForm, setExpForm] = useState({
    title: '',
    organization: '',
    role: '',
    duration: '',
    technologiesText: '',
    description: ''
  });

  // New Project Form Modal State
  const [isAddingProj, setIsAddingProj] = useState(false);
  const [projForm, setProjForm] = useState({
    title: '',
    description: '',
    technologiesText: '',
    githubUrl: '',
    liveUrl: ''
  });

  // New Interest State
  const [newInterestInput, setNewInterestInput] = useState('');

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkillInput.trim()) {
      addSkillToProfile(newSkillInput.trim());
      setNewSkillInput('');
      triggerSaveNotice();
    }
  };

  const triggerSaveNotice = () => {
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2500);
  };

  const handleFieldChange = (field: string, value: any) => {
    updateProfile({ [field]: value });
    triggerSaveNotice();
  };

  const handleSaveExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expForm.title.trim() || !expForm.organization.trim()) return;

    addExperienceToProfile({
      title: expForm.title,
      organization: expForm.organization,
      role: expForm.role || expForm.title,
      duration: expForm.duration || '3 Months',
      technologies: expForm.technologiesText.split(',').map(s => s.trim()).filter(Boolean),
      description: expForm.description
    });

    setExpForm({
      title: '',
      organization: '',
      role: '',
      duration: '',
      technologiesText: '',
      description: ''
    });
    setIsAddingExp(false);
    triggerSaveNotice();
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projForm.title.trim()) return;

    addProjectToProfile({
      title: projForm.title,
      description: projForm.description,
      technologies: projForm.technologiesText.split(',').map(s => s.trim()).filter(Boolean),
      githubUrl: projForm.githubUrl,
      liveUrl: projForm.liveUrl
    });

    setProjForm({
      title: '',
      description: '',
      technologiesText: '',
      githubUrl: '',
      liveUrl: ''
    });
    setIsAddingProj(false);
    triggerSaveNotice();
  };

  const handleAddInterest = (e: React.FormEvent) => {
    e.preventDefault();
    if (newInterestInput.trim()) {
      const current = profile.interests || [];
      if (!current.includes(newInterestInput.trim())) {
        updateProfile({ interests: [...current, newInterestInput.trim()] });
        triggerSaveNotice();
      }
      setNewInterestInput('');
    }
  };

  const handleRemoveInterest = (interest: string) => {
    const current = profile.interests || [];
    updateProfile({ interests: current.filter(i => i !== interest) });
    triggerSaveNotice();
  };

  const quickSkillsSuggestions = [
    'Python', 'SQL', 'Java', 'C++', 'Data Structures & Algorithms',
    'AWS', 'Git & Version Control', 'Docker', 'Machine Learning', 'Linux'
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-4 pb-8 font-mono text-xs">
      {/* High Density Header Banner */}
      <div className="p-3.5 rounded bg-[#16191E] border border-[#2D3139] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#3B82F6] uppercase tracking-wider mb-0.5">
            <UserCheck className="w-3.5 h-3.5" />
            <span>RECORD_CONFIG // STUDENT_DOSSIER</span>
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            STUDENT PROFILE: {profile.name.toUpperCase()}
          </h1>
          <p className="text-[11px] text-[#8A919B] mt-0.5">
            ACADEMIC CREDENTIALS, RESUME EXTRACTION &amp; VERIFIED SKILL INVENTORY
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isSavedNotice && (
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#111418] border border-green-500/40 text-green-400 text-[10px] font-bold">
              <CheckCircle2 className="w-3 h-3" />
              <span>SAVED</span>
            </div>
          )}

          <button
            id="open-resume-extractor-btn"
            onClick={() => setIsResumeModalOpen(true)}
            className="px-3 py-1.5 rounded bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/20"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>EXTRACT_FROM_RESUME</span>
          </button>
        </div>
      </div>

      {/* Resume Card Status Banner */}
      <div className="p-3.5 rounded bg-[#16191E] border border-[#2D3139] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-blue-500/10 border border-blue-500/20 text-[#3B82F6]">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">
                {profile.resume?.fileName || 'Gowtham_R_Data_Engineer_Resume.pdf'}
              </span>
              <span className="px-1.5 py-0.2 rounded bg-green-500/20 text-green-400 border border-green-500/30 text-[9px] font-bold">
                ATS SCORE: {profile.resume?.atsScore || 78}/100
              </span>
            </div>
            <p className="text-[10px] text-[#8A919B] mt-0.5">
              Extracted Skills: {profile.resume?.extractedSkills?.length || 8} • Sync Status: ACTIVE
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsResumeModalOpen(true)}
            className="px-3 py-1 rounded bg-[#111418] hover:bg-[#1E2228] text-[#3B82F6] border border-[#3B82F6]/40 text-[11px] font-bold flex items-center gap-1"
          >
            <Upload className="w-3 h-3" />
            <span>RE-UPLOAD / PARSE</span>
          </button>
        </div>
      </div>

      {/* Academic & Target Role Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Left Column: Academic Credentials */}
        <div className="p-3.5 rounded bg-[#16191E] border border-[#2D3139] space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-[#2D3139] text-white font-bold text-xs uppercase">
            <GraduationCap className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>ACADEMIC_SPECIFICATIONS</span>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#8A919B] uppercase mb-1">
              FULL_NAME
            </label>
            <input
              type="text"
              id="profile-name-input"
              value={profile.name}
              onChange={e => handleFieldChange('name', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded bg-[#111418] border border-[#2D3139] text-white text-xs focus:outline-hidden focus:border-[#3B82F6]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] font-bold text-[#8A919B] uppercase mb-1">
                DEGREE_PROGRAM
              </label>
              <select
                id="profile-degree-select"
                value={profile.degree}
                onChange={e => handleFieldChange('degree', e.target.value)}
                className="w-full px-2.5 py-1.5 rounded bg-[#111418] border border-[#2D3139] text-white text-xs focus:outline-hidden focus:border-[#3B82F6]"
              >
                <option value="B.Tech">B.Tech</option>
                <option value="B.E.">B.E.</option>
                <option value="M.Tech">M.Tech</option>
                <option value="BCA / MCA">BCA / MCA</option>
                <option value="B.Sc CS">B.Sc CS</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#8A919B] uppercase mb-1">
                GRADUATION_YEAR
              </label>
              <select
                id="profile-grad-year-select"
                value={profile.graduationYear}
                onChange={e => handleFieldChange('graduationYear', Number(e.target.value))}
                className="w-full px-2.5 py-1.5 rounded bg-[#111418] border border-[#2D3139] text-white text-xs focus:outline-hidden focus:border-[#3B82F6]"
              >
                <option value={2025}>2025 (Graduated)</option>
                <option value={2026}>2026 (Final Year)</option>
                <option value={2027}>2027 (Pre-Final Year)</option>
                <option value={2028}>2028 (2nd Year)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#8A919B] uppercase mb-1">
              ENGINEERING_BRANCH
            </label>
            <input
              type="text"
              id="profile-branch-input"
              value={profile.branch}
              onChange={e => handleFieldChange('branch', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded bg-[#111418] border border-[#2D3139] text-white text-xs focus:outline-hidden focus:border-[#3B82F6]"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#8A919B] uppercase mb-1">
              INSTITUTION / COLLEGE
            </label>
            <input
              type="text"
              id="profile-college-input"
              value={profile.college || ''}
              onChange={e => handleFieldChange('college', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded bg-[#111418] border border-[#2D3139] text-white text-xs focus:outline-hidden focus:border-[#3B82F6]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <div>
              <label className="block text-[10px] font-bold text-[#8A919B] uppercase mb-1">
                EMAIL
              </label>
              <input
                type="email"
                value={profile.email || ''}
                onChange={e => handleFieldChange('email', e.target.value)}
                className="w-full px-2.5 py-1.5 rounded bg-[#111418] border border-[#2D3139] text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[#8A919B] uppercase mb-1">
                GITHUB URL
              </label>
              <input
                type="text"
                value={profile.github || ''}
                onChange={e => handleFieldChange('github', e.target.value)}
                className="w-full px-2.5 py-1.5 rounded bg-[#111418] border border-[#2D3139] text-white text-xs"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Career Target & Placement Goals */}
        <div className="p-3.5 rounded bg-[#16191E] border border-[#2D3139] space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-[#2D3139] text-white font-bold text-xs uppercase">
            <Briefcase className="w-3.5 h-3.5 text-purple-400" />
            <span>PLACEMENT_OBJECTIVE</span>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#8A919B] uppercase mb-1">
              TARGET_ROLE
            </label>
            <select
              id="profile-target-role-select"
              value={profile.targetRole}
              onChange={e => handleFieldChange('targetRole', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded bg-[#111418] border border-[#2D3139] text-white text-xs focus:outline-hidden focus:border-[#3B82F6]"
            >
              {TARGET_ROLES.map(role => (
                <option key={role.id} value={role.title}>
                  {role.title} ({role.category})
                </option>
              ))}
            </select>
            <p className="text-[10px] text-[#8A919B] mt-1">
              * Synchronizes gap matrix and personalized milestones.
            </p>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#8A919B] uppercase mb-1">
              TARGET_COMPANY / BENCHMARK
            </label>
            <input
              type="text"
              id="profile-target-company-input"
              value={profile.targetCompany}
              onChange={e => handleFieldChange('targetCompany', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded bg-[#111418] border border-[#2D3139] text-white text-xs focus:outline-hidden focus:border-[#3B82F6]"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#8A919B] uppercase mb-1">
              BIO & ASPIRATIONS
            </label>
            <textarea
              rows={3}
              value={profile.bio || ''}
              onChange={e => handleFieldChange('bio', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded bg-[#111418] border border-[#2D3139] text-white text-xs font-sans"
            />
          </div>

          {/* Student Interests & Specializations */}
          <div className="pt-1 space-y-1.5">
            <label className="block text-[10px] font-bold text-[#8A919B] uppercase">
              TECHNICAL INTERESTS & SPECIALIZATIONS
            </label>
            <div className="flex flex-wrap gap-1.5">
              {(profile.interests || []).map((interest, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-[#111418] border border-[#2D3139] text-[#C5CAD3] text-[10px] flex items-center gap-1"
                >
                  <Heart className="w-2.5 h-2.5 text-pink-400" />
                  <span>{interest}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveInterest(interest)}
                    className="text-[#8A919B] hover:text-red-400 ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <form onSubmit={handleAddInterest} className="flex gap-2 pt-1">
              <input
                type="text"
                value={newInterestInput}
                onChange={e => setNewInterestInput(e.target.value)}
                placeholder="Add interest (e.g. Distributed Systems)..."
                className="flex-1 bg-[#111418] border border-[#2D3139] rounded px-2 py-1 text-xs text-white"
              />
              <button
                type="submit"
                className="px-2.5 py-1 rounded bg-[#1E2228] hover:bg-[#282D36] text-[#3B82F6] border border-[#3B82F6]/40 text-[10px] font-bold"
              >
                + ADD
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Skills Inventory Section */}
      <div className="p-3.5 rounded bg-[#16191E] border border-[#2D3139] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#2D3139]">
          <div>
            <h3 className="text-xs font-bold text-white uppercase flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span>CURRENT_SKILLS_INVENTORY</span>
            </h3>
            <p className="text-[10px] text-[#8A919B] mt-0.5">
              Skills acquired via coursework, projects, or parsed from resume.
            </p>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#111418] text-[#3B82F6] border border-[#2D3139] self-start">
            TOTAL SKILLS: {profile.currentSkills.length}
          </span>
        </div>

        {/* Input Form */}
        <form onSubmit={handleAddSkill} className="flex gap-2">
          <input
            type="text"
            id="add-skill-input"
            value={newSkillInput}
            onChange={e => setNewSkillInput(e.target.value)}
            placeholder="ADD SKILL (e.g. Docker, PySpark, Redis, PostgreSQL)..."
            className="flex-1 px-3 py-1.5 rounded bg-[#111418] border border-[#2D3139] text-white text-xs focus:outline-hidden focus:border-[#3B82F6]"
          />
          <button
            type="submit"
            id="add-skill-submit-btn"
            className="px-3 py-1.5 rounded bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold text-xs flex items-center gap-1 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>ADD</span>
          </button>
        </form>

        {/* Quick suggestions */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] text-[#8A919B]">SUGGESTIONS:</span>
          {quickSkillsSuggestions.map(s => {
            const hasSkill = profile.currentSkills.some(cs => cs.toLowerCase() === s.toLowerCase());
            if (hasSkill) return null;
            return (
              <button
                key={s}
                type="button"
                onClick={() => addSkillToProfile(s)}
                className="text-[10px] px-2 py-0.5 rounded bg-[#111418] hover:bg-[#1E2228] text-[#8A919B] hover:text-white border border-[#2D3139] flex items-center gap-1 transition-colors"
              >
                <Plus className="w-2.5 h-2.5 text-[#3B82F6]" />
                <span>{s}</span>
              </button>
            );
          })}
        </div>

        {/* Skill badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {profile.currentSkills.map(skill => (
            <div
              key={skill}
              className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#111418] border border-[#2D3139] text-[#E0E0E0] text-[11px]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
              <span>{skill}</span>
              <button
                onClick={() => removeSkillFromProfile(skill)}
                className="text-[#8A919B] hover:text-red-400 transition-colors ml-0.5"
                title={`Remove ${skill}`}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Student Work Experience Details Section */}
      <div className="p-3.5 rounded bg-[#16191E] border border-[#2D3139] space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#2D3139]">
          <div>
            <h3 className="text-xs font-bold text-white uppercase flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-green-400" />
              <span>STUDENT_EXPERIENCE_DETAILS</span>
            </h3>
            <p className="text-[10px] text-[#8A919B]">
              Internships, university research, and technical leadership roles.
            </p>
          </div>

          <button
            onClick={() => setIsAddingExp(true)}
            className="px-2.5 py-1 rounded bg-[#111418] hover:bg-[#1E2228] text-[#3B82F6] border border-[#3B82F6]/40 text-xs font-bold flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            <span>ADD_EXPERIENCE</span>
          </button>
        </div>

        <div className="space-y-2.5">
          {(profile.experiences || []).map(exp => (
            <div
              key={exp.id}
              className="p-3 rounded bg-[#111418] border border-[#2D3139] space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">{exp.title}</h4>
                  <p className="text-[10px] text-[#8A919B]">
                    {exp.organization} • {exp.role} • {exp.duration}
                  </p>
                </div>

                <button
                  onClick={() => removeExperienceFromProfile(exp.id)}
                  className="p-1 rounded text-[#8A919B] hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {exp.description && (
                <p className="text-[11px] text-[#C5CAD3] font-sans leading-relaxed">
                  {exp.description}
                </p>
              )}

              {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {exp.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.2 rounded bg-[#16191E] text-[#8A919B] border border-[#2D3139] text-[9px]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}

          {(!profile.experiences || profile.experiences.length === 0) && (
            <p className="text-[#8A919B] text-center p-3 text-[11px]">
              No work experiences added yet. Click Add Experience above.
            </p>
          )}
        </div>
      </div>

      {/* Student Technical Projects Section */}
      <div className="p-3.5 rounded bg-[#16191E] border border-[#2D3139] space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#2D3139]">
          <div>
            <h3 className="text-xs font-bold text-white uppercase flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5 text-purple-400" />
              <span>TECHNICAL_PROJECTS_PORTFOLIO</span>
            </h3>
            <p className="text-[10px] text-[#8A919B]">
              Verified systems, open-source repositories, and capstone codebases.
            </p>
          </div>

          <button
            onClick={() => setIsAddingProj(true)}
            className="px-2.5 py-1 rounded bg-[#111418] hover:bg-[#1E2228] text-[#3B82F6] border border-[#3B82F6]/40 text-xs font-bold flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            <span>ADD_PROJECT</span>
          </button>
        </div>

        <div className="space-y-2.5">
          {(profile.projects || []).map(proj => (
            <div
              key={proj.id}
              className="p-3 rounded bg-[#111418] border border-[#2D3139] space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-white">{proj.title}</h4>
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#3B82F6] hover:underline inline-flex items-center gap-1 text-[10px]"
                    >
                      <Github className="w-3 h-3" />
                      <span>Code</span>
                    </a>
                  )}
                </div>

                <button
                  onClick={() => removeProjectFromProfile(proj.id)}
                  className="p-1 rounded text-[#8A919B] hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-[11px] text-[#C5CAD3] font-sans leading-relaxed">
                {proj.description}
              </p>

              {proj.technologies && proj.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {proj.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.2 rounded bg-[#16191E] text-[#8A919B] border border-[#2D3139] text-[9px]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}

          {(!profile.projects || profile.projects.length === 0) && (
            <p className="text-[#8A919B] text-center p-3 text-[11px]">
              No technical projects added yet. Click Add Project above.
            </p>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded bg-[#16191E] border border-[#2D3139]">
        <div>
          <h4 className="text-xs font-bold text-white uppercase">NEXT: ASSESS SKILLS &amp; GAP ANALYSIS</h4>
          <p className="text-[10px] text-[#8A919B]">
            Calibrate proficiency levels across core, frameworks, and system design tracks.
          </p>
        </div>

        <button
          id="continue-to-assessment-btn"
          onClick={() => setActivePage('assessment')}
          className="w-full sm:w-auto px-4 py-2 rounded bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
        >
          <span>PROCEED_TO_ASSESSMENT</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Resume Upload Modal */}
      <ResumeUploadModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      {/* Add Experience Modal */}
      {isAddingExp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs font-mono">
          <div className="bg-[#16191E] border border-[#2D3139] rounded-md max-w-md w-full shadow-2xl overflow-hidden flex flex-col">
            <div className="p-3.5 border-b border-[#2D3139] flex items-center justify-between bg-[#111418]">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                RECORD WORK EXPERIENCE / INTERNSHIP
              </h3>
              <button onClick={() => setIsAddingExp(false)} className="text-[#8A919B] hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveExperience} className="p-4 space-y-3 text-xs">
              <div>
                <label className="text-[10px] text-[#8A919B] block mb-1">TITLE / POSITION *</label>
                <input
                  required
                  type="text"
                  value={expForm.title}
                  onChange={e => setExpForm({ ...expForm, title: e.target.value })}
                  placeholder="e.g. Backend Engineering Intern"
                  className="w-full bg-[#111418] border border-[#2D3139] rounded p-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#8A919B] block mb-1">COMPANY / ORGANIZATION *</label>
                <input
                  required
                  type="text"
                  value={expForm.organization}
                  onChange={e => setExpForm({ ...expForm, organization: e.target.value })}
                  placeholder="e.g. HexaWave Tech Labs"
                  className="w-full bg-[#111418] border border-[#2D3139] rounded p-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#8A919B] block mb-1">DURATION</label>
                <input
                  type="text"
                  value={expForm.duration}
                  onChange={e => setExpForm({ ...expForm, duration: e.target.value })}
                  placeholder="e.g. May 2025 - Jul 2025 (2 Mos)"
                  className="w-full bg-[#111418] border border-[#2D3139] rounded p-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#8A919B] block mb-1">TECHNOLOGIES USED (COMMA-SEPARATED)</label>
                <input
                  type="text"
                  value={expForm.technologiesText}
                  onChange={e => setExpForm({ ...expForm, technologiesText: e.target.value })}
                  placeholder="e.g. Python, PostgreSQL, Docker, Git"
                  className="w-full bg-[#111418] border border-[#2D3139] rounded p-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#8A919B] block mb-1">DESCRIPTION & IMPACT</label>
                <textarea
                  rows={3}
                  value={expForm.description}
                  onChange={e => setExpForm({ ...expForm, description: e.target.value })}
                  placeholder="Built automated ETL pipelines, reduced query latency..."
                  className="w-full bg-[#111418] border border-[#2D3139] rounded p-2 text-xs text-white"
                />
              </div>

              <div className="p-3 border-t border-[#2D3139] -mx-4 -mb-4 mt-4 bg-[#111418] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsAddingExp(false)}
                  className="px-3 py-1.5 rounded text-[#8A919B] hover:text-white"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-[#3B82F6] text-white font-bold text-xs"
                >
                  SAVE_EXPERIENCE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      {isAddingProj && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs font-mono">
          <div className="bg-[#16191E] border border-[#2D3139] rounded-md max-w-md w-full shadow-2xl overflow-hidden flex flex-col">
            <div className="p-3.5 border-b border-[#2D3139] flex items-center justify-between bg-[#111418]">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                RECORD TECHNICAL PROJECT
              </h3>
              <button onClick={() => setIsAddingProj(false)} className="text-[#8A919B] hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="p-4 space-y-3 text-xs">
              <div>
                <label className="text-[10px] text-[#8A919B] block mb-1">PROJECT TITLE *</label>
                <input
                  required
                  type="text"
                  value={projForm.title}
                  onChange={e => setProjForm({ ...projForm, title: e.target.value })}
                  placeholder="e.g. Distributed Ingestion Engine"
                  className="w-full bg-[#111418] border border-[#2D3139] rounded p-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#8A919B] block mb-1">DESCRIPTION</label>
                <textarea
                  rows={3}
                  value={projForm.description}
                  onChange={e => setProjForm({ ...projForm, description: e.target.value })}
                  placeholder="Describe architectural challenges solved and performance metrics..."
                  className="w-full bg-[#111418] border border-[#2D3139] rounded p-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#8A919B] block mb-1">TECHNOLOGIES (COMMA-SEPARATED)</label>
                <input
                  type="text"
                  value={projForm.technologiesText}
                  onChange={e => setProjForm({ ...projForm, technologiesText: e.target.value })}
                  placeholder="e.g. Python, SQLite, Multithreading"
                  className="w-full bg-[#111418] border border-[#2D3139] rounded p-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#8A919B] block mb-1">GITHUB REPOSITORY URL</label>
                <input
                  type="text"
                  value={projForm.githubUrl}
                  onChange={e => setProjForm({ ...projForm, githubUrl: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full bg-[#111418] border border-[#2D3139] rounded p-2 text-xs text-white"
                />
              </div>

              <div className="p-3 border-t border-[#2D3139] -mx-4 -mb-4 mt-4 bg-[#111418] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsAddingProj(false)}
                  className="px-3 py-1.5 rounded text-[#8A919B] hover:text-white"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-[#3B82F6] text-white font-bold text-xs"
                >
                  SAVE_PROJECT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
