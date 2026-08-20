import React from 'react';
import { Terminal, Shield, Calendar, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';
import { EXPERIENCE_LOGS } from '../data/portfolioData';
import { Language } from '../types';

interface ExperienceTimelineProps {
  lang: Language;
}

export function ExperienceTimeline({ lang }: ExperienceTimelineProps) {
  return (
    <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
      {/* Section Header */}
      <div className="mb-8 border-b border-[#00ff66]/20 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#00ff66] mb-1">
          <span className="text-[#00f0ff]">// 05. HISTORIAL_OPERACIONAL</span>
          <span>::</span>
          <span className="text-[#64748b]">CAREER_LOGS</span>
        </div>
        <h2 className="font-cyber font-extrabold text-2xl sm:text-4xl text-white tracking-wider flex items-center gap-3">
          <span>{lang === 'es' ? 'REGISTRO DE EXPERIENCIA & OPERACIONES' : 'EXPERIENCE & OPERATIONS LOG'}</span>
        </h2>
        <p className="text-sm font-mono text-[#94a3b8] mt-2 max-w-3xl">
          {lang === 'es'
            ? 'Historial cronológico de despliegues, arquitectura de sistemas y misiones de seguridad técnica en entornos distribuidos.'
            : 'Chronological timeline of system architecture, security missions, and distributed deployments.'}
        </p>
      </div>

      {/* Timeline List */}
      <div className="space-y-6">
        {EXPERIENCE_LOGS.map((exp, idx) => (
          <div
            key={exp.id}
            className="cyber-card p-6 border border-[#00ff66]/25 bg-[#070a0f] relative font-mono space-y-4"
          >
            {/* Top row */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#00ff66]/15 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#00ff66] rounded-full" />
                <span className="text-[#00ff66] font-bold text-sm sm:text-base font-cyber">
                  {lang === 'es' ? exp.role.es : exp.role.en}
                </span>
              </div>

              <div className="flex items-center gap-3 text-[11px] text-[#64748b]">
                <span className="flex items-center gap-1 text-[#00f0ff]">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{exp.timestamp}</span>
                </span>
                <span>|</span>
                <span className="flex items-center gap-1 text-[#a7b7c7]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{exp.location}</span>
                </span>
              </div>
            </div>

            {/* Organization Tag */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-white font-bold tracking-wider">
                ORGANIZACIÓN: <span className="text-[#00f0ff]">{exp.organization}</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/30">
                STATUS: {exp.status}
              </span>
            </div>

            {/* Highlights */}
            <div className="space-y-2 text-xs text-[#cbd5e1]">
              {(lang === 'es' ? exp.highlights.es : exp.highlights.en).map((item, hIdx) => (
                <div key={hIdx} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-[#00ff66] font-bold mt-0.5">&gt;</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#1e293b]">
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
