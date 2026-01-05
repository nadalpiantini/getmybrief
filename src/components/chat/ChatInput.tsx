import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { Send, Sparkles, Sliders, Zap } from 'lucide-react';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import { QUICK_PROMPTS } from '@/lib/utils/prompts';
import { QuickOptionsBar, buildPromptWithOptions, type ScriptOptions } from './QuickOptionsBar';

interface ChatInputProps {
  onSend: (message: string, options?: ScriptOptions) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

const DEFAULT_OPTIONS: ScriptOptions = {
  goal: null,
  tone: null,
  duration: null,
};

export function ChatInput({ onSend, isLoading = false, disabled = false }: ChatInputProps) {
  const [input, setInput] = useState('');
  const [showQuickPrompts, setShowQuickPrompts] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState<ScriptOptions>(DEFAULT_OPTIONS);
  const [inputMode, setInputMode] = useState<'quick' | 'guided'>('quick');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (trimmed && !isLoading && !disabled) {
      // Build enhanced prompt with options
      const enhancedPrompt = buildPromptWithOptions(trimmed, options);
      onSend(enhancedPrompt, options);
      setInput('');
      setShowQuickPrompts(false);
      setOptions(DEFAULT_OPTIONS);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter to send (Shift+Enter for newline)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
    setShowQuickPrompts(false);
    textareaRef.current?.focus();
  };

  const hasOptions = options.goal || options.tone || options.duration;

  return (
    <div className="border-t border-border bg-background">
      {/* Quick Options Bar */}
      <QuickOptionsBar
        options={options}
        onChange={setOptions}
        onClear={() => setOptions(DEFAULT_OPTIONS)}
        isVisible={showOptions}
      />

      {/* Quick prompts */}
      {showQuickPrompts && (
        <div className="px-4 pb-2">
          <p className="text-xs text-gray-500 mb-2">Quick starters:</p>
          <div className="flex flex-wrap gap-2">
            {QUICK_PROMPTS.map((qp) => (
              <button
                key={qp.label}
                onClick={() => handleQuickPrompt(qp.prompt)}
                className="text-xs px-3 py-1.5 bg-surface hover:bg-surface-hover border border-border rounded-full text-gray-300 hover:text-white transition-colors"
              >
                {qp.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 pt-2">
        {/* Mode Toggle */}
        <div className="flex items-center gap-2 mb-2">
          <button
            onClick={() => setInputMode('quick')}
            className={cn(
              'flex items-center gap-1 px-2 py-1 rounded text-xs transition-all',
              inputMode === 'quick'
                ? 'bg-primary/20 text-primary-400'
                : 'text-gray-500 hover:text-gray-300'
            )}
          >
            <Zap className="w-3 h-3" />
            Quick
          </button>
          <button
            onClick={() => {
              setInputMode('guided');
              setShowOptions(true);
            }}
            className={cn(
              'flex items-center gap-1 px-2 py-1 rounded text-xs transition-all',
              inputMode === 'guided'
                ? 'bg-accent/20 text-accent'
                : 'text-gray-500 hover:text-gray-300'
            )}
          >
            <Sliders className="w-3 h-3" />
            Guided
          </button>
          {hasOptions && (
            <span className="text-[10px] text-gray-500 ml-auto">
              Options applied
            </span>
          )}
        </div>

        <div className="flex gap-2 items-end">
          {/* Quick prompts toggle */}
          <button
            onClick={() => setShowQuickPrompts(!showQuickPrompts)}
            className={cn(
              'p-2 rounded-lg transition-colors',
              showQuickPrompts
                ? 'bg-primary text-white'
                : 'bg-surface text-gray-400 hover:text-white hover:bg-surface-hover'
            )}
            title="Quick prompts"
          >
            <Sparkles className="w-5 h-5" />
          </button>

          {/* Options toggle */}
          <button
            onClick={() => setShowOptions(!showOptions)}
            className={cn(
              'p-2 rounded-lg transition-colors',
              showOptions || hasOptions
                ? 'bg-accent text-white'
                : 'bg-surface text-gray-400 hover:text-white hover:bg-surface-hover'
            )}
            title="Script options"
          >
            <Sliders className="w-5 h-5" />
          </button>

          {/* Text input */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                inputMode === 'guided'
                  ? 'Describe your reel idea (options will be applied)...'
                  : 'Describe your reel idea...'
              }
              disabled={disabled || isLoading}
              rows={1}
              className={cn(
                'w-full px-4 py-3 bg-surface border border-border rounded-xl text-white placeholder-gray-500 resize-none',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'transition-all duration-200',
                hasOptions && 'border-accent/50'
              )}
            />
            <div className="absolute right-3 bottom-2 text-xs text-gray-500">
              {input.length > 0 && (
                <span className="opacity-60">Enter ↵</span>
              )}
            </div>
          </div>

          {/* Send button */}
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading || disabled}
            isLoading={isLoading}
            className="h-[46px] px-4"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
