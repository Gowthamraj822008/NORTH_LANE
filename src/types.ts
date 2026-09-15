export type SkillLevel = 'not_started' | 'beginner' | 'intermediate' | 'advanced';

export type RoadmapStatus = 'not_started' | 'in_progress' | 'completed';

export type UserPersona = 'student' | 'organization' | 'admin';

export interface StudentSkill {
  name: string;
  level: SkillLevel;
  category?: string;
  source?: 'initial' | 'added' | 'role_required' | 'resume_extracted';
}

export interface StudentExperience {
  id: string;
  title: string;
  organization: string;
  role: string;
  duration: string;
  technologies: string[];
  description: string;
  link?: string;
}

export interface StudentProject {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface ResumeData {
  fileName?: string;
  fileSize?: string;
  uploadedAt?: string;
  rawText?: string;
  extractedSkills: string[];
  extractedExperience: string[];
  extractedProjects: string[];
  atsScore?: number;
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
  isLiveInference?: boolean;
}

export interface StudentProfile {
  name: string;
  degree: string;
  branch: string;
  graduationYear: number;
  currentSkills: string[]; // text list of skills
  targetRole: string;
  targetCompany: string;
  bio?: string;
  college?: string;
  email?: string;
  phone?: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  interests?: string[];
  experiences?: StudentExperience[];
  projects?: StudentProject[];
  resume?: ResumeData;
}

export interface RoleSkillRequirement {
  name: string;
  category: 'core' | 'framework' | 'tools' | 'soft';
  importance: 'critical' | 'high' | 'medium';
  description: string;
}

export interface TargetRoleData {
  id: string;
  title: string;
  tagline: string;
  category: string;
  iconName: string;
  averageSalaryTier: string;
  description: string;
  requiredSkills: RoleSkillRequirement[];
  topCompanies: string[];
}

export interface RoadmapStep {
  id: string;
  stepNumber: number;
  title: string;
  topic: string;
  description: string;
  subtopics: string[];
  estimatedDuration: string;
  status: RoadmapStatus;
  keyProjects?: string[];
  importance: 'critical' | 'high' | 'medium';
}

export interface ReadinessBreakdown {
  technicalSkills: number;
  problemSolving: number;
  projectsAndExperience: number;
  communication: number;
  resumeReadiness: number;
}

export interface SkillGapAnalysisResult {
  strengths: { name: string; level: SkillLevel; note: string }[];
  needsImprovement: { name: string; level: SkillLevel; note: string }[];
  criticalGaps: { name: string; importance: string; note: string }[];
  summaryNote: string;
  aiInsight: string;
  immediatePriority: string;
}

// Internship Models
export interface InternshipRequirement {
  skillName: string;
  importance: 'critical' | 'high' | 'medium';
  minLevel?: SkillLevel;
}

export interface Internship {
  id: string;
  title: string;
  organizationId: string;
  organizationName: string;
  organizationLogo?: string;
  location: string;
  workMode: 'remote' | 'hybrid' | 'onsite';
  stipend: string;
  stipendNumeric: number;
  duration: string;
  category: string;
  description: string;
  responsibilities: string[];
  requirements: InternshipRequirement[];
  eligibility: string;
  deadline: string;
  postedDate: string;
  isFeatured?: boolean;
  applicantsCount: number;
  status: 'active' | 'closed' | 'draft';
}

export type RequirementSkill = InternshipRequirement;

export interface InternshipCompatibility {
  score: number;
  matchingSkills: { name: string; level: SkillLevel; importance: string }[];
  missingSkills: { name: string; importance: string; recommendation: string }[];
  fitRating: 'High Fit' | 'Strong Fit' | 'Moderate Fit' | 'Growth Opportunity';
  summary: string;
}

export type ApplicationStatus =
  | 'applied'
  | 'under_review'
  | 'shortlisted'
  | 'interview_scheduled'
  | 'offer_extended'
  | 'rejected'
  | 'withdrawn';

export interface InternshipApplication {
  id: string;
  internshipId: string;
  internshipTitle: string;
  organizationName: string;
  organizationLogo?: string;
  studentName: string;
  studentEmail?: string;
  appliedDate: string;
  status: ApplicationStatus;
  compatibilityScore: number;
  coverNote?: string;
  resumeFileName?: string;
  interviewDetails?: {
    date?: string;
    time?: string;
    meetLink?: string;
    notes?: string;
  };
  feedback?: string;
  timeline: { status: ApplicationStatus; date: string; message: string }[];
}

export interface Organization {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  location: string;
  website: string;
  size: string;
  bio: string;
  isVerified: boolean;
  contactEmail: string;
  recruiterName: string;
  activePostingsCount: number;
}

export interface AppNotification {
  id: string;
  type: 'application_update' | 'match_alert' | 'organization_alert' | 'system' | 'roadmap_progress';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: ActivePage;
  relatedId?: string;
}

export type ActivePage =
  | 'landing'
  | 'dashboard'
  | 'profile'
  | 'internships'
  | 'applications'
  | 'saved-internships'
  | 'target-role'
  | 'assessment'
  | 'skill-gap'
  | 'roadmap'
  | 'readiness'
  | 'progress'
  | 'organization-portal'
  | 'org-dashboard'
  | 'org-postings'
  | 'org-profile'
  | 'admin-dashboard'
  | 'settings';

