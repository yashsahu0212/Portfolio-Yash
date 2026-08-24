import React, { useState } from 'react';
import { Project, ArchNode } from '../types';
import { 
  X, 
  ExternalLink, 
  Github, 
  Tag, 
  CheckCircle2, 
  Award, 
  Network, 
  ArrowRight, 
  Cpu, 
  Server, 
  Database, 
  Bot, 
  Globe
} from 'lucide-react';
import { soundFX } from '../utils/sfx';
import { MagneticButton } from './MagneticButton';
import { TextRoll } from './TextRoll';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeNodeIndex, setActiveNodeIndex] = useState<number | null>(null);

  if (!project) return null;

  const getNodeIcon = (type: ArchNode['type']) => {
    switch (type) {
      case 'client':
        return <Globe className="w-4 h-4 text-blue-500" />;
      case 'gateway':
        return <Server className="w-4 h-4 text-orange-500" />;
      case 'service':
        return <Cpu className="w-4 h-4 text-purple-500" />;
      case 'database':
        return <Database className="w-4 h-4 text-green-500" />;
      case 'system':
        return <Bot className="w-4 h-4 text-yellow-500" />;
      default:
        return <Cpu className="w-4 h-4" />;
    }
  };

  const getNodeBadgeColor = (type: ArchNode['type']) => {
    switch (type) {
      case 'client':
        return 'bg-blue-600 text-white';
      case 'gateway':
        return 'bg-orange-600 text-white';
      case 'service':
        return 'bg-purple-600 text-white';
      case 'database':
        return 'bg-green-600 text-white';
      case 'system':
        return 'bg-[#fcd400] text-black';
      default:
        return 'bg-black text-white';
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs font-mono"
      onClick={onClose}
    >
      <div 
        className="bg-[#fbfaee] border-6 border-black neo-shadow-lg w-full max-w-4xl max-h-[92vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Bar */}
        <div className="bg-[#fcd400] border-b-4 border-black p-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 bg-black rounded-full animate-pulse"></span>
            <span className="font-bold text-xs sm:text-sm uppercase tracking-wider text-black">
              PROJECT ARCHITECTURE SPEC // {project.id}
            </span>
          </div>
          <button
            onClick={() => {
              soundFX.playClick();
              onClose();
            }}
            className="bg-black text-white hover:bg-red-600 p-1.5 border-2 border-black transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 space-y-8">
          
          {/* Banner Image */}
          <div className="relative border-4 border-black neo-shadow-sm overflow-hidden h-64 md:h-80 bg-gray-200">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute bottom-3 left-3 bg-black text-[#fcd400] px-3 py-1 text-xs font-bold border-2 border-black">
              ROLE: {project.role}
            </div>
            <div className="absolute top-3 right-3 bg-[#fcd400] text-black px-3 py-1 text-xs font-bold border-2 border-black">
              YEAR: {project.year}
            </div>
          </div>

          {/* Title & Category */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-black text-white px-2.5 py-0.5 text-xs font-bold uppercase">
                {project.category}
              </span>
              {project.featured && (
                <span className="bg-[#22c55e] text-black px-2.5 py-0.5 text-xs font-bold uppercase border border-black flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" /> FEATURED SYSTEM
                </span>
              )}
            </div>

            <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-black uppercase">
              {project.title}
            </h2>
            <p className="text-[#ff6b00] font-bold text-base md:text-lg mt-1 font-sans">
              {project.tagline}
            </p>
          </div>

          {/* Detailed Description */}
          <div className="border-l-4 border-black pl-4 py-1 text-gray-800 text-sm md:text-base leading-relaxed font-sans">
            {project.description}
          </div>

          {/* INTERACTIVE SYSTEM ARCHITECTURE DIAGRAM FLOW */}
          {project.architectureNodes && project.architectureNodes.length > 0 && (
            <div className="bg-black text-white border-4 border-black p-6 neo-shadow-sm space-y-4 font-mono">
              <div className="flex items-center justify-between border-b-2 border-gray-800 pb-3">
                <div className="flex items-center gap-2">
                  <Network className="w-5 h-5 text-[#fcd400]" />
                  <h3 className="font-heading text-lg md:text-xl font-extrabold uppercase text-[#fcd400]">
                    SYSTEM ARCHITECTURE & PIPELINE FLOW
                  </h3>
                </div>
                <span className="text-[10px] bg-gray-800 text-[#22c55e] px-2 py-0.5 border border-gray-700 hidden sm:inline">
                  LIVE PIPELINE NODES
                </span>
              </div>

              {/* Connected Nodes Diagram Track */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                {project.architectureNodes.map((node, idx) => {
                  const isActive = activeNodeIndex === idx;
                  const isLast = idx === project.architectureNodes!.length - 1;

                  return (
                    <div key={idx} className="relative flex flex-col justify-between">
                      <div
                        onMouseEnter={() => {
                          soundFX.playHover();
                          setActiveNodeIndex(idx);
                        }}
                        onMouseLeave={() => setActiveNodeIndex(null)}
                        className={`p-4 border-3 transition-all cursor-pointer space-y-2 flex flex-col justify-between min-h-[150px] ${
                          isActive
                            ? 'bg-[#fcd400] text-black border-white neo-shadow-md -translate-y-1'
                            : 'bg-[#1a1a2e] text-white border-gray-700 hover:border-[#fcd400]'
                        }`}
                      >
                        {/* Node Step & Type Badge */}
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 border border-black ${getNodeBadgeColor(node.type)}`}>
                            {node.type.toUpperCase()}
                          </span>
                          <span className="text-xs font-bold text-gray-400">
                            STEP {node.step}
                          </span>
                        </div>

                        {/* Node Icon & Title */}
                        <div className="space-y-1 pt-1">
                          <div className="flex items-center gap-2">
                            {getNodeIcon(node.type)}
                            <h4 className="font-bold text-sm uppercase leading-tight">
                              {node.name}
                            </h4>
                          </div>
                          <p className={`text-[11px] font-sans leading-tight line-clamp-3 ${isActive ? 'text-black' : 'text-gray-300'}`}>
                            {node.desc}
                          </p>
                        </div>

                        {/* Node Status */}
                        {node.status && (
                          <div className="pt-2 border-t border-gray-600 flex items-center justify-between text-[9px] font-bold">
                            <span className={isActive ? 'text-black font-extrabold' : 'text-[#22c55e]'}>
                              ● {node.status}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Directional Connector Arrow */}
                      {!isLast && (
                        <div className="hidden lg:flex items-center justify-center absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-black text-[#fcd400] p-1 rounded-full border border-white">
                          <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Key Engineering Highlights */}
          <div className="bg-white p-5 border-3 border-black neo-shadow-sm space-y-3">
            <h3 className="font-bold text-sm uppercase text-black flex items-center gap-2 border-b-2 border-black pb-2">
              <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
              ENGINEERING HIGHLIGHTS & ARCHITECTURE
            </h3>
            <ul className="space-y-2 font-sans text-sm text-gray-800">
              {project.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-mono text-[#ff6b00] font-bold">0{idx + 1}.</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies Tag List */}
          <div>
            <h4 className="font-bold text-xs uppercase text-gray-600 mb-2 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> TECH STACK USED:
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-[#fbfaee] text-black border-2 border-black px-3 py-1 text-xs font-bold neo-shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t-2 border-gray-300 flex flex-wrap items-center gap-4">
            <MagneticButton
              onClick={() => {
                soundFX.playClick();
                window.open(project.githubUrl, '_blank');
              }}
              className="bg-black text-white hover:bg-[#fcd400] hover:text-black px-5 py-2.5 font-bold text-sm border-3 border-black neo-shadow-sm flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              <TextRoll>SOURCE CODE</TextRoll>
            </MagneticButton>

            <MagneticButton
              onClick={(e) => {
                soundFX.playClick();
                if (project.demoUrl === '#' || project.demoUrl.includes('github.com')) {
                  window.open(project.githubUrl, '_blank');
                } else {
                  window.open(project.demoUrl, '_blank');
                }
              }}
              className="bg-[#fcd400] text-black hover:bg-[#ff6b00] hover:text-white px-5 py-2.5 font-bold text-sm border-3 border-black neo-shadow-sm flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              <TextRoll>LAUNCH LIVE REPO</TextRoll>
            </MagneticButton>
          </div>

        </div>
      </div>
    </div>
  );
};
