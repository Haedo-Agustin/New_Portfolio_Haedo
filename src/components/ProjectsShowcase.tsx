import React, { useState } from 'react';
import { 
  Code2, 
  Terminal, 
  Play, 
  ExternalLink, 
  Github, 
  ShieldCheck, 
  Zap, 
  ChevronDown, 
  ChevronUp, 
  Activity, 
  Layers, 
  Star,
  FileCode2
} from 'lucide-react';
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
    { id: 'all', label: lang === 'es' ? 'TODOS' : 'ALL OPS', count: PROJECTS_DATA.length },
    { id: 'security', label: lang === 'es' ? 'CIBERSEGURIDAD & REDES' : 'SECURITY & KERNEL', count: PROJECTS_DATA.filter(p => p.category === 'security').length },
    { id: 'fullstack', label: lang === 'es' ? 'FULL-STACK & TIEMPO REAL' : 'FULL-STACK & REAL-TIME', count: PROJECTS_DATA.filter(p => p.category === 'fullstack').length },
    { id: 'web3', label: lang === 'es' ? 'WEB3 & CRIPTOGRAFÍA' : 'WEB3 & CRYPTOGRAPHY', count: PROJECTS_DATA.filter(p => p.category === 'web3').length },
    { id: 'ai_cloud', label: lang === 'es' ? 'AI & CLOUD ORCHESTRATION' : 'AI & CLOUD TOOLS', count: PROJECTS_DATA.filter(p => p.category === 'ai_cloud').length },
  ];

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === activeCategory);

  const toggleExpand = (id: string) => {
    cyberAudio.playClick();
    setExpandedProjectId(prev => (prev === id ? null : id));
  };

  return (
    <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
      {/* Section Header */}
      <div className="mb-8 border-b border-[#00ff66]/20 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#00ff66] mb-1">
          <span className="text-[#00f0ff]">// 02. PROYECTOS_DE_SOFTWARE</span>
          <span>::</span>
          <span className="text-[#64748b]">INDEX_REGISTRY</span>
        </div>
        <h2 className="font-cyber font-extrabold text-2xl sm:text-4xl text-white tracking-wider flex items-center gap-3">
          <span>{lang === 'es' ? 'PROYECTOS & ARSENAL DE CÓDIGO' : 'SOFTWARE PROJECTS & CODE ARSENAL'}</span>
        </h2>
        <p className="text-sm font-mono text-[#94a3b8] mt-2 max-w-3xl">
          {lang === 'es'
            ? 'Sistemas de alta disponibilidad, protocolos de cifrado peer-to-peer, analizadores de paquetes e infraestructura descentralizada. Puedes probar los simuladores interactivos directamente en el sandbox.'
            : 'High-availability distributed engines, P2P encryption protocols, ring-0 packet analyzers, and decentralized infrastructure. Test interactive simulations directly in the live sandbox.'}
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            id={`filter-${cat.id}`}
            onClick={() => {
              cyberAudio.playClick();
              setActiveCategory(cat.id);
            }}
            onMouseEnter={() => cyberAudio.playHover()}
            className={`px-3 py-1.5 text-xs font-mono tracking-wider border transition-all cursor-pointer flex items-center gap-2 ${
              activeCategory === cat.id
                ? 'bg-[#00ff66]/15 text-[#00ff66] border-[#00ff66] shadow-[0_0_12px_rgba(0,255,102,0.25)]'
                : 'bg-[#090d14] text-[#94a3b8] border-[#334155] hover:text-white hover:border-[#00ff66]/40'
            }`}
          >
            <span>{cat.label}</span>
            <span className="text-[10px] px-1 py-0.2 bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/20">
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => {
          const isExpanded = expandedProjectId === project.id;
          return (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className="cyber-card flex flex-col justify-between p-5 sm:p-6 border border-[#00ff66]/25 hover:border-[#00ff66]/60 transition-all duration-300 group rounded-sm"
            >
              <div>
                {/* Card Top Meta */}
                <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-[#00ff66]/15 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[#00ff66] font-bold">[{project.codename}]</span>
                    <span className="text-[10px] px-1.5 py-0.2 bg-[#141b24] text-[#a7b7c7] border border-[#334155]">
                      {project.category.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-1.5 py-0.5 bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/30 font-bold">
                      {project.status}
                    </span>
                    {project.metrics.stars && (
                      <span className="flex items-center gap-1 text-[11px] text-[#ffaa00]">
                        <Star className="w-3 h-3 fill-[#ffaa00]" />
                        <span>{project.metrics.stars}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Project Title */}
                <h3 className="font-cyber font-bold text-lg sm:text-xl text-white group-hover:text-[#00ff66] transition-colors mb-2">
                  {project.title}
                </h3>

                {/* Short Description */}
                <p className="font-mono text-xs sm:text-sm text-[#cbd5e1] leading-relaxed mb-4">
                  {lang === 'es' ? project.description.es : project.description.en}
                </p>

                {/* Telemetry Metrics Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-2 bg-[#06090e] border border-[#1e293b] text-[11px] font-mono mb-4">
                  {project.metrics.latency && (
                    <div>
                      <span className="text-[#64748b] block text-[9px]">LATENCY</span>
                      <span className="text-[#00f0ff] font-bold">{project.metrics.latency}</span>
                    </div>
                  )}
                  {project.metrics.coverage && (
                    <div>
                      <span className="text-[#64748b] block text-[9px]">TEST COVERAGE</span>
                      <span className="text-[#00ff66] font-bold">{project.metrics.coverage}</span>
                    </div>
                  )}
                  {project.metrics.architecture && (
                    <div className="col-span-2 sm:col-span-1">
                      <span className="text-[#64748b] block text-[9px]">ARCHITECTURE</span>
                      <span className="text-[#cbd5e1] truncate block text-[10px]">{project.metrics.architecture}</span>
                    </div>
                  )}
                </div>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[10px] font-mono bg-[#0d131c] text-[#94a3b8] border border-[#334155]/60 hover:text-[#00ff66] hover:border-[#00ff66]/40 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Expandable Architecture & Code Snippet */}
                {isExpanded && (
                  <div className="space-y-3 pt-3 border-t border-[#00ff66]/20 font-mono text-xs animate-fadeIn">
                    <p className="text-[#a7b7c7] text-[11px] leading-relaxed">
                      {lang === 'es' ? project.longDescription.es : project.longDescription.en}
                    </p>

                    {/* Key features checklist */}
                    <div className="space-y-1 bg-[#06090e] p-2.5 border border-[#1e293b]">
                      <div className="text-[10px] text-[#00ff66] font-bold uppercase mb-1">
                        {lang === 'es' ? 'Puntos Clave de Arquitectura:' : 'Key Architecture Specs:'}
                      </div>
                      {(lang === 'es' ? project.features.es : project.features.en).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-1.5 text-[#cbd5e1] text-[11px]">
                          <span className="text-[#00ff66]">&gt;</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Code snippet preview */}
                    {project.codeSnippet && (
                      <div className="bg-[#05070a] border border-[#334155] p-2.5 overflow-x-auto">
                        <div className="flex items-center justify-between text-[10px] text-[#64748b] mb-1 font-bold">
                          <span className="flex items-center gap-1">
                            <FileCode2 className="w-3.5 h-3.5 text-[#00f0ff]" />
                            <span>CODE_PREVIEW.ts / .rs / .c</span>
                          </span>
                        </div>
                        <pre className="text-[#00f0ff] text-[10px] font-mono leading-tight whitespace-pre">
                          {project.codeSnippet}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-[#00ff66]/15 mt-3 font-mono text-xs">
                <div className="flex items-center gap-2">
                  {/* Interactive Sandbox Launcher */}
                  {project.demoType !== 'none' ? (
                    <button
                      onClick={() => {
                        cyberAudio.playClick();
                        onOpenSandbox(project);
                      }}
                      onMouseEnter={() => cyberAudio.playHover()}
                      className="px-3 py-1.5 bg-[#00ff66]/15 hover:bg-[#00ff66]/30 text-[#00ff66] border border-[#00ff66]/60 flex items-center gap-1.5 font-bold cursor-pointer transition-all shadow-[0_0_10px_rgba(0,255,102,0.2)]"
                    >
                      <Play className="w-3.5 h-3.5 fill-[#00ff66]" />
                      <span>{lang === 'es' ? 'PROBAR SANDBOX' : 'RUN SANDBOX'}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        cyberAudio.playClick();
                        onOpenSandbox(project);
                      }}
                      className="px-3 py-1.5 bg-[#141b24] text-[#a7b7c7] border border-[#334155] flex items-center gap-1.5 cursor-pointer hover:text-[#00ff66]"
                    >
                      <Activity className="w-3.5 h-3.5" />
                      <span>{lang === 'es' ? 'INSPECCIONAR' : 'INSPECT'}</span>
                    </button>
                  )}

                  {/* Toggle Expand Details */}
                  <button
                    onClick={() => toggleExpand(project.id)}
                    className="p-1.5 text-[#94a3b8] hover:text-white border border-[#334155] hover:border-[#00ff66]/40 cursor-pointer"
                    title={isExpanded ? 'Ocultar código' : 'Ver código y specs'}
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
                      className="p-1.5 text-[#00f0ff] hover:text-white border border-[#00f0ff]/40 hover:bg-[#00f0ff]/10 cursor-pointer"
                      title="Abrir Demo en Vivo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-[#cbd5e1] hover:text-[#00ff66] border border-[#334155] hover:border-[#00ff66]/40 cursor-pointer"
                    title="Ver en GitHub"
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
