import React, { useState } from 'react';
import { FileText, Upload, Sparkles, CheckCircle2, AlertCircle, X, RefreshCw, FileCheck, Brain, ArrowUpRight, Award, HelpCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SAMPLE_TECH_RESUME_TEXT } from '../utils/analysisEngine';
import { ExtractedResumeAI } from '../services/aiService';

interface ResumeUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SWE_SAMPLE_RESUME = `Aravind Raman
B.Tech in Computer Science & Engineering | College of Engineering (2026)
Email: aravind.raman@eng.edu | Phone: +91 98401 54321
GitHub: https://github.com/aravind-raman-tech | LinkedIn: linkedin.com/in/aravind-raman-engineer

TECHNICAL SKILLS
- Languages: Python, SQL, C++, TypeScript, JavaScript
- Frameworks & Libraries: Flask, Node.js, Express, React, Tailwind CSS
- Data & Cloud: PostgreSQL, Redis, Docker, AWS S3, Git, Linux
- Core Concepts: Data Structures & Algorithms, RESTful APIs, Distributed Systems

EXPERIENCE
Backend Engineering Intern | HexaWave Tech Labs (May 2025 - Jul 2025)
- Architected and deployed automated ETL ingestion pipelines in Python, processing 150K telemetry events daily with 99.8% uptime.
- Optimized slow SQL aggregation queries in PostgreSQL by adding compound indexes, reducing p95 latency from 420ms to 45ms.
- Containerized development environments using Docker and Docker Compose, reducing team onboarding setup time by 40%.

Technical Secretary | ACM Collegiate Chapter (Aug 2024 - Present)
- Organized hands-on workshops on competitive programming and algorithms for 150+ undergraduate engineers.
- Mentored students on algorithmic problem solving in C++ and Python.

PROJECTS
Distributed Stream Anomaly Detection Engine (Python, Redis, Docker)
- Built a multi-threaded event processing broker consuming real-time JSON log streams at 15,000 events/sec.
- Implemented sliding-window rate tracking with Redis in-memory storage to detect denial-of-service signatures.

High-Throughput Analytics Schema & Benchmark (SQL, PostgreSQL)
- Designed normalized 3NF schemas with partition keys for high-volume transactions and automated migration scripts.`;

export const ResumeUploadModal: React.FC<ResumeUploadModalProps> = ({ isOpen, onClose }) => {
  const { uploadAndParseResumeAsync, profile } = useApp();
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  const [resumeText, setResumeText] = useState(SWE_SAMPLE_RESUME);
  const [fileName, setFileName] = useState<string>('Aravind_Raman_Resume.pdf');
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [extractionResult, setExtractionResult] = useState<ExtractedResumeAI | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
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

  const handleParse = async () => {
    setIsProcessing(true);
    setStatusMessage('Connecting to Gemini AI Placement Model...');

    const timer1 = setTimeout(() => {
      setStatusMessage('Extracting technical competencies & quantifying impact...');
    }, 900);

    const timer2 = setTimeout(() => {
      setStatusMessage('Computing ATS score and placement diagnostic rubric...');
    }, 1800);

    try {
      const result = await uploadAndParseResumeAsync(resumeText, fileName, '210 KB');
      setExtractionResult(result);
    } catch (err) {
      console.error('Extraction error:', err);
    } finally {
      clearTimeout(timer1);
      clearTimeout(timer2);
      setIsProcessing(false);
      setStatusMessage('');
    }
  };

  const loadTemplate = (type: 'swe' | 'data') => {
    if (type === 'swe') {
      setResumeText(SWE_SAMPLE_RESUME);
      setFileName('Aravind_Raman_Software_Resume.pdf');
    } else {
      setResumeText(SAMPLE_TECH_RESUME_TEXT);
      setFileName('Aravind_Raman_Data_Engineer_Resume.pdf');
    }
    setActiveTab('paste');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs font-sans">
      <div className="bg-[#16191E] border border-[#2D3139] rounded-xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 border-b border-[#2D3139] flex items-center justify-between bg-[#111418]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Brain className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-white tracking-wide">
                  AI Resume Skill & ATS Extraction
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Gemini Inference
                </span>
              </div>
              <p className="text-xs text-[#8A919B] mt-0.5">
                Automatically extracts competencies, verifies ATS density, and diagnoses placement readiness
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8A919B] hover:text-white hover:bg-[#1E2228] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1 text-xs">
          {!extractionResult ? (
            <>
              {/* Tab Selector */}
              <div className="flex border-b border-[#2D3139] gap-6 text-xs">
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`pb-2.5 font-medium transition-colors ${
                    activeTab === 'upload'
                      ? 'text-blue-400 border-b-2 border-blue-400'
                      : 'text-[#8A919B] hover:text-white'
                  }`}
                >
                  Upload Document (PDF / DOCX)
                </button>
                <button
                  onClick={() => setActiveTab('paste')}
                  className={`pb-2.5 font-medium transition-colors ${
                    activeTab === 'paste'
                      ? 'text-blue-400 border-b-2 border-blue-400'
                      : 'text-[#8A919B] hover:text-white'
                  }`}
                >
                  Paste Text or Markdown
                </button>
              </div>

              {activeTab === 'upload' ? (
                <div className="space-y-3">
                  <label
                    htmlFor="resume-file-input"
                    className="flex flex-col items-center justify-center border-2 border-dashed border-[#2D3139] hover:border-blue-500/50 rounded-lg p-8 cursor-pointer bg-[#111418] hover:bg-[#14181E] transition-all group"
                  >
                    <Upload className="w-8 h-8 text-[#8A919B] group-hover:text-blue-400 mb-2.5 transition-colors" />
                    <span className="text-xs font-semibold text-white mb-1">
                      Click to browse or drop your resume here
                    </span>
                    <span className="text-[11px] text-[#8A919B]">
                      Accepts PDF, DOCX, Markdown, or Plain Text (Max 5MB)
                    </span>
                    <input
                      id="resume-file-input"
                      type="file"
                      accept=".pdf,.docx,.txt,.md"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#111418] border border-[#2D3139] text-xs">
                    <div className="flex items-center gap-2 truncate">
                      <FileCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-white font-medium truncate">{fileName}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] text-[#8A919B]">Or test with template:</span>
                      <button
                        type="button"
                        onClick={() => loadTemplate('swe')}
                        className="text-xs text-blue-400 hover:text-blue-300 underline"
                      >
                        Software Engineer
                      </button>
                      <span className="text-[#8A919B]">•</span>
                      <button
                        type="button"
                        onClick={() => loadTemplate('data')}
                        className="text-xs text-blue-400 hover:text-blue-300 underline"
                      >
                        Data Engineer
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#8A919B]">
                      Paste resume markdown or plain text:
                    </span>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-[#8A919B]">Sample:</span>
                      <button
                        type="button"
                        onClick={() => loadTemplate('swe')}
                        className="text-blue-400 hover:text-blue-300 underline"
                      >
                        Full Stack / SWE
                      </button>
                      <span className="text-[#8A919B]">•</span>
                      <button
                        type="button"
                        onClick={() => loadTemplate('data')}
                        className="text-blue-400 hover:text-blue-300 underline"
                      >
                        Data & Cloud
                      </button>
                    </div>
                  </div>
                  <textarea
                    rows={9}
                    value={resumeText}
                    onChange={e => setResumeText(e.target.value)}
                    className="w-full bg-[#111418] border border-[#2D3139] rounded-lg p-3 text-xs text-[#E0E2E6] focus:border-blue-500 focus:outline-hidden font-mono leading-relaxed resize-none"
                    placeholder="Paste resume content here..."
                  />
                </div>
              )}

              {/* Extraction Feature Highlights */}
              <div className="p-3.5 rounded-lg bg-[#111418] border border-[#2D3139] space-y-2 text-xs text-[#8A919B]">
                <div className="flex items-center justify-between text-white font-medium">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>Real-Time AI Extraction Pipeline</span>
                  </div>
                  <span className="text-[11px] text-blue-400">Target Role: {profile.targetRole}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Auto-detects languages, frameworks & cloud tools</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Multi-dimensional ATS scoring rubric</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Calculates gap vs Tier-1 company bars</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Synchronizes with Placement Readiness index</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Results View */
            <div className="space-y-4">
              {/* ATS Score Banner */}
              <div className="p-4 rounded-lg bg-[#111418] border border-[#2D3139] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] text-[#8A919B] uppercase font-semibold">ATS Compatibility Rating</span>
                    {extractionResult.isLiveInference && (
                      <span className="px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30 text-[10px]">
                        Live Gemini Inference
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-white">
                      {extractionResult.atsScore} <span className="text-sm font-normal text-[#8A919B]">/ 100</span>
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      extractionResult.atsScore >= 80
                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                        : extractionResult.atsScore >= 65
                        ? 'bg-blue-500/15 text-blue-400 border-blue-500/30'
                        : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                    }`}>
                      {extractionResult.atsScore >= 80 ? 'Placement Competitive' : 'Solid Base, Needs Metrics'}
                    </span>
                  </div>
                </div>

                {extractionResult.atsRubric && (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] bg-[#16191E] p-2.5 rounded-md border border-[#2D3139]">
                    <div className="flex justify-between gap-2">
                      <span className="text-[#8A919B]">Keywords:</span>
                      <span className="text-white font-medium">{extractionResult.atsRubric.keywordAlignment}%</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-[#8A919B]">Metrics/Impact:</span>
                      <span className="text-white font-medium">{extractionResult.atsRubric.quantifiedImpact}%</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-[#8A919B]">Structure:</span>
                      <span className="text-white font-medium">{extractionResult.atsRubric.structuralClarity}%</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-[#8A919B]">Tech Depth:</span>
                      <span className="text-white font-medium">{extractionResult.atsRubric.techStackDepth}%</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Placement Readiness Summary */}
              {extractionResult.placementReadinessSummary && (
                <div className="p-3.5 rounded-lg bg-blue-500/5 border border-blue-500/20 text-xs">
                  <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-wide block mb-1">
                    AI Placement Evaluation
                  </span>
                  <p className="text-[#D0D4DC] leading-relaxed">
                    {extractionResult.placementReadinessSummary}
                  </p>
                </div>
              )}

              {/* Extracted Skills List */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">
                    Extracted Technical Skills ({extractionResult.skills.length})
                  </span>
                  <span className="text-emerald-400 text-[11px] font-medium">✓ Synced to Profile</span>
                </div>
                <div className="flex flex-wrap gap-1.5 p-3 rounded-lg bg-[#111418] border border-[#2D3139]">
                  {extractionResult.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-[#1E2228] text-[#E0E2E6] border border-[#2D3139] text-xs flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Strengths and Recommendations */}
              {(extractionResult.strengths?.length || extractionResult.actionableRecommendations?.length) ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {extractionResult.strengths && extractionResult.strengths.length > 0 && (
                    <div className="p-3 rounded-lg bg-[#111418] border border-[#2D3139] space-y-1.5">
                      <span className="font-semibold text-emerald-400 text-[11px] uppercase block">
                        Observed Strengths
                      </span>
                      <ul className="space-y-1 text-[#B0B6C0]">
                        {extractionResult.strengths.slice(0, 3).map((st, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-400 mt-0.5">•</span>
                            <span>{st}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {extractionResult.actionableRecommendations && extractionResult.actionableRecommendations.length > 0 && (
                    <div className="p-3 rounded-lg bg-[#111418] border border-[#2D3139] space-y-1.5">
                      <span className="font-semibold text-blue-400 text-[11px] uppercase block">
                        Actionable Recommendations
                      </span>
                      <ul className="space-y-1 text-[#B0B6C0]">
                        {extractionResult.actionableRecommendations.slice(0, 3).map((rec, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-blue-400 mt-0.5">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#2D3139] bg-[#111418] flex items-center justify-between">
          {!extractionResult ? (
            <>
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 rounded-lg text-[#8A919B] hover:text-white text-xs font-medium"
              >
                Cancel
              </button>
              <button
                id="run-resume-extract-btn"
                type="button"
                onClick={handleParse}
                disabled={isProcessing || !resumeText.trim()}
                className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium text-xs flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-colors"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>{statusMessage || 'Analyzing with AI...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Analyze Resume with AI</span>
                  </>
                )}
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setExtractionResult(null)}
                className="px-3.5 py-2 rounded-lg text-[#8A919B] hover:text-white text-xs font-medium flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Parse Another Resume</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-600/20 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Done & View Updated Profile</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
