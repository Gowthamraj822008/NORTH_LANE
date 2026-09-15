import React, { useState } from 'react';
import {
  MapPin,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  FolderGit2,
  Check,
  Zap,
  RefreshCw,
  BookOpen,
  Compass,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RoadmapStatus } from '../types';
import { generateRoadmapWithAI } from '../services/aiService';

interface AIRoadmapPhase {
  id: string;
  phaseName: string;
  duration: string;
  focus: string;
  milestones: Array<{
    id: string;
    title: string;
    description: string;
    skillsCovered: string[];
    estimatedHours: number;
    recommendedResources?: Array<{ name: string; type: string }>;
  }>;
}

interface AIRoadmapData {
  role: string;
  totalEstimatedWeeks: number;
  phases: AIRoadmapPhase[];
  coachAdvice?: string;
  isLiveInference: boolean;
  model?: string;
}

export const RoadmapView: React.FC = () => {
  const { profile, roadmap, updateRoadmapStepStatus, roadmapProgress, setActivePage } = useApp();
  const [filter, setFilter] = useState<'all' | 'in_progress' | 'completed' | 'not_started'>('all');
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({
    'de-step-1': false,
    'de-step-2': true,
    'de-step-5': true
  });

  const [aiRoadmap, setAiRoadmap] = useState<AIRoadmapData | null>(null);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [viewMode, setViewMode] = useState<'curated' | 'ai'>('curated');

  const handleGenerateAIRoadmap = async () => {
    setIsGeneratingAI(true);
    try {
      const data = await generateRoadmapWithAI(profile, profile.targetRole, profile.targetCompany);
      setAiRoadmap(data);
      setViewMode('ai');
    } catch (err) {
      console.error('Failed to generate AI roadmap:', err);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const toggleExpand = (stepId: string) => {
    setExpandedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  const handleStatusChange = (stepId: string, status: RoadmapStatus) => {
    updateRoadmapStepStatus(stepId, status);
  };

  const filteredSteps = roadmap.filter(step => {
    if (filter === 'all') return true;
    return step.status === filter;
  });

  const completedCount = roadmap.filter(s => s.status === 'completed').length;
  const inProgressCount = roadmap.filter(s => s.status === 'in_progress').length;
  const notStartedCount = roadmap.filter(s => s.status === 'not_started').length;

  return (
    <div className="max-w-4xl mx-auto space-y-4 pb-8 font-sans text-xs">
      {/* Header Banner */}
      <div className="p-4 rounded-xl bg-[#16191E] border border-[#2D3139] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
            <MapPin className="w-4 h-4 text-blue-400" />
            <span>Structured Career Curriculum</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Personalized Learning & Placement Roadmap
          </h2>
          <p className="text-xs text-[#8A919B] mt-1">
            Target Role: <span className="text-white font-medium">{profile.targetRole}</span> @{' '}
            <span className="text-blue-400 font-medium">{profile.targetCompany}</span>
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            id="generate-ai-roadmap-btn"
            onClick={handleGenerateAIRoadmap}
            disabled={isGeneratingAI}
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium text-xs flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
          >
            {isGeneratingAI ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Generating with Gemini...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>{aiRoadmap ? 'Re-Generate AI Curriculum' : 'Generate AI Roadmap'}</span>
              </>
            )}
          </button>

          <button
            onClick={() => setActivePage('readiness')}
            className="px-3.5 py-1.5 rounded-lg bg-[#1E2228] hover:bg-[#282D36] text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <span>Readiness Score</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Switch Between Standard Curated Curriculum vs AI Generated Sprints */}
      {aiRoadmap && (
        <div className="p-3 rounded-xl bg-[#16191E] border border-[#2D3139] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#8A919B]">Curriculum Mode:</span>
            <div className="flex bg-[#111418] p-1 rounded-lg border border-[#2D3139]">
              <button
                onClick={() => setViewMode('curated')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  viewMode === 'curated' ? 'bg-blue-600 text-white shadow-sm' : 'text-[#8A919B] hover:text-white'
                }`}
              >
                Curated 8-Stage Plan
              </button>
              <button
                onClick={() => setViewMode('ai')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  viewMode === 'ai' ? 'bg-blue-600 text-white shadow-sm' : 'text-[#8A919B] hover:text-white'
                }`}
              >
                Gemini Adaptive Sprints ({aiRoadmap.totalEstimatedWeeks} Weeks)
              </button>
            </div>
          </div>

          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px]">
            Live Gemini Model
          </span>
        </div>
      )}

      {/* AI Roadmap Display */}
      {viewMode === 'ai' && aiRoadmap ? (
        <div className="space-y-4">
          {aiRoadmap.coachAdvice && (
            <div className="p-4 rounded-xl bg-[#16191E] border-l-4 border-blue-500 text-xs leading-relaxed space-y-1">
              <span className="text-blue-400 font-semibold block text-xs uppercase tracking-wide">
                Gemini Career Coach Guidance
              </span>
              <p className="text-[#D0D4DC]">{aiRoadmap.coachAdvice}</p>
            </div>
          )}

          <div className="space-y-3">
            {aiRoadmap.phases.map((phase, pIdx) => (
              <div key={phase.id || pIdx} className="p-4 rounded-xl bg-[#16191E] border border-[#2D3139] space-y-3">
                <div className="flex items-center justify-between border-b border-[#2D3139] pb-2.5">
                  <div>
                    <h3 className="text-sm font-bold text-white">{phase.phaseName}</h3>
                    <p className="text-xs text-[#8A919B] mt-0.5">{phase.focus}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-[#111418] text-blue-400 border border-blue-500/30 text-xs font-medium">
                    {phase.duration}
                  </span>
                </div>

                <div className="space-y-2.5 pt-1">
                  {phase.milestones.map((m, mIdx) => (
                    <div key={m.id || mIdx} className="p-3 rounded-lg bg-[#111418] border border-[#2D3139] space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-xs font-semibold text-white">{m.title}</h4>
                          <p className="text-[11px] text-[#8A919B] mt-1 leading-relaxed">{m.description}</p>
                        </div>
                        <span className="text-[11px] text-[#8A919B] bg-[#16191E] px-2 py-0.5 rounded border border-[#2D3139] shrink-0">
                          {m.estimatedHours} hrs
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[10px] text-[#8A919B]">Target Skills:</span>
                        {m.skillsCovered.map((sk, sIdx) => (
                          <span key={sIdx} className="px-2 py-0.5 rounded bg-[#1E2228] text-emerald-400 text-[10px] border border-emerald-500/20">
                            {sk}
                          </span>
                        ))}
                      </div>

                      {m.recommendedResources && m.recommendedResources.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#2D3139]/60 text-[10px] text-[#9EA6B3]">
                          <span className="font-semibold text-blue-400">Resources:</span>
                          {m.recommendedResources.map((res, rIdx) => (
                            <span key={rIdx} className="flex items-center gap-1">
                              <span>{res.name}</span>
                              <span className="text-[#6B7280]">({res.type})</span>
                              {rIdx < (m.recommendedResources?.length || 0) - 1 && <span>•</span>}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Curated 8-Stage Curriculum View */
        <>
          {/* Progress & Filter Bar */}
          <div className="p-4 rounded-xl bg-[#16191E] border border-[#2D3139] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">{roadmapProgress}%</span>
                  <span className="text-xs text-[#8A919B]">
                    ({completedCount} of {roadmap.length} stages completed)
                  </span>
                </div>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1 p-1 bg-[#111418] rounded-lg border border-[#2D3139] self-start sm:self-center">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                    filter === 'all' ? 'bg-blue-600 text-white shadow-sm' : 'text-[#8A919B] hover:text-white'
                  }`}
                >
                  All ({roadmap.length})
                </button>
                <button
                  onClick={() => setFilter('in_progress')}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                    filter === 'in_progress' ? 'bg-blue-600 text-white shadow-sm' : 'text-[#8A919B] hover:text-white'
                  }`}
                >
                  In Progress ({inProgressCount})
                </button>
                <button
                  onClick={() => setFilter('completed')}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                    filter === 'completed' ? 'bg-emerald-600 text-white shadow-sm' : 'text-[#8A919B] hover:text-white'
                  }`}
                >
                  Done ({completedCount})
                </button>
                <button
                  onClick={() => setFilter('not_started')}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                    filter === 'not_started' ? 'bg-[#2D3139] text-white shadow-sm' : 'text-[#8A919B] hover:text-white'
                  }`}
                >
                  Queued ({notStartedCount})
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 bg-[#111418] rounded-full overflow-hidden border border-[#2D3139]">
              <div
                className="h-full bg-blue-600 transition-all duration-500 rounded-full"
                style={{ width: `${roadmapProgress}%` }}
              />
            </div>
          </div>

          {/* Interactive Roadmap Timeline */}
          <div className="relative border-l border-[#2D3139] ml-4 pl-6 space-y-4">
            {filteredSteps.map(step => {
              const isExpanded = !!expandedSteps[step.id];

              const statusStyles = {
                completed: {
                  border: 'border-[#2D3139]',
                  bg: 'bg-[#16191E]',
                  dot: 'bg-emerald-500 text-black'
                },
                in_progress: {
                  border: 'border-blue-500/50',
                  bg: 'bg-[#16191E]',
                  dot: 'bg-blue-600 text-white ring-4 ring-blue-500/20'
                },
                not_started: {
                  border: 'border-[#2D3139]',
                  bg: 'bg-[#111418]',
                  dot: 'bg-[#2D3139] text-[#8A919B]'
                }
              };

              const currentStyle = statusStyles[step.status];

              return (
                <div key={step.id} className="relative group">
                  {/* Timeline marker icon */}
                  <div
                    className={`absolute -left-[35px] top-4 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${currentStyle.dot}`}
                  >
                    {step.status === 'completed' ? (
                      <Check className="w-3 h-3 stroke-[3]" />
                    ) : (
                      <span>{step.stepNumber}</span>
                    )}
                  </div>

                  {/* Step Card */}
                  <div className={`rounded-xl border p-4 ${currentStyle.border} ${currentStyle.bg}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-blue-400">Stage {step.stepNumber}</span>
                        <span className="text-[#4B5563]">•</span>
                        <span className="text-xs text-[#E0E2E6] font-semibold">{step.topic}</span>
                        <span className="text-[#4B5563]">•</span>
                        <span className="text-[11px] text-[#8A919B] flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {step.estimatedDuration}
                        </span>
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center gap-1 bg-[#111418] p-1 rounded-lg border border-[#2D3139] self-start sm:self-center">
                        <button
                          onClick={() => handleStatusChange(step.id, 'not_started')}
                          className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
                            step.status === 'not_started'
                              ? 'bg-[#2D3139] text-white'
                              : 'text-[#8A919B] hover:text-white'
                          }`}
                        >
                          Queued
                        </button>
                        <button
                          onClick={() => handleStatusChange(step.id, 'in_progress')}
                          className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
                            step.status === 'in_progress'
                              ? 'bg-blue-600 text-white'
                              : 'text-[#8A919B] hover:text-white'
                          }`}
                        >
                          Active
                        </button>
                        <button
                          onClick={() => handleStatusChange(step.id, 'completed')}
                          className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
                            step.status === 'completed'
                              ? 'bg-emerald-600 text-white'
                              : 'text-[#8A919B] hover:text-white'
                          }`}
                        >
                          Done
                        </button>
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-white mt-2">{step.title}</h3>
                    <p className="text-xs text-[#8A919B] mt-1.5 leading-relaxed">{step.description}</p>

                    {/* Subtopics Checklist Preview */}
                    <div className="mt-3 pt-2.5 border-t border-[#2D3139]">
                      <div
                        onClick={() => toggleExpand(step.id)}
                        className="flex items-center justify-between cursor-pointer text-xs text-[#8A919B] hover:text-white select-none"
                      >
                        <span className="font-medium">Curriculum Modules ({step.subtopics.length} Key Topics)</span>
                        <button className="p-0.5 text-[#8A919B] hover:text-white">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>

                      {isExpanded && (
                        <div className="mt-2.5 space-y-2.5">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {step.subtopics.map((subtopic, i) => (
                              <div
                                key={i}
                                className="p-2 rounded-lg bg-[#111418] border border-[#2D3139] flex items-center gap-2 text-xs text-[#E0E2E6]"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                                <span>{subtopic}</span>
                              </div>
                            ))}
                          </div>

                          {step.keyProjects && step.keyProjects.length > 0 && (
                            <div className="p-3 rounded-lg bg-[#111418] border border-[#2D3139] mt-2">
                              <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 mb-1.5">
                                <FolderGit2 className="w-3.5 h-3.5 text-blue-400" />
                                <span>Portfolio Capstone Artifact</span>
                              </div>
                              {step.keyProjects.map((proj, idx) => (
                                <p key={idx} className="text-xs text-[#A0A6B2]">
                                  • <span className="font-medium text-white">{proj}</span>
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
