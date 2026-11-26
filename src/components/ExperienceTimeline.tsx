import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { EXPERIENCE_LOGS } from '../data/portfolioData';
import { Language } from '../types';

interface ExperienceTimelineProps {
  lang: Language;
}

export function ExperienceTimeline({ lang }: ExperienceTimelineProps) {
  return (
    <section id="experience" className="py-14 sm:py-16 px-4 sm:px-6 max-w-6xl mx-auto z-10 relative">
      <div className="mb-8">
        <h2 className="font-cyber font-extrabold text-2xl sm:text-4xl text-white tracking-wider">
          {lang === 'es' ? 'Experiencia' : 'Experience'}
        </h2>
        <p className="text-sm font-mono text-[#94a3b8] mt-2 max-w-3xl">
          {lang === 'es'
            ? 'Historial de roles en arquitectura de sistemas, seguridad y desarrollo distribuido.'
            : 'Timeline of roles in systems architecture, security, and distributed development.'}
        </p>
      </div>

      <div className="space-y-5">
        {EXPERIENCE_LOGS.map((exp) => (
          <div
            key={exp.id}
            className="cyber-card p-5 sm:p-6 border border-[#00ff66]/25 relative font-mono space-y-3"
          >
            <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1 pb-3 border-b border-[#00ff66]/15">
              <div>
                <h3 className="text-[#00ff66] font-bold text-base sm:text-lg font-cyber">
                  {lang === 'es' ? exp.role.es : exp.role.en}
                </h3>
                <span className="text-[#00f0ff] text-xs">{exp.organization}</span>
              </div>

              <div className="flex items-center gap-3 text-[11px] text-[#64748b]">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{exp.timestamp}</span>
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{exp.location}</span>
                </span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs sm:text-sm text-[#cbd5e1]">
              {(lang === 'es' ? exp.highlights.es : exp.highlights.en).map((item, hIdx) => (
                <div key={hIdx} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-[#00ff66] font-bold mt-0.5">&gt;</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {exp.tech.map((t, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2 py-0.5 text-[10px] bg-[#0d131c] text-[#94a3b8] border border-[#334155]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
