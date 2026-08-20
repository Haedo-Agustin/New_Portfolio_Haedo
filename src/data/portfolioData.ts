import { Project, SkillCategory, ManifestoEdict, ExperienceLog } from '../types';

export const DEVELOPER_PROFILE = {
  handle: 'AGUSTIN HAEDO',
  tagline: 'CYBERPUNK SOFTWARE ARCHITECT // FULL-STACK & SECURITY ENGINEER',
  status: 'ONLINE // ACCEPTING MISSIONS & FREELANCE OPS',
  location: 'LATAM // NODE: AR-BUE // REMOTE GLOBAL',
  clearance: 'OMEGA-LEVEL DEPLOYMENT',
  publicKeyFingerprint: '4F92 B7A1 8E30 C19D 6554 9920 1A3E 7F88 D042 C3B9',
  stats: {
    yearsExp: '6+',
    reposShipped: '48+',
    vulnerabilitiesPatched: '130+',
    uptimeMetric: '99.98%'
  },
  socials: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://x.com',
    telegram: 'https://t.me',
    email: 'aguustinhaedo@gmail.com'
  },
  bio: {
    es: 'Desarrollador de software y especialista en sistemas de alta concurrencia, ciberseguridad y arquitecturas distribuidas. Obsesionado con el rendimiento sin bloatware, criptografía aplicada y experiencias interactivas cyberpunk.',
    en: 'Software developer and specialist in high-concurrency systems, cybersecurity, and distributed architectures. Obsessed with bloat-free performance, applied cryptography, and immersive cyberpunk experiences.'
  }
};

export const PROJECTS_DATA: Project[] = [
  {
    id: 'cipher-mesh',
    title: 'CipherMesh // Zero-Trust P2P Protocol',
    codename: 'OP_CIPHER_MESH',
    category: 'security',
    status: 'OPERATIONAL',
    description: {
      es: 'Protocolo de comunicación punto a punto encriptado end-to-end con enrutamiento cebolla (onion routing) y resistencia a censura.',
      en: 'End-to-end encrypted peer-to-peer communication protocol with multi-hop onion routing and state-level censorship resistance.'
    },
    longDescription: {
      es: 'Diseñado para comunicaciones críticas sin servidores centrales. Utiliza curvas elípticas Ed25519, intercambio de claves Diffie-Hellman efímero y encapsulamiento de paquetes cifrados mediante ChaCha20-Poly1305. Soporta auto-recuperación de nodos caídos y descubrimiento DHT Kademlia.',
      en: 'Built for mission-critical communications without central servers. Implements Ed25519 elliptic curves, ephemeral Diffie-Hellman key exchange, and ChaCha20-Poly1305 packet encapsulation. Features automatic mesh self-healing and Kademlia DHT discovery.'
    },
    techStack: ['Rust', 'WebSockets', 'Cryptography (Ed25519)', 'libp2p', 'TypeScript', 'Docker'],
    metrics: {
      stars: 480,
      latency: '< 18ms',
      coverage: '96%',
      architecture: 'Distributed P2P Mesh',
      license: 'MIT / Anti-Bloat'
    },
    features: {
      es: [
        'Cifrado de grado militar ChaCha20-Poly1305',
        'Topología descentralizada sin punto único de falla',
        'Protocolo de handshake con ' + 'Perfect Forward Secrecy',
        'Benchmarking de throughput: 450,000 msgs/sec en clúster Rust'
      ],
      en: [
        'Military-grade ChaCha20-Poly1305 payload encryption',
        'Decentralized mesh topology with zero single points of failure',
        'Handshake protocol featuring Perfect Forward Secrecy',
        'High-throughput benchmark: 450k msgs/sec on multi-core Rust node'
      ]
    },
    codeSnippet: `// Handshake packet verification & forward secrecy
pub async fn establish_secure_session(
    peer: &PeerNode,
    ephemeral_secret: &EphemeralSecret
) -> Result<SessionKeys, CryptoError> {
    let peer_public = peer.fetch_ephemeral_key().await?;
    let shared_secret = ephemeral_secret.diffie_hellman(&peer_public);
    let derived_keys = hkdf_sha256(&shared_secret, b"HSOFTWARE_V2_SALT")?;
    Ok(SessionKeys::init(derived_keys))
}`,
    demoType: 'sandbox_crypto',
    githubUrl: 'https://github.com/hsoftware/cipher-mesh',
    liveUrl: 'https://hsoftware.ar.io'
  },
  {
    id: 'nexus-engine',
    title: 'NexusCore // Real-Time Microservice Orchestrator',
    codename: 'OP_NEXUS_CORE',
    category: 'fullstack',
    status: 'DEPLOYED',
    description: {
      es: 'Plataforma full-stack reactiva de telemetría e inspección de microservicios con latencia ultra-baja y visualización en tiempo real.',
      en: 'Ultra-low latency full-stack reactive telemetry and microservice inspection platform with real-time HUD visualization.'
    },
    longDescription: {
      es: 'Dashboard y motor distribuido para streaming de eventos de infraestructura. Integra ingestión de millones de métricas por segundo mediante Apache Kafka y Redis Streams, renderizado en UI de 60fps con WebGL y WebSockets binarios.',
      en: 'Distributed engine and HUD dashboard for streaming infrastructure events. Ingests millions of metrics per second using Kafka & Redis Streams, rendered on a 60fps WebGL/React client via binary WebSockets.'
    },
    techStack: ['React', 'TypeScript', 'Node.js', 'Go', 'Redis Streams', 'TailwindCSS', 'PostgreSQL'],
    metrics: {
      stars: 890,
      latency: '2.4ms',
      coverage: '94%',
      architecture: 'Event-Driven Microservices',
      license: 'Apache 2.0'
    },
    features: {
      es: [
        'Transmisión de datos binarios comprimidos mediante Protobuf',
        'Gráficos en tiempo real con 60FPS constantes sin caída de frames',
        'Alertas automatizadas y detección de anomalías con Heurística AI',
        'Arquitectura resiliente con failover automático de réplicas'
      ],
      en: [
        'Binary compressed streaming with Protocol Buffers',
        'High-density 60FPS real-time graphs with zero frame drops',
        'Automated alert triggers and heuristic anomaly detection',
        'Resilient architecture with zero-downtime replica failovers'
      ]
    },
    codeSnippet: `// Event stream dispatcher with binary protobuf serialization
export async function streamTelemetrySocket(ws: WebSocket, nodeId: string) {
  const stream = redisClient.xread('BLOCK', 0, 'STREAMS', \`telemetry:\${nodeId}\`, '$');
  for await (const [key, messages] of stream) {
    const payload = serializeMetricBatch(messages);
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(payload, { binary: true });
    }
  }
}`,
    demoType: 'sandbox_api',
    githubUrl: 'https://github.com/hsoftware/nexus-core',
    liveUrl: 'https://nexus.hsoftware.internal'
  },
  {
    id: 'sentinel-audit',
    title: 'SentinelGuard // Automated Smart Contract & Code Auditor',
    codename: 'OP_SENTINEL_GUARD',
    category: 'web3',
    status: 'OPERATIONAL',
    description: {
      es: 'Analizador estático y dinámico de contratos inteligentes y vulnerabilidades de software con detección de reentrancy y buffer overflows.',
      en: 'Static & dynamic smart contract and software vulnerability analyzer featuring reentrancy and memory overflow detection.'
    },
    longDescription: {
      es: 'Motor de auditoría de seguridad capaz de escanear código en Solidity, Rust y C++ para detectar fallas comunes (Reentrancy, Integer Overflow, Flash Loan exploits, Unchecked Callbacks). Genera reportes criptográficos inmutables firmados.',
      en: 'Automated cybersecurity audit engine capable of scanning Solidity, Rust, and C++ source code to detect critical vulnerabilities (Reentrancy, Arithmetic Overflows, Flash Loan exploit vectors). Generates signed immutable audit reports.'
    },
    techStack: ['Solidity', 'Rust', 'EVM Bytecode', 'Python / AST', 'TypeScript', 'Web3.js'],
    metrics: {
      stars: 620,
      latency: '140ms/scan',
      coverage: '98%',
      architecture: 'AST Parsing + Symbolic Execution',
      license: 'GPL-3.0'
    },
    features: {
      es: [
        'Ejecución simbólica de bytecode EVM y WASM',
        'Detección de patrones de ataque de préstamos relámpago (Flash Loan)',
        'Generación de exploits de prueba de concepto (PoC) en entorno aislado',
        'Reportes exportables con hash SHA-256 inmutable'
      ],
      en: [
        'Symbolic execution of EVM and WASM contract bytecode',
        'Detection of flash loan attack vectors & slippage manipulation',
        'Proof-of-Concept exploit generator in sandboxed VM',
        'Exportable audit reports with SHA-256 verifiable checksums'
      ]
    },
    codeSnippet: `// Symbolic analysis parser for reentrancy attack vectors
pub fn detect_reentrancy_flaws(ast: &AbstractSyntaxTree) -> Vec<VulnerabilityReport> {
    let mut vulnerabilities = Vec::new();
    for function in ast.external_functions() {
        if function.has_external_calls_before_state_mutation() {
            vulnerabilities.push(VulnerabilityReport::critical(
                function.name(),
                "SWC-107: State variable modified after external call"
            ));
        }
    }
    vulnerabilities
}`,
    demoType: 'sandbox_audit',
    githubUrl: 'https://github.com/hsoftware/sentinel-guard',
    liveUrl: 'https://sentinel.hsoftware.ar.io'
  },
  {
    id: 'phantom-packet',
    title: 'PhantomSniff // Low-Level Packet Analyzer & Firewall',
    codename: 'OP_PHANTOM_SNIFF',
    category: 'security',
    status: 'OPERATIONAL',
    description: {
      es: 'Sniffer de paquetes de red y cortafuegos en anillo cero con filtrado eBPF y análisis forense de tráfico en tiempo real.',
      en: 'Ring-0 network packet sniffer and firewall engine with eBPF in-kernel filtering and real-time deep forensic analysis.'
    },
    longDescription: {
      es: 'Herramienta de nivel kernel para inspección profunda de paquetes (DPI) y mitigación de ataques DDoS en la capa de transporte. Permite escribir reglas de filtrado en tiempo de ejecución sin reiniciar interfaces de red.',
      en: 'Kernel-level tool for deep packet inspection (DPI) and Layer 4/7 DDoS attack mitigation. Enables live runtime filtering rule compilation using eBPF bytecode without restarting network adapters.'
    },
    techStack: ['C', 'eBPF / XDP', 'Rust', 'Linux Kernel API', 'TypeScript / React', 'TailwindCSS'],
    metrics: {
      stars: 1150,
      latency: '< 400ns',
      coverage: '97%',
      architecture: 'Kernel Space eBPF / XDP Driver',
      license: 'MIT'
    },
    features: {
      es: [
        'Filtrado a velocidad de línea de hasta 10 Gbps con XDP (eXpress Data Path)',
        'Inspección heurística de firmas de malware y exfiltración de datos',
        'Exportación PCAP compatible con Wireshark y tcpdump',
        'Consola interactiva con mapa de calor de conexiones'
      ],
      en: [
        'Line-rate packet filtering up to 10 Gbps with XDP hardware offload',
        'Heuristic signature inspection for data exfiltration & trojan beacons',
        'Wireshark / tcpdump compatible PCAP streaming capture',
        'Interactive CLI and real-time connection telemetry heatmap'
      ]
    },
    codeSnippet: `// XDP kernel program for line-rate packet drops
SEC("xdp")
int xdp_firewall_filter(struct xdp_md *ctx) {
    void *data = (void *)(long)ctx->data;
    void *data_end = (void *)(long)ctx->data_end;
    struct ethhdr *eth = data;
    if ((void *)(eth + 1) > data_end) return XDP_PASS;
    if (eth->h_proto == bpf_htons(ETH_P_IP)) {
        struct iphdr *ip = (void *)(eth + 1);
        if ((void *)(ip + 1) > data_end) return XDP_PASS;
        if (is_blacklisted_ip(ip->saddr)) {
            return XDP_DROP; // Instant kernel drop
        }
    }
    return XDP_PASS;
}`,
    demoType: 'sandbox_packets',
    githubUrl: 'https://github.com/hsoftware/phantom-sniff'
  },
  {
    id: 'ai-matrix-agent',
    title: 'AegisAI // Neural Threat Intel & Code Synthesizer',
    codename: 'OP_AEGIS_AI',
    category: 'ai_cloud',
    status: 'OPERATIONAL',
    description: {
      es: 'Agente autónomo para síntesis de parches de seguridad, análisis de dependencias vulnerables y refactorización inteligente.',
      en: 'Autonomous agent for security patch synthesis, vulnerable dependency triage, and intelligent code refactoring.'
    },
    longDescription: {
      es: 'Pipeline con modelos de lenguaje integrados para detectar brechas en repositorios Git y redactar automáticamente pull requests correctivos verificados contra tests unitarios en contenedores Docker efímeros.',
      en: 'Automated pipeline with language models that scans Git repositories, detects CVEs, and automatically generates corrective pull requests validated against isolated test containers.'
    },
    techStack: ['Python', 'Gemini API / LLM', 'Docker', 'GitHub Actions API', 'FastAPI', 'React'],
    metrics: {
      stars: 540,
      latency: '1.2s',
      coverage: '92%',
      architecture: 'Agentic LLM Pipeline + Sandboxing',
      license: 'MIT'
    },
    features: {
      es: [
        'Generación de parches de código libres de regresiones',
        'Validación aislada en sandbox de Docker con límites de recursos',
        'Integración continua con webhooks de GitHub y GitLab',
        'Audit trail con firma criptográfica de cada cambio'
      ],
      en: [
        'Regression-free corrective patch generation',
        'Sandboxed verification in ephemeral Docker environments',
        'Seamless CI/CD integration with GitHub & GitLab webhooks',
        'Cryptographic audit trail for every automated commit'
      ]
    },
    codeSnippet: `// Agentic patch verification workflow
async def synthesize_and_validate_patch(cve_report: CVEReport, codebase_path: str) -> PatchResult:
    diff_proposal = await gemini_client.generate_secure_patch(cve_report)
    async with EphemeralContainer(codebase_path) as container:
        apply_diff = await container.apply_patch(diff_proposal)
        test_run = await container.run_test_suite()
        if test_run.passed:
            return PatchResult(status="VERIFIED", diff=diff_proposal)
        return PatchResult(status="FAILED_VALIDATION", logs=test_run.stderr)`,
    demoType: 'none',
    githubUrl: 'https://github.com/hsoftware/aegis-ai'
  },
  {
    id: 'arweave-vault',
    title: 'PermaVault // Decentralized Immutable Asset Storage',
    codename: 'OP_PERMA_VAULT',
    category: 'web3',
    status: 'OPERATIONAL',
    description: {
      es: 'Cliente de almacenamiento inmutable en la red Arweave con compresión LZMA y encriptación multipart.',
      en: 'Immutable decentralized storage client on Arweave network with LZMA chunk compression and client-side multipart encryption.'
    },
    longDescription: {
      es: 'Permite archivar código fuente, registros de auditoría y documentación técnica de forma permanente en la permaweb (ar.io / Arweave) garantizando que el contenido nunca pueda ser alterado ni borrado.',
      en: 'Allows permanent archival of source code, audit logs, and technical documentation onto the permaweb (ar.io / Arweave), guaranteeing content immutability and indefinite durability.'
    },
    techStack: ['TypeScript', 'Arweave SDK', 'ar.io Gateway', 'Node.js', 'React', 'TailwindCSS'],
    metrics: {
      stars: 710,
      latency: '220ms',
      coverage: '95%',
      architecture: 'Decentralized Permaweb Gateway',
      license: 'MIT'
    },
    features: {
      es: [
        'Subida por lotes con bundle AR/Irys',
        'Verificación de hash SHA-256 en cliente',
        'Soporte para dominios descentralizados ar.io',
        'Cifrado en reposo con claves derivadas del usuario'
      ],
      en: [
        'Batch uploads with AR/Irys bundling mechanism',
        'Client-side SHA-256 pre-flight hash verification',
        'Native support for ar.io decentralized gateways',
        'Zero-knowledge encryption with user-derived keys'
      ]
    },
    codeSnippet: `// Permanent data dispatch to Arweave via ar.io gateway
export async function dispatchPermaDoc(payload: Uint8Array, tags: Record<string, string>) {
  const transaction = await arweave.createTransaction({ data: payload });
  Object.entries(tags).forEach(([key, val]) => transaction.addTag(key, val));
  await arweave.transactions.sign(transaction);
  const uploader = await arweave.transactions.getUploader(transaction);
  while (!uploader.isComplete) {
    await uploader.uploadChunk();
  }
  return { txId: transaction.id, permaUrl: \`https://\${transaction.id}.ar.io\` };
}`,
    demoType: 'none',
    githubUrl: 'https://github.com/hsoftware/permavault',
    liveUrl: 'https://hsoftware.ar.io'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'systems',
    name: {
      es: 'Sistemas & Lenguajes Core',
      en: 'Systems & Core Languages'
    },
    skills: [
      { name: 'Rust', level: 94, category: 'Systems', experience: '4 años', highlight: true },
      { name: 'TypeScript / JS', level: 98, category: 'Core', experience: '6 años', highlight: true },
      { name: 'Go (Golang)', level: 88, category: 'Backend', experience: '3 años' },
      { name: 'C / C++', level: 82, category: 'Kernel & Low Level', experience: '4 años' },
      { name: 'Python', level: 90, category: 'Data & Scripting', experience: '5 años' }
    ]
  },
  {
    id: 'frontend',
    name: {
      es: 'Frontend & UI Interactiva',
      en: 'Frontend & Interactive UI'
    },
    skills: [
      { name: 'React 18/19 & Next.js', level: 96, category: 'Frontend', experience: '6 años', highlight: true },
      { name: 'Tailwind CSS', level: 98, category: 'Styling', experience: '5 años', highlight: true },
      { name: 'WebGL / HTML5 Canvas', level: 85, category: 'Graphics & Audio', experience: '3 años' },
      { name: 'Motion (Framer)', level: 92, category: 'Animation', experience: '4 años' },
      { name: 'Vite / State Management', level: 95, category: 'Build & State', experience: '5 años' }
    ]
  },
  {
    id: 'backend_infra',
    name: {
      es: 'Backend, Bases de Datos & Cloud',
      en: 'Backend, Databases & Cloud'
    },
    skills: [
      { name: 'Node.js & Express / Fastify', level: 96, category: 'Backend', experience: '6 años', highlight: true },
      { name: 'PostgreSQL / SQL', level: 92, category: 'Database', experience: '5 años' },
      { name: 'Redis (Caching & PubSub)', level: 90, category: 'Data Store', experience: '4 años' },
      { name: 'Docker & Kubernetes', level: 88, category: 'DevOps', experience: '4 años' },
      { name: 'Linux System Admin & eBPF', level: 86, category: 'OS & Kernel', experience: '5 años' }
    ]
  },
  {
    id: 'security_web3',
    name: {
      es: 'Ciberseguridad & Criptografía',
      en: 'Cybersecurity & Cryptography'
    },
    skills: [
      { name: 'Auditoría de Vulnerabilidades (OWASP / AST)', level: 93, category: 'Cybersec', experience: '4 años', highlight: true },
      { name: 'Criptografía Aplicada (Ed25519, AES, RSA)', level: 90, category: 'Crypto', experience: '4 años' },
      { name: 'Análisis de Redes & eBPF DPI', level: 86, category: 'Network', experience: '3 años' },
      { name: 'Solidity & EVM Security', level: 84, category: 'Web3 / Smart Contracts', experience: '3 años' },
      { name: 'Arweave / ar.io Permaweb SDK', level: 88, category: 'Decentralized Data', experience: '2 años' }
    ]
  }
];

export const MANIFESTO_EDICTS: ManifestoEdict[] = [
  {
    id: 'edict_1',
    article: 'EDICT // 0x01',
    title: {
      es: 'CERO BLOATWARE & RENDIMIENTO ABSOLUTO',
      en: 'ZERO BLOATWARE & UNCOMPROMISING SPEED'
    },
    content: {
      es: 'El software debe ser rápido, predecible y respetuoso con los recursos de la máquina del usuario. Rechazamos los bundles inflados de cientos de megabytes para tareas simples. Cada byte transmitido y cada ciclo de CPU debe tener un propósito justificado.',
      en: 'Software must be lightning fast, deterministic, and respectful of hardware resources. We reject bloated multi-megabyte bundles for trivial tasks. Every transmitted byte and CPU cycle must have an explicit technical justification.'
    },
    tag: '#PERFORMANCE'
  },
  {
    id: 'edict_2',
    article: 'EDICT // 0x02',
    title: {
      es: 'SOBERANÍA DE DATOS & PRIVACIDAD POR DISEÑO',
      en: 'DATA SOVEREIGNTY & PRIVACY BY DESIGN'
    },
    content: {
      es: 'La privacidad no es una opción de configuración: es el cimiento de la arquitectura. El cifrado de extremo a extremo, las identidades criptográficas y los protocolos descentralizados son la defensa primordial contra el espionaje corporativo y gubernamental.',
      en: 'Privacy is not a toggle: it is an architectural foundation. End-to-end encryption, cryptographic keypairs, and decentralized protocols are the first line of defense against corporate surveillance and unauthorized extraction.'
    },
    tag: '#CYPHERPUNK'
  },
  {
    id: 'edict_3',
    article: 'EDICT // 0x03',
    title: {
      es: 'CÓDIGO AUDITABLE & ESTÁNDARES ABIERTOS',
      en: 'AUDITABLE CODE & OPEN PROTOCOLS'
    },
    content: {
      es: 'La seguridad por oscuridad es una ilusión peligrosa. El código crítico debe ser abierto, verificable y reproducible. Apoyamos la preservación inmutable en redes como Arweave (ar.io) para evitar la censura y la pérdida histórica del conocimiento digital.',
      en: 'Security through obscurity is a fatal illusion. Critical code must be auditable, verifiable, and reproducible. We champion permanent data preservation via networks like Arweave (ar.io) to eliminate censorship and the digital dark age.'
    },
    tag: '#OPEN_SOURCE'
  },
  {
    id: 'edict_4',
    article: 'EDICT // 0x04',
    title: {
      es: 'ARTESANÍA DIGITAL & EXPERIENCIA SENSORIAL',
      en: 'DIGITAL CRAFTSMANSHIP & SENSORY UX'
    },
    content: {
      es: 'La funcionalidad rigurosa no está reñida con la estética. Una interfaz cyberpunk con retroalimentación sonora táctil, tipografía nítida y terminales interactivos transforma el uso de herramientas en una experiencia inmersiva y memorable.',
      en: 'Rigorous engineering does not conflict with aesthetic precision. A cyberpunk interface with tactile audio feedback, crisp typography, and interactive terminals elevates utility into an unforgettable sensory experience.'
    },
    tag: '#AESTHETICS'
  }
];

export const EXPERIENCE_LOGS: ExperienceLog[] = [
  {
    id: 'exp_1',
    timestamp: '2023 - PRESENTE',
    role: {
      es: 'Lead Software Architect & Security Engineer',
      en: 'Lead Software Architect & Security Engineer'
    },
    organization: 'HSOFTWARE LABS // DISTRIBUTED SYSTEMS',
    location: 'REMOTE / GLOBAL',
    status: 'ACTIVE_NODE',
    highlights: {
      es: [
        'Liderazgo en la arquitectura de microservicios de alto tráfico procesando +10M de eventos/día con latencia p99 < 5ms.',
        'Auditoría y remediación de vulnerabilidades críticas en contratos inteligentes y protocolos P2P.',
        'Implementación de gateways de almacenamiento permanente en Arweave (ar.io).'
      ],
      en: [
        'Spearheaded architecture of high-traffic distributed microservices processing 10M+ events/day with p99 latency < 5ms.',
        'Audited and resolved critical vulnerability vectors across smart contracts and P2P mesh protocols.',
        'Deployed decentralized permanent data pipelines leveraging Arweave & ar.io gateway networks.'
      ]
    },
    tech: ['Rust', 'TypeScript', 'Node.js', 'PostgreSQL', 'eBPF', 'Docker', 'Arweave']
  },
  {
    id: 'exp_2',
    timestamp: '2021 - 2023',
    role: {
      es: 'Senior Full-Stack & Cybersec Specialist',
      en: 'Senior Full-Stack & Cybersec Specialist'
    },
    organization: 'NEO-SECURITY TECH OPS',
    location: 'BUENOS AIRES // HYBRID',
    status: 'COMPLETED_MISSION',
    highlights: {
      es: [
        'Desarrollo de interfaces de comando y control (C2) y dashboards de ciberdefensa en React con WebSockets binarios.',
        'Automatización de pipelines CI/CD con escaneo de seguridad estático (SAST) y análisis dinámico de binarios.',
        'Optimización de rendimiento web reduciendo First Contentful Paint a menos de 400ms.'
      ],
      en: [
        'Engineered command-and-control UI and cyber defense dashboards in React using binary WebSockets.',
        'Automated CI/CD security pipelines featuring static analysis (SAST) and dynamic container sandboxing.',
        'Front-end performance tuning resulting in sub-400ms First Contentful Paint scores.'
      ]
    },
    tech: ['React', 'TypeScript', 'TailwindCSS', 'Go', 'Redis', 'Python', 'AWS']
  },
  {
    id: 'exp_3',
    timestamp: '2019 - 2021',
    role: {
      es: 'Software Engineer & Systems Programmer',
      en: 'Software Engineer & Systems Programmer'
    },
    organization: 'QUANTUM PROTOCOL RESEARCH',
    location: 'REMOTE',
    status: 'ARCHIVED',
    highlights: {
      es: [
        'Diseño de APIs REST y GraphQL de alta disponibilidad con autenticación basada en firmas criptográficas Ed25519.',
        'Construcción de herramientas CLI en Rust y Go para monitoreo de servidores y balanceo de carga.',
        'Participación en programas de Bug Bounty reportando vulnerabilidades en protocolos abiertos.'
      ],
      en: [
        'Designed high-availability REST and GraphQL APIs with Ed25519 cryptographic signature authentication.',
        'Built developer CLI toolkits in Rust and Go for automated cluster monitoring and load distribution.',
        'Active participant in white-hat bug bounty initiatives auditing open decentralized protocols.'
      ]
    },
    tech: ['Rust', 'Go', 'GraphQL', 'Linux', 'Node.js', 'Bash', 'Docker']
  }
];
