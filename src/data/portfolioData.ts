import { Project, SkillCategory, ExperienceItem, Testimonial } from '../types';
import yashAvatar from '../assets/images/yash_avatar.jpg';

export const YASH_BIO = {
  name: 'Yash Sahu',
  title: 'Full-Stack Software Engineer & CS Student',
  location: 'VIT Bhopal University / India',
  email: 'yashsahu0212@gmail.com',
  github: 'https://github.com/yashsahu0212',
  linkedin: 'https://linkedin.com/in/yashsahu0212',
  twitter: 'https://twitter.com/yashsahu0212',
  resumeUrl: '/resume.pdf',
  avatar: yashAvatar,
  tagline: 'Building responsive web applications, real-time architectures, and scalable database systems.',
  summary: `I am a Computer Science Engineering student and full-stack developer at VIT Bhopal University. I specialize in HTML, CSS, JavaScript, SQL, PostgreSQL, Supabase, real-time WebSockets, and sleek neo-brutalist UI design.`,
  yearsExperience: 'Student Dev',
  projectsCompleted: '10+',
  commitsThisYear: '350+',
  coffeeCups: '500+'
};

export const PROJECTS_DATA: Project[] = [
  {
    id: 'feedbox-ai',
    title: 'feedBox AI',
    tagline: 'Autonomous AI campus maintenance & operations platform with real-time routing.',
    description: 'A full-stack campus issue reporting, feedback classification, and automated department routing platform. Features few-shot LLM reasoning to classify intent, extract locations, determine urgency, and route across 9 campus departments. Built with Supabase PostgreSQL, Row-Level Security (RLS), and n8n webhook workflow automation.',
    category: 'Full Stack',
    tags: ['Supabase', 'PostgreSQL', 'JavaScript', 'HTML', 'CSS', 'React 19', 'n8n', 'AI Agent'],
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    demoUrl: 'https://feed-box-ai.vercel.app/',
    githubUrl: 'https://github.com/yashsahu0212/FeedBox-AI',
    featured: true,
    highlights: [
      'Live deployed production portal connecting campus students with facility administrators.',
      'Few-shot AI classification engine routing tickets across 9 departments with anti-hallucination guards.',
      'Supabase PostgreSQL database with Row-Level Security and full audit history logs.'
    ],
    year: '2026',
    role: 'Lead Developer',
    architectureNodes: [
      { step: '01', name: 'Student & Admin Portals', type: 'client', desc: 'React 19 + Tailwind interface for submitting issues and department desk queues.', status: 'ACTIVE' },
      { step: '02', name: 'AI Classification Engine', type: 'service', desc: 'Analyzes reports, extracts physical locations, and computes urgency levels.', status: 'ROUTED' },
      { step: '03', name: 'n8n Automation Engine', type: 'gateway', desc: 'Dispatches department webhook notifications and orchestrates escalations.', status: 'ORCHESTRATED' },
      { step: '04', name: 'Supabase PostgreSQL & RLS', type: 'database', desc: 'Enforces role-based access, audit timelines, and secure ticket persistence.', status: 'SECURE' }
    ]
  },
  {
    id: 'ipl-auction-engine',
    title: 'IPL Mega Auction Engine',
    tagline: 'High-concurrency live cricket bidding simulator with WebSockets & procedural audio.',
    description: 'A real-time auction platform featuring live WebSocket room synchronization, multi-franchise bidding consoles with purse limits, auctioneer hammer desk with timer overrides, 3D flip card player dossiers, Supabase PostgreSQL concurrency locks, and procedural Web Audio sound synthesis.',
    category: 'Full Stack',
    tags: ['JavaScript', 'HTML', 'CSS', 'Supabase', 'PostgreSQL', 'Socket.IO', 'Node.js', 'Web Audio API'],
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
    demoUrl: 'https://github.com/yashsahu0212/Yash-Sahu_25BCE10051_IPL_Auction',
    githubUrl: 'https://github.com/yashsahu0212/Yash-Sahu_25BCE10051_IPL_Auction',
    featured: true,
    highlights: [
      'Real-time WebSocket room synchronization across all 10 IPL franchises.',
      'Supabase PostgreSQL concurrency control with FOR UPDATE locking and immutable audit ledger.',
      'Procedural Web Audio API sound synthesis with zero external audio assets.'
    ],
    year: '2026',
    role: 'Full-Stack Developer',
    architectureNodes: [
      { step: '01', name: 'Franchise Bidding Console', type: 'client', desc: 'Interactive console with real-time purse calculation and 3D player dossiers.', status: 'ACTIVE' },
      { step: '02', name: 'Auctioneer Control Desk', type: 'service', desc: 'Master hammer controls, timer overrides, and captain retention guards.', status: 'AUTHORITY' },
      { step: '03', name: 'WebSocket & Web Audio Hub', type: 'gateway', desc: 'Broadcasts sub-second bids and synthesizes authentic gavel strikes.', status: 'SYNCED' },
      { step: '04', name: 'Supabase Concurrency Ledger', type: 'database', desc: 'Persists bids with row-level locks and exports UTF-8 BOM CSV logs.', status: 'COMMITTED' }
    ]
  },
  {
    id: 'stock-flow',
    title: 'Stock Flow',
    tagline: 'High-throughput warehouse inventory management & order-picking workflow platform.',
    description: 'An enterprise warehouse inventory management system supporting multi-tier RBAC (Admin, Manager, Picker, Auditor), real-time barcode scan telemetry, automated stock movements, smart picking optimization, and PostgreSQL relational data persistence via Prisma ORM.',
    category: 'Systems & Backend',
    tags: ['SQL', 'PostgreSQL', 'JavaScript', 'HTML', 'CSS', 'Prisma ORM', 'Node.js', 'Express'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    demoUrl: 'https://github.com/yashsahu0212/Stock-Flow',
    githubUrl: 'https://github.com/yashsahu0212/Stock-Flow',
    featured: true,
    highlights: [
      'Multi-role access control protecting order processing, stock audits, and scanner dispatch.',
      'Real-time physical stock movement logs with barcode scan event telemetry.',
      'Strict relational schema design powered by PostgreSQL and Prisma ORM.'
    ],
    year: '2026',
    role: 'Backend & Database Dev',
    architectureNodes: [
      { step: '01', name: 'Warehouse Operations UI', type: 'client', desc: 'Portal for order tracking, inventory counts, and picking lists.', status: 'ACTIVE' },
      { step: '02', name: 'Scan & Telemetry Ingestion', type: 'gateway', desc: 'Ingests barcode events and tracks real-time inventory adjustments.', status: 'STREAMING' },
      { step: '03', name: 'Fulfillment & Audit Engine', type: 'service', desc: 'Validates stock thresholds, allocates picking tasks, and enforces RBAC.', status: 'OPTIMIZED' },
      { step: '04', name: 'PostgreSQL Relational DB', type: 'database', desc: 'Maintains normalized schema for items, stock movements, and audit trails.', status: 'PERSISTED' }
    ]
  },
  {
    id: 'resilience-analyzer',
    title: 'Resilience Analyzer',
    tagline: 'Real-time password security assessment & brute-force resilience analyzer.',
    description: 'A client-side security assessment engine built for Hackathon Cyber Carnival 2026. Evaluates password strength in real time, calculates brute-force crack times, provides context-aware guidance, and performs secure breach detection using k-anonymity with the HaveIBeenPwned API (v3).',
    category: 'Full Stack',
    tags: ['JavaScript', 'HTML', 'CSS', 'zxcvbn', 'crypto-js', 'HaveIBeenPwned API', 'Cybersecurity'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    demoUrl: 'https://github.com/yashsahu0212/Resilience-Analyzer',
    githubUrl: 'https://github.com/yashsahu0212/Resilience-Analyzer',
    featured: true,
    highlights: [
      'Built for Cyber Carnival Hackathon by InfoSec Innovators team.',
      'Real-time entropy & character variety calculation with zxcvbn.',
      'Privacy-first client-side SHA-1 hashing with k-anonymity breach checking.'
    ],
    year: '2026',
    role: 'Core Developer',
    architectureNodes: [
      { step: '01', name: 'Real-Time Input Analyzer', type: 'client', desc: 'Monitors keystrokes and computes instantaneous password entropy.', status: 'ACTIVE' },
      { step: '02', name: 'zxcvbn Strength Engine', type: 'service', desc: 'Calculates brute-force cracking time and dictionary vulnerability.', status: 'CALCULATED' },
      { step: '03', name: 'k-Anonymity Hashing', type: 'service', desc: 'Generates SHA-1 hash and dispatches first 5 characters for privacy lookup.', status: 'SECURE' },
      { step: '04', name: 'Educational Feedback UI', type: 'database', desc: 'Renders dynamic visual resilience meter and educational tips.', status: 'RENDERED' }
    ]
  },
  {
    id: 'yatra-mobility',
    title: 'YATRA — Mobility Intelligence',
    tagline: 'Sensor-fusion urban mobility tracking & multimodal journey classification.',
    description: 'Smart India Hackathon (SIH 2026) urban mobility research platform using background sensor fusion (GPS, accelerometer, gyroscope, barometer) to automatically classify transit modes (walk, bus, train, metro), compute door-to-door journey chains, and track carbon emissions with offline Room database persistence.',
    category: 'Systems & Backend',
    tags: ['SQL', 'Android', 'Kotlin', 'Sensor Fusion', 'Room DB', 'Jetpack Compose'],
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    demoUrl: 'https://github.com/yashsahu0212/Yatra',
    githubUrl: 'https://github.com/yashsahu0212/Yatra',
    featured: false,
    highlights: [
      'Developed for Smart India Hackathon 2026 to capture urban transit data.',
      'Continuous background sensor fusion classifying transit mode with confidence scoring.',
      'Offline-first encrypted local database sync engine with strict privacy-preserving telemetry.'
    ],
    year: '2026',
    role: 'Core Developer (SIH 2026)',
    architectureNodes: [
      { step: '01', name: 'Sensor Telemetry Acquisition', type: 'client', desc: 'Streams GPS, accelerometer, gyroscope, and barometer data.', status: 'CAPTURING' },
      { step: '02', name: 'Sensor-Fusion Mode Classifier', type: 'service', desc: 'Classifies transit mode across walk, bus, train, metro with confidence scoring.', status: 'CLASSIFIED' },
      { step: '03', name: 'Multimodal Journey Chain Builder', type: 'gateway', desc: 'Stitches individual legs into unified door-to-door journey logs.', status: 'CHAINED' },
      { step: '04', name: 'Room Database & Sync Engine', type: 'database', desc: 'Offline-first encrypted SQLite/Room cache syncing to research backend.', status: 'SYNCED' }
    ]
  },
  {
    id: 'hotel-management-system',
    title: 'Hotel Management System',
    tagline: 'Structured hotel management & automated bill calculation platform.',
    description: 'A structured management system providing room reservation management, guest record tracking, check-in/check-out workflow processing, and automated itemized billing computations.',
    category: 'Systems & Backend',
    tags: ['SQL', 'Data Structures', 'File Handling', 'Algorithms', 'CLI'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    demoUrl: 'https://github.com/yashsahu0212/Hotel-Management-System-Python',
    githubUrl: 'https://github.com/yashsahu0212/Hotel-Management-System-Python',
    featured: false,
    highlights: [
      'Automated itemized bill calculation engine handling multi-service billing.',
      'Data persistence storing customer records and room availability.',
      'Interactive console menu system with input validation safeguards.'
    ],
    year: '2025',
    role: 'Creator & Developer',
    architectureNodes: [
      { step: '01', name: 'Interactive CLI Interface', type: 'client', desc: 'Menu interface with robust input sanitization & validation.', status: 'ACTIVE' },
      { step: '02', name: 'Booking Engine', type: 'service', desc: 'Handles room allocation, check-ins, and occupancy status.', status: 'OK' },
      { step: '03', name: 'Billing Calculator', type: 'service', desc: 'Computes room charges, food service, and taxes accurately.', status: 'VERIFIED' },
      { step: '04', name: 'File Storage Handler', type: 'database', desc: 'Persists records and invoices to structured local storage.', status: 'PERSISTED' }
    ]
  },
  {
    id: 'temperature-predictor',
    title: 'Temperature Predictor',
    tagline: 'Data-driven machine learning model for temperature forecasting.',
    description: 'A predictive modeling system utilizing historical atmospheric and climate datasets to analyze patterns, calculate trends, and predict temperature variations.',
    category: 'Systems & Backend',
    tags: ['Machine Learning', 'Data Analysis', 'NumPy', 'Pandas', 'Algorithms'],
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=800&q=80',
    demoUrl: 'https://github.com/yashsahu0212/Temprature-predictor',
    githubUrl: 'https://github.com/yashsahu0212/Temprature-predictor',
    featured: false,
    highlights: [
      'Regression modeling forecasting temperature variations from historical records.',
      'Data preprocessing pipeline cleaning time-series climate metrics.',
      'Calculates variance and predictive accuracy.'
    ],
    year: '2025',
    role: 'ML Developer',
    architectureNodes: [
      { step: '01', name: 'Data Pipeline', type: 'client', desc: 'Preprocesses raw climate datasets.', status: 'CLEANED' },
      { step: '02', name: 'Feature Extraction', type: 'gateway', desc: 'Extracts seasonal indicators and temperature fluctuations.', status: 'OPTIMIZED' },
      { step: '03', name: 'Predictive Model', type: 'service', desc: 'Regression algorithm estimating future thermal values.', status: 'TRAINED' },
      { step: '04', name: 'Output Evaluator', type: 'database', desc: 'Computes mean squared error and forecasts.', status: 'EVALUATED' }
    ]
  },
  {
    id: 'newtons-law-of-cooling',
    title: "Newton's Law of Cooling Simulator",
    tagline: 'Computational physics simulation modeling thermal dissipation over time.',
    description: 'A mathematical modeling application applying differential equations to calculate and visualize heat transfer and temperature decay relative to ambient surroundings.',
    category: 'Systems & Backend',
    tags: ['Differential Equations', 'Physics Simulation', 'Calculus', 'Algorithms'],
    image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80',
    demoUrl: 'https://github.com/yashsahu0212/newtons-law-of-cooling',
    githubUrl: 'https://github.com/yashsahu0212/newtons-law-of-cooling',
    featured: false,
    highlights: [
      'Calculates exact heat dissipation rate proportional to temperature gradient.',
      'Interactive parameter input for initial temperature and cooling constant k.',
      'Plots thermal decay curves transitioning to ambient equilibrium.'
    ],
    year: '2025',
    role: 'Developer',
    architectureNodes: [
      { step: '01', name: 'Parameter Setup', type: 'client', desc: 'Accepts initial body temp, ambient temp, and cooling constant.', status: 'VALIDATED' },
      { step: '02', name: 'Differential Solver', type: 'service', desc: 'Applies dT/dt = -k(T - T_env) equation solver.', status: 'SOLVED' },
      { step: '03', name: 'Time-Series Engine', type: 'service', desc: 'Generates step-by-step decay values.', status: 'COMPUTED' },
      { step: '04', name: 'Visual Plotter', type: 'database', desc: 'Renders temperature curve against time.', status: 'PLOTTED' }
    ]
  },
  {
    id: 'fabric-calculator',
    title: 'Fabric Calculator',
    tagline: 'Precision measurement and material optimization tool.',
    description: 'A frontend web utility for calculating fabric dimensions, material requirements, and cutting layouts with minimal waste.',
    category: 'Frontend',
    tags: ['JavaScript', 'HTML', 'CSS', 'Geometry Math', 'UI/UX'],
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
    demoUrl: 'https://github.com/yashsahu0212/Fabric-Calculator',
    githubUrl: 'https://github.com/yashsahu0212/Fabric-Calculator',
    featured: false,
    highlights: [
      'Accurate dimensional and seam allowance calculations.',
      'Instant interactive calculation as measurements change.',
      'Responsive design with clear visual breakdown.'
    ],
    year: '2025',
    role: 'Frontend Developer',
    architectureNodes: [
      { step: '01', name: 'Dimension Input', type: 'client', desc: 'Captures unit measurements and seam allowances.', status: 'VALIDATED' },
      { step: '02', name: 'Optimization Math', type: 'service', desc: 'Calculates area requirements and minimal yardage.', status: 'CALCULATED' },
      { step: '03', name: 'Result Renderer', type: 'database', desc: 'Displays breakdown and material estimate.', status: 'RENDERED' }
    ]
  },
  {
    id: 'digital-literacy-project',
    title: 'Digital Literacy Project',
    tagline: 'Accessible educational web portal for essential technology skills.',
    description: 'A lightweight, accessible web portal designed to promote digital literacy through clean, straightforward educational modules and tutorials.',
    category: 'Frontend',
    tags: ['HTML', 'CSS', 'JavaScript', 'Accessibility', 'Responsive Web'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    demoUrl: 'https://github.com/yashsahu0212/Digital-literacy-project',
    githubUrl: 'https://github.com/yashsahu0212/Digital-literacy-project',
    featured: false,
    highlights: [
      'Lightweight vanilla web architecture with zero external dependencies.',
      'Accessible high-contrast UI suitable for all device sizes.',
      'Structured learning modules on digital safety and web basics.'
    ],
    year: '2025',
    role: 'Developer',
    architectureNodes: [
      { step: '01', name: 'Accessible UI', type: 'client', desc: 'Semantic HTML structure with responsive CSS.', status: 'ACCESSIBLE' },
      { step: '02', name: 'Tutorial Engine', type: 'service', desc: 'Step-by-step interactive lesson guides.', status: 'ACTIVE' },
      { step: '03', name: 'Local State', type: 'database', desc: 'Stores learning progress in browser storage.', status: 'PERSISTED' }
    ]
  }
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    title: 'Frontend',
    iconName: 'Layout',
    skills: [
      {
        name: 'HTML',
        level: 95,
        experience: 'Proficient',
        icon: 'Layout',
        description: 'Semantic HTML5 markup, document structure, accessibility standards (a11y/WCAG), SEO metadata, and modern DOM elements.'
      },
      {
        name: 'CSS',
        level: 94,
        experience: 'Proficient',
        icon: 'Palette',
        description: 'Modern CSS3, responsive Grid & Flexbox layouts, custom variables, keyframe animations, neo-brutalist styling, and media queries.'
      },
      {
        name: 'JavaScript',
        level: 92,
        experience: 'Proficient',
        icon: 'Code',
        description: 'Modern ES6+ syntax, asynchronous programming (Promises, async/await), DOM events, Web APIs, and client-side application logic.'
      }
    ]
  },
  {
    title: 'Databases & Backend',
    iconName: 'Database',
    skills: [
      {
        name: 'SQL',
        level: 90,
        experience: 'Proficient',
        icon: 'Database',
        description: 'Relational database querying, complex JOINs, subqueries, grouping, aggregations, schema design, data normalization, and indexing.'
      },
      {
        name: 'PostgreSQL',
        level: 88,
        experience: 'Active',
        icon: 'Server',
        description: 'Advanced relational database management, Row-Level Security (RLS) policies, concurrency control (FOR UPDATE), triggers, and data integrity.'
      },
      {
        name: 'Supabase',
        level: 90,
        experience: 'Active',
        icon: 'Zap',
        description: 'BaaS integration, real-time database subscriptions, PostgreSQL hosting, Row-Level Security auth guards, and Edge Functions.'
      }
    ]
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'exp-vit-bhopal',
    period: '2025 — PRESENT',
    role: 'B.Tech in Computer Science & Engineering',
    company: 'VIT Bhopal University',
    location: 'Bhopal, India',
    type: 'College / Undergrad',
    description: [
      'Pursuing Bachelor of Technology in Computer Science & Engineering focusing on Software Systems, Web Architectures, and Database Engineering.',
      'Developed feedBox AI campus operations platform, IPL Real-Time Auction Engine, and Stock Flow warehouse system.',
      'Built Resilience Analyzer with team InfoSec Innovators for Hackathon Cyber Carnival 2026.'
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'SQL', 'PostgreSQL', 'Supabase', 'Git'],
    metrics: 'Cyber Carnival 2026 & SIH 2026'
  },
  {
    id: 'exp-vardhman-indore',
    period: '2 YRS (11TH & 12TH)',
    role: 'Higher Secondary Education (Class 11th - 12th)',
    company: 'Vardhman International School',
    location: 'Indore, India',
    type: 'High School',
    description: [
      'Completed 2 years of higher secondary schooling focused on Science and Mathematics (PCM).',
      'Developed early foundational interests in computer science, logic building, and programming.'
    ],
    technologies: ['Computer Science', 'Mathematics', 'Physics', 'Problem Solving'],
    metrics: 'Class 11th & 12th PCM'
  },
  {
    id: 'exp-trinity-vidisha',
    period: '10 YEARS',
    role: 'Primary & Secondary Schooling',
    company: 'Trinity Convent Higher Secondary School',
    location: 'Vidisha, India',
    type: 'Schooling',
    description: [
      'Completed 10 years of foundational primary and secondary education.',
      'Active participant in academics, school science exhibitions, and computer competitions.'
    ],
    technologies: ['Foundations', 'Science', 'Mathematics', 'Academics'],
    metrics: '10 Years of Education'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-harsh',
    quote: 'Working with Yash on projects like Resilience Analyzer for Cyber Carnival 2026 was awesome. His grasp on JavaScript, data models, and clean frontend UI helped our team deliver a really solid project.',
    author: 'Harsh Jain',
    role: 'CSE Student & Teammate',
    company: 'VIT Bhopal',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'test-vardaan',
    quote: 'Yash is always building real-world projects like feedBox AI and IPL Auction with PostgreSQL and Supabase. He is super consistent, helpful, and passionate about full-stack engineering.',
    author: 'Vardaan Saxena',
    role: 'CSE Student & Peer',
    company: 'VIT Bhopal',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  }
];
