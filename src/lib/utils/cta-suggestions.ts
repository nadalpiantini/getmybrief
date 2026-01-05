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
    { text: 'Save this reel for when you need it', category: 'save', intensity: 'soft' },
    { text: 'Share with someone who needs to know this', category: 'share', intensity: 'medium' },
    { text: 'Follow me for more tips like this', category: 'follow', intensity: 'medium' },
    { text: 'What topic should I explain next? Drop it in the comments', category: 'engagement', intensity: 'soft' },
    { text: 'Link in bio for the full guide', category: 'action', intensity: 'strong' },
  ],
  inspire: [
    { text: 'If this resonated, follow me for more', category: 'follow', intensity: 'soft' },
    { text: 'Tag someone who needs to hear this', category: 'share', intensity: 'medium' },
    { text: 'Save it for the tough days', category: 'save', intensity: 'soft' },
    { text: 'Comment "ME" if you relate', category: 'engagement', intensity: 'medium' },
    { text: 'Share your story in the comments', category: 'engagement', intensity: 'soft' },
  ],
  entertain: [
    { text: 'Follow me for more content like this', category: 'follow', intensity: 'soft' },
    { text: 'Tag your friend who does this', category: 'share', intensity: 'medium' },
    { text: 'Drop your reaction in the comments', category: 'engagement', intensity: 'soft' },
    { text: 'Like if this made you laugh', category: 'engagement', intensity: 'soft' },
    { text: 'Check my latest reel for more', category: 'action', intensity: 'medium' },
  ],
  sell: [
    { text: 'Link in bio for more info', category: 'action', intensity: 'medium' },
    { text: 'DM me "INFO" to learn more', category: 'action', intensity: 'strong' },
    { text: 'Limited spots available', category: 'action', intensity: 'strong' },
    { text: 'Save it and take action when ready', category: 'save', intensity: 'soft' },
    { text: 'Comment "WANT" to get the link', category: 'action', intensity: 'strong' },
  ],
  general: [
    { text: 'Follow me for more content', category: 'follow', intensity: 'soft' },
    { text: 'Save for later', category: 'save', intensity: 'soft' },
    { text: 'What do you think? Drop it in the comments', category: 'engagement', intensity: 'soft' },
    { text: 'Share if you liked it', category: 'share', intensity: 'soft' },
    { text: 'More content on my profile', category: 'action', intensity: 'soft' },
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
  if (cta.toLowerCase().includes('comment') || cta.toLowerCase().includes('drop')) {
    return `${categoryEmojis.engagement} ${cta}`;
  }
  if (cta.toLowerCase().includes('follow')) {
    return `${categoryEmojis.follow} ${cta}`;
  }
  if (cta.toLowerCase().includes('save')) {
    return `${categoryEmojis.save} ${cta}`;
  }
  if (cta.toLowerCase().includes('share') || cta.toLowerCase().includes('tag')) {
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

  if (lowered.includes('educate') || lowered.includes('teach') || lowered.includes('explain')) {
    return 'educate';
  }
  if (lowered.includes('inspire') || lowered.includes('motivate') || lowered.includes('connect')) {
    return 'inspire';
  }
  if (lowered.includes('entertain') || lowered.includes('fun') || lowered.includes('humor')) {
    return 'entertain';
  }
  if (lowered.includes('sell') || lowered.includes('promote') || lowered.includes('launch')) {
    return 'sell';
  }

  return 'general';
}
