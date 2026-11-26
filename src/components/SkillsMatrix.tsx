import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Language } from '../types';
import { cyberAudio } from '../utils/audio';

interface SkillsMatrixProps {
  lang: Language;
}

export function SkillsMatrix({ lang }: SkillsMatrixProps) {
  const [selectedCatId, setSelectedCatId] = useState<string>(SKILL_CATEGORIES[0].id);
  const activeCategory = SKILL_CATEGORIES.find(c => c.id === selectedCatId) ?? SKILL_CATEGORIES[0];

  return (
    <section id="skills" className="py-14 sm:py-16 px-4 sm:px-6 max-w-6xl mx-auto z-10 relative">
      <div className="mb-8">
        <h2 className="font-cyber font-extrabold text-2xl sm:text-4xl text-white tracking-wider">
          {lang === 'es' ? 'Skills' : 'Skills'}
        </h2>
        <p className="text-sm font-mono text-[#94a3b8] mt-2 max-w-3xl">
          {lang === 'es'
            ? 'Lenguajes de sistemas, frontend moderno, infraestructura y criptografía.'
            : 'Systems languages, modern frontend, infrastructure, and cryptography.'}
        </p>
      </div>

      {/* Category tabs */}
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
              className={`p-3 text-left font-mono border transition-colors ${
                isSelected
                  ? 'bg-[#00ff66]/15 text-[#00ff66] border-[#00ff66]'
                  : 'bg-[#090d14] text-[#94a3b8] border-[#334155] hover:text-white hover:border-[#00ff66]/40'
              }`}
            >
              <div className="font-bold text-xs sm:text-sm">
                {lang === 'es' ? cat.name.es : cat.name.en}
              </div>
            </button>
          );
        })}
      </div>

      {/* Skills grid */}
      <div className="cyber-card p-5 sm:p-6 border border-[#00ff66]/25 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {activeCategory.skills.map((skill, sIdx) => (
            <div
              key={sIdx}
              className="p-3.5 bg-[#0a0e14] border border-[#1e293b] hover:border-[#00ff66]/40 transition-colors font-mono space-y-2"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-bold text-sm text-white">{skill.name}</span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] text-[#64748b]">{skill.experience}</span>
                  <span className="text-xs font-bold text-[#00ff66]">{skill.level}%</span>
                </div>
              </div>

              <div className="w-full h-1.5 bg-[#05070a] border border-[#334155] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#00f0ff] to-[#00ff66] transition-all duration-700"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
