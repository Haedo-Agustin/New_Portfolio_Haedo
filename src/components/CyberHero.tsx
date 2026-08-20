import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Shield, 
  Cpu, 
  Send, 
  Download, 
  Lock, 
  Radio, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink,
  Code2
} from 'lucide-react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';
import { Language } from '../types';
import { cyberAudio } from '../utils/audio';

interface CyberHeroProps {
  lang: Language;
  onOpenTerminal: () => void;
  onNavigate: (sectionId: string) => void;
}

export function CyberHero({ lang, onOpenTerminal, onNavigate }: CyberHeroProps) {
  const [hashValue, setHashValue] = useState('8f2a90bc74e12d3345fa67102e5b77c8');
  const [glitchTitle, setGlitchTitle] = useState(DEVELOPER_PROFILE.handle);

  useEffect(() => {
    const hashInterval = setInterval(() => {
      const chars = '0123456789abcdef';
      let res = '';
      for (let i = 0; i < 32; i++) {
        res += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setHashValue(res);
    }, 4000);

    return () => clearInterval(hashInterval);
  }, []);

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

  return (
    <section id="hero" className="relative pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Decorative Cyber Grid Frame */}
      <div className="relative border border-[#00ff66]/30 bg-[#070a0f]/90 p-6 sm:p-8 lg:p-10 shadow-[0_0_30px_rgba(0,255,102,0.1)] rounded-sm overflow-hidden">
        {/* Top-right corner tech tag */}
        <div className="absolute top-0 right-0 bg-[#00ff66]/10 border-l border-b border-[#00ff66]/40 px-3 py-1 text-[10px] text-[#00ff66] font-mono flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-[#00ff66] rounded-full animate-ping" />
          <span>HSOFTWARE_SEC_NODE // AR-BUE</span>
        </div>

        {/* Top telemetry breadcrumb */}
        <div className="text-[11px] font-mono text-[#52708d] mb-4 flex flex-wrap items-center gap-2">
          <span className="text-[#00ff66] font-bold">[ROOT@PERMAWEB ~]#</span>
          <span>INIT_SEQUENCE // CLEARANCE: {DEVELOPER_PROFILE.clearance}</span>
          <span>//</span>
          <span className="text-[#00f0ff]">NODE_HASH: {hashValue.slice(0, 16)}...</span>
        </div>

        {/* Hero Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-6">
            {/* Identity Handle with Glitch Hover */}
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#00ff66]/10 border border-[#00ff66]/40 text-[#00ff66] text-xs font-mono mb-3">
                <Shield className="w-3.5 h-3.5" />
                <span>{DEVELOPER_PROFILE.status}</span>
              </div>

              <h1 
                onMouseEnter={triggerGlitch}
                className="font-cyber font-black text-3xl sm:text-5xl lg:text-6xl tracking-wider text-white uppercase cyber-text-glow cursor-pointer select-none"
              >
                {glitchTitle}
              </h1>

              <p className="font-tech text-base sm:text-xl text-[#00f0ff] mt-2 tracking-wide font-semibold">
                {DEVELOPER_PROFILE.tagline}
              </p>
            </div>

            {/* Bio Description */}
            <p className="text-sm sm:text-base text-[#a7b7c7] font-mono leading-relaxed max-w-3xl">
              {lang === 'es' ? DEVELOPER_PROFILE.bio.es : DEVELOPER_PROFILE.bio.en}
            </p>

            {/* CTAs Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                id="hero-btn-terminal"
                onClick={() => {
                  cyberAudio.playClick();
                  onOpenTerminal();
                }}
                onMouseEnter={() => cyberAudio.playHover()}
                className="px-5 py-2.5 bg-[#00ff66] text-black font-cyber font-bold text-xs sm:text-sm tracking-wider hover:bg-[#33ff88] flex items-center gap-2 shadow-[0_0_20px_rgba(0,255,102,0.4)] transition-all cursor-pointer"
              >
                <Terminal className="w-4 h-4" />
                <span>{lang === 'es' ? 'ABRIR TERMINAL CLI' : 'LAUNCH TERMINAL CLI'}</span>
              </button>

              <button
                id="hero-btn-projects"
                onClick={() => {
                  cyberAudio.playClick();
                  onNavigate('projects');
                }}
                onMouseEnter={() => cyberAudio.playHover()}
                className="px-5 py-2.5 bg-[#101826] hover:bg-[#00f0ff]/15 text-[#00f0ff] font-cyber font-bold text-xs sm:text-sm tracking-wider border border-[#00f0ff]/50 hover:border-[#00f0ff] flex items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all cursor-pointer"
              >
                <Code2 className="w-4 h-4" />
                <span>{lang === 'es' ? 'VER PROYECTOS' : 'VIEW PROJECTS'}</span>
              </button>

              <button
                id="hero-btn-transmit"
                onClick={() => {
                  cyberAudio.playClick();
                  onNavigate('contact');
                }}
                onMouseEnter={() => cyberAudio.playHover()}
                className="px-4 py-2.5 bg-transparent hover:bg-[#ffaa00]/10 text-[#ffaa00] font-mono text-xs sm:text-sm tracking-wider border border-[#ffaa00]/40 hover:border-[#ffaa00] flex items-center gap-2 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{lang === 'es' ? 'TRANSMISIÓN ENCRIPTADA' : 'SECURE TRANSMISSION'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Cyber Telemetry Card */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-4 bg-[#05070a] border border-[#00ff66]/40 space-y-3 font-mono text-xs shadow-inner">
              <div className="flex items-center justify-between text-[#00ff66] border-b border-[#00ff66]/20 pb-2">
                <span className="font-bold flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>SYSTEM TELEMETRY</span>
                </span>
                <span className="text-[10px] text-[#52708d]">NODE_ID: #8942</span>
              </div>

              <div className="space-y-2 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-[#64748b]">ARCHITECT_NAME:</span>
                  <span className="text-[#e2e8f0] font-bold">AGUSTIN HAEDO</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">SYS_STATUS:</span>
                  <span className="text-[#00ff66] font-bold">READY_FOR_DEPLOY</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">STORAGE_LAYER:</span>
                  <span className="text-[#00f0ff]">PERMAWEB (ar.io / Arweave)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">PGP_FINGERPRINT:</span>
                  <span className="text-[#cbd5e1] text-[9px] truncate max-w-[140px]">4F92 B7A1 8E30 C19D...</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="p-2 bg-[#00ff66]/5 border border-[#00ff66]/20 text-[10px] text-[#94a3b8] flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-[#00ff66] shrink-0" />
                <span>ChaCha20 / Ed25519 authenticated session</span>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 text-center font-mono">
              <div className="p-2.5 bg-[#090d14] border border-[#334155] hover:border-[#00ff66]/40 transition-colors">
                <div className="text-lg font-bold text-[#00ff66] font-cyber">{DEVELOPER_PROFILE.stats.yearsExp}</div>
                <div className="text-[10px] text-[#64748b]">{lang === 'es' ? 'AÑOS EXP.' : 'YEARS EXP.'}</div>
              </div>
              <div className="p-2.5 bg-[#090d14] border border-[#334155] hover:border-[#00f0ff]/40 transition-colors">
                <div className="text-lg font-bold text-[#00f0ff] font-cyber">{DEVELOPER_PROFILE.stats.reposShipped}</div>
                <div className="text-[10px] text-[#64748b]">{lang === 'es' ? 'REPOSITORIOS' : 'SHIPPED REPOS'}</div>
              </div>
              <div className="p-2.5 bg-[#090d14] border border-[#334155] hover:border-[#ff3366]/40 transition-colors">
                <div className="text-lg font-bold text-[#ff3366] font-cyber">{DEVELOPER_PROFILE.stats.vulnerabilitiesPatched}</div>
                <div className="text-[10px] text-[#64748b]">{lang === 'es' ? 'PATCHES SEGURIDAD' : 'CVEs PATCHED'}</div>
              </div>
              <div className="p-2.5 bg-[#090d14] border border-[#334155] hover:border-[#00ff66]/40 transition-colors">
                <div className="text-lg font-bold text-[#00ff66] font-cyber">{DEVELOPER_PROFILE.stats.uptimeMetric}</div>
                <div className="text-[10px] text-[#64748b]">{lang === 'es' ? 'UPTIME MEDIO' : 'SYS UPTIME'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
