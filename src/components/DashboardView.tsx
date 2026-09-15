import React from 'react';
import {
  Sparkles,
  Award,
  TrendingUp,
  Layers,
  Flame,
  ArrowRight,
  Target,
  CheckCircle2,
  AlertTriangle,
  PlayCircle,
  ExternalLink,
  BookOpen,
  Building2,
  Clock,
  Compass,
  Briefcase,
  Star,
  ChevronRight,
  ShieldCheck,
  Bookmark
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DashboardView: React.FC = () => {
  const {
    profile,
    readiness,
    roadmapProgress,
    gapAnalysis,
    roadmap,
    setActivePage,
    internships,
    getInternshipCompatibility,
    setSelectedInternshipForGap,
    toggleBookmarkInternship,
    bookmarkedInternshipIds,
    applications
  } = useApp();

  const nextStep =
    roadmap.find(s => s.status === 'in_progress') ||
    roadmap.find(s => s.status === 'not_started') ||
    roadmap[0];

  // Rank internships by compatibility score (Student recommendation dashboard)
  const rankedInternships = [...internships]
    .map(internship => ({
      internship,
      compat: getInternshipCompatibility(internship)
    }))
    .sort((a, b) => b.compat.score - a.compat.score);

  const topRecommendations = rankedInternships.slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto space-y-4 pb-8 font-mono text-xs">
      {/* High Density Hero Header */}
      <div className="p-4 rounded bg-[#16191E] border border-[#2D3139] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px]">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[#8A919B]">SYSTEM // PLACEMENT_ENGINE ACTIVE</span>
            <span className="text-[#4B5563]">|</span>
            <span className="text-[#3B82F6] font-semibold">
              {profile.degree} {profile.branch.split(' ')[0]} • '{profile.graduationYear}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            WELCOME BACK, {profile.name.toUpperCase()}!
          </h1>

          <p className="text-xs text-[#8A919B]">
            TARGET_ROLE: <span className="text-white font-bold">{profile.targetRole.toUpperCase()}</span>
            {' '}• TARGET_COMPANY: <span className="text-[#3B82F6] font-bold">@{profile.targetCompany}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="dash-assessment-btn"
            onClick={() => setActivePage('assessment')}
            className="px-3 py-1.5 rounded bg-[#111418] hover:bg-[#1E2228] text-[#8A919B] hover:text-white border border-[#2D3139] text-[11px] font-medium transition-colors"
          >
            UPDATE_SKILLS
          </button>
          <button
            id="dash-explore-internships-btn"
            onClick={() => setActivePage('internships')}
            className="px-3 py-1.5 rounded bg-[#3B82F6] hover:bg-[#2563EB] text-white text-[11px] font-medium flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition-colors"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>BROWSE_INTERNSHIPS</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {/* Card 1: Placement Readiness */}
        <div
          id="kpi-card-readiness"
          onClick={() => setActivePage('readiness')}
          className="p-3 rounded bg-[#16191E] border border-[#2D3139] hover:border-[#3B82F6]/50 transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-[#8A919B] mb-1">
            <span className="text-[10px] font-bold uppercase text-[#3B82F6]">STAT_01 // READINESS</span>
            <Award className="w-3.5 h-3.5 text-[#3B82F6]" />
          </div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-2xl sm:text-3xl font-bold text-white">
              {readiness.overallScore}
            </span>
            <span className="text-xs text-[#8A919B]">/100</span>
          </div>
          <div className="text-[10px] text-green-500 flex items-center gap-1">
            <span>▲</span>
            <span>{profile.targetRole} Tier-1 Fit</span>
          </div>
        </div>

        {/* Card 2: Roadmap Progress */}
        <div
          id="kpi-card-roadmap"
          onClick={() => setActivePage('roadmap')}
          className="p-3 rounded bg-[#16191E] border border-[#2D3139] hover:border-[#3B82F6]/50 transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-[#8A919B] mb-1">
            <span className="text-[10px] font-bold uppercase text-[#3B82F6]">STAT_02 // ROADMAP</span>
            <TrendingUp className="w-3.5 h-3.5 text-[#3B82F6]" />
          </div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-2xl sm:text-3xl font-bold text-white">
              {roadmapProgress}%
            </span>
            <span className="text-[10px] text-[#8A919B]">
              {roadmap.filter(s => s.status === 'completed').length}/{roadmap.length} Milestones
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#111418] rounded-full overflow-hidden border border-[#2D3139]">
            <div
              className="h-full bg-[#3B82F6] transition-all duration-300"
              style={{ width: `${roadmapProgress}%` }}
            />
          </div>
        </div>

        {/* Card 3: Skills & ATS */}
        <div
          id="kpi-card-skills"
          onClick={() => setActivePage('profile')}
          className="p-3 rounded bg-[#16191E] border border-[#2D3139] hover:border-[#3B82F6]/50 transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-[#8A919B] mb-1">
            <span className="text-[10px] font-bold uppercase text-[#3B82F6]">STAT_03 // VERIFIED</span>
            <Layers className="w-3.5 h-3.5 text-[#3B82F6]" />
          </div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-2xl sm:text-3xl font-bold text-white">
              {profile.currentSkills.length}
            </span>
            <span className="text-[10px] text-[#8A919B]">Skills</span>
          </div>
          <p className="text-[10px] text-green-400">
            ATS Score: {profile.resume?.atsScore || 78}/100
          </p>
        </div>

        {/* Card 4: Critical Skill Gaps */}
        <div
          id="kpi-card-gaps"
          onClick={() => setActivePage('skill-gap')}
          className="p-3 rounded bg-[#16191E] border border-[#2D3139] hover:border-red-500/50 transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-[#8A919B] mb-1">
            <span className="text-[10px] font-bold uppercase text-red-400">STAT_04 // GAPS</span>
            <Flame className="w-3.5 h-3.5 text-red-400" />
          </div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-2xl sm:text-3xl font-bold text-red-400">
              {gapAnalysis.criticalGaps.length}
            </span>
            <span className="text-[10px] text-[#8A919B]">Deficiencies</span>
          </div>
          <p className="text-[10px] text-red-400">
            For @{profile.targetCompany} benchmark
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STUDENT RECOMMENDATION DASHBOARD & OPPORTUNITY RANKING                     */}
      {/* ========================================================================= */}
      <div className="p-4 rounded bg-[#16191E] border border-[#2D3139] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#2D3139]">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                STUDENT RECOMMENDATION DASHBOARD // AI OPPORTUNITY RANKING
              </h2>
            </div>
            <p className="text-[11px] text-[#8A919B] mt-0.5">
              Ranked dynamically by weighted ATS compatibility matching your profile against employer prerequisites
            </p>
          </div>

          <button
            onClick={() => setActivePage('internships')}
            className="text-[11px] text-[#3B82F6] hover:underline flex items-center gap-1 self-start sm:self-center"
          >
            <span>VIEW_ALL_OPPORTUNITIES ({internships.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {topRecommendations.map(({ internship, compat }, index) => {
            const isBookmarked = (bookmarkedInternshipIds || []).includes(internship.id);
            const hasApplied = (applications || []).some(a => a.internshipId === internship.id);

            return (
              <div
                key={internship.id}
                className="p-3 rounded bg-[#111418] border border-[#2D3139] hover:border-[#3B82F6]/50 transition-all flex flex-col justify-between space-y-2.5"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={internship.organizationLogo}
                        alt={internship.organizationName}
                        className="w-7 h-7 rounded object-cover border border-[#2D3139] shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] text-[#8A919B] block truncate">
                          RANK #{index + 1} • {internship.organizationName}
                        </span>
                        <h3 className="text-xs font-bold text-white truncate max-w-[140px]">
                          {internship.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => toggleBookmarkInternship(internship.id)}
                        title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Opportunity'}
                        className={`p-1 rounded border border-[#2D3139] hover:border-[#3B82F6] transition-colors ${
                          isBookmarked ? 'bg-[#3B82F6]/20 text-[#3B82F6]' : 'bg-[#16191E] text-[#8A919B]'
                        }`}
                      >
                        <Bookmark className={`w-3 h-3 ${isBookmarked ? 'fill-current' : ''}`} />
                      </button>
                      <span className="px-2 py-0.5 rounded bg-green-500/20 text-green-400 border border-green-500/30 text-[10px] font-bold">
                        {compat.score}% MATCH
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-[#8A919B] mt-2">
                    <span>{internship.workMode}</span>
                    <span>•</span>
                    <span className="text-green-400">{internship.stipend}</span>
                    <span>•</span>
                    <span>{internship.duration}</span>
                  </div>

                  {/* Matching vs Missing Mini Badges */}
                  <div className="mt-2 space-y-1 text-[10px]">
                    <div className="flex items-center justify-between text-[#8A919B]">
                      <span className="text-green-400">✓ {compat.matchingSkills.length} Matching</span>
                      <span className="text-amber-400">! {compat.missingSkills.length} Missing</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#2D3139] flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      setSelectedInternshipForGap(internship);
                      setActivePage('skill-gap');
                    }}
                    className="text-[10px] text-[#8A919B] hover:text-[#3B82F6] underline"
                  >
                    Compare Gap
                  </button>

                  <button
                    onClick={() => setActivePage('internships')}
                    className="px-2.5 py-1 rounded bg-[#16191E] hover:bg-[#1E2228] text-white border border-[#2D3139] text-[10px] font-bold flex items-center gap-1"
                  >
                    <span>{hasApplied ? 'STATUS' : 'VIEW / APPLY'}</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommended Next Step & AI Diagnostic Console */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Recommended Next Step Box */}
        <div className="p-4 rounded bg-[#16191E] border border-[#2D3139] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#2D3139]">
              <span className="text-[10px] font-bold text-[#3B82F6] uppercase tracking-wider flex items-center gap-1.5">
                <PlayCircle className="w-3.5 h-3.5" />
                <span>ACTIVE_SPRINT // NEXT_EXECUTION</span>
              </span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#1E2228] text-[#3B82F6] border border-[#2D3139]">
                STATUS: IN_PROGRESS
              </span>
            </div>

            <div className="mt-3">
              <span className="text-[10px] text-[#8A919B] uppercase">
                STEP {nextStep.stepNumber} • {nextStep.estimatedDuration}
              </span>
              <h3 className="text-base font-bold text-white mt-1">
                "{nextStep.title}"
              </h3>
              <p className="text-xs text-[#8A919B] mt-1.5 leading-relaxed">
                {nextStep.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5 text-[10px]">
                {nextStep.subtopics.slice(0, 3).map((topic, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-[#111418] border border-[#2D3139] text-[#E0E0E0]"
                  >
                    #{topic}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#2D3139] flex items-center justify-between">
            <span className="text-[10px] text-[#8A919B]">EXECUTION QUEUE: STEP_{nextStep.stepNumber}</span>
            <button
              id="jump-to-roadmap-step-btn"
              onClick={() => setActivePage('roadmap')}
              className="px-3 py-1 rounded bg-[#3B82F6] hover:bg-[#2563EB] text-white text-[11px] font-medium flex items-center gap-1 transition-colors"
            >
              <span>EXECUTE_STEP</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Personalized AI Career Diagnostic Console */}
        <div className="p-4 rounded bg-[#16191E] border border-[#2D3139] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#2D3139]">
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>AI_DIAGNOSTICS // MODEL_INFERENCE</span>
              </span>
              <span className="text-[9px] text-[#8A919B]">CONFIDENCE 94.2%</span>
            </div>

            {/* Terminal insight banner */}
            <div className="mt-3 p-3 bg-[#111418] border-l-2 border-green-500 text-[11px] text-[#8A919B] leading-relaxed">
              <span className="text-green-500 font-bold">[INFERENCE] </span>
              "{gapAnalysis.aiInsight}"
            </div>

            <div className="mt-3 p-2.5 rounded bg-[#111418] border border-[#2D3139] space-y-1 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-[#8A919B]">PRIORITY_TARGET:</span>
                <span className="font-bold text-[#3B82F6]">{gapAnalysis.immediatePriority}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8A919B]">HIRING_BENCHMARK:</span>
                <span className="font-bold text-white">{profile.targetCompany} Engineering Core</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#2D3139] flex items-center justify-between">
            <span className="text-[10px] text-[#8A919B]">TELEMETRY: VERIFIED</span>
            <button
              onClick={() => setActivePage('skill-gap')}
              className="text-[11px] text-[#3B82F6] hover:underline flex items-center gap-1 transition-colors"
            >
              <span>VIEW_FULL_MATRIX</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Skill Gap Summary Matrix */}
      <div className="p-4 rounded bg-[#16191E] border border-[#2D3139] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#2D3139]">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#3B82F6]" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              SKILL_GAP_MATRIX :: {profile.targetRole.toUpperCase()}
            </h3>
          </div>

          <button
            onClick={() => setActivePage('skill-gap')}
            className="text-[11px] text-[#3B82F6] hover:underline flex items-center gap-1 self-start sm:self-center"
          >
            <span>DEEP_DIVE_ANALYSIS</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
          {/* Strengths */}
          <div className="p-3 rounded bg-[#111418] border border-[#2D3139] space-y-2">
            <div className="flex items-center justify-between pb-1 border-b border-[#2D3139]">
              <span className="text-[10px] font-bold text-green-500 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3" />
                <span>MATCHING_STRENGTHS</span>
              </span>
              <span className="text-[10px] font-bold text-green-500">{gapAnalysis.strengths.length}</span>
            </div>
            <div className="space-y-1">
              {gapAnalysis.strengths.slice(0, 3).map(s => (
                <div key={s.name} className="p-1.5 rounded bg-[#16191E] border border-[#2D3139] text-[11px] text-[#E0E0E0] truncate">
                  + {s.name}
                </div>
              ))}
            </div>
          </div>

          {/* Needs Improvement */}
          <div className="p-3 rounded bg-[#111418] border border-[#2D3139] space-y-2">
            <div className="flex items-center justify-between pb-1 border-b border-[#2D3139]">
              <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3 h-3" />
                <span>MODERATE_GAP</span>
              </span>
              <span className="text-[10px] font-bold text-yellow-500">{gapAnalysis.needsImprovement.length}</span>
            </div>
            <div className="space-y-1">
              {gapAnalysis.needsImprovement.slice(0, 3).map(s => (
                <div key={s.name} className="p-1.5 rounded bg-[#16191E] border border-[#2D3139] text-[11px] text-[#E0E0E0] truncate">
                  ~ {s.name}
                </div>
              ))}
            </div>
          </div>

          {/* Critical Gaps */}
          <div className="p-3 rounded bg-[#111418] border border-[#2D3139] space-y-2">
            <div className="flex items-center justify-between pb-1 border-b border-[#2D3139]">
              <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-3 h-3" />
                <span>CRITICAL_MISSING</span>
              </span>
              <span className="text-[10px] font-bold text-red-400">{gapAnalysis.criticalGaps.length}</span>
            </div>
            <div className="space-y-1">
              {gapAnalysis.criticalGaps.slice(0, 3).map(s => (
                <div key={s.name} className="p-1.5 rounded bg-[#16191E] border border-[#2D3139] text-[11px] text-red-300 truncate">
                  ! {s.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
