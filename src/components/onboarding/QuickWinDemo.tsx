import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Sparkles, Play, ArrowRight } from 'lucide-react';

interface QuickWinDemoProps {
  onComplete: () => void;
  onSkip: () => void;
}

const DEMO_SCRIPT = {
  topic: "How to overcome creative block",
  script: `**TAKE 1 - HOOK (2s)**
"Ever stared at your screen with no idea what to post?"

**TAKE 2 - PROBLEM (5s)**
"Creative block isn't lack of ideas.
It's paralysis from too many options."

**TAKE 3 - AGITATION (5s)**
"While you're thinking about what to post,
others are stealing YOUR audience's attention."

**TAKE 4 - SOLUTION (10s)**
"Use the 3-question method:
1. What problem do I solve?
2. What emotion do I want to trigger?
3. What action do I want them to take?

With this, you have a script in 30 seconds."

**TAKE 5 - CTA (3s)**
"Save this reel for when you need it.
And follow me for more systems that work."`,
};

export function QuickWinDemo({ onComplete, onSkip }: QuickWinDemoProps) {
  const [phase, setPhase] = useState<'intro' | 'generating' | 'result'>('intro');
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  // Typing animation effect
  useEffect(() => {
    if (phase !== 'generating') return;

    if (charIndex < DEMO_SCRIPT.script.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(DEMO_SCRIPT.script.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 15); // Speed of typing
      return () => clearTimeout(timeout);
    } else {
      // Finished typing
      setTimeout(() => setPhase('result'), 500);
    }
  }, [phase, charIndex]);

  const handleStartDemo = () => {
    setPhase('generating');
    setDisplayedText('');
    setCharIndex(0);
  };

  return (
    <div className="flex flex-col h-full bg-background p-4">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 mb-3">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold text-white mb-1">
          See how it works
        </h1>
        <p className="text-sm text-text-secondary">
          A complete script in 30 seconds
        </p>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {phase === 'intro' && (
          <div className="flex flex-col items-center justify-center h-full animate-fade-in-up">
            <div className="bg-surface-1 border border-border rounded-xl p-4 mb-6 w-full">
              <p className="text-sm text-text-secondary mb-2">Example topic:</p>
              <p className="text-white font-medium">"{DEMO_SCRIPT.topic}"</p>
            </div>

            <Button
              onClick={handleStartDemo}
              size="lg"
              leftIcon={<Play className="w-5 h-5" />}
              className="w-full"
            >
              See the magic
            </Button>
          </div>
        )}

        {phase === 'generating' && (
          <div className="h-full flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce-dot" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce-dot" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce-dot" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-sm text-primary-400">Generating script...</span>
            </div>

            <div className="flex-1 overflow-y-auto bg-surface-1 border border-border rounded-xl p-4">
              <pre className="text-sm text-text-secondary whitespace-pre-wrap font-sans leading-relaxed">
                {displayedText}
                <span className="animate-typing">|</span>
              </pre>
            </div>
          </div>
        )}

        {phase === 'result' && (
          <div className="h-full flex flex-col animate-fade-in-up">
            <div className="flex-1 overflow-y-auto bg-surface-1 border border-primary-500/30 rounded-xl p-4 mb-4 shadow-glow-sm">
              <pre className="text-sm text-text-secondary whitespace-pre-wrap font-sans leading-relaxed">
                {DEMO_SCRIPT.script}
              </pre>
            </div>

            <div className="bg-gradient-to-r from-primary-500/10 to-primary-600/10 border border-primary-500/20 rounded-lg p-3 mb-4">
              <p className="text-sm text-white text-center">
                <span className="text-primary-400 font-semibold">30 seconds!</span>
                {' '}Script ready to record
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="mt-4 space-y-2">
        {phase === 'result' && (
          <Button
            onClick={onComplete}
            size="lg"
            rightIcon={<ArrowRight className="w-5 h-5" />}
            className="w-full"
          >
            I want personalized scripts
          </Button>
        )}

        <button
          onClick={onSkip}
          className="w-full py-2 text-sm text-text-muted hover:text-text-secondary transition-colors"
        >
          {phase === 'result' ? 'Continue without setup' : 'Skip demo'}
        </button>
      </div>
    </div>
  );
}
