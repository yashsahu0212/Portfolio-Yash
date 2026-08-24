import React, { useState } from 'react';
import { ScreenId } from '../types';
import { YASH_BIO } from '../data/portfolioData';
import { Github, Linkedin, Twitter, ArrowUpRight, Terminal } from 'lucide-react';

interface FooterProps {
  onNavigate: (destination: ScreenId) => void;
}

const FOOTER_NAV_ITEMS: Array<{
  name: string;
  targetScreen: ScreenId;
  destinationAttr: string;
}> = [
  { name: 'About', targetScreen: 'About', destinationAttr: 'ABOUT 01/05' },
  { name: 'Projects', targetScreen: 'Projects', destinationAttr: 'PROJECTS 02/05' },
  { name: 'Skills', targetScreen: 'Skills', destinationAttr: 'SKILLS 03/05' },
  { name: 'Experience', targetScreen: 'Experience', destinationAttr: 'EXPERIENCE 04/05' },
  { name: 'Contact', targetScreen: 'Contact', destinationAttr: 'CONTACT 05/05' },
];

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, target: ScreenId) => {
    e.preventDefault();
    onNavigate(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(YASH_BIO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-black text-white border-t-8 border-black pt-16 pb-12 px-4 md:px-8 font-mono">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b-4 border-gray-800">
          
          {/* Column 1: Brand & Bio */}
          <div className="md:col-span-5 flex flex-col justify-between gap-6">
            <div>
              <div className="inline-block bg-[#fcd400] text-black font-heading font-extrabold text-2xl md:text-3xl px-4 py-2 border-3 border-black neo-shadow-sm mb-4">
                YASH SAHU
              </div>
              <p className="text-gray-300 text-sm leading-relaxed max-w-md font-sans">
                {YASH_BIO.tagline}
              </p>
            </div>

            {/* Quick Status */}
            <div className="bg-[#111] p-4 border-2 border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#22c55e] rounded-full"></span>
                <span className="text-xs text-gray-300 uppercase font-bold">STATUS: READY TO CODE</span>
              </div>
              <span className="text-xs text-[#fcd400] font-bold uppercase">{YASH_BIO.location}</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-[#fcd400] font-bold text-sm uppercase tracking-wider mb-4 border-b-2 border-gray-800 pb-2">
              [ DIRECTORY ]
            </h4>
            <nav className="flex flex-col gap-3 font-sans text-sm">
              {FOOTER_NAV_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href="#"
                  onClick={(e) => handleNav(e, item.targetScreen)}
                  data-name={item.name}
                  data-destination={item.destinationAttr}
                  className="hover:text-[#fcd400] transition-colors flex items-center justify-between group"
                >
                  <span>{item.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-[#fcd400] transition-colors" />
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Social & Connect */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <h4 className="text-[#fcd400] font-bold text-sm uppercase tracking-wider mb-4 border-b-2 border-gray-800 pb-2">
                [ CONNECT ]
              </h4>
              <div className="flex flex-wrap gap-2 mb-6">
                <a
                  href={YASH_BIO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-900 hover:bg-[#fcd400] hover:text-black text-white p-3 border border-gray-700 transition-colors inline-flex items-center gap-2 text-xs font-bold"
                >
                  <Github className="w-4 h-4" />
                  <span>GITHUB</span>
                </a>
                <a
                  href={YASH_BIO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-900 hover:bg-[#fcd400] hover:text-black text-white p-3 border border-gray-700 transition-colors inline-flex items-center gap-2 text-xs font-bold"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LINKEDIN</span>
                </a>
                <a
                  href={YASH_BIO.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-900 hover:bg-[#fcd400] hover:text-black text-white p-3 border border-gray-700 transition-colors inline-flex items-center gap-2 text-xs font-bold"
                >
                  <Twitter className="w-4 h-4" />
                  <span>TWITTER/X</span>
                </a>
              </div>
            </div>

            {/* Email Strip */}
            <div className="bg-[#222] p-3 border border-gray-700 flex items-center justify-between">
              <span className="text-xs text-gray-400 font-mono overflow-hidden text-ellipsis whitespace-nowrap">
                {YASH_BIO.email}
              </span>
              <button
                onClick={handleCopyEmail}
                className="bg-[#fcd400] text-black text-xs font-bold px-2 py-1 hover:bg-[#ff6b00] transition-colors ml-2 whitespace-nowrap"
              >
                {copied ? 'COPIED!' : 'COPY'}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#fcd400]" />
            <span>© {new Date().getFullYear()} YASH SAHU. BUILT WITH REACT, TAILWIND & MOTION.</span>
          </div>

          <div className="flex items-center gap-2">
            <span>NEO-BRUTALIST ARCHITECTURE</span>
            <span className="w-2 h-2 bg-[#fcd400] rounded-full"></span>
            <span>PROTOTYPE SPEC READY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
