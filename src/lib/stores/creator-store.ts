import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CreatorProfile {
  name: string;
  niche: string;
  voice: string;
  targetAudience: string;
  uniqueAngle: string;
  symbols: string[];
  hashtags: string[];
}

export interface ReelBrief {
  topic: string;
  goal: 'educate' | 'inspire' | 'entertain' | 'sell' | '';
  emotion: string;
  callToAction: string;
  additionalContext: string;
}

interface CreatorStore {
  // Creator Profile (persistent)
  profile: CreatorProfile;
  isProfileComplete: boolean;
  setProfile: (profile: Partial<CreatorProfile>) => void;

  // Current Reel Brief (per session)
  currentBrief: ReelBrief | null;
  setBrief: (brief: ReelBrief) => void;
  clearBrief: () => void;

  // UI State
  showOnboarding: boolean;
  showBriefForm: boolean;
  setShowOnboarding: (show: boolean) => void;
  setShowBriefForm: (show: boolean) => void;
}

const DEFAULT_PROFILE: CreatorProfile = {
  name: '',
  niche: '',
  voice: '',
  targetAudience: '',
  uniqueAngle: '',
  symbols: ['reloj 5AM', 'cafe', 'libreta'],
  hashtags: ['#SistemaNadal', '#CreadorEjecutivo'],
};

// Note: ReelBrief defaults are handled in component state

export const useCreatorStore = create<CreatorStore>()(
  persist(
    (set, get) => ({
      profile: DEFAULT_PROFILE,
      isProfileComplete: false,

      setProfile: (updates) => {
        const newProfile = { ...get().profile, ...updates };
        const isComplete = !!(
          newProfile.name &&
          newProfile.niche &&
          newProfile.voice &&
          newProfile.targetAudience
        );
        set({ profile: newProfile, isProfileComplete: isComplete });
      },

      currentBrief: null,
      setBrief: (brief) => set({ currentBrief: brief, showBriefForm: false }),
      clearBrief: () => set({ currentBrief: null }),

      showOnboarding: true,
      showBriefForm: false,
      setShowOnboarding: (show) => set({ showOnboarding: show }),
      setShowBriefForm: (show) => set({ showBriefForm: show }),
    }),
    {
      name: 'influencer-creator-storage',
      partialize: (state) => ({
        profile: state.profile,
        isProfileComplete: state.isProfileComplete,
        showOnboarding: !state.isProfileComplete, // Show onboarding if profile incomplete
      }),
    }
  )
);

/**
 * Generate context prompt from creator profile and brief
 */
export function generateCreatorContext(profile: CreatorProfile, brief: ReelBrief | null): string {
  const parts: string[] = [];

  if (profile.name) {
    parts.push(`## PERFIL DEL CREADOR`);
    parts.push(`- **Nombre**: ${profile.name}`);
    parts.push(`- **Nicho**: ${profile.niche}`);
    parts.push(`- **Voz/Tono**: ${profile.voice}`);
    parts.push(`- **Audiencia objetivo**: ${profile.targetAudience}`);
    if (profile.uniqueAngle) {
      parts.push(`- **Angulo unico**: ${profile.uniqueAngle}`);
    }
    if (profile.symbols.length > 0) {
      parts.push(`- **Simbolos visuales**: ${profile.symbols.join(', ')}`);
    }
    if (profile.hashtags.length > 0) {
      parts.push(`- **Hashtags**: ${profile.hashtags.join(' ')}`);
    }
  }

  if (brief) {
    parts.push('');
    parts.push(`## BRIEF DEL REEL`);
    if (brief.topic) parts.push(`- **Tema**: ${brief.topic}`);
    if (brief.goal) {
      const goalLabels = {
        educate: 'Educar',
        inspire: 'Inspirar',
        entertain: 'Entretener',
        sell: 'Vender',
      };
      parts.push(`- **Objetivo**: ${goalLabels[brief.goal as keyof typeof goalLabels] || brief.goal}`);
    }
    if (brief.emotion) parts.push(`- **Emocion a generar**: ${brief.emotion}`);
    if (brief.callToAction) parts.push(`- **CTA deseado**: ${brief.callToAction}`);
    if (brief.additionalContext) parts.push(`- **Contexto adicional**: ${brief.additionalContext}`);
  }

  return parts.join('\n');
}
