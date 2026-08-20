export type Language = 'es' | 'en';

export interface Project {
  id: string;
  title: string;
  codename: string;
  category: 'fullstack' | 'security' | 'web3' | 'ai_cloud';
  description: {
    es: string;
    en: string;
  };
  longDescription: {
    es: string;
    en: string;
  };
  techStack: string[];
  metrics: {
    stars?: number;
    latency?: string;
    coverage?: string;
    license?: string;
    architecture?: string;
  };
  features: {
    es: string[];
    en: string[];
  };
  codeSnippet?: string;
  demoType: 'sandbox_crypto' | 'sandbox_packets' | 'sandbox_audit' | 'sandbox_api' | 'none';
  githubUrl: string;
  liveUrl?: string;
  status: 'DEPLOYED' | 'OPERATIONAL' | 'CLASSIFIED' | 'EXPERIMENTAL';
}

export interface SkillCategory {
  id: string;
  name: {
    es: string;
    en: string;
  };
  skills: {
    name: string;
    level: number; // 0 - 100
    category: string;
    experience: string;
    highlight?: boolean;
  }[];
}

export interface ManifestoEdict {
  id: string;
  article: string;
  title: {
    es: string;
    en: string;
  };
  content: {
    es: string;
    en: string;
  };
  tag: string;
}

export interface ExperienceLog {
  id: string;
  timestamp: string;
  role: {
    es: string;
    en: string;
  };
  organization: string;
  location: string;
  status: string;
  highlights: {
    es: string[];
    en: string[];
  };
  tech: string[];
}

export interface TerminalOutputItem {
  id: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system' | 'ascii';
  content: string;
  timestamp?: string;
}

export interface ContactTransmissionData {
  senderName: string;
  senderEmail: string;
  subject: string;
  priority: 'LOW' | 'STANDARD' | 'HIGH' | 'CRITICAL';
  encryptionKey: string;
  message: string;
}
