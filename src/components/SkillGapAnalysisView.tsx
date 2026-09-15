import React, { useState } from 'react';
import {
  Layers,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ArrowRight,
  Sparkles,
  Zap,
  Briefcase,
  SlidersHorizontal,
  ChevronRight,
  Target,
  Building,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SkillGapAnalysisView: React.FC = () => {
  const {
    profile,
    gapAnalysis,
    setActivePage,
    internships,
    selectedInternshipForGap,
    setSelectedInternshipForGap,
    getInternshipCompatibility
  } = useApp();

  // Mode: 'role' (Target Role) or 'internship' (Specific Opportunity)
  const [analysisMode, setAnalysisMode] = useState<'role' | 'internship'>(
    selectedInternshipForGap ? 'internship' : 'role'
  );

  const activeInternship = selectedInternshipForGap || internships[0];
  const internshipCompat = activeInternship ? getInternshipCompatibility(activeInternship) : null;

  return (
    <div className="max-w-5xl mx-auto space-y-4 pb-8 font-mono text-xs">
      {/* High Density Header Banner */}
      <div className="p-3.5 rounded bg-[#16191E] border border-[#2D3139] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#3B82F6] uppercase tracking-wider mb-0.5">
            <Layers className="w-3.5 h-3.5" />
            <span>DIAGNOSTIC_ENGINE :: SKILL_GAP_ANALYSIS_V2</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            SKILL GAP ANALYSIS MATRIX
          </h2>
          <p className="text-[11px] text-[#8A919B] mt-0.5">
            BENCHMARK: <span className="text-white font-bold">{profile.name}</span> VS{' '}
            {analysisMode === 'role' ? (
              <>
                <span className="text-white font-bold">{profile.targetRole.toUpperCase()}</span> @{' '}
                <span className="text-[#3B82F6] font-bold">@{profile.targetCompany}</span>
              </>
            ) : (
              <>
                <span className="text-white font-bold">{activeInternship?.title}</span> @{' '}
                <span className="text-green-400 font-bold">{activeInternship?.organizationName}</span>
              </>
            )}
          </p>
        </div>

        {/* Benchmark Selector: Target Role vs Opportunity */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <div className="flex bg-[#111418] p-1 rounded border border-[#2D3139]">
            <button
              onClick={() => setAnalysisMode('role')}
              className={`px-2.5 py-1 rounded text-[10px] font-bold transition-colors ${
                analysisMode === 'role'
                  ? 'bg-[#3B82F6] text-white'
                  : 'text-[#8A919B] hover:text-white'
              }`}
            >
              TARGET_ROLE_MODE
            </button>
            <button
              onClick={() => setAnalysisMode('internship')}
              className={`px-2.5 py-1 rounded text-[10px] font-bold transition-colors ${
                analysisMode === 'internship'
                  ? 'bg-[#3B82F6] text-white'
                  : 'text-[#8A919B] hover:text-white'
              }`}
            >
              INTERNSHIP_BENCHMARK
            </button>
          </div>
        </div>
      </div>

      {/* When in Internship mode: Internship Selector dropdown */}
      {analysisMode === 'internship' && activeInternship && (
        <div className="p-3 rounded bg-[#16191E] border border-[#2D3139] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-[#3B82F6]" />
            <span className="text-[11px] text-[#8A919B]">BENCHMARK AGAINST OPPORTUNITY:</span>
            <select
              value={activeInternship.id}
              onChange={e => {
                const found = internships.find(i => i.id === e.target.value);
                if (found) setSelectedInternshipForGap(found);
              }}
              className="bg-[#111418] border border-[#2D3139] rounded px-2.5 py-1 text-xs text-white focus:outline-hidden"
            >
              {internships.map(i => (
                <option key={i.id} value={i.id}>
                  {i.organizationName} — {i.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#8A919B]">COMPATIBILITY FIT:</span>
            <span className="px-2 py-0.5 rounded bg-green-500/20 text-green-400 border border-green-500/30 text-xs font-bold">
              {internshipCompat?.score}% ({internshipCompat?.fitRating})
            </span>
            <button
              onClick={() => setActivePage('internships')}
              className="text-[10px] text-[#3B82F6] hover:underline ml-2"
            >
              [BROWSE_MORE]
            </button>
          </div>
        </div>
      )}

      {/* AI Diagnostic Output */}
      <div className="p-3.5 rounded bg-[#16191E] border border-[#2D3139] space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] text-purple-400 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI_INFERENCE_ENGINE // DIAGNOSTIC_OUTPUT</span>
          </div>
          <span className="text-[9px] text-[#8A919B] px-1.5 py-0.2 rounded bg-[#111418] border border-[#2D3139]">
            {analysisMode === 'role' ? 'ROLE CONFIDENCE: 94.2%' : `INTERNSHIP FIT: ${internshipCompat?.score}%`}
          </span>
        </div>

        <div className="p-3 bg-[#111418] border-l-2 border-green-500 text-[11px] text-[#E0E0E0] leading-relaxed">
          <span className="text-green-500 font-bold">[EVALUATION] </span>
          {analysisMode === 'role' ? `"${gapAnalysis.aiInsight}"` : `"${internshipCompat?.summary}"`}
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="text-[#8A919B]">IMMEDIATE_ACTION_ITEM:</span>
            <span className="font-bold text-[#3B82F6] px-2 py-0.5 rounded bg-[#111418] border border-[#2D3139]">
              {analysisMode === 'role'
                ? gapAnalysis.immediatePriority
                : internshipCompat?.missingSkills[0]?.name
                ? `Acquire ${internshipCompat.missingSkills[0].name} through Roadmap Step 2`
                : 'Application Profile Optimized'}
            </span>
          </div>

          <button
            onClick={() => setActivePage('roadmap')}
            className="text-[11px] text-[#3B82F6] hover:underline flex items-center gap-1 transition-colors"
          >
            <span>JUMP_TO_STEP_IN_ROADMAP</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* EXPLICIT SECTION: DISPLAY OF MATCHING SKILLS vs DISPLAY OF MISSING SKILLS */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {/* SECTION 1: DISPLAY OF MATCHING SKILLS */}
        <div className="p-3.5 rounded bg-[#16191E] border border-green-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2.5 border-b border-[#2D3139]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    DISPLAY OF MATCHING SKILLS
                  </h3>
                  <p className="text-[9px] text-[#8A919B]">
                    {analysisMode === 'role' ? 'Verified Strengths & Ready Prerequisites' : 'Matching Requirements Met'}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#111418] text-green-400 border border-green-500/30">
                {analysisMode === 'role' ? gapAnalysis.strengths.length : (internshipCompat?.matchingSkills.length || 0)} Verified
              </span>
            </div>

            <div className="mt-3 space-y-2">
              {analysisMode === 'role' ? (
                gapAnalysis.strengths.map(item => (
                  <div
                    key={item.name}
                    className="p-2 rounded bg-[#111418] border border-[#2D3139] hover:border-green-500/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-green-400" />
                        {item.name}
                      </span>
                      <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-[#16191E] text-green-400 border border-green-500/20">
                        {item.level}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#8A919B] mt-1 leading-snug">
                      {item.note}
                    </p>
                  </div>
                ))
              ) : (
                internshipCompat?.matchingSkills.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded bg-[#111418] border border-[#2D3139] hover:border-green-500/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-green-400" />
                        {m.name}
                      </span>
                      <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-[#16191E] text-green-400 border border-green-500/20">
                        Proficiency: {m.level}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#8A919B] mt-1">
                      Importance Weight: <span className="text-white uppercase">{m.importance}</span>
                    </p>
                  </div>
                ))
              )}

              {((analysisMode === 'role' && gapAnalysis.strengths.length === 0) ||
                (analysisMode === 'internship' && (internshipCompat?.matchingSkills.length || 0) === 0)) && (
                <p className="text-[10px] text-[#8A919B] italic p-3 text-center">
                  No matching verified competencies detected yet.
                </p>
              )}
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-[#2D3139] text-[10px] text-green-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3 h-3 shrink-0" />
            <span>QUALIFIED FOR TECHNICAL SCREENING ROUNDS</span>
          </div>
        </div>

        {/* SECTION 2: DISPLAY OF MISSING SKILLS */}
        <div className="p-3.5 rounded bg-[#16191E] border border-amber-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2.5 border-b border-[#2D3139]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    DISPLAY OF MISSING SKILLS
                  </h3>
                  <p className="text-[9px] text-[#8A919B]">
                    {analysisMode === 'role' ? 'Critical Deficiencies & Skill Gaps' : 'Unmatched Requirements to Acquire'}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#111418] text-amber-400 border border-amber-500/30">
                {analysisMode === 'role' ? gapAnalysis.criticalGaps.length : (internshipCompat?.missingSkills.length || 0)} Deficiencies
              </span>
            </div>

            <div className="mt-3 space-y-2">
              {analysisMode === 'role' ? (
                gapAnalysis.criticalGaps.map(item => (
                  <div
                    key={item.name}
                    className="p-2 rounded bg-[#111418] border border-[#2D3139] hover:border-red-500/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <AlertTriangle className="w-3 h-3 text-red-400" />
                        {item.name}
                      </span>
                      <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-[#16191E] text-red-400 border border-red-500/20">
                        MISSING
                      </span>
                    </div>
                    <p className="text-[10px] text-[#8A919B] mt-1 leading-snug">
                      {item.note}
                    </p>
                  </div>
                ))
              ) : (
                internshipCompat?.missingSkills.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded bg-[#111418] border border-[#2D3139] hover:border-amber-500/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <AlertTriangle className="w-3 h-3 text-amber-400" />
                        {m.name}
                      </span>
                      <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-[#16191E] text-amber-400 border border-amber-500/20">
                        Priority: {m.importance}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#8A919B] mt-1 font-sans">
                      {m.recommendation}
                    </p>
                  </div>
                ))
              )}

              {((analysisMode === 'role' && gapAnalysis.criticalGaps.length === 0) ||
                (analysisMode === 'internship' && (internshipCompat?.missingSkills.length || 0) === 0)) && (
                <p className="text-[10px] text-green-400 italic p-3 text-center">
                  Zero critical missing skills! Profile fulfills all mandatory prerequisites.
                </p>
              )}
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-[#2D3139] text-[10px] text-amber-400 flex items-center gap-1.5">
            <Flame className="w-3 h-3 shrink-0" />
            <span>ROUTED TO PERSONALIZED ROADMAP SEQUENCING</span>
          </div>
        </div>
      </div>

      {/* Action Banner */}
      <div className="p-3.5 rounded bg-[#16191E] border border-[#2D3139] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <h4 className="text-xs font-bold text-white uppercase">RESOLVE IDENTIFIED GAPS IN ORDER</h4>
          <p className="text-[11px] text-[#8A919B] mt-0.5">
            The personalized roadmap sequences these deficiencies into high-yield learning milestones with projects.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActivePage('internships')}
            className="px-3 py-2 rounded bg-[#1E2228] hover:bg-[#282D36] text-white text-xs font-bold transition-colors"
          >
            EXPLORE_INTERNSHIPS
          </button>
          <button
            id="gap-analysis-open-roadmap-btn"
            onClick={() => setActivePage('roadmap')}
            className="px-4 py-2 rounded bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition-colors"
          >
            <span>OPEN_PERSONALIZED_ROADMAP</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
