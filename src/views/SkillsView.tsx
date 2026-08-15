import React, { useState, useMemo } from 'react';
import { ScreenId, Project } from '../types';
import { SKILLS_DATA, PROJECTS_DATA } from '../data/portfolioData';
import { MagneticCard } from '../components/MagneticCard';
import { MagneticButton } from '../components/MagneticButton';
import { soundFX } from '../utils/sfx';
import { 
  Search, 
  Terminal, 
  Sparkles, 
  ExternalLink, 
  Check, 
  Code2, 
  Layers, 
  Flame, 
  X,
  Cpu,
  Zap
} from 'lucide-react';

interface SkillsViewProps {
  onNavigate: (destination: ScreenId) => void;
  onSelectProject?: (project: Project) => void;
}

export const SkillsView: React.FC<SkillsViewProps> = ({ onNavigate, onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSkillFilter, setActiveSkillFilter] = useState<string | null>(null);

  const handleLinkClick = (e: React.MouseEvent<HTMLElement>, destination: ScreenId) => {
    e.preventDefault();
    soundFX.playClick();
    onNavigate(destination);
  };

  // Flatten all skills with category info for unified grid search/filter
  const allSkills = useMemo(() => {
    const list: Array<{
      name: string;
      level: number;
      experience: string;
      description: string;
      category: string;
    }> = [];

    SKILLS_DATA.forEach((cat) => {
      cat.skills.forEach((sk) => {
        list.push({
          ...sk,
          category: cat.title,
        });
      });
    });

    return list;
  }, []);

  // Filter skills based on Category tab and Search query
  const filteredSkills = useMemo(() => {
    return allSkills.filter((sk) => {
      const matchesCategory =
        selectedCategory === 'ALL' ||
        sk.category.toLowerCase().includes(selectedCategory.toLowerCase());

      const matchesSearch =
        sk.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sk.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sk.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [allSkills, selectedCategory, searchQuery]);

  // Find projects matching activeSkillFilter (e.g. if user clicks "TypeScript")
  const matchingProjects = useMemo(() => {
    if (!activeSkillFilter) return [];
    const term = activeSkillFilter.toLowerCase();
    return PROJECTS_DATA.filter((proj) => {
      const matchInTags = proj.tags.some((t) => t.toLowerCase().includes(term) || term.includes(t.toLowerCase()));
      const matchInTitle = proj.title.toLowerCase().includes(term);
      const matchInDesc = proj.description.toLowerCase().includes(term);
      return matchInTags || matchInTitle || matchInDesc;
    });
  }, [activeSkillFilter]);

  const handleSkillCardClick = (skillName: string) => {
    soundFX.playClick();
    if (activeSkillFilter === skillName) {
      setActiveSkillFilter(null);
    } else {
      setActiveSkillFilter(skillName);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-12 font-sans">
      
      {/* Top Banner */}
      <div className="bg-[#fcd400] border-6 border-black neo-shadow-lg p-6 md:p-10 font-mono space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-block bg-black text-[#fcd400] text-xs font-bold px-3 py-1 uppercase mb-2">
              [ 03 // TECHNICAL MATRIX PLAYGROUND ]
            </div>
            <h1 className="text-4xl sm:text-6xl font-heading font-extrabold uppercase text-black leading-none">
              SKILLS & CAPABILITIES
            </h1>
            <p className="text-black font-bold text-sm md:text-base mt-2 font-sans">
              Interactive technical breakdown spanning frontend architectures, backend microservices, databases, and AI tooling.
            </p>
          </div>

          <div className="bg-black text-white p-4 border-2 border-black neo-shadow-sm text-xs font-mono font-bold space-y-1">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#fcd400]" />
              <span className="text-[#22c55e]">STRICT TYPE SAFETY // TS 5.8</span>
            </div>
            <div className="text-gray-400">16 PRODUCTION-READY SKILLS</div>
          </div>
        </div>

        {/* Quick Navigation Strip */}
        <div className="pt-4 border-t-3 border-black flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold text-black uppercase mr-2">[ QUICK NAV DESTINATIONS ]:</span>
          
          <MagneticButton
            onClick={(e) => handleLinkClick(e, 'Yash Sahu - Developer Portfolio')}
            pullFactor={0.2}
            className="bg-white text-black hover:bg-black hover:text-[#fcd400] px-3 py-1 font-bold border-2 border-black uppercase transition-colors"
          >
            HOME
          </MagneticButton>

          <MagneticButton
            onClick={(e) => handleLinkClick(e, 'About - Yash Sahu (Curtain Transitions)')}
            pullFactor={0.2}
            className="bg-white text-black hover:bg-black hover:text-[#fcd400] px-3 py-1 font-bold border-2 border-black uppercase transition-colors"
          >
            ABOUT 01/05
          </MagneticButton>

          <MagneticButton
            onClick={(e) => handleLinkClick(e, 'Projects - Yash Sahu')}
            pullFactor={0.2}
            className="bg-white text-black hover:bg-black hover:text-[#fcd400] px-3 py-1 font-bold border-2 border-black uppercase transition-colors"
          >
            PROJECTS 02/05
          </MagneticButton>

          <MagneticButton
            onClick={(e) => handleLinkClick(e, 'Experience - Yash Sahu (Curtain Transitions)')}
            pullFactor={0.2}
            className="bg-white text-black hover:bg-black hover:text-[#fcd400] px-3 py-1 font-bold border-2 border-black uppercase transition-colors"
          >
            EXPERIENCE 04/05
          </MagneticButton>

          <MagneticButton
            onClick={(e) => handleLinkClick(e, 'Contact - Yash Sahu')}
            pullFactor={0.2}
            className="bg-[#22c55e] text-black hover:bg-black hover:text-[#22c55e] px-3 py-1 font-bold border-2 border-black uppercase transition-colors"
          >
            CONTACT 05/05
          </MagneticButton>
        </div>
      </div>

      {/* Live Benchmark Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs font-bold">
        <div className="bg-white p-4 border-3 border-black neo-shadow-sm flex items-center gap-3">
          <div className="p-2.5 bg-black text-[#fcd400] border border-black">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-gray-500 block text-[10px] uppercase">TOTAL STACK SIZE</span>
            <span className="text-lg font-heading font-extrabold text-black">16 TECHNOLOGIES</span>
          </div>
        </div>

        <div className="bg-white p-4 border-3 border-black neo-shadow-sm flex items-center gap-3">
          <div className="p-2.5 bg-black text-[#22c55e] border border-black">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <span className="text-gray-500 block text-[10px] uppercase">AVERAGE PROFICIENCY</span>
            <span className="text-lg font-heading font-extrabold text-black">90% MASTERY</span>
          </div>
        </div>

        <div className="bg-white p-4 border-3 border-black neo-shadow-sm flex items-center gap-3">
          <div className="p-2.5 bg-black text-[#ff6b00] border border-black">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-gray-500 block text-[10px] uppercase">PRIMARY ARCHITECTURE</span>
            <span className="text-sm font-heading font-extrabold text-black">REACT • TS • NODE • POSTGRES</span>
          </div>
        </div>
      </div>

      {/* Controls & Search Filter Bar */}
      <div className="bg-white border-4 border-black neo-shadow-lg p-6 space-y-6 font-mono">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-3 border-black pb-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold uppercase text-gray-500 mr-2">[ CATEGORY ]:</span>
            {['ALL', 'Frontend', 'Backend', 'Databases', 'AI'].map((cat) => {
              const count = cat === 'ALL' 
                ? allSkills.length 
                : allSkills.filter(s => s.category.toLowerCase().includes(cat.toLowerCase())).length;

              return (
                <button
                  key={cat}
                  onClick={() => {
                    soundFX.playClick();
                    setSelectedCategory(cat);
                  }}
                  className={`px-3 py-1.5 font-bold text-xs border-2 border-black uppercase transition-all ${
                    selectedCategory === cat
                      ? 'bg-black text-[#fcd400] neo-shadow-sm -translate-y-0.5'
                      : 'bg-[#fbfaee] hover:bg-[#fcd400] text-black'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-3 text-black" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack e.g. 'React', 'Docker'..."
              className="w-full bg-[#fbfaee] text-black pl-9 pr-8 py-2 border-2 border-black focus:outline-none focus:bg-white text-xs font-mono font-bold"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-gray-500 hover:text-black"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Active Skill Filter Alert Banner */}
        {activeSkillFilter && (
          <div className="bg-[#fcd400] border-3 border-black p-3.5 neo-shadow-sm flex items-center justify-between gap-4 font-mono text-xs font-bold text-black">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-black shrink-0" />
              <span>FILTERED PROJECTS MATCHING: <span className="underline uppercase">{activeSkillFilter}</span> ({matchingProjects.length} FOUND)</span>
            </div>
            <button
              onClick={() => setActiveSkillFilter(null)}
              className="bg-black text-white px-2 py-0.5 border border-black hover:bg-white hover:text-black transition-colors"
            >
              CLEAR FILTER
            </button>
          </div>
        )}

        {/* Skills Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredSkills.map((skill, idx) => {
            const isSelected = activeSkillFilter === skill.name;
            return (
              <MagneticCard
                key={idx}
                onClick={() => handleSkillCardClick(skill.name)}
                tiltMaxAngle={10}
                magneticStrength={0.15}
                className={`border-3 border-black p-5 neo-shadow-sm space-y-3 font-mono transition-all ${
                  isSelected ? 'bg-black text-white neo-shadow-lg' : 'bg-[#fbfaee] text-black hover:bg-white'
                }`}
              >
                {/* Top header */}
                <div className="flex items-center justify-between">
                  <span className={`font-bold text-base uppercase font-heading ${isSelected ? 'text-[#fcd400]' : 'text-black'}`}>
                    {skill.name}
                  </span>
                  <div className={`px-2 py-0.5 text-[10px] font-bold border border-black ${isSelected ? 'bg-[#fcd400] text-black' : 'bg-black text-white'}`}>
                    {skill.experience}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className={isSelected ? 'text-gray-300' : 'text-gray-700'}>PROFICIENCY</span>
                    <span className={isSelected ? 'text-[#fcd400]' : 'text-black'}>{skill.level}%</span>
                  </div>
                  <div className="h-3.5 bg-gray-200 border-2 border-black overflow-hidden relative">
                    <div
                      className={`h-full border-r-2 border-black transition-all duration-500 ${isSelected ? 'bg-[#22c55e]' : 'bg-[#fcd400]'}`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>

                {/* Description */}
                <p className={`text-xs font-sans leading-relaxed ${isSelected ? 'text-gray-300' : 'text-gray-800'}`}>
                  {skill.description}
                </p>

                {/* Bottom Action Badge */}
                <div className="pt-2 flex items-center justify-between border-t border-gray-400 text-[10px] font-bold">
                  <span className={isSelected ? 'text-[#fcd400]' : 'text-gray-500'}>
                    {skill.category.toUpperCase()}
                  </span>
                  <span className={`underline flex items-center gap-1 ${isSelected ? 'text-white' : 'text-black'}`}>
                    {isSelected ? <Check className="w-3 h-3 text-[#22c55e]" /> : 'INSPECT PROJECTS →'}
                  </span>
                </div>
              </MagneticCard>
            );
          })}
        </div>
      </div>

      {/* Matching Projects Panel (Appears when a skill card is clicked) */}
      {activeSkillFilter && (
        <div className="bg-black text-white border-6 border-black p-6 md:p-8 neo-shadow-lg space-y-6 font-mono">
          <div className="flex items-center justify-between border-b-2 border-gray-800 pb-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#fcd400]" />
              <h2 className="text-xl md:text-2xl font-heading font-extrabold uppercase text-[#fcd400]">
                PROJECTS POWERED BY {activeSkillFilter} ({matchingProjects.length})
              </h2>
            </div>
            <button
              onClick={() => setActiveSkillFilter(null)}
              className="text-xs bg-gray-800 hover:bg-red-500 text-white px-3 py-1 border border-white transition-colors"
            >
              CLOSE MATCHES [X]
            </button>
          </div>

          {matchingProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchingProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-[#1a1a2e] border-2 border-gray-700 p-5 space-y-3 neo-shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#22c55e] font-bold">{proj.category}</span>
                      <span className="text-xs text-gray-400">{proj.year}</span>
                    </div>
                    <h3 className="text-lg font-heading font-extrabold uppercase text-white">{proj.title}</h3>
                    <p className="text-xs text-gray-300 font-sans line-clamp-2">{proj.tagline}</p>
                  </div>

                  {onSelectProject && (
                    <button
                      onClick={() => {
                        soundFX.playClick();
                        onSelectProject(proj);
                      }}
                      className="w-full bg-[#fcd400] text-black hover:bg-white py-2 font-mono font-bold text-xs uppercase border border-black flex items-center justify-center gap-1.5"
                    >
                      <span>INSPECT PROJECT</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-400 text-sm py-4">
              No specific flagship showcase projects directly tagged with "{activeSkillFilter}". Explore the Projects view for full repositories!
            </div>
          )}
        </div>
      )}

      {/* Tech Stack Ecosystem Visual Footer Grid */}
      <div className="bg-[#ffdad6] border-4 border-black p-6 md:p-8 neo-shadow-sm space-y-4 font-mono">
        <div className="flex items-center gap-2 text-black">
          <Terminal className="w-5 h-5 text-black" />
          <h3 className="font-heading text-xl font-extrabold uppercase">
            DEVELOPMENT ENVIRONMENT & ECOSYSTEM
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 font-mono text-xs font-bold pt-2">
          <div className="bg-white text-black p-3 border-2 border-black text-center neo-shadow-sm hover:bg-[#fcd400] transition-colors">VS CODE / CURSOR</div>
          <div className="bg-white text-black p-3 border-2 border-black text-center neo-shadow-sm hover:bg-[#fcd400] transition-colors">GIT & GITHUB</div>
          <div className="bg-white text-black p-3 border-2 border-black text-center neo-shadow-sm hover:bg-[#fcd400] transition-colors">POSTMAN / HTTP</div>
          <div className="bg-white text-black p-3 border-2 border-black text-center neo-shadow-sm hover:bg-[#fcd400] transition-colors">ESBUILD & VITE</div>
          <div className="bg-white text-black p-3 border-2 border-black text-center neo-shadow-sm hover:bg-[#fcd400] transition-colors">PYTHON & NUMPY</div>
          <div className="bg-white text-black p-3 border-2 border-black text-center neo-shadow-sm hover:bg-[#fcd400] transition-colors">CLOUD RUN & GCP</div>
        </div>
      </div>

    </div>
  );
};
