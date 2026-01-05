import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { Target, Mic, Clock, ChevronDown, X } from 'lucide-react';

export interface ScriptOptions {
  goal: 'educate' | 'inspire' | 'entertain' | 'sell' | null;
  tone: 'casual' | 'professional' | 'energetic' | 'emotional' | null;
  duration: '15s' | '30s' | '60s' | null;
}

interface QuickOptionsBarProps {
  options: ScriptOptions;
  onChange: (options: ScriptOptions) => void;
  onClear: () => void;
  isVisible: boolean;
}

const GOALS = [
  { value: 'educate', label: 'Educate', icon: '📚', desc: 'Teach something valuable' },
  { value: 'inspire', label: 'Inspire', icon: '✨', desc: 'Motivate and connect' },
  { value: 'entertain', label: 'Entertain', icon: '🎭', desc: 'Fun and engaging' },
  { value: 'sell', label: 'Sell', icon: '💰', desc: 'Promote product/service' },
] as const;

const TONES = [
  { value: 'casual', label: 'Casual', icon: '😊', desc: 'Friendly and relaxed' },
  { value: 'professional', label: 'Professional', icon: '💼', desc: 'Polished and formal' },
  { value: 'energetic', label: 'Energetic', icon: '⚡', desc: 'High energy and bold' },
  { value: 'emotional', label: 'Emotional', icon: '💜', desc: 'Deep and personal' },
] as const;

const DURATIONS = [
  { value: '15s', label: '15 sec', desc: 'Quick hit' },
  { value: '30s', label: '30 sec', desc: 'Standard' },
  { value: '60s', label: '60 sec', desc: 'Deep dive' },
] as const;

export function QuickOptionsBar({
  options,
  onChange,
  onClear,
  isVisible,
}: QuickOptionsBarProps) {
  const [expandedSection, setExpandedSection] = useState<'goal' | 'tone' | 'duration' | null>(null);

  const hasAnyOption = options.goal || options.tone || options.duration;

  const toggleSection = (section: 'goal' | 'tone' | 'duration') => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const selectGoal = (goal: ScriptOptions['goal']) => {
    onChange({ ...options, goal });
    setExpandedSection(null);
  };

  const selectTone = (tone: ScriptOptions['tone']) => {
    onChange({ ...options, tone });
    setExpandedSection(null);
  };

  const selectDuration = (duration: ScriptOptions['duration']) => {
    onChange({ ...options, duration });
    setExpandedSection(null);
  };

  if (!isVisible) return null;

  return (
    <div className="px-4 pb-2 animate-fade-in-up">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs text-gray-500">Quick options:</span>
        {hasAnyOption && (
          <button
            onClick={onClear}
            className="text-xs text-gray-500 hover:text-white flex items-center gap-1 transition-colors"
          >
            <X className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {/* Goal Selector */}
        <div className="relative">
          <button
            onClick={() => toggleSection('goal')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-all',
              options.goal
                ? 'bg-primary/20 border-primary/50 text-primary-400'
                : 'bg-surface border-border text-gray-400 hover:border-border-strong'
            )}
          >
            <Target className="w-3 h-3" />
            {options.goal
              ? GOALS.find((g) => g.value === options.goal)?.label
              : 'Goal'}
            <ChevronDown
              className={cn(
                'w-3 h-3 transition-transform',
                expandedSection === 'goal' && 'rotate-180'
              )}
            />
          </button>

          {expandedSection === 'goal' && (
            <div className="absolute top-full left-0 mt-1 bg-surface-1 border border-border rounded-lg shadow-xl z-20 min-w-[180px] py-1 animate-fade-in-up">
              {GOALS.map((goal) => (
                <button
                  key={goal.value}
                  onClick={() => selectGoal(goal.value)}
                  className={cn(
                    'w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-surface-2 transition-colors',
                    options.goal === goal.value && 'bg-primary/10'
                  )}
                >
                  <span className="text-base">{goal.icon}</span>
                  <div>
                    <p className="text-xs font-medium text-white">{goal.label}</p>
                    <p className="text-[10px] text-gray-500">{goal.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tone Selector */}
        <div className="relative">
          <button
            onClick={() => toggleSection('tone')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-all',
              options.tone
                ? 'bg-accent/20 border-accent/50 text-accent'
                : 'bg-surface border-border text-gray-400 hover:border-border-strong'
            )}
          >
            <Mic className="w-3 h-3" />
            {options.tone
              ? TONES.find((t) => t.value === options.tone)?.label
              : 'Tone'}
            <ChevronDown
              className={cn(
                'w-3 h-3 transition-transform',
                expandedSection === 'tone' && 'rotate-180'
              )}
            />
          </button>

          {expandedSection === 'tone' && (
            <div className="absolute top-full left-0 mt-1 bg-surface-1 border border-border rounded-lg shadow-xl z-20 min-w-[180px] py-1 animate-fade-in-up">
              {TONES.map((tone) => (
                <button
                  key={tone.value}
                  onClick={() => selectTone(tone.value)}
                  className={cn(
                    'w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-surface-2 transition-colors',
                    options.tone === tone.value && 'bg-accent/10'
                  )}
                >
                  <span className="text-base">{tone.icon}</span>
                  <div>
                    <p className="text-xs font-medium text-white">{tone.label}</p>
                    <p className="text-[10px] text-gray-500">{tone.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Duration Selector */}
        <div className="relative">
          <button
            onClick={() => toggleSection('duration')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-all',
              options.duration
                ? 'bg-success/20 border-success/50 text-success'
                : 'bg-surface border-border text-gray-400 hover:border-border-strong'
            )}
          >
            <Clock className="w-3 h-3" />
            {options.duration || 'Duration'}
            <ChevronDown
              className={cn(
                'w-3 h-3 transition-transform',
                expandedSection === 'duration' && 'rotate-180'
              )}
            />
          </button>

          {expandedSection === 'duration' && (
            <div className="absolute top-full left-0 mt-1 bg-surface-1 border border-border rounded-lg shadow-xl z-20 min-w-[140px] py-1 animate-fade-in-up">
              {DURATIONS.map((duration) => (
                <button
                  key={duration.value}
                  onClick={() => selectDuration(duration.value)}
                  className={cn(
                    'w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-surface-2 transition-colors',
                    options.duration === duration.value && 'bg-success/10'
                  )}
                >
                  <div>
                    <p className="text-xs font-medium text-white">{duration.label}</p>
                    <p className="text-[10px] text-gray-500">{duration.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Selected Options Summary */}
      {hasAnyOption && (
        <div className="mt-2 text-[10px] text-gray-500">
          Generating with:{' '}
          {[
            options.goal && GOALS.find((g) => g.value === options.goal)?.label,
            options.tone && TONES.find((t) => t.value === options.tone)?.label,
            options.duration,
          ]
            .filter(Boolean)
            .join(' • ')}
        </div>
      )}
    </div>
  );
}

// Export utility to build enhanced prompt with options
export function buildPromptWithOptions(
  basePrompt: string,
  options: ScriptOptions
): string {
  const parts: string[] = [basePrompt];

  if (options.goal) {
    const goalDescriptions: Record<string, string> = {
      educate: 'The goal is to EDUCATE - teach something valuable with clear takeaways',
      inspire: 'The goal is to INSPIRE - create emotional connection and motivation',
      entertain: 'The goal is to ENTERTAIN - make it fun, engaging, and shareable',
      sell: 'The goal is to SELL - include compelling reasons to take action',
    };
    parts.push(goalDescriptions[options.goal]);
  }

  if (options.tone) {
    const toneDescriptions: Record<string, string> = {
      casual: 'Use a CASUAL tone - friendly, conversational, like talking to a friend',
      professional: 'Use a PROFESSIONAL tone - polished, authoritative, but approachable',
      energetic: 'Use an ENERGETIC tone - high energy, bold statements, exciting delivery',
      emotional: 'Use an EMOTIONAL tone - vulnerable, personal, deep connection',
    };
    parts.push(toneDescriptions[options.tone]);
  }

  if (options.duration) {
    const durationDescriptions: Record<string, string> = {
      '15s': 'Keep it SHORT (15 seconds) - punchy hook, quick value, immediate CTA',
      '30s': 'Standard length (30 seconds) - full 5-shot structure with good pacing',
      '60s': 'Extended format (60 seconds) - deeper storytelling, more detail, comprehensive',
    };
    parts.push(durationDescriptions[options.duration]);
  }

  return parts.join('\n\n');
}
