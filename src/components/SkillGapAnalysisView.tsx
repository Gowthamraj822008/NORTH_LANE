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
  ChevronRight,
  Target,
  RefreshCw,
  HelpCircle,
  Code2,
  BookOpen
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { runSkillGapAnalysisWithAI, SkillGapAIResult } from '../services/aiService';

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

  const [aiGapResult, setAiGapResult] = useState<SkillGapAIResult | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [expandedQuestionIdx, setExpandedQuestionIdx] = useState<number | null>(null);

  const activeInternship = selectedInternshipForGap || internships[0];
  const internshipCompat = activeInternship ? getInternshipCompatibility(activeInternship) : null;

  const handleRunAIEvaluation = async () => {
    setIsLoadingAI(true);
    try {
      const targetPayload =
        analysisMode === 'role'
          ? {
              title: profile.targetRole,
              company: profile.targetCompany,
              targetRole: profile.targetRole
            }
          : {
              title: activeInternship?.title,
              company: activeInternship?.organizationName,
              requiredSkills: activeInternship?.requirements.map(r => r.skillName)
            };

      const result = await runSkillGapAnalysisWithAI(profile, targetPayload);
      setAiGapResult(result);
    } catch (err) {
      console.error('AI gap evaluation error:', err);
    } finally {
      setIsLoadingAI(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-5 pb-8 font-sans text-xs">
      {/* Header Banner */}
      <div className="p-4 rounded-xl bg-[#16191E] border border-[#2D3139] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4 text-blue-400" />
            <span>Placement Diagnostics</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Skill Gap Analysis & Readiness Matrix
          </h2>
          <p className="text-xs text-[#8A919B] mt-1">
            Candidate: <span className="text-white font-medium">{profile.name}</span> • Benchmark:{' '}
            {analysisMode === 'role' ? (
              <>
                <span className="text-white font-medium">{profile.targetRole}</span> @{' '}
                <span className="text-blue-400 font-medium">{profile.targetCompany}</span>
              </>
            ) : (
              <>
                <span className="text-white font-medium">{activeInternship?.title}</span> @{' '}
                <span className="text-emerald-400 font-medium">{activeInternship?.organizationName}</span>
              </>
            )}
          </p>
        </div>

        {/* Benchmark Selector: Target Role vs Opportunity */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <div className="flex bg-[#111418] p-1 rounded-lg border border-[#2D3139]">
            <button
              onClick={() => {
                setAnalysisMode('role');
                setAiGapResult(null);
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                analysisMode === 'role'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-[#8A919B] hover:text-white'
              }`}
            >
              Target Role Benchmark
            </button>
            <button
              onClick={() => {
                setAnalysisMode('internship');
                setAiGapResult(null);
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                analysisMode === 'internship'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-[#8A919B] hover:text-white'
              }`}
            >
              Internship Benchmark
            </button>
          </div>
        </div>
      </div>

      {/* When in Internship mode: Internship Selector dropdown */}
      {analysisMode === 'internship' && activeInternship && (
        <div className="p-3.5 rounded-xl bg-[#16191E] border border-[#2D3139] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Briefcase className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-[#8A919B]">Opportunity:</span>
            <select
              value={activeInternship.id}
              onChange={e => {
                const found = internships.find(i => i.id === e.target.value);
                if (found) {
                  setSelectedInternshipForGap(found);
                  setAiGapResult(null);
                }
              }}
              className="bg-[#111418] border border-[#2D3139] rounded-lg px-3 py-1 text-xs text-white focus:outline-hidden"
            >
              {internships.map(i => (
                <option key={i.id} value={i.id}>
                  {i.organizationName} — {i.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#8A919B]">Algorithmic Fit:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
              {internshipCompat?.score}% ({internshipCompat?.fitRating})
            </span>
          </div>
        </div>
      )}

      {/* AI Diagnostic Output Banner */}
      <div className="p-4 rounded-xl bg-[#16191E] border border-[#2D3139] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs text-purple-400 font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Gemini AI Placement Intelligence</span>
            {aiGapResult?.isLiveInference && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px]">
                Live Gemini Model
              </span>
            )}
          </div>

          <button
            id="trigger-live-ai-gap-btn"
            onClick={handleRunAIEvaluation}
            disabled={isLoadingAI}
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium text-xs flex items-center gap-2 shadow-sm transition-colors self-start sm:self-auto cursor-pointer"
          >
            {isLoadingAI ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Querying Gemini 3.1 Flash-Lite...</span>
              </>
            ) : (
              <>
                <Zap className="w-3.5 h-3.5" />
                <span>{aiGapResult ? 'Re-Run Gemini Diagnostic' : 'Run Live Gemini AI Diagnostic'}</span>
              </>
            )}
          </button>
        </div>

        <div className="p-3.5 bg-[#111418] rounded-lg border-l-3 border-emerald-500 text-xs text-[#E0E2E6] leading-relaxed">
          <span className="text-emerald-400 font-semibold block mb-1">
            {aiGapResult ? 'Executive AI Placement Assessment:' : 'Algorithmic Evaluation:'}
          </span>
          {aiGapResult
            ? aiGapResult.executiveAIInsight
            : analysisMode === 'role'
            ? gapAnalysis.aiInsight
            : internshipCompat?.summary}
        </div>

        {aiGapResult?.topPriorityFocus && (
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] text-[#8A919B] uppercase font-semibold block">Primary Skill Focus:</span>
              <span className="text-white font-medium">{aiGapResult.topPriorityFocus}</span>
            </div>
            <button
              onClick={() => setActivePage('roadmap')}
              className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium"
            >
              <span>View in Roadmap</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* MATCHING SKILLS VS MISSING SKILLS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* MATCHING SKILLS */}
        <div className="p-4 rounded-xl bg-[#16191E] border border-emerald-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#2D3139]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Matching Skills & Strengths
                  </h3>
                  <p className="text-[11px] text-[#8A919B]">
                    {analysisMode === 'role' ? 'Verified Strengths & Ready Prerequisites' : 'Matching Requirements Met'}
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#111418] text-emerald-400 border border-emerald-500/30">
                {aiGapResult
                  ? aiGapResult.matchingSkills.length
                  : analysisMode === 'role'
                  ? gapAnalysis.strengths.length
                  : internshipCompat?.matchingSkills.length || 0}{' '}
                Verified
              </span>
            </div>

            <div className="mt-3.5 space-y-2">
              {aiGapResult ? (
                aiGapResult.matchingSkills.map(item => (
                  <div
                    key={item.name}
                    className="p-2.5 rounded-lg bg-[#111418] border border-[#2D3139] hover:border-emerald-500/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        {item.name}
                      </span>
                      <span className="text-[10px] font-medium uppercase px-2 py-0.5 rounded bg-[#16191E] text-emerald-400 border border-emerald-500/20">
                        {item.proficiency}
                      </span>
                    </div>
                    {item.marketValidation && (
                      <p className="text-[11px] text-[#8A919B] mt-1 leading-snug">
                        {item.marketValidation}
                      </p>
                    )}
                  </div>
                ))
              ) : analysisMode === 'role' ? (
                gapAnalysis.strengths.map(item => (
                  <div
                    key={item.name}
                    className="p-2.5 rounded-lg bg-[#111418] border border-[#2D3139] hover:border-emerald-500/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        {item.name}
                      </span>
                      <span className="text-[10px] font-medium uppercase px-2 py-0.5 rounded bg-[#16191E] text-emerald-400 border border-emerald-500/20">
                        {item.level}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8A919B] mt-1 leading-snug">{item.note}</p>
                  </div>
                ))
              ) : (
                internshipCompat?.matchingSkills.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-[#111418] border border-[#2D3139] hover:border-emerald-500/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        {m.name}
                      </span>
                      <span className="text-[10px] font-medium uppercase px-2 py-0.5 rounded bg-[#16191E] text-emerald-400 border border-emerald-500/20">
                        Level: {m.level}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8A919B] mt-1">
                      Priority Weight: <span className="text-white uppercase">{m.importance}</span>
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-4 pt-2.5 border-t border-[#2D3139] text-[11px] text-emerald-400 flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>Qualified for Technical Screening Rounds</span>
          </div>
        </div>

        {/* MISSING SKILLS */}
        <div className="p-4 rounded-xl bg-[#16191E] border border-amber-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#2D3139]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Missing Skills & Critical Gaps
                  </h3>
                  <p className="text-[11px] text-[#8A919B]">
                    {analysisMode === 'role' ? 'Critical Deficiencies & Skill Gaps' : 'Unmatched Requirements to Acquire'}
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#111418] text-amber-400 border border-amber-500/30">
                {aiGapResult
                  ? aiGapResult.missingSkills.length
                  : analysisMode === 'role'
                  ? gapAnalysis.criticalGaps.length
                  : internshipCompat?.missingSkills.length || 0}{' '}
                Gaps
              </span>
            </div>

            <div className="mt-3.5 space-y-2">
              {aiGapResult ? (
                aiGapResult.missingSkills.map(item => (
                  <div
                    key={item.name}
                    className="p-2.5 rounded-lg bg-[#111418] border border-[#2D3139] hover:border-amber-500/40 transition-colors space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white flex items-center gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        {item.name}
                      </span>
                      <span
                        className={`text-[10px] font-medium uppercase px-2 py-0.5 rounded border ${
                          item.severity === 'critical'
                            ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                            : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                        }`}
                      >
                        {item.severity}
                      </span>
                    </div>
                    {item.industryReason && (
                      <p className="text-[11px] text-[#8A919B] leading-snug">
                        <strong className="text-[#B0B6C0]">Industry context:</strong> {item.industryReason}
                      </p>
                    )}
                    {item.recommendedAction && (
                      <p className="text-[11px] text-blue-400 leading-snug">
                        <strong>Action:</strong> {item.recommendedAction}
                      </p>
                    )}
                  </div>
                ))
              ) : analysisMode === 'role' ? (
                gapAnalysis.criticalGaps.map(item => (
                  <div
                    key={item.name}
                    className="p-2.5 rounded-lg bg-[#111418] border border-[#2D3139] hover:border-amber-500/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white flex items-center gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        {item.name}
                      </span>
                      <span className="text-[10px] font-medium uppercase px-2 py-0.5 rounded bg-[#16191E] text-amber-400 border border-amber-500/20">
                        Missing
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8A919B] mt-1 leading-snug">{item.note}</p>
                  </div>
                ))
              ) : (
                internshipCompat?.missingSkills.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-[#111418] border border-[#2D3139] hover:border-amber-500/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white flex items-center gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        {m.name}
                      </span>
                      <span className="text-[10px] font-medium uppercase px-2 py-0.5 rounded bg-[#16191E] text-amber-400 border border-amber-500/20">
                        Priority: {m.importance}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8A919B] mt-1">{m.recommendation}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-4 pt-2.5 border-t border-[#2D3139] text-[11px] text-amber-400 flex items-center gap-1.5 font-medium">
            <Flame className="w-3.5 h-3.5 shrink-0" />
            <span>Routed to Personalized Roadmap Sequencing</span>
          </div>
        </div>
      </div>

      {/* TAILORED INTERVIEW QUESTIONS (FROM GEMINI AI) */}
      {aiGapResult?.tailoredInterviewQuestions && aiGapResult.tailoredInterviewQuestions.length > 0 && (
        <div className="p-4 rounded-xl bg-[#16191E] border border-[#2D3139] space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-white">
            <HelpCircle className="w-4 h-4 text-blue-400" />
            <span>Gemini AI Interview Screening Questions for Identified Gaps</span>
          </div>
          <div className="space-y-2.5">
            {aiGapResult.tailoredInterviewQuestions.map((q, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-[#111418] border border-[#2D3139] space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-medium text-white leading-snug">
                    <span className="text-blue-400 mr-1.5">Q{idx + 1}:</span>
                    {q.question}
                  </p>
                  <span className="text-[10px] text-[#8A919B] px-2 py-0.5 rounded bg-[#16191E] border border-[#2D3139] shrink-0">
                    {q.focusArea}
                  </span>
                </div>
                {q.idealAnswerKey && (
                  <div className="pt-1.5 border-t border-[#2D3139]/60 text-[11px] text-[#9EA6B3]">
                    <span className="text-emerald-400 font-medium">Answer Key / Anchor: </span>
                    {q.idealAnswerKey}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RECOMMENDED PRODUCTION CAPSTONES (FROM GEMINI AI) */}
      {aiGapResult?.recommendedProjects && aiGapResult.recommendedProjects.length > 0 && (
        <div className="p-4 rounded-xl bg-[#16191E] border border-[#2D3139] space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-white">
            <Code2 className="w-4 h-4 text-emerald-400" />
            <span>AI-Recommended Capstone Projects to Bridge Skill Gaps</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {aiGapResult.recommendedProjects.map((p, idx) => (
              <div key={idx} className="p-3.5 rounded-lg bg-[#111418] border border-[#2D3139] space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-bold text-white">{p.title}</h4>
                    <span className="text-[10px] text-[#8A919B]">~{p.estimatedDays} days</span>
                  </div>
                  <p className="text-[11px] text-[#8A919B] mt-1.5 leading-relaxed">{p.description}</p>
                </div>
                <div className="flex flex-wrap gap-1 pt-2">
                  {p.techStack.map((tech, tIdx) => (
                    <span key={tIdx} className="px-2 py-0.5 rounded bg-[#16191E] text-[10px] text-blue-400 border border-blue-500/20">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Banner */}
      <div className="p-4 rounded-xl bg-[#16191E] border border-[#2D3139] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <h4 className="text-xs font-bold text-white uppercase">Sequenced Action Plan</h4>
          <p className="text-xs text-[#8A919B] mt-0.5">
            Turn these identified gaps into verifiable milestones in your personalized learning roadmap.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActivePage('internships')}
            className="px-3.5 py-2 rounded-lg bg-[#1E2228] hover:bg-[#282D36] text-white text-xs font-medium transition-colors"
          >
            Explore Opportunities
          </button>
          <button
            id="gap-analysis-open-roadmap-btn"
            onClick={() => setActivePage('roadmap')}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium flex items-center gap-2 shadow-sm transition-colors"
          >
            <span>Open Personalized Roadmap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
