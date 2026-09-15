import React, { useState } from 'react';
import { FileText, Upload, Sparkles, CheckCircle2, AlertCircle, X, ArrowRight, RefreshCw, FileCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SAMPLE_TECH_RESUME_TEXT } from '../utils/analysisEngine';

interface ResumeUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeUploadModal: React.FC<ResumeUploadModalProps> = ({ isOpen, onClose }) => {
  const { uploadAndParseResume, profile } = useApp();
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  const [resumeText, setResumeText] = useState(SAMPLE_TECH_RESUME_TEXT);
  const [fileName, setFileName] = useState<string>('Gowtham_R_Data_Engineer_Resume.pdf');
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractionResult, setExtractionResult] = useState<{
    skills: string[];
    atsScore: number;
    experience?: string[];
    projects?: string[];
  } | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    // Read text if text/plain or markdown, else fall back to sample text for simulation
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = (event.target?.result as string) || '';
      if (content.length > 50) {
        setResumeText(content);
      }
    };
    if (file.type.includes('text') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
      reader.readAsText(file);
    }
  };

  const handleParse = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const res = uploadAndParseResume(resumeText, fileName, '192 KB');
      setExtractionResult({
        skills: res.skills,
        atsScore: res.atsScore,
        experience: profile.resume?.extractedExperience,
        projects: profile.resume?.extractedProjects
      });
      setIsProcessing(false);
    }, 450);
  };

  const loadSampleResume = () => {
    setResumeText(SAMPLE_TECH_RESUME_TEXT);
    setFileName('Gowtham_R_Engineering_Resume.pdf');
    setActiveTab('paste');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs font-mono">
      <div className="bg-[#16191E] border border-[#2D3139] rounded-md max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-3.5 border-b border-[#2D3139] flex items-center justify-between bg-[#111418]">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded bg-blue-500/20 text-[#3B82F6] border border-[#3B82F6]/30">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                AUTOMATIC RESUME SKILL EXTRACTION
              </h3>
              <p className="text-[10px] text-[#8A919B]">
                Parse technical competencies, quantified projects, and ATS score
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#8A919B] hover:text-white hover:bg-[#1E2228] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 space-y-4 overflow-y-auto flex-1 text-xs">
          {!extractionResult ? (
            <>
              {/* Tab Selector */}
              <div className="flex border-b border-[#2D3139] gap-4 text-[11px]">
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`pb-2 font-bold transition-colors ${
                    activeTab === 'upload'
                      ? 'text-[#3B82F6] border-b-2 border-[#3B82F6]'
                      : 'text-[#8A919B] hover:text-white'
                  }`}
                >
                  UPLOAD_DOCUMENT (PDF / DOCX)
                </button>
                <button
                  onClick={() => setActiveTab('paste')}
                  className={`pb-2 font-bold transition-colors ${
                    activeTab === 'paste'
                      ? 'text-[#3B82F6] border-b-2 border-[#3B82F6]'
                      : 'text-[#8A919B] hover:text-white'
                  }`}
                >
                  RAW_TEXT_INSPECTION
                </button>
              </div>

              {activeTab === 'upload' ? (
                <div className="space-y-3">
                  <label
                    htmlFor="resume-file-input"
                    className="flex flex-col items-center justify-center border-2 border-dashed border-[#2D3139] hover:border-[#3B82F6]/60 rounded-md p-8 cursor-pointer bg-[#111418] hover:bg-[#1A1E24] transition-all group"
                  >
                    <Upload className="w-8 h-8 text-[#8A919B] group-hover:text-[#3B82F6] mb-2 transition-colors" />
                    <span className="text-xs font-bold text-white mb-1">
                      Click to Select or Drag & Drop Resume File
                    </span>
                    <span className="text-[10px] text-[#8A919B]">
                      Accepts PDF, DOCX, TXT (Max 5MB)
                    </span>
                    <input
                      id="resume-file-input"
                      type="file"
                      accept=".pdf,.docx,.txt,.md"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  <div className="flex items-center justify-between p-2.5 rounded bg-[#111418] border border-[#2D3139] text-[11px]">
                    <div className="flex items-center gap-2 truncate">
                      <FileCheck className="w-4 h-4 text-green-400 shrink-0" />
                      <span className="text-white truncate">{fileName}</span>
                    </div>
                    <button
                      type="button"
                      onClick={loadSampleResume}
                      className="text-[10px] text-[#3B82F6] hover:underline shrink-0"
                    >
                      [LOAD_SAMPLE_RESUME]
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#8A919B]">
                      PASTE RESUME OR CODE REPOSITORY CV:
                    </span>
                    <button
                      type="button"
                      onClick={loadSampleResume}
                      className="text-[10px] text-[#3B82F6] hover:underline"
                    >
                      [LOAD_PRE-POPULATED_SAMPLE]
                    </button>
                  </div>
                  <textarea
                    rows={10}
                    value={resumeText}
                    onChange={e => setResumeText(e.target.value)}
                    className="w-full bg-[#111418] border border-[#2D3139] rounded p-2.5 text-[11px] text-[#E0E2E6] focus:border-[#3B82F6] focus:outline-hidden font-mono leading-relaxed"
                    placeholder="Paste resume markdown or plain text..."
                  />
                </div>
              )}

              {/* Extraction Feature Highlights */}
              <div className="p-3 rounded bg-[#111418] border border-[#2D3139] space-y-1.5 text-[10px] text-[#8A919B]">
                <div className="flex items-center gap-1.5 text-white font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>INTELLIGENT PARSER PIPELINE:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] pt-1">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-green-400 shrink-0" />
                    <span>Auto-detects 40+ CS, Cloud & Data skills</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-green-400 shrink-0" />
                    <span>Scores ATS keyword density & metrics</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-green-400 shrink-0" />
                    <span>Synchronizes with Gap Analysis Engine</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-green-400 shrink-0" />
                    <span>Calculates Internship Match compatibility</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Results View */
            <div className="space-y-4">
              {/* ATS Score Card */}
              <div className="p-3.5 rounded bg-[#111418] border border-[#2D3139] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#8A919B] uppercase">ATS COMPATIBILITY RATING</span>
                  <div className="text-xl font-bold text-white flex items-center gap-2">
                    <span>{extractionResult.atsScore}/100</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-green-500/20 text-green-400 border border-green-500/30 font-normal">
                      HIGH READINESS
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#8A919B]">FILE_IDENTIFIER</span>
                  <div className="text-xs text-white">{fileName}</div>
                </div>
              </div>

              {/* Extracted Skills List */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-white">
                    EXTRACTED SKILLS ({extractionResult.skills.length})
                  </span>
                  <span className="text-[#3B82F6] text-[10px]">SYNCED TO PROFILE</span>
                </div>
                <div className="flex flex-wrap gap-1.5 p-2.5 rounded bg-[#111418] border border-[#2D3139]">
                  {extractionResult.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-[#1A1E24] text-[#E0E2E6] border border-[#2D3139] text-[10px] flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-2.5 h-2.5 text-green-400" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience and Project highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
                <div className="p-2.5 rounded bg-[#111418] border border-[#2D3139] space-y-1">
                  <span className="font-bold text-[#8A919B] uppercase">EXTRACTED EXPERIENCE</span>
                  <p className="text-white">HexaWave Tech Labs — Backend Engineering Intern</p>
                  <p className="text-[#8A919B]">ACM Student Chapter — Technical Secretary</p>
                </div>
                <div className="p-2.5 rounded bg-[#111418] border border-[#2D3139] space-y-1">
                  <span className="font-bold text-[#8A919B] uppercase">DETECTED PROJECTS</span>
                  <p className="text-white">Real-Time Log Stream Anomaly Aggregator</p>
                  <p className="text-[#8A919B]">E-Commerce Relational SQL Benchmark</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t border-[#2D3139] bg-[#111418] flex items-center justify-between">
          {!extractionResult ? (
            <>
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded text-[#8A919B] hover:text-white text-xs"
              >
                CANCEL
              </button>
              <button
                id="run-resume-extract-btn"
                type="button"
                onClick={handleParse}
                disabled={isProcessing || !resumeText.trim()}
                className="px-4 py-1.5 rounded bg-[#3B82F6] hover:bg-[#2563EB] disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-500/20"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>EXTRACTING_SKILLS...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>EXTRACT_SKILLS</span>
                  </>
                )}
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setExtractionResult(null)}
                className="px-3 py-1.5 rounded text-[#8A919B] hover:text-white text-xs flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>PARSE_ANOTHER</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded bg-green-600 hover:bg-green-500 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>CONFIRM & RETURN TO PROFILE</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
