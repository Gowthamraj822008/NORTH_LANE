import React, { useState } from 'react';
import {
  Settings,
  RefreshCw,
  Trash2,
  Database,
  ShieldCheck,
  Building,
  CheckCircle2,
  Download,
  Upload,
  Cpu
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SettingsView: React.FC = () => {
  const { profile, resetAllData, setActivePage } = useApp();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleReset = () => {
    resetAllData();
    setStatusMessage('LOCAL_STORAGE_RESET_TO_DEFAULT_PROFILE (Gowtham R, Data Engineer @ Amazon)');
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleExport = () => {
    const data = {
      profile,
      exportDate: new Date().toISOString(),
      platform: 'NorthLane by Noryx Technologies'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `northlane_profile_${profile.name.replace(/\s+/g, '_').toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setStatusMessage('PROFILE_EXPORTED_AS_JSON');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-3 pb-8 font-mono">
      {/* High Density Header Banner */}
      <div className="p-3.5 rounded bg-[#16191E] border border-[#2D3139]">
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#3B82F6] uppercase tracking-wider mb-0.5">
          <Settings className="w-3.5 h-3.5" />
          <span>SYSTEM_CONFIGURATION // DATA_STATE</span>
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
          PLATFORM CONTROLS & PERSISTENCE
        </h2>
        <p className="text-[11px] text-[#8A919B] mt-0.5">
          MANAGE CLIENT-SIDE STORAGE STATE, RECOVERY VECTORS, AND APPLICATION PARAMETERS
        </p>
      </div>

      {statusMessage && (
        <div className="p-2 rounded bg-[#111418] border border-[#3B82F6] text-[#3B82F6] text-[10px] font-bold flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>STATUS: {statusMessage}</span>
        </div>
      )}

      {/* Venture Information Card */}
      <div className="p-3 rounded bg-[#16191E] border border-[#2D3139] space-y-2">
        <div className="flex items-center justify-between pb-1.5 border-b border-[#2D3139]">
          <span className="text-xs font-bold text-white uppercase flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>VENTURE_IDENTITY // METADATA</span>
          </span>
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#111418] text-[#3B82F6] border border-[#2D3139]">
            NORYX_TECHNOLOGIES
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="p-2 rounded bg-[#111418] border border-[#2D3139]">
            <span className="text-[9px] font-bold text-[#8A919B] uppercase block mb-0.5">PRODUCT</span>
            <span className="font-bold text-white text-xs">NORTHLANE</span>
            <p className="text-[10px] text-[#8A919B] mt-0.5">AI-powered placement readiness & career analytics engine for engineering undergraduates.</p>
          </div>
          <div className="p-2 rounded bg-[#111418] border border-[#2D3139]">
            <span className="text-[9px] font-bold text-[#8A919B] uppercase block mb-0.5">PARENT_ORGANIZATION</span>
            <span className="font-bold text-[#3B82F6] text-xs">NORYX TECHNOLOGIES</span>
            <p className="text-[10px] text-[#8A919B] mt-0.5">Tagline: "Identify. Learn. Improve." Architecture: Client-side local key-value persistence.</p>
          </div>
        </div>
      </div>

      {/* Demo Data Management */}
      <div className="p-3 rounded bg-[#16191E] border border-[#2D3139] space-y-2.5">
        <div className="flex items-center justify-between pb-1.5 border-b border-[#2D3139]">
          <div className="flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span className="text-xs font-bold text-white uppercase">STORAGE_IO // BACKUP_&_RESET</span>
          </div>
        </div>

        <p className="text-[10px] text-[#8A919B] leading-relaxed">
          Candidate assessments, role targets, completed checklist markers, and mock scores synchronize automatically to browser <code className="text-[#3B82F6]">localStorage</code>.
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          <button
            onClick={handleExport}
            className="px-3 py-1.5 rounded bg-[#111418] hover:bg-[#1E2228] text-white text-[11px] font-medium flex items-center gap-1.5 border border-[#2D3139] transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>EXPORT_CANDIDATE_JSON</span>
          </button>

          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded bg-[#111418] hover:bg-red-950/60 text-red-400 hover:text-red-300 border border-red-900/60 text-[11px] font-medium flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>RESET_TO_GOWTHAM_R_DEFAULTS</span>
          </button>
        </div>
      </div>
    </div>
  );
};
