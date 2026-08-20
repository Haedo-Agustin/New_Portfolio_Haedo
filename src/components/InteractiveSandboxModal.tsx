import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  Play, 
  RotateCcw, 
  ShieldAlert, 
  ShieldCheck, 
  Cpu, 
  KeyRound, 
  Radio, 
  Layers, 
  Zap, 
  CheckCircle2, 
  AlertTriangle,
  Terminal,
  Activity
} from 'lucide-react';
import { Project, Language } from '../types';
import { cyberAudio } from '../utils/audio';

interface InteractiveSandboxModalProps {
  project: Project | null;
  lang: Language;
  onClose: () => void;
}

export function InteractiveSandboxModal({
  project,
  lang,
  onClose,
}: InteractiveSandboxModalProps) {
  if (!project) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="cyber-card w-full max-w-4xl max-h-[90vh] flex flex-col border border-[#00ff66]/50 shadow-[0_0_30px_rgba(0,255,102,0.25)] rounded-sm overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#090d14] border-b border-[#00ff66]/30">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-[#00ff66] animate-pulse rounded-xs" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-cyber font-bold text-white text-sm">
                  {project.title}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/30 font-mono">
                  LIVE_SANDBOX
                </span>
              </div>
              <span className="text-[10px] text-[#64748b] font-mono">
                CODENAME: {project.codename} // EMULATION_ENV: SEC_ISOLATED
              </span>
            </div>
          </div>

          <button
            id="btn-close-sandbox"
            onClick={() => {
              cyberAudio.playClick();
              onClose();
            }}
            className="p-1.5 text-[#94a3b8] hover:text-[#ff3366] hover:bg-[#ff3366]/10 border border-transparent hover:border-[#ff3366]/40 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-[#05070a] space-y-6">
          {project.demoType === 'sandbox_crypto' && <CryptoSandbox lang={lang} />}
          {project.demoType === 'sandbox_packets' && <PacketSnifferSandbox lang={lang} />}
          {project.demoType === 'sandbox_audit' && <SmartContractAuditorSandbox lang={lang} />}
          {project.demoType === 'sandbox_api' && <MicroserviceSandbox lang={lang} />}
          {project.demoType === 'none' && <GeneralProjectInspector project={project} lang={lang} />}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-3 bg-[#090d14] border-t border-[#00ff66]/20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-[#64748b]">
            <Activity className="w-3.5 h-3.5 text-[#00ff66]" />
            <span>SANDBOX STATUS: DETERMINISTIC_SIMULATION_ACTIVE</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-[#141b24] hover:bg-[#00ff66]/15 text-[#cbd5e1] hover:text-[#00ff66] border border-[#334155] hover:border-[#00ff66]/50 transition-colors"
            >
              {lang === 'es' ? 'Ver Repositorio' : 'View Repository'}
            </a>
            <button
              onClick={() => {
                cyberAudio.playClick();
                onClose();
              }}
              className="px-3 py-1.5 bg-[#00ff66]/15 hover:bg-[#00ff66]/30 text-[#00ff66] border border-[#00ff66]/60 transition-colors"
            >
              {lang === 'es' ? 'Cerrar Sandbox' : 'Close Sandbox'}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// 1. CRYPTO DECRYPTOR SANDBOX
function CryptoSandbox({ lang }: { lang: Language }) {
  const [cipherText, setCipherText] = useState('7a9f4c82b1d03e5a6f8812ce40ba3901f4c7d2e8b9a105c3e7f21a4d');
  const [decryptedText, setDecryptedText] = useState('');
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [cipherStage, setCipherStage] = useState(0);
  const [entropyScore, setEntropyScore] = useState('7.94 bits/byte');

  const presetMessages = [
    { label: 'CLASSIFIED_PAYLOAD_A', cipher: '656432353531393a3a6b657973746f72655f7661756c745f616363657373', plain: 'DECRYPTED: ACCESS_GRANTED // TARGET NODE: AR-BUE-GATEWAY-01 // ZERO-KNOWLEDGE PROOF VALID' },
    { label: 'EDICT_SECRET_DIRECTIVE', cipher: '48534f4654574152455f414e54495f424c4f41545f4d414e49464553544f', plain: 'DECRYPTED: "BUILD LEAN, SECURE EVERYTHING, PRESERVE FREEDOM OF INFORMATION ON THE PERMAWEB"' },
    { label: 'CUSTOM_ENCRYPTED_STREAM', cipher: '7a9f4c82b1d03e5a6f8812ce40ba3901f4c7d2e8b9a105c3e7f21a4d', plain: 'DECRYPTED: Ed25519 Handshake validated. Session keys derived via HKDF-SHA256 with 256-bit forward secrecy.' }
  ];

  const handleDecrypt = (plainResult: string) => {
    cyberAudio.playClick();
    setIsDecrypting(true);
    setDecryptedText('');
    setCipherStage(1);

    setTimeout(() => {
      setCipherStage(2);
      cyberAudio.playHover();
    }, 600);

    setTimeout(() => {
      setCipherStage(3);
      cyberAudio.playHover();
    }, 1200);

    setTimeout(() => {
      setCipherStage(4);
      setDecryptedText(plainResult);
      setIsDecrypting(false);
      cyberAudio.playSuccess();
    }, 1800);
  };

  return (
    <div className="space-y-4 font-mono text-xs">
      <div className="p-3 bg-[#0a0e14] border border-[#00ff66]/30 text-[#cbd5e1] space-y-2">
        <div className="flex items-center justify-between text-[#00ff66]">
          <span className="font-bold flex items-center gap-1.5">
            <KeyRound className="w-4 h-4" />
            {lang === 'es' ? 'MOTOR DE DESCIFRADO ED25519 & CHACHA20-POLY1305' : 'ED25519 & CHACHA20-POLY1305 DECRYPTION ENGINE'}
          </span>
          <span className="text-[10px] text-[#00f0ff]">ENTROPY: {entropyScore}</span>
        </div>
        <p className="text-[#94a3b8] text-[11px]">
          {lang === 'es'
            ? 'Prueba el proceso de desencapsulamiento criptográfico. Selecciona un payload cifrado o escribe bytes hexadecimales para ejecutar el túnel Diffie-Hellman efímero.'
            : 'Test the cryptographic decapsulation process. Select an encrypted payload or type hex bytes to run the ephemeral Diffie-Hellman derivation tunnel.'}
        </p>
      </div>

      {/* Preset Payloads */}
      <div className="flex flex-wrap gap-2">
        {presetMessages.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCipherText(preset.cipher);
              setDecryptedText('');
              setCipherStage(0);
            }}
            className="px-2.5 py-1 bg-[#141b24] hover:bg-[#00ff66]/10 text-[#a7b7c7] hover:text-[#00ff66] border border-[#334155] hover:border-[#00ff66]/40 cursor-pointer"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Hex Stream Display */}
      <div>
        <label className="block text-[11px] text-[#64748b] mb-1">
          {lang === 'es' ? 'PAYLOAD CIFRADO (HEX BYTES):' : 'ENCRYPTED CIPHERTEXT (HEX BYTES):'}
        </label>
        <textarea
          value={cipherText}
          onChange={(e) => setCipherText(e.target.value)}
          rows={2}
          className="w-full bg-[#080d14] border border-[#334155] focus:border-[#00ff66] text-[#00f0ff] p-2 font-mono text-xs outline-none"
        />
      </div>

      {/* Action Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            const match = presetMessages.find(p => p.cipher === cipherText);
            handleDecrypt(match ? match.plain : `DECRYPTED HEX: UTF-8 Stream extracted successfully: ${cipherText.slice(0, 32)}...`);
          }}
          disabled={isDecrypting}
          className="px-4 py-2 bg-[#00ff66] text-black font-cyber font-bold tracking-wider hover:bg-[#33ff88] disabled:opacity-50 flex items-center gap-2 cursor-pointer transition-all shadow-[0_0_15px_rgba(0,255,102,0.3)]"
        >
          {isDecrypting ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
          <span>{isDecrypting ? (lang === 'es' ? 'DERIVANDO CLAVES...' : 'DERIVING KEYS...') : (lang === 'es' ? 'EJECUTAR DESCIFRADO' : 'EXECUTE DECRYPT')}</span>
        </button>

        {isDecrypting && (
          <span className="text-[#00f0ff] animate-pulse">
            {cipherStage === 1 && '[1/3] Calculando curva elíptica X25519...'}
            {cipherStage === 2 && '[2/3] Generando salt HKDF-SHA256 y vector IV...'}
            {cipherStage === 3 && '[3/3] Autenticando tag MAC Poly1305...'}
          </span>
        )}
      </div>

      {/* Decrypted Output Terminal */}
      <div className="p-3 bg-[#080d14] border border-[#00ff66]/40 min-h-[90px]">
        <div className="text-[10px] text-[#64748b] mb-1 font-bold">
          {lang === 'es' ? 'SALIDA DE TEXTO PLANO DESCIFRADO:' : 'DECRYPTED PLAINTEXT STREAM:'}
        </div>
        {decryptedText ? (
          <div className="text-[#00ff66] font-mono text-sm leading-relaxed p-2 bg-[#00ff66]/10 border border-[#00ff66]/30">
            {decryptedText}
          </div>
        ) : (
          <div className="text-[#475569] italic">
            {lang === 'es' ? '[Esperando ejecución de descifrado...]' : '[Awaiting decryption trigger...]'}
          </div>
        )}
      </div>
    </div>
  );
}

// 2. PACKET SNIFFER & FIREWALL SANDBOX
function PacketSnifferSandbox({ lang }: { lang: Language }) {
  interface Packet {
    id: number;
    proto: 'TCP' | 'UDP' | 'ICMP' | 'TLS';
    srcIp: string;
    dstIp: string;
    port: number;
    status: 'PASSED' | 'DROPPED_BY_EBPF';
    payload: string;
  }

  const [packets, setPackets] = useState<Packet[]>([
    { id: 101, proto: 'TCP', srcIp: '192.168.1.45', dstIp: '10.0.0.1', port: 443, status: 'PASSED', payload: 'TLS_CLIENT_HELLO (Cipher: TLS_AES_256_GCM_SHA384)' },
    { id: 102, proto: 'UDP', srcIp: '45.33.32.156', dstIp: '10.0.0.1', port: 53, status: 'PASSED', payload: 'DNS_QUERY: ar.io. IN A' },
    { id: 103, proto: 'TCP', srcIp: '185.220.101.5', dstIp: '10.0.0.1', port: 22, status: 'DROPPED_BY_EBPF', payload: 'SYN_FLOOD_ANOMALY (Block Rule: SEC_SSH_BRUTE)' },
    { id: 104, proto: 'ICMP', srcIp: '8.8.8.8', dstIp: '10.0.0.1', port: 0, status: 'PASSED', payload: 'ECHO_REPLY (Latency: 12ms)' }
  ]);

  const [firewallStrict, setFirewallStrict] = useState(true);
  const [totalDropped, setTotalDropped] = useState(1);
  const [isCapturing, setIsCapturing] = useState(true);

  useEffect(() => {
    if (!isCapturing) return;

    const interval = setInterval(() => {
      const isMalicious = Math.random() > 0.65;
      const protos: ('TCP' | 'UDP' | 'ICMP' | 'TLS')[] = ['TCP', 'UDP', 'ICMP', 'TLS'];
      const proto = protos[Math.floor(Math.random() * protos.length)];
      const randomIp = isMalicious ? `198.51.100.${Math.floor(Math.random() * 250)}` : `172.16.0.${Math.floor(Math.random() * 250)}`;

      const status = (isMalicious && firewallStrict) ? 'DROPPED_BY_EBPF' : 'PASSED';
      if (status === 'DROPPED_BY_EBPF') {
        setTotalDropped(prev => prev + 1);
      }

      const newPacket: Packet = {
        id: Date.now() % 10000,
        proto,
        srcIp: randomIp,
        dstIp: '10.0.0.1',
        port: proto === 'TCP' ? (isMalicious ? 22 : 443) : 53,
        status,
        payload: isMalicious ? 'PORT_SCAN_PROBE_DETECTED // eBPF ring-0 drop' : 'VALID_SESSION_PAYLOAD_CHUNK_OK'
      };

      setPackets(prev => [newPacket, ...prev.slice(0, 7)]);
    }, 1500);

    return () => clearInterval(interval);
  }, [isCapturing, firewallStrict]);

  return (
    <div className="space-y-4 font-mono text-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#0a0e14] border border-[#00ff66]/30">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-[#00ff66] animate-pulse" />
          <span className="text-[#00ff66] font-bold">
            {lang === 'es' ? 'CAPTURA EN VIVO eBPF // XDP DRIVER' : 'LIVE eBPF / XDP PACKET INSPECTION'}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[#00f0ff]">PACKETS INSPECTED: 45,920</span>
          <span className="text-[#ff3366] font-bold">DROPPED: {totalDropped}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            cyberAudio.playClick();
            setFirewallStrict(!firewallStrict);
          }}
          className={`px-3 py-1.5 border font-bold transition-colors cursor-pointer ${
            firewallStrict
              ? 'bg-[#00ff66]/20 text-[#00ff66] border-[#00ff66]'
              : 'bg-[#ff3366]/20 text-[#ff3366] border-[#ff3366]'
          }`}
        >
          {firewallStrict ? '🛡️ STRICT KERNEL FILTER: ENABLED' : '⚠️ PERMISSIVE MODE: OPEN'}
        </button>

        <button
          onClick={() => {
            cyberAudio.playClick();
            setIsCapturing(!isCapturing);
          }}
          className="px-3 py-1.5 bg-[#141b24] text-[#cbd5e1] hover:text-[#00ff66] border border-[#334155] cursor-pointer"
        >
          {isCapturing ? 'PAUSE CAPTURE' : 'RESUME STREAM'}
        </button>
      </div>

      {/* Packet Table */}
      <div className="border border-[#00ff66]/30 overflow-x-auto bg-[#07090e]">
        <table className="w-full text-left text-[11px]">
          <thead className="bg-[#0e141c] text-[#64748b] border-b border-[#00ff66]/20">
            <tr>
              <th className="p-2">PKT_ID</th>
              <th className="p-2">PROTO</th>
              <th className="p-2">SOURCE IP</th>
              <th className="p-2">PORT</th>
              <th className="p-2">ACTION</th>
              <th className="p-2">PAYLOAD INSPECTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e293b]/60">
            {packets.map((pkt) => (
              <tr key={pkt.id} className="hover:bg-[#00ff66]/5">
                <td className="p-2 text-[#94a3b8]">#{pkt.id}</td>
                <td className="p-2 font-bold text-[#00f0ff]">{pkt.proto}</td>
                <td className="p-2 text-[#e2e8f0]">{pkt.srcIp}</td>
                <td className="p-2 text-[#94a3b8]">{pkt.port}</td>
                <td className="p-2">
                  <span className={`px-1.5 py-0.5 text-[10px] font-bold border ${
                    pkt.status === 'PASSED'
                      ? 'text-[#00ff66] bg-[#00ff66]/10 border-[#00ff66]/30'
                      : 'text-[#ff3366] bg-[#ff3366]/10 border-[#ff3366]/40 animate-pulse'
                  }`}>
                    {pkt.status}
                  </span>
                </td>
                <td className="p-2 text-[#94a3b8] truncate max-w-[240px]">{pkt.payload}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 3. SMART CONTRACT & CODE AUDITOR SANDBOX
function SmartContractAuditorSandbox({ lang }: { lang: Language }) {
  const sampleContracts = [
    {
      name: 'VulnerableVault.sol (Reentrancy SWC-107)',
      code: `contract VulnerableVault {
    mapping(address => uint) public balances;

    function withdraw() public {
        uint bal = balances[msg.sender];
        require(bal > 0);
        (bool sent, ) = msg.sender.call{value: bal}(""); // BUG: External call before state update
        require(sent, "Failed to send Ether");
        balances[msg.sender] = 0;
    }
}`,
      vulnerabilities: [
        { severity: 'CRITICAL', rule: 'SWC-107: Reentrancy Attack Vector', line: 7, fix: 'Apply Checks-Effects-Interactions pattern or nonReentrant mutex modifier.' },
        { severity: 'MEDIUM', rule: 'SWC-104: Unchecked Call Return Value', line: 7, fix: 'Ensure proper revert handling on transfer failure.' }
      ]
    },
    {
      name: 'SecureTreasury.sol (Remediated)',
      code: `contract SecureTreasury is ReentrancyGuard {
    mapping(address => uint) public balances;

    function withdraw() public nonReentrant {
        uint bal = balances[msg.sender];
        require(bal > 0, "Zero balance");
        balances[msg.sender] = 0; // State updated BEFORE external call
        (bool sent, ) = msg.sender.call{value: bal}("");
        require(sent, "Transfer failed");
    }
}`,
      vulnerabilities: []
    }
  ];

  const [selectedContractIdx, setSelectedContractIdx] = useState(0);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditDone, setAuditDone] = useState(false);

  const current = sampleContracts[selectedContractIdx];

  const runAudit = () => {
    cyberAudio.playClick();
    setIsAuditing(true);
    setAuditDone(false);

    setTimeout(() => {
      setIsAuditing(false);
      setAuditDone(true);
      if (current.vulnerabilities.length > 0) {
        cyberAudio.playError();
      } else {
        cyberAudio.playSuccess();
      }
    }, 1200);
  };

  return (
    <div className="space-y-4 font-mono text-xs">
      <div className="flex flex-wrap gap-2">
        {sampleContracts.map((c, i) => (
          <button
            key={i}
            onClick={() => {
              setSelectedContractIdx(i);
              setAuditDone(false);
            }}
            className={`px-3 py-1.5 border transition-colors cursor-pointer ${
              selectedContractIdx === i
                ? 'bg-[#00ff66]/15 text-[#00ff66] border-[#00ff66]'
                : 'bg-[#141b24] text-[#94a3b8] border-[#334155]'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Code View */}
        <div className="p-3 bg-[#080d14] border border-[#334155]">
          <div className="text-[10px] text-[#64748b] mb-2 font-bold flex items-center justify-between">
            <span>SOURCE CODE AST INPUT:</span>
            <span>SOLIDITY v0.8.20</span>
          </div>
          <pre className="text-[#a7b7c7] font-mono text-[11px] leading-relaxed whitespace-pre overflow-x-auto">
            {current.code}
          </pre>
        </div>

        {/* Audit Report */}
        <div className="p-3 bg-[#080d14] border border-[#00ff66]/30 flex flex-col justify-between">
          <div>
            <div className="text-[10px] text-[#64748b] mb-2 font-bold flex items-center justify-between">
              <span>SYMBOLIC EXECUTION RESULTS:</span>
              <button
                onClick={runAudit}
                disabled={isAuditing}
                className="px-2.5 py-1 bg-[#00ff66] text-black font-cyber font-bold hover:bg-[#33ff88] disabled:opacity-50 flex items-center gap-1 cursor-pointer"
              >
                {isAuditing ? <RotateCcw className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
                <span>{isAuditing ? 'AUDITING...' : 'RUN AST SCAN'}</span>
              </button>
            </div>

            {auditDone ? (
              current.vulnerabilities.length > 0 ? (
                <div className="space-y-2">
                  <div className="p-2 bg-[#ff3366]/10 border border-[#ff3366]/40 text-[#ff3366] font-bold flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4" />
                    <span>{current.vulnerabilities.length} VULNERABILITIES DETECTED</span>
                  </div>
                  {current.vulnerabilities.map((v, idx) => (
                    <div key={idx} className="p-2 bg-[#120a10] border border-[#ff3366]/30 text-[#cbd5e1] text-[11px] space-y-1">
                      <div className="flex items-center justify-between text-[#ff3366] font-bold">
                        <span>[{v.severity}] {v.rule}</span>
                        <span>LINE #{v.line}</span>
                      </div>
                      <p className="text-[#94a3b8] text-[10px]">{v.fix}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 bg-[#00ff66]/10 border border-[#00ff66]/40 text-[#00ff66] space-y-2">
                  <div className="font-bold flex items-center gap-1.5 text-sm">
                    <ShieldCheck className="w-5 h-5" />
                    <span>ZERO CRITICAL VULNERABILITIES FOUND</span>
                  </div>
                  <p className="text-[11px] text-[#a7b7c7]">
                    Checks-Effects-Interactions validated. All external calls protected against reentrancy vectors.
                  </p>
                </div>
              )
            ) : (
              <div className="text-[#475569] italic py-8 text-center">
                Click "RUN AST SCAN" to execute automated vulnerability analyzer.
              </div>
            )}
          </div>

          <div className="text-[10px] text-[#52708d] pt-2 border-t border-[#1e293b]">
            AST Hash: <span className="text-[#00f0ff]">0x9b32c81a9f0293ee</span> // Verified Deterministic
          </div>
        </div>
      </div>
    </div>
  );
}

// 4. MICROSERVICE STREAMER SANDBOX
function MicroserviceSandbox({ lang }: { lang: Language }) {
  const [load, setLoad] = useState(75);
  const [activeNodes, setActiveNodes] = useState(6);
  const [latency, setLatency] = useState(2.3);

  const handleLoadChange = (val: number) => {
    setLoad(val);
    setLatency(parseFloat((1.5 + (val / 100) * 2.8).toFixed(1)));
    if (val > 85 && activeNodes < 8) {
      setActiveNodes(8);
    } else if (val < 40 && activeNodes > 4) {
      setActiveNodes(4);
    }
  };

  return (
    <div className="space-y-4 font-mono text-xs">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 bg-[#080d14] border border-[#00ff66]/30 text-center">
          <span className="text-[10px] text-[#64748b]">THROUGHPUT</span>
          <div className="text-xl font-bold text-[#00ff66] font-cyber">{Math.round(load * 1250)} msgs/s</div>
        </div>
        <div className="p-3 bg-[#080d14] border border-[#00f0ff]/30 text-center">
          <span className="text-[10px] text-[#64748b]">P99 LATENCY</span>
          <div className="text-xl font-bold text-[#00f0ff] font-cyber">{latency} ms</div>
        </div>
        <div className="p-3 bg-[#080d14] border border-[#ffaa00]/30 text-center">
          <span className="text-[10px] text-[#64748b]">ACTIVE PODS</span>
          <div className="text-xl font-bold text-[#ffaa00] font-cyber">{activeNodes} / 8</div>
        </div>
      </div>

      <div className="p-3 bg-[#0a0e14] border border-[#334155] space-y-2">
        <div className="flex items-center justify-between text-[#cbd5e1]">
          <span>{lang === 'es' ? 'Simular Carga de Tráfico (Kafka / Redis Ingestion):' : 'Simulate Traffic Ingestion Load:'}</span>
          <span className="text-[#00ff66] font-bold">{load}%</span>
        </div>
        <input
          type="range"
          min="10"
          max="100"
          value={load}
          onChange={(e) => handleLoadChange(Number(e.target.value))}
          className="w-full accent-[#00ff66] cursor-pointer"
        />
      </div>
    </div>
  );
}

// 5. GENERAL INSPECTOR
function GeneralProjectInspector({ project, lang }: { project: Project; lang: Language }) {
  return (
    <div className="space-y-4 font-mono text-xs">
      <div className="p-3 bg-[#080d14] border border-[#00ff66]/30">
        <h4 className="text-sm font-bold text-[#00ff66] mb-2 font-cyber">
          {project.title}
        </h4>
        <p className="text-[#cbd5e1] leading-relaxed text-[11px]">
          {lang === 'es' ? project.longDescription.es : project.longDescription.en}
        </p>
      </div>

      {project.codeSnippet && (
        <div className="p-3 bg-[#080d14] border border-[#334155]">
          <div className="text-[10px] text-[#64748b] mb-2 font-bold">SOURCE CODE EXTRACT:</div>
          <pre className="text-[#00f0ff] font-mono text-[11px] leading-relaxed whitespace-pre overflow-x-auto">
            {project.codeSnippet}
          </pre>
        </div>
      )}
    </div>
  );
}
