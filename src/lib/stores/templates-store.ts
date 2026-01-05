import { create } from 'zustand';
import type { Template } from '../types';

interface TemplatesState {
  templates: Template[];
  selectedTemplate: Template | null;
  isLoading: boolean;
}

interface TemplatesActions {
  setTemplates: (templates: Template[]) => void;
  selectTemplate: (template: Template | null) => void;
  setLoading: (isLoading: boolean) => void;
}

type TemplatesStore = TemplatesState & TemplatesActions;

// Default templates based on GetMyBrief methodology
const DEFAULT_TEMPLATES: Template[] = [
  {
    id: 'reel-tip',
    name: 'Quick Tip Reel',
    description: 'Share a valuable tip in under 30 seconds',
    type: 'tip',
    structure: '5 shots: Hook + Context + Tip + Proof + CTA',
    prompts: [
      'What tip do you want to share?',
      'What problem does it solve?',
      'Do you have a personal example?',
    ],
  },
  {
    id: 'reel-storytelling',
    name: 'Storytelling Reel',
    description: 'Tell a story that connects emotionally',
    type: 'storytelling',
    structure: '5 shots: Situation + Conflict + Turning point + Resolution + Lesson',
    prompts: [
      'What story do you want to tell?',
      'What was the hardest moment?',
      'What did you learn from that experience?',
    ],
  },
  {
    id: 'reel-proceso',
    name: 'Process Reel',
    description: 'Show a step-by-step process',
    type: 'proceso',
    structure: '5 shots: End result + Step 1 + Step 2 + Step 3 + CTA',
    prompts: [
      'What process do you want to show?',
      'What are the key steps?',
      'What is the expected result?',
    ],
  },
  {
    id: 'reel-motivacional',
    name: 'Motivational Reel',
    description: 'Inspire your audience with a powerful message',
    type: 'motivacional',
    structure: '5 shots: Emotional hook + Uncomfortable truth + Insight + Action + CTA',
    prompts: [
      'What message do you want to convey?',
      'What truth does no one talk about?',
      'What specific action do you propose?',
    ],
  },
  {
    id: 'reel-educativo',
    name: 'Educational Reel',
    description: 'Teach something new to your audience',
    type: 'educativo',
    structure: '5 shots: Question + Concept + Example + Application + CTA',
    prompts: [
      'What do you want to teach?',
      'How would you explain it to a child?',
      'What is a practical example?',
    ],
  },
];

export const useTemplatesStore = create<TemplatesStore>()((set) => ({
  // State
  templates: DEFAULT_TEMPLATES,
  selectedTemplate: null,
  isLoading: false,

  // Actions
  setTemplates: (templates) => set({ templates }),
  selectTemplate: (selectedTemplate) => set({ selectedTemplate }),
  setLoading: (isLoading) => set({ isLoading }),
}));
