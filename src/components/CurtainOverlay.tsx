import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Terminal, ArrowRight, Code2, Play } from 'lucide-react';
import { soundFX } from '../utils/sfx';

interface CurtainOverlayProps {
  isVisible: boolean;
  targetTitle: string;
  stepNumber: string;
  isWelcome?: boolean;
}

const LOG_MESSAGES = [
  'MOUNTING VIRTUAL DOM & REACT 19 CANVAS...',
  'SYNTHESIZING WEB AUDIO SFX ENGINE...',
  'INITIALIZING 3D MAGNETIC PARALLAX BUFFERS...',
  'COMPILING TECH MATRIX & SKILL BENCHMARKS...',
  'SYSTEM BOOT COMPLETE // ENVIRONMENT 100% READY',
];

export const CurtainOverlay: React.FC<CurtainOverlayProps> = ({
  isVisible,
  targetTitle,
  stepNumber,
  isWelcome = false,
}) => {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    if (isVisible) {
      soundFX.playSwoosh();
    }
  }, [isVisible]);

  useEffect(() => {
    if (isVisible && isWelcome) {
      setProgress(0);
      setLogIndex(0);

      const interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 5;
          if (next >= 100) {
            clearInterval(interval);
            return 100;
          }
          if (next > 80) setLogIndex(4);
          else if (next > 60) setLogIndex(3);
          else if (next > 40) setLogIndex(2);
          else if (next > 20) setLogIndex(1);
          return next;
        });
      }, 95);

      return () => clearInterval(interval);
    }
  }, [isVisible, isWelcome]);

  const handleScreenClick = () => {
    soundFX.unlockAudio();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div
          onClick={handleScreenClick}
          className="fixed inset-0 z-50 pointer-events-auto overflow-hidden font-mono select-none"
        >
          {/* Staggered Shutter Panels (3 Vertical Panels for Awwwards Shutter Exit) */}
          <div className="absolute inset-0 flex">
            {[0, 1, 2].map((panelIdx) => (
              <motion.div
                key={panelIdx}
                className="h-full flex-1 bg-[#fcd400] border-r-4 border-black last:border-r-0"
                initial={isWelcome ? { y: '0%' } : { y: '-100%' }}
                animate={{ y: '0%' }}
                exit={{ y: '-100%' }}
                transition={{
                  duration: 0.5,
                  delay: isWelcome ? panelIdx * 0.08 : 0,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            ))}
          </div>

          {/* Curtain Overlay Content Layer */}
          <motion.div
            className="absolute inset-0 z-10 flex flex-col justify-between p-6 md:p-12 text-black border-8 border-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Top Header Marquee Ticker */}
            <div className="flex items-center justify-between border-b-4 border-black pb-4 bg-[#fcd400]/80 backdrop-blur-xs z-20">
              <div className="flex items-center gap-3 overflow-hidden">
                <span className="w-3.5 h-3.5 bg-black rounded-full animate-ping shrink-0"></span>
                <div className="font-bold text-xs md:text-sm tracking-wider uppercase whitespace-nowrap">
                  {isWelcome ? (
                    <span>YASH SAHU PORTFOLIO 2025 ★ SENIOR FULL-STACK ENGINEER ★ REACT 19 ★ VITE ★ STRICT TYPESCRIPT ★</span>
                  ) : (
                    <span>HIGH-SPEED ROUTING ENGINE ★ STAGGERED SHUTTER TRANSITION ★ VIRTUAL CANVAS DISPATCH ★</span>
                  )}
                </div>
              </div>
              <div className="bg-black text-[#fcd400] font-bold text-xs md:text-sm px-3 py-1 border-2 border-black shrink-0">
                {stepNumber}
              </div>
            </div>

            {/* Center Content Section */}
            <div className="my-auto py-8 flex flex-col items-start justify-between gap-6 z-20 w-full">
              <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-1.5 text-xs md:text-sm uppercase tracking-widest neo-shadow-sm">
                {isWelcome ? <Code2 className="w-4 h-4 text-[#fcd400]" /> : <Sparkles className="w-4 h-4 text-[#fcd400]" />}
                <span>{isWelcome ? 'SYSTEM INITIALIZATION // BOOT SEQUENCE' : 'NAVIGATING DESTINATION'}</span>
              </div>

              {/* Huge Bold Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="text-5xl sm:text-7xl md:text-9xl font-heading uppercase font-extrabold tracking-tight text-black leading-none"
              >
                {isWelcome 
                  ? 'YASH SAHU' 
                  : (targetTitle.includes('Yash Sahu - Developer Portfolio') 
                      ? 'HOME' 
                      : targetTitle.replace('(Curtain Transitions)', '').replace('- Yash Sahu', '').trim())
                }
              </motion.h1>

              {isWelcome ? (
                <div className="space-y-4 w-full max-w-2xl">
                  <p className="font-bold text-lg md:text-2xl text-black uppercase tracking-tight">
                    Full-Stack Software Engineer & UI Architect
                  </p>

                  {/* Terminal Diagnostic Stream */}
                  <div className="bg-black text-[#22c55e] p-3.5 border-3 border-black text-xs font-bold neo-shadow-sm space-y-1">
                    <div className="flex items-center gap-2 text-[#fcd400] border-b border-gray-800 pb-1">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>DIAGNOSTIC STREAM // STATUS OK</span>
                    </div>
                    <p className="pt-1">{`> ${LOG_MESSAGES[logIndex]}`}</p>
                  </div>

                  {/* Progress Bar Container */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-xs font-bold uppercase">
                      <span>MOUNTING ENVIRONMENT CANVAS</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-black/15 h-7 border-3 border-black p-0.5 relative overflow-hidden">
                      <motion.div
                        className="bg-black h-full"
                        style={{ width: `${progress}%` }}
                        transition={{ ease: 'linear' }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 text-xl font-bold mt-2">
                  <Terminal className="w-6 h-6" />
                  <span>ROUTING CANVAS ENGINE ACTIVE</span>
                  <ArrowRight className="w-6 h-6 animate-pulse" />
                </div>
              )}
            </div>

            {/* Bottom Footer Section with Gigantic Percentage Counter */}
            <div className="border-t-4 border-black pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 z-20">
              <div className="space-y-1">
                <div className="text-xs md:text-sm font-bold uppercase tracking-wider">
                  {isWelcome
                    ? '[STATUS 200 OK] VDOM MOUNTED // READY TO ENTER'
                    : '[SYSTEM] ROUTING UI BUFFERS & CANVAS...'}
                </div>
                <div className="text-[11px] font-bold text-gray-700 uppercase">
                  💡 CLICK ANYWHERE TO UNLOCK AUDIO & INTERACTION
                </div>
              </div>

              {/* Gigantic Awwwards Percentage Counter */}
              {isWelcome && (
                <div className="text-6xl sm:text-8xl md:text-9xl font-heading font-extrabold text-black leading-none tracking-tighter select-none">
                  {progress < 10 ? `0${progress}` : progress}%
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
