// Client AI Service for NorthLane - Communicates with server-side Gemini API endpoints

export interface HealthStatus {
  status: string;
  platform: string;
  aiModel: string;
  hasGeminiKey: boolean;
  timestamp: string;
}

export interface ExtractedResumeAI {
  candidateName: string | null;
  email: string | null;
  phone: string | null;
  degree: string | null;
  college: string | null;
  graduationYear: number | null;
  skills: string[];
  categorizedSkills?: {
    core?: string[];
    frameworks?: string[];
    tools?: string[];
    soft?: string[];
  };
  experiences?: Array<{
    title: string;
    organization: string;
    duration: string;
    summary: string;
  }>;
  projects?: Array<{
    title: string;
    technologies: string[];
    summary: string;
  }>;
  atsScore: number;
  atsRubric?: {
    keywordAlignment: number;
    quantifiedImpact: number;
    structuralClarity: number;
    techStackDepth: number;
  };
  strengths?: string[];
  weaknesses?: string[];
  actionableRecommendations?: string[];
  placementReadinessSummary?: string;
  isLiveInference: boolean;
  model?: string;
  inferenceError?: string;
}

export interface SkillGapAIResult {
  placementReadinessScore: number;
  readinessBreakdown: {
    technicalSkills: number;
    problemSolving: number;
    projectsAndExperience: number;
    communication: number;
    resumeReadiness: number;
  };
  matchingSkills: Array<{
    name: string;
    proficiency: 'advanced' | 'intermediate' | 'beginner';
    marketValidation: string;
  }>;
  missingSkills: Array<{
    name: string;
    severity: 'critical' | 'high' | 'medium';
    industryReason: string;
    recommendedAction: string;
  }>;
  criticalGapsCount: number;
  topPriorityFocus: string;
  executiveAIInsight: string;
  tailoredInterviewQuestions: Array<{
    question: string;
    focusArea: string;
    idealAnswerKey: string;
  }>;
  recommendedProjects: Array<{
    title: string;
    techStack: string[];
    description: string;
    estimatedDays: number;
  }>;
  isLiveInference: boolean;
  model?: string;
  inferenceError?: string;
}

export interface TailoredApplicationAI {
  pitch: string;
  alignmentHighlights: string[];
  interviewTips?: string[];
  isLiveInference: boolean;
  model?: string;
}

export interface AdvisorChatAI {
  reply: string;
  response?: string;
  tips?: string[];
  actionItems?: string[];
  isLiveInference: boolean;
  model?: string;
  error?: string;
}

// 1. Check AI Health Status
export async function checkAIHealth(): Promise<HealthStatus> {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) throw new Error('Health check failed');
    return await res.json();
  } catch (err) {
    return {
      status: 'offline',
      platform: 'NorthLane Career Intelligence',
      aiModel: 'gemini-3.1-flash-lite',
      hasGeminiKey: false,
      timestamp: new Date().toISOString()
    };
  }
}

// 2. Parse Resume with Gemini
export async function parseResumeWithAI(resumeText: string, targetRole?: string): Promise<ExtractedResumeAI> {
  const res = await fetch('/api/ai/parse-resume', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resumeText, targetRole })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to parse resume');
  }

  return await res.json();
}

// 3. Run Skill Gap Analysis with Gemini
export async function runSkillGapAnalysisWithAI(profile: any, targetRoleOrJob: any): Promise<SkillGapAIResult> {
  const res = await fetch('/api/ai/gap-analysis', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profile, targetRoleOrJob })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to run gap analysis');
  }

  return await res.json();
}

// 4. Generate Personalized Placement Roadmap with Gemini
export async function generateRoadmapWithAI(profile: any, targetRole: string, targetCompany?: string): Promise<any> {
  const res = await fetch('/api/ai/generate-roadmap', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profile, targetRole, targetCompany })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to generate roadmap');
  }

  return await res.json();
}

// 5. Tailor Application Pitch with Gemini
export async function tailorApplicationWithAI(profile: any, internship: any): Promise<TailoredApplicationAI> {
  const res = await fetch('/api/ai/tailor-application', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profile, internship })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to tailor application');
  }

  return await res.json();
}

// 6. Interactive Career Advisor Chat with Gemini
export async function chatWithCareerAdvisor(message: string, profile: any, history?: any[]): Promise<AdvisorChatAI> {
  const res = await fetch('/api/ai/advisor-chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, profile, history })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Career advisor chat failed');
  }

  return await res.json();
}
