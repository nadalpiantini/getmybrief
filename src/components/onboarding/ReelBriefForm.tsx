import { useState } from 'react';
import { Button, Input, Card } from '@/components/ui';
import { useCreatorStore, type ReelBrief } from '@/lib/stores/creator-store';
import { FileText, Target, Heart, MessageSquare, X, Zap } from 'lucide-react';

const GOAL_OPTIONS = [
  { value: 'educate', label: 'Educar', icon: '📚', desc: 'Ensenar algo nuevo' },
  { value: 'inspire', label: 'Inspirar', icon: '🔥', desc: 'Motivar a la accion' },
  { value: 'entertain', label: 'Entretener', icon: '😄', desc: 'Enganchar y divertir' },
  { value: 'sell', label: 'Vender', icon: '💰', desc: 'Promover algo' },
] as const;

const EMOTION_SUGGESTIONS = [
  'Motivacion',
  'Curiosidad',
  'Urgencia',
  'Identificacion',
  'Sorpresa',
  'Confianza',
  'FOMO',
  'Aspiracion',
];

interface ReelBriefFormProps {
  onSubmit: (brief: ReelBrief) => void;
  onSkip: () => void;
}

export function ReelBriefForm({ onSubmit, onSkip }: ReelBriefFormProps) {
  const { profile } = useCreatorStore();
  const [brief, setBrief] = useState<ReelBrief>({
    topic: '',
    goal: '',
    emotion: '',
    callToAction: '',
    additionalContext: '',
  });

  const updateField = (field: keyof ReelBrief, value: string) => {
    setBrief((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(brief);
  };

  const isValid = brief.topic && brief.goal;

  return (
    <div className="absolute inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
            <FileText className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-white">Brief del Reel</h2>
            <p className="text-xs text-gray-500">Define el contexto para generar mejor</p>
          </div>
        </div>
        <button
          onClick={onSkip}
          className="p-2 text-gray-400 hover:text-white hover:bg-surface rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Topic */}
        <div>
          <Input
            label="Tema o idea principal"
            value={brief.topic}
            onChange={(e) => updateField('topic', e.target.value)}
            placeholder="De que va a tratar este reel?"
          />
        </div>

        {/* Goal */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <Target className="w-4 h-4 inline mr-2" />
            Objetivo del reel
          </label>
          <div className="grid grid-cols-2 gap-2">
            {GOAL_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => updateField('goal', option.value)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  brief.goal === option.value
                    ? 'bg-primary/20 border-primary'
                    : 'bg-surface border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{option.icon}</span>
                  <span className="font-medium text-white text-sm">{option.label}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{option.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Emotion */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <Heart className="w-4 h-4 inline mr-2" />
            Emocion a generar
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {EMOTION_SUGGESTIONS.map((emotion) => (
              <button
                key={emotion}
                onClick={() => updateField('emotion', emotion)}
                className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                  brief.emotion === emotion
                    ? 'bg-accent border-accent text-white'
                    : 'bg-surface border-border text-gray-300 hover:border-accent'
                }`}
              >
                {emotion}
              </button>
            ))}
          </div>
          <Input
            value={brief.emotion}
            onChange={(e) => updateField('emotion', e.target.value)}
            placeholder="O escribe la emocion..."
          />
        </div>

        {/* CTA */}
        <Input
          label="Call to Action deseado"
          value={brief.callToAction}
          onChange={(e) => updateField('callToAction', e.target.value)}
          placeholder="Que quieres que haga la audiencia?"
          helperText="Ej: Que guarden, comenten, visiten tu bio..."
        />

        {/* Additional Context */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <MessageSquare className="w-4 h-4 inline mr-2" />
            Contexto adicional (opcional)
          </label>
          <textarea
            value={brief.additionalContext}
            onChange={(e) => updateField('additionalContext', e.target.value)}
            placeholder="Algo mas que deba saber? Referencias, estilo especifico, tendencias..."
            rows={3}
            className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-sm"
          />
        </div>

        {/* Profile Preview */}
        {profile.name && (
          <Card className="bg-surface/50">
            <p className="text-xs text-gray-400 mb-2">Generando para:</p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                {profile.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{profile.name}</p>
                <p className="text-xs text-gray-400">{profile.niche}</p>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border flex gap-3">
        <Button variant="ghost" onClick={onSkip} className="flex-1">
          Saltar
        </Button>
        <Button onClick={handleSubmit} disabled={!isValid} className="flex-1">
          <Zap className="w-4 h-4 mr-2" />
          Generar con brief
        </Button>
      </div>
    </div>
  );
}
