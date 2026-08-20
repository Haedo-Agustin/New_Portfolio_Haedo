import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Volume2, 
  VolumeX, 
  Tv, 
  Binary, 
  Globe, 
  Menu, 
  X, 
  Radio, 
  ShieldCheck 
} from 'lucide-react';
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
  const [timeUtc, setTimeUtc] = useState('');
  const [blockHeight, setBlockHeight] = useState(894320);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTimeUtc(now.toISOString().substring(11, 19) + ' UTC');
    }, 1000);

    const blockTimer = setInterval(() => {
      setBlockHeight(prev => prev + 1);
    }, 12000);

    setTimeUtc(new Date().toISOString().substring(11, 19) + ' UTC');

    return () => {
      clearInterval(timer);
      clearInterval(blockTimer);
    };
  }, []);

  const navItems = [
    { id: 'hero', label: lang === 'es' ? 'INICIO' : 'HOME', index: '01' },
    { id: 'projects', label: lang === 'es' ? 'PROYECTOS' : 'PROJECTS', index: '02' },
    { id: 'skills', label: lang === 'es' ? 'ARSENAL' : 'SKILLS', index: '03' },
    { id: 'manifesto', label: lang === 'es' ? 'EDICTO' : 'EDICT', index: '04' },
    { id: 'experience', label: lang === 'es' ? 'HISTORIAL' : 'LOGS', index: '05' },
    { id: 'contact', label: lang === 'es' ? 'TRANSMISIÓN' : 'TRANSMIT', index: '06' },
  ];

  const handleNavClick = (id: string) => {
    cyberAudio.playClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#05070a]/90 backdrop-blur-md border-b border-[#00ff66]/20">
      {/* Top telemetry bar */}
      <div className="hidden lg:flex items-center justify-between px-4 py-1 bg-[#090d14] text-[11px] text-[#52708d] border-b border-[#00ff66]/10 font-mono tracking-wider">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-[#00ff66]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff66] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff66]"></span>
            </span>
            <span>NODE_STATUS: ONLINE</span>
          </span>
          <span>|</span>
          <span className="text-[#a7b7c7]">CLEARANCE: OMEGA_V2</span>
          <span>|</span>
          <span className="text-[#00f0ff]">BLOCK: #{blockHeight}</span>
          <span>|</span>
          <span className="text-[#a7b7c7]">PERMAWEB GATEWAY: ar.io</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[#00ff66] flex items-center gap-1">
            <Radio className="w-3 h-3 animate-pulse" />
            <span>LATENCY: 14ms</span>
          </span>
          <span>|</span>
          <span className="text-[#e2e8f0]">{timeUtc}</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <div 
            onClick={() => handleNavClick('hero')}
            onMouseEnter={() => cyberAudio.playHover()}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 bg-black border border-[#00ff66] flex items-center justify-center relative overflow-hidden group-hover:shadow-[0_0_12px_#00ff66] transition-all">
              <span className="font-cyber font-extrabold text-[#00ff66] text-lg">HS</span>
              <div className="absolute inset-0 bg-[#00ff66]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-cyber font-bold tracking-wider text-white text-base group-hover:text-[#00ff66] transition-colors">
                  HSOFTWARE
                </span>
                <span className="text-[10px] px-1 py-0.2 bg-[#00ff66]/20 text-[#00ff66] border border-[#00ff66]/40 font-mono">
                  DEV
                </span>
              </div>
              <span className="text-[10px] text-[#64748b] tracking-widest font-mono">
                AGUSTIN HAEDO // SEC_OPS
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-3">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  onMouseEnter={() => cyberAudio.playHover()}
                  className={`px-2.5 py-1.5 text-xs font-mono tracking-wider transition-all flex items-center gap-1 border ${
                    isActive
                      ? 'text-[#00ff66] border-[#00ff66] bg-[#00ff66]/10 shadow-[0_0_10px_rgba(0,255,102,0.2)]'
                      : 'text-[#94a3b8] border-transparent hover:text-white hover:border-[#00ff66]/40 hover:bg-[#00ff66]/5'
                  }`}
                >
                  <span className="text-[10px] text-[#475569]">{item.index}.</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Controls & Quick Action Toolbar */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Terminal Button */}
            <button
              id="btn-open-terminal"
              onClick={() => {
                cyberAudio.playClick();
                onOpenTerminal();
              }}
              onMouseEnter={() => cyberAudio.playHover()}
              className="px-2.5 py-1.5 text-xs bg-[#00ff66]/10 hover:bg-[#00ff66]/25 text-[#00ff66] border border-[#00ff66]/50 flex items-center gap-1.5 font-mono shadow-[0_0_8px_rgba(0,255,102,0.2)] transition-all cursor-pointer"
              title="Abrir Terminal CLI"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-bold">CLI</span>
            </button>

            {/* Audio Toggle */}
            <button
              id="btn-toggle-audio"
              onClick={() => {
                onToggleAudio();
              }}
              onMouseEnter={() => cyberAudio.playHover()}
              className={`p-1.5 text-xs border transition-colors cursor-pointer ${
                audioEnabled
                  ? 'text-[#00ff66] border-[#00ff66]/50 bg-[#00ff66]/10'
                  : 'text-[#64748b] border-[#334155] hover:text-[#94a3b8]'
              }`}
              title={audioEnabled ? 'Audio FX: Activo' : 'Audio FX: Silenciado'}
            >
              {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* CRT Scanline Toggle */}
            <button
              id="btn-toggle-crt"
              onClick={() => {
                cyberAudio.playClick();
                onToggleCrt();
              }}
              onMouseEnter={() => cyberAudio.playHover()}
              className={`hidden sm:flex p-1.5 text-xs border transition-colors cursor-pointer ${
                crtEnabled
                  ? 'text-[#00f0ff] border-[#00f0ff]/50 bg-[#00f0ff]/10'
                  : 'text-[#64748b] border-[#334155] hover:text-[#94a3b8]'
              }`}
              title={crtEnabled ? 'CRT Scanlines: ON' : 'CRT Scanlines: OFF'}
            >
              <Tv className="w-4 h-4" />
            </button>

            {/* Matrix Rain Toggle */}
            <button
              id="btn-toggle-matrix"
              onClick={() => {
                cyberAudio.playClick();
                onToggleMatrix();
              }}
              onMouseEnter={() => cyberAudio.playHover()}
              className={`hidden sm:flex p-1.5 text-xs border transition-colors cursor-pointer ${
                matrixEnabled
                  ? 'text-[#00ff66] border-[#00ff66]/50 bg-[#00ff66]/10'
                  : 'text-[#64748b] border-[#334155] hover:text-[#94a3b8]'
              }`}
              title={matrixEnabled ? 'Matrix Rain: ON' : 'Matrix Rain: OFF'}
            >
              <Binary className="w-4 h-4" />
            </button>

            {/* Language Switcher */}
            <button
              id="btn-toggle-language"
              onClick={() => {
                cyberAudio.playClick();
                onToggleLang();
              }}
              onMouseEnter={() => cyberAudio.playHover()}
              className="px-2 py-1 text-xs border border-[#334155] hover:border-[#00ff66]/50 text-[#cbd5e1] hover:text-[#00ff66] font-mono flex items-center gap-1 cursor-pointer transition-colors"
              title="Cambiar idioma (ES / EN)"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="font-bold">{lang.toUpperCase()}</span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              id="btn-mobile-menu"
              onClick={() => {
                cyberAudio.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-1.5 text-[#94a3b8] hover:text-white border border-[#334155]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070a0f] border-b border-[#00ff66]/30 px-4 pt-2 pb-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="w-full text-left px-3 py-2 text-sm font-mono flex items-center justify-between text-[#cbd5e1] hover:text-[#00ff66] hover:bg-[#00ff66]/10 border border-transparent hover:border-[#00ff66]/30"
            >
              <span>{item.label}</span>
              <span className="text-[#00ff66] text-xs">{item.index}</span>
            </button>
          ))}
          <div className="pt-2 border-t border-[#1e293b] flex items-center justify-around text-xs font-mono text-[#64748b]">
            <button onClick={onToggleCrt} className="flex items-center gap-1 text-[#94a3b8]">
              <Tv className="w-3.5 h-3.5" /> CRT: {crtEnabled ? 'ON' : 'OFF'}
            </button>
            <button onClick={onToggleMatrix} className="flex items-center gap-1 text-[#94a3b8]">
              <Binary className="w-3.5 h-3.5" /> MATRIX: {matrixEnabled ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
