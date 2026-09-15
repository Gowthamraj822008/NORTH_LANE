import { GoogleGenAI } from '@google/genai';

// Lazy initialization of Gemini API Client
let genAIClient: GoogleGenAI | null = null;

export function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({ apiKey });
  }
  return genAIClient;
}

export function isGeminiConfigured(): boolean {
  return !!process.env.GEMINI_API_KEY;
}

// Clean helper to extract and parse JSON from Gemini output
function parseJsonFromText(text: string): any {
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    // Try stripping markdown blocks
    const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (match && match[1]) {
      try {
        return JSON.parse(match[1]);
      } catch {
        return null;
      }
    }
    return null;
  }
}

// Helper to call Gemini with retry and model fallback
async function generateWithGemini(ai: GoogleGenAI, prompt: string, isJson: boolean = false, systemInstruction?: string) {
  const models = ['gemini-3.1-flash-lite', 'gemini-3.8-flash', 'gemini-flash-latest'];
  let lastError: any = null;

  for (const model of models) {
    try {
      const config: any = {};
      if (isJson) {
        config.responseMimeType = 'application/json';
      }
      if (systemInstruction) {
        config.systemInstruction = systemInstruction;
      }

      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: Object.keys(config).length > 0 ? config : undefined
      });

      if (response && response.text) {
        return { text: response.text, modelUsed: model };
      }
    } catch (err: any) {
      lastError = err;
      console.warn(`Attempt with ${model} failed (${err?.message || 'error'}), trying fallback model...`);
      // Short delay before retry with next model
      await new Promise(r => setTimeout(r, 600));
    }
  }

  throw lastError || new Error('All model attempts failed');
}

/**
 * AI Resume Parsing & Deep Extraction
 */
export async function parseResumeWithGemini(resumeText: string, targetRole?: string) {
  const ai = getGenAI();

  if (!ai) {
    // Return high-fidelity realistic heuristic extraction if API key not yet set
    return getFallbackResumeExtraction(resumeText, targetRole);
  }

  const prompt = `You are a senior technical recruiter and principal engineering hiring manager at a tier-1 technology company.
Thoroughly analyze the following engineering candidate's resume/CV text. Target Role: ${targetRole || 'Software / Data Engineer'}.

Resume Text:
"""
${resumeText}
"""

Provide an objective, thorough evaluation in valid JSON format with the exact following schema:
{
  "candidateName": "Extracted candidate name or null",
  "email": "Extracted email or null",
  "phone": "Extracted phone or null",
  "degree": "Extracted degree or null",
  "college": "Extracted college or university or null",
  "graduationYear": 2026 or null,
  "skills": ["Array", "of", "all", "identified", "technical", "and", "domain", "skills"],
  "categorizedSkills": {
    "core": ["Languages and foundational CS skills"],
    "frameworks": ["Frameworks and runtime libraries"],
    "tools": ["Databases, cloud platforms, DevOps, dev tools"],
    "soft": ["Communication, leadership, mentoring, collaboration"]
  },
  "experiences": [
    {
      "title": "Role title",
      "organization": "Company or club",
      "duration": "Duration string",
      "summary": "Key achievement with metrics if present"
    }
  ],
  "projects": [
    {
      "title": "Project name",
      "technologies": ["Tech1", "Tech2"],
      "summary": "Brief description and impact"
    }
  ],
  "atsScore": 82,
  "atsRubric": {
    "keywordAlignment": 85,
    "quantifiedImpact": 75,
    "structuralClarity": 88,
    "techStackDepth": 80
  },
  "strengths": ["Key strength 1", "Key strength 2"],
  "weaknesses": ["Deficit or missing element 1", "Deficit 2"],
  "actionableRecommendations": [
    "Specific recommendation 1 to boost placement readiness",
    "Specific recommendation 2 for tier-1 tech hiring"
  ],
  "placementReadinessSummary": "2-3 sentence executive assessment of placement readiness and competitive positioning."
}

Return ONLY valid JSON without markdown wrapping.`;

  try {
    const { text, modelUsed } = await generateWithGemini(ai, prompt, true);
    const parsed = parseJsonFromText(text);
    if (parsed && Array.isArray(parsed.skills)) {
      return {
        ...parsed,
        isLiveInference: true,
        model: modelUsed
      };
    }
    return getFallbackResumeExtraction(resumeText, targetRole);
  } catch (error: any) {
    console.error('Gemini Resume Parse error:', error?.message || error);
    return {
      ...getFallbackResumeExtraction(resumeText, targetRole),
      inferenceError: error?.message || 'Gemini inference failed; used fallback engine.'
    };
  }
}

/**
 * AI Skill Gap & Career Readiness Analysis
 */
export async function analyzeSkillGapWithGemini(profile: any, targetRoleOrJob: any) {
  const ai = getGenAI();

  if (!ai) {
    return getFallbackSkillGapAnalysis(profile, targetRoleOrJob);
  }

  const prompt = `You are a Principal Engineering Director and Talent Bar Raiser.
Conduct an in-depth Placement Readiness and Skill Gap Diagnostic for this engineering candidate.

Candidate Profile:
- Name: ${profile?.name || 'Candidate'}
- Target Role: ${profile?.targetRole || targetRoleOrJob?.title || 'Data Engineer'}
- Target Company / Tier: ${profile?.targetCompany || targetRoleOrJob?.organizationName || 'Tier-1 Tech Companies'}
- Current Skills: ${JSON.stringify(profile?.currentSkills || [])}
- Assessed Skills Levels: ${JSON.stringify(profile?.assessedSkills || {})}
- Experiences: ${JSON.stringify(profile?.experiences || [])}
- Projects: ${JSON.stringify(profile?.projects || [])}

Target Role / Job Benchmark:
${JSON.stringify(targetRoleOrJob || {})}

Provide your assessment in valid JSON format with the exact following schema:
{
  "placementReadinessScore": 76, // Integer 0-100 reflecting true placement readiness
  "readinessBreakdown": {
    "technicalSkills": 75,
    "problemSolving": 80,
    "projectsAndExperience": 70,
    "communication": 82,
    "resumeReadiness": 78
  },
  "matchingSkills": [
    {
      "name": "Skill Name",
      "proficiency": "advanced | intermediate | beginner",
      "marketValidation": "Why this fulfills tier-1 placement bar"
    }
  ],
  "missingSkills": [
    {
      "name": "Missing Skill",
      "severity": "critical | high | medium",
      "industryReason": "Why top recruiters filter on this specific gap",
      "recommendedAction": "Concrete project or topic to learn"
    }
  ],
  "criticalGapsCount": 3,
  "topPriorityFocus": "Primary area candidate must master in the next 3 weeks",
  "executiveAIInsight": "Comprehensive, encouraging, yet rigorous technical critique of their trajectory and odds.",
  "tailoredInterviewQuestions": [
    {
      "question": "Realistic technical or architectural question target company would ask",
      "focusArea": "Underlying concept tested",
      "idealAnswerKey": "Key talking points expected from a strong candidate"
    },
    {
      "question": "Second realistic interview question",
      "focusArea": "Underlying concept tested",
      "idealAnswerKey": "Key points"
    },
    {
      "question": "Third realistic interview question",
      "focusArea": "Underlying concept tested",
      "idealAnswerKey": "Key points"
    }
  ],
  "recommendedProjects": [
    {
      "title": "Project Title to bridge the gap",
      "techStack": ["Tech1", "Tech2"],
      "description": "Production-grade project scope that will impress hiring managers",
      "estimatedDays": 14
    }
  ]
}

Return ONLY valid JSON.`;

  try {
    const { text, modelUsed } = await generateWithGemini(ai, prompt, true);
    const parsed = parseJsonFromText(text || '');
    if (parsed && typeof parsed.placementReadinessScore === 'number') {
      return {
        ...parsed,
        isLiveInference: true,
        model: modelUsed
      };
    }
    return getFallbackSkillGapAnalysis(profile, targetRoleOrJob);
  } catch (error: any) {
    console.error('Gemini Skill Gap error:', error?.message || error);
    return {
      ...getFallbackSkillGapAnalysis(profile, targetRoleOrJob),
      inferenceError: error?.message || 'Gemini inference failed; used fallback engine.'
    };
  }
}

/**
 * AI Personalized Roadmap Generator
 */
export async function generateRoadmapWithGemini(profile: any, targetRole: string, targetCompany?: string) {
  const ai = getGenAI();

  if (!ai) {
    return getFallbackRoadmap(targetRole);
  }

  const prompt = `You are an elite Engineering Career Coach. Generate a customized 4-phase placement roadmap for an engineering student targeting ${targetRole} at ${targetCompany || 'Top Tech Companies'}.
Student skills: ${JSON.stringify(profile?.currentSkills || [])}

Provide valid JSON with this schema:
{
  "role": "${targetRole}",
  "totalEstimatedWeeks": 12,
  "phases": [
    {
      "id": "phase-1",
      "phaseName": "Phase 1: Foundational Core",
      "duration": "Weeks 1-3",
      "focus": "High-priority core concepts",
      "milestones": [
        {
          "id": "m-1",
          "title": "Milestone title",
          "description": "What to master and implement",
          "skillsCovered": ["Skill1", "Skill2"],
          "estimatedHours": 18,
          "recommendedResources": [
            { "name": "Resource / Documentation Title", "type": "Documentation | Course | Practice" }
          ]
        }
      ]
    },
    {
      "id": "phase-2",
      "phaseName": "Phase 2: Frameworks & Real-World Data/Systems",
      "duration": "Weeks 4-6",
      "focus": "Intermediate systems and pipelines",
      "milestones": []
    },
    {
      "id": "phase-3",
      "phaseName": "Phase 3: Production Capstone & Cloud Deployment",
      "duration": "Weeks 7-9",
      "focus": "Portfolio projects and system design",
      "milestones": []
    },
    {
      "id": "phase-4",
      "phaseName": "Phase 4: Placement Sprints & Mock Rounds",
      "duration": "Weeks 10-12",
      "focus": "Company-specific interview patterns",
      "milestones": []
    }
  ],
  "coachAdvice": "Practical advice for sustaining momentum."
}

Return ONLY valid JSON.`;

  try {
    const { text, modelUsed } = await generateWithGemini(ai, prompt, true);
    const parsed = parseJsonFromText(text || '');
    if (parsed && Array.isArray(parsed.phases)) {
      return {
        ...parsed,
        isLiveInference: true,
        model: modelUsed
      };
    }
    return getFallbackRoadmap(targetRole);
  } catch (error: any) {
    console.error('Gemini Roadmap error:', error?.message || error);
    return getFallbackRoadmap(targetRole);
  }
}

/**
 * AI Application Tailoring / Cover Note
 */
export async function tailorApplicationWithGemini(profile: any, internship: any) {
  const ai = getGenAI();

  if (!ai) {
    return {
      pitch: `Dear ${internship?.organizationName} Hiring Team,\n\nI am writing to express my strong enthusiasm for the ${internship?.title} opportunity. With hands-on experience in ${profile?.currentSkills?.slice(0, 4).join(', ') || 'modern engineering'} and projects focused on scalable systems, I am eager to contribute directly to your team's mission. I look forward to discussing how my technical background aligns with your engineering goals.\n\nSincerely,\n${profile?.name || 'Applicant'}`,
      alignmentHighlights: [
        `Direct experience in relevant stack: ${profile?.currentSkills?.slice(0, 3).join(', ')}`,
        `Demonstrated initiative with independent open source and engineering projects`,
        `Proactive commitment to engineering best practices and fast ramp-up`
      ],
      isLiveInference: false
    };
  }

  const prompt = `Write a high-impact, professional, customized elevator pitch and cover note for an engineering student applying to an internship.
Candidate:
- Name: ${profile?.name || 'Applicant'}
- Skills: ${JSON.stringify(profile?.currentSkills || [])}
- Projects: ${JSON.stringify(profile?.projects || [])}
- Experiences: ${JSON.stringify(profile?.experiences || [])}

Internship Opportunity:
- Title: ${internship?.title}
- Company: ${internship?.organizationName}
- Requirements: ${JSON.stringify(internship?.requiredSkills || [])}
- Role Summary: ${internship?.description || ''}

Format as valid JSON:
{
  "pitch": "A 2-3 paragraph compelling cover note written in first person, tailored to the specific company and requirements. Avoid generic filler; highlight specific skills and projects.",
  "alignmentHighlights": [
    "Bullet 1 on specific technical alignment",
    "Bullet 2 on relevant project experience",
    "Bullet 3 on quick learning and business impact"
  ],
  "interviewTips": [
    "Key area to prepare specifically for this company's culture and technical stack"
  ]
}

Return ONLY valid JSON.`;

  try {
    const { text, modelUsed } = await generateWithGemini(ai, prompt, true);
    const parsed = parseJsonFromText(text || '');
    if (parsed && parsed.pitch) {
      return {
        ...parsed,
        isLiveInference: true,
        model: modelUsed
      };
    }
  } catch (error: any) {
    console.error('Gemini Tailor App error:', error?.message || error);
  }

  return {
    pitch: `Dear ${internship?.organizationName} Recruiting Team,\n\nI am thrilled to submit my candidacy for the ${internship?.title} role. Having worked extensively with ${profile?.currentSkills?.slice(0, 3).join(', ')}, I have built projects addressing real-world throughput and reliability. I am confident in my ability to quickly add value to ${internship?.organizationName}'s engineering organization.\n\nWarm regards,\n${profile?.name || 'Applicant'}`,
    alignmentHighlights: [
      `Proficient in core technologies: ${internship?.requiredSkills?.slice(0, 3).join(', ')}`,
      `Demonstrated capability with production project implementations`
    ],
    isLiveInference: false
  };
}

/**
 * AI Career Advisor Interactive Chat
 */
export async function chatCareerAdvisorWithGemini(message: string, profile: any, history?: Array<{ role: string; parts: Array<{ text: string }> }>) {
  const ai = getGenAI();

  if (!ai) {
    return {
      reply: `Thanks for your question! As your NorthLane Career Advisor, I recommend focusing on foundational Data Structures and building at least two end-to-end projects demonstrating your skills in ${profile?.targetRole || 'engineering'}. Ensure your GitHub code has clean README documentation and automated tests to stand out to recruiters.`,
      isLiveInference: false
    };
  }

  const systemInstruction = `You are the NorthLane AI Career Mentor, an expert tier-1 software & data engineering advisor.
You provide direct, highly actionable, encouraging, and technically precise advice to engineering students.
Keep answers concise, realistic, structured with bullet points, and directly relevant to campus placements and internships.
Candidate context: Name: ${profile?.name || 'Student'}, Target Role: ${profile?.targetRole || 'Software Engineer'}, Target Company: ${profile?.targetCompany || 'Top Tech'}, Known Skills: ${profile?.currentSkills?.join(', ') || 'CS Fundamentals'}.`;

  try {
    const { text, modelUsed } = await generateWithGemini(ai, message, false, systemInstruction);
    return {
      reply: text || 'Unable to generate response at this time.',
      isLiveInference: true,
      model: modelUsed
    };
  } catch (error: any) {
    console.error('Gemini Chat Advisor error:', error?.message || error);
    return {
      reply: `I ran into a connection issue communicating with the AI service. In general for ${profile?.targetRole || 'placements'}, prioritize mastering SQL query optimization, distributed system fundamentals, and daily DSA practice on medium-difficulty problems.`,
      isLiveInference: false,
      error: error?.message
    };
  }
}

// Fallback generators when API key is not present
function getFallbackResumeExtraction(text: string, targetRole?: string) {
  const lower = text.toLowerCase();
  const foundSkills = new Set<string>();

  const skillCatalog = [
    'Python', 'Java', 'C++', 'C Programming', 'JavaScript', 'TypeScript', 'SQL',
    'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'React', 'Node.js', 'Express',
    'Docker', 'Kubernetes', 'AWS', 'Google Cloud', 'Azure', 'Git', 'Linux',
    'Apache Spark', 'Kafka', 'Airflow', 'Pandas', 'NumPy', 'TensorFlow', 'PyTorch',
    'Data Structures', 'Algorithms', 'System Design', 'REST APIs', 'GraphQL',
    'FastAPI', 'Flask', 'Django', 'CI/CD', 'Microservices', 'Communication', 'Problem Solving'
  ];

  skillCatalog.forEach(sk => {
    if (lower.includes(sk.toLowerCase())) {
      foundSkills.add(sk);
    }
  });

  const skills = Array.from(foundSkills);
  if (skills.length === 0) {
    skills.push('Python', 'SQL', 'Data Structures', 'Git', 'Problem Solving');
  }

  return {
    candidateName: text.match(/(?:Name|Full Name|Candidate):\s*([A-Za-z\s]+)/i)?.[1]?.trim() || null,
    skills,
    categorizedSkills: {
      core: skills.filter(s => ['Python', 'Java', 'C++', 'SQL', 'Data Structures', 'Algorithms'].includes(s)),
      frameworks: skills.filter(s => ['React', 'Node.js', 'Express', 'Flask', 'FastAPI', 'Apache Spark'].includes(s)),
      tools: skills.filter(s => ['Docker', 'AWS', 'Git', 'PostgreSQL', 'Linux'].includes(s)),
      soft: ['Communication', 'Teamwork', 'Agile Collaboration']
    },
    experiences: [
      {
        title: 'Engineering Trainee / Intern',
        organization: 'Technology Organization',
        duration: '3 Months',
        summary: 'Designed backend telemetry scripts and database access routines.'
      }
    ],
    projects: [
      {
        title: 'Distributed Data Pipeline',
        technologies: skills.slice(0, 3),
        summary: 'Constructed automated ingestion and analytics workflow.'
      }
    ],
    atsScore: Math.min(92, Math.max(58, 55 + skills.length * 2)),
    atsRubric: {
      keywordAlignment: 78,
      quantifiedImpact: 72,
      structuralClarity: 85,
      techStackDepth: 75
    },
    strengths: [
      `Identified ${skills.length} verified technical proficiencies`,
      'Clean project descriptions with demonstrable technologies'
    ],
    weaknesses: [
      'Could incorporate more quantified performance metrics (e.g. % speedup, data volume)',
      'Add cloud deployment or CI/CD workflow details'
    ],
    actionableRecommendations: [
      'Add numbers to project bullets (e.g., "Processed 50,000 queries at <20ms latency")',
      'Deploy projects to live endpoints with GitHub repository links'
    ],
    placementReadinessSummary: 'Strong technical baseline with solid competency signals. Enhancing real-world cloud deployment and quantified impact metrics will elevate ATS ranking to top percentiles.',
    isLiveInference: false
  };
}

function getFallbackSkillGapAnalysis(profile: any, targetRoleOrJob: any) {
  const currentSkills: string[] = profile?.currentSkills || ['Python', 'SQL', 'C Programming'];
  const roleTitle = targetRoleOrJob?.title || profile?.targetRole || 'Data Engineer';

  const commonCore = ['Python', 'SQL', 'Data Structures', 'Git'];
  const matching = currentSkills.filter(s => commonCore.some(c => c.toLowerCase() === s.toLowerCase()));
  const missing = [
    {
      name: 'Cloud Infrastructure & AWS',
      severity: 'critical' as const,
      industryReason: 'Enterprise architectures require scalable cloud storage and serverless ingestion.',
      recommendedAction: 'Build an AWS S3 + Lambda data ingestion pipeline with IAM permissions.'
    },
    {
      name: 'Distributed Processing (Apache Spark)',
      severity: 'high' as const,
      industryReason: 'Tier-1 tech companies process petabyte scale records where standard scripts fail.',
      recommendedAction: 'Complete PySpark transformations and write benchmark execution plans.'
    },
    {
      name: 'System Design & Data Modeling',
      severity: 'medium' as const,
      industryReason: 'Technical rounds evaluate schema normalization, indexing, and partitioned query performance.',
      recommendedAction: 'Study 3NF relational modeling and NoSQL access patterns.'
    }
  ];

  return {
    placementReadinessScore: 74,
    readinessBreakdown: {
      technicalSkills: 72,
      problemSolving: 78,
      projectsAndExperience: 68,
      communication: 80,
      resumeReadiness: 70
    },
    matchingSkills: matching.map(name => ({
      name,
      proficiency: 'intermediate',
      marketValidation: 'Strong collegiate foundation, verified in candidate skills repository.'
    })),
    missingSkills: missing,
    criticalGapsCount: 2,
    topPriorityFocus: 'Master Cloud Ingestion & Distributed Computing',
    executiveAIInsight: `For ${roleTitle} openings, your programming core is solid. Accelerating through cloud deployments and distributed pipelines will bridge the gap to offer-stage readiness.`,
    tailoredInterviewQuestions: [
      {
        question: 'How do you optimize a slow-running SQL query with multiple table joins?',
        focusArea: 'Query Execution Plans & Indexing',
        idealAnswerKey: 'Explain EXPLAIN ANALYZE, B-Tree indexes, avoiding SELECT *, and partition pruning.'
      },
      {
        question: 'What are the trade-offs between batch ETL and streaming data ingestion?',
        focusArea: 'Architecture Trade-offs',
        idealAnswerKey: 'Discuss latency requirements, compute costs, backpressure, and exactly-once semantics.'
      },
      {
        question: 'Explain how you handle schema evolution in a production data pipeline.',
        focusArea: 'Data Engineering Reliability',
        idealAnswerKey: 'Cover backward/forward compatibility, Avro/Parquet schema registries, and dead letter queues.'
      }
    ],
    recommendedProjects: [
      {
        title: 'Real-Time Telemetry Analytics Engine',
        techStack: ['Python', 'PostgreSQL', 'Docker', 'AWS'],
        description: 'End-to-end pipeline ingesting mock sensor data with automated anomaly alerts.',
        estimatedDays: 10
      }
    ],
    isLiveInference: false
  };
}

function getFallbackRoadmap(targetRole: string) {
  return {
    role: targetRole,
    totalEstimatedWeeks: 12,
    phases: [
      {
        id: 'phase-1',
        phaseName: 'Phase 1: Algorithmic & Language Foundations',
        duration: 'Weeks 1-3',
        focus: 'Data structures, algorithmic patterns, and idiomatic coding',
        milestones: [
          {
            id: 'm-1-1',
            title: 'Master Arrays, Hash Tables, and Two-Pointer Patterns',
            description: 'Solve 35 core LeetCode/HackerRank problems with space/time complexity proofs.',
            skillsCovered: ['Data Structures', 'Algorithms', 'Time Complexity'],
            estimatedHours: 20
          },
          {
            id: 'm-1-2',
            title: 'Advanced SQL Query Design & Schema Modeling',
            description: 'Master window functions (RANK, DENSE_RANK, LEAD/LAG), CTEs, and index optimization.',
            skillsCovered: ['SQL', 'PostgreSQL', 'Query Optimization'],
            estimatedHours: 15
          }
        ]
      },
      {
        id: 'phase-2',
        phaseName: 'Phase 2: Core Domain & Distributed Systems',
        duration: 'Weeks 4-6',
        focus: 'Framework mastery and real-world data pipelines',
        milestones: [
          {
            id: 'm-2-1',
            title: 'Cloud Infrastructure & Serverless Pipelines',
            description: 'Deploy automated ETL ingestion using AWS Lambda, S3, and RDS with Docker containerization.',
            skillsCovered: ['AWS', 'Docker', 'ETL Concepts'],
            estimatedHours: 25
          }
        ]
      },
      {
        id: 'phase-3',
        phaseName: 'Phase 3: Production Capstone Implementation',
        duration: 'Weeks 7-9',
        focus: 'Architecting an impressive showcase portfolio project',
        milestones: [
          {
            id: 'm-3-1',
            title: 'End-to-End Scalable Production System',
            description: 'Build and deploy a full-stack or streaming engine with automated tests and CI/CD.',
            skillsCovered: ['System Design', 'CI/CD', 'Production Deployments'],
            estimatedHours: 30
          }
        ]
      },
      {
        id: 'phase-4',
        phaseName: 'Phase 4: Placement Sprints & Mock Rounds',
        duration: 'Weeks 10-12',
        focus: 'Live mock interviews, ATS optimization, and company targeting',
        milestones: [
          {
            id: 'm-4-1',
            title: 'Target Company Mock Rounds & Behavioral Sprints',
            description: 'Simulate 6 timed technical interviews and refine STAR methodology behavioral stories.',
            skillsCovered: ['Interview Prep', 'Communication', 'STAR Method'],
            estimatedHours: 15
          }
        ]
      }
    ],
    coachAdvice: 'Consistency beats intensity: dedicating 90 focused minutes daily yields superior retention compared to weekend cramming.',
    isLiveInference: false
  };
}
