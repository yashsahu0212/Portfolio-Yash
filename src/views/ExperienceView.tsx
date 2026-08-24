import React, { useState, useMemo } from 'react';
import { ScreenId } from '../types';
import { EXPERIENCE_DATA } from '../data/portfolioData';
import { MagneticCard } from '../components/MagneticCard';
import { MagneticButton } from '../components/MagneticButton';
import { TextRoll } from '../components/TextRoll';
import { soundFX } from '../utils/sfx';
import { 
  Download, 
  Search, 
  X, 
  Calendar, 
  Building2, 
  MapPin, 
  Sparkles
} from 'lucide-react';

interface ExperienceViewProps {
  onNavigate: (destination: ScreenId) => void;
}

export const ExperienceView: React.FC<ExperienceViewProps> = ({ onNavigate }) => {
  const [downloaded, setDownloaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [highlightedTech, setHighlightedTech] = useState<string | null>(null);

  const handleDownload = () => {
    soundFX.playClick();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  // Filter experience list
  const filteredExperience = useMemo(() => {
    return EXPERIENCE_DATA.filter((item) => {
      const matchesSearch =
        item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.metrics.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.description.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesSearch;
    });
  }, [searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-10 font-sans">
      
      {/* Top Banner */}
      <div className="bg-[#fcd400] border-6 border-black neo-shadow-lg p-6 md:p-10 font-mono space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-block bg-black text-[#fcd400] text-xs font-bold px-3 py-1 uppercase mb-2">
              [ EDUCATION & TIMELINE ]
            </div>
            <h1 className="text-4xl sm:text-6xl font-heading font-extrabold uppercase text-black leading-none">
              EDUCATION & TIMELINE
            </h1>
          </div>

          <MagneticButton
            onClick={handleDownload}
            pullFactor={0.25}
            className="bg-black text-[#fcd400] hover:bg-white hover:text-black px-6 py-3 font-bold text-xs border-3 border-black neo-shadow-sm flex items-center justify-center gap-2 uppercase self-start md:self-auto"
          >
            <Download className="w-4 h-4" />
            <TextRoll>{downloaded ? 'RESUME DOWNLOADED!' : 'DOWNLOAD RESUME'}</TextRoll>
          </MagneticButton>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border-4 border-black neo-shadow-sm p-4 font-mono">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs font-bold uppercase text-black">
            ACADEMIC & OPEN SOURCE HISTORY
          </span>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tech e.g. 'Python', 'React'..."
              className="w-full bg-[#fbfaee] text-black pl-9 pr-8 py-2 border-2 border-black focus:outline-none focus:bg-white text-xs font-mono font-bold"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Tech Highlight Filter Banner */}
        {highlightedTech && (
          <div className="bg-[#fcd400] border-2 border-black p-2 mt-3 neo-shadow-sm flex items-center justify-between gap-4 font-mono text-xs font-bold text-black">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-black shrink-0" />
              <span>FILTERING BY: <span className="underline uppercase">{highlightedTech}</span></span>
            </div>
            <button
              onClick={() => setHighlightedTech(null)}
              className="bg-black text-white px-2 py-0.5 border border-black hover:bg-white hover:text-black transition-colors"
            >
              RESET
            </button>
          </div>
        )}
      </div>

      {/* Experience Timeline Cards */}
      <div className="space-y-6">
        {filteredExperience.map((item) => (
          <MagneticCard
            key={item.id}
            tiltMaxAngle={6}
            magneticStrength={0.08}
            className="bg-white border-4 border-black neo-shadow-hover p-6 md:p-8 space-y-5 relative overflow-hidden"
          >
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b-4 border-black pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-mono text-xs font-bold">
                  <span className="bg-[#fcd400] text-black px-2.5 py-0.5 border border-black uppercase flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {item.period}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold uppercase text-black pt-1">
                  {item.role}
                </h2>
                
                <div className="flex items-center gap-3 font-mono text-xs font-bold text-gray-700">
                  <span className="text-[#ff6b00] font-extrabold text-sm flex items-center gap-1">
                    <Building2 className="w-4 h-4 inline" /> {item.company}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {item.location}
                  </span>
                </div>
              </div>

              {/* Impact Metric Badge */}
              <div className="bg-[#fbfaee] p-3 border-3 border-black neo-shadow-sm font-mono text-xs font-bold text-black self-start md:self-auto space-y-0.5">
                <span className="text-gray-500 block text-[10px] uppercase">
                  HIGHLIGHT:
                </span>
                <span className="text-[#22c55e] font-extrabold text-xs block">
                  ⚡ {item.metrics}
                </span>
              </div>
            </div>

            {/* Role Descriptions List */}
            <div className="space-y-2 font-sans text-sm md:text-base text-gray-800 leading-relaxed">
              {item.description.map((desc, dIdx) => (
                <div key={dIdx} className="flex items-start gap-3">
                  <span className="font-mono font-bold text-[#ff6b00] mt-1">▶</span>
                  <span>{desc}</span>
                </div>
              ))}
            </div>

            {/* Technologies Badges */}
            <div className="pt-3 border-t-2 border-gray-200 font-mono">
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech, tIdx) => {
                  const isMatch = highlightedTech === tech;
                  return (
                    <button
                      key={tIdx}
                      onClick={() => {
                        soundFX.playClick();
                        setHighlightedTech(isMatch ? null : tech);
                      }}
                      className={`px-3 py-1 text-xs font-bold border-2 border-black neo-shadow-sm transition-all ${
                        isMatch
                          ? 'bg-black text-[#fcd400]'
                          : 'bg-[#fbfaee] text-black hover:bg-[#fcd400]'
                      }`}
                    >
                      {tech}
                    </button>
                  );
                })}
              </div>
            </div>
          </MagneticCard>
        ))}
      </div>

    </div>
  );
};
