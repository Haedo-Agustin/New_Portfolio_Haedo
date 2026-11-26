import React, { useState } from 'react';
import { Terminal, Send, Code2 } from 'lucide-react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';
import { Language } from '../types';
import { cyberAudio } from '../utils/audio';

interface CyberHeroProps {
  lang: Language;
  onOpenTerminal: () => void;
  onNavigate: (sectionId: string) => void;
}

export function CyberHero({ lang, onOpenTerminal, onNavigate }: CyberHeroProps) {
  const [glitchTitle, setGlitchTitle] = useState(DEVELOPER_PROFILE.handle);

  const triggerGlitch = () => {
    cyberAudio.playHover();
    const original = DEVELOPER_PROFILE.handle;
    const scrambled = original
      .split('')
      .map(c => (Math.random() > 0.6 ? '█' : c))
      .join('');
    setGlitchTitle(scrambled);
    setTimeout(() => setGlitchTitle(original), 200);
  };

  const stats = [
    { value: DEVELOPER_PROFILE.stats.yearsExp, label: lang === 'es' ? 'Años de exp.' : 'Years exp.', color: '#00ff66' },
    { value: DEVELOPER_PROFILE.stats.reposShipped, label: lang === 'es' ? 'Repos' : 'Repos', color: '#00f0ff' },
    { value: DEVELOPER_PROFILE.stats.vulnerabilitiesPatched, label: lang === 'es' ? 'CVEs parcheados' : 'CVEs patched', color: '#ff3366' },
    { value: DEVELOPER_PROFILE.stats.uptimeMetric, label: 'Uptime', color: '#00ff66' },
  ];

  return (
    <section id="hero" className="pt-12 pb-12 sm:pt-16 sm:pb-16 px-4 sm:px-6 max-w-6xl mx-auto z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        <div className="lg:col-span-8 space-y-5">
          <span className="inline-flex items-center gap-2 px-2.5 py-1 border border-[#00ff66]/40 text-[#00ff66] text-xs font-mono">
            <span className="w-1.5 h-1.5 bg-[#00ff66] rounded-full animate-pulse" />
            {lang === 'es' ? 'Disponible para proyectos' : 'Available for projects'}
          </span>

          <h1
            onMouseEnter={triggerGlitch}
            className="font-cyber font-black text-3xl sm:text-5xl lg:text-6xl tracking-wider text-white uppercase cyber-text-glow cursor-pointer select-none"
          >
            {glitchTitle}
          </h1>

          <p className="font-tech text-base sm:text-lg text-[#00f0ff] tracking-wide">
            {DEVELOPER_PROFILE.tagline}
          </p>

          <p className="text-sm sm:text-base text-[#a7b7c7] font-mono leading-relaxed max-w-2xl">
            {lang === 'es' ? DEVELOPER_PROFILE.bio.es : DEVELOPER_PROFILE.bio.en}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              id="hero-btn-terminal"
              onClick={() => {
                cyberAudio.playClick();
                onOpenTerminal();
              }}
              onMouseEnter={() => cyberAudio.playHover()}
              className="px-5 py-2.5 bg-[#00ff66] text-black font-cyber font-bold text-xs sm:text-sm tracking-wider hover:bg-[#33ff88] flex items-center gap-2 transition-colors"
            >
              <Terminal className="w-4 h-4" />
              <span>{lang === 'es' ? 'Abrir terminal' : 'Open terminal'}</span>
            </button>

            <button
              id="hero-btn-projects"
              onClick={() => {
                cyberAudio.playClick();
                onNavigate('projects');
              }}
              onMouseEnter={() => cyberAudio.playHover()}
              className="px-5 py-2.5 bg-[#101826] hover:bg-[#00f0ff]/15 text-[#00f0ff] font-cyber font-bold text-xs sm:text-sm tracking-wider border border-[#00f0ff]/50 hover:border-[#00f0ff] flex items-center gap-2 transition-colors"
            >
              <Code2 className="w-4 h-4" />
              <span>{lang === 'es' ? 'Ver proyectos' : 'View projects'}</span>
            </button>

            <button
              id="hero-btn-transmit"
              onClick={() => {
                cyberAudio.playClick();
                onNavigate('contact');
              }}
              onMouseEnter={() => cyberAudio.playHover()}
              className="px-4 py-2.5 bg-transparent hover:bg-[#ffaa00]/10 text-[#ffaa00] font-mono text-xs sm:text-sm tracking-wider border border-[#ffaa00]/40 hover:border-[#ffaa00] flex items-center gap-2 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{lang === 'es' ? 'Contacto' : 'Contact'}</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-3.5 bg-[#090d14] border border-[#334155] text-center font-mono"
              >
                <div className="text-xl sm:text-2xl font-bold font-cyber" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-[10px] text-[#64748b] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
