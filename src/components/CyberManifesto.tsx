import React from 'react';
import { MANIFESTO_EDICTS } from '../data/portfolioData';
import { Language } from '../types';

interface CyberManifestoProps {
  lang: Language;
}

export function CyberManifesto({ lang }: CyberManifestoProps) {
  return (
    <section id="manifesto" className="py-14 sm:py-16 px-4 sm:px-6 max-w-6xl mx-auto z-10 relative">
      <div className="mb-8">
        <h2 className="font-cyber font-extrabold text-2xl sm:text-4xl text-white tracking-wider">
          {lang === 'es' ? 'Manifiesto' : 'Manifesto'}
        </h2>
        <p className="text-sm font-mono text-[#94a3b8] mt-2 max-w-3xl">
          {lang === 'es'
            ? 'Los cuatro principios que rigen mi forma de construir software.'
            : 'The four principles that guide how I build software.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {MANIFESTO_EDICTS.map((edict) => (
          <div
            key={edict.id}
            className="cyber-card p-5 sm:p-6 border border-[#00ff66]/25 space-y-3 group"
          >
            <div className="flex items-center justify-between font-mono text-xs pb-2 border-b border-[#00ff66]/15">
              <span className="text-[#00ff66] font-bold tracking-wider">{edict.tag}</span>
            </div>

            <h3 className="font-cyber font-bold text-base sm:text-lg text-white group-hover:text-[#00ff66] transition-colors">
              {lang === 'es' ? edict.title.es : edict.title.en}
            </h3>

            <p className="font-mono text-xs sm:text-sm text-[#a7b7c7] leading-relaxed">
              {lang === 'es' ? edict.content.es : edict.content.en}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
