import React, { useState } from 'react';
import { 
  Send, 
  Lock, 
  KeyRound, 
  CheckCircle2, 
  AlertCircle, 
  Radio, 
  Mail, 
  Github, 
  Linkedin, 
  Copy, 
  Check,
  Cpu,
  ShieldCheck
} from 'lucide-react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';
import { Language, ContactTransmissionData } from '../types';
import { cyberAudio } from '../utils/audio';

interface ContactTransmissionProps {
  lang: Language;
}

export function ContactTransmission({ lang }: ContactTransmissionProps) {
  const [formData, setFormData] = useState<ContactTransmissionData>({
    senderName: '',
    senderEmail: '',
    subject: '',
    priority: 'HIGH',
    encryptionKey: '0x' + Math.random().toString(16).substring(2, 10).toUpperCase(),
    message: '',
  });

  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmissionLogs, setTransmissionLogs] = useState<string[]>([]);
  const [transmissionSuccess, setTransmissionSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const calculateHash = (text: string) => {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = ((hash << 5) - hash) + text.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(16).padStart(8, '0');
  };

  const currentChecksum = calculateHash(formData.message + formData.senderEmail);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.senderName || !formData.senderEmail || !formData.message) {
      cyberAudio.playError();
      return;
    }

    cyberAudio.playClick();
    setIsTransmitting(true);
    setTransmissionSuccess(false);
    setTransmissionLogs([
      '[1/4] Inicializando túnel de transmisión cifrada...',
    ]);

    setTimeout(() => {
      setTransmissionLogs(prev => [
        ...prev,
        `[2/4] Encapsulando payload con clave ${formData.encryptionKey} (ChaCha20-Poly1305)...`,
      ]);
      cyberAudio.playHover();
    }, 600);

    setTimeout(() => {
      setTransmissionLogs(prev => [
        ...prev,
        `[3/4] Generando checksum SHA-256 [${currentChecksum}] y firma PGP...`,
      ]);
      cyberAudio.playHover();
    }, 1200);

    setTimeout(() => {
      setTransmissionLogs(prev => [
        ...prev,
        `[4/4] Transmisión exitosa. Despachado al nodo seguro de ${DEVELOPER_PROFILE.handle}.`,
      ]);
      setIsTransmitting(false);
      setTransmissionSuccess(true);
      cyberAudio.playSuccess();
    }, 1800);
  };

  const copyEmail = () => {
    cyberAudio.playClick();
    navigator.clipboard.writeText(DEVELOPER_PROFILE.socials.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
      {/* Section Header */}
      <div className="mb-8 border-b border-[#00ff66]/20 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#00ff66] mb-1">
          <span className="text-[#00f0ff]">// 06. CANAL_DE_TRANSMISIÓN</span>
          <span>::</span>
          <span className="text-[#64748b]">ENCRYPTED_COMMS</span>
        </div>
        <h2 className="font-cyber font-extrabold text-2xl sm:text-4xl text-white tracking-wider flex items-center gap-3">
          <span>{lang === 'es' ? 'CANAL DE TRANSMISIÓN & CONTACTO' : 'SECURE TRANSMISSION CHANNEL'}</span>
        </h2>
        <p className="text-sm font-mono text-[#94a3b8] mt-2 max-w-3xl">
          {lang === 'es'
            ? 'Envía una transmisión cifrada para propuestas de desarrollo de software, auditorías de seguridad, contratos freelance o posiciones senior.'
            : 'Dispatch an encrypted payload for software engineering proposals, security audits, freelance ops, or senior technical roles.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-7">
          <div className="cyber-card p-6 sm:p-8 border border-[#00ff66]/30 bg-[#070a0f] space-y-6">
            <div className="flex items-center justify-between font-mono text-xs pb-3 border-b border-[#00ff66]/20">
              <span className="text-[#00ff66] font-bold flex items-center gap-1.5">
                <Radio className="w-4 h-4 animate-pulse" />
                <span>{lang === 'es' ? 'FORMULARIO DE TRANSMISIÓN CIFRADA' : 'SECURE ENCRYPTED FORM'}</span>
              </span>
              <span className="text-[10px] text-[#00f0ff]">TARGET: aguustinhaedo@gmail.com</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#a7b7c7] mb-1.5 font-bold">
                    {lang === 'es' ? 'TU NOMBRE O ALIAS // IDENTITY:' : 'YOUR NAME / OPERATIVE ALIAS:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.senderName}
                    onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                    placeholder="Ej: John Doe / Lead Ops"
                    className="w-full bg-[#05070a] border border-[#334155] focus:border-[#00ff66] text-white p-2.5 outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[#a7b7c7] mb-1.5 font-bold">
                    {lang === 'es' ? 'CORREO DE RESPUESTA // EMAIL:' : 'RETURN ADDRESS / EMAIL:'}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.senderEmail}
                    onChange={(e) => setFormData({ ...formData, senderEmail: e.target.value })}
                    placeholder="correo@dominio.com"
                    className="w-full bg-[#05070a] border border-[#334155] focus:border-[#00ff66] text-white p-2.5 outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#a7b7c7] mb-1.5 font-bold">
                    {lang === 'es' ? 'ASUNTO DE LA MISIÓN // SUBJECT:' : 'MISSION SUBJECT:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder={lang === 'es' ? 'Nuevo Proyecto Full-Stack / Auditoría' : 'New Full-Stack Project / Audit'}
                    className="w-full bg-[#05070a] border border-[#334155] focus:border-[#00ff66] text-white p-2.5 outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[#a7b7c7] mb-1.5 font-bold">
                    {lang === 'es' ? 'NIVEL DE PRIORIDAD:' : 'PRIORITY LEVEL:'}
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                    className="w-full bg-[#05070a] border border-[#334155] focus:border-[#00ff66] text-[#00ff66] p-2.5 outline-none font-mono cursor-pointer"
                  >
                    <option value="STANDARD">STANDARD // 24-48h SLA</option>
                    <option value="HIGH">HIGH // 12-24h SLA</option>
                    <option value="CRITICAL">CRITICAL // IMMEDIATE OPS</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[#a7b7c7] font-bold">
                    {lang === 'es' ? 'MENSAJE O ESPECIFICACIONES TÉCNICAS:' : 'MESSAGE / TECHNICAL SPECS:'}
                  </label>
                  <span className="text-[10px] text-[#00f0ff]">
                    CHECKSUM: <span className="text-[#00ff66]">0x{currentChecksum}</span>
                  </span>
                </div>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={lang === 'es' ? 'Describe tu proyecto, arquitectura deseada, fechas o requerimientos...' : 'Describe your project requirements, target architecture, or consulting request...'}
                  className="w-full bg-[#05070a] border border-[#334155] focus:border-[#00ff66] text-white p-2.5 outline-none font-mono leading-relaxed resize-y"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isTransmitting}
                className="w-full py-3 bg-[#00ff66] hover:bg-[#33ff88] text-black font-cyber font-bold text-sm tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(0,255,102,0.3)]"
              >
                <Send className="w-4 h-4" />
                <span>{isTransmitting ? (lang === 'es' ? 'TRANSMITIENDO PAYLOAD...' : 'TRANSMITTING PAYLOAD...') : (lang === 'es' ? 'TRANSMITIR MENSAJE ENCRIPTADO' : 'TRANSMIT ENCRYPTED PAYLOAD')}</span>
              </button>
            </form>

            {/* Transmission Progress Logs */}
            {transmissionLogs.length > 0 && (
              <div className="p-3 bg-[#05070a] border border-[#00ff66]/40 font-mono text-xs space-y-1">
                <div className="text-[10px] text-[#64748b] font-bold">TRANSMISSION STREAM LOGS:</div>
                {transmissionLogs.map((log, lIdx) => (
                  <div key={lIdx} className="text-[#00f0ff]">
                    {log}
                  </div>
                ))}
              </div>
            )}

            {/* Transmission Success Banner */}
            {transmissionSuccess && (
              <div className="p-4 bg-[#00ff66]/15 border border-[#00ff66] text-[#00ff66] font-mono text-xs space-y-2 animate-fadeIn">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 text-[#00ff66]" />
                  <span>TRANSMISIÓN COMPLETADA EXITOSAMENTE</span>
                </div>
                <p className="text-[#cbd5e1] text-[11px]">
                  Tu mensaje ha sido cifrado y registrado. También puedes enviar un correo directo a{' '}
                  <span className="text-[#00ff66] font-bold">{DEVELOPER_PROFILE.socials.email}</span>.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Direct Channels & PGP Key */}
        <div className="lg:col-span-5 space-y-4">
          {/* Quick Contact Card */}
          <div className="cyber-card p-6 border border-[#00ff66]/30 bg-[#070a0f] space-y-4 font-mono text-xs">
            <div className="flex items-center gap-2 text-[#00ff66] font-bold pb-2 border-b border-[#00ff66]/20">
              <Mail className="w-4 h-4" />
              <span>DIRECT CHANNELS & COMMS</span>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-[#0a0e14] border border-[#1e293b] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#64748b] block">PRIMARY EMAIL:</span>
                  <span className="text-white font-bold">{DEVELOPER_PROFILE.socials.email}</span>
                </div>
                <button
                  onClick={copyEmail}
                  className="px-2.5 py-1 bg-[#141b24] hover:bg-[#00ff66]/20 text-[#cbd5e1] hover:text-[#00ff66] border border-[#334155] cursor-pointer text-[10px] flex items-center gap-1"
                >
                  {copiedEmail ? <Check className="w-3 h-3 text-[#00ff66]" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedEmail ? 'COPIADO' : 'COPIAR'}</span>
                </button>
              </div>

              <div className="p-3 bg-[#0a0e14] border border-[#1e293b] space-y-1">
                <span className="text-[10px] text-[#64748b] block">UBICACIÓN & HORARIO:</span>
                <span className="text-[#cbd5e1]">{DEVELOPER_PROFILE.location} // UTC-3 (Flexible Global)</span>
              </div>

              <div className="p-3 bg-[#0a0e14] border border-[#1e293b] space-y-1">
                <span className="text-[10px] text-[#64748b] block">DISPONIBILIDAD:</span>
                <span className="text-[#00ff66] font-bold">DISPONIBLE PARA PROYECTOS & MISIONES CLAVE</span>
              </div>
            </div>

            {/* Social Grid */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <a
                href={DEVELOPER_PROFILE.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-[#090d14] hover:bg-[#00ff66]/10 text-[#cbd5e1] hover:text-[#00ff66] border border-[#334155] hover:border-[#00ff66]/40 flex items-center gap-2 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span className="font-bold text-xs">GITHUB</span>
              </a>

              <a
                href={DEVELOPER_PROFILE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-[#090d14] hover:bg-[#00f0ff]/10 text-[#cbd5e1] hover:text-[#00f0ff] border border-[#334155] hover:border-[#00f0ff]/40 flex items-center gap-2 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span className="font-bold text-xs">LINKEDIN</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
