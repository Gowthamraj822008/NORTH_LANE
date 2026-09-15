import { TargetRoleData, RoadmapStep } from '../types';

export const TARGET_ROLES: TargetRoleData[] = [
  {
    id: 'data-engineer',
    title: 'Data Engineer',
    tagline: 'Architect pipelines, scale data lakes, and transform raw enterprise data into analytical assets',
    category: 'Data & Infrastructure',
    iconName: 'Database',
    averageSalaryTier: '₹8 - ₹18 LPA for Freshers / SDE-1',
    description: 'Data Engineers build robust pipelines to collect, transform, and store data at massive scale for analytics and machine learning systems.',
    topCompanies: ['Amazon', 'Flipkart', 'Walmart Global Tech', 'Google', 'Microsoft', 'Oracle'],
    requiredSkills: [
      { name: 'Python', category: 'core', importance: 'critical', description: 'Scripting, OOP, data processing libraries, and automation.' },
      { name: 'SQL', category: 'core', importance: 'critical', description: 'Complex joins, window functions, CTEs, query optimization, indexing.' },
      { name: 'Data Structures & Algorithms', category: 'core', importance: 'high', description: 'Arrays, hashes, trees, graphs, sorting, searching, time complexity.' },
      { name: 'Database Systems', category: 'core', importance: 'high', description: 'RDBMS principles, ACID compliance, NoSQL (MongoDB, Cassandra), indexing.' },
      { name: 'Cloud Computing', category: 'tools', importance: 'critical', description: 'Cloud fundamentals, IAM, object storage, virtual networking.' },
      { name: 'AWS', category: 'tools', importance: 'critical', description: 'S3, EC2, Lambda, Glue, Athena, Redshift, EMR for data workflows.' },
      { name: 'Data Warehousing', category: 'core', importance: 'critical', description: 'Star & snowflake schemas, dimensional modeling, slowly changing dimensions.' },
      { name: 'ETL Concepts', category: 'framework', importance: 'critical', description: 'Batch vs streaming extraction, data cleaning, validation pipelines.' },
      { name: 'Apache Spark', category: 'framework', importance: 'critical', description: 'Distributed data processing, PySpark, DataFrames, resilient distributed datasets.' },
      { name: 'System Design', category: 'core', importance: 'high', description: 'Scalability, load balancing, caching, fault tolerance, message queues (Kafka).' },
      { name: 'Real-World Projects', category: 'tools', importance: 'critical', description: 'End-to-end data pipelines deployed to cloud with automated ingestion.' }
    ]
  },
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    tagline: 'Design, develop, test, and deploy resilient web applications, microservices, and backend APIs',
    category: 'Software Development',
    iconName: 'Code2',
    averageSalaryTier: '₹7 - ₹22 LPA for Freshers',
    description: 'Software Engineers develop end-to-end products, design clean architectures, write performant code, and solve algorithmic challenges.',
    topCompanies: ['Amazon', 'Microsoft', 'Google', 'Adobe', 'Cisco', 'Goldman Sachs'],
    requiredSkills: [
      { name: 'Data Structures & Algorithms', category: 'core', importance: 'critical', description: 'Dynamic programming, trees, graphs, heaps, sliding window, binary search.' },
      { name: 'Java / Python / C++', category: 'core', importance: 'critical', description: 'Deep mastery of at least one strongly typed or OOP-based language.' },
      { name: 'Object-Oriented Programming', category: 'core', importance: 'critical', description: 'SOLID principles, design patterns, inheritance, polymorphism, abstraction.' },
      { name: 'System Design', category: 'core', importance: 'high', description: 'Client-server architecture, caching, microservices, database sharding, API design.' },
      { name: 'Operating Systems', category: 'core', importance: 'high', description: 'Concurrency, multi-threading, memory management, processes, deadlocks.' },
      { name: 'Computer Networks', category: 'core', importance: 'high', description: 'TCP/IP, HTTP/HTTPS protocols, DNS, web sockets, OSI model.' },
      { name: 'SQL & Databases', category: 'core', importance: 'high', description: 'Schema normalization, transactions, query optimization, indexing.' },
      { name: 'Git & Version Control', category: 'tools', importance: 'high', description: 'Branching strategies, merge conflicts, pull requests, CI/CD basics.' },
      { name: 'REST APIs', category: 'framework', importance: 'high', description: 'HTTP methods, status codes, authentication (JWT/OAuth), contract design.' },
      { name: 'Real-World Projects', category: 'tools', importance: 'critical', description: 'Full-stack or backend microservice projects with database and auth.' }
    ]
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    tagline: 'Translate complex datasets into actionable business intelligence, KPI dashboards, and data stories',
    category: 'Analytics & BI',
    iconName: 'BarChart3',
    averageSalaryTier: '₹5 - ₹12 LPA for Freshers',
    description: 'Data Analysts bridge business strategy and data by querying databases, building intuitive BI dashboards, and performing statistical analysis.',
    topCompanies: ['Deloitte', 'EY', 'Amazon', 'Accenture', 'Mu Sigma', 'Tiger Analytics'],
    requiredSkills: [
      { name: 'SQL', category: 'core', importance: 'critical', description: 'Aggregations, joins, subqueries, ranking functions, analytical queries.' },
      { name: 'Excel & Advanced Spreadsheets', category: 'tools', importance: 'critical', description: 'VLOOKUP/XLOOKUP, Pivot Tables, Power Query, conditional modeling.' },
      { name: 'Python', category: 'core', importance: 'high', description: 'Pandas, NumPy, Matplotlib, Seaborn for automated data munging.' },
      { name: 'PowerBI / Tableau', category: 'tools', importance: 'critical', description: 'Interactive dashboard creation, DAX measures, visual storytelling.' },
      { name: 'Statistics & Probability', category: 'core', importance: 'high', description: 'Descriptive stats, hypothesis testing, A/B testing, regression analysis.' },
      { name: 'Exploratory Data Analysis', category: 'core', importance: 'high', description: 'Outlier detection, handling missing data, correlation discovery.' },
      { name: 'Business Communication', category: 'soft', importance: 'critical', description: 'Presenting insights clearly to non-technical stakeholders.' },
      { name: 'Real-World Projects', category: 'tools', importance: 'critical', description: 'End-to-end analytical case studies published with interactive dashboards.' }
    ]
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    tagline: 'Build, secure, and automate resilient multi-region infrastructure on AWS, Azure, or GCP',
    category: 'Cloud & DevOps',
    iconName: 'Cloud',
    averageSalaryTier: '₹6 - ₹15 LPA for Freshers',
    description: 'Cloud Engineers deploy scalable cloud architectures, manage containerized microservices, and automate deployment pipelines.',
    topCompanies: ['Amazon Web Services', 'Microsoft', 'Red Hat', 'Cognizant', 'Capgemini', 'Wipro'],
    requiredSkills: [
      { name: 'Linux Fundamentals', category: 'core', importance: 'critical', description: 'CLI mastery, shell scripting, permissions, SSH, systemd services.' },
      { name: 'Computer Networking', category: 'core', importance: 'critical', description: 'VPC, subnets, routing tables, NAT gateways, DNS, load balancers, firewalls.' },
      { name: 'Cloud Platforms (AWS/GCP)', category: 'tools', importance: 'critical', description: 'Compute instances, object storage, managed DBs, IAM security policies.' },
      { name: 'Docker & Containers', category: 'tools', importance: 'critical', description: 'Dockerfiles, multi-stage builds, image optimization, container networking.' },
      { name: 'Kubernetes', category: 'framework', importance: 'high', description: 'Pods, deployments, services, ingress, configuration management.' },
      { name: 'Infrastructure as Code (Terraform)', category: 'tools', importance: 'high', description: 'Declarative resource provisioning, state management, modules.' },
      { name: 'CI/CD Pipelines', category: 'tools', importance: 'high', description: 'GitHub Actions, automated testing, container registry integration.' },
      { name: 'Cloud Security & Compliance', category: 'core', importance: 'high', description: 'Least privilege access, encryption at rest and in transit, secrets management.' },
      { name: 'Real-World Projects', category: 'tools', importance: 'critical', description: 'Production-ready cloud architecture provisioned via code.' }
    ]
  },
  {
    id: 'ai-ml-engineer',
    title: 'AI/ML Engineer',
    tagline: 'Train neural networks, fine-tune foundation models, and deploy production ML systems',
    category: 'Artificial Intelligence',
    iconName: 'Cpu',
    averageSalaryTier: '₹8 - ₹20 LPA for Freshers',
    description: 'AI/ML Engineers create predictive algorithms, develop computer vision or NLP pipelines, and serve high-throughput inference APIs.',
    topCompanies: ['NVIDIA', 'Amazon', 'Google DeepMind', 'Fractal Analytics', 'Microsoft', 'Intel'],
    requiredSkills: [
      { name: 'Python', category: 'core', importance: 'critical', description: 'Advanced Python, vectorized operations, scientific computing.' },
      { name: 'Linear Algebra & Calculus', category: 'core', importance: 'critical', description: 'Matrix operations, eigenvalues, partial derivatives, gradient descent.' },
      { name: 'Probability & Statistics', category: 'core', importance: 'critical', description: 'Bayesian statistics, distributions, maximum likelihood estimation.' },
      { name: 'Machine Learning Algorithms', category: 'core', importance: 'critical', description: 'Random forests, SVMs, gradient boosting (XGBoost), clustering.' },
      { name: 'Deep Learning (PyTorch/TensorFlow)', category: 'framework', importance: 'critical', description: 'CNNs, RNNs/LSTMs, Transformers, backpropagation, loss functions.' },
      { name: 'Model Deployment (MLOps)', category: 'tools', importance: 'high', description: 'Serving models with FastAPI, ONNX, Docker, monitoring model drift.' },
      { name: 'Data Structures & Algorithms', category: 'core', importance: 'high', description: 'Algorithmic efficiency for real-time model preprocessing.' },
      { name: 'Real-World Projects', category: 'tools', importance: 'critical', description: 'Published ML pipeline with live demo, benchmark evaluations, and GitHub repo.' }
    ]
  },
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    tagline: 'Defend systems from modern threats, detect network intrusions, and audit security postures',
    category: 'Security & Defense',
    iconName: 'ShieldCheck',
    averageSalaryTier: '₹6 - ₹14 LPA for Freshers',
    description: 'Cybersecurity Analysts protect networks, conduct vulnerability assessments, monitor SIEM security alerts, and ensure system defense.',
    topCompanies: ['Palo Alto Networks', 'CrowdStrike', 'Cisco', 'Wipro Cyber Security', 'EY', 'IBM'],
    requiredSkills: [
      { name: 'Computer Networking', category: 'core', importance: 'critical', description: 'Packet inspection (Wireshark), TCP/IP handshakes, VPNs, IDS/IPS.' },
      { name: 'Linux Administration', category: 'core', importance: 'critical', description: 'Security hardening, iptables, log auditing, process isolation.' },
      { name: 'Network Security & Firewalls', category: 'core', importance: 'critical', description: 'DMZ architecture, port scanning (Nmap), defense-in-depth.' },
      { name: 'Ethical Hacking & Pen Testing', category: 'framework', importance: 'high', description: 'OWASP Top 10 vulnerabilities, Burp Suite, Metasploit, exploit analysis.' },
      { name: 'SIEM Tools (Splunk / ELK)', category: 'tools', importance: 'critical', description: 'Log ingestion, threat correlation rules, security alert triage.' },
      { name: 'Cryptography Fundamentals', category: 'core', importance: 'high', description: 'Symmetric/asymmetric encryption, hashing (SHA-256), PKI certificates.' },
      { name: 'Python / Bash for Security', category: 'tools', importance: 'high', description: 'Automating security scans, parsing log files, payload testing.' },
      { name: 'Real-World Projects', category: 'tools', importance: 'critical', description: 'Documented security audit reports, TryHackMe/HackTheBox walk-throughs.' }
    ]
  }
];

export const DEFAULT_ROADMAP_STEPS: Record<string, RoadmapStep[]> = {
  'data-engineer': [
    {
      id: 'de-step-1',
      stepNumber: 1,
      title: 'Strengthen Python Fundamentals',
      topic: 'Python',
      description: 'Solidify core Python concepts, object-oriented programming, data structures, generators, and decorators for production code.',
      subtopics: ['OOPs in Python', 'List/Dict Comprehensions', 'Generators & Iterators', 'File Handling & JSON Parsing', 'Testing with PyTest'],
      estimatedDuration: '2 weeks',
      status: 'completed',
      importance: 'high',
      keyProjects: ['Automated CSV & JSON Data Ingestion Script', 'CLI Data Processing Utility']
    },
    {
      id: 'de-step-2',
      stepNumber: 2,
      title: 'Master SQL and Database Systems',
      topic: 'SQL & Databases',
      description: 'Move beyond basic queries to master window functions, complex joins, indexing strategies, execution plans, and query optimization.',
      subtopics: ['Window Functions (ROW_NUMBER, RANK, DENSE_RANK)', 'CTEs & Subqueries', 'Query Profiling & EXPLAIN ANALYZE', 'B-Tree Indexing vs Hash Indexing', 'Transactions & Isolation Levels'],
      estimatedDuration: '3 weeks',
      status: 'in_progress',
      importance: 'critical',
      keyProjects: ['E-commerce Analytical Database Schema', 'Slow Query Optimization Benchmark']
    },
    {
      id: 'de-step-3',
      stepNumber: 3,
      title: 'Improve Data Structures & Algorithms',
      topic: 'DSA',
      description: 'Practice high-frequency interview patterns with focus on arrays, hash tables, trees, heaps, and graph algorithms.',
      subtopics: ['Two-Pointer & Sliding Window', 'Hash Map optimizations', 'Binary Trees & BFS/DFS', 'Graph Traversals', 'Sorting Algorithms Complexity'],
      estimatedDuration: '4 weeks',
      status: 'not_started',
      importance: 'high',
      keyProjects: ['Top 75 LeetCode Pattern Solutions in Python']
    },
    {
      id: 'de-step-4',
      stepNumber: 4,
      title: 'Learn Cloud Computing and AWS',
      topic: 'AWS Cloud',
      description: 'Understand core cloud architecture and hands-on AWS storage, compute, and IAM security primitives.',
      subtopics: ['AWS IAM & Security Best Practices', 'S3 Storage Classes & Lifecycle Rules', 'EC2 & Compute Fundamentals', 'Serverless Functions (AWS Lambda)', 'VPC & Networking Basics'],
      estimatedDuration: '3 weeks',
      status: 'not_started',
      importance: 'critical',
      keyProjects: ['Event-Driven S3 File Processor using AWS Lambda']
    },
    {
      id: 'de-step-5',
      stepNumber: 5,
      title: 'Learn Data Engineering Concepts',
      topic: 'ETL, Data Warehousing & Pipelines',
      description: 'Master dimensional modeling (Kimball methodology), star schemas, data warehousing architectures, and orchestrated ETL pipelines.',
      subtopics: ['Extract, Transform, Load (ETL vs ELT)', 'Star vs Snowflake Schemas', 'Slowly Changing Dimensions (SCD Type 1 & 2)', 'Data Pipeline Orchestration (Apache Airflow)', 'Data Quality & Validation'],
      estimatedDuration: '4 weeks',
      status: 'not_started',
      importance: 'critical',
      keyProjects: ['Automated Daily ETL Pipeline with Apache Airflow & Postgres']
    },
    {
      id: 'de-step-6',
      stepNumber: 6,
      title: 'Learn Apache Spark',
      topic: 'Big Data Processing',
      description: 'Understand distributed computation, PySpark APIs, resilient distributed datasets, and partitioned data lake storage.',
      subtopics: ['Spark Architecture (Driver & Executors)', 'PySpark DataFrames API', 'Shuffling, Partitioning & Skew Handling', 'Spark SQL & Catalyst Optimizer', 'Delta Lake & Parquet format'],
      estimatedDuration: '3 weeks',
      status: 'not_started',
      importance: 'critical',
      keyProjects: ['PySpark Batch Analytics on Multi-Gigabyte Clickstream Dataset']
    },
    {
      id: 'de-step-7',
      stepNumber: 7,
      title: 'Build Real-World Data Projects',
      topic: 'Portfolio Projects',
      description: 'Construct end-to-end cloud data pipelines that ingest live APIs, store in a data lake, transform via Spark, and load into a warehouse.',
      subtopics: ['Real-Time Stream Processing (Kafka + Spark)', 'Data Lakehouse Architecture on AWS', 'Dockerizing Pipeline Services', 'CI/CD for Data Pipelines', 'Creating GitHub Project Documentation'],
      estimatedDuration: '4 weeks',
      status: 'not_started',
      importance: 'critical',
      keyProjects: ['End-to-End Real-Time Crypto/Stock Analytics Pipeline', 'Reddit/Twitter Sentiment Pipeline with Airflow & Redshift']
    },
    {
      id: 'de-step-8',
      stepNumber: 8,
      title: 'Prepare for Placement Interviews',
      topic: 'Placement Preparation',
      description: 'Mock interviews, resume tailoring for Tier 1 product companies, data engineering system design, and behavioral questions.',
      subtopics: ['Data Modeling Interview Scenarios', 'SQL Live Coding Round Simulation', 'System Design: Design a Metric Pipeline', 'Amazon Leadership Principles & Behavioral STAR method', 'Resume Review & Project Pitch'],
      estimatedDuration: '2 weeks',
      status: 'not_started',
      importance: 'high',
      keyProjects: ['Targeted Amazon SDE-DE Resume & 50 Problem SQL Workbook']
    }
  ],
  'software-engineer': [
    {
      id: 'se-step-1',
      stepNumber: 1,
      title: 'Master Core Language & OOP Fundamentals',
      topic: 'Programming Fundamentals',
      description: 'Deep dive into object-oriented principles, memory models, clean code conventions, and modern language features.',
      subtopics: ['OOP Pillars & SOLID Principles', 'Memory Allocation (Stack vs Heap)', 'Design Patterns (Factory, Singleton, Observer)', 'Exception Handling & Unit Testing'],
      estimatedDuration: '3 weeks',
      status: 'completed',
      importance: 'critical',
      keyProjects: ['Modular Parking Lot or Elevator System in Java/Python']
    },
    {
      id: 'se-step-2',
      stepNumber: 2,
      title: 'Intensive Data Structures & Algorithms',
      topic: 'DSA & Problem Solving',
      description: 'Master core algorithmic problem-solving patterns needed for online assessments and technical rounds.',
      subtopics: ['Arrays, Strings & Pointers', 'Trees & Graph Traversal (DFS/BFS)', 'Dynamic Programming & Memoization', 'Greedy Algorithms & Heaps', 'Time & Space Complexity Proofs'],
      estimatedDuration: '6 weeks',
      status: 'in_progress',
      importance: 'critical',
      keyProjects: ['Curated 150 LeetCode Problem Solutions with Pattern Guides']
    },
    {
      id: 'se-step-3',
      stepNumber: 3,
      title: 'Master Database Systems & SQL',
      topic: 'Database Engineering',
      description: 'Relational design, normalization, ACID transactions, and index tuning.',
      subtopics: ['Schema Design & 3NF Normalization', 'Complex SQL & Indexing', 'NoSQL when and why (Redis/MongoDB)', 'Connection Pooling & ORM caveats'],
      estimatedDuration: '3 weeks',
      status: 'not_started',
      importance: 'high',
      keyProjects: ['High-Concurrency Inventory Reservation Database']
    },
    {
      id: 'se-step-4',
      stepNumber: 4,
      title: 'Computer Science Core Subjects',
      topic: 'CS Fundamentals',
      description: 'Revise Operating Systems, Computer Networks, and DBMS for technical interview rounds.',
      subtopics: ['OS: Multithreading, Deadlocks, Virtual Memory', 'Networks: TCP vs UDP, HTTP/2, DNS, WebSockets', 'System Calls & Linux CLI'],
      estimatedDuration: '3 weeks',
      status: 'not_started',
      importance: 'high',
      keyProjects: ['Custom Multi-Threaded Web Server in C/Java']
    },
    {
      id: 'se-step-5',
      stepNumber: 5,
      title: 'Build Full-Stack / Backend Microservices',
      topic: 'Web Development & APIs',
      description: 'Develop production-ready RESTful APIs with authentication, caching, rate limiting, and database persistence.',
      subtopics: ['RESTful Architecture Standards', 'JWT Authentication & RBAC', 'Caching with Redis', 'Message Queues (RabbitMQ/Kafka)', 'Dockerizing Services'],
      estimatedDuration: '4 weeks',
      status: 'not_started',
      importance: 'critical',
      keyProjects: ['Scalable URL Shortener with Analytics & Rate Limiting']
    },
    {
      id: 'se-step-6',
      stepNumber: 6,
      title: 'System Design Fundamentals',
      topic: 'High-Level & Low-Level Design',
      description: 'Learn how to scale web applications to millions of users with load balancers, caching, and database replication.',
      subtopics: ['Load Balancing & Horizontal Scaling', 'Database Sharding & Replication', 'CAP Theorem & Consistency Models', 'Designing TinyURL, WhatsApp, or Uber'],
      estimatedDuration: '3 weeks',
      status: 'not_started',
      importance: 'high',
      keyProjects: ['Interactive System Architecture Diagram & Technical Design Doc']
    },
    {
      id: 'se-step-7',
      stepNumber: 7,
      title: 'Placement Technical & HR Interview Prep',
      topic: 'Interview Readiness',
      description: 'Behavioral preparation, mock technical interviews, resume optimization with STAR methodology, and company test practice.',
      subtopics: ['STAR Behavioral Framework', 'Mock Coding Assessments (TCS, Infosys, Amazon)', 'Resume Keyword Optimization', 'HR Questions & Salary Discussions'],
      estimatedDuration: '2 weeks',
      status: 'not_started',
      importance: 'high',
      keyProjects: ['ATS-Compliant Resume & Interview Question Bank']
    }
  ]
};
