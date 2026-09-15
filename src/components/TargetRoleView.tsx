import React from 'react';
import {
  Target,
  Database,
  Code2,
  BarChart3,
  Cloud,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Building2,
  Layers,
  Flame
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TARGET_ROLES } from '../data/rolesData';
import { TargetRoleData } from '../types';

export const TargetRoleView: React.FC = () => {
  const { profile, setTargetRole, setActivePage } = useApp();

  const getRoleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Database':
        return <Database className="w-4 h-4" />;
      case 'Code2':
        return <Code2 className="w-4 h-4" />;
      case 'BarChart3':
        return <BarChart3 className="w-4 h-4" />;
      case 'Cloud':
        return <Cloud className="w-4 h-4" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  const currentRole = TARGET_ROLES.find(r => r.title.toLowerCase() === profile.targetRole.toLowerCase()) || TARGET_ROLES[0];

  const handleSelectRole = (role: TargetRoleData) => {
    setTargetRole(role.title);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-3 pb-8 font-mono">
      {/* High Density Header Banner */}
      <div className="p-3.5 rounded bg-[#16191E] border border-[#2D3139] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#3B82F6] uppercase tracking-wider mb-0.5">
            <Target className="w-3.5 h-3.5" />
            <span>ROLE_TARGETING // BENCHMARK_SELECT</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            SELECT TARGET CAREER PATH
          </h2>
          <p className="text-[11px] text-[#8A919B] mt-0.5">
            Calibrates competency requirements, deficit calculations, and 8-stage roadmap algorithms.
          </p>
        </div>

        <button
          onClick={() => setActivePage('assessment')}
          className="px-3 py-1.5 rounded bg-[#3B82F6] hover:bg-[#2563EB] text-white text-[11px] font-medium flex items-center gap-1.5 self-start sm:self-center shrink-0 transition-colors"
        >
          <span>PROCEED_TO_ASSESSMENT</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Role Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {TARGET_ROLES.map(role => {
          const isSelected = currentRole.id === role.id;
          return (
            <div
              key={role.id}
              id={`role-card-${role.id}`}
              onClick={() => handleSelectRole(role)}
              className={`p-3 rounded border transition-all cursor-pointer relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#1E2228] border-[#3B82F6]'
                  : 'bg-[#16191E] border-[#2D3139] hover:border-[#4B5563]'
              }`}
            >
              {isSelected && (
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#111418] text-[#3B82F6] border border-[#3B82F6] text-[9px] font-bold">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>ACTIVE</span>
                </div>
              )}

              <div>
                <div className={`w-7 h-7 rounded flex items-center justify-center mb-2 border ${
                  isSelected
                    ? 'bg-[#3B82F6] border-[#3B82F6] text-white'
                    : 'bg-[#111418] border-[#2D3139] text-[#8A919B]'
                }`}>
                  {getRoleIcon(role.iconName)}
                </div>

                <div className="text-[9px] font-bold text-[#8A919B] uppercase">
                  {role.category}
                </div>
                <h3 className="text-xs font-bold text-white mt-0.5">
                  {role.title}
                </h3>
                <p className="text-[11px] text-[#8A919B] mt-1 line-clamp-2 leading-snug">
                  {role.tagline}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-[#2D3139] space-y-1.5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[#8A919B]">COMPETENCIES:</span>
                  <span className="font-bold text-[#3B82F6]">{role.requiredSkills.length} SKILLS</span>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[#8A919B]">PAY TIER:</span>
                  <span className="font-bold text-[#E0E0E0]">{role.averageSalaryTier.split(' ')[0]}</span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectRole(role);
                  }}
                  className={`w-full mt-1.5 py-1 rounded text-[10px] font-bold flex items-center justify-center gap-1 transition-all ${
                    isSelected
                      ? 'bg-[#3B82F6] text-white'
                      : 'bg-[#111418] hover:bg-[#1E2228] text-[#8A919B] hover:text-white border border-[#2D3139]'
                  }`}
                >
                  {isSelected ? 'SELECTED_BENCHMARK' : 'SELECT_ROLE'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Role Deep Dive / Required Skills Section */}
      <div className="p-3.5 rounded bg-[#16191E] border border-[#2D3139] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#2D3139]">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#111418] text-[#3B82F6] border border-[#2D3139] uppercase">
                ACTIVE_BENCHMARK
              </span>
              <h3 className="text-xs font-bold text-white uppercase">
                {currentRole.title} — PLACEMENT COMPETENCIES ({currentRole.requiredSkills.length})
              </h3>
            </div>
            <p className="text-[10px] text-[#8A919B] mt-0.5">
              Recruiters evaluate candidate profiles against these core engineering standards.
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-[#8A919B]">RECRUITERS:</span>
            <div className="flex flex-wrap gap-1">
              {currentRole.topCompanies.slice(0, 3).map(c => (
                <span key={c} className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-[#111418] text-[#E0E0E0] border border-[#2D3139]">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Required Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {currentRole.requiredSkills.map(skill => (
            <div
              key={skill.name}
              className="p-2.5 rounded bg-[#111418] border border-[#2D3139] hover:border-[#3B82F6] transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{skill.name}</span>
                <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                  skill.importance === 'critical'
                    ? 'bg-red-950 text-red-400 border border-red-800/60'
                    : 'bg-[#16191E] text-[#3B82F6] border border-[#2D3139]'
                }`}>
                  {skill.importance}
                </span>
              </div>
              <p className="text-[10px] text-[#8A919B] mt-1 leading-snug">
                {skill.description}
              </p>
            </div>
          ))}
        </div>

        {/* Action button */}
        <div className="pt-2 border-t border-[#2D3139] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-[#8A919B]">
            TARGET: <span className="text-white font-bold">{currentRole.title}</span>. Calibrate proficiency score against this target.
          </div>
          <button
            id="role-proceed-assessment-btn"
            onClick={() => setActivePage('assessment')}
            className="w-full sm:w-auto px-3 py-1.5 rounded bg-[#3B82F6] hover:bg-[#2563EB] text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-all"
          >
            <span>ASSESS_SKILLS_FOR_{currentRole.id.toUpperCase()}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
