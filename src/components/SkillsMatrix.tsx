import React, { useState } from 'react';
import { Cpu, Terminal, Shield, Layers, Code, Sparkles, Check, CheckCircle2 } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Language } from '../types';
import { cyberAudio } from '../utils/audio';

interface SkillsMatrixProps {
  lang: Language;
}

export function SkillsMatrix({ lang }: SkillsMatrixProps) {
  const [selectedCatId, setSelectedCatId] = useState<string>('systems');

  return (
    <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
      {/* Section Header */}
      <div className="mb-8 border-b border-[#00ff66]/20 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#00ff66] mb-1">
          <span className="text-[#00f0ff]">// 03. ARSENAL_TECNICO</span>
          <span>::</span>
          <span className="text-[#64748b]">SYS_CAPABILITIES</span>
        </div>
        <h2 className="font-cyber font-extrabold text-2xl sm:text-4xl text-white tracking-wider flex items-center gap-3">
          <span>{lang === 'es' ? 'ARSENAL & MATRIZ DE COMPETENCIAS' : 'TECHNICAL ARSENAL & SKILLS MATRIX'}</span>
        </h2>
        <p className="text-sm font-mono text-[#94a3b8] mt-2 max-w-3xl">
          {lang === 'es'
            ? 'Dominio riguroso de lenguajes de sistemas de bajo nivel, stacks reactivos modernos, infraestructura en contenedores y criptografía de clave pública.'
            : 'Rigorous mastery of low-level systems languages, reactive modern frontends, containerized infrastructure, and public-key cryptography.'}
        </p>
      </div>

      {/* Category Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        {SKILL_CATEGORIES.map((cat) => {
          const isSelected = selectedCatId === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                cyberAudio.playClick();
                setSelectedCatId(cat.id);
              }}
              onMouseEnter={() => cyberAudio.playHover()}
              className={`p-3 text-left font-mono border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#00ff66]/15 text-[#00ff66] border-[#00ff66] shadow-[0_0_15px_rgba(0,255,102,0.2)]'
                  : 'bg-[#090d14] text-[#94a3b8] border-[#334155] hover:text-white hover:border-[#00ff66]/40'
              }`}
            >
              <div className="text-[10px] text-[#52708d] mb-1">MODULE // {cat.id.toUpperCase()}</div>
              <div className="font-bold text-xs sm:text-sm truncate">
                {lang === 'es' ? cat.name.es : cat.name.en}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Category Skills Grid */}
      {SKILL_CATEGORIES.map((cat) => {
        if (cat.id !== selectedCatId) return null;
        return (
          <div
            key={cat.id}
            className="cyber-card p-6 border border-[#00ff66]/30 bg-[#070a0f] space-y-4 animate-fadeIn"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#00ff66]/20 font-mono text-xs">
              <span className="text-[#00ff66] font-bold">
                [+] {lang === 'es' ? cat.name.es : cat.name.en}
              </span>
              <span className="text-[#00f0ff]">{cat.skills.length} LENGUAJES / HERRAMIENTAS REGISTRADAS</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cat.skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="p-3.5 bg-[#0a0e14] border border-[#1e293b] hover:border-[#00ff66]/40 transition-colors font-mono space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#00ff66] rounded-full group-hover:animate-ping" />
                      <span className="font-bold text-sm text-white group-hover:text-[#00ff66] transition-colors">
                        {skill.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-[#64748b] px-1.5 py-0.2 bg-[#141b24] border border-[#334155]">
                        {skill.experience}
                      </span>
                      <span className="text-xs font-bold text-[#00ff66]">
                        {skill.level}%
                      </span>
                    </div>
                  </div>

                  {/* Cyber Progress Meter */}
                  <div className="w-full h-2 bg-[#05070a] border border-[#334155] overflow-hidden p-0.5">
                    <div
                      className="h-full bg-gradient-to-r from-[#00f0ff] to-[#00ff66] transition-all duration-700 shadow-[0_0_8px_#00ff66]"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[#52708d]">
                    <span>CATEGORY: {skill.category}</span>
                    <span className="text-[#00f0ff]">STATUS: PRODUCTION_READY</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
