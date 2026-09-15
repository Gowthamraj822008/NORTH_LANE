import { Organization, Internship, InternshipApplication, AppNotification } from '../types';

export const INITIAL_ORGANIZATIONS: Organization[] = [
  {
    id: 'org-amazon',
    name: 'Amazon Web Services',
    logo: 'https://images.unsplash.com/photo-1523474255658-4af61b1684c4?w=100&auto=format&fit=crop&q=80',
    industry: 'Cloud Infrastructure & E-Commerce',
    location: 'Bangalore / Hyderabad / Remote',
    website: 'https://aws.amazon.com',
    size: '100,000+ employees',
    bio: 'AWS is the world’s most comprehensive and broadly adopted cloud platform, offering over 200 fully featured services from data centers globally.',
    isVerified: true,
    contactEmail: 'aws-university-talent@amazon.com',
    recruiterName: 'Priya Sharma (Tech University Talent Lead)',
    activePostingsCount: 3,
  },
  {
    id: 'org-microsoft',
    name: 'Microsoft',
    logo: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=100&auto=format&fit=crop&q=80',
    industry: 'Enterprise Software & Cloud Platforms',
    location: 'Hyderabad / Noida / Remote',
    website: 'https://microsoft.com',
    size: '150,000+ employees',
    bio: 'Empowering every person and organization on the planet to achieve more through Azure, Developer Tools, and Artificial Intelligence.',
    isVerified: true,
    contactEmail: 'campus-hiring@microsoft.com',
    recruiterName: 'Arun Kumar (Campus Talent Partner)',
    activePostingsCount: 2,
  },
  {
    id: 'org-razorpay',
    name: 'Razorpay',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    industry: 'FinTech & Payments Infrastructure',
    location: 'Bangalore / Hybrid',
    website: 'https://razorpay.com',
    size: '3,000+ employees',
    bio: 'India’s leading full-stack financial solutions company powering frictionless digital payments for millions of businesses.',
    isVerified: true,
    contactEmail: 'engineering-campus@razorpay.com',
    recruiterName: 'Deepa Varma (Lead Engineering Recruiter)',
    activePostingsCount: 2,
  },
  {
    id: 'org-google',
    name: 'Google',
    logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&auto=format&fit=crop&q=80',
    industry: 'Search, Cloud & Artificial Intelligence',
    location: 'Bangalore / Hyderabad',
    website: 'https://careers.google.com',
    size: '180,000+ employees',
    bio: 'Organizing the world’s information and making it universally accessible and useful through world-class engineering systems.',
    isVerified: true,
    contactEmail: 'university-india@google.com',
    recruiterName: 'Siddharth Iyer (Senior University Recruiter)',
    activePostingsCount: 2,
  },
  {
    id: 'org-stripe',
    name: 'Stripe',
    logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=100&auto=format&fit=crop&q=80',
    industry: 'Global Financial Infrastructure',
    location: 'Remote / Bangalore Hub',
    website: 'https://stripe.com',
    size: '8,000+ employees',
    bio: 'Stripe is a technology company that builds economic infrastructure for the internet. Businesses of every size use our software to accept payments and manage their businesses online.',
    isVerified: true,
    contactEmail: 'talent-india@stripe.com',
    recruiterName: 'Elena Rostova (Engineering Talent)',
    activePostingsCount: 1,
  },
  {
    id: 'org-snowflake',
    name: 'Snowflake Data Cloud',
    logo: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=100&auto=format&fit=crop&q=80',
    industry: 'Data Cloud & Analytics',
    location: 'Pune / Remote',
    website: 'https://snowflake.com',
    size: '6,000+ employees',
    bio: 'Snowflake enables organizations to mobilize data with near-infinite scale, concurrency, and performance across multi-cloud environments.',
    isVerified: true,
    contactEmail: 'early-careers@snowflake.com',
    recruiterName: 'Karthik Raman (Core Data Systems Recruiter)',
    activePostingsCount: 1,
  },
  {
    id: 'org-zepto',
    name: 'Zepto',
    logo: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=100&auto=format&fit=crop&q=80',
    industry: 'Quick Commerce & Real-time Logistics',
    location: 'Mumbai / Bangalore',
    website: 'https://zeptonow.com',
    size: '2,500+ employees',
    bio: 'Hyper-growth real-time logistics network delivering high reliability at millisecond order-dispatch velocity.',
    isVerified: true,
    contactEmail: 'tech-careers@zeptonow.com',
    recruiterName: 'Nitin Bajaj (Head of Talent)',
    activePostingsCount: 1,
  },
  {
    id: 'org-cloudscale',
    name: 'CloudScale Innovations',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&auto=format&fit=crop&q=80',
    industry: 'Enterprise DevOps & Kubernetes Automation',
    location: 'Chennai / Hybrid',
    website: 'https://cloudscale-systems.tech',
    size: '80 employees',
    bio: 'Early-stage funded infrastructure startup automating multi-cloud container deployments and observability pipelines.',
    isVerified: false, // Pending Admin Verification
    contactEmail: 'talent@cloudscale-systems.tech',
    recruiterName: 'Rajesh V (Co-Founder & CTO)',
    activePostingsCount: 1,
  }
];

export const INITIAL_INTERNSHIPS: Internship[] = [
  {
    id: 'intern-amazon-de',
    title: 'Data Engineering Intern — AWS Data Lakes',
    organizationId: 'org-amazon',
    organizationName: 'Amazon Web Services',
    organizationLogo: 'https://images.unsplash.com/photo-1523474255658-4af61b1684c4?w=100&auto=format&fit=crop&q=80',
    location: 'Bangalore / Hybrid',
    workMode: 'hybrid',
    stipend: '₹80,000 / month',
    stipendNumeric: 80000,
    duration: '6 Months (Jan - Jun)',
    category: 'Data & Infrastructure',
    description: 'Join the AWS Analytics team building multi-terabyte data transformation pipelines using PySpark, AWS Glue, and Amazon S3. You will work alongside Principal Engineers optimizing partitioned Parquet tables and telemetry pipelines.',
    responsibilities: [
      'Design, build, and maintain scalable batch and streaming data pipelines using Python and Spark.',
      'Optimize SQL queries and Athena/Redshift table partitioning strategies for low latency analytical queries.',
      'Implement data quality validation checks and automate error alerting using CloudWatch and Lambda.',
      'Collaborate with Applied Scientists to curate clean training datasets for machine learning models.'
    ],
    requirements: [
      { skillName: 'Python', importance: 'critical', minLevel: 'intermediate' },
      { skillName: 'SQL', importance: 'critical', minLevel: 'intermediate' },
      { skillName: 'Data Structures & Algorithms', importance: 'high', minLevel: 'intermediate' },
      { skillName: 'AWS', importance: 'high', minLevel: 'beginner' },
      { skillName: 'Apache Spark', importance: 'medium', minLevel: 'beginner' },
      { skillName: 'Data Warehousing', importance: 'medium', minLevel: 'beginner' }
    ],
    eligibility: 'B.Tech / B.E. / M.Tech in CS / IT / Data Science graduating in 2026 or 2027 with minimum 7.5 CGPA.',
    deadline: '2026-11-30',
    postedDate: '2026-09-01',
    isFeatured: true,
    applicantsCount: 42,
    status: 'active'
  },
  {
    id: 'intern-microsoft-azure',
    title: 'Software Engineering Intern — Azure Core Systems',
    organizationId: 'org-microsoft',
    organizationName: 'Microsoft',
    organizationLogo: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=100&auto=format&fit=crop&q=80',
    location: 'Hyderabad',
    workMode: 'onsite',
    stipend: '₹1,25,000 / month',
    stipendNumeric: 125000,
    duration: '2 Months (Summer)',
    category: 'Software Development',
    description: 'Work with the Azure Storage and Compute team building high-availability distributed systems, telemetry engines, and resilient cloud backend microservices.',
    responsibilities: [
      'Implement performant backend features in C++, C# or Java with strict p99 latency boundaries.',
      'Author unit, integration, and load testing suites simulating enterprise fault conditions.',
      'Participate in architecture reviews and root cause analysis of distributed state issues.'
    ],
    requirements: [
      { skillName: 'Data Structures & Algorithms', importance: 'critical', minLevel: 'advanced' },
      { skillName: 'C Programming', importance: 'high', minLevel: 'intermediate' },
      { skillName: 'Operating Systems', importance: 'high', minLevel: 'intermediate' },
      { skillName: 'System Design', importance: 'medium', minLevel: 'beginner' },
      { skillName: 'Git & Version Control', importance: 'high', minLevel: 'intermediate' }
    ],
    eligibility: 'Pre-final year (Class of 2027) engineering students enrolled in accredited university.',
    deadline: '2026-10-15',
    postedDate: '2026-09-05',
    isFeatured: true,
    applicantsCount: 78,
    status: 'active'
  },
  {
    id: 'intern-razorpay-backend',
    title: 'Backend Engineering Intern — Merchant Gateway',
    organizationId: 'org-razorpay',
    organizationName: 'Razorpay',
    organizationLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    location: 'Bangalore',
    workMode: 'hybrid',
    stipend: '₹60,000 / month',
    stipendNumeric: 60000,
    duration: '6 Months',
    category: 'Backend Development',
    description: 'Help build high-throughput payment routing microservices processing millions of daily transactions with 99.999% availability.',
    responsibilities: [
      'Develop idempotent REST APIs handling webhook retries, transaction settlement, and ledgering.',
      'Optimize database queries on PostgreSQL and cache hot session data in Redis.',
      'Instrument observability metrics using Prometheus and Grafana dashboards.'
    ],
    requirements: [
      { skillName: 'SQL', importance: 'critical', minLevel: 'intermediate' },
      { skillName: 'Python', importance: 'high', minLevel: 'intermediate' },
      { skillName: 'Database Systems', importance: 'critical', minLevel: 'intermediate' },
      { skillName: 'REST APIs', importance: 'high', minLevel: 'intermediate' },
      { skillName: 'Git & Version Control', importance: 'medium', minLevel: 'beginner' }
    ],
    eligibility: 'Enthusiastic CS student with strong grasp of database transactions and web protocols.',
    deadline: '2026-11-15',
    postedDate: '2026-09-08',
    isFeatured: false,
    applicantsCount: 31,
    status: 'active'
  },
  {
    id: 'intern-google-ml',
    title: 'Machine Learning Systems Intern',
    organizationId: 'org-google',
    organizationName: 'Google',
    organizationLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&auto=format&fit=crop&q=80',
    location: 'Bangalore',
    workMode: 'onsite',
    stipend: '₹1,50,000 / month',
    stipendNumeric: 150000,
    duration: '3 Months (Summer)',
    category: 'AI / Machine Learning',
    description: 'Work on cutting-edge transformer evaluation pipelines, vector indexing, and low-latency inference runtimes for Google Cloud AI services.',
    responsibilities: [
      'Profile PyTorch and JAX tensor operations across TPU and GPU clusters.',
      'Benchmark embedding retrieval latencies against billion-node nearest-neighbor graphs.',
      'Contribute to open evaluation benchmarks for frontier language models.'
    ],
    requirements: [
      { skillName: 'Python', importance: 'critical', minLevel: 'advanced' },
      { skillName: 'Data Structures & Algorithms', importance: 'critical', minLevel: 'advanced' },
      { skillName: 'Machine Learning', importance: 'critical', minLevel: 'intermediate' },
      { skillName: 'System Design', importance: 'high', minLevel: 'intermediate' }
    ],
    eligibility: 'Enrolled in Bachelor’s or Master’s in CS/AI. Demonstrable open-source or research background.',
    deadline: '2026-10-31',
    postedDate: '2026-08-28',
    isFeatured: true,
    applicantsCount: 112,
    status: 'active'
  },
  {
    id: 'intern-stripe-infra',
    title: 'Infrastructure & Cloud Systems Intern',
    organizationId: 'org-stripe',
    organizationName: 'Stripe',
    organizationLogo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=100&auto=format&fit=crop&q=80',
    location: 'Remote (India)',
    workMode: 'remote',
    stipend: '₹95,000 / month',
    stipendNumeric: 95000,
    duration: '4 Months',
    category: 'Cloud & DevOps',
    description: 'Stripe’s infrastructure team manages global compute fabrics, Kubernetes orchestrators, and zero-trust service meshes that keep money moving globally.',
    responsibilities: [
      'Automate Terraform infrastructure modules and AWS VPC peering connections.',
      'Build internal developer tooling improving pull request CI verification cycle time.',
      'Write chaos engineering experiment scripts validating automatic pod failovers.'
    ],
    requirements: [
      { skillName: 'Cloud Computing', importance: 'critical', minLevel: 'intermediate' },
      { skillName: 'AWS', importance: 'high', minLevel: 'beginner' },
      { skillName: 'Python', importance: 'high', minLevel: 'intermediate' },
      { skillName: 'Operating Systems', importance: 'high', minLevel: 'intermediate' }
    ],
    eligibility: 'Students graduating in 2026 or 2027 who enjoy debugging systems from network packets to syscalls.',
    deadline: '2026-12-05',
    postedDate: '2026-09-02',
    isFeatured: false,
    applicantsCount: 27,
    status: 'active'
  },
  {
    id: 'intern-snowflake-data',
    title: 'Data Platform & Warehouse Intern',
    organizationId: 'org-snowflake',
    organizationName: 'Snowflake Data Cloud',
    organizationLogo: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=100&auto=format&fit=crop&q=80',
    location: 'Pune / Remote',
    workMode: 'remote',
    stipend: '₹85,000 / month',
    stipendNumeric: 85000,
    duration: '6 Months',
    category: 'Data & Infrastructure',
    description: 'Explore the internals of columnar query engines, micro-partition prune algorithms, and metadata compilation layers.',
    responsibilities: [
      'Write regression benchmarks for SQL compiler optimization passes.',
      'Analyze query execution plans on multi-cluster shared data architectures.',
      'Develop automated ingestion connectors for modern cloud event streams.'
    ],
    requirements: [
      { skillName: 'SQL', importance: 'critical', minLevel: 'advanced' },
      { skillName: 'Data Warehousing', importance: 'critical', minLevel: 'beginner' },
      { skillName: 'Python', importance: 'high', minLevel: 'intermediate' },
      { skillName: 'Data Structures & Algorithms', importance: 'high', minLevel: 'intermediate' }
    ],
    eligibility: 'Pre-final and final year students with strong database and systems curiosity.',
    deadline: '2026-11-20',
    postedDate: '2026-09-04',
    isFeatured: false,
    applicantsCount: 39,
    status: 'active'
  },
  {
    id: 'intern-zepto-scale',
    title: 'High-Throughput Platform Intern',
    organizationId: 'org-zepto',
    organizationName: 'Zepto',
    organizationLogo: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=100&auto=format&fit=crop&q=80',
    location: 'Bangalore',
    workMode: 'onsite',
    stipend: '₹55,000 / month',
    stipendNumeric: 55000,
    duration: '6 Months',
    category: 'Backend Development',
    description: 'Work at the core of dark-store dispatch algorithms, driver route optimization, and real-time inventory locking at peak flash demand.',
    responsibilities: [
      'Develop high-concurrency event handlers subscribing to Kafka inventory topics.',
      'Build sub-10ms cache retrieval strategies using Redis cluster nodes.',
      'Deploy service updates using Canary deployments and automated health checks.'
    ],
    requirements: [
      { skillName: 'Python', importance: 'high', minLevel: 'intermediate' },
      { skillName: 'SQL', importance: 'high', minLevel: 'intermediate' },
      { skillName: 'Data Structures & Algorithms', importance: 'critical', minLevel: 'intermediate' },
      { skillName: 'Database Systems', importance: 'high', minLevel: 'beginner' }
    ],
    eligibility: 'Energetic engineering students ready for fast-paced startup execution and scale.',
    deadline: '2026-10-25',
    postedDate: '2026-09-09',
    isFeatured: false,
    applicantsCount: 44,
    status: 'active'
  },
  {
    id: 'intern-cloudscale-devops',
    title: 'Kubernetes & CI/CD Pipeline Intern',
    organizationId: 'org-cloudscale',
    organizationName: 'CloudScale Innovations',
    organizationLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&auto=format&fit=crop&q=80',
    location: 'Chennai / Hybrid',
    workMode: 'hybrid',
    stipend: '₹35,000 / month',
    stipendNumeric: 35000,
    duration: '3 Months',
    category: 'Cloud & DevOps',
    description: 'Construct automated Helm chart release workflows, Docker multi-stage build optimizers, and automated vulnerability scanning gates.',
    responsibilities: [
      'Build GitHub Actions CI/CD workflows packaging container images and deploying to staging clusters.',
      'Configure Grafana Loki log aggregation and Prometheus alert triggers.',
      'Write bash and Python automation scripts for routine cluster health checks.'
    ],
    requirements: [
      { skillName: 'Cloud Computing', importance: 'high', minLevel: 'beginner' },
      { skillName: 'Python', importance: 'high', minLevel: 'intermediate' },
      { skillName: 'Git & Version Control', importance: 'critical', minLevel: 'intermediate' }
    ],
    eligibility: 'Passionate about Linux, networking, and containers.',
    deadline: '2026-11-10',
    postedDate: '2026-09-10',
    isFeatured: false,
    applicantsCount: 14,
    status: 'active'
  }
];

export const INITIAL_APPLICATIONS: InternshipApplication[] = [
  {
    id: 'app-001',
    internshipId: 'intern-amazon-de',
    internshipTitle: 'Data Engineering Intern — AWS Data Lakes',
    organizationName: 'Amazon Web Services',
    organizationLogo: 'https://images.unsplash.com/photo-1523474255658-4af61b1684c4?w=100&auto=format&fit=crop&q=80',
    studentName: 'Aravind Raman',
    studentEmail: 'aravind.raman@eng.edu',
    appliedDate: '2026-09-06',
    status: 'shortlisted',
    compatibilityScore: 84,
    coverNote: 'Excited about scaling data lake pipelines on AWS. I have solid foundations in Python scripting, relational SQL schemas, and have begun learning PySpark fundamentals through NorthLane roadmap.',
    resumeFileName: 'Aravind_Raman_Data_Engineer_Resume.pdf',
    interviewDetails: {
      date: '2026-09-22',
      time: '14:30 IST',
      meetLink: 'https://chime.aws/748392019',
      notes: 'Round 1: Problem Solving & Data Structures with Technical Team Lead.'
    },
    timeline: [
      { status: 'applied', date: '2026-09-06', message: 'Application submitted via NorthLane One-Click Match.' },
      { status: 'under_review', date: '2026-09-08', message: 'Profile reviewed by Priya Sharma (AWS University Talent).' },
      { status: 'shortlisted', date: '2026-09-12', message: 'Selected for Technical Interview rounds based on high skill match!' }
    ]
  },
  {
    id: 'app-002',
    internshipId: 'intern-microsoft-azure',
    internshipTitle: 'Software Engineering Intern — Azure Core Systems',
    organizationName: 'Microsoft',
    organizationLogo: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=100&auto=format&fit=crop&q=80',
    studentName: 'Aravind Raman',
    studentEmail: 'aravind.raman@eng.edu',
    appliedDate: '2026-09-09',
    status: 'under_review',
    compatibilityScore: 72,
    coverNote: 'Passionate about operating systems, memory safety, and cloud service reliability.',
    resumeFileName: 'Aravind_Raman_Data_Engineer_Resume.pdf',
    timeline: [
      { status: 'applied', date: '2026-09-09', message: 'Application submitted.' },
      { status: 'under_review', date: '2026-09-11', message: 'Dossier passed initial automated ATS filter with 72% compatibility.' }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    type: 'application_update',
    title: 'Interview Scheduled with AWS!',
    message: 'Congratulations! AWS University Talent has shortlisted your application for Data Engineering Intern. Round 1 is on Sept 22 at 14:30 IST.',
    timestamp: '2 hours ago',
    isRead: false,
    actionUrl: 'applications',
    relatedId: 'app-001'
  },
  {
    id: 'notif-2',
    type: 'match_alert',
    title: 'High Compatibility Internship Matched (84%)',
    message: 'AWS Data Engineering Intern matches your Python and SQL strengths. Check requirements and gap diagnosis.',
    timestamp: '1 day ago',
    isRead: false,
    actionUrl: 'internships',
    relatedId: 'intern-amazon-de'
  },
  {
    id: 'notif-3',
    type: 'roadmap_progress',
    title: 'Milestone 2 Completed',
    message: 'Your SQL queries and indexing progress boosted your Technical Readiness score by +8 points!',
    timestamp: '3 days ago',
    isRead: true,
    actionUrl: 'roadmap'
  }
];
