import { StudentProfile, StudentSkill, ReadinessBreakdown } from '../types';

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  name: 'Gowtham R',
  degree: 'B.Tech',
  branch: 'Computer Science Engineering',
  graduationYear: 2027,
  currentSkills: ['Python', 'Basic SQL', 'C Programming', 'Basic Data Structures'],
  targetRole: 'Data Engineer',
  targetCompany: 'Amazon',
  bio: 'Pre-final year engineering student passionate about building scalable data systems, cloud telemetry, and securing a tier-1 product engineering placement.',
  college: 'Sri Sairam Engineering College (Tier 2/3 College)',
  email: 'gowtham.r@sairam.edu.in',
  phone: '+91 98401 23456',
  github: 'https://github.com/Gowthamraj822008',
  linkedin: 'https://linkedin.com/in/gowtham-r-engineer',
  portfolio: 'https://gowtham-portfolio.dev',
  interests: ['Distributed Data Pipelines', 'Cloud Architecture', 'Query Optimization', 'Real-Time Streaming'],
  experiences: [
    {
      id: 'exp-1',
      title: 'Summer Technical Trainee',
      organization: 'HexaWave Tech Labs',
      role: 'Backend Engineering Intern',
      duration: 'May 2025 - Jul 2025 (2 Mos)',
      technologies: ['Python', 'Flask', 'PostgreSQL', 'Git'],
      description: 'Engineered automated ETL scripts digesting sensor telemetry into normalized Postgres tables with custom automated health alerts.'
    },
    {
      id: 'exp-2',
      title: 'Campus Lead & Open Source Contributor',
      organization: 'ACM Student Chapter',
      role: 'Technical Secretary',
      duration: 'Aug 2024 - Present',
      technologies: ['C Programming', 'Data Structures', 'Git'],
      description: 'Mentored 120+ 1st-year students on algorithmic problem solving and hosted collegiate hackathons.'
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Real-Time Log Stream Anomaly Aggregator',
      description: 'Built a lightweight ingestion engine using Python and SQLite capable of indexing 10,000 JSON log entries per second with keyword alerting.',
      technologies: ['Python', 'SQLite', 'Multithreading', 'Docker'],
      githubUrl: 'https://github.com/Gowthamraj822008/log-stream-aggregator'
    },
    {
      id: 'proj-2',
      title: 'E-Commerce SQL Schema & Analytics Dashboard',
      description: 'Designed a 3NF relational database schema modeling orders, customers, and inventory with complex window queries for monthly cohort retention.',
      technologies: ['SQL', 'PostgreSQL', 'Database Design'],
      githubUrl: 'https://github.com/Gowthamraj822008/ecommerce-sql-benchmark'
    }
  ],
  resume: {
    fileName: 'Gowtham_R_Data_Engineer_Resume.pdf',
    fileSize: '184 KB',
    uploadedAt: '2026-09-04T10:30:00Z',
    extractedSkills: ['Python', 'SQL', 'C Programming', 'Data Structures', 'PostgreSQL', 'Flask', 'Git', 'Linux'],
    extractedExperience: [
      'Backend Engineering Intern at HexaWave Tech Labs (2 Mos)',
      'ACM Student Chapter Technical Secretary'
    ],
    extractedProjects: [
      'Real-Time Log Stream Anomaly Aggregator',
      'E-Commerce SQL Schema & Analytics Dashboard'
    ],
    atsScore: 78
  }
};

export const INITIAL_ASSESSED_SKILLS: Record<string, StudentSkill> = {
  // Current known skills & core Data Engineer skills
  'Python': { name: 'Python', level: 'advanced', category: 'core', source: 'initial' },
  'SQL': { name: 'SQL', level: 'beginner', category: 'core', source: 'initial' },
  'Basic SQL': { name: 'Basic SQL', level: 'beginner', category: 'core', source: 'initial' },
  'C Programming': { name: 'C Programming', level: 'intermediate', category: 'core', source: 'initial' },
  'Data Structures & Algorithms': { name: 'Data Structures & Algorithms', level: 'beginner', category: 'core', source: 'initial' },
  'Basic Data Structures': { name: 'Basic Data Structures', level: 'beginner', category: 'core', source: 'initial' },
  'Communication': { name: 'Communication', level: 'advanced', category: 'soft', source: 'initial' },
  'Database Systems': { name: 'Database Systems', level: 'beginner', category: 'core', source: 'role_required' },
  'Cloud Computing': { name: 'Cloud Computing', level: 'not_started', category: 'tools', source: 'role_required' },
  'AWS': { name: 'AWS', level: 'not_started', category: 'tools', source: 'role_required' },
  'Data Warehousing': { name: 'Data Warehousing', level: 'not_started', category: 'core', source: 'role_required' },
  'ETL Concepts': { name: 'ETL Concepts', level: 'not_started', category: 'framework', source: 'role_required' },
  'Apache Spark': { name: 'Apache Spark', level: 'not_started', category: 'framework', source: 'role_required' },
  'System Design': { name: 'System Design', level: 'not_started', category: 'core', source: 'role_required' },
  'Real-World Projects': { name: 'Real-World Projects', level: 'not_started', category: 'tools', source: 'role_required' },
  'Real-World Data Projects': { name: 'Real-World Data Projects', level: 'not_started', category: 'tools', source: 'role_required' },
};

export const INITIAL_READINESS_BREAKDOWN: ReadinessBreakdown = {
  technicalSkills: 70,
  problemSolving: 60,
  projectsAndExperience: 45,
  communication: 78,
  resumeReadiness: 55,
};
