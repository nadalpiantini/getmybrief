import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import { QUICK_PROMPTS } from '@/lib/utils/prompts';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function ChatInput({ onSend, isLoading = false, disabled = false }: ChatInputProps) {
  const [input, setInput] = useState('');
  const [showQuickPrompts, setShowQuickPrompts] = useState(false);
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
      onSend(trimmed);
      setInput('');
      setShowQuickPrompts(false);
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

  return (
    <div className="border-t border-border bg-background p-4">
      {/* Quick prompts */}
      {showQuickPrompts && (
        <div className="mb-3 flex flex-wrap gap-2">
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
      )}

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

        {/* Text input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe your reel idea..."
            disabled={disabled || isLoading}
            rows={1}
            className={cn(
              'w-full px-4 py-3 bg-surface border border-border rounded-xl text-white placeholder-gray-500 resize-none',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'transition-all duration-200'
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
  );
}
