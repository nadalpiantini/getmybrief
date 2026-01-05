/**
 * CTA Suggestions by Goal
 *
 * Provides contextual call-to-action suggestions based on the creator's
 * content goal (educate, inspire, entertain, sell).
 */

export type ContentGoal = 'educate' | 'inspire' | 'entertain' | 'sell' | 'general';

export interface CTASuggestion {
  text: string;
  category: 'engagement' | 'follow' | 'save' | 'share' | 'action';
  intensity: 'soft' | 'medium' | 'strong';
}

export const CTA_BY_GOAL: Record<ContentGoal, CTASuggestion[]> = {
  educate: [
    { text: 'Guarda este reel para cuando lo necesites', category: 'save', intensity: 'soft' },
    { text: 'Comparte con alguien que necesita saber esto', category: 'share', intensity: 'medium' },
    { text: 'Sígueme para más tips como este', category: 'follow', intensity: 'medium' },
    { text: '¿Qué tema quieres que explique? Déjalo en comentarios', category: 'engagement', intensity: 'soft' },
    { text: 'Link en bio para la guía completa', category: 'action', intensity: 'strong' },
  ],
  inspire: [
    { text: 'Si esto te resonó, sígueme para más', category: 'follow', intensity: 'soft' },
    { text: 'Etiqueta a alguien que necesita escuchar esto', category: 'share', intensity: 'medium' },
    { text: 'Guárdalo para los días difíciles', category: 'save', intensity: 'soft' },
    { text: 'Escribe "YO" si te identificas', category: 'engagement', intensity: 'medium' },
    { text: 'Comparte tu historia en comentarios', category: 'engagement', intensity: 'soft' },
  ],
  entertain: [
    { text: 'Sígueme para más contenido así', category: 'follow', intensity: 'soft' },
    { text: 'Etiqueta a tu amigo que hace esto', category: 'share', intensity: 'medium' },
    { text: 'Comenta tu reacción', category: 'engagement', intensity: 'soft' },
    { text: 'Dale like si te hizo reír', category: 'engagement', intensity: 'soft' },
    { text: 'Mira mi último reel si quieres más', category: 'action', intensity: 'medium' },
  ],
  sell: [
    { text: 'Link en bio para más info', category: 'action', intensity: 'medium' },
    { text: 'Escríbeme "INFO" por DM', category: 'action', intensity: 'strong' },
    { text: 'Últimas plazas disponibles', category: 'action', intensity: 'strong' },
    { text: 'Guárdalo y toma acción cuando estés listo', category: 'save', intensity: 'soft' },
    { text: 'Comenta "QUIERO" para recibir el link', category: 'action', intensity: 'strong' },
  ],
  general: [
    { text: 'Sígueme para más contenido', category: 'follow', intensity: 'soft' },
    { text: 'Guarda para después', category: 'save', intensity: 'soft' },
    { text: '¿Qué opinas? Déjalo en comentarios', category: 'engagement', intensity: 'soft' },
    { text: 'Comparte si te gustó', category: 'share', intensity: 'soft' },
    { text: 'Más contenido en mi perfil', category: 'action', intensity: 'soft' },
  ],
};

/**
 * Get CTA suggestions for a specific goal
 */
export function getCTASuggestions(goal: ContentGoal): CTASuggestion[] {
  return CTA_BY_GOAL[goal] || CTA_BY_GOAL.general;
}

/**
 * Get a random CTA for a goal
 */
export function getRandomCTA(goal: ContentGoal): string {
  const suggestions = getCTASuggestions(goal);
  const randomIndex = Math.floor(Math.random() * suggestions.length);
  return suggestions[randomIndex].text;
}

/**
 * Get CTAs filtered by category
 */
export function getCTAsByCategory(
  goal: ContentGoal,
  category: CTASuggestion['category']
): CTASuggestion[] {
  return getCTASuggestions(goal).filter(cta => cta.category === category);
}

/**
 * Get CTAs filtered by intensity
 */
export function getCTAsByIntensity(
  goal: ContentGoal,
  intensity: CTASuggestion['intensity']
): CTASuggestion[] {
  return getCTASuggestions(goal).filter(cta => cta.intensity === intensity);
}

/**
 * Format CTA for display with optional emoji
 */
export function formatCTA(cta: string, includeEmoji = true): string {
  if (!includeEmoji) return cta;

  const categoryEmojis: Record<string, string> = {
    engagement: '💬',
    follow: '👆',
    save: '📌',
    share: '🔄',
    action: '👉',
  };

  // Find matching category by keyword detection
  if (cta.toLowerCase().includes('comenta') || cta.toLowerCase().includes('escribe')) {
    return `${categoryEmojis.engagement} ${cta}`;
  }
  if (cta.toLowerCase().includes('sígueme') || cta.toLowerCase().includes('follow')) {
    return `${categoryEmojis.follow} ${cta}`;
  }
  if (cta.toLowerCase().includes('guarda') || cta.toLowerCase().includes('save')) {
    return `${categoryEmojis.save} ${cta}`;
  }
  if (cta.toLowerCase().includes('comparte') || cta.toLowerCase().includes('etiqueta')) {
    return `${categoryEmojis.share} ${cta}`;
  }
  if (cta.toLowerCase().includes('link') || cta.toLowerCase().includes('dm')) {
    return `${categoryEmojis.action} ${cta}`;
  }

  return cta;
}

/**
 * Map goal keywords to ContentGoal type
 */
export function parseGoalFromText(text: string): ContentGoal {
  const lowered = text.toLowerCase();

  if (lowered.includes('educar') || lowered.includes('enseñar') || lowered.includes('explicar')) {
    return 'educate';
  }
  if (lowered.includes('inspirar') || lowered.includes('motivar') || lowered.includes('conectar')) {
    return 'inspire';
  }
  if (lowered.includes('entretener') || lowered.includes('divertir') || lowered.includes('humor')) {
    return 'entertain';
  }
  if (lowered.includes('vender') || lowered.includes('promocionar') || lowered.includes('lanzar')) {
    return 'sell';
  }

  return 'general';
}
