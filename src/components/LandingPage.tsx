import React from 'react';
import {
  Compass,
  ArrowRight,
  Target,
  Layers,
  MapPin,
  Award,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  GraduationCap,
  ShieldCheck,
  ChevronRight,
  Cpu,
  BrainCircuit,
  Building2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LandingPage: React.FC = () => {
  const { setActivePage, profile, readiness } = useApp();

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <nav className="border-b border-slate-800/80 bg-[#0a0f1d]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white font-heading">
                NorthLane
              </span>
              <span className="text-[10px] text-indigo-400 block font-medium -mt-1 tracking-wider uppercase">
                by Noryx Technologies
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#core-solution" className="hover:text-white transition-colors">Core Solution</a>
            <a href="#demo-preview" className="hover:text-white transition-colors">Interactive Demo</a>
            <a href="#student-impact" className="hover:text-white transition-colors">Target Students</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="landing-enter-app-btn"
              onClick={() => setActivePage('dashboard')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02]"
            >
              <span>Launch Platform</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-purple-600/15 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-indigo-500/30 text-xs font-semibold text-indigo-300 mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
              <span>Placement-Readiness Intelligence for Engineering Students</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
              Know Your Skill Gap.{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400">
                Build Your Career.
              </span>
            </h1>

            {/* Subheading */}
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
              NorthLane helps engineering students understand whether their skills match their target career role and provides a personalized roadmap towards placement readiness.
            </p>

            {/* Call to Actions */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                id="hero-get-started-btn"
                onClick={() => setActivePage('dashboard')}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-base bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.02]"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                id="hero-view-analysis-btn"
                onClick={() => setActivePage('skill-gap')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-base bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-all"
              >
                <Layers className="w-5 h-5 text-indigo-400" />
                <span>Explore Skill Gap Engine</span>
              </button>
            </div>

            {/* Trust badge */}
            <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Tier 2 & Tier 3 Focused
              </span>
              <span className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-indigo-400" />
                Target Product Roles
              </span>
              <span className="flex items-center gap-1.5">
                <BrainCircuit className="w-4 h-4 text-purple-400" />
                Simulated AI Diagnostics
              </span>
            </div>
          </div>

          {/* Interactive Hero Preview Card */}
          <div className="mt-16 relative mx-auto max-w-5xl rounded-2xl border border-slate-800 bg-[#0d1424]/90 p-4 sm:p-8 shadow-2xl shadow-indigo-950/40">
            <div className="flex flex-col lg:flex-row items-stretch gap-6">
              {/* Left Live Status Preview */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-sm">
                      GR
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-white">{profile.name}</h2>
                      <p className="text-xs text-slate-400">{profile.branch} • {profile.degree} {profile.graduationYear}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                    Target: {profile.targetRole}
                  </span>
                </div>

                {/* Metric Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">Placement Readiness</span>
                    <span className="text-xl font-extrabold text-indigo-400">{readiness.overallScore}/100</span>
                    <span className="text-[10px] text-emerald-400 block mt-0.5">↑ Tier 1 Prepared</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">Roadmap Progress</span>
                    <span className="text-xl font-extrabold text-blue-400">32%</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">2 / 8 Milestones</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 col-span-2 sm:col-span-1">
                    <span className="text-[11px] text-slate-400 block">Target Company</span>
                    <span className="text-xl font-extrabold text-purple-400">{profile.targetCompany}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">High Hiring Bar</span>
                  </div>
                </div>

                {/* AI Insight Box */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-indigo-950/60 to-purple-950/60 border border-indigo-800/60">
                  <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span>AI Career Insight</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    "Based on your current skills and target role as a Data Engineer at Amazon, your biggest gaps are in cloud technologies (AWS) and core data engineering concepts (ETL, Spark). Strengthening SQL should be your immediate priority."
                  </p>
                </div>
              </div>

              {/* Right Skill Gap Snapshot */}
              <div className="w-full lg:w-80 rounded-xl bg-slate-900/80 border border-slate-800 p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Skill Gap Snapshot</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      7 Critical Gaps
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-800/40 flex items-center justify-between text-xs">
                      <span className="text-emerald-300 font-medium">Python (Advanced)</span>
                      <span className="text-[10px] text-emerald-400 font-bold">STRENGTH</span>
                    </div>
                    <div className="p-2 rounded-lg bg-amber-950/40 border border-amber-800/40 flex items-center justify-between text-xs">
                      <span className="text-amber-300 font-medium">SQL & Database Systems</span>
                      <span className="text-[10px] text-amber-400 font-bold">NEEDS WORK</span>
                    </div>
                    <div className="p-2 rounded-lg bg-rose-950/40 border border-rose-800/40 flex items-center justify-between text-xs">
                      <span className="text-rose-300 font-medium">AWS & Apache Spark</span>
                      <span className="text-[10px] text-rose-400 font-bold">CRITICAL GAP</span>
                    </div>
                  </div>
                </div>

                <button
                  id="preview-open-dashboard-btn"
                  onClick={() => setActivePage('dashboard')}
                  className="w-full mt-4 py-2 px-3 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Open Full Dashboard</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem & The Solution Section */}
      <section id="how-it-works" className="py-20 bg-[#090e1b] border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">The Real Problem</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white font-heading">
              Why Engineering Students Struggle with Placements
            </h2>
            <p className="mt-4 text-slate-300 leading-relaxed">
              Engineering students, especially from Tier 2 and Tier 3 colleges, often lack visibility into whether their current skills match the actual requirements of their target job role.
            </p>
          </div>

          {/* Problem vs NorthLane Comparison */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Common Trap */}
            <div className="p-6 sm:p-8 rounded-2xl bg-rose-950/20 border border-rose-800/40 relative">
              <div className="w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-6">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">The Scattergun Trap</h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Learning random skills and scattered YouTube tutorials without a target role in mind.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Solving generic LeetCode problems without knowing what your dream company requires.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Following vague senior advice rather than industry role benchmarks.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Entering 7th semester with no measurable readiness score or portfolio proof.</span>
                </li>
              </ul>
            </div>

            {/* The NorthLane Way */}
            <div className="p-6 sm:p-8 rounded-2xl bg-indigo-950/30 border border-indigo-500/40 relative">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">The NorthLane Precision Path</h3>
              <ul className="space-y-3 text-sm text-slate-200">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Select your exact target job role (e.g., Data Engineer, SDE, Cloud).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Benchmark your current skills against actual tech company interview bars.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Pinpoint critical gaps with AI diagnostics and instant priority order.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Follow a structured, milestone-driven roadmap and watch your readiness score climb.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core User Journey / Features */}
      <section id="core-solution" className="py-20 bg-[#070b14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">The 4 Core Pillars</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white font-heading">
              Everything You Need to Become Placement-Ready
            </h2>
            <p className="mt-4 text-slate-400">
              A purposeful 4-step framework engineered for engineering students.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1 */}
            <div
              onClick={() => setActivePage('profile')}
              className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/50 transition-all cursor-pointer group hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-5 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">1. Identify Skills</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Log your engineering branch, graduation year, and self-assess competencies across languages, tools, and fundamentals.
              </p>
            </div>

            {/* Pillar 2 */}
            <div
              onClick={() => setActivePage('skill-gap')}
              className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/50 transition-all cursor-pointer group hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-5 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">2. Discover Skill Gaps</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Categorize your inventory into Strengths, Needs Improvement, and Critical Missing Gaps required by your target company.
              </p>
            </div>

            {/* Pillar 3 */}
            <div
              onClick={() => setActivePage('roadmap')}
              className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/50 transition-all cursor-pointer group hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-5 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">3. Follow Your Roadmap</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Execute a week-by-week personalized learning sequence. Build hands-on portfolio projects and check off milestones.
              </p>
            </div>

            {/* Pillar 4 */}
            <div
              onClick={() => setActivePage('readiness')}
              className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer group hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">4. Track Placement Readiness</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Monitor your comprehensive readiness score across technical skills, problem solving, projects, communication, and resume.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Engineering Students Section */}
      <section id="student-impact" className="py-16 bg-[#090e1a] border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-800/60 text-xs font-semibold text-indigo-300 mb-4">
                <GraduationCap className="w-4 h-4 text-indigo-400" />
                Designed Specifically For Engineering Campuses
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading leading-tight">
                Built to Bridge the College-to-Placement Void
              </h2>
              <p className="mt-4 text-slate-300 leading-relaxed">
                Whether you are in your 2nd year wondering where to start, in your pre-final year gearing up for campus drives, or in final year targeting off-campus product companies:
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0 mt-1">
                    1
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Pre-Final Year Students (Class of 2026/2027)</h3>
                    <p className="text-xs text-slate-400">Establish your target role early and conquer the 8-step roadmap before recruitment season starts.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold shrink-0 mt-1">
                    2
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Final-Year Students Targeting Product Companies</h3>
                    <p className="text-xs text-slate-400">Identify high-impact gaps (System Design, Cloud, Portfolios) to stand out from 10,000+ applicants.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold shrink-0 mt-1">
                    3
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Tier 2 & Tier 3 Engineering Colleges</h3>
                    <p className="text-xs text-slate-400">Democratize tier-1 placement roadmaps without expensive bootcamps or misleading generic advice.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  id="target-student-cta-btn"
                  onClick={() => setActivePage('target-role')}
                  className="px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-500 hover:to-blue-500 transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2"
                >
                  <span>Select Your Target Role</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Visual Box */}
            <div className="rounded-2xl border border-slate-800 bg-[#0c1222] p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-300 uppercase">Sample Engineering Journey</span>
                <span className="text-xs text-indigo-400 font-semibold">Tier 2/3 Success Metric</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">Gowtham R (B.Tech CSE, 2027)</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/30">
                    On Track
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Started with random Python & C syntax → Transitioned to Data Engineer roadmap targeting Amazon.
                </p>

                <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-2 gap-3 text-center">
                  <div className="p-2 rounded-lg bg-slate-950/60">
                    <span className="text-[10px] text-slate-400 block">Initial Readiness</span>
                    <span className="text-base font-bold text-slate-400">35 / 100</span>
                  </div>
                  <div className="p-2 rounded-lg bg-indigo-950/40 border border-indigo-800/40">
                    <span className="text-[10px] text-indigo-300 block">Current Readiness</span>
                    <span className="text-base font-bold text-indigo-400">68 / 100</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-900/30 to-purple-900/20 border border-indigo-800/40 text-xs text-slate-300 italic leading-relaxed">
                "Before NorthLane, I was learning random web dev tutorials while wanting to be a Data Engineer. NorthLane pinpointed that I was missing SQL window functions, AWS S3/Glue, and Apache Spark. Now I have a real roadmap."
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Bar */}
      <section className="py-16 bg-gradient-to-b from-[#090e1a] to-[#070b14] border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-white font-heading">
            Ready to Discover Your Skill Gaps?
          </h2>
          <p className="mt-3 text-slate-300 text-sm max-w-xl mx-auto">
            NorthLane is free to explore for engineering students. Test your readiness against Amazon, Google, Microsoft, and top tech companies today.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="cta-open-dashboard-bottom"
              onClick={() => setActivePage('dashboard')}
              className="px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 text-white shadow-xl shadow-indigo-600/30 hover:scale-[1.02] transition-all"
            >
              Open Student Dashboard
            </button>
            <button
              id="cta-open-assessment-bottom"
              onClick={() => setActivePage('assessment')}
              className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-all"
            >
              Take Skill Assessment
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-[#060911] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-200">NorthLane</span>
              <span className="text-slate-400 ml-2">— Identify. Learn. Improve.</span>
            </div>
          </div>

          <div className="text-center sm:text-right">
            <p className="font-medium text-slate-300">Powered by Noryx Technologies</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Career Guidance & Placement-Readiness Platform for Engineering Students</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
