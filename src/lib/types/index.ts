export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  type: 'tip' | 'storytelling' | 'proceso' | 'motivacional' | 'educativo';
  structure: string;
  prompts: string[];
}

export interface CalendarDay {
  date: string;
  reelId?: string;
  status: 'empty' | 'planned' | 'completed';
  title?: string;
}

export interface Settings {
  deepseekApiKey: string;
  googleAccessToken?: string;
  googleRefreshToken?: string;
  driveFolderId: string;
  defaultTemplate: string;
  autoSave: boolean;
}

export interface ReelScript {
  id: string;
  title: string;
  type: string;
  duration: string;
  symbols: string[];
  tomas: Toma[];
  caption: string;
  hashtags: string[];
  createdAt: number;
}

export interface Toma {
  number: number;
  timeRange: string;
  label: string;
  visual: string;
  texto: string;
  audio: string;
  cta?: string;
}

export type Tab = 'chat' | 'templates' | 'calendar' | 'settings';
