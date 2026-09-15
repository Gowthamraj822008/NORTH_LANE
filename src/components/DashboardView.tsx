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
  Bookmark,
  Send,
  Bot,
  User,
  RefreshCw,
  Lightbulb,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { chatWithCareerAdvisor } from '../services/aiService';

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

  // AI Career Mentor chat state
  const [chatMessages, setChatMessages] = React.useState<Array<{
    sender: 'user' | 'assistant';
    text: string;
    tips?: string[];
    actionItems?: string[];
  }>>([
    {
      sender: 'assistant',
      text: `Hello ${profile.name}! I'm your NorthLane Gemini Placement Mentor. I've analyzed your target role (${profile.targetRole} @ ${profile.targetCompany}) and readiness benchmark (${readiness.overallScore}%). How can I assist with your interviews, technical projects, or ATS optimization today?`,
      tips: [
        'Amazon DE rounds heavily test SQL Window Functions and Distributed Processing schemas',
        'Frame your Real-time Log Pipeline project using STAR format with latency/volume metrics'
      ]
    }
  ]);
  const [chatInput, setChatInput] = React.useState('');
  const [isAskingAdvisor, setIsAskingAdvisor] = React.useState(false);

  const handleAskMentor = async (queryText?: string) => {
    const query = queryText || chatInput;
    if (!query.trim() || isAskingAdvisor) return;

    const userMsg = { sender: 'user' as const, text: query };
    setChatMessages(prev => [...prev, userMsg]);
    if (!queryText) setChatInput('');
    setIsAskingAdvisor(true);

    try {
      const history = chatMessages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));
      const res = await chatWithCareerAdvisor(query, profile, history);
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'assistant',
          text: res.reply || res.response || 'No response generated.',
          tips: res.tips,
          actionItems: res.actionItems
        }
      ]);
    } catch {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'assistant',
          text: `For ${profile.targetRole} interviews at ${profile.targetCompany}, focus on demonstrating hands-on mastery in SQL window functions (ROW_NUMBER, LEAD/LAG), distributed storage partitions in AWS/S3, and idempotency in ETL jobs. Make sure your GitHub demonstrates real test coverage.`
        }
      ]);
    } finally {
      setIsAskingAdvisor(false);
    }
  };

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

      {/* Gemini AI Placement & Career Mentor */}
      <div className="p-4 rounded bg-[#16191E] border border-[#2D3139] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#2D3139]">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-[#3B82F6]">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span>GEMINI_CAREER_COPILOT // LIVE PLACEMENT ADVISOR</span>
              <span className="px-1.5 py-0.2 rounded bg-blue-500/20 text-[#3B82F6] text-[9px]">GEMINI 2.5 FLASH</span>
            </h3>
          </div>
          <div className="text-[10px] text-[#8A919B]">
            CONTEXT: <span className="text-white font-semibold">{profile.targetRole} @ {profile.targetCompany}</span>
          </div>
        </div>

        {/* Quick Prompt Shortcuts */}
        <div className="flex flex-wrap gap-1.5">
          {[
            `What are Amazon's key interview rounds for ${profile.targetRole}?`,
            'How can I frame my Distributed Log Pipeline project with STAR?',
            'What SQL window functions are most commonly tested?',
            'How can I boost my readiness score above 90%?'
          ].map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleAskMentor(prompt)}
              disabled={isAskingAdvisor}
              className="px-2.5 py-1 rounded bg-[#111418] hover:bg-[#1E2228] text-[#8A919B] hover:text-white border border-[#2D3139] text-[10px] flex items-center gap-1 transition-colors text-left"
            >
              <Lightbulb className="w-3 h-3 text-amber-400 shrink-0" />
              <span>{prompt}</span>
            </button>
          ))}
        </div>

        {/* Chat Messages */}
        <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
          {chatMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded border text-xs ${
                msg.sender === 'assistant'
                  ? 'bg-[#111418] border-[#2D3139] text-[#E0E0E0]'
                  : 'bg-[#1A2333] border-blue-500/40 text-blue-100'
              }`}
            >
              <div className="flex items-center gap-2 mb-1 text-[10px] text-[#8A919B]">
                {msg.sender === 'assistant' ? (
                  <>
                    <Bot className="w-3 h-3 text-[#3B82F6]" />
                    <span className="font-bold text-[#3B82F6]">NORTHLANE_AI</span>
                  </>
                ) : (
                  <>
                    <User className="w-3 h-3 text-white" />
                    <span className="font-bold text-white">{profile.name.toUpperCase()}</span>
                  </>
                )}
              </div>
              <p className="leading-relaxed whitespace-pre-wrap font-sans text-[12px]">{msg.text}</p>

              {/* Optional Tips */}
              {msg.tips && msg.tips.length > 0 && (
                <div className="mt-2.5 pt-2 border-t border-[#2D3139] space-y-1">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                    KEY TAKEAWAYS & TIPS:
                  </span>
                  <ul className="space-y-0.5">
                    {msg.tips.map((tip, tIdx) => (
                      <li key={tIdx} className="text-[11px] text-[#A0A6B2] flex items-start gap-1.5">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Optional Action Items */}
              {msg.actionItems && msg.actionItems.length > 0 && (
                <div className="mt-2 pt-2 border-t border-[#2D3139] space-y-1">
                  <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider block">
                    RECOMMENDED ACTIONS:
                  </span>
                  <ul className="space-y-0.5">
                    {msg.actionItems.map((action, aIdx) => (
                      <li key={aIdx} className="text-[11px] text-[#A0A6B2] flex items-start gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-green-400 shrink-0 mt-0.5" />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          {isAskingAdvisor && (
            <div className="p-3 rounded bg-[#111418] border border-[#2D3139] flex items-center gap-2 text-xs text-[#8A919B]">
              <RefreshCw className="w-3.5 h-3.5 text-[#3B82F6] animate-spin" />
              <span>CONSULTING_GEMINI_ADVISOR... Analyzing competency bar for {profile.targetRole}</span>
            </div>
          )}
        </div>

        {/* Chat Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAskMentor();
          }}
          className="flex items-center gap-2 pt-1"
        >
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder={`Ask Gemini anything about ${profile.targetRole} interviews, questions, or projects...`}
            disabled={isAskingAdvisor}
            className="flex-1 px-3 py-2 rounded bg-[#111418] border border-[#2D3139] focus:border-[#3B82F6] text-white text-xs placeholder:text-[#555C68] outline-none"
          />
          <button
            type="submit"
            disabled={isAskingAdvisor || !chatInput.trim()}
            className="px-3.5 py-2 rounded bg-[#3B82F6] hover:bg-[#2563EB] disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0"
          >
            <Send className="w-3 h-3" />
            <span>ASK</span>
          </button>
        </form>
      </div>
    </div>
  );
};
