import React, { useState } from 'react';
import {
  Send,
  Mail,
  Github,
  Linkedin,
  Copy,
  Check,
  CheckCircle2,
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
    encryptionKey: '',
    message: '',
  });

  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.senderName || !formData.senderEmail || !formData.message) {
      cyberAudio.playError();
      return;
    }

    cyberAudio.playClick();
    setIsSending(true);
    setSent(false);

    setTimeout(() => {
      setIsSending(false);
      setSent(true);
      cyberAudio.playSuccess();
    }, 900);
  };

  const copyEmail = () => {
    cyberAudio.playClick();
    navigator.clipboard.writeText(DEVELOPER_PROFILE.socials.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-14 sm:py-16 px-4 sm:px-6 max-w-6xl mx-auto z-10 relative">
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="font-cyber font-extrabold text-2xl sm:text-4xl text-white tracking-wider">
          {lang === 'es' ? 'Contacto' : 'Contact'}
        </h2>
        <p className="text-sm font-mono text-[#94a3b8] mt-2 max-w-3xl">
          {lang === 'es'
            ? 'Envíame un mensaje para propuestas de desarrollo, auditorías de seguridad o proyectos freelance.'
            : 'Send me a message for development proposals, security audits, or freelance projects.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form */}
        <div className="lg:col-span-7">
          <div className="cyber-card p-5 sm:p-6 border border-[#00ff66]/25 space-y-5">
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#a7b7c7] mb-1.5 font-bold">
                    {lang === 'es' ? 'Nombre' : 'Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.senderName}
                    onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                    placeholder={lang === 'es' ? 'Tu nombre' : 'Your name'}
                    className="w-full bg-[#05070a] border border-[#334155] focus:border-[#00ff66] text-white p-2.5 outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[#a7b7c7] mb-1.5 font-bold">
                    {lang === 'es' ? 'Email' : 'Email'}
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
                    {lang === 'es' ? 'Asunto' : 'Subject'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder={lang === 'es' ? 'Asunto del mensaje' : 'Message subject'}
                    className="w-full bg-[#05070a] border border-[#334155] focus:border-[#00ff66] text-white p-2.5 outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[#a7b7c7] mb-1.5 font-bold">
                    {lang === 'es' ? 'Prioridad' : 'Priority'}
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as ContactTransmissionData['priority'] })}
                    className="w-full bg-[#05070a] border border-[#334155] focus:border-[#00ff66] text-[#00ff66] p-2.5 outline-none font-mono cursor-pointer"
                  >
                    <option value="STANDARD">{lang === 'es' ? 'Estándar' : 'Standard'}</option>
                    <option value="HIGH">{lang === 'es' ? 'Alta' : 'High'}</option>
                    <option value="CRITICAL">{lang === 'es' ? 'Crítica' : 'Critical'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#a7b7c7] mb-1.5 font-bold">
                  {lang === 'es' ? 'Mensaje' : 'Message'}
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={lang === 'es' ? 'Describe tu proyecto o consulta...' : 'Describe your project or inquiry...'}
                  className="w-full bg-[#05070a] border border-[#334155] focus:border-[#00ff66] text-white p-2.5 outline-none font-mono leading-relaxed resize-y"
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full py-3 bg-[#00ff66] hover:bg-[#33ff88] text-black font-cyber font-bold text-sm tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSending ? (lang === 'es' ? 'Enviando...' : 'Sending...') : (lang === 'es' ? 'Enviar mensaje' : 'Send message')}</span>
              </button>
            </form>

            {sent && (
              <div className="p-4 bg-[#00ff66]/15 border border-[#00ff66] text-[#00ff66] font-mono text-xs flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold">{lang === 'es' ? 'Mensaje enviado' : 'Message sent'}</p>
                  <p className="text-[#cbd5e1]">
                    {lang === 'es'
                      ? `Gracias. También puedes escribirme directo a ${DEVELOPER_PROFILE.socials.email}.`
                      : `Thanks. You can also reach me directly at ${DEVELOPER_PROFILE.socials.email}.`}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Direct Channels */}
        <div className="lg:col-span-5 space-y-4">
          <div className="cyber-card p-5 sm:p-6 border border-[#00ff66]/25 space-y-4 font-mono text-xs">
            <div className="flex items-center gap-2 text-[#00ff66] font-bold pb-2 border-b border-[#00ff66]/20">
              <Mail className="w-4 h-4" />
              <span>{lang === 'es' ? 'Canales directos' : 'Direct channels'}</span>
            </div>

            <div className="p-3 bg-[#0a0e14] border border-[#1e293b] flex items-center justify-between gap-3">
              <div className="min-w-0">
                <span className="text-[10px] text-[#64748b] block">{lang === 'es' ? 'Email' : 'Email'}</span>
                <span className="text-white font-bold break-all">{DEVELOPER_PROFILE.socials.email}</span>
              </div>
              <button
                onClick={copyEmail}
                className="px-2.5 py-1 shrink-0 bg-[#141b24] hover:bg-[#00ff66]/20 text-[#cbd5e1] hover:text-[#00ff66] border border-[#334155] cursor-pointer text-[10px] flex items-center gap-1"
              >
                {copiedEmail ? <Check className="w-3 h-3 text-[#00ff66]" /> : <Copy className="w-3 h-3" />}
                <span>{copiedEmail ? (lang === 'es' ? 'COPIADO' : 'COPIED') : (lang === 'es' ? 'COPIAR' : 'COPY')}</span>
              </button>
            </div>

            <div className="p-3 bg-[#0a0e14] border border-[#1e293b] space-y-1">
              <span className="text-[10px] text-[#64748b] block">{lang === 'es' ? 'Ubicación' : 'Location'}</span>
              <span className="text-[#cbd5e1]">{DEVELOPER_PROFILE.location}</span>
            </div>

            <div className="p-3 bg-[#0a0e14] border border-[#1e293b] space-y-1">
              <span className="text-[10px] text-[#64748b] block">{lang === 'es' ? 'Disponibilidad' : 'Availability'}</span>
              <span className="text-[#00ff66] font-bold">
                {lang === 'es' ? 'Disponible para nuevos proyectos' : 'Available for new projects'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={DEVELOPER_PROFILE.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-[#090d14] hover:bg-[#00ff66]/10 text-[#cbd5e1] hover:text-[#00ff66] border border-[#334155] hover:border-[#00ff66]/40 flex items-center gap-2 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span className="font-bold text-xs">GitHub</span>
              </a>

              <a
                href={DEVELOPER_PROFILE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-[#090d14] hover:bg-[#00f0ff]/10 text-[#cbd5e1] hover:text-[#00f0ff] border border-[#334155] hover:border-[#00f0ff]/40 flex items-center gap-2 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span className="font-bold text-xs">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
