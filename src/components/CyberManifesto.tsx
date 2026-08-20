import React from 'react';
import { Shield, Lock, FileText, CheckCircle2, Copy, Check } from 'lucide-react';
import { MANIFESTO_EDICTS, DEVELOPER_PROFILE } from '../data/portfolioData';
import { Language } from '../types';
import { cyberAudio } from '../utils/audio';

interface CyberManifestoProps {
  lang: Language;
}

export function CyberManifesto({ lang }: CyberManifestoProps) {
  const [copied, setCopied] = React.useState(false);

  const copyHash = () => {
    cyberAudio.playClick();
    navigator.clipboard.writeText(DEVELOPER_PROFILE.publicKeyFingerprint);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="manifesto" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
      {/* Section Header */}
      <div className="mb-8 border-b border-[#00ff66]/20 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#00ff66] mb-1">
          <span className="text-[#00f0ff]">// 04. EDICTO_HSOFTWARE</span>
          <span>::</span>
          <span className="text-[#64748b]">PHILOSOPHY & ETHOS</span>
        </div>
        <h2 className="font-cyber font-extrabold text-2xl sm:text-4xl text-white tracking-wider flex items-center gap-3">
          <span>{lang === 'es' ? 'EL EDICTO HSOFTWARE // MANIFIESTO' : 'THE HSOFTWARE EDICT // MANIFESTO'}</span>
        </h2>
        <p className="text-sm font-mono text-[#94a3b8] mt-2 max-w-3xl">
          {lang === 'es'
            ? 'Los cuatro principios irrenunciables que rigen nuestra arquitectura de software, ciberdefensa y compromiso con la libertad digital.'
            : 'The four unyielding principles governing our software architecture, cyber defense, and digital sovereignty.'}
        </p>
      </div>

      {/* Manifesto Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {MANIFESTO_EDICTS.map((edict) => (
          <div
            key={edict.id}
            className="cyber-card p-6 border border-[#00ff66]/30 bg-[#070a0f] space-y-3 relative group"
          >
            <div className="flex items-center justify-between font-mono text-xs pb-2 border-b border-[#00ff66]/15">
              <span className="text-[#00ff66] font-bold tracking-wider">{edict.article}</span>
              <span className="text-[10px] px-2 py-0.5 bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30">
                {edict.tag}
              </span>
            </div>

            <h3 className="font-cyber font-bold text-base sm:text-lg text-white group-hover:text-[#00ff66] transition-colors">
              {lang === 'es' ? edict.title.es : edict.title.en}
            </h3>

            <p className="font-mono text-xs text-[#a7b7c7] leading-relaxed">
              {lang === 'es' ? edict.content.es : edict.content.en}
            </p>
          </div>
        ))}
      </div>

      {/* Cryptographic Signature Block */}
      <div className="cyber-card p-4 sm:p-6 border border-[#00f0ff]/40 bg-[#06090e] font-mono text-xs space-y-3">
        <div className="flex items-center justify-between text-[#00f0ff] pb-2 border-b border-[#00f0ff]/20">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            <span className="font-bold tracking-wider">PGP DIGITAL SIGNATURE & PERMAWEB CERTIFICATE</span>
          </div>
          <span className="text-[10px] text-[#00ff66] font-bold">STATUS: SIGNED_AND_IMMUTABLE</span>
        </div>

        <div className="p-3 bg-[#040608] border border-[#1e293b] text-[#cbd5e1] text-[11px] leading-relaxed space-y-1">
          <div><span className="text-[#64748b]">ISSUER:</span> {DEVELOPER_PROFILE.handle} &lt;{DEVELOPER_PROFILE.socials.email}&gt;</div>
          <div><span className="text-[#64748b]">NETWORK:</span> Arweave / ar.io Permaweb Verified Gateway</div>
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
            <div>
              <span className="text-[#64748b]">KEY FINGERPRINT: </span>
              <span className="text-[#00ff66] font-bold">{DEVELOPER_PROFILE.publicKeyFingerprint}</span>
            </div>
            <button
              onClick={copyHash}
              className="px-2.5 py-1 bg-[#141b24] hover:bg-[#00ff66]/20 text-[#cbd5e1] hover:text-[#00ff66] border border-[#334155] hover:border-[#00ff66]/40 flex items-center gap-1.5 transition-colors cursor-pointer text-[10px]"
            >
              {copied ? <Check className="w-3 h-3 text-[#00ff66]" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'COPIADO' : 'COPIAR PGP HASH'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
