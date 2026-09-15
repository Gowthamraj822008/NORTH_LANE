import React from 'react';
import {
  TrendingUp,
  CheckCircle2,
  Clock,
  Circle,
  PlayCircle,
  Sparkles,
  Award,
  ArrowRight,
  BarChart3,
  Calendar,
  Milestone,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProgressView: React.FC = () => {
  const { profile, roadmap, roadmapProgress, readiness, gapAnalysis, setActivePage } = useApp();

  const completedSteps = roadmap.filter(s => s.status === 'completed');
  const inProgressSteps = roadmap.filter(s => s.status === 'in_progress');
  const remainingSteps = roadmap.filter(s => s.status === 'not_started');

  return (
    <div className="max-w-5xl mx-auto space-y-3 pb-8 font-mono">
      {/* High Density Header Banner */}
      <div className="p-3.5 rounded bg-[#16191E] border border-[#2D3139] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#3B82F6] uppercase tracking-wider mb-0.5">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>PROGRESS_MONITOR // STAGE_METRICS</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            ROADMAP PROGRESS TRACKING
          </h2>
          <p className="text-[11px] text-[#8A919B] mt-0.5">
            EXECUTION ANALYTICS ACROSS 8-STAGE CURRICULUM FOR <span className="text-white font-bold">{profile.targetRole.toUpperCase()}</span>
          </p>
        </div>

        <button
          onClick={() => setActivePage('roadmap')}
          className="px-3 py-1.5 rounded bg-[#3B82F6] hover:bg-[#2563EB] text-white text-[11px] font-medium flex items-center gap-1.5 self-start sm:self-center shrink-0 transition-colors"
        >
          <span>UPDATE_ROADMAP_MILESTONES</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Top 4 Progress Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {/* Total Completion */}
        <div className="p-3 rounded bg-[#16191E] border border-[#2D3139]">
          <span className="text-[10px] font-bold text-[#8A919B] uppercase block">
            ROADMAP_COMPLETION
          </span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-2xl font-bold text-[#3B82F6]">
              {roadmapProgress}%
            </span>
            <span className="text-[10px] text-[#8A919B]">WEIGHTED</span>
          </div>
          <div className="w-full h-1 bg-[#111418] rounded overflow-hidden mt-2 border border-[#2D3139]">
            <div
              className="h-full bg-[#3B82F6] transition-all duration-500"
              style={{ width: `${roadmapProgress}%` }}
            />
          </div>
        </div>

        {/* Completed Skills */}
        <div className="p-3 rounded bg-[#16191E] border border-[#2D3139]">
          <span className="text-[10px] font-bold text-green-400 uppercase block">
            STAGES_COMPLETED
          </span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-2xl font-bold text-white">
              {completedSteps.length}
            </span>
            <span className="text-[10px] text-[#8A919B]">/{roadmap.length} STAGES</span>
          </div>
          <p className="text-[10px] text-[#8A919B] mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-green-400" />
            <span>VERIFIED_AND_SIGNED</span>
          </p>
        </div>

        {/* In Progress */}
        <div className="p-3 rounded bg-[#16191E] border border-[#2D3139]">
          <span className="text-[10px] font-bold text-[#3B82F6] uppercase block">
            STAGES_ACTIVE
          </span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-2xl font-bold text-[#3B82F6]">
              {inProgressSteps.length}
            </span>
            <span className="text-[10px] text-[#8A919B]">ACTIVE_SPRINT</span>
          </div>
          <p className="text-[10px] text-[#8A919B] mt-2 flex items-center gap-1">
            <PlayCircle className="w-3 h-3 text-[#3B82F6]" />
            <span>IN_PROGRESS_QUEUE</span>
          </p>
        </div>

        {/* Remaining */}
        <div className="p-3 rounded bg-[#16191E] border border-[#2D3139]">
          <span className="text-[10px] font-bold text-[#8A919B] uppercase block">
            STAGES_QUEUED
          </span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-2xl font-bold text-[#E0E0E0]">
              {remainingSteps.length}
            </span>
            <span className="text-[10px] text-[#8A919B]">PENDING</span>
          </div>
          <p className="text-[10px] text-[#8A919B] mt-2 flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#8A919B]" />
            <span>UPCOMING_MODULES</span>
          </p>
        </div>
      </div>

      {/* Visual Roadmap Milestones Checklist */}
      <div className="p-3.5 rounded bg-[#16191E] border border-[#2D3139] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#2D3139]">
          <div>
            <h3 className="text-xs font-bold text-white uppercase flex items-center gap-1.5">
              <Milestone className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span>PREPARATION_STAGES_AUDIT</span>
            </h3>
            <p className="text-[10px] text-[#8A919B] mt-0.5">
              State across all 8 strategic milestones for {profile.targetRole}.
            </p>
          </div>

          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#111418] text-[#3B82F6] border border-[#2D3139] self-start sm:self-center">
            {completedSteps.length}/{roadmap.length} COMPLETE
          </span>
        </div>

        <div className="space-y-1.5">
          {roadmap.map((step) => {
            const isDone = step.status === 'completed';
            const isInProg = step.status === 'in_progress';

            return (
              <div
                key={step.id}
                className={`p-2.5 rounded border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                  isDone
                    ? 'bg-[#16191E] border-[#2D3139]'
                    : isInProg
                    ? 'bg-[#1E2228] border-[#3B82F6]'
                    : 'bg-[#111418] border-[#2D3139]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border ${
                    isDone
                      ? 'bg-green-600 border-green-500 text-white'
                      : isInProg
                      ? 'bg-[#3B82F6] border-[#3B82F6] text-white'
                      : 'bg-[#111418] border-[#2D3139] text-[#8A919B]'
                  }`}>
                    {isDone ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : isInProg ? (
                      <PlayCircle className="w-3 h-3" />
                    ) : (
                      <span className="text-[9px] font-bold">{step.stepNumber}</span>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-[#3B82F6]">
                        STAGE_0{step.stepNumber}
                      </span>
                      <span className="text-[#4B5563]">|</span>
                      <h4 className="text-xs font-bold text-white">{step.title}</h4>
                    </div>
                    <p className="text-[10px] text-[#8A919B] mt-0.5">
                      {step.topic} • EST: {step.estimatedDuration}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 self-start sm:self-center">
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                    isDone
                      ? 'bg-green-950/60 text-green-400 border border-green-800/60'
                      : isInProg
                      ? 'bg-[#111418] text-[#3B82F6] border border-[#3B82F6]'
                      : 'bg-[#111418] text-[#8A919B] border border-[#2D3139]'
                  }`}>
                    {isDone ? 'COMPLETED' : isInProg ? 'ACTIVE' : 'QUEUED'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
