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
  avatar: yashAvatar,
  tagline: 'Building responsive web applications, secure software tools, and algorithmic backend systems.',
  summary: `I am a Computer Science Engineering student and developer at VIT Bhopal University. I specialize in Full-Stack Web Development (React, TypeScript, Node.js), Python system modeling, cybersecurity tooling, and sleek, minimalist UI design.`,
  yearsExperience: 'Student Dev',
  projectsCompleted: '10+',
  commitsThisYear: '350+',
  coffeeCups: '500+'
};

export const PROJECTS_DATA: Project[] = [
  {
    id: 'resilience-analyzer',
    title: 'Resilience Analyzer',
    tagline: 'Real-time password security assessment & brute-force resilience analyzer.',
    description: 'A client-side security assessment engine built for Hackathon Cyber Carnival 2026. Evaluates password strength in real time, calculates brute-force crack times, provides context-aware guidance, and performs secure breach detection using k-anonymity with the HaveIBeenPwned API (v3).',
    category: 'Full Stack',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'zxcvbn', 'crypto-js', 'HaveIBeenPwned API', 'Cybersecurity'],
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
      { step: '03', name: 'k-Anonymity Hashing', type: 'service', desc: 'Generates SHA-1 hash and dispatches first 5 characters for privacy-preserving breach lookup.', status: 'SECURE' },
      { step: '04', name: 'Educational Feedback UI', type: 'database', desc: 'Renders dynamic visual resilience meter and educational tips.', status: 'RENDERED' }
    ]
  },
  {
    id: 'hotel-management-system',
    title: 'Hotel Management System',
    tagline: 'Console-based hotel management & automated bill calculation platform.',
    description: 'A structured Python management system providing room reservation management, guest record tracking, check-in/check-out workflow processing, and automated itemized billing computations.',
    category: 'Systems & Backend',
    tags: ['Python', 'CLI', 'Data Structures', 'File Handling', 'Algorithms'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    demoUrl: 'https://github.com/yashsahu0212/Hotel-Management-System-Python',
    githubUrl: 'https://github.com/yashsahu0212/Hotel-Management-System-Python',
    featured: true,
    highlights: [
      'Automated itemized bill calculation engine handling multi-service billing.',
      'File-based data persistence storing customer records and room availability.',
      'Clean interactive console menu system with input validation safeguards.'
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
    description: 'A Python predictive modeling system utilizing historical atmospheric and climate datasets to analyze patterns, calculate trends, and predict temperature variations.',
    category: 'Systems & Backend',
    tags: ['Python', 'Machine Learning', 'NumPy', 'Pandas', 'Data Analysis'],
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=800&q=80',
    demoUrl: 'https://github.com/yashsahu0212/Temprature-predictor',
    githubUrl: 'https://github.com/yashsahu0212/Temprature-predictor',
    featured: true,
    highlights: [
      'Regression modeling forecasting temperature variations from historical records.',
      'Data preprocessing pipeline cleaning time-series climate metrics.',
      'Calculates variance and predictive accuracy.'
    ],
    year: '2025',
    role: 'ML Developer',
    architectureNodes: [
      { step: '01', name: 'Data Pipeline', type: 'client', desc: 'Preprocesses raw climate datasets using NumPy and Pandas.', status: 'CLEANED' },
      { step: '02', name: 'Feature Extraction', type: 'gateway', desc: 'Extracts seasonal indicators and temperature fluctuations.', status: 'OPTIMIZED' },
      { step: '03', name: 'Predictive Model', type: 'service', desc: 'Regression algorithm estimating future thermal values.', status: 'TRAINED' },
      { step: '04', name: 'Output Evaluator', type: 'database', desc: 'Computes mean squared error and forecasts.', status: 'EVALUATED' }
    ]
  },
  {
    id: 'newtons-law-of-cooling',
    title: "Newton's Law of Cooling Simulator",
    tagline: 'Computational physics simulation modeling thermal dissipation over time.',
    description: 'A mathematical modeling application in Python applying differential equations to calculate and visualize heat transfer and temperature decay relative to ambient surroundings.',
    category: 'Systems & Backend',
    tags: ['Python', 'Differential Equations', 'Physics Simulation', 'Matplotlib', 'Calculus'],
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
    tagline: 'TypeScript precision measurement and material optimization tool.',
    description: 'A frontend utility built with TypeScript for calculating fabric dimensions, material requirements, and cutting layouts with minimal waste.',
    category: 'Frontend',
    tags: ['TypeScript', 'React', 'Tailwind CSS', 'Geometry Math', 'UI/UX'],
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
    demoUrl: 'https://github.com/yashsahu0212/Fabric-Calculator',
    githubUrl: 'https://github.com/yashsahu0212/Fabric-Calculator',
    featured: false,
    highlights: [
      'Strict TypeScript implementation ensuring accurate dimensional calculations.',
      'Instant interactive calculation as dimensions change.',
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
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Accessibility', 'Responsive Web'],
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
      { step: '01', name: 'Accessible UI', type: 'client', desc: 'Semantic HTML5 structure with responsive CSS.', status: 'ACCESSIBLE' },
      { step: '02', name: 'Tutorial Engine', type: 'service', desc: 'Step-by-step interactive lesson guides.', status: 'ACTIVE' },
      { step: '03', name: 'Local State', type: 'database', desc: 'Stores learning progress in browser storage.', status: 'PERSISTED' }
    ]
  }
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    title: 'Frontend & UI Engineering',
    iconName: 'Layout',
    skills: [
      { name: 'JavaScript & TypeScript', level: 94, experience: 'Active', icon: 'FileCode', description: 'Modern ES6+, TypeScript strict type safety, asynchronous patterns, DOM architecture.' },
      { name: 'React', level: 90, experience: 'Active', icon: 'Code', description: 'Component architecture, Hooks, Context, State management, dynamic interactions.' },
      { name: 'Tailwind CSS & Neo-Brutalism', level: 95, experience: 'Active', icon: 'Palette', description: 'Responsive design, custom tokens, high-contrast layouts, micro-animations.' },
      { name: 'HTML5 & Modern CSS3', level: 96, experience: 'Active', icon: 'Layers', description: 'Semantic elements, CSS Grid/Flexbox, accessibility standards, CSS animations.' }
    ]
  },
  {
    title: 'Backend & Systems',
    iconName: 'Server',
    skills: [
      { name: 'Python', level: 92, experience: 'Active', icon: 'Cpu', description: 'Data modeling, physics simulations, algorithms, file persistence, automation scripts.' },
      { name: 'Node.js & Express', level: 88, experience: 'Active', icon: 'Server', description: 'REST APIs, middleware, JSON payloads, async error handling.' },
      { name: 'Data Structures & Algorithms', level: 88, experience: 'Active', icon: 'Terminal', description: 'Array manipulations, sorting, searching, recursion, time/space complexity analysis.' }
    ]
  },
  {
    title: 'Tools & Security',
    iconName: 'Shield',
    skills: [
      { name: 'Cybersecurity & InfoSec', level: 86, experience: 'Active', icon: 'Shield', description: 'Password resilience algorithms, entropy, k-anonymity breach lookup, SHA-1 client-side hashing.' },
      { name: 'Git & GitHub', level: 92, experience: 'Active', icon: 'GitBranch', description: 'Version control, branch workflows, open-source repositories, collaboration.' },
      { name: 'REST APIs & Web Standards', level: 90, experience: 'Active', icon: 'Activity', description: 'Client-server communication, JSON parsing, API integration, HTTP protocols.' }
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
      'Pursuing Bachelor of Technology in Computer Science & Engineering with focus on Software Systems, Web Architectures, and Cybersecurity.',
      'Developed Resilience Analyzer with team InfoSec Innovators for Hackathon Cyber Carnival 2026.',
      'Building open-source software solutions, data modeling applications, and interactive user interfaces.'
    ],
    technologies: ['Python', 'JavaScript', 'TypeScript', 'React', 'Tailwind CSS', 'Node.js', 'Git'],
    metrics: 'Cyber Carnival 2026 Hackathon'
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
    quote: 'Working with Yash on the Resilience Analyzer project for Cyber Carnival 2026 was awesome. His grasp on JavaScript, password hashing logic, and clean frontend UI helped our team deliver a really solid project.',
    author: 'Harsh Jain',
    role: 'CSE Student & Teammate',
    company: 'VIT Bhopal',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'test-vardaan',
    quote: 'Yash is always experimenting with cool tech stacks and creating projects with great UI animations. He is super helpful, consistent, and passionate about coding and problem solving.',
    author: 'Vardaan Saxena',
    role: 'CSE Student & Peer',
    company: 'VIT Bhopal',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  }
];
