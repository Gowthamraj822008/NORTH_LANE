import { StudentProfile, StudentSkill, ReadinessBreakdown } from '../types';

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  name: 'Aravind Raman',
  degree: 'B.Tech',
  branch: 'Computer Science & Engineering',
  graduationYear: 2026,
  currentSkills: ['Python', 'SQL', 'PostgreSQL', 'C Programming', 'Data Structures & Algorithms', 'Docker', 'Git'],
  targetRole: 'Data Engineer',
  targetCompany: 'Amazon Web Services',
  bio: 'Computer Science engineering student specializing in distributed data pipelines, cloud-native storage engines, and backend telemetry optimization.',
  college: 'College of Engineering (Department of Computer Science)',
  email: 'aravind.raman@eng.edu',
  phone: '+91 98401 54321',
  github: 'https://github.com/aravind-raman-tech',
  linkedin: 'https://linkedin.com/in/aravind-raman-engineer',
  portfolio: 'https://aravind-engineering.dev',
  interests: ['Distributed Data Pipelines', 'Cloud Architecture', 'Query Optimization', 'Real-Time Streaming'],
  experiences: [
    {
      id: 'exp-1',
      title: 'Backend Engineering Intern',
      organization: 'HexaWave Tech Labs',
      role: 'Backend Engineering Intern',
      duration: 'May 2025 - Jul 2025 (3 Mos)',
      technologies: ['Python', 'Flask', 'PostgreSQL', 'Docker', 'Git'],
      description: 'Engineered automated ETL pipelines ingesting telemetry into normalized PostgreSQL schemas with sub-50ms query indices.'
    },
    {
      id: 'exp-2',
      title: 'Technical Lead & Open Source Contributor',
      organization: 'ACM Collegiate Chapter',
      role: 'Technical Secretary',
      duration: 'Aug 2024 - Present',
      technologies: ['C Programming', 'Data Structures', 'Git', 'Linux'],
      description: 'Led technical workshops on algorithmic problem solving, graph algorithms, and competitive coding for 150+ students.'
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Distributed Stream Anomaly Detection Engine',
      description: 'Built a multi-threaded ingestion broker in Python capable of processing 15,000 JSON events per second with Redis cache lookups.',
      technologies: ['Python', 'Redis', 'PostgreSQL', 'Docker'],
      githubUrl: 'https://github.com/aravind-raman-tech/stream-anomaly-engine'
    },
    {
      id: 'proj-2',
      title: 'High-Throughput Analytics Schema & Benchmark',
      description: 'Designed a 3NF relational data warehouse partition modeling transactions and telemetry with complex window queries and automated migration tests.',
      technologies: ['SQL', 'PostgreSQL', 'Database Design', 'Query Optimization'],
      githubUrl: 'https://github.com/aravind-raman-tech/ecommerce-sql-benchmark'
    }
  ],
  resume: {
    fileName: 'Aravind_Raman_Data_Engineer_Resume.pdf',
    fileSize: '210 KB',
    uploadedAt: '2026-09-08T10:30:00Z',
    extractedSkills: ['Python', 'SQL', 'PostgreSQL', 'C Programming', 'Data Structures & Algorithms', 'Docker', 'Git', 'Linux'],
    extractedExperience: [
      'Backend Engineering Intern at HexaWave Tech Labs',
      'ACM Collegiate Chapter Technical Secretary'
    ],
    extractedProjects: [
      'Distributed Stream Anomaly Detection Engine',
      'High-Throughput Analytics Schema & Benchmark'
    ],
    atsScore: 84
  }
};

export const EMPTY_STUDENT_PROFILE: StudentProfile = {
  name: '',
  degree: 'B.Tech',
  branch: 'Computer Science & Engineering',
  graduationYear: 2026,
  currentSkills: [],
  targetRole: 'Software Engineer',
  targetCompany: 'Top Tech Companies',
  bio: '',
  college: '',
  email: '',
  phone: '',
  github: '',
  linkedin: '',
  portfolio: '',
  interests: [],
  experiences: [],
  projects: []
};

export const INITIAL_ASSESSED_SKILLS: Record<string, StudentSkill> = {
  // Current known skills & core Data Engineer skills
  'Python': { name: 'Python', level: 'advanced', category: 'core', source: 'initial' },
  'SQL': { name: 'SQL', level: 'intermediate', category: 'core', source: 'initial' },
  'PostgreSQL': { name: 'PostgreSQL', level: 'intermediate', category: 'tools', source: 'initial' },
  'C Programming': { name: 'C Programming', level: 'intermediate', category: 'core', source: 'initial' },
  'Data Structures & Algorithms': { name: 'Data Structures & Algorithms', level: 'intermediate', category: 'core', source: 'initial' },
  'Docker': { name: 'Docker', level: 'intermediate', category: 'tools', source: 'initial' },
  'Git': { name: 'Git', level: 'advanced', category: 'tools', source: 'initial' },
  'Communication': { name: 'Communication', level: 'advanced', category: 'soft', source: 'initial' },
  'Database Systems': { name: 'Database Systems', level: 'intermediate', category: 'core', source: 'role_required' },
  'Cloud Computing': { name: 'Cloud Computing', level: 'not_started', category: 'tools', source: 'role_required' },
  'AWS': { name: 'AWS', level: 'not_started', category: 'tools', source: 'role_required' },
  'Data Warehousing': { name: 'Data Warehousing', level: 'not_started', category: 'core', source: 'role_required' },
  'ETL Concepts': { name: 'ETL Concepts', level: 'not_started', category: 'framework', source: 'role_required' },
  'Apache Spark': { name: 'Apache Spark', level: 'not_started', category: 'framework', source: 'role_required' },
  'System Design': { name: 'System Design', level: 'not_started', category: 'core', source: 'role_required' },
  'Real-World Projects': { name: 'Real-World Projects', level: 'beginner', category: 'tools', source: 'role_required' },
  'Real-World Data Projects': { name: 'Real-World Data Projects', level: 'beginner', category: 'tools', source: 'role_required' },
};

export const INITIAL_READINESS_BREAKDOWN: ReadinessBreakdown = {
  technicalSkills: 75,
  problemSolving: 70,
  projectsAndExperience: 60,
  communication: 80,
  resumeReadiness: 65,
};
