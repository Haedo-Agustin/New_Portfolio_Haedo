import React, { useState } from 'react';
import { Play, ExternalLink, Github, Activity, ChevronDown, ChevronUp, FileCode2 } from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project, Language } from '../types';
import { cyberAudio } from '../utils/audio';

interface ProjectsShowcaseProps {
  lang: Language;
  onOpenSandbox: (project: Project) => void;
}

export function ProjectsShowcase({ lang, onOpenSandbox }: ProjectsShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: lang === 'es' ? 'Todos' : 'All' },
    { id: 'security', label: lang === 'es' ? 'Seguridad' : 'Security' },
    { id: 'fullstack', label: lang === 'es' ? 'Full-stack' : 'Full-stack' },
    { id: 'web3', label: 'Web3' },
    { id: 'ai_cloud', label: 'AI / Cloud' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === activeCategory);

  const toggleExpand = (id: string) => {
    cyberAudio.playClick();
    setExpandedProjectId(prev => (prev === id ? null : id));
  };

  return (
    <section id="projects" className="py-14 sm:py-16 px-4 sm:px-6 max-w-6xl mx-auto z-10 relative">
      <div className="mb-8">
        <h2 className="font-cyber font-extrabold text-2xl sm:text-4xl text-white tracking-wider">
          {lang === 'es' ? 'Proyectos' : 'Projects'}
        </h2>
        <p className="text-sm font-mono text-[#94a3b8] mt-2 max-w-3xl">
          {lang === 'es'
            ? 'Sistemas distribuidos, seguridad y protocolos descentralizados. Algunos incluyen un sandbox interactivo.'
            : 'Distributed systems, security, and decentralized protocols. Some include an interactive sandbox.'}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            id={`filter-${cat.id}`}
            onClick={() => {
              cyberAudio.playClick();
              setActiveCategory(cat.id);
            }}
            onMouseEnter={() => cyberAudio.playHover()}
            className={`px-3 py-1.5 text-xs font-mono border transition-colors ${
              activeCategory === cat.id
                ? 'bg-[#00ff66]/15 text-[#00ff66] border-[#00ff66]'
                : 'bg-[#090d14] text-[#94a3b8] border-[#334155] hover:text-white hover:border-[#00ff66]/40'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredProjects.map((project) => {
          const isExpanded = expandedProjectId === project.id;
          return (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className="cyber-card flex flex-col justify-between p-5 sm:p-6 border border-[#00ff66]/25 hover:border-[#00ff66]/60 transition-colors group"
            >
              <div>
                <span className="inline-block text-[10px] font-mono px-2 py-0.5 mb-3 bg-[#0d131c] text-[#94a3b8] border border-[#334155]">
                  {project.category.toUpperCase()}
                </span>

                <h3 className="font-cyber font-bold text-lg sm:text-xl text-white group-hover:text-[#00ff66] transition-colors mb-2">
                  {project.title}
                </h3>

                <p className="font-mono text-xs sm:text-sm text-[#cbd5e1] leading-relaxed mb-4">
                  {lang === 'es' ? project.description.es : project.description.en}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[10px] font-mono bg-[#0d131c] text-[#94a3b8] border border-[#334155]/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {isExpanded && (
                  <div className="space-y-3 pt-3 border-t border-[#00ff66]/20 font-mono text-xs">
                    <p className="text-[#a7b7c7] text-[11px] leading-relaxed">
                      {lang === 'es' ? project.longDescription.es : project.longDescription.en}
                    </p>

                    <div className="space-y-1 bg-[#06090e] p-2.5 border border-[#1e293b]">
                      {(lang === 'es' ? project.features.es : project.features.en).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-1.5 text-[#cbd5e1] text-[11px]">
                          <span className="text-[#00ff66]">&gt;</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {project.codeSnippet && (
                      <div className="bg-[#05070a] border border-[#334155] p-2.5 overflow-x-auto">
                        <div className="flex items-center gap-1 text-[10px] text-[#64748b] mb-1 font-bold">
                          <FileCode2 className="w-3.5 h-3.5 text-[#00f0ff]" />
                          <span>{lang === 'es' ? 'Fragmento de código' : 'Code snippet'}</span>
                        </div>
                        <pre className="text-[#00f0ff] text-[10px] font-mono leading-tight whitespace-pre">
                          {project.codeSnippet}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Footer actions */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-[#00ff66]/15 mt-4 font-mono text-xs">
                <div className="flex items-center gap-2">
                  {project.demoType !== 'none' ? (
                    <button
                      onClick={() => {
                        cyberAudio.playClick();
                        onOpenSandbox(project);
                      }}
                      onMouseEnter={() => cyberAudio.playHover()}
                      className="px-3 py-1.5 bg-[#00ff66]/15 hover:bg-[#00ff66]/30 text-[#00ff66] border border-[#00ff66]/60 flex items-center gap-1.5 font-bold transition-colors"
                    >
                      <Play className="w-3.5 h-3.5 fill-[#00ff66]" />
                      <span>{lang === 'es' ? 'Probar sandbox' : 'Run sandbox'}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        cyberAudio.playClick();
                        onOpenSandbox(project);
                      }}
                      className="px-3 py-1.5 bg-[#141b24] text-[#a7b7c7] border border-[#334155] flex items-center gap-1.5 hover:text-[#00ff66] transition-colors"
                    >
                      <Activity className="w-3.5 h-3.5" />
                      <span>{lang === 'es' ? 'Detalles' : 'Details'}</span>
                    </button>
                  )}

                  <button
                    onClick={() => toggleExpand(project.id)}
                    className="p-1.5 text-[#94a3b8] hover:text-white border border-[#334155] hover:border-[#00ff66]/40 transition-colors"
                    title={isExpanded ? 'Ocultar' : 'Ver más'}
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-[#00f0ff] hover:text-white border border-[#00f0ff]/40 transition-colors"
                      title={lang === 'es' ? 'Demo en vivo' : 'Live demo'}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-[#cbd5e1] hover:text-[#00ff66] border border-[#334155] hover:border-[#00ff66]/40 transition-colors"
                    title="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
