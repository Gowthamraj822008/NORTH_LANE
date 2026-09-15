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
  Circle,
  PlayCircle,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RoadmapStatus } from '../types';

export const RoadmapView: React.FC = () => {
  const { profile, roadmap, updateRoadmapStepStatus, roadmapProgress, setActivePage } = useApp();
  const [filter, setFilter] = useState<'all' | 'in_progress' | 'completed' | 'not_started'>('all');
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({
    'de-step-1': false,
    'de-step-2': true,
    'de-step-5': true
  });

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
    <div className="max-w-4xl mx-auto space-y-3 pb-8 font-mono">
      {/* High Density Header Banner */}
      <div className="p-3.5 rounded bg-[#16191E] border border-[#2D3139] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#3B82F6] uppercase tracking-wider mb-0.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>EXECUTION_MAP // 8_STAGE_CURRICULUM</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            PERSONALIZED LEARNING ROADMAP
          </h2>
          <p className="text-[11px] text-[#8A919B] mt-0.5">
            TARGET: <span className="text-white font-bold">{profile.targetRole.toUpperCase()}</span> :: BRIDGING IDENTIFIED GAPS
          </p>
        </div>

        <button
          onClick={() => setActivePage('readiness')}
          className="px-3 py-1.5 rounded bg-[#3B82F6] hover:bg-[#2563EB] text-white text-[11px] font-medium flex items-center gap-1.5 self-start sm:self-center shrink-0 transition-colors"
        >
          <span>CHECK_READINESS</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Progress & Filter Bar */}
      <div className="p-3 rounded bg-[#16191E] border border-[#2D3139] space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-white">{roadmapProgress}%</span>
              <span className="text-[10px] text-[#8A919B]">
                ({completedCount}/{roadmap.length} STAGES COMPLETED)
              </span>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 p-0.5 bg-[#111418] rounded border border-[#2D3139] self-start sm:self-center">
            <button
              onClick={() => setFilter('all')}
              className={`px-2 py-0.5 rounded text-[10px] transition-all ${
                filter === 'all'
                  ? 'bg-[#3B82F6] text-white font-bold'
                  : 'text-[#8A919B] hover:text-white'
              }`}
            >
              ALL ({roadmap.length})
            </button>
            <button
              onClick={() => setFilter('in_progress')}
              className={`px-2 py-0.5 rounded text-[10px] transition-all ${
                filter === 'in_progress'
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-[#8A919B] hover:text-white'
              }`}
            >
              ACTIVE ({inProgressCount})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-2 py-0.5 rounded text-[10px] transition-all ${
                filter === 'completed'
                  ? 'bg-green-600 text-white font-bold'
                  : 'text-[#8A919B] hover:text-white'
              }`}
            >
              DONE ({completedCount})
            </button>
            <button
              onClick={() => setFilter('not_started')}
              className={`px-2 py-0.5 rounded text-[10px] transition-all ${
                filter === 'not_started'
                  ? 'bg-[#2D3139] text-white font-bold'
                  : 'text-[#8A919B] hover:text-white'
              }`}
            >
              QUEUED ({notStartedCount})
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-[#111418] rounded overflow-hidden border border-[#2D3139]">
          <div
            className="h-full bg-[#3B82F6] transition-all duration-500"
            style={{ width: `${roadmapProgress}%` }}
          />
        </div>
      </div>

      {/* Interactive Roadmap Timeline */}
      <div className="relative border-l border-[#2D3139] ml-3.5 pl-5 sm:pl-6 space-y-3">
        {filteredSteps.map((step) => {
          const isExpanded = !!expandedSteps[step.id];

          const statusStyles = {
            completed: {
              border: 'border-[#2D3139]',
              bg: 'bg-[#16191E]',
              dot: 'bg-green-500 text-[#0F1115]'
            },
            in_progress: {
              border: 'border-[#3B82F6]',
              bg: 'bg-[#16191E]',
              dot: 'bg-[#3B82F6] text-white'
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
                className={`absolute -left-[28px] sm:-left-[32px] top-4 w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${currentStyle.dot}`}
              >
                {step.status === 'completed' ? (
                  <Check className="w-3 h-3 stroke-[3]" />
                ) : (
                  <span>{step.stepNumber}</span>
                )}
              </div>

              {/* Step Card */}
              <div
                className={`rounded border p-3.5 ${currentStyle.border} ${currentStyle.bg}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-[#3B82F6]">
                      STAGE_0{step.stepNumber}
                    </span>
                    <span className="text-[#4B5563]">|</span>
                    <span className="text-[11px] text-[#E0E0E0] font-semibold">
                      {step.topic}
                    </span>
                    <span className="text-[#4B5563]">|</span>
                    <span className="text-[10px] text-[#8A919B] flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {step.estimatedDuration}
                    </span>
                  </div>

                  {/* Status Dropdown/Selector */}
                  <div className="flex items-center gap-1 bg-[#111418] p-0.5 rounded border border-[#2D3139] self-start sm:self-center">
                    <button
                      onClick={() => handleStatusChange(step.id, 'not_started')}
                      className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
                        step.status === 'not_started'
                          ? 'bg-[#2D3139] text-white font-bold'
                          : 'text-[#8A919B] hover:text-white'
                      }`}
                    >
                      QUEUED
                    </button>
                    <button
                      onClick={() => handleStatusChange(step.id, 'in_progress')}
                      className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
                        step.status === 'in_progress'
                          ? 'bg-[#3B82F6] text-white font-bold'
                          : 'text-[#8A919B] hover:text-white'
                      }`}
                    >
                      ACTIVE
                    </button>
                    <button
                      onClick={() => handleStatusChange(step.id, 'completed')}
                      className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
                        step.status === 'completed'
                          ? 'bg-green-600 text-white font-bold'
                          : 'text-[#8A919B] hover:text-white'
                      }`}
                    >
                      DONE
                    </button>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white mt-1.5">
                  {step.title}
                </h3>
                <p className="text-xs text-[#8A919B] mt-1 leading-relaxed">
                  {step.description}
                </p>

                {/* Subtopics Checklist Preview */}
                <div className="mt-2.5 pt-2 border-t border-[#2D3139]">
                  <div
                    onClick={() => toggleExpand(step.id)}
                    className="flex items-center justify-between cursor-pointer text-[11px] text-[#8A919B] hover:text-white select-none"
                  >
                    <span>CURRICULUM_MODULES ({step.subtopics.length} TOPICS)</span>
                    <button className="p-0.5 text-[#8A919B] hover:text-white">
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="mt-2 space-y-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {step.subtopics.map((subtopic, i) => (
                          <div
                            key={i}
                            className="p-1.5 rounded bg-[#111418] border border-[#2D3139] flex items-center gap-1.5 text-[11px] text-[#E0E0E0]"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shrink-0" />
                            <span>{subtopic}</span>
                          </div>
                        ))}
                      </div>

                      {step.keyProjects && step.keyProjects.length > 0 && (
                        <div className="p-2.5 rounded bg-[#111418] border border-[#2D3139] mt-2">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#3B82F6] mb-1 uppercase">
                            <FolderGit2 className="w-3 h-3 text-[#3B82F6]" />
                            <span>PORTFOLIO_ARTIFACT</span>
                          </div>
                          {step.keyProjects.map((proj, idx) => (
                            <p key={idx} className="text-xs text-[#8A919B]">
                              • <span className="font-semibold text-white">{proj}</span>
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
    </div>
  );
};
