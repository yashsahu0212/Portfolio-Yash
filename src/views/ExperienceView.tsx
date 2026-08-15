import React, { useState, useMemo, useEffect } from 'react';
import { ScreenId } from '../types';
import { EXPERIENCE_DATA } from '../data/portfolioData';
import { MagneticCard } from '../components/MagneticCard';
import { MagneticButton } from '../components/MagneticButton';
import { TextRoll } from '../components/TextRoll';
import { soundFX } from '../utils/sfx';
import { 
  Download, 
  Briefcase, 
  TrendingUp, 
  CheckCircle2, 
  Search, 
  X, 
  Calendar, 
  Building2, 
  MapPin, 
  Sparkles,
  Zap
} from 'lucide-react';

interface ExperienceViewProps {
  onNavigate: (destination: ScreenId) => void;
}

// Animated Impact Counter component
const ImpactCounter: React.FC<{ target: number; suffix?: string; prefix?: string }> = ({
  target,
  suffix = '',
  prefix = '',
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200; // ms
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

export const ExperienceView: React.FC<ExperienceViewProps> = ({ onNavigate }) => {
  const [downloaded, setDownloaded] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [highlightedTech, setHighlightedTech] = useState<string | null>(null);

  const handleLinkClick = (e: React.MouseEvent<HTMLElement>, destination: ScreenId) => {
    e.preventDefault();
    soundFX.playClick();
    onNavigate(destination);
  };

  const handleDownload = () => {
    soundFX.playClick();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  // Filter experience list
  const filteredExperience = useMemo(() => {
    return EXPERIENCE_DATA.filter((item) => {
      const matchesType =
        selectedType === 'ALL' || item.type.toLowerCase() === selectedType.toLowerCase();

      const matchesSearch =
        item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.metrics.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.description.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesType && matchesSearch;
    });
  }, [selectedType, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-12 font-sans">
      
      {/* Top Banner */}
      <div className="bg-[#fcd400] border-6 border-black neo-shadow-lg p-6 md:p-10 font-mono space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-block bg-black text-[#fcd400] text-xs font-bold px-3 py-1 uppercase mb-2">
              [ 04 // CAREER CHRONOLOGY & IMPACT ]
            </div>
            <h1 className="text-4xl sm:text-6xl font-heading font-extrabold uppercase text-black leading-none">
              WORK EXPERIENCE
            </h1>
            <p className="text-black font-bold text-sm md:text-base mt-2 font-sans">
              4+ years of engineering impact across full-stack systems, performance architecture, and technical leadership.
            </p>
          </div>

          <MagneticButton
            onClick={handleDownload}
            pullFactor={0.25}
            className="bg-black text-[#fcd400] hover:bg-white hover:text-black px-6 py-3 font-bold text-xs border-3 border-black neo-shadow-sm flex items-center justify-center gap-2 uppercase"
          >
            <Download className="w-4 h-4" />
            <TextRoll>{downloaded ? 'RESUME DOWNLOADED!' : 'DOWNLOAD RESUME (PDF)'}</TextRoll>
          </MagneticButton>
        </div>
      </div>

      {/* ANIMATED CAREER IMPACT METRICS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
        <MagneticCard
          tiltMaxAngle={10}
          magneticStrength={0.15}
          className="bg-white border-4 border-black p-5 neo-shadow-sm space-y-1"
        >
          <span className="text-gray-500 text-[10px] font-bold uppercase block">ENGINEERING EXP</span>
          <div className="text-3xl font-heading font-extrabold text-black">
            <ImpactCounter target={4} suffix="+ YEARS" />
          </div>
          <span className="text-xs text-[#22c55e] font-bold block">FULL STACK & ARCHITECTURE</span>
        </MagneticCard>

        <MagneticCard
          tiltMaxAngle={10}
          magneticStrength={0.15}
          className="bg-white border-4 border-black p-5 neo-shadow-sm space-y-1"
        >
          <span className="text-gray-500 text-[10px] font-bold uppercase block">BUILD TIME REDUCTION</span>
          <div className="text-3xl font-heading font-extrabold text-[#ff6b00]">
            <ImpactCounter target={45} suffix="%" />
          </div>
          <span className="text-xs text-black font-bold block">REACT 19 & VITE MIGRATION</span>
        </MagneticCard>

        <MagneticCard
          tiltMaxAngle={10}
          magneticStrength={0.15}
          className="bg-white border-4 border-black p-5 neo-shadow-sm space-y-1"
        >
          <span className="text-gray-500 text-[10px] font-bold uppercase block">ACTIVE USERS SERVED</span>
          <div className="text-3xl font-heading font-extrabold text-black">
            <ImpactCounter target={200} suffix="K+" />
          </div>
          <span className="text-xs text-[#22c55e] font-bold block">SUB-100ms LATENCY</span>
        </MagneticCard>

        <MagneticCard
          tiltMaxAngle={10}
          magneticStrength={0.15}
          className="bg-white border-4 border-black p-5 neo-shadow-sm space-y-1"
        >
          <span className="text-gray-500 text-[10px] font-bold uppercase block">LATENCY REDUCTION</span>
          <div className="text-3xl font-heading font-extrabold text-[#22c55e]">
            <ImpactCounter target={60} suffix="%" />
          </div>
          <span className="text-xs text-black font-bold block">REDIS & SQL INDEXING</span>
        </MagneticCard>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border-4 border-black neo-shadow-lg p-6 space-y-4 font-mono">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-3 border-black pb-4">
          
          {/* Role Type Filter Tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold uppercase text-gray-500 mr-2">[ ROLE TYPE ]:</span>
            {['ALL', 'Full-time', 'Contract'].map((type) => (
              <button
                key={type}
                onClick={() => {
                  soundFX.playClick();
                  setSelectedType(type);
                }}
                className={`px-3 py-1.5 font-bold text-xs border-2 border-black uppercase transition-all ${
                  selectedType === type
                    ? 'bg-black text-[#fcd400] neo-shadow-sm -translate-y-0.5'
                    : 'bg-[#fbfaee] hover:bg-[#fcd400] text-black'
                }`}
              >
                {type === 'ALL' ? 'ALL ROLES (4)' : type}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-3 text-black" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search experience e.g. 'React', 'Metrics'..."
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

        {/* Tech Highlight Filter Banner */}
        {highlightedTech && (
          <div className="bg-[#fcd400] border-3 border-black p-3.5 neo-shadow-sm flex items-center justify-between gap-4 font-mono text-xs font-bold text-black">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-black shrink-0" />
              <span>HIGHLIGHTING ROLES UTILIZING: <span className="underline uppercase">{highlightedTech}</span></span>
            </div>
            <button
              onClick={() => setHighlightedTech(null)}
              className="bg-black text-white px-2 py-0.5 border border-black hover:bg-white hover:text-black transition-colors"
            >
              RESET HIGHLIGHT
            </button>
          </div>
        )}
      </div>

      {/* Experience Timeline Cards */}
      <div className="space-y-8">
        {filteredExperience.map((item) => (
          <MagneticCard
            key={item.id}
            tiltMaxAngle={8}
            magneticStrength={0.1}
            className="bg-white border-4 border-black neo-shadow-hover p-6 md:p-8 space-y-6 relative overflow-hidden"
          >
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-4 border-black pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-mono text-xs font-bold">
                  <span className="bg-[#fcd400] text-black px-2.5 py-0.5 border border-black uppercase flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {item.period}
                  </span>
                  <span className="bg-black text-white px-2.5 py-0.5 uppercase">
                    {item.type}
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

              {/* Impact Metric Badge with pulse animation */}
              <div className="bg-[#fbfaee] p-4 border-3 border-black neo-shadow-sm font-mono text-xs font-bold text-black self-start md:self-auto space-y-1">
                <span className="text-gray-500 block text-[10px] uppercase flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-[#22c55e]" /> KEY IMPACT METRIC:
                </span>
                <span className="text-[#22c55e] font-extrabold text-sm block animate-pulse">
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

            {/* Technologies Badges (Clickable to Highlight) */}
            <div className="pt-4 border-t-2 border-gray-200 font-mono">
              <span className="text-xs font-bold text-gray-500 uppercase block mb-2">
                TECHNOLOGIES UTILIZED (CLICK TO HIGHLIGHT MATCHES):
              </span>
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
                          ? 'bg-black text-[#fcd400] scale-105'
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

      {/* Quick Link Navigation Strip */}
      <div className="bg-[#dde1ff] border-4 border-black p-6 font-mono neo-shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-bold text-black text-sm uppercase block">READY TO LEVEL UP YOUR ENGINEERING TEAM?</span>
          <span className="text-xs text-gray-700 font-sans">Reach out directly to schedule an introductory call or technical inquiry.</span>
        </div>

        <MagneticButton
          onClick={(e) => handleLinkClick(e, 'Contact - Yash Sahu')}
          className="bg-black text-[#fcd400] hover:bg-[#fcd400] hover:text-black px-6 py-3 font-bold text-xs border-2 border-black uppercase transition-colors"
        >
          <TextRoll>CONTACT YASH SAHU</TextRoll>
        </MagneticButton>
      </div>

    </div>
  );
};
