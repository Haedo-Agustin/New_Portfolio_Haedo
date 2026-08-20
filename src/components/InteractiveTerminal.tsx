import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft, Sparkles, Shield, Cpu, ExternalLink } from 'lucide-react';
import { TerminalOutputItem, Language } from '../types';
import { PROJECTS_DATA, SKILL_CATEGORIES, DEVELOPER_PROFILE } from '../data/portfolioData';
import { cyberAudio } from '../utils/audio';

interface InteractiveTerminalProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (projectId: string) => void;
  onOpenContact?: () => void;
  isFloating?: boolean;
}

const ASCII_BANNER = `
  ██╗  ██╗███████╗ ██████╗ ███████╗████████╗██╗    ██╗ █████╗ ██████╗ ███████╗
  ██║  ██║██╔════╝██╔═══██╗██╔════╝╚══██╔══╝██║    ██║██╔══██╗██╔══██╗██╔════╝
  ███████║███████╗██║   ██║█████╗     ██║   ██║ █╗ ██║███████║██████╔╝█████╗  
  ██╔══██║╚════██║██║   ██║██╔══╝     ██║   ██║███╗██║██╔══██║██╔══██╗██╔══╝  
  ██║  ██║███████║╚██████╔╝██║        ██║   ╚███╔███╔╝██║  ██║██║  ██║███████╗
  ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝        ╚═╝    ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝
                [ OPERATING SYSTEM // HSOFTWARE SEC-CORE v3.4.1 ]
`;

export function InteractiveTerminal({
  lang,
  isOpen,
  onClose,
  onSelectProject,
  onOpenContact,
  isFloating = false,
}: InteractiveTerminalProps) {
  const [history, setHistory] = useState<TerminalOutputItem[]>([
    {
      id: 'boot_1',
      type: 'ascii',
      content: ASCII_BANNER,
    },
    {
      id: 'boot_2',
      type: 'system',
      content: lang === 'es' 
        ? 'Sistema inicializado. Nodo seguro conectado a la permaweb. Escribe "help" para ver los comandos disponibles.'
        : 'System initialized. Secure node connected to permaweb. Type "help" to list available commands.',
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isMaximized, setIsMaximized] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    cyberAudio.playClick();

    // Add command to output
    const userItem: TerminalOutputItem = {
      id: `cmd_${Date.now()}`,
      type: 'input',
      content: `guest@hsoftware:~$ ${trimmed}`,
      timestamp: new Date().toLocaleTimeString(),
    };

    setCommandHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    let responseItems: TerminalOutputItem[] = [];

    switch (mainCmd) {
      case 'help':
        responseItems.push({
          id: `out_${Date.now()}`,
          type: 'output',
          content: lang === 'es'
            ? `COMANDOS DISPONIBLES EN SEC-CORE:
  help               - Muestra esta lista de comandos
  whoami / about     - Perfil del desarrollador y credenciales
  projects           - Lista de proyectos de software & estatus
  cat <project_id>   - Inspecciona detalles de un proyecto (ej: cat cipher-mesh)
  skills             - Matriz de habilidades técnicas & stacks
  manifesto / edict  - Principios del Edicto HSoftware
  audit              - Ejecuta un escaneo rápido de vulnerabilidades
  crypto_verify      - Verifica la huella de clave PGP pública
  contact / transmit - Abre el canal de transmisión cifrada
  matrix             - Información sobre la capa de datos
  sound              - Estado del sintetizador de audio
  sudo hire_me       - Comando especial de reclutamiento
  clear              - Limpia el historial de la terminal
  exit               - Cierra esta sesión de terminal`
            : `AVAILABLE COMMANDS IN SEC-CORE:
  help               - Displays this command registry
  whoami / about     - Developer profile & security clearance
  projects           - Software project catalog & status
  cat <project_id>   - Inspect project architecture (e.g., cat cipher-mesh)
  skills             - Technical arsenal & stack proficiencies
  manifesto / edict  - The HSoftware Edict principles
  audit              - Run rapid AST security vulnerability scan
  crypto_verify      - Verify public PGP key fingerprint
  contact / transmit - Open secure encrypted transmission channel
  matrix             - Telemetry regarding network data layer
  sound              - Synthesizer sound engine status
  sudo hire_me       - Special recruitment execution
  clear              - Wipe terminal screen
  exit               - Close this terminal session`,
        });
        cyberAudio.playSuccess();
        break;

      case 'whoami':
      case 'about':
        responseItems.push({
          id: `out_${Date.now()}`,
          type: 'output',
          content: `IDENTIDAD // ${DEVELOPER_PROFILE.handle}
ROL: ${DEVELOPER_PROFILE.tagline}
UBICACIÓN: ${DEVELOPER_PROFILE.location}
STATUS: ${DEVELOPER_PROFILE.status}
CLEARANCE: ${DEVELOPER_PROFILE.clearance}
EXPERIENCIA: ${DEVELOPER_PROFILE.stats.yearsExp} // REPOSITORIOS: ${DEVELOPER_PROFILE.stats.reposShipped}
BIO: ${lang === 'es' ? DEVELOPER_PROFILE.bio.es : DEVELOPER_PROFILE.bio.en}`,
        });
        cyberAudio.playSuccess();
        break;

      case 'projects':
        const projectListStr = PROJECTS_DATA.map((p, i) => 
          `[${i + 1}] ID: ${p.id.padEnd(16)} | STATUS: ${p.status.padEnd(12)} | ${p.title}`
        ).join('\n');
        responseItems.push({
          id: `out_${Date.now()}`,
          type: 'output',
          content: `PROYECTOS REGISTRADOS:\n${projectListStr}\n\nTip: Escribe "cat <id>" para ver especificaciones de código (ej: cat cipher-mesh).`,
        });
        cyberAudio.playSuccess();
        break;

      case 'cat':
        if (!args[0]) {
          responseItems.push({
            id: `err_${Date.now()}`,
            type: 'error',
            content: lang === 'es' 
              ? 'Error de sintaxis. Uso: cat <project_id> (ej: cat cipher-mesh, cat sentinel-audit)'
              : 'Syntax error. Usage: cat <project_id> (e.g. cat cipher-mesh, cat sentinel-audit)',
          });
          cyberAudio.playError();
        } else {
          const target = PROJECTS_DATA.find(p => p.id === args[0].toLowerCase() || p.codename.toLowerCase() === args[0].toLowerCase());
          if (target) {
            responseItems.push({
              id: `out_${Date.now()}`,
              type: 'output',
              content: `=== ${target.title} ===
CODENAME: ${target.codename}
STATUS: ${target.status}
STACK: ${target.techStack.join(', ')}
LATENCIA: ${target.metrics.latency || 'N/A'} | TEST COVERAGE: ${target.metrics.coverage || 'N/A'}
DESCRIPCIÓN:
${lang === 'es' ? target.longDescription.es : target.longDescription.en}

CARACTERÍSTICAS CLAVE:
${(lang === 'es' ? target.features.es : target.features.en).map(f => ` - ${f}`).join('\n')}

SOURCE CODE PREVIEW:
${target.codeSnippet || '// No raw snippet preview available'}`,
            });
            if (onSelectProject) {
              onSelectProject(target.id);
            }
            cyberAudio.playSuccess();
          } else {
            responseItems.push({
              id: `err_${Date.now()}`,
              type: 'error',
              content: `Error: Archivo de proyecto "${args[0]}" no encontrado en el índice. Escribe "projects" para ver los IDs válidos.`,
            });
            cyberAudio.playError();
          }
        }
        break;

      case 'skills':
        const skillsText = SKILL_CATEGORIES.map(cat => {
          const sText = cat.skills.map(s => `  * ${s.name.padEnd(26)} [${s.level}%] (${s.experience})`).join('\n');
          return `[+] ${lang === 'es' ? cat.name.es : cat.name.en}:\n${sText}`;
        }).join('\n\n');
        responseItems.push({
          id: `out_${Date.now()}`,
          type: 'output',
          content: `ARSENAL TÉCNICO & PROFICIENCIA:\n\n${skillsText}`,
        });
        cyberAudio.playSuccess();
        break;

      case 'manifesto':
      case 'edict':
        responseItems.push({
          id: `out_${Date.now()}`,
          type: 'output',
          content: `THE HSOFTWARE EDICT // DEVELOPER MANIFESTO:
[0x01] CERO BLOATWARE & RENDIMIENTO ABSOLUTO: Código rápido, predecible y sin dependencias superfluas.
[0x02] SOBERANÍA DE DATOS & PRIVACIDAD: Cifrado e2e y resistencia a censura.
[0x03] ESTÁNDARES ABIERTOS & PERMANENCIA: Almacenamiento inmutable en Arweave (ar.io).
[0x04] ARTESANÍA SENSORIAL: Interfaces táctiles con telemetría en tiempo real.`,
        });
        cyberAudio.playSuccess();
        break;

      case 'crypto_verify':
        responseItems.push({
          id: `out_${Date.now()}`,
          type: 'output',
          content: `--- BEGIN PGP SIGNED MESSAGE ---
Hash: SHA512

PUBKEY FINGERPRINT: ${DEVELOPER_PROFILE.publicKeyFingerprint}
ALGORITHM: Ed25519 / Curve25519
KEY_ID: 0x8E30C19D65549920
UID: Agustin Haedo <aguustinhaedo@gmail.com>
STATUS: VERIFIED // VALIDATED VIA PERMAWEB ROOT
--- END PGP SIGNED MESSAGE ---`,
        });
        cyberAudio.playSuccess();
        break;

      case 'audit':
        responseItems.push({
          id: `out_${Date.now()}`,
          type: 'output',
          content: `[+] INICIANDO ANÁLISIS ESTÁTICO DE SEGURIDAD...
[*] Analizando dependencias y árbol AST... OK
[*] Verificando vectores de inyección y buffer overflows... OK
[*] Comprobando protección contra reentrancy en smart contracts... OK
[*] Test de entropía criptográfica: 99.8% (ÓPTIMO)
[✔] AUDITORÍA COMPLETADA: 0 fallos críticos encontrados en el entorno de pruebas.`,
        });
        cyberAudio.playSuccess();
        break;

      case 'sudo':
        if (args.join(' ').toLowerCase().includes('hire_me') || args.join(' ').toLowerCase().includes('hire')) {
          responseItems.push({
            id: `out_${Date.now()}`,
            type: 'success',
            content: `[ACCESS GRANTED: ROOT]
Has activado la directiva de contratación especial.
Redirigiendo al canal de transmisión cifrado o envía un mensaje a ${DEVELOPER_PROFILE.socials.email}...`,
          });
          if (onOpenContact) {
            onOpenContact();
          }
          cyberAudio.playSuccess();
        } else {
          responseItems.push({
            id: `err_${Date.now()}`,
            type: 'error',
            content: `sudo: guest is not in the sudoers file. This incident will be reported to the hsoftware node. (Try: "sudo hire_me")`,
          });
          cyberAudio.playError();
        }
        break;

      case 'contact':
      case 'transmit':
        responseItems.push({
          id: `out_${Date.now()}`,
          type: 'output',
          content: `CANAL DE TRANSMISIÓN:
Email: ${DEVELOPER_PROFILE.socials.email}
GitHub: ${DEVELOPER_PROFILE.socials.github}
LinkedIn: ${DEVELOPER_PROFILE.socials.linkedin}
Abriendo formulario de transmisión segura...`,
        });
        if (onOpenContact) {
          onOpenContact();
        }
        cyberAudio.playSuccess();
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
        onClose();
        setInputVal('');
        return;

      case 'ping':
        responseItems.push({
          id: `out_${Date.now()}`,
          type: 'output',
          content: `64 bytes from ar.io (188.114.97.3): icmp_seq=1 ttl=58 time=12.4 ms
64 bytes from ar.io (188.114.97.3): icmp_seq=2 ttl=58 time=11.8 ms
--- ar.io ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, rtt avg 12.1 ms`,
        });
        cyberAudio.playSuccess();
        break;

      case 'matrix':
        responseItems.push({
          id: `out_${Date.now()}`,
          type: 'output',
          content: `LAYER: DIGITAL RAIN // ENGINED ON HTML5 CANVAS
RENDERING: 60 FPS GLYPH FALL
CHARACTER SET: Katakana + Hex + Operators`,
        });
        cyberAudio.playSuccess();
        break;

      case 'sound':
        responseItems.push({
          id: `out_${Date.now()}`,
          type: 'output',
          content: `AUDIO SYNTHESIZER: ${cyberAudio.isEnabled() ? 'ENABLED (Web Audio API active)' : 'MUTED'}
Frequency Range: 140Hz - 1400Hz Synthesized Oscillators`,
        });
        cyberAudio.playSuccess();
        break;

      case 'date':
        responseItems.push({
          id: `out_${Date.now()}`,
          type: 'output',
          content: `CURRENT SYSTEM TIME: ${new Date().toUTCString()} (Local: ${new Date().toString()})`,
        });
        break;

      case 'echo':
        responseItems.push({
          id: `out_${Date.now()}`,
          type: 'output',
          content: args.join(' '),
        });
        break;

      case 'ascii':
        responseItems.push({
          id: `out_${Date.now()}`,
          type: 'ascii',
          content: ASCII_BANNER,
        });
        break;

      default:
        responseItems.push({
          id: `err_${Date.now()}`,
          type: 'error',
          content: lang === 'es'
            ? `Comando no reconocido: "${trimmed}". Escribe "help" para ver el manual de comandos.`
            : `Unrecognized command: "${trimmed}". Type "help" to inspect manual.`,
        });
        cyberAudio.playError();
        break;
    }

    setHistory(prev => [...prev, userItem, ...responseItems]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    cyberAudio.playKey();

    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInputVal('');
        } else {
          setHistoryIndex(nextIndex);
          setInputVal(commandHistory[nextIndex]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Auto complete basic commands
      const cmds = ['help', 'whoami', 'about', 'projects', 'skills', 'manifesto', 'audit', 'crypto_verify', 'contact', 'clear', 'sudo hire_me', 'cat cipher-mesh'];
      const match = cmds.find(c => c.startsWith(inputVal.toLowerCase()));
      if (match) {
        setInputVal(match);
      }
    }
  };

  if (!isOpen && isFloating) return null;

  return (
    <div className={`cyber-card flex flex-col font-mono text-xs overflow-hidden border border-[#00ff66]/40 shadow-[0_0_25px_rgba(0,255,102,0.15)] ${
      isFloating 
        ? `fixed bottom-4 right-4 z-50 transition-all duration-300 ${
            isMaximized 
              ? 'w-[96vw] h-[90vh] sm:w-[90vw] sm:h-[80vh] bottom-4 right-2 sm:right-6' 
              : 'w-[96vw] sm:w-[580px] h-[450px]'
          }`
        : 'w-full h-[460px] rounded-sm'
    }`}>
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#090d14] border-b border-[#00ff66]/20 text-[#a7b7c7] select-none">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-[#00ff66]" />
          <span className="font-bold text-[#00ff66] tracking-wider text-[11px] font-cyber">
            HSOFTWARE_CLI // SEC-CORE v3.4.1
          </span>
          <span className="text-[10px] px-1 bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/30">
            TTY_1
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick command pills */}
          <div className="hidden sm:flex items-center gap-1 text-[10px]">
            {['help', 'projects', 'skills', 'audit'].map(cmd => (
              <button
                key={cmd}
                onClick={() => {
                  setInputVal(cmd);
                  handleCommand(cmd);
                }}
                className="px-1.5 py-0.5 bg-[#141b24] hover:bg-[#00ff66]/20 text-[#94a3b8] hover:text-[#00ff66] border border-[#334155] hover:border-[#00ff66]/40 transition-colors cursor-pointer"
              >
                {cmd}
              </button>
            ))}
          </div>

          {isFloating && (
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 hover:text-white text-[#94a3b8] cursor-pointer"
              title={isMaximized ? 'Restaurar' : 'Maximizar'}
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          )}

          {isFloating && (
            <button
              onClick={() => {
                cyberAudio.playClick();
                onClose();
              }}
              className="p-1 hover:text-[#ff0055] text-[#94a3b8] cursor-pointer"
              title="Cerrar Terminal"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Terminal Screen Body */}
      <div 
        onClick={() => inputRef.current?.focus()}
        className="flex-1 p-3 bg-[#05070a] overflow-y-auto font-mono text-[#cbd5e1] space-y-2 selection:bg-[#00ff66] selection:text-black cursor-text"
      >
        {history.map((item) => (
          <div key={item.id} className="leading-relaxed">
            {item.type === 'ascii' && (
              <pre className="text-[#00ff66] text-[8px] sm:text-[10px] leading-tight font-mono whitespace-pre overflow-x-auto opacity-90 my-1">
                {item.content}
              </pre>
            )}
            {item.type === 'input' && (
              <div className="text-[#00f0ff] font-bold flex items-center gap-1.5">
                <span className="text-[#00ff66]">&gt;</span>
                <span>{item.content}</span>
              </div>
            )}
            {item.type === 'output' && (
              <pre className="text-[#a7b7c7] whitespace-pre-wrap font-mono text-[11px] bg-[#080d14]/40 p-1.5 border-l-2 border-[#00ff66]/30">
                {item.content}
              </pre>
            )}
            {item.type === 'success' && (
              <div className="text-[#00ff66] bg-[#00ff66]/10 p-2 border border-[#00ff66]/40 font-bold">
                {item.content}
              </div>
            )}
            {item.type === 'error' && (
              <div className="text-[#ff3366] bg-[#ff3366]/10 p-2 border border-[#ff3366]/40 font-mono">
                {item.content}
              </div>
            )}
            {item.type === 'system' && (
              <div className="text-[#64748b] text-[10px] italic flex items-center gap-1">
                <span>[{item.timestamp}]</span>
                <span>{item.content}</span>
              </div>
            )}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Input Line */}
      <div className="flex items-center px-3 py-2 bg-[#090d14] border-t border-[#00ff66]/20">
        <span className="text-[#00ff66] font-bold text-sm mr-2 flex items-center gap-1">
          <span className="text-[11px] text-[#00f0ff] hidden sm:inline">guest@hsoftware:~$</span>
          <span>&gt;</span>
        </span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={lang === 'es' ? 'Escribe un comando... (ej: help, projects, audit)' : 'Type a command... (e.g. help, projects, audit)'}
          className="flex-1 bg-transparent border-none outline-none text-[#00ff66] font-mono text-xs placeholder:text-[#475569] caret-[#00ff66]"
        />
        <button
          onClick={() => handleCommand(inputVal)}
          className="p-1 text-[#64748b] hover:text-[#00ff66] cursor-pointer ml-2"
          title="Ejecutar"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
