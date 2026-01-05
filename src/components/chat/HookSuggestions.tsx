import { useState } from 'react';
import { RefreshCw, Lightbulb, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface HookSuggestionsProps {
  hooks: string[];
  onSelectHook: (hook: string) => void;
  onRegenerateHooks: () => void;
  isLoading?: boolean;
}

export function HookSuggestions({
  hooks,
  onSelectHook,
  onRegenerateHooks,
  isLoading = false
}: HookSuggestionsProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (hook: string, index: number) => {
    setSelectedIndex(index);
    onSelectHook(hook);
  };

  if (hooks.length === 0) return null;

  return (
    <div className="bg-surface-1 border border-border rounded-xl p-4 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-white">
            Hook Alternatives
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRegenerateHooks}
          disabled={isLoading}
          leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />}
        >
          More
        </Button>
      </div>

      {/* Hook Options */}
      <div className="space-y-2">
        {hooks.map((hook, index) => {
          const isSelected = selectedIndex === index;
          const hookType = getHookType(index);

          return (
            <button
              key={index}
              onClick={() => handleSelect(hook, index)}
              className={`
                w-full text-left p-3 rounded-lg border transition-all duration-200
                ${isSelected
                  ? 'border-primary-500 bg-primary-500/10 ring-1 ring-primary-500/30'
                  : 'border-border hover:border-border-strong hover:bg-surface-2'
                }
              `}
            >
              <div className="flex items-start gap-3">
                <div className={`
                  flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium
                  ${isSelected
                    ? 'bg-primary-500 text-white'
                    : 'bg-surface-3 text-text-secondary'
                  }
                `}>
                  {isSelected ? <Check className="w-3.5 h-3.5" /> : index + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <span className={`
                    inline-block px-2 py-0.5 rounded text-xs font-medium mb-1
                    ${hookType.bgClass}
                  `}>
                    {hookType.label}
                  </span>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    "{hook}"
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Tip */}
      <p className="mt-3 text-xs text-text-muted text-center">
        Select a hook to regenerate the script
      </p>
    </div>
  );
}

function getHookType(index: number): { label: string; bgClass: string } {
  const types = [
    { label: 'Curiosity', bgClass: 'bg-primary-500/20 text-primary-400' },
    { label: 'Challenge', bgClass: 'bg-accent/20 text-accent' },
    { label: 'Identification', bgClass: 'bg-success/20 text-success' },
  ];
  return types[index % types.length];
}
