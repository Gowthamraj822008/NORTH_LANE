import React, { useState } from 'react';
import {
  ClipboardCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Layers,
  Award,
  Zap,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TARGET_ROLES } from '../data/rolesData';
import { SkillLevel } from '../types';

export const SkillAssessmentView: React.FC = () => {
  const { profile, assessedSkills, rateSkill, setActivePage } = useApp();
  const [analyzingState, setAnalyzingState] = useState(false);

  const currentRole = TARGET_ROLES.find(r => r.title.toLowerCase() === profile.targetRole.toLowerCase()) || TARGET_ROLES[0];

  // Merge target role skills + user's initial current skills + Communication
  const skillsToAssessList = [
    ...currentRole.requiredSkills.map(s => s.name),
    ...profile.currentSkills,
    'Communication'
  ];
  // Deduplicate case-insensitively
  const uniqueSkills: string[] = [];
  const seen = new Set<string>();
  skillsToAssessList.forEach(name => {
    const key = name.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      uniqueSkills.push(name);
    }
  });

  const handleRatingChange = (skillName: string, level: SkillLevel) => {
    rateSkill(skillName, level);
  };

  const handleSubmitAssessment = () => {
    setAnalyzingState(true);
    setTimeout(() => {
      setAnalyzingState(false);
      setActivePage('skill-gap');
    }, 600);
  };

  const getLevelLabel = (level?: SkillLevel) => {
    switch (level) {
      case 'advanced':
        return { text: 'ADVANCED', color: 'bg-green-950/60 text-green-400 border-green-700/50' };
      case 'intermediate':
        return { text: 'INTERMEDIATE', color: 'bg-[#111418] text-[#3B82F6] border-[#3B82F6]/50' };
      case 'beginner':
        return { text: 'BEGINNER', color: 'bg-amber-950/60 text-amber-400 border-amber-700/50' };
      default:
        return { text: 'UNRATED', color: 'bg-[#111418] text-[#8A919B] border-[#2D3139]' };
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-3 pb-8 font-mono">
      {/* High Density Header Banner */}
      <div className="p-3.5 rounded bg-[#16191E] border border-[#2D3139] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#3B82F6] uppercase tracking-wider mb-0.5">
            <ClipboardCheck className="w-3.5 h-3.5" />
            <span>DIAGNOSTIC_CALIBRATION // SELF_EVAL_MATRIX</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            INTERACTIVE SKILL ASSESSMENT
          </h2>
          <p className="text-[11px] text-[#8A919B] mt-0.5">
            EVALUATE PROFICIENCY FOR <span className="text-white font-bold">{profile.targetRole.toUpperCase()}</span> TO CALIBRATE READINESS INDEX
          </p>
        </div>

        <button
          onClick={handleSubmitAssessment}
          disabled={analyzingState}
          className="px-3 py-1.5 rounded bg-[#3B82F6] hover:bg-[#2563EB] text-white text-[11px] font-medium flex items-center gap-1.5 self-start sm:self-center shrink-0 transition-colors"
        >
          {analyzingState ? (
            <>
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>COMPUTING_GAPS...</span>
            </>
          ) : (
            <>
              <span>GENERATE_GAP_ANALYSIS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>

      {/* Guide Card */}
      <div className="p-2.5 rounded bg-[#16191E] border border-[#2D3139] grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
        <div className="p-2 rounded bg-[#111418] border border-[#2D3139]">
          <span className="font-bold text-amber-400 block mb-0.5">BEGINNER</span>
          <p className="text-[#8A919B] text-[10px] leading-snug">Theoretical familiarity. Requires guidance to author non-trivial code.</p>
        </div>
        <div className="p-2 rounded bg-[#111418] border border-[#2D3139]">
          <span className="font-bold text-[#3B82F6] block mb-0.5">INTERMEDIATE</span>
          <p className="text-[#8A919B] text-[10px] leading-snug">Autonomous execution on common tasks, SQL joins, and algorithmic patterns.</p>
        </div>
        <div className="p-2 rounded bg-[#111418] border border-[#2D3139]">
          <span className="font-bold text-green-400 block mb-0.5">ADVANCED</span>
          <p className="text-[#8A919B] text-[10px] leading-snug">Production deployment ready, architectural design, interview-grade depth.</p>
        </div>
      </div>

      {/* Interactive Assessment Form */}
      <div className="space-y-1.5">
        {uniqueSkills.map((skillName, index) => {
          const currentRecord = assessedSkills[skillName];
          const currentLevel: SkillLevel = currentRecord ? currentRecord.level : 'not_started';
          const badge = getLevelLabel(currentLevel);

          return (
            <div
              key={skillName}
              id={`assessment-item-${index}`}
              className="p-3 rounded bg-[#16191E] border border-[#2D3139] hover:border-[#4B5563] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{skillName}</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${badge.color}`}>
                    {badge.text}
                  </span>
                </div>
                <p className="text-[10px] text-[#8A919B]">
                  {skillName === 'Python' && 'Syntax, OOP, data processing libraries, pipeline scripting.'}
                  {skillName === 'SQL' && 'Complex joins, window functions, CTEs, query plan optimization.'}
                  {skillName === 'Data Structures & Algorithms' && 'Arrays, hashes, trees, graphs, space-time complexity.'}
                  {skillName === 'Database Systems' && 'RDBMS constraints, ACID transaction properties, schema normalization.'}
                  {skillName === 'Cloud Computing' && 'Cloud storage tiers, compute orchestration, serverless fundamentals.'}
                  {skillName === 'Communication' && 'STAR behavioral structure, articulate technical rationale.'}
                  {!['Python', 'SQL', 'Data Structures & Algorithms', 'Database Systems', 'Cloud Computing', 'Communication'].includes(skillName) &&
                    `Placement benchmark competency for ${profile.targetRole}.`}
                </p>
              </div>

              {/* Rating Radio Buttons */}
              <div className="flex items-center gap-1 shrink-0 bg-[#111418] p-0.5 rounded border border-[#2D3139]">
                {(['not_started', 'beginner', 'intermediate', 'advanced'] as SkillLevel[]).map(lvl => {
                  const isSelected = currentLevel === lvl;
                  const labelMap = {
                    not_started: 'NONE',
                    beginner: 'BEG',
                    intermediate: 'INT',
                    advanced: 'ADV'
                  };

                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => handleRatingChange(skillName, lvl)}
                      className={`px-2 py-0.5 rounded text-[10px] transition-all ${
                        isSelected
                          ? lvl === 'advanced'
                            ? 'bg-green-600 text-white font-bold'
                            : lvl === 'intermediate'
                            ? 'bg-[#3B82F6] text-white font-bold'
                            : lvl === 'beginner'
                            ? 'bg-amber-600 text-white font-bold'
                            : 'bg-[#2D3139] text-white font-bold'
                          : 'text-[#8A919B] hover:text-white'
                      }`}
                    >
                      {labelMap[lvl]}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit Action */}
      <div className="p-3.5 rounded bg-[#16191E] border border-[#2D3139] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <h4 className="text-xs font-bold text-white uppercase">EXECUTE_DIAGNOSTIC_EVALUATION</h4>
          <p className="text-[10px] text-[#8A919B] mt-0.5">
            NorthLane will compare metrics against the {profile.targetRole} standard to generate deficit vectors.
          </p>
        </div>

        <button
          id="assessment-submit-bottom-btn"
          onClick={handleSubmitAssessment}
          disabled={analyzingState}
          className="w-full sm:w-auto px-4 py-2 rounded bg-[#3B82F6] hover:bg-[#2563EB] text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
        >
          {analyzingState ? (
            <>
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>COMPUTING_GAPS...</span>
            </>
          ) : (
            <>
              <span>SUBMIT_AND_ANALYZE_GAPS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
