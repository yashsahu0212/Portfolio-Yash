import React, { useState } from 'react';
import { ScreenId } from '../types';
import { Menu, X, ToggleLeft, ToggleRight, MousePointer, Volume2, VolumeX } from 'lucide-react';
import { soundFX } from '../utils/sfx';
import { MagneticButton } from './MagneticButton';
import { TextRoll } from './TextRoll';

interface HeaderNavProps {
  currentScreen: ScreenId;
  onNavigate: (destination: ScreenId) => void;
  isCurtainMode: boolean;
  onToggleCurtainMode: () => void;
  isCustomCursorEnabled: boolean;
  onToggleCustomCursor: () => void;
}

const NAV_ITEMS: Array<{
  name: string;
  targetScreen: ScreenId;
  destinationAttr: string;
}> = [
  { name: 'About', targetScreen: 'About - Yash Sahu (Curtain Transitions)', destinationAttr: 'ABOUT 01/05' },
  { name: 'Projects', targetScreen: 'Projects - Yash Sahu', destinationAttr: 'PROJECTS 02/05' },
  { name: 'Skills', targetScreen: 'Skills - Yash Sahu (Curtain Transitions)', destinationAttr: 'SKILLS 03/05' },
  { name: 'Experience', targetScreen: 'Experience - Yash Sahu (Curtain Transitions)', destinationAttr: 'EXPERIENCE 04/05' },
  { name: 'Contact', targetScreen: 'Contact - Yash Sahu', destinationAttr: 'CONTACT 05/05' },
];

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentScreen,
  onNavigate,
  isCurtainMode,
  onToggleCurtainMode,
  isCustomCursorEnabled,
  onToggleCustomCursor,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(() => soundFX.getIsMuted());

  const handleNavClick = (e: React.MouseEvent<HTMLElement>, target: ScreenId) => {
    e.preventDefault();
    soundFX.playClick();
    setMobileMenuOpen(false);
    onNavigate(target);
  };

  const handleToggleSound = () => {
    const muted = soundFX.toggleMute();
    setIsSoundMuted(muted);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fbfaee] border-b-4 border-black px-4 md:px-8 py-3 font-mono">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo Link */}
        <div className="flex items-center gap-2 sm:gap-3">
          <MagneticButton
            onClick={(e) => handleNavClick(e, 'Yash Sahu - Developer Portfolio')}
            className="flex items-center gap-2 text-xl md:text-2xl font-heading font-extrabold text-black bg-[#fcd400] px-3 py-1 border-3 border-black neo-shadow-sm transition-transform"
            id="brand-logo"
          >
            <span className="w-3 h-3 bg-black rounded-full"></span>
            <TextRoll>YASH SAHU</TextRoll>
          </MagneticButton>

          {/* Sound SFX Toggle Badge */}
          <MagneticButton
            onClick={handleToggleSound}
            pullFactor={0.2}
            className="hidden xl:flex items-center gap-1.5 text-xs font-bold bg-black text-white px-2.5 py-1.5 border-2 border-black hover:bg-[#3b82f6] transition-colors"
            title="Toggle Web Audio SFX"
          >
            {!isSoundMuted ? (
              <>
                <Volume2 className="w-4 h-4 text-[#fcd400]" />
                <TextRoll className="text-[#fcd400]">SFX: ON</TextRoll>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-gray-400" />
                <TextRoll className="text-gray-400">SFX: OFF</TextRoll>
              </>
            )}
          </MagneticButton>

          {/* Curtain Mode Badge */}
          <MagneticButton
            onClick={() => {
              soundFX.playToggle(!isCurtainMode);
              onToggleCurtainMode();
            }}
            pullFactor={0.2}
            className="hidden xl:flex items-center gap-1.5 text-xs font-bold bg-black text-white px-2.5 py-1.5 border-2 border-black hover:bg-[#ff6b00] transition-colors"
            title="Toggle Curtain Wipe Effects"
          >
            {isCurtainMode ? (
              <>
                <ToggleRight className="w-4 h-4 text-[#fcd400]" />
                <TextRoll className="text-[#fcd400]">CURTAIN FX: ON</TextRoll>
              </>
            ) : (
              <>
                <ToggleLeft className="w-4 h-4 text-gray-400" />
                <TextRoll>CURTAIN FX: OFF</TextRoll>
              </>
            )}
          </MagneticButton>

          {/* Custom Cursor Toggle Badge */}
          <MagneticButton
            onClick={() => {
              soundFX.playToggle(!isCustomCursorEnabled);
              onToggleCustomCursor();
            }}
            pullFactor={0.2}
            className="hidden lg:flex items-center gap-1.5 text-xs font-bold bg-black text-white px-2.5 py-1.5 border-2 border-black hover:bg-[#22c55e] transition-colors"
            title="Toggle Neo-Brutalist Custom Cursor"
          >
            <MousePointer className={`w-3.5 h-3.5 ${isCustomCursorEnabled ? 'text-[#fcd400]' : 'text-gray-400'}`} />
            <TextRoll className={isCustomCursorEnabled ? 'text-[#fcd400]' : 'text-gray-400'}>
              {`CURSOR: ${isCustomCursorEnabled ? 'ON' : 'OFF'}`}
            </TextRoll>
          </MagneticButton>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = currentScreen.includes(item.name);
            return (
              <a
                key={item.name}
                href="#"
                onClick={(e) => handleNavClick(e, item.targetScreen)}
                onMouseEnter={() => soundFX.playHover()}
                data-name={item.name}
                data-destination={item.destinationAttr}
                className={`group px-3.5 py-1.5 font-bold text-sm border-2 border-black transition-all ${
                  isActive
                    ? 'bg-black text-[#fcd400] neo-shadow-sm'
                    : 'bg-white hover:bg-[#fcd400] text-black hover:neo-shadow-sm'
                }`}
              >
                <TextRoll>{item.name}</TextRoll>
              </a>
            );
          })}
        </nav>

        {/* Available to Hire Badge CTA */}
        <div className="hidden sm:flex items-center gap-2">
          <MagneticButton
            onClick={(e) => handleNavClick(e, 'Contact - Yash Sahu')}
            className="inline-flex items-center gap-2 bg-[#22c55e] text-black font-bold text-xs px-3 py-1.5 border-2 border-black neo-shadow-sm"
          >
            <span className="w-2.5 h-2.5 bg-black rounded-full"></span>
            <TextRoll>AVAILABLE TO BUILD</TextRoll>
          </MagneticButton>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => {
            soundFX.playClick();
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          className="md:hidden bg-[#fcd400] p-2 border-2 border-black neo-shadow-sm text-black"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t-3 border-black bg-white p-4 border-2 border-black neo-shadow-lg flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b-2 border-black">
            <span className="text-xs font-bold uppercase text-gray-500">[ NAVIGATION ]</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={handleToggleSound}
                className="text-xs font-bold bg-black text-[#fcd400] px-2 py-1 border border-black flex items-center gap-1"
              >
                {!isSoundMuted ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
                <span>SFX: {!isSoundMuted ? 'ON' : 'OFF'}</span>
              </button>
              <button
                onClick={() => {
                  soundFX.playToggle(!isCustomCursorEnabled);
                  onToggleCustomCursor();
                }}
                className="text-xs font-bold bg-black text-[#fcd400] px-2 py-1 border border-black flex items-center gap-1"
              >
                <MousePointer className="w-3 h-3" />
                <span>CURSOR: {isCustomCursorEnabled ? 'ON' : 'OFF'}</span>
              </button>
              <button
                onClick={() => {
                  soundFX.playToggle(!isCurtainMode);
                  onToggleCurtainMode();
                }}
                className="text-xs font-bold bg-black text-[#fcd400] px-2 py-1 border border-black"
              >
                FX: {isCurtainMode ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.name}
                href="#"
                onClick={(e) => handleNavClick(e, item.targetScreen)}
                data-name={item.name}
                data-destination={item.destinationAttr}
                className="group px-4 py-2 font-bold text-base border-2 border-black bg-[#fbfaee] hover:bg-[#fcd400] active:bg-[#fcd400] transition-colors"
              >
                <TextRoll>{item.name}</TextRoll>
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
