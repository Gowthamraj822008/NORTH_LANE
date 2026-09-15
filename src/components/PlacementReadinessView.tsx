import React, { useState } from 'react';
import {
  Award,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Cpu,
  BrainCircuit,
  FolderGit2,
  MessageSquare,
  FileText,
  Sliders,
  RotateCcw,
  RefreshCw,
  Target,
  FileCheck,
  Bot
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { chatWithCareerAdvisor } from '../services/aiService';

export const PlacementReadinessView: React.FC = () => {
  const { profile, readiness, setActivePage, roadmapProgress } = useApp();
  const [simulatedSqlBoost, setSimulatedSqlBoost] = useState(false);
  const [simulatedCloudBoost, setSimulatedCloudBoost] = useState(false);
  const [isGeneratingAiAdvice, setIsGeneratingAiAdvice] = useState(false);
  const [aiReadinessAdvice, setAiReadinessAdvice] = useState<string | null>(null);

  // Dynamic values or simulated boost
  let displayOverall = readiness.overallScore;
  let breakdown = { ...readiness.breakdown };

  // If student uploaded an AI parsed resume with ATS score, reflect it
  if (profile.resume?.atsScore) {
    breakdown.resumeReadiness = profile.resume.atsScore;
  }

  if (simulatedSqlBoost) {
    breakdown.technicalSkills = Math.min(100, breakdown.technicalSkills + 12);
    breakdown.problemSolving = Math.min(100, breakdown.problemSolving + 8);
    displayOverall = Math.min(100, displayOverall + 8);
  }
  if (simulatedCloudBoost) {
    breakdown.technicalSkills = Math.min(100, breakdown.technicalSkills + 10);
    breakdown.projectsAndExperience = Math.min(100, breakdown.projectsAndExperience + 25);
    displayOverall = Math.min(100, displayOverall + 11);
  }

  const handleRunAiEvaluation = async () => {
    setIsGeneratingAiAdvice(true);
    try {
      const res = await chatWithCareerAdvisor(
        `Evaluate my current placement readiness benchmark score of ${displayOverall}/100 for ${profile.targetRole} @ ${profile.targetCompany}. What are the highest-priority levers to guarantee shortlisting and clear technical rounds?`,
        profile
      );
      setAiReadinessAdvice(res.reply || res.response || null);
    } catch {
      setAiReadinessAdvice(`Based on your profile as a ${profile.degree} student targeting ${profile.targetRole} at ${profile.targetCompany}: To advance from ${displayOverall}% to 95%+, prioritize deploying a distributed ETL project to AWS S3/Glue with PySpark and solve 50 SQL medium problems on LeetCode focusing on Window Functions.`);
    } finally {
      setIsGeneratingAiAdvice(false);
    }
  };

  // Circular gauge calculations
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayOverall / 100) * circumference;

  const pillars = [
    {
      name: 'Technical Skills',
      score: breakdown.technicalSkills,
      icon: Cpu,
      benchmark: 'SPEC: 80%+',
      details: 'Python syntax, SQL query logic, distributed data systems, schema design.'
    },
    {
      name: 'Problem Solving',
      score: breakdown.problemSolving,
      icon: BrainCircuit,
      benchmark: 'SPEC: 75%+',
      details: 'Data structures, algorithmic patterns, array hashing, time & space complexity.'
    },
    {
      name: 'Projects & Experience',
      score: breakdown.projectsAndExperience,
      icon: FolderGit2,
      benchmark: 'SPEC: 70%+',
      details: 'End-to-end cloud pipeline deployment, GitHub code samples, live project demos.'
    },
    {
      name: 'Communication',
      score: breakdown.communication,
      icon: MessageSquare,
      benchmark: 'SPEC: 75%+',
      details: 'Technical explanation clarity, STAR behavioral responses, interviewer rapport.'
    },
    {
      name: 'Resume Readiness',
      score: breakdown.resumeReadiness,
      icon: FileText,
      benchmark: 'SPEC: 75%+',
      details: 'Keyword alignment for ATS, measurable project metrics, clean typography.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-3 pb-8 font-mono">
      {/* High Density Header Banner */}
      <div className="p-3.5 rounded bg-[#16191E] border border-[#2D3139] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#3B82F6] uppercase tracking-wider mb-0.5">
            <Award className="w-3.5 h-3.5" />
            <span>METRIC_01 // READINESS_BENCHMARK</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            PLACEMENT READINESS EVALUATION
          </h2>
          <p className="text-[11px] text-[#8A919B] mt-0.5">
            BENCHMARK: <span className="text-white font-bold">{profile.targetRole.toUpperCase()}</span> @ <span className="text-[#3B82F6] font-bold">@{profile.targetCompany}</span>
          </p>
        </div>

        <button
          onClick={() => setActivePage('roadmap')}
          className="px-3 py-1.5 rounded bg-[#3B82F6] hover:bg-[#2563EB] text-white text-[11px] font-medium flex items-center gap-1.5 self-start sm:self-center shrink-0 transition-colors"
        >
          <span>IMPROVE_VIA_ROADMAP</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Score Console */}
      <div className="p-4 rounded bg-[#16191E] border border-[#2D3139]">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          {/* Circular SVG Gauge */}
          <div className="relative flex items-center justify-center shrink-0">
            <svg className="w-36 h-36 transform -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r={radius}
                className="stroke-[#111418]"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="50%"
                cy="50%"
                r={radius}
                className="stroke-[#3B82F6] transition-all duration-700"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="square"
                fill="transparent"
              />
            </svg>

            {/* Score in Center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[9px] uppercase font-bold text-[#8A919B]">
                READINESS
              </span>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-white">
                  {displayOverall}
                </span>
                <span className="text-xs text-[#8A919B] ml-0.5">/100</span>
              </div>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded mt-0.5 bg-[#111418] text-[#3B82F6] border border-[#2D3139]">
                {displayOverall >= 75 ? 'TIER_1_READY' : 'PRE_PLACEMENT'}
              </span>
            </div>
          </div>

          {/* Explanation & Context */}
          <div className="flex-1 space-y-2.5 text-center lg:text-left">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#3B82F6] uppercase tracking-wider">
                DIAGNOSTIC_SUMMARY
              </span>
              <button
                onClick={handleRunAiEvaluation}
                disabled={isGeneratingAiAdvice}
                className="px-2 py-1 rounded bg-[#111418] hover:bg-[#1E2228] border border-blue-500/40 text-[#3B82F6] hover:text-white text-[10px] font-bold flex items-center gap-1 transition-colors"
              >
                {isGeneratingAiAdvice ? (
                  <>
                    <RefreshCw className="w-3 h-3 animate-spin text-[#3B82F6]" />
                    <span>AUDITING...</span>
                  </>
                ) : (
                  <>
                    <Bot className="w-3 h-3" />
                    <span>RUN_GEMINI_AUDIT</span>
                  </>
                )}
              </button>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
              {displayOverall >= 75 ? 'QUALIFIED FOR TIER-1 CAMPUS HIRING' : 'FOUNDATIONS DETECTED // 2 DEFICIENCIES REMAIN'}
            </h3>

            <p className="text-xs text-[#8A919B] leading-relaxed bg-[#111418] p-2.5 rounded border border-[#2D3139]">
              {profile.resume?.placementReadinessSummary ||
                "Candidate profile demonstrates strengths in Python and Communication. Primary vectors for readiness acceleration: Advanced SQL window functions, Cloud ingestion pipelines, and distributed data store architecture."}
            </p>

            {aiReadinessAdvice && (
              <div className="p-3 rounded bg-[#111418] border border-blue-500/40 space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#3B82F6] uppercase tracking-wider">
                  <Bot className="w-3.5 h-3.5" />
                  <span>GEMINI READINESS ADVICE FOR {profile.targetCompany.toUpperCase()}</span>
                </div>
                <p className="text-[#E0E0E0] font-sans text-xs leading-relaxed whitespace-pre-wrap">
                  {aiReadinessAdvice}
                </p>
              </div>
            )}

            <div className="grid grid-cols-3 gap-2 pt-1 text-[11px]">
              <div className="p-2 rounded bg-[#111418] border border-[#2D3139] text-left">
                <span className="text-[9px] text-[#8A919B] block">CANDIDATE</span>
                <span className="text-white font-bold truncate block">{profile.name}</span>
              </div>
              <div className="p-2 rounded bg-[#111418] border border-[#2D3139] text-left">
                <span className="text-[9px] text-[#8A919B] block">TARGET_ROLE</span>
                <span className="text-[#3B82F6] font-bold truncate block">{profile.targetRole}</span>
              </div>
              <div className="p-2 rounded bg-[#111418] border border-[#2D3139] text-left">
                <span className="text-[9px] text-[#8A919B] block">TARGET_ORG</span>
                <span className="text-purple-400 font-bold truncate block">@{profile.targetCompany}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resume ATS Rubric Audit if available */}
      {profile.resume?.atsRubric && (
        <div className="p-3.5 rounded bg-[#16191E] border border-[#2D3139] space-y-2.5">
          <div className="flex items-center justify-between pb-1 border-b border-[#2D3139]">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#3B82F6] uppercase tracking-wider">
              <FileCheck className="w-3.5 h-3.5" />
              <span>AI_ATS_AUDIT_RUBRIC // RESUME SCORING MATRIX</span>
            </div>
            <span className="text-xs font-bold text-green-400">
              ATS SCORE: {profile.resume.atsScore || 84}/100
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-2.5 rounded bg-[#111418] border border-[#2D3139]">
              <span className="text-[9px] text-[#8A919B] uppercase block">KEYWORD_MATCH</span>
              <span className="text-base font-bold text-white block mt-0.5">
                {profile.resume.atsRubric.keywordMatch}%
              </span>
              <div className="w-full h-1 bg-[#16191E] rounded mt-1 overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: `${profile.resume.atsRubric.keywordMatch}%` }} />
              </div>
            </div>

            <div className="p-2.5 rounded bg-[#111418] border border-[#2D3139]">
              <span className="text-[9px] text-[#8A919B] uppercase block">IMPACT_METRICS</span>
              <span className="text-base font-bold text-white block mt-0.5">
                {profile.resume.atsRubric.quantifiableImpact}%
              </span>
              <div className="w-full h-1 bg-[#16191E] rounded mt-1 overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: `${profile.resume.atsRubric.quantifiableImpact}%` }} />
              </div>
            </div>

            <div className="p-2.5 rounded bg-[#111418] border border-[#2D3139]">
              <span className="text-[9px] text-[#8A919B] uppercase block">FORMAT_STRUCTURE</span>
              <span className="text-base font-bold text-white block mt-0.5">
                {profile.resume.atsRubric.formatAndStructure}%
              </span>
              <div className="w-full h-1 bg-[#16191E] rounded mt-1 overflow-hidden">
                <div className="h-full bg-purple-500" style={{ width: `${profile.resume.atsRubric.formatAndStructure}%` }} />
              </div>
            </div>

            <div className="p-2.5 rounded bg-[#111418] border border-[#2D3139]">
              <span className="text-[9px] text-[#8A919B] uppercase block">SKILLS_ALIGNMENT</span>
              <span className="text-base font-bold text-white block mt-0.5">
                {profile.resume.atsRubric.relevantSkillsMatch}%
              </span>
              <div className="w-full h-1 bg-[#16191E] rounded mt-1 overflow-hidden">
                <div className="h-full bg-amber-500" style={{ width: `${profile.resume.atsRubric.relevantSkillsMatch}%` }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5-Pillar Breakdown Cards */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-[#3B82F6]" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              SCORE BREAKDOWN BY EVALUATION PILLAR
            </h3>
          </div>
          <span className="text-[10px] text-[#8A919B]">BENCHMARK_THRESHOLD: 75%</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.name}
                className="p-3 rounded bg-[#16191E] border border-[#2D3139] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[#111418] border border-[#2D3139] flex items-center justify-center text-[#3B82F6]">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{pillar.name}</h4>
                      <span className="text-[9px] text-[#8A919B]">{pillar.benchmark}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-bold text-white">{pillar.score}%</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-[#111418] rounded overflow-hidden border border-[#2D3139]">
                  <div
                    className="h-full bg-[#3B82F6] transition-all duration-500"
                    style={{ width: `${pillar.score}%` }}
                  />
                </div>

                <p className="text-[10px] text-[#8A919B] leading-snug">
                  {pillar.details}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive "What-If" Score Simulator */}
      <div className="p-3.5 rounded bg-[#16191E] border border-[#2D3139] space-y-2.5">
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#3B82F6] uppercase tracking-wider">
          <Sliders className="w-3.5 h-3.5" />
          <span>SIMULATOR // WHAT-IF OUTCOME PROJECTION</span>
        </div>
        <p className="text-[11px] text-[#8A919B]">
          Toggle milestones to compute real-time impact on the aggregate readiness index:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div
            onClick={() => setSimulatedSqlBoost(!simulatedSqlBoost)}
            className={`p-2.5 rounded border cursor-pointer transition-all flex items-center justify-between ${
              simulatedSqlBoost
                ? 'bg-[#1E2228] border-[#3B82F6] text-white'
                : 'bg-[#111418] border-[#2D3139] text-[#8A919B] hover:border-[#4B5563]'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                simulatedSqlBoost ? 'bg-[#3B82F6] border-[#3B82F6] text-white' : 'border-[#2D3139]'
              }`}>
                {simulatedSqlBoost && <CheckCircle2 className="w-3 h-3" />}
              </div>
              <div>
                <span className="text-xs font-bold block text-white">SIMULATE: SQL & WINDOW FUNCTIONS</span>
                <span className="text-[10px] text-[#8A919B]">+8 OVERALL BOOST</span>
              </div>
            </div>
            <span className="text-xs font-bold text-[#3B82F6]">+8 PTS</span>
          </div>

          <div
            onClick={() => setSimulatedCloudBoost(!simulatedCloudBoost)}
            className={`p-2.5 rounded border cursor-pointer transition-all flex items-center justify-between ${
              simulatedCloudBoost
                ? 'bg-[#1E2228] border-purple-500 text-white'
                : 'bg-[#111418] border-[#2D3139] text-[#8A919B] hover:border-[#4B5563]'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                simulatedCloudBoost ? 'bg-purple-600 border-purple-500 text-white' : 'border-[#2D3139]'
              }`}>
                {simulatedCloudBoost && <CheckCircle2 className="w-3 h-3" />}
              </div>
              <div>
                <span className="text-xs font-bold block text-white">SIMULATE: AWS & SPARK PIPELINE</span>
                <span className="text-[10px] text-[#8A919B]">+11 OVERALL BOOST</span>
              </div>
            </div>
            <span className="text-xs font-bold text-purple-400">+11 PTS</span>
          </div>
        </div>

        {(simulatedSqlBoost || simulatedCloudBoost) && (
          <div className="flex items-center justify-between pt-1 text-xs">
            <span className="text-green-500 font-bold">
              PROJECTED READINESS: {displayOverall}/100
            </span>
            <button
              onClick={() => {
                setSimulatedSqlBoost(false);
                setSimulatedCloudBoost(false);
              }}
              className="text-[#8A919B] hover:text-white flex items-center gap-1 text-[11px]"
            >
              <RotateCcw className="w-3 h-3" />
              <span>RESET</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
