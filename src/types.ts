export type ScreenId =
  | 'Home'
  | 'About'
  | 'Projects'
  | 'Skills'
  | 'Experience'
  | 'Contact'
  | string;

export interface ArchNode {
  step: string;
  name: string;
  type: 'client' | 'gateway' | 'service' | 'database' | 'system';
  desc: string;
  status?: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'Full Stack' | 'Frontend' | 'Systems & Backend' | 'Mobile';
  tags: string[];
  image: string;
  demoUrl: string;
  githubUrl: string;
  featured: boolean;
  highlights: string[];
  year: string;
  role: string;
  architectureNodes?: ArchNode[];
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: {
    name: string;
    level: number; // 0 to 100
    experience: string;
    icon: string;
    description: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Open Source';
  description: string[];
  technologies: string[];
  metrics: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}
