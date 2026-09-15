import { TARGET_ROLES, DEFAULT_ROADMAP_STEPS } from '../data/rolesData';
import { StudentProfile, StudentSkill, SkillGapAnalysisResult, ReadinessBreakdown, RoadmapStep, TargetRoleData } from '../types';

export function getRoleById(roleIdOrTitle: string): TargetRoleData {
  const normalized = roleIdOrTitle.toLowerCase().replace(/[\s_]+/g, '-');
  const found = TARGET_ROLES.find(r => r.id === normalized || r.title.toLowerCase() === roleIdOrTitle.toLowerCase());
  return found || TARGET_ROLES[0];
}

export function performSkillGapAnalysis(
  profile: StudentProfile,
  assessedSkills: Record<string, StudentSkill>
): SkillGapAnalysisResult {
  const currentRole = getRoleById(profile.targetRole);
  const targetCompany = profile.targetCompany || 'Top Tech Companies';

  const strengths: { name: string; level: StudentSkill['level']; note: string }[] = [];
  const needsImprovement: { name: string; level: StudentSkill['level']; note: string }[] = [];
  const criticalGaps: { name: string; importance: string; note: string }[] = [];

  // Evaluate required role skills
  currentRole.requiredSkills.forEach(req => {
    // Find if assessed or in current skills
    const matchingSkillKey = Object.keys(assessedSkills).find(
      key => key.toLowerCase() === req.name.toLowerCase() ||
             (key.toLowerCase().includes('sql') && req.name.toLowerCase().includes('sql')) ||
             (key.toLowerCase().includes('data structure') && req.name.toLowerCase().includes('data structure'))
    );

    const skill = matchingSkillKey ? assessedSkills[matchingSkillKey] : null;
    const level = skill ? skill.level : 'not_started';

    if (level === 'advanced') {
      strengths.push({
        name: req.name,
        level: 'advanced',
        note: `Solid mastery demonstrated. Aligns with ${targetCompany} hiring standards.`
      });
    } else if (level === 'intermediate') {
      strengths.push({
        name: req.name,
        level: 'intermediate',
        note: `Good working competence; ready for applied real-world projects.`
      });
    } else if (level === 'beginner') {
      needsImprovement.push({
        name: req.name,
        level: 'beginner',
        note: `Foundational exposure present, but requires deeper practice for interview bar.`
      });
    } else {
      // not started
      criticalGaps.push({
        name: req.name,
        importance: req.importance === 'critical' ? 'Highest Priority' : 'Core Requirement',
        note: `Essential ${currentRole.title} competency not yet acquired. Major gap.`
      });
    }
  });

  // Also check non-role skills like Communication or specific programming languages
  if (assessedSkills['Communication']?.level === 'advanced') {
    if (!strengths.some(s => s.name.toLowerCase() === 'communication')) {
      strengths.push({
        name: 'Communication',
        level: 'advanced',
        note: 'Clear technical articulate communication stands out in placement rounds.'
      });
    }
  }

  // Generate personalized AI insights
  let immediatePriority = 'Master SQL and Database Systems';
  let aiInsight = `Based on your current skills and your target role as a ${currentRole.title}, your biggest gaps are in cloud technologies and core data engineering concepts. Strengthening SQL should be your immediate priority.`;

  if (currentRole.id === 'data-engineer') {
    const hasSqlAdvance = assessedSkills['SQL']?.level === 'advanced';
    const hasCloud = assessedSkills['Cloud Computing']?.level === 'intermediate' || assessedSkills['Cloud Computing']?.level === 'advanced';
    
    if (!hasSqlAdvance) {
      immediatePriority = 'Master SQL and Database Systems';
      aiInsight = `Based on your current skills and your target role as a Data Engineer at ${targetCompany}, your biggest gaps are in cloud technologies and core data engineering concepts (ETL, Warehousing, Spark). Strengthening SQL query optimization and schema design should be your immediate priority.`;
    } else if (!hasCloud) {
      immediatePriority = 'Learn Cloud Computing and AWS';
      aiInsight = `Your SQL foundation is solid! Your critical focus now shifts to AWS services (S3, Lambda, Glue) and building scalable data pipelines.`;
    } else {
      immediatePriority = 'Build End-to-End Real-World Data Projects';
      aiInsight = `Great progress! With foundational and cloud competencies in place, focus on deploying production-ready Apache Spark and Airflow pipelines.`;
    }
  } else if (currentRole.id === 'software-engineer') {
    immediatePriority = 'Intensive Data Structures & Algorithms';
    aiInsight = `For a Software Engineer role at ${targetCompany}, online coding rounds filter heavily on DSA. Prioritize solving patterns in Trees, Graphs, and Dynamic Programming, followed by System Design basics.`;
  } else {
    immediatePriority = `Master ${criticalGaps[0]?.name || 'Core Domain Skills'}`;
    aiInsight = `NorthLane analyzed your profile against ${currentRole.title} benchmarks. Focus on closing critical gaps in ${criticalGaps.slice(0, 3).map(g => g.name).join(', ')} to boost placement readiness.`;
  }

  const summaryNote = `Evaluated against ${currentRole.requiredSkills.length} competencies expected by companies like ${currentRole.topCompanies.slice(0, 3).join(', ')}.`;

  return {
    strengths,
    needsImprovement,
    criticalGaps,
    summaryNote,
    aiInsight,
    immediatePriority
  };
}

export function calculateReadinessScore(
  profile: StudentProfile,
  assessedSkills: Record<string, StudentSkill>,
  roadmap: RoadmapStep[]
): { overallScore: number; breakdown: ReadinessBreakdown } {
  // Baseline evaluation
  const completedRoadmapCount = roadmap.filter(s => s.status === 'completed').length;
  const inProgressRoadmapCount = roadmap.filter(s => s.status === 'in_progress').length;
  const totalRoadmapSteps = roadmap.length || 8;

  // Technical Skills score (35% weight on assessment + roadmap)
  let techScore = 45;
  if (assessedSkills['Python']?.level === 'advanced') techScore += 10;
  if (assessedSkills['Python']?.level === 'intermediate') techScore += 6;
  if (assessedSkills['SQL']?.level === 'intermediate') techScore += 8;
  if (assessedSkills['SQL']?.level === 'advanced') techScore += 14;
  if (assessedSkills['Cloud Computing']?.level === 'intermediate' || assessedSkills['Cloud Computing']?.level === 'advanced') techScore += 10;
  if (assessedSkills['Apache Spark']?.level === 'intermediate' || assessedSkills['Apache Spark']?.level === 'advanced') techScore += 12;
  techScore += Math.round((completedRoadmapCount / totalRoadmapSteps) * 18);
  techScore = Math.min(95, Math.max(30, techScore));

  // Problem Solving score (20% weight)
  let psScore = 40;
  if (assessedSkills['Data Structures & Algorithms']?.level === 'intermediate') psScore += 20;
  else if (assessedSkills['Data Structures & Algorithms']?.level === 'advanced') psScore += 35;
  else psScore += 15; // beginner
  if (assessedSkills['C Programming']?.level === 'intermediate' || assessedSkills['C Programming']?.level === 'advanced') psScore += 5;
  psScore = Math.min(92, Math.max(25, psScore));

  // Projects & Experience (20% weight)
  let projectsScore = 30;
  if (roadmap.some(r => r.topic.includes('Projects') && r.status === 'completed')) {
    projectsScore += 35;
  } else if (roadmap.some(r => r.topic.includes('Projects') && r.status === 'in_progress')) {
    projectsScore += 15;
  }
  projectsScore += Math.round((completedRoadmapCount / totalRoadmapSteps) * 20);
  projectsScore = Math.min(90, Math.max(20, projectsScore));

  // Communication (15% weight)
  const commLevel = assessedSkills['Communication']?.level || 'advanced';
  let commScore = 78;
  if (commLevel === 'beginner') commScore = 55;
  if (commLevel === 'intermediate') commScore = 68;
  if (commLevel === 'advanced') commScore = 85;

  // Resume Readiness (10% weight)
  let resumeScore = 45;
  if (completedRoadmapCount >= 2) resumeScore += 10;
  if (completedRoadmapCount >= 4) resumeScore += 18;
  if (profile.currentSkills.length >= 5) resumeScore += 8;
  resumeScore = Math.min(92, Math.max(35, resumeScore));

  // Overall Weighted Score
  // Technical (35%) + Problem Solving (25%) + Projects (20%) + Communication (10%) + Resume (10%)
  const overall = Math.round(
    techScore * 0.35 +
    psScore * 0.25 +
    projectsScore * 0.20 +
    commScore * 0.10 +
    resumeScore * 0.10
  );

  return {
    overallScore: Math.min(100, Math.max(20, overall)),
    breakdown: {
      technicalSkills: techScore,
      problemSolving: psScore,
      projectsAndExperience: projectsScore,
      communication: commScore,
      resumeReadiness: resumeScore
    }
  };
}

export function calculateRoadmapProgress(steps: RoadmapStep[]): number {
  if (!steps || steps.length === 0) return 0;
  let totalScore = 0;
  steps.forEach(step => {
    if (step.status === 'completed') totalScore += 1.0;
    else if (step.status === 'in_progress') totalScore += 0.45; // partial
  });
  return Math.round((totalScore / steps.length) * 100);
}

export function getRoadmapForRole(roleId: string): RoadmapStep[] {
  const normalized = roleId.toLowerCase().replace(/[\s_]+/g, '-');
  if (DEFAULT_ROADMAP_STEPS[normalized]) {
    return JSON.parse(JSON.stringify(DEFAULT_ROADMAP_STEPS[normalized]));
  }
  // Fallback dynamic generator for other roles
  const role = getRoleById(roleId);
  return [
    {
      id: `${normalized}-step-1`,
      stepNumber: 1,
      title: `Fundamentals of ${role.title}`,
      topic: 'Core Fundamentals',
      description: `Solidify base programming languages, tools, and theoretical principles required for ${role.title}.`,
      subtopics: role.requiredSkills.slice(0, 3).map(s => s.name),
      estimatedDuration: '3 weeks',
      status: 'completed',
      importance: 'critical'
    },
    {
      id: `${normalized}-step-2`,
      stepNumber: 2,
      title: `Core Technical Mastery`,
      topic: 'Domain Specialization',
      description: `Hands-on implementation of specialized frameworks and industry-standard workflows.`,
      subtopics: role.requiredSkills.slice(3, 6).map(s => s.name),
      estimatedDuration: '4 weeks',
      status: 'in_progress',
      importance: 'critical'
    },
    {
      id: `${normalized}-step-3`,
      stepNumber: 3,
      title: `Advanced Architecture & Tools`,
      topic: 'Advanced Concepts',
      description: `Learn deployment, system optimization, scaling, and industry best practices.`,
      subtopics: role.requiredSkills.slice(6, 9).map(s => s.name),
      estimatedDuration: '4 weeks',
      status: 'not_started',
      importance: 'high'
    },
    {
      id: `${normalized}-step-4`,
      stepNumber: 4,
      title: `Capstone Real-World Projects`,
      topic: 'Portfolio Projects',
      description: `Construct 2 production-grade applications with full documentation, live demo, and GitHub repository.`,
      subtopics: ['End-to-End System Project', 'Benchmarking & Documentation', 'Deployment to Cloud'],
      estimatedDuration: '4 weeks',
      status: 'not_started',
      importance: 'critical'
    },
    {
      id: `${normalized}-step-5`,
      stepNumber: 5,
      title: `Placement & Technical Interview Readiness`,
      topic: 'Interview Prep',
      description: `Mock interviews, company test series, coding challenge practice, and behavioral STAR stories.`,
      subtopics: ['Resume Optimization', 'Mock Live Technical Rounds', 'STAR Behavioral Preparation'],
      estimatedDuration: '2 weeks',
      status: 'not_started',
      importance: 'high'
    }
  ];
}

// -------------------------------------------------------------
// INTERNSHIP COMPATIBILITY & SKILL MATCHING ENGINE
// -------------------------------------------------------------
import { Internship, InternshipCompatibility, SkillLevel } from '../types';

export function calculateInternshipCompatibility(
  internship: Internship,
  assessedSkills: Record<string, StudentSkill>,
  profile: StudentProfile
): InternshipCompatibility {
  const matchingSkills: { name: string; level: SkillLevel; importance: string }[] = [];
  const missingSkills: { name: string; importance: string; recommendation: string }[] = [];

  let totalWeight = 0;
  let earnedScore = 0;

  internship.requirements.forEach(req => {
    const weight = req.importance === 'critical' ? 3 : req.importance === 'high' ? 2 : 1;
    totalWeight += weight;

    // Search matching key in assessedSkills or profile.currentSkills
    const foundKey = Object.keys(assessedSkills).find(
      key =>
        key.toLowerCase() === req.skillName.toLowerCase() ||
        key.toLowerCase().includes(req.skillName.toLowerCase()) ||
        req.skillName.toLowerCase().includes(key.toLowerCase())
    );

    const skill = foundKey ? assessedSkills[foundKey] : null;
    const level: SkillLevel = skill ? skill.level : 'not_started';

    const minRequired = req.minLevel || 'beginner';

    if (level === 'advanced') {
      earnedScore += weight * 1.0;
      matchingSkills.push({
        name: req.skillName,
        level: 'advanced',
        importance: req.importance
      });
    } else if (level === 'intermediate') {
      const multiplier = minRequired === 'advanced' ? 0.75 : 1.0;
      earnedScore += weight * multiplier;
      matchingSkills.push({
        name: req.skillName,
        level: 'intermediate',
        importance: req.importance
      });
    } else if (level === 'beginner') {
      const multiplier = minRequired === 'beginner' ? 0.8 : 0.45;
      earnedScore += weight * multiplier;
      if (minRequired === 'advanced') {
        missingSkills.push({
          name: req.skillName,
          importance: req.importance,
          recommendation: `Elevate from Beginner to Advanced through project capstone.`
        });
      } else {
        matchingSkills.push({
          name: req.skillName,
          level: 'beginner',
          importance: req.importance
        });
      }
    } else {
      // not started / missing
      missingSkills.push({
        name: req.skillName,
        importance: req.importance,
        recommendation: `Target acquisition via Step in personalized learning roadmap.`
      });
    }
  });

  // Calculate final score percentage (capped between 20 and 98)
  const rawRatio = totalWeight > 0 ? earnedScore / totalWeight : 0.5;
  const score = Math.round(Math.min(98, Math.max(25, rawRatio * 100)));

  let fitRating: InternshipCompatibility['fitRating'] = 'Moderate Fit';
  let summary = '';

  if (score >= 80) {
    fitRating = 'High Fit';
    summary = `Exceptional alignment! Candidate possesses verified mastery in ${matchingSkills.length} requirement(s). Direct recommendation for interview screening.`;
  } else if (score >= 65) {
    fitRating = 'Strong Fit';
    summary = `Competitive candidate profile. Core competencies verified. Closing ${missingSkills.length} missing competency area(s) will maximize offer probability.`;
  } else if (score >= 45) {
    fitRating = 'Moderate Fit';
    summary = `Solid fundamental aptitude. Requires targeted completion of high-priority role requirements before recruiter shortlisting.`;
  } else {
    fitRating = 'Growth Opportunity';
    summary = `Steep learning curve detected. Best positioned for next hiring cycle after foundational roadmap completion.`;
  }

  return {
    score,
    matchingSkills,
    missingSkills,
    fitRating,
    summary
  };
}

// -------------------------------------------------------------
// AUTOMATIC RESUME SKILL & EXPERIENCE EXTRACTION ENGINE
// -------------------------------------------------------------
const TECH_SKILL_LEXICON = [
  'Python', 'SQL', 'C Programming', 'C++', 'Java', 'Data Structures & Algorithms',
  'AWS', 'Cloud Computing', 'Docker', 'Kubernetes', 'Apache Spark', 'PySpark',
  'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Kafka', 'ETL Concepts', 'Data Warehousing',
  'System Design', 'Git & Version Control', 'Git', 'Linux', 'REST APIs', 'FastAPI',
  'Flask', 'Django', 'React', 'TypeScript', 'Node.js', 'Machine Learning', 'Deep Learning',
  'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'Scikit-Learn', 'Tableau', 'Power BI',
  'Terraform', 'CI/CD', 'GitHub Actions', 'Microservices', 'GraphQL', 'Snowflake',
  'Databricks', 'Airflow', 'BigQuery', 'Cassandra', 'Communication', 'Problem Solving'
];

export function extractSkillsFromResumeText(text: string): {
  skills: string[];
  experience: string[];
  projects: string[];
  atsScore: number;
} {
  const normalizedText = text.toLowerCase();
  const matchedSkills: string[] = [];

  TECH_SKILL_LEXICON.forEach(skill => {
    const sLower = skill.toLowerCase();
    // Use word boundary or simple inclusion
    const regex = new RegExp(`\\b${sLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (regex.test(text) || normalizedText.includes(sLower)) {
      if (!matchedSkills.includes(skill)) {
        matchedSkills.push(skill);
      }
    }
  });

  // Extract Experience and Projects heuristically
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const experience: string[] = [];
  const projects: string[] = [];

  let currentSection: 'exp' | 'proj' | 'none' = 'none';

  lines.forEach(line => {
    const lower = line.toLowerCase();
    if (lower.includes('experience') || lower.includes('work history') || lower.includes('internship')) {
      currentSection = 'exp';
      return;
    }
    if (lower.includes('project') || lower.includes('technical projects')) {
      currentSection = 'proj';
      return;
    }
    if (lower.includes('education') || lower.includes('certifications') || lower.includes('achievements')) {
      currentSection = 'none';
      return;
    }

    if (currentSection === 'exp' && line.length > 15 && (line.startsWith('•') || line.startsWith('-') || line.includes('|') || line.includes('–'))) {
      if (experience.length < 5) experience.push(line.replace(/^[•\-*]\s*/, ''));
    }
    if (currentSection === 'proj' && line.length > 15 && (line.startsWith('•') || line.startsWith('-') || line.includes('|') || line.includes('–'))) {
      if (projects.length < 5) projects.push(line.replace(/^[•\-*]\s*/, ''));
    }
  });

  // Calculate ATS Score based on factors
  let atsScore = 40;
  // Keyword density factor
  atsScore += Math.min(30, matchedSkills.length * 3);
  // Action verbs and metric indicators (%, ms, reduced, built, scaled, etc.)
  if (/\b(built|designed|developed|scaled|optimized|architected|engineered|reduced|increased)\b/i.test(text)) {
    atsScore += 15;
  }
  if (/%|\d+x|\d+ms|\d+gb|\d+tb/i.test(text)) {
    atsScore += 10;
  }
  // Length balance
  if (text.length > 500 && text.length < 6000) {
    atsScore += 5;
  }

  atsScore = Math.min(96, Math.max(45, atsScore));

  return {
    skills: matchedSkills.length > 0 ? matchedSkills : ['Python', 'SQL', 'Data Structures & Algorithms', 'Git'],
    experience: experience.length > 0 ? experience : [
      'Backend Engineering Intern — HexaWave Tech Labs (2 Mos)',
      'ACM Student Chapter Technical Secretary'
    ],
    projects: projects.length > 0 ? projects : [
      'Real-Time Log Stream Anomaly Aggregator with Python and SQLite',
      'E-Commerce High-Performance SQL Relational Schema'
    ],
    atsScore
  };
}

export const SAMPLE_TECH_RESUME_TEXT = `
GOWTHAM R
Chennai, India | +91 98401 23456 | gowtham.r@sairam.edu.in
GitHub: github.com/Gowthamraj822008 | LinkedIn: linkedin.com/in/gowtham-r-engineer

EDUCATION
Sri Sairam Engineering College, Anna University
Bachelor of Technology in Computer Science & Engineering | CGPA: 8.7/10
Graduation: May 2027

TECHNICAL SKILLS
Languages: Python, SQL, C Programming, Java, Bash
Data & Cloud: AWS (S3, EC2, Lambda), PostgreSQL, MySQL, Redis, Apache Spark, ETL Concepts, Data Warehousing
Core CS: Data Structures & Algorithms, Database Systems, Operating Systems, System Design
Tools & Dev: Docker, Git & Version Control, Linux, REST APIs, FastAPI, Flask

WORK EXPERIENCE
HexaWave Tech Labs — Backend Engineering Intern (Chennai, India)
May 2025 – July 2025
• Engineered automated batch ETL ingestion scripts in Python and PostgreSQL, processing 500,000+ daily IoT records.
• Optimized relational indexing and query execution plans, reducing p95 query latency by 38%.
• Integrated automated anomaly notification webhooks with 99.8% uptime.

ACM Student Chapter — Technical Secretary
August 2024 – Present
• Organized collegiate competitive coding hackathons with 250+ participants on Data Structures and Algorithms.
• Mentored 80+ junior students in Python scripting, Linux commands, and Git version control workflows.

PROJECTS
Real-Time Log Stream Anomaly Aggregator | Python, Docker, Multithreading, SQLite
• Developed a multi-threaded log ingestion daemon capable of parsing 10,000 JSON log entries per second.
• Implemented sliding-window threshold algorithms to flag burst anomalies with sub-50ms detection speed.

High-Scale E-Commerce SQL Benchmark & Data Warehouse | SQL, PostgreSQL, AWS S3
• Architected a 3NF relational schema with 12 tables modeling customers, product catalogs, orders, and fulfillment.
• Crafted complex analytical window queries (PARTITION BY, CTEs, RANK) generating retention cohort summaries.
• Exported partitioned Parquet files to AWS S3 for analytical query benchmarking.

AWARDS & CERTIFICATIONS
• AWS Cloud Practitioner Essentials (Amazon Web Services)
• Winner — Anna University Inter-College Code Marathon 2025
`;

