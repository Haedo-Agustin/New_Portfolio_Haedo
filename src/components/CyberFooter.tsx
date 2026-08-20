import React from 'react';
import { Shield, Terminal, ArrowUp, Radio, Cpu, Lock } from 'lucide-react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';
import { Language } from '../types';
import { cyberAudio } from '../utils/audio';

interface CyberFooterProps {
  lang: Language;
  onOpenTerminal: () => void;
}

export function CyberFooter({ lang, onOpenTerminal }: CyberFooterProps) {
  const scrollToTop = () => {
    cyberAudio.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#00ff66]/20 bg-[#05070a] text-xs font-mono py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative mt-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[#1e293b]">
        {/* Left Brand info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black border border-[#00ff66] flex items-center justify-center font-cyber font-bold text-[#00ff66] text-sm">
            HS
          </div>
          <div>
            <div className="text-white font-bold font-cyber text-sm">
              HSOFTWARE // {DEVELOPER_PROFILE.handle}
            </div>
            <div className="text-[10px] text-[#64748b]">
              PERMAWEB DEPLOYMENT // ARWEAVE NETWORK (ar.io)
            </div>
          </div>
        </div>

        {/* Center status */}
        <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#52708d]">
          <span className="flex items-center gap-1 text-[#00ff66]">
            <Radio className="w-3 h-3 animate-pulse" />
            <span>NODE_HEALTH: 100%</span>
          </span>
          <span>|</span>
          <span className="text-[#a7b7c7]">ZERO_TRACKERS_ACTIVE</span>
          <span>|</span>
          <button
            onClick={() => {
              cyberAudio.playClick();
              onOpenTerminal();
            }}
            className="text-[#00f0ff] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Terminal className="w-3 h-3" />
            <span>&gt;_ OPEN_CLI</span>
          </button>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="px-3 py-1.5 bg-[#0a0e14] hover:bg-[#00ff66]/15 text-[#a7b7c7] hover:text-[#00ff66] border border-[#334155] hover:border-[#00ff66]/40 flex items-center gap-1.5 transition-colors cursor-pointer text-xs"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>TOP</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 text-[10px] text-[#475569]">
        <div>
          © {new Date().getFullYear()} {DEVELOPER_PROFILE.handle}. Built with pure performance, no bloatware, and Cypherpunk craftsmanship.
        </div>
        <div className="text-[#00ff66]/80 font-mono">
          SHA-512 SIGNED // ED25519 VERIFIED
        </div>
      </div>
    </footer>
  );
}
