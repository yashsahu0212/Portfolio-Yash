import React from 'react';
import { ScreenId, Project } from '../types';
import { YASH_BIO, PROJECTS_DATA } from '../data/portfolioData';
import { TerminalWidget } from '../components/TerminalWidget';
import { SpotlightRoleBadge } from '../components/SpotlightRoleBadge';
import { GitHubCalendar } from '../components/GitHubCalendar';
import { MagneticCard } from '../components/MagneticCard';
import { TextRoll } from '../components/TextRoll';
import { ScrollRevealText } from '../components/ScrollRevealText';
import { 
  ArrowRight, 
  ExternalLink,
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (destination: ScreenId) => void;
  onSelectProject: (project: Project) => void;
  isCustomCursorEnabled?: boolean;
  onToggleCustomCursor?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectProject,
}) => {
  const featuredProjects = PROJECTS_DATA.filter((p) => p.featured);

  return (
    <div className="space-y-16 pb-12 font-sans">
      
      {/* Hero Section */}
      <section className="relative pt-6 pb-12 px-4 md:px-8 border-b-6 border-black bg-[#fbfaee] bg-grid-pattern">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 bg-[#22c55e] text-black border-3 border-black px-3.5 py-1.5 font-mono text-xs font-bold neo-shadow-sm uppercase">
              <span className="w-2.5 h-2.5 bg-black rounded-full"></span>
              <span>AVAILABLE FOR WORK</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-heading font-extrabold uppercase text-black leading-none tracking-tight">
                YASH SAHU
              </h1>
              
              <SpotlightRoleBadge />
            </div>

            {/* Sub-tagline */}
            <ScrollRevealText as="p" className="text-gray-800 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
              {YASH_BIO.tagline}
            </ScrollRevealText>

            {/* Single Primary CTA */}
            <div className="flex flex-wrap items-center gap-4 pt-2 font-mono">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('Projects');
                }}
                className="bg-[#fcd400] text-black hover:bg-[#ff6b00] hover:text-white px-6 py-3 font-bold text-base border-4 border-black neo-shadow-hover flex items-center gap-2 uppercase"
              >
                <span>VIEW PROJECTS</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            {/* Metrics Counter Grid */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t-3 border-black font-mono">
              <div className="bg-white p-3 border-3 border-black neo-shadow-sm">
                <div className="text-xl md:text-2xl font-heading font-extrabold text-black">VIT Bhopal</div>
                <div className="text-[11px] font-bold text-gray-600 uppercase">Education</div>
              </div>
              <div className="bg-white p-3 border-3 border-black neo-shadow-sm">
                <div className="text-2xl md:text-3xl font-heading font-extrabold text-black">{YASH_BIO.projectsCompleted}</div>
                <div className="text-[11px] font-bold text-gray-600 uppercase">Projects</div>
              </div>
              <div className="bg-white p-3 border-3 border-black neo-shadow-sm">
                <div className="text-2xl md:text-3xl font-heading font-extrabold text-black">{YASH_BIO.commitsThisYear}</div>
                <div className="text-[11px] font-bold text-gray-600 uppercase">Git Commits</div>
              </div>
            </div>
          </div>

          {/* Hero Right Column: Terminal */}
          <div className="lg:col-span-5">
            <TerminalWidget onNavigate={onNavigate} />
          </div>
        </div>
      </section>

      {/* Featured Projects Highlight */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-6 border-black pb-4">
          <div>
            <div className="inline-block bg-black text-[#fcd400] font-mono text-xs font-bold px-3 py-1 mb-2 uppercase border border-black">
              [ SELECTED WORK ]
            </div>
            <ScrollRevealText as="h2" className="text-4xl md:text-5xl font-heading font-extrabold uppercase text-black">
              FEATURED PROJECTS
            </ScrollRevealText>
          </div>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('Projects');
            }}
            className="group bg-[#fcd400] text-black hover:bg-black hover:text-[#fcd400] px-5 py-2.5 font-mono font-bold text-sm border-3 border-black neo-shadow-sm flex items-center gap-2 self-start md:self-auto uppercase transition-colors"
          >
            <TextRoll>{`ALL PROJECTS (${PROJECTS_DATA.length})`}</TextRoll>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <MagneticCard
              key={project.id}
              onClick={() => onSelectProject(project)}
              tiltMaxAngle={14}
              magneticStrength={0.2}
              className="bg-white border-4 border-black neo-shadow-hover flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Image */}
                <div className="relative h-48 border-b-4 border-black overflow-hidden bg-gray-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-black text-white text-[10px] font-mono font-bold px-2 py-1 uppercase border border-black">
                    {project.category}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-3">
                  <h3 className="text-2xl font-heading font-extrabold text-black uppercase group-hover:text-[#ff6b00] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                    {project.tagline}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-[#fbfaee] text-black border border-black px-2 py-0.5 text-[11px] font-mono font-bold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-5 pt-0">
                <button
                  className="w-full bg-[#fcd400] text-black group-hover:bg-black group-hover:text-[#fcd400] py-2.5 font-mono font-bold text-xs uppercase border-2 border-black transition-colors flex items-center justify-center gap-2"
                >
                  <TextRoll>VIEW DETAILS</TextRoll>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </MagneticCard>
          ))}
        </div>
      </section>

      {/* GitHub Contribution Activity Section */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto space-y-4">
        <div className="inline-block bg-black text-[#fcd400] font-mono text-xs font-bold px-3 py-1 uppercase border border-black">
          [ GIT ACTIVITY ]
        </div>
        <GitHubCalendar />
      </section>

    </div>
  );
};
