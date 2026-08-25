import React, { useState, useEffect, useRef } from 'react';
import { ScreenId, Project } from './types';
import { HeaderNav } from './components/HeaderNav';
import { Footer } from './components/Footer';
import { CurtainOverlay } from './components/CurtainOverlay';
import { ProjectModal } from './components/ProjectModal';
import { CustomCursor } from './components/CustomCursor';
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { ProjectsView } from './views/ProjectsView';
import { SkillsView } from './views/SkillsView';
import { ExperienceView } from './views/ExperienceView';
import { ContactView } from './views/ContactView';

// Helper to compute step indicator string for curtain overlay
const getStepNumber = (screen: ScreenId): string => {
  if (screen.includes('About')) return '01 / ABOUT';
  if (screen.includes('Projects')) return '02 / PROJECTS';
  if (screen.includes('Skills')) return '03 / SKILLS';
  if (screen.includes('Experience')) return '04 / EXPERIENCE';
  if (screen.includes('Contact')) return '05 / CONTACT';
  return '00 / HOME';
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('Home');
  const [isCurtainMode, setIsCurtainMode] = useState<boolean>(true);
  const [isCurtainActive, setIsCurtainActive] = useState<boolean>(true);
  const [isWelcome, setIsWelcome] = useState<boolean>(true);
  const [curtainTargetTitle, setCurtainTargetTitle] = useState<string>('YASH SAHU PORTFOLIO');
  const [curtainStepNumber, setCurtainStepNumber] = useState<string>('00 / WELCOME');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCustomCursorEnabled, setIsCustomCursorEnabled] = useState<boolean>(true);

  const isTransitioningRef = useRef<boolean>(true);
  const timeoutIdsRef = useRef<NodeJS.Timeout[]>([]);

  const clearPendingTimeouts = () => {
    timeoutIdsRef.current.forEach((id) => clearTimeout(id));
    timeoutIdsRef.current = [];
  };

  useEffect(() => {
    // Initial welcome loading curtain when user opens or refreshes website
    const t1 = setTimeout(() => {
      setIsCurtainActive(false);
    }, 2000);

    const t2 = setTimeout(() => {
      setIsWelcome(false);
      isTransitioningRef.current = false;
    }, 2500);

    timeoutIdsRef.current = [t1, t2];

    return () => clearPendingTimeouts();
  }, []);

  const handleNavigate = (destination: ScreenId) => {
    // Prevent duplicate navigation or rapid click race conditions
    if (destination === currentScreen && !isTransitioningRef.current) return;
    if (isTransitioningRef.current) return;

    const triggerCurtain = isCurtainMode;

    if (triggerCurtain) {
      isTransitioningRef.current = true;
      clearPendingTimeouts();

      setCurtainTargetTitle(destination);
      setCurtainStepNumber(getStepNumber(destination));
      setIsCurtainActive(true);

      // Phase 1: Swap screen content halfway through curtain wipe (300ms)
      const t1 = setTimeout(() => {
        setCurrentScreen(destination);
        window.scrollTo({ top: 0, behavior: 'auto' });
      }, 300);

      // Phase 2: Trigger curtain exit slide (480ms)
      const t2 = setTimeout(() => {
        setIsCurtainActive(false);
      }, 480);

      // Phase 3: Transition finished, unlock navigation for next click (830ms)
      const t3 = setTimeout(() => {
        isTransitioningRef.current = false;
      }, 830);

      timeoutIdsRef.current = [t1, t2, t3];
    } else {
      setCurrentScreen(destination);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Render current screen view component
  const renderView = () => {
    if (currentScreen.includes('About')) {
      return <AboutView onNavigate={handleNavigate} />;
    }
    if (currentScreen.includes('Projects')) {
      return (
        <ProjectsView
          onNavigate={handleNavigate}
          onSelectProject={(project) => setSelectedProject(project)}
        />
      );
    }
    if (currentScreen.includes('Skills')) {
      return (
        <SkillsView
          onNavigate={handleNavigate}
          onSelectProject={(project) => setSelectedProject(project)}
        />
      );
    }
    if (currentScreen.includes('Experience')) {
      return <ExperienceView onNavigate={handleNavigate} />;
    }
    if (currentScreen.includes('Contact')) {
      return <ContactView onNavigate={handleNavigate} />;
    }
    // Default Home Screen
    return (
      <HomeView
        onNavigate={handleNavigate}
        onSelectProject={(project) => setSelectedProject(project)}
        isCustomCursorEnabled={isCustomCursorEnabled}
        onToggleCustomCursor={() => setIsCustomCursorEnabled(!isCustomCursorEnabled)}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fbfaee] text-black selection:bg-[#fcd400] selection:text-black">
      
      {/* Neobrutalism Custom Cursor */}
      <CustomCursor isEnabled={isCustomCursorEnabled} />

      {/* Full-Screen Curtain Overlay */}
      <CurtainOverlay
        isVisible={isCurtainActive}
        targetTitle={curtainTargetTitle}
        stepNumber={curtainStepNumber}
        isWelcome={isWelcome}
      />

      {/* Main App Layout */}
      <div>
        <HeaderNav
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          isCurtainMode={isCurtainMode}
          onToggleCurtainMode={() => setIsCurtainMode(!isCurtainMode)}
          isCustomCursorEnabled={isCustomCursorEnabled}
          onToggleCustomCursor={() => setIsCustomCursorEnabled(!isCustomCursorEnabled)}
        />

        {/* Current Screen View Canvas */}
        <main className="min-h-[calc(100vh-16rem)]">
          {renderView()}
        </main>
      </div>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
