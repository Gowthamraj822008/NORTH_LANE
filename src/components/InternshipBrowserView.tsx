import React, { useState, useMemo } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  Bookmark,
  Sparkles,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Send,
  Building,
  Star,
  Users,
  Eye,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Internship } from '../types';

export const InternshipBrowserView: React.FC = () => {
  const {
    internships,
    savedInternshipIds,
    toggleSaveInternship,
    getInternshipCompatibility,
    setSelectedInternshipForGap,
    setActivePage,
    applications,
    applyToInternship,
    profile
  } = useApp();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedWorkMode, setSelectedWorkMode] = useState<string>('all');
  const [minMatchScore, setMinMatchScore] = useState<number>(0);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'compatibility' | 'stipend' | 'recent' | 'applicants'>('compatibility');

  // Active Modals State
  const [inspectInternship, setInspectInternship] = useState<Internship | null>(null);
  const [applyModalInternship, setApplyModalInternship] = useState<Internship | null>(null);
  const [coverNote, setCoverNote] = useState('');
  const [applySuccessMsg, setApplySuccessMsg] = useState<string | null>(null);

  // Extract available categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    internships.forEach(i => {
      if (i.category) set.add(i.category);
    });
    return Array.from(set);
  }, [internships]);

  // Compute matches & filter/sort
  const filteredAndRankedInternships = useMemo(() => {
    const list = (internships || []).map(internship => {
      const compat = getInternshipCompatibility(internship);
      const isSaved = (savedInternshipIds || []).includes(internship.id);
      const isApplied = (applications || []).some(a => a.internshipId === internship.id);
      return {
        ...internship,
        compat,
        isSaved,
        isApplied
      };
    });

    return list
      .filter(item => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = item.title.toLowerCase().includes(q);
          const matchOrg = item.organizationName.toLowerCase().includes(q);
          const matchDesc = item.description.toLowerCase().includes(q);
          const matchSkills = item.requirements.some(r => r.skillName.toLowerCase().includes(q));
          if (!matchTitle && !matchOrg && !matchDesc && !matchSkills) return false;
        }

        // Category
        if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;

        // Work mode
        if (selectedWorkMode !== 'all' && item.workMode !== selectedWorkMode) return false;

        // Min Match
        if (item.compat.score < minMatchScore) return false;

        // Saved only
        if (showSavedOnly && !item.isSaved) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'compatibility') return b.compat.score - a.compat.score;
        if (sortBy === 'stipend') return (b.stipendNumeric || 0) - (a.stipendNumeric || 0);
        if (sortBy === 'applicants') return a.applicantsCount - b.applicantsCount;
        if (sortBy === 'recent') return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
        return 0;
      });
  }, [internships, savedInternshipIds, applications, searchQuery, selectedCategory, selectedWorkMode, minMatchScore, showSavedOnly, sortBy, getInternshipCompatibility]);

  const handleOpenApply = (internship: Internship) => {
    setApplyModalInternship(internship);
    setCoverNote(
      `I am a pre-final year engineering student passionate about ${internship.category}. My technical stack aligns closely with your requirements in ${internship.requirements.slice(0, 3).map(r => r.skillName).join(', ')}.`
    );
    setApplySuccessMsg(null);
  };

  const handleConfirmApply = () => {
    if (!applyModalInternship) return;
    const success = applyToInternship(
      applyModalInternship.id,
      coverNote,
      profile.resume?.fileName || 'Gowtham_R_Resume.pdf'
    );
    if (success) {
      setApplySuccessMsg('APPLICATION TRANSMITTED SUCCESSFULLY TO HIRING PARTNER');
      setTimeout(() => {
        setApplyModalInternship(null);
        setApplySuccessMsg(null);
      }, 1400);
    }
  };

  const handleBenchmarkInGapAnalysis = (internship: Internship) => {
    setSelectedInternshipForGap(internship);
    setActivePage('skill-gap');
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* View Header & Meta */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2D3139] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-white tracking-wider uppercase">
              INTERNSHIP & OPPORTUNITY ENGINE
            </h1>
            <span className="px-2 py-0.5 rounded bg-blue-500/20 text-[#3B82F6] border border-[#3B82F6]/30 text-[10px] font-bold">
              AI MATCHING ACTIVE
            </span>
          </div>
          <p className="text-[#8A919B] text-xs mt-1">
            Real-time algorithmic compatibility matching against your verified skill profile
          </p>
        </div>

        {/* Quick Stats Banner */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded bg-[#16191E] border border-[#2D3139] text-center">
            <span className="text-[10px] text-[#8A919B] block">MATCHED</span>
            <span className="text-white font-bold text-sm">{filteredAndRankedInternships.length}</span>
          </div>
          <div className="px-3 py-1.5 rounded bg-[#16191E] border border-[#2D3139] text-center">
            <span className="text-[10px] text-[#8A919B] block">SAVED</span>
            <span className="text-amber-400 font-bold text-sm">{savedInternshipIds.length}</span>
          </div>
          <div className="px-3 py-1.5 rounded bg-[#16191E] border border-[#2D3139] text-center">
            <span className="text-[10px] text-[#8A919B] block">APPLIED</span>
            <span className="text-green-400 font-bold text-sm">{applications.length}</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-3.5 rounded bg-[#16191E] border border-[#2D3139] space-y-3">
        {/* Search input and Quick toggles */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8A919B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="internship-search-input"
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by title, company, technology (e.g., Python, AWS, Docker)..."
              className="w-full bg-[#111418] border border-[#2D3139] rounded pl-9 pr-3 py-1.5 text-xs text-white focus:outline-hidden focus:border-[#3B82F6] placeholder:text-[#555C68]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8A919B] hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <select
              id="internship-sort-select"
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-[#111418] border border-[#2D3139] rounded px-3 py-1.5 text-xs text-white focus:outline-hidden focus:border-[#3B82F6]"
            >
              <option value="compatibility">Sort: Highest Match Score</option>
              <option value="stipend">Sort: Highest Stipend</option>
              <option value="recent">Sort: Most Recently Posted</option>
              <option value="applicants">Sort: Fewest Applicants</option>
            </select>

            <button
              id="internship-saved-toggle"
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              className={`px-3 py-1.5 rounded border text-xs flex items-center gap-1.5 transition-colors ${
                showSavedOnly
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 font-bold'
                  : 'bg-[#111418] text-[#8A919B] hover:text-white border-[#2D3139]'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${showSavedOnly ? 'fill-amber-400' : ''}`} />
              <span>SAVED ({savedInternshipIds.length})</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#2D3139]/50 text-[11px]">
          <span className="text-[#8A919B] flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3" />
            <span>FILTERS:</span>
          </span>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="bg-[#111418] border border-[#2D3139] rounded px-2 py-1 text-[11px] text-white focus:outline-hidden"
          >
            <option value="all">Category: All</option>
            {categories.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Work Mode Filter */}
          <select
            value={selectedWorkMode}
            onChange={e => setSelectedWorkMode(e.target.value)}
            className="bg-[#111418] border border-[#2D3139] rounded px-2 py-1 text-[11px] text-white focus:outline-hidden"
          >
            <option value="all">Work Mode: All</option>
            <option value="remote">Remote Only</option>
            <option value="hybrid">Hybrid</option>
            <option value="onsite">On-Site</option>
          </select>

          {/* Minimum Match Filter */}
          <select
            value={minMatchScore}
            onChange={e => setMinMatchScore(Number(e.target.value))}
            className="bg-[#111418] border border-[#2D3139] rounded px-2 py-1 text-[11px] text-white focus:outline-hidden"
          >
            <option value={0}>Compatibility: All</option>
            <option value={60}>Min Match: 60%+</option>
            <option value={75}>Min Match: 75%+</option>
            <option value={85}>Min Match: 85%+</option>
          </select>

          {(selectedCategory !== 'all' || selectedWorkMode !== 'all' || minMatchScore > 0 || searchQuery || showSavedOnly) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedWorkMode('all');
                setMinMatchScore(0);
                setSearchQuery('');
                setShowSavedOnly(false);
              }}
              className="text-[#3B82F6] hover:underline text-[10px] ml-auto"
            >
              [RESET_FILTERS]
            </button>
          )}
        </div>
      </div>

      {/* Internships Opportunity List */}
      <div className="space-y-4">
        {filteredAndRankedInternships.length === 0 ? (
          <div className="p-12 text-center rounded bg-[#16191E] border border-[#2D3139] text-[#8A919B] space-y-2">
            <Briefcase className="w-8 h-8 mx-auto text-[#555C68]" />
            <p className="text-white font-bold text-sm">No Matching Opportunities Found</p>
            <p className="text-xs">Adjust search keywords or filter criteria to broaden results.</p>
          </div>
        ) : (
          filteredAndRankedInternships.map(internship => {
            const score = internship.compat.score;
            const scoreColor =
              score >= 80 ? 'text-green-400 border-green-500/30 bg-green-500/10' :
              score >= 65 ? 'text-[#3B82F6] border-blue-500/30 bg-blue-500/10' :
              'text-amber-400 border-amber-500/30 bg-amber-500/10';

            return (
              <div
                key={internship.id}
                className={`p-4 rounded bg-[#16191E] border transition-all ${
                  internship.isFeatured
                    ? 'border-[#3B82F6]/50 shadow-md shadow-blue-500/5'
                    : 'border-[#2D3139] hover:border-[#3E4450]'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  {/* Company Logo & Basic Details */}
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    <img
                      src={internship.organizationLogo}
                      alt={internship.organizationName}
                      className="w-11 h-11 rounded border border-[#2D3139] object-cover bg-white/5 shrink-0"
                    />

                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-sm font-bold text-white truncate hover:text-[#3B82F6] cursor-pointer"
                            onClick={() => setInspectInternship(internship)}>
                          {internship.title}
                        </h2>
                        {internship.isFeatured && (
                          <span className="px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[9px] font-bold">
                            FEATURED
                          </span>
                        )}
                        <span className="px-1.5 py-0.2 rounded bg-[#111418] text-[#8A919B] border border-[#2D3139] text-[9px] uppercase">
                          {internship.workMode}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[#8A919B] text-[11px]">
                        <span className="text-[#C5CAD3] font-bold flex items-center gap-1">
                          <Building className="w-3 h-3 text-[#8A919B]" />
                          {internship.organizationName}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#8A919B]" />
                          {internship.location}
                        </span>
                        <span className="flex items-center gap-1 text-green-400 font-bold">
                          <DollarSign className="w-3 h-3 text-green-400" />
                          {internship.stipend}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#8A919B]" />
                          {internship.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-[#8A919B]" />
                          {internship.applicantsCount} applicants
                        </span>
                      </div>

                      <p className="text-[#8A919B] text-[11px] line-clamp-2 leading-relaxed pt-1 font-sans">
                        {internship.description}
                      </p>

                      {/* Required Skills Chips */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-2">
                        <span className="text-[10px] text-[#555C68] font-bold uppercase">REQUIREMENTS:</span>
                        {internship.requirements.slice(0, 5).map((req, idx) => {
                          const isMatched = internship.compat.matchingSkills.some(
                            m => m.name.toLowerCase() === req.skillName.toLowerCase()
                          );
                          return (
                            <span
                              key={idx}
                              className={`px-1.5 py-0.5 rounded text-[10px] border flex items-center gap-1 ${
                                isMatched
                                  ? 'bg-green-500/10 text-green-300 border-green-500/30 font-medium'
                                  : 'bg-[#111418] text-[#8A919B] border-[#2D3139]'
                              }`}
                            >
                              {isMatched ? (
                                <CheckCircle2 className="w-2.5 h-2.5 text-green-400" />
                              ) : (
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400/60" />
                              )}
                              {req.skillName}
                            </span>
                          );
                        })}
                        {internship.requirements.length > 5 && (
                          <span className="text-[10px] text-[#8A919B]">
                            +{internship.requirements.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Compatibility Badge & Action Buttons */}
                  <div className="flex lg:flex-col items-center lg:items-end justify-between gap-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#2D3139]">
                    {/* Compatibility Score Widget */}
                    <div
                      onClick={() => setInspectInternship(internship)}
                      className={`px-3 py-2 rounded border flex flex-col items-center lg:items-end cursor-pointer hover:opacity-90 transition-opacity ${scoreColor}`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span className="text-base font-bold">{score}%</span>
                      </div>
                      <span className="text-[9px] uppercase tracking-wider font-bold">
                        {internship.compat.fitRating}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        title={internship.isSaved ? 'Remove Bookmark' : 'Bookmark Opportunity'}
                        onClick={() => toggleSaveInternship(internship.id)}
                        className={`p-1.5 rounded border transition-colors ${
                          internship.isSaved
                            ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                            : 'bg-[#111418] text-[#8A919B] hover:text-white border-[#2D3139]'
                        }`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${internship.isSaved ? 'fill-amber-400' : ''}`} />
                      </button>

                      <button
                        onClick={() => setInspectInternship(internship)}
                        className="px-2.5 py-1.5 rounded bg-[#111418] hover:bg-[#1E2228] text-[#C5CAD3] hover:text-white border border-[#2D3139] text-xs flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>MATCH_DETAILS</span>
                      </button>

                      {internship.isApplied ? (
                        <button
                          onClick={() => setActivePage('applications')}
                          className="px-3 py-1.5 rounded bg-green-500/20 text-green-300 border border-green-500/40 text-xs font-bold flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>APPLIED</span>
                        </button>
                      ) : (
                        <button
                          id={`apply-btn-${internship.id}`}
                          onClick={() => handleOpenApply(internship)}
                          className="px-3.5 py-1.5 rounded bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/20"
                        >
                          <Send className="w-3 h-3" />
                          <span>APPLY_NOW</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ============================================================= */}
      {/* MODAL 1: INTERNSHIP MATCH DETAILS & SKILL GAP BREAKDOWN       */}
      {/* ============================================================= */}
      {inspectInternship && (() => {
        const compat = getInternshipCompatibility(inspectInternship);
        const isApplied = applications.some(a => a.internshipId === inspectInternship.id);

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs font-mono">
            <div className="bg-[#16191E] border border-[#2D3139] rounded-md max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              {/* Header */}
              <div className="p-4 border-b border-[#2D3139] flex items-center justify-between bg-[#111418]">
                <div className="flex items-center gap-3">
                  <img
                    src={inspectInternship.organizationLogo}
                    alt={inspectInternship.organizationName}
                    className="w-10 h-10 rounded border border-[#2D3139] object-cover"
                  />
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                      {inspectInternship.title}
                    </h3>
                    <p className="text-[10px] text-[#8A919B]">
                      {inspectInternship.organizationName} • {inspectInternship.location}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setInspectInternship(null)}
                  className="p-1 rounded text-[#8A919B] hover:text-white hover:bg-[#1E2228]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="p-4 space-y-4 overflow-y-auto flex-1 text-xs">
                {/* Score Summary Box */}
                <div className="p-3.5 rounded bg-[#111418] border border-[#2D3139] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#8A919B] uppercase block">
                      NORTHLANE COMPATIBILITY SCORE
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-2xl font-bold text-white">{compat.score}%</span>
                      <span className="px-2 py-0.5 rounded bg-blue-500/20 text-[#3B82F6] border border-[#3B82F6]/30 text-[10px] font-bold">
                        {compat.fitRating}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBenchmarkInGapAnalysis(inspectInternship)}
                    className="px-3 py-1.5 rounded bg-[#1E2228] hover:bg-[#282D36] text-[#3B82F6] border border-[#3B82F6]/40 text-xs font-bold flex items-center gap-1.5"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>BENCHMARK_IN_GAP_ANALYSIS</span>
                  </button>
                </div>

                {/* AI Summary Statement */}
                <div className="p-3 rounded bg-[#111418] border border-[#2D3139] text-[11px] font-sans text-[#C5CAD3] leading-relaxed">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-[#3B82F6] mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>MATCHING DIAGNOSIS:</span>
                  </div>
                  {compat.summary}
                </div>

                {/* TWO COLUMN: MATCHING SKILLS vs MISSING SKILLS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* MATCHING SKILLS */}
                  <div className="p-3 rounded bg-[#111418] border border-green-500/20 space-y-2">
                    <div className="flex items-center justify-between border-b border-[#2D3139] pb-1.5">
                      <span className="font-bold text-green-400 flex items-center gap-1.5 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        MATCHING SKILLS ({compat.matchingSkills.length})
                      </span>
                      <span className="text-[9px] text-[#8A919B]">VERIFIED</span>
                    </div>

                    {compat.matchingSkills.length === 0 ? (
                      <p className="text-[#8A919B] text-[10px] py-2">No direct prerequisite matches verified yet.</p>
                    ) : (
                      <div className="space-y-1.5">
                        {compat.matchingSkills.map((m, idx) => (
                          <div
                            key={idx}
                            className="p-1.5 rounded bg-[#16191E] border border-[#2D3139] flex items-center justify-between text-[10px]"
                          >
                            <span className="text-white font-medium">{m.name}</span>
                            <span className="px-1.5 py-0.2 rounded bg-green-500/10 text-green-400 border border-green-500/20 text-[9px] uppercase">
                              {m.level}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* MISSING SKILLS */}
                  <div className="p-3 rounded bg-[#111418] border border-amber-500/20 space-y-2">
                    <div className="flex items-center justify-between border-b border-[#2D3139] pb-1.5">
                      <span className="font-bold text-amber-400 flex items-center gap-1.5 text-[11px]">
                        <AlertCircle className="w-3.5 h-3.5" />
                        MISSING SKILLS ({compat.missingSkills.length})
                      </span>
                      <span className="text-[9px] text-[#8A919B]">PRIORITY GAPS</span>
                    </div>

                    {compat.missingSkills.length === 0 ? (
                      <p className="text-green-400 text-[10px] py-2">Full alignment! Zero missing prerequisite skills.</p>
                    ) : (
                      <div className="space-y-1.5">
                        {compat.missingSkills.map((m, idx) => (
                          <div
                            key={idx}
                            className="p-1.5 rounded bg-[#16191E] border border-[#2D3139] text-[10px] space-y-0.5"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-white font-medium">{m.name}</span>
                              <span className="px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[9px] uppercase">
                                {m.importance}
                              </span>
                            </div>
                            <p className="text-[9px] text-[#8A919B] font-sans">{m.recommendation}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Responsibilities */}
                {inspectInternship.responsibilities && (
                  <div className="space-y-1.5">
                    <span className="font-bold text-white text-[11px]">KEY RESPONSIBILITIES:</span>
                    <ul className="list-disc list-inside space-y-1 text-[#8A919B] text-[11px] font-sans">
                      {inspectInternship.responsibilities.map((resp, i) => (
                        <li key={i}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Eligibility & Details */}
                <div className="p-2.5 rounded bg-[#111418] border border-[#2D3139] text-[10px] text-[#8A919B] space-y-1">
                  <div>
                    <span className="text-white font-bold">ELIGIBILITY: </span>
                    {inspectInternship.eligibility}
                  </div>
                  <div>
                    <span className="text-white font-bold">APPLICATION DEADLINE: </span>
                    {inspectInternship.deadline}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-[#2D3139] bg-[#111418] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setInspectInternship(null)}
                  className="px-3 py-1.5 rounded text-[#8A919B] hover:text-white text-xs"
                >
                  CLOSE
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleSaveInternship(inspectInternship.id)}
                    className={`px-3 py-1.5 rounded border border-[#2D3139] text-xs flex items-center gap-1.5 transition-colors ${
                      (savedInternshipIds || []).includes(inspectInternship.id)
                        ? 'bg-[#3B82F6]/20 text-[#3B82F6] border-[#3B82F6]/40'
                        : 'bg-[#1E2228] text-white hover:bg-[#252A32]'
                    }`}
                  >
                    <Bookmark
                      className={`w-3.5 h-3.5 ${
                        (savedInternshipIds || []).includes(inspectInternship.id) ? 'fill-current' : ''
                      }`}
                    />
                    <span>{(savedInternshipIds || []).includes(inspectInternship.id) ? 'BOOKMARKED' : 'BOOKMARK'}</span>
                  </button>

                  {!isApplied ? (
                    <button
                      onClick={() => {
                        const target = inspectInternship;
                        setInspectInternship(null);
                        handleOpenApply(target);
                      }}
                      className="px-4 py-1.5 rounded bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/20"
                    >
                      <Send className="w-3 h-3" />
                      <span>APPLY_FOR_INTERNSHIP</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setInspectInternship(null);
                        setActivePage('applications');
                      }}
                      className="px-3 py-1.5 rounded bg-green-500/20 text-green-300 border border-green-500/40 text-xs font-bold flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>VIEW_APPLICATION_STATUS</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ============================================================= */}
      {/* MODAL 2: QUICK ONE-CLICK APPLICATION MODAL                    */}
      {/* ============================================================= */}
      {applyModalInternship && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs font-mono">
          <div className="bg-[#16191E] border border-[#2D3139] rounded-md max-w-lg w-full shadow-2xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-3.5 border-b border-[#2D3139] flex items-center justify-between bg-[#111418]">
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-[#3B82F6]" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  CONFIRM INTERNSHIP APPLICATION
                </h3>
              </div>
              <button
                onClick={() => setApplyModalInternship(null)}
                className="text-[#8A919B] hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3.5 text-xs">
              {applySuccessMsg ? (
                <div className="p-6 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-green-400 mx-auto animate-bounce" />
                  <p className="text-white font-bold text-sm">{applySuccessMsg}</p>
                  <p className="text-[#8A919B] text-xs">Direct notification dispatched to employer portal.</p>
                </div>
              ) : (
                <>
                  {/* Position Details */}
                  <div className="p-3 rounded bg-[#111418] border border-[#2D3139] space-y-1">
                    <p className="text-white font-bold">{applyModalInternship.title}</p>
                    <p className="text-[#8A919B] text-[11px]">
                      {applyModalInternship.organizationName} • {applyModalInternship.stipend}
                    </p>
                  </div>

                  {/* Candidate Dossier */}
                  <div className="space-y-1 text-[11px]">
                    <span className="text-[#8A919B]">ATTACHED CANDIDATE DOSSIER:</span>
                    <div className="p-2.5 rounded bg-[#111418] border border-[#2D3139] space-y-1">
                      <div className="flex justify-between">
                        <span className="text-[#8A919B]">Candidate:</span>
                        <span className="text-white font-bold">{profile.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8A919B]">Active Resume:</span>
                        <span className="text-[#3B82F6]">
                          {profile.resume?.fileName || 'Gowtham_R_Resume.pdf'} (ATS: {profile.resume?.atsScore || 78}/100)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8A919B]">Match Compatibility:</span>
                        <span className="text-green-400 font-bold">
                          {getInternshipCompatibility(applyModalInternship).score}% Fit
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Cover Pitch Note */}
                  <div className="space-y-1 text-[11px]">
                    <span className="text-[#8A919B]">COVER PITCH / RECRUITER NOTE:</span>
                    <textarea
                      rows={4}
                      value={coverNote}
                      onChange={e => setCoverNote(e.target.value)}
                      className="w-full bg-[#111418] border border-[#2D3139] rounded p-2 text-xs text-white focus:outline-hidden focus:border-[#3B82F6]"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            {!applySuccessMsg && (
              <div className="p-3 border-t border-[#2D3139] bg-[#111418] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setApplyModalInternship(null)}
                  className="px-3 py-1.5 rounded text-[#8A919B] hover:text-white text-xs"
                >
                  CANCEL
                </button>
                <button
                  id="confirm-submit-application-btn"
                  type="button"
                  onClick={handleConfirmApply}
                  className="px-4 py-1.5 rounded bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-500/20"
                >
                  <Send className="w-3 h-3" />
                  <span>SUBMIT_APPLICATION</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
