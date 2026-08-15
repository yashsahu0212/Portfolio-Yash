import { Project, SkillCategory, ExperienceItem, Testimonial } from '../types';
import yashAvatar from '../assets/images/yash_sahu_studio_photo_1786628348885.jpg';

export const YASH_BIO = {
  name: 'Yash Sahu',
  title: 'Senior Full-Stack Engineer & UI Architect',
  location: 'VIT Bhopal / Remote',
  email: 'yashsahu0212@gmail.com',
  github: 'https://github.com/yashsahu0212',
  linkedin: 'https://linkedin.com/in/yashsahu0212',
  twitter: 'https://twitter.com/yashsahu0212',
  avatar: yashAvatar,
  tagline: 'Crafting pixel-perfect web experiences, robust backend systems, and open-source software.',
  summary: `I am a passionate Full-Stack Engineer and problem solver specializing in modern Web Architecture, React & TypeScript systems, Python backend services, system resilience analysis, and bold Neo-Brutalist interfaces with zero visual fluff.`,
  yearsExperience: '3+ Years',
  projectsCompleted: '15+',
  commitsThisYear: '850+',
  coffeeCups: '950+'
};

export const PROJECTS_DATA: Project[] = [
  {
    id: 'resilience-analyzer',
    title: 'Resilience Analyzer',
    tagline: 'System & code resilience analysis platform evaluating stability and fault-tolerance.',
    description: 'An advanced code and system resilience diagnostic engine built with JavaScript. Analyzes software architectures, error recovery routines, and system stress points to provide actionable stability metrics.',
    category: 'Full Stack',
    tags: ['JavaScript', 'Node.js', 'System Architecture', 'Code Analysis', 'Express'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    demoUrl: 'https://github.com/yashsahu0212/Resilience-Analyzer',
    githubUrl: 'https://github.com/yashsahu0212/Resilience-Analyzer',
    featured: true,
    highlights: [
      'Architected diagnostic engine evaluating software fault tolerance & runtime error recovery.',
      'Real-time metrics visualization with structural resilience scoring.',
      'Extensible module parser for JavaScript and Web architectures.'
    ],
    year: '2025',
    role: 'Creator & Lead Developer',
    architectureNodes: [
      { step: '01', name: 'JS AST Parser', type: 'client', desc: 'Parses JavaScript AST to identify code structure & fault-intolerant blocks.', status: 'SUB-20ms' },
      { step: '02', name: 'Fault Ingestion Engine', type: 'gateway', desc: 'Simulates synthetic runtime exceptions & async unhandled rejections.', status: 'STRESS TEST PASS' },
      { step: '03', name: 'Resilience Analyzer Core', type: 'service', desc: 'Calculates structural resilience score based on error handlers & try/catch coverage.', status: '99.4% ACCURACY' },
      { step: '04', name: 'Metrics & Report Generator', type: 'database', desc: 'Outputs visual stability metrics & architectural refactoring recommendations.', status: 'PERSISTED' }
    ]
  },
  {
    id: 'hotel-management-system',
    title: 'Hotel Management System',
    tagline: 'Feature-packed hotel management & automated billing console platform in Python.',
    description: 'A comprehensive management engine providing room reservation booking, customer record management, check-in/check-out workflow handling, and automated itemized billing calculations.',
    category: 'AI / Systems',
    tags: ['Python', 'CLI', 'Data Structures', 'Billing Engine', 'Algorithms'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    demoUrl: 'https://github.com/yashsahu0212/Hotel-Management-System-Python',
    githubUrl: 'https://github.com/yashsahu0212/Hotel-Management-System-Python',
    featured: true,
    highlights: [
      'Automated itemized bill calculation engine handling multi-service billing.',
      'Robust file-based data persistence storing customer histories and room status.',
      'Clean interactive console menu system with input validation safeguards.'
    ],
    year: '2025',
    role: 'Sole Developer',
    architectureNodes: [
      { step: '01', name: 'Interactive CLI Menu', type: 'client', desc: 'User-facing menu interface with robust input sanitization & validation.', status: 'ACTIVE' },
      { step: '02', name: 'Reservation Workflow Engine', type: 'service', desc: 'Handles check-in, check-out, room allocation, and occupancy tracking.', status: '0 CONFLICTS' },
      { step: '03', name: 'Automated Billing Calculator', type: 'service', desc: 'Computes itemized room charges, room service fees, & taxes dynamically.', status: 'PRECISION OK' },
      { step: '04', name: 'File Data Persistence', type: 'database', desc: 'Stores customer records, transaction histories, and room status persistently.', status: 'PERSISTED' }
    ]
  },
  {
    id: 'temperature-predictor',
    title: 'Temperature Predictor',
    tagline: 'Machine learning thermal & weather forecasting predictive model.',
    description: 'A data-driven temperature prediction platform built in Python using predictive analytics algorithms to model weather trends, atmospheric changes, and seasonal thermal shifts.',
    category: 'AI / Systems',
    tags: ['Python', 'Machine Learning', 'Data Science', 'Pandas', 'NumPy'],
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=800&q=80',
    demoUrl: 'https://github.com/yashsahu0212/Temprature-predictor',
    githubUrl: 'https://github.com/yashsahu0212/Temprature-predictor',
    featured: true,
    highlights: [
      'Trained regression models forecasting temperature fluctuations from historical data.',
      'Data preprocessing pipeline cleaning time-series weather metrics.',
      'Visual trend plotting and error margin evaluation.'
    ],
    year: '2025',
    role: 'ML Developer',
    architectureNodes: [
      { step: '01', name: 'Data Ingestion Pipeline', type: 'client', desc: 'Preprocesses raw historical weather & temperature dataset using Pandas & NumPy.', status: 'CLEANED' },
      { step: '02', name: 'Feature Engineering', type: 'gateway', desc: 'Extracts seasonal indicators, rolling averages, and humidity trends.', status: 'OPTIMIZED' },
      { step: '03', name: 'Regression ML Model', type: 'ai', desc: 'Trained predictive analytics model estimating temperature shifts.', status: 'R² SCORE 0.92' },
      { step: '04', name: 'Matplotlib Visualizer', type: 'service', desc: 'Plots forecasted cooling curves vs actual historical readings.', status: 'RENDERED' }
    ]
  },
  {
    id: 'newtons-law-of-cooling',
    title: "Newton's Law of Cooling Simulator",
    tagline: 'Computational physics simulation modeling thermal dissipation & heat transfer.',
    description: 'A mathematical modeling software applying differential equations to simulate how liquid and body temperatures decay over time according to ambient room conditions.',
    category: 'AI / Systems',
    tags: ['Python', 'Physics Simulation', 'Matplotlib', 'Calculus', 'SciPy'],
    image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80',
    demoUrl: 'https://github.com/yashsahu0212/newtons-law-of-cooling',
    githubUrl: 'https://github.com/yashsahu0212/newtons-law-of-cooling',
    featured: false,
    highlights: [
      'Calculates exact rate of heat loss proportional to temperature differences.',
      'Interactive parameter inputs adjusting ambient cooling constants.',
      'Plotted cooling curves showing exponential temperature decay over time.'
    ],
    year: '2025',
    role: 'Developer',
    architectureNodes: [
      { step: '01', name: 'Parameter Input UI', type: 'client', desc: 'Accepts initial body temperature, ambient room temp, and cooling constant k.', status: 'VALIDATED' },
      { step: '02', name: 'DEQ Solver Engine', type: 'service', desc: 'Applies Newton\'s Law dT/dt = -k(T - T_env) differential equation solver.', status: 'SUB-5ms' },
      { step: '03', name: 'SciPy Integrator', type: 'service', desc: 'Computes exact decay curve values over specified time intervals.', status: 'SOLVED' },
      { step: '04', name: 'Exponential Plotter', type: 'database', desc: 'Renders dynamic cooling curves displaying thermal equilibrium.', status: 'PLOTTED' }
    ]
  },
  {
    id: 'digital-literacy-project',
    title: 'Digital Literacy Portal',
    tagline: 'Interactive digital education web application promoting technology accessibility.',
    description: 'An educational web portal designed to improve digital literacy, featuring interactive tutorials, safety guides, and accessibility tools for technology learners.',
    category: 'Frontend',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Web Accessibility', 'UI Design'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    demoUrl: 'https://github.com/yashsahu0212/Digital-literacy-project',
    githubUrl: 'https://github.com/yashsahu0212/Digital-literacy-project',
    featured: false,
    highlights: [
      'Accessible responsive UI adhering to WCAG guidelines.',
      'Interactive tutorial modules introducing essential internet skills.',
      'Clean zero-dependency Vanilla Web implementation.'
    ],
    year: '2025',
    role: 'Frontend Engineer',
    architectureNodes: [
      { step: '01', name: 'Accessible HTML5 UI', type: 'client', desc: 'High-contrast responsive Web UI adhering to WCAG 2.1 accessibility standards.', status: 'WCAG AAA' },
      { step: '02', name: 'Interactive Tutorial Engine', type: 'service', desc: 'Step-by-step interactive digital literacy lessons & safety simulations.', status: 'ACTIVE' },
      { step: '03', name: 'Local Progress Storage', type: 'database', desc: 'Saves user lesson progress & quiz scores in browser localStorage.', status: 'PERSISTED' }
    ]
  }
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    title: 'Frontend & UI Engineering',
    iconName: 'Layout',
    skills: [
      { name: 'React 18/19', level: 95, experience: '4 yrs', icon: 'Code', description: 'Advanced state patterns, Server Components, Hooks, Context, Optimization.' },
      { name: 'TypeScript', level: 92, experience: '4 yrs', icon: 'FileCode', description: 'Strict type safety, Generics, Utility Types, AST transformations.' },
      { name: 'Tailwind CSS & Neo-Brutalism', level: 98, experience: '4 yrs', icon: 'Palette', description: 'Design tokens, layout math, high-contrast themes, responsive design.' },
      { name: 'Motion / Framer Motion', level: 90, experience: '3 yrs', icon: 'Sparkles', description: 'Layout transitions, spring physics, keyframe sequences, gesture controls.' },
      { name: 'Next.js & Vite', level: 88, experience: '3 yrs', icon: 'Zap', description: 'App Router, SSR, SSG, HMR optimization, build pipelines.' }
    ]
  },
  {
    title: 'Backend & Microservices',
    iconName: 'Server',
    skills: [
      { name: 'Node.js & Express', level: 92, experience: '4 yrs', icon: 'Server', description: 'REST APIs, Middleware pipelines, Async error handling, Express v4/v5.' },
      { name: 'Go (Golang)', level: 80, experience: '2 yrs', icon: 'Terminal', description: 'Goroutines, concurrent workers, microservice HTTP routes.' },
      { name: 'Python & FastAPI', level: 85, experience: '3 yrs', icon: 'Cpu', description: 'AI agent pipelines, data manipulation, asynchronous handlers.' },
      { name: 'GraphQL & WebSockets', level: 86, experience: '3 yrs', icon: 'Activity', description: 'Real-time subscription streams, schema stitching, low-latency polling.' }
    ]
  },
  {
    title: 'Databases & Infrastructure',
    iconName: 'Database',
    skills: [
      { name: 'PostgreSQL & SQL', level: 88, experience: '4 yrs', icon: 'Database', description: 'Complex joins, indexing, query optimization, migrations, Drizzle/Prisma.' },
      { name: 'Redis', level: 85, experience: '3 yrs', icon: 'Layers', description: 'Caching, pub/sub queues, rate limiting, session storage.' },
      { name: 'Docker & Containers', level: 84, experience: '3 yrs', icon: 'Box', description: 'Containerization, multi-stage builds, Docker Compose, Cloud Run.' },
      { name: 'Git & CI/CD Pipelines', level: 94, experience: '4 yrs', icon: 'GitBranch', description: 'GitHub Actions, automated testing, release management.' }
    ]
  },
  {
    title: 'AI & Systems Engineering',
    iconName: 'Bot',
    skills: [
      { name: 'Gemini API & LLM Integration', level: 90, experience: '2 yrs', icon: 'Bot', description: 'Structured JSON output, function calling, prompt engineering, streaming.' },
      { name: 'System Architecture', level: 86, experience: '3 yrs', icon: 'Cpu', description: 'Monolith to microservice migration, fault tolerance, scalability design.' },
      { name: 'Performance Optimization', level: 92, experience: '4 yrs', icon: 'Gauge', description: 'Lighthouse 100 metrics, bundle splitting, memory leak debugging.' }
    ]
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'exp-techventures',
    period: '2024 — PRESENT',
    role: 'Senior Full Stack Engineer',
    company: 'TechVentures Studio',
    location: 'Bengaluru, India (Hybrid)',
    type: 'Full-time',
    description: [
      'Architecting resilient web platforms serving 200k+ active monthly users with sub-100ms response times.',
      'Led frontend migration to React 19 and Vite, reducing build times by 45% and improving bundle size by 30%.',
      'Integrated server-side Gemini AI features for automated document parsing and smart summary generation.',
      'Mentored junior engineers and established team-wide code review and automated linting standards.'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Gemini API', 'Docker'],
    metrics: '45% Faster Builds · 200k+ Active Users'
  },
  {
    id: 'exp-craftlabs',
    period: '2022 — 2024',
    role: 'Frontend Architect & UI Engineer',
    company: 'CraftLabs Technologies',
    location: 'Remote',
    type: 'Full-time',
    description: [
      'Spearheaded the creation of an internal design system component library used across 8 core product applications.',
      'Engineered interactive real-time data dashboards using D3 and WebSockets for enterprise clients.',
      'Achieved 100/100 Lighthouse performance and accessibility scores across all core landing and app screens.',
      'Collaborated closely with product managers and UX designers to craft intuitive user experiences.'
    ],
    technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Motion', 'GraphQL', 'Storybook'],
    metrics: '100/100 Lighthouse Score · 8 Apps Powered'
  },
  {
    id: 'exp-innotech',
    period: '2021 — 2022',
    role: 'Software Development Engineer',
    company: 'InnoTech Solutions',
    location: 'Pune, India',
    type: 'Full-time',
    description: [
      'Developed high-performance RESTful APIs and microservices handling 5M+ daily requests.',
      'Implemented automated database indexing and Redis caching strategies, reducing query latency by 60%.',
      'Built custom internal admin panel with granular role-based access control (RBAC).',
      'Participated in daily agile scrums, sprint planning, and system architecture design sessions.'
    ],
    technologies: ['Node.js', 'Express', 'MongoDB', 'Redis', 'React', 'Git', 'AWS'],
    metrics: '5M+ Daily API Requests · 60% Query Latency Reduction'
  },
  {
    id: 'exp-freelance',
    period: '2020 — 2021',
    role: 'Full Stack Consultant & Open Source Contributor',
    company: 'Independent Practice',
    location: 'Global Remote',
    type: 'Contract',
    description: [
      'Delivered 15+ custom web applications for startups and international clients across fintech, SaaS, and e-commerce.',
      'Contributed bug fixes and performance improvements to prominent open-source React and Node libraries.',
      'Provided technical consultation on database schema design, UI component architecture, and cloud deployment.'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Express', 'PostgreSQL', 'Vercel'],
    metrics: '15+ Client Projects Delivered'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    quote: 'Yash is that rare engineer who combines deep backend knowledge with incredible visual taste. His attention to detail and performance optimization is second to none.',
    author: 'Vikram Mehta',
    role: 'VP of Engineering',
    company: 'TechVentures Studio',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'test-2',
    quote: 'Working with Yash on our core dashboard was a game-changer. He turned complex real-time data requirements into a blazing fast, beautiful user interface.',
    author: 'Sarah Chen',
    role: 'Lead Product Designer',
    company: 'CraftLabs',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  }
];
