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

// Default templates based on Sistema Nadal
const DEFAULT_TEMPLATES: Template[] = [
  {
    id: 'reel-tip',
    name: 'Reel Tip Rapido',
    description: 'Comparte un tip valioso en menos de 30 segundos',
    type: 'tip',
    structure: '5 tomas: Hook + Contexto + Tip + Prueba + CTA',
    prompts: [
      'Que tip quieres compartir?',
      'Cual es el problema que resuelve?',
      'Tienes un ejemplo personal?',
    ],
  },
  {
    id: 'reel-storytelling',
    name: 'Reel Storytelling',
    description: 'Cuenta una historia que conecte emocionalmente',
    type: 'storytelling',
    structure: '5 tomas: Situacion + Conflicto + Punto de quiebre + Resolucion + Leccion',
    prompts: [
      'Cual es la historia que quieres contar?',
      'Cual fue el momento mas dificil?',
      'Que aprendiste de esa experiencia?',
    ],
  },
  {
    id: 'reel-proceso',
    name: 'Reel Proceso',
    description: 'Muestra un proceso paso a paso',
    type: 'proceso',
    structure: '5 tomas: Resultado final + Paso 1 + Paso 2 + Paso 3 + CTA',
    prompts: [
      'Que proceso quieres mostrar?',
      'Cuales son los pasos clave?',
      'Cual es el resultado esperado?',
    ],
  },
  {
    id: 'reel-motivacional',
    name: 'Reel Motivacional',
    description: 'Inspira a tu audiencia con un mensaje poderoso',
    type: 'motivacional',
    structure: '5 tomas: Gancho emocional + Verdad incomoda + Insight + Accion + CTA',
    prompts: [
      'Cual es el mensaje que quieres transmitir?',
      'Cual es la verdad que nadie dice?',
      'Que accion concreta propones?',
    ],
  },
  {
    id: 'reel-educativo',
    name: 'Reel Educativo',
    description: 'Ensena algo nuevo a tu audiencia',
    type: 'educativo',
    structure: '5 tomas: Pregunta + Concepto + Ejemplo + Aplicacion + CTA',
    prompts: [
      'Que quieres ensenar?',
      'Como lo explicarias a un nino?',
      'Cual es un ejemplo practico?',
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
