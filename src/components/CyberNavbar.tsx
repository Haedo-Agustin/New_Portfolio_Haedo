import React, { useState } from 'react';
import { Terminal, Volume2, VolumeX, Tv, Binary, Globe, Menu, X } from 'lucide-react';
import { Language } from '../types';
import { cyberAudio } from '../utils/audio';

interface CyberNavbarProps {
  lang: Language;
  onToggleLang: () => void;
  audioEnabled: boolean;
  onToggleAudio: () => void;
  crtEnabled: boolean;
  onToggleCrt: () => void;
  matrixEnabled: boolean;
  onToggleMatrix: () => void;
  onOpenTerminal: () => void;
  activeSection: string;
}

export function CyberNavbar({
  lang,
  onToggleLang,
  audioEnabled,
  onToggleAudio,
  crtEnabled,
  onToggleCrt,
  matrixEnabled,
  onToggleMatrix,
  onOpenTerminal,
  activeSection,
}: CyberNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: lang === 'es' ? 'Inicio' : 'Home' },
    { id: 'projects', label: lang === 'es' ? 'Proyectos' : 'Projects' },
    { id: 'skills', label: lang === 'es' ? 'Skills' : 'Skills' },
    { id: 'manifesto', label: lang === 'es' ? 'Manifiesto' : 'Manifesto' },
    { id: 'experience', label: lang === 'es' ? 'Experiencia' : 'Experience' },
    { id: 'contact', label: lang === 'es' ? 'Contacto' : 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    cyberAudio.playClick();
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#05070a]/85 backdrop-blur-md border-b border-[#00ff66]/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Brand */}
          <div
            onClick={() => handleNavClick('hero')}
            onMouseEnter={() => cyberAudio.playHover()}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-black border border-[#00ff66] flex items-center justify-center">
              <span className="font-cyber font-extrabold text-[#00ff66] text-base sm:text-lg">HS</span>
            </div>
            <span className="font-cyber font-bold tracking-wider text-white text-sm sm:text-base">
              HSOFTWARE
            </span>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  onMouseEnter={() => cyberAudio.playHover()}
                  className={`px-3 py-1.5 text-xs font-mono tracking-wider border-b-2 transition-colors ${
                    isActive
                      ? 'text-[#00ff66] border-[#00ff66]'
                      : 'text-[#94a3b8] border-transparent hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              id="btn-open-terminal"
              onClick={() => {
                cyberAudio.playClick();
                onOpenTerminal();
              }}
              onMouseEnter={() => cyberAudio.playHover()}
              className="px-2.5 py-1.5 text-xs bg-[#00ff66]/10 hover:bg-[#00ff66]/25 text-[#00ff66] border border-[#00ff66]/50 flex items-center gap-1.5 font-mono transition-colors"
              title={lang === 'es' ? 'Abrir terminal' : 'Open terminal'}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-bold">CLI</span>
            </button>

            <button
              id="btn-toggle-audio"
              onClick={onToggleAudio}
              onMouseEnter={() => cyberAudio.playHover()}
              className={`p-1.5 text-xs border transition-colors ${
                audioEnabled
                  ? 'text-[#00ff66] border-[#00ff66]/50 bg-[#00ff66]/10'
                  : 'text-[#64748b] border-[#334155] hover:text-[#94a3b8]'
              }`}
              title={audioEnabled ? 'Sonido: activo' : 'Sonido: silenciado'}
            >
              {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              id="btn-toggle-crt"
              onClick={() => {
                cyberAudio.playClick();
                onToggleCrt();
              }}
              onMouseEnter={() => cyberAudio.playHover()}
              className={`hidden sm:flex p-1.5 text-xs border transition-colors ${
                crtEnabled
                  ? 'text-[#00f0ff] border-[#00f0ff]/50 bg-[#00f0ff]/10'
                  : 'text-[#64748b] border-[#334155] hover:text-[#94a3b8]'
              }`}
              title={crtEnabled ? 'Scanlines: ON' : 'Scanlines: OFF'}
            >
              <Tv className="w-4 h-4" />
            </button>

            <button
              id="btn-toggle-matrix"
              onClick={() => {
                cyberAudio.playClick();
                onToggleMatrix();
              }}
              onMouseEnter={() => cyberAudio.playHover()}
              className={`hidden sm:flex p-1.5 text-xs border transition-colors ${
                matrixEnabled
                  ? 'text-[#00ff66] border-[#00ff66]/50 bg-[#00ff66]/10'
                  : 'text-[#64748b] border-[#334155] hover:text-[#94a3b8]'
              }`}
              title={matrixEnabled ? 'Fondo matrix: ON' : 'Fondo matrix: OFF'}
            >
              <Binary className="w-4 h-4" />
            </button>

            <button
              id="btn-toggle-language"
              onClick={() => {
                cyberAudio.playClick();
                onToggleLang();
              }}
              onMouseEnter={() => cyberAudio.playHover()}
              className="px-2 py-1 text-xs border border-[#334155] hover:border-[#00ff66]/50 text-[#cbd5e1] hover:text-[#00ff66] font-mono flex items-center gap-1 transition-colors"
              title={lang === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish'}
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="font-bold">{lang.toUpperCase()}</span>
            </button>

            <button
              id="btn-mobile-menu"
              onClick={() => {
                cyberAudio.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-1.5 text-[#94a3b8] hover:text-white border border-[#334155]"
              title="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070a0f] border-b border-[#00ff66]/30 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="w-full text-left px-3 py-2.5 text-sm font-mono text-[#cbd5e1] hover:text-[#00ff66] hover:bg-[#00ff66]/10"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
