import React, { useState, useMemo } from 'react';
import { ScreenId, Project } from '../types';
import { SKILLS_DATA, PROJECTS_DATA } from '../data/portfolioData';
import { MagneticCard } from '../components/MagneticCard';
import { soundFX } from '../utils/sfx';
import { 
  Search, 
  Sparkles, 
  ExternalLink, 
  Check, 
  X,
} from 'lucide-react';

interface SkillsViewProps {
  onNavigate: (destination: ScreenId) => void;
  onSelectProject?: (project: Project) => void;
}

export const SkillsView: React.FC<SkillsViewProps> = ({ onNavigate, onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSkillFilter, setActiveSkillFilter] = useState<string | null>(null);

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

  // Find projects matching activeSkillFilter
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
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-10 font-sans">
      
      {/* Top Banner */}
      <div className="bg-[#fcd400] border-6 border-black neo-shadow-lg p-6 md:p-10 font-mono">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-block bg-black text-[#fcd400] text-xs font-bold px-3 py-1 uppercase mb-2">
              [ SKILLS ]
            </div>
            <h1 className="text-4xl sm:text-6xl font-heading font-extrabold uppercase text-black leading-none">
              SKILLS & CAPABILITIES
            </h1>
          </div>

          <div className="bg-black text-white p-3 border-2 border-black neo-shadow-sm text-xs font-mono font-bold">
            {allSkills.length} TECHNOLOGIES
          </div>
        </div>
      </div>

      {/* Controls & Search Filter Bar */}
      <div className="bg-white border-4 border-black neo-shadow-lg p-6 space-y-6 font-mono">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-3 border-black pb-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {['ALL', 'Frontend', 'Databases & Backend'].map((cat) => {
              const count = cat === 'ALL' 
                ? allSkills.length 
                : allSkills.filter(s => s.category.toLowerCase().includes(cat.toLowerCase()) || cat.toLowerCase().includes(s.category.toLowerCase())).length;

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
              placeholder="Search e.g. 'JavaScript', 'SQL', 'PostgreSQL'..."
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
              <span>PROJECTS MATCHING: <span className="underline uppercase">{activeSkillFilter}</span> ({matchingProjects.length} FOUND)</span>
            </div>
            <button
              onClick={() => setActiveSkillFilter(null)}
              className="bg-black text-white px-2 py-0.5 border border-black hover:bg-white hover:text-black transition-colors"
            >
              CLEAR
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
                  <span className={`flex items-center gap-1 ${isSelected ? 'text-white' : 'text-black'}`}>
                    {isSelected ? <Check className="w-3 h-3 text-[#22c55e]" /> : 'VIEW PROJECTS →'}
                  </span>
                </div>
              </MagneticCard>
            );
          })}
        </div>
      </div>

      {/* Matching Projects Panel */}
      {activeSkillFilter && matchingProjects.length > 0 && (
        <div className="bg-black text-white border-6 border-black p-6 md:p-8 neo-shadow-lg space-y-6 font-mono">
          <div className="flex items-center justify-between border-b-2 border-gray-800 pb-4">
            <h2 className="text-xl md:text-2xl font-heading font-extrabold uppercase text-[#fcd400]">
              PROJECTS USING {activeSkillFilter}
            </h2>
            <button
              onClick={() => setActiveSkillFilter(null)}
              className="text-xs bg-gray-800 hover:bg-red-500 text-white px-3 py-1 border border-white transition-colors"
            >
              CLOSE
            </button>
          </div>

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
                    <span>VIEW</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
