import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, Project } from './types';
import { cyberAudio } from './utils/audio';
import { MatrixBackground } from './components/MatrixBackground';
import { CyberNavbar } from './components/CyberNavbar';
import { CyberHero } from './components/CyberHero';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { SkillsMatrix } from './components/SkillsMatrix';
import { CyberManifesto } from './components/CyberManifesto';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ContactTransmission } from './components/ContactTransmission';
import { CyberFooter } from './components/CyberFooter';
import { InteractiveSandboxModal } from './components/InteractiveSandboxModal';
import { InteractiveTerminal } from './components/InteractiveTerminal';

export default function App() {
  const [lang, setLang] = useState<Language>('es');
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [crtEnabled, setCrtEnabled] = useState(true);
  const [matrixEnabled, setMatrixEnabled] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [activeSandboxProject, setActiveSandboxProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Track scroll position to update active navbar section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'projects', 'skills', 'manifesto', 'experience', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleLang = () => {
    setLang(prev => (prev === 'es' ? 'en' : 'es'));
  };

  const handleToggleAudio = () => {
    const newState = cyberAudio.toggleSound();
    setAudioEnabled(newState);
  };

  const handleToggleCrt = () => {
    setCrtEnabled(prev => !prev);
  };

  const handleToggleMatrix = () => {
    setMatrixEnabled(prev => !prev);
  };

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sectionAnimation = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.5, ease: 'easeOut' }
  };

  return (
    <div className="relative min-h-screen bg-[#05070a] text-[#a7b7c7] selection:bg-[#00ff66] selection:text-black font-mono-code overflow-x-hidden cyber-grid-bg">
      {/* Optional CRT Scanline Effect */}
      {crtEnabled && (
        <div className="crt-overlay fixed inset-0 pointer-events-none z-50 opacity-70" />
      )}

      {/* Optional Matrix Rain Animation Canvas */}
      <MatrixBackground enabled={matrixEnabled} opacity={0.25} />

      {/* Cyber Telemetry & Navbar */}
      <CyberNavbar
        lang={lang}
        onToggleLang={handleToggleLang}
        audioEnabled={audioEnabled}
        onToggleAudio={handleToggleAudio}
        crtEnabled={crtEnabled}
        onToggleCrt={handleToggleCrt}
        matrixEnabled={matrixEnabled}
        onToggleMatrix={handleToggleMatrix}
        onOpenTerminal={() => setTerminalOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Content Sections with Smooth Scroll Entrance Animations */}
      <main className="relative z-10 space-y-4">
        {/* 01. Hero & Profile Identity */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <CyberHero
            lang={lang}
            onOpenTerminal={() => setTerminalOpen(true)}
            onNavigate={handleNavigate}
          />
        </motion.div>

        {/* 02. Projects Showcase with Sandbox Triggers */}
        <motion.div {...sectionAnimation}>
          <ProjectsShowcase
            lang={lang}
            onOpenSandbox={(proj) => setActiveSandboxProject(proj)}
          />
        </motion.div>

        {/* 03. Skills & Arsenal Matrix */}
        <motion.div {...sectionAnimation}>
          <SkillsMatrix lang={lang} />
        </motion.div>

        {/* 04. HSoftware Edict & Manifesto */}
        <motion.div {...sectionAnimation}>
          <CyberManifesto lang={lang} />
        </motion.div>

        {/* 05. Experience & Operations Log */}
        <motion.div {...sectionAnimation}>
          <ExperienceTimeline lang={lang} />
        </motion.div>

        {/* 06. Encrypted Contact Transmission Form */}
        <motion.div {...sectionAnimation}>
          <ContactTransmission lang={lang} />
        </motion.div>
      </main>

      {/* Footer */}
      <CyberFooter
        lang={lang}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* Interactive Sandbox Simulator Modal */}
      <AnimatePresence>
        {activeSandboxProject && (
          <InteractiveSandboxModal
            project={activeSandboxProject}
            lang={lang}
            onClose={() => setActiveSandboxProject(null)}
          />
        )}
      </AnimatePresence>

      {/* Floating Interactive Cyber CLI Terminal */}
      <InteractiveTerminal
        lang={lang}
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onSelectProject={(projId) => {
          handleNavigate('projects');
        }}
        onOpenContact={() => {
          handleNavigate('contact');
        }}
        isFloating={true}
      />
    </div>
  );
}
