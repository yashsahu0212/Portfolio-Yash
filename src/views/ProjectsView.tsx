import React, { useState } from 'react';
import { ScreenId, Project } from '../types';
import { PROJECTS_DATA } from '../data/portfolioData';
import { MagneticCard } from '../components/MagneticCard';
import { ScrollRevealText } from '../components/ScrollRevealText';
import { Search, Github, ArrowUpRight } from 'lucide-react';

interface ProjectsViewProps {
  onNavigate: (destination: ScreenId) => void;
  onSelectProject: (project: Project) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onNavigate, onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Full Stack', 'Frontend', 'AI / Systems'];

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-10 font-sans">
      
      {/* Top Header */}
      <div className="bg-[#fcd400] border-6 border-black neo-shadow-lg p-6 md:p-10 font-mono space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-block bg-black text-[#fcd400] text-xs font-bold px-3 py-1 uppercase mb-2">
              [ 02 // PORTFOLIO SHOWCASE ]
            </div>
            <ScrollRevealText as="h1" className="text-4xl sm:text-6xl font-heading font-extrabold uppercase text-black leading-none">
              FEATURED PROJECTS
            </ScrollRevealText>
            <p className="text-black font-bold text-sm md:text-base mt-2 font-sans">
              Production-ready web applications, distributed backend systems, and experimental AI tools.
            </p>
          </div>

          <div className="bg-black text-white p-3 border-2 border-black neo-shadow-sm text-xs font-mono font-bold">
            <span className="text-[#fcd400]">SHOWING:</span> {filteredProjects.length} OF {PROJECTS_DATA.length} PROJECTS
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="pt-4 border-t-3 border-black flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 font-mono font-bold text-xs uppercase border-2 border-black transition-all ${
                  selectedCategory === category
                    ? 'bg-black text-[#fcd400] neo-shadow-sm'
                    : 'bg-white text-black hover:bg-black hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Input Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword, tag..."
              className="w-full bg-white text-black font-mono text-xs pl-9 pr-3 py-2 border-2 border-black focus:outline-none focus:bg-[#fbfaee]"
            />
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <MagneticCard
              key={project.id}
              onClick={() => onSelectProject(project)}
              tiltMaxAngle={14}
              magneticStrength={0.2}
              className="bg-white border-4 border-black neo-shadow-hover flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Image & Badges */}
                <div className="relative h-52 border-b-4 border-black overflow-hidden bg-gray-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-black text-white text-[11px] font-mono font-bold px-2.5 py-1 uppercase border border-black">
                    {project.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-[#fcd400] text-black text-[11px] font-mono font-bold px-2.5 py-1 border border-black">
                    {project.year}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-2xl font-heading font-extrabold text-black uppercase group-hover:text-[#ff6b00] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[#ff6b00] text-xs font-mono font-bold mt-0.5">
                      ROLE: {project.role}
                    </p>
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed font-sans line-clamp-3">
                    {project.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="bg-[#fbfaee] p-3 border-2 border-black text-xs font-sans space-y-1">
                    <span className="font-mono font-bold text-black block mb-1">KEY FEATURE:</span>
                    <p className="text-gray-800 italic">"{project.highlights[0]}"</p>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-white text-black border border-black px-2 py-0.5 text-[11px] font-mono font-bold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 flex gap-2 font-mono">
                <button
                  className="flex-1 bg-[#fcd400] text-black group-hover:bg-black group-hover:text-[#fcd400] py-2.5 font-bold text-xs uppercase border-2 border-black transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>INSPECT DETAILS</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="bg-black text-white hover:bg-[#ff6b00] p-2.5 border-2 border-black transition-colors flex items-center justify-center"
                  title="View GitHub Repository"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </MagneticCard>
          ))}
        </div>
      ) : (
        <div className="bg-white border-4 border-black p-12 text-center font-mono space-y-4 neo-shadow-sm">
          <p className="text-lg font-bold text-black uppercase">NO PROJECTS FOUND MATCHING "{searchQuery}"</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="bg-[#fcd400] text-black px-4 py-2 font-bold text-xs border-2 border-black uppercase hover:bg-black hover:text-white"
          >
            RESET ALL FILTERS
          </button>
        </div>
      )}

      {/* Quick Navigation Footer Banner for Projects Screen */}
      <div className="bg-[#dde1ff] border-4 border-black p-6 font-mono flex flex-col md:flex-row items-center justify-between gap-4 neo-shadow-sm">
        <div>
          <span className="font-bold text-black text-sm uppercase block">WANT TO DISCUSS A CUSTOM PROJECT OR FEATURE?</span>
          <span className="text-xs text-gray-700 font-sans">Let's talk about timeline, requirements, and system design.</span>
        </div>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('Contact - Yash Sahu');
          }}
          data-name="Contact"
          data-destination="CONTACT 05/05"
          className="bg-black text-[#fcd400] hover:bg-[#fcd400] hover:text-black px-6 py-3 font-bold text-xs border-2 border-black uppercase transition-colors"
        >
          CONTACT YASH SAHU NOW
        </a>
      </div>

    </div>
  );
};
