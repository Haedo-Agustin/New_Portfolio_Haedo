import React from 'react';
import { Terminal, ArrowUp } from 'lucide-react';
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
    <footer className="border-t border-[#00ff66]/20 bg-[#05070a] text-xs font-mono py-8 px-4 sm:px-6 max-w-6xl mx-auto z-10 relative mt-12">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black border border-[#00ff66] flex items-center justify-center font-cyber font-bold text-[#00ff66] text-sm">
            HS
          </div>
          <div className="text-center sm:text-left">
            <div className="text-white font-bold font-cyber text-sm">HSOFTWARE</div>
            <a
              href={`mailto:${DEVELOPER_PROFILE.socials.email}`}
              className="text-[11px] text-[#64748b] hover:text-[#00ff66] transition-colors"
            >
              {DEVELOPER_PROFILE.socials.email}
            </a>
          </div>
        </div>

        <div className="flex items-center gap-5 text-[11px]">
          <button
            onClick={() => {
              cyberAudio.playClick();
              onOpenTerminal();
            }}
            className="text-[#00f0ff] hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>{lang === 'es' ? 'Terminal' : 'Terminal'}</span>
          </button>
          <button
            onClick={scrollToTop}
            className="text-[#a7b7c7] hover:text-[#00ff66] flex items-center gap-1.5 transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>{lang === 'es' ? 'Volver arriba' : 'Back to top'}</span>
          </button>
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-[#1e293b] text-[10px] text-[#475569] text-center sm:text-left">
        © {new Date().getFullYear()} {DEVELOPER_PROFILE.handle}
      </div>
    </footer>
  );
}
