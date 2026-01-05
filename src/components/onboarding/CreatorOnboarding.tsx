import { useState } from 'react';
import { Button, Input, Card } from '@/components/ui';
import { useCreatorStore, type CreatorProfile } from '@/lib/stores/creator-store';
import { User, Mic, Sparkles, ArrowRight, Check } from 'lucide-react';

const NICHE_SUGGESTIONS = [
  'Productivity',
  'Entrepreneurship',
  'Personal Finance',
  'Personal Development',
  'Fitness',
  'Digital Marketing',
  'Lifestyle',
  'Tech',
];

const VOICE_SUGGESTIONS = [
  'Direct and unfiltered',
  'Motivational and energetic',
  'Warm and relatable',
  'Professional and educational',
  'Humorous and casual',
  'Reflective and deep',
];

export function CreatorOnboarding() {
  const { profile, setProfile, setShowOnboarding } = useCreatorStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<CreatorProfile>>(profile);

  const updateField = (field: keyof CreatorProfile, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleComplete = () => {
    setProfile(formData);
    setShowOnboarding(false);
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return !!formData.name && !!formData.niche;
      case 2:
        return !!formData.voice && !!formData.targetAudience;
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border">
        <h2 className="text-lg font-bold text-white">Set up your creator profile</h2>
        <p className="text-sm text-gray-400 mt-1">
          This helps me generate content aligned with your personal brand
        </p>

        {/* Progress */}
        <div className="flex gap-2 mt-4">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1 rounded-full transition-colors ${
                s <= step ? 'bg-primary' : 'bg-surface'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {step === 1 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Identity</h3>
                <p className="text-sm text-gray-400">How your audience knows you</p>
              </div>
            </div>

            <Input
              label="Name or alias"
              value={formData.name || ''}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="@yourname or how they know you"
            />

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Your main niche
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {NICHE_SUGGESTIONS.map((niche) => (
                  <button
                    key={niche}
                    onClick={() => updateField('niche', niche)}
                    className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                      formData.niche === niche
                        ? 'bg-primary border-primary text-white'
                        : 'bg-surface border-border text-gray-300 hover:border-primary'
                    }`}
                  >
                    {niche}
                  </button>
                ))}
              </div>
              <Input
                value={formData.niche || ''}
                onChange={(e) => updateField('niche', e.target.value)}
                placeholder="Or type your own niche..."
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
                <Mic className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Voice and audience</h3>
                <p className="text-sm text-gray-400">How you speak and to whom</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Your communication style
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {VOICE_SUGGESTIONS.map((voice) => (
                  <button
                    key={voice}
                    onClick={() => updateField('voice', voice)}
                    className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                      formData.voice === voice
                        ? 'bg-accent border-accent text-white'
                        : 'bg-surface border-border text-gray-300 hover:border-accent'
                    }`}
                  >
                    {voice}
                  </button>
                ))}
              </div>
              <Input
                value={formData.voice || ''}
                onChange={(e) => updateField('voice', e.target.value)}
                placeholder="Describe your unique tone..."
              />
            </div>

            <Input
              label="Your target audience"
              value={formData.targetAudience || ''}
              onChange={(e) => updateField('targetAudience', e.target.value)}
              placeholder="Ex: Entrepreneurs 25-35 seeking productivity"
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-success/20 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-success" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Your differentiator</h3>
                <p className="text-sm text-gray-400">What makes you unique (optional)</p>
              </div>
            </div>

            <Input
              label="Your unique angle"
              value={formData.uniqueAngle || ''}
              onChange={(e) => updateField('uniqueAngle', e.target.value)}
              placeholder="Ex: CEO documenting their journey from zero"
              helperText="What unique perspective do you offer that others don't?"
            />

            {/* Summary Card */}
            <Card className="bg-primary/5 border-primary/20">
              <h4 className="font-medium text-primary mb-3">Profile Summary</h4>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-gray-400">Name:</span>{' '}
                  <span className="text-white">{formData.name || '-'}</span>
                </p>
                <p>
                  <span className="text-gray-400">Niche:</span>{' '}
                  <span className="text-white">{formData.niche || '-'}</span>
                </p>
                <p>
                  <span className="text-gray-400">Voice:</span>{' '}
                  <span className="text-white">{formData.voice || '-'}</span>
                </p>
                <p>
                  <span className="text-gray-400">Audience:</span>{' '}
                  <span className="text-white">{formData.targetAudience || '-'}</span>
                </p>
                {formData.uniqueAngle && (
                  <p>
                    <span className="text-gray-400">Angle:</span>{' '}
                    <span className="text-white">{formData.uniqueAngle}</span>
                  </p>
                )}
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-border flex gap-3">
        {step > 1 && (
          <Button variant="secondary" onClick={() => setStep((s) => s - 1)} className="flex-1">
            Back
          </Button>
        )}

        {step < 3 ? (
          <Button onClick={() => setStep((s) => s + 1)} disabled={!canProceed()} className="flex-1">
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleComplete} disabled={!canProceed()} className="flex-1">
            <Check className="w-4 h-4 mr-2" />
            Start creating
          </Button>
        )}
      </div>
    </div>
  );
}
