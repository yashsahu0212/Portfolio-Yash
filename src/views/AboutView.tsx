import React, { useState } from 'react';
import { ScreenId } from '../types';
import { YASH_BIO, TESTIMONIALS_DATA } from '../data/portfolioData';
import { ScrollRevealText } from '../components/ScrollRevealText';

interface AboutViewProps {
  onNavigate: (destination: ScreenId) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'bio' | 'philosophy' | 'story'>('bio');
  const [resumeDownloaded, setResumeDownloaded] = useState(false);

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = YASH_BIO.resumeUrl || '/resume.pdf';
    link.download = 'Resume_Yash_Sahu.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setResumeDownloaded(true);
    setTimeout(() => setResumeDownloaded(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-12 font-sans">
      
      {/* Top Section Banner */}
      <div className="bg-[#fcd400] border-6 border-black neo-shadow-lg p-6 md:p-10 font-mono">
        <div className="space-y-2">
          <div className="inline-block bg-black text-[#fcd400] text-xs font-bold px-3 py-1 uppercase">
            [ ABOUT ]
          </div>
          <ScrollRevealText as="h1" className="text-4xl sm:text-6xl font-heading font-extrabold uppercase text-black leading-none">
            WHO IS YASH SAHU?
          </ScrollRevealText>
          <p className="text-black font-bold text-base md:text-lg max-w-2xl font-sans">
            <span className="bg-black text-[#fcd400] px-2.5 py-0.5 border-2 border-black font-heading">Full-Stack Software Engineer</span>, UI Craftsman, and Technical Writer.
          </p>
        </div>
      </div>

      {/* Main Grid: Bio & Quick Facts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Tabbed Bio */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Tab Selector */}
          <div className="flex border-4 border-black font-mono text-sm bg-white neo-shadow-sm">
            <button
              onClick={() => setActiveTab('bio')}
              className={`flex-1 py-3 px-4 font-bold border-r-3 border-black uppercase transition-colors ${
                activeTab === 'bio' ? 'bg-black text-[#fcd400]' : 'hover:bg-gray-100 text-black'
              }`}
            >
              Background
            </button>
            <button
              onClick={() => setActiveTab('philosophy')}
              className={`flex-1 py-3 px-4 font-bold border-r-3 border-black uppercase transition-colors ${
                activeTab === 'philosophy' ? 'bg-black text-[#fcd400]' : 'hover:bg-gray-100 text-black'
              }`}
            >
              Philosophy
            </button>
            <button
              onClick={() => setActiveTab('story')}
              className={`flex-1 py-3 px-4 font-bold uppercase transition-colors ${
                activeTab === 'story' ? 'bg-black text-[#fcd400]' : 'hover:bg-gray-100 text-black'
              }`}
            >
              Timeline
            </button>
          </div>

          {/* Tab Content 1: Bio */}
          {activeTab === 'bio' && (
            <div className="bg-white border-4 border-black p-6 md:p-8 neo-shadow-sm space-y-6">
              <h2 className="text-2xl md:text-3xl font-heading font-extrabold uppercase text-black">
                PASSIONATE ABOUT SPEED, DESIGN & SYSTEM ARCHITECTURE
              </h2>

              <div className="space-y-4 text-gray-800 text-base leading-relaxed">
                <p>
                  I am a Full-Stack Software Engineer with hands-on experience crafting scalable web applications, Python/Node backends, and responsive React interfaces. Based in {YASH_BIO.location}, I thrive at the intersection of complex systems engineering and delightful frontend user interfaces.
                </p>
                <p>
                  Throughout my projects, I've built temperature predictors, resilience analyzer tools, cooling law physics calculators, and Python hotel management platforms.
                </p>
              </div>

              {/* Core Strengths Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t-2 border-black font-mono text-xs">
                <div className="bg-[#fbfaee] p-4 border-2 border-black">
                  <span className="font-bold text-[#ff6b00] block mb-1">▶ FRONTEND</span>
                  <span className="text-black">React 19, TypeScript, Tailwind CSS, State Machines, WebSockets.</span>
                </div>
                <div className="bg-[#fbfaee] p-4 border-2 border-black">
                  <span className="font-bold text-[#ff6b00] block mb-1">▶ BACKEND & SYSTEMS</span>
                  <span className="text-black">Python, Node.js, Express, PostgreSQL, REST APIs, Machine Learning.</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 2: Philosophy */}
          {activeTab === 'philosophy' && (
            <div className="bg-white border-4 border-black p-6 md:p-8 neo-shadow-sm space-y-6">
              <h2 className="text-2xl md:text-3xl font-heading font-extrabold uppercase text-black">
                CORE PRINCIPLES
              </h2>

              <div className="space-y-4 font-mono text-sm">
                <div className="p-4 bg-[#fbfaee] border-3 border-black space-y-2">
                  <span className="bg-black text-[#fcd400] px-2 py-0.5 font-bold">1. STRICT TYPE SAFETY</span>
                  <p className="font-sans text-gray-800 text-sm">
                    Catch errors at compile-time, not in production. Complete type definitions across API contracts, props, and database schemas eliminate runtime bugs.
                  </p>
                </div>

                <div className="p-4 bg-[#fbfaee] border-3 border-black space-y-2">
                  <span className="bg-black text-[#fcd400] px-2 py-0.5 font-bold">2. PERFORMANCE FIRST</span>
                  <p className="font-sans text-gray-800 text-sm">
                    Aim for 60 FPS interactions and sub-second page loads. Minimize bundle sizes, leverage server caching, and eliminate unneeded re-renders.
                  </p>
                </div>

                <div className="p-4 bg-[#fbfaee] border-3 border-black space-y-2">
                  <span className="bg-black text-[#fcd400] px-2 py-0.5 font-bold">3. CLARITY OVER COMPLEXITY</span>
                  <p className="font-sans text-gray-800 text-sm">
                    Bold typography, high-contrast borders, and spacious layouts focus user attention on content without hiding behind low-contrast aesthetic fluff.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 3: Story */}
          {activeTab === 'story' && (
            <div className="bg-white border-4 border-black p-6 md:p-8 neo-shadow-sm space-y-6">
              <h2 className="text-2xl md:text-3xl font-heading font-extrabold uppercase text-black">
                EDUCATION & TIMELINE
              </h2>

              <div className="space-y-6 font-mono text-xs">
                <div className="border-l-4 border-black pl-4 space-y-1">
                  <span className="bg-[#fcd400] text-black px-2 py-0.5 font-bold">2025 - PRESENT</span>
                  <h3 className="text-base font-bold text-black font-heading mt-1">B.Tech in Computer Science & Engineering</h3>
                  <p className="font-sans text-gray-700 text-xs">VIT Bhopal University — Focus on Software Development, InfoSec, and Web Architectures.</p>
                </div>

                <div className="border-l-4 border-black pl-4 space-y-1">
                  <span className="bg-[#22c55e] text-black px-2 py-0.5 font-bold">2 YRS (11TH & 12TH)</span>
                  <h3 className="text-base font-bold text-black font-heading mt-1">Higher Secondary Schooling (Class 11th - 12th)</h3>
                  <p className="font-sans text-gray-700 text-xs">Vardhman International School, Indore — Science & Mathematics (PCM).</p>
                </div>

                <div className="border-l-4 border-black pl-4 space-y-1">
                  <span className="bg-[#ff6b00] text-white px-2 py-0.5 font-bold">10 YEARS</span>
                  <h3 className="text-base font-bold text-black font-heading mt-1">Primary & Secondary Schooling</h3>
                  <p className="font-sans text-gray-700 text-xs">Trinity Convent Higher Secondary School, Vidisha — Foundational education and academic growth.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Bio Quick Card & Testimonials */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Yash Profile Card */}
          <div className="group bg-white border-4 border-black p-6 neo-shadow-sm space-y-4 font-mono">
            <div className="w-full h-56 bg-gray-200 border-3 border-black overflow-hidden relative">
              <img
                src={YASH_BIO.avatar}
                alt="Yash Sahu Profile"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-gray-300 pb-1.5">
                <span className="text-gray-500 font-bold">LOCATION:</span>
                <span className="font-bold text-black">{YASH_BIO.location}</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-300 pb-1.5">
                <span className="text-gray-500 font-bold">ROLE:</span>
                <span className="font-bold text-black">CS Student & Developer</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-300 pb-1.5">
                <span className="text-gray-500 font-bold">COLLEGE:</span>
                <span className="font-bold text-black">VIT Bhopal</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 font-bold">EMAIL:</span>
                <span className="font-bold text-[#ff6b00] underline truncate max-w-[220px]">{YASH_BIO.email}</span>
              </div>
            </div>

            {/* Resume download button */}
            <button
              onClick={handleDownloadResume}
              className="w-full bg-[#fcd400] text-black hover:bg-black hover:text-[#fcd400] py-2.5 font-bold text-xs border-2 border-black neo-shadow-sm transition-colors flex items-center justify-center gap-2 uppercase"
            >
              <span>{resumeDownloaded ? 'RESUME DOWNLOADED!' : 'DOWNLOAD RESUME (PDF)'}</span>
            </button>
          </div>

          {/* Client & Peer Testimonials */}
          <div className="space-y-4">
            <span className="bg-black text-white font-mono text-xs font-bold px-3 py-1 uppercase block text-center border-2 border-black">
              [ WHAT TEAMMATES & PEERS SAY ]
            </span>

            {TESTIMONIALS_DATA.map((t) => (
              <div key={t.id} className="bg-[#fbfaee] border-3 border-black p-4 neo-shadow-sm space-y-3 font-sans">
                <p className="text-xs text-gray-800 italic leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-gray-300">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-8 h-8 rounded-full border-2 border-black object-cover"
                  />
                  <div className="font-mono text-[11px]">
                    <div className="font-bold text-black">{t.author}</div>
                    <div className="text-gray-500">{t.role}, {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};
