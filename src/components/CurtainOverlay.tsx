import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { YashSignature } from './YashSignature';
import { soundFX } from '../utils/sfx';

interface CurtainOverlayProps {
  isVisible: boolean;
  targetTitle: string;
  stepNumber: string;
  isWelcome?: boolean;
}

export const CurtainOverlay: React.FC<CurtainOverlayProps> = ({
  isVisible,
  targetTitle,
  stepNumber,
  isWelcome = false,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isVisible) {
      soundFX.playSwoosh();
    }
  }, [isVisible]);

  useEffect(() => {
    if (isVisible && isWelcome) {
      setProgress(0);

      const interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 4;
          if (next >= 100) {
            clearInterval(interval);
            return 100;
          }
          return next;
        });
      }, 55);

      return () => clearInterval(interval);
    }
  }, [isVisible, isWelcome]);

  // Clean formatted screen destination title
  const cleanTitle = isWelcome
    ? 'YASH SAHU'
    : targetTitle.includes('Portfolio') || targetTitle.toLowerCase() === 'home'
    ? 'PORTFOLIO'
    : targetTitle.replace('(Curtain Transitions)', '').replace('- Yash Sahu', '').trim().toUpperCase();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          onClick={() => soundFX.unlockAudio()}
          className="fixed inset-0 z-50 pointer-events-auto overflow-hidden font-mono select-none bg-[#09090b] text-white flex flex-col justify-between p-6 md:p-14"
          initial={{ y: isWelcome ? '0%' : '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{
            duration: 0.65,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          {/* Top Header Status Bar */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4 z-20">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-[#fcd400] rounded-full animate-pulse"></span>
              <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
                {isWelcome ? 'YASH SAHU // OFFICIAL PORTFOLIO' : `NAVIGATING // ${cleanTitle}`}
              </span>
            </div>

            <div className="text-xs font-bold text-[#fcd400] bg-zinc-900/80 px-3 py-1 border border-zinc-800 tracking-wider">
              {stepNumber}
            </div>
          </div>

          {/* Center Signature & Typography Reveal Section (Lando Norris style) */}
          <div className="my-auto py-10 flex flex-col items-center justify-center text-center z-20 w-full max-w-4xl mx-auto space-y-6">
            
            {/* Animated Signature SVG */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="relative"
            >
              <YashSignature
                animated={isVisible}
                duration={1.2}
                width={320}
                height={100}
                color="#fcd400"
                strokeWidth={2.8}
              />
            </motion.div>

            {/* Bold Lando Norris Style Modern Typography */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
              className="space-y-2"
            >
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-heading uppercase font-extrabold tracking-tighter text-white leading-none">
                {cleanTitle}
              </h1>

              <div className="flex items-center justify-center gap-2 pt-2">
                <span className="h-[2px] w-8 bg-[#fcd400]"></span>
                <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-zinc-400 font-bold">
                  {isWelcome ? 'FULL-STACK ENGINEER & UI ARCHITECT' : 'INTERACTIVE EXPERIENCE'}
                </p>
                <span className="h-[2px] w-8 bg-[#fcd400]"></span>
              </div>
            </motion.div>
          </div>

          {/* Bottom Footer Section with Minimalist Loader & Progress */}
          <div className="border-t border-zinc-800 pt-6 flex flex-col sm:flex-row justify-between items-end gap-4 z-20">
            <div className="space-y-2 w-full sm:w-auto">
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#fcd400] rounded-full"></span>
                <span>{isWelcome ? 'INITIALIZING EXPERIENCE' : 'LOADING SECTION'}</span>
              </div>

              {/* Sleek Minimal Progress Line */}
              {isWelcome && (
                <div className="w-full sm:w-64 bg-zinc-900 h-1.5 rounded-full overflow-hidden border border-zinc-800">
                  <motion.div
                    className="bg-[#fcd400] h-full"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: 'easeOut' }}
                  />
                </div>
              )}
            </div>

            {/* Gigantic Modern Minimal Percentage Counter */}
            {isWelcome && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-6xl sm:text-8xl font-heading font-extrabold text-white leading-none tracking-tighter select-none font-mono"
              >
                <span className="text-[#fcd400]">{progress < 10 ? `0${progress}` : progress}</span>
                <span className="text-2xl sm:text-4xl text-zinc-600 font-sans">%</span>
              </motion.div>
            )}
          </div>

          {/* Subtle Background Lighting Glow */}
          <div className="absolute inset-0 bg-radial from-[#fcd400]/5 via-transparent to-transparent pointer-events-none z-10" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
