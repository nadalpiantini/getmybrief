import { useState } from 'react';
import { Button, Input, Card } from '@/components/ui';
import { useCreatorStore, type CreatorProfile } from '@/lib/stores/creator-store';
import { User, Mic, Sparkles, ArrowRight, Check } from 'lucide-react';

const NICHE_SUGGESTIONS = [
  'Productividad',
  'Emprendimiento',
  'Finanzas personales',
  'Desarrollo personal',
  'Fitness',
  'Marketing digital',
  'Lifestyle',
  'Tech',
];

const VOICE_SUGGESTIONS = [
  'Directo y sin filtros',
  'Motivacional y energico',
  'Calido y cercano',
  'Profesional y educativo',
  'Humoristico y casual',
  'Reflexivo y profundo',
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
        <h2 className="text-lg font-bold text-white">Configurar tu perfil de creador</h2>
        <p className="text-sm text-gray-400 mt-1">
          Esto me ayuda a generar contenido alineado con tu marca personal
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
                <h3 className="font-semibold text-white">Identidad</h3>
                <p className="text-sm text-gray-400">Como te conoce tu audiencia</p>
              </div>
            </div>

            <Input
              label="Nombre o alias"
              value={formData.name || ''}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="@tunombre o como te conocen"
            />

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tu nicho principal
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
                placeholder="O escribe tu propio nicho..."
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
                <h3 className="font-semibold text-white">Voz y audiencia</h3>
                <p className="text-sm text-gray-400">Como hablas y a quien</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tu estilo de comunicacion
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
                placeholder="Describe tu tono unico..."
              />
            </div>

            <Input
              label="Tu audiencia objetivo"
              value={formData.targetAudience || ''}
              onChange={(e) => updateField('targetAudience', e.target.value)}
              placeholder="Ej: Emprendedores de 25-35 que buscan productividad"
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
                <h3 className="font-semibold text-white">Tu diferenciador</h3>
                <p className="text-sm text-gray-400">Que te hace unico (opcional)</p>
              </div>
            </div>

            <Input
              label="Tu angulo unico"
              value={formData.uniqueAngle || ''}
              onChange={(e) => updateField('uniqueAngle', e.target.value)}
              placeholder="Ej: CEO que documenta su journey desde cero"
              helperText="Que perspectiva unica ofreces que otros no?"
            />

            {/* Summary Card */}
            <Card className="bg-primary/5 border-primary/20">
              <h4 className="font-medium text-primary mb-3">Resumen de tu perfil</h4>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-gray-400">Nombre:</span>{' '}
                  <span className="text-white">{formData.name || '-'}</span>
                </p>
                <p>
                  <span className="text-gray-400">Nicho:</span>{' '}
                  <span className="text-white">{formData.niche || '-'}</span>
                </p>
                <p>
                  <span className="text-gray-400">Voz:</span>{' '}
                  <span className="text-white">{formData.voice || '-'}</span>
                </p>
                <p>
                  <span className="text-gray-400">Audiencia:</span>{' '}
                  <span className="text-white">{formData.targetAudience || '-'}</span>
                </p>
                {formData.uniqueAngle && (
                  <p>
                    <span className="text-gray-400">Angulo:</span>{' '}
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
            Atras
          </Button>
        )}

        {step < 3 ? (
          <Button onClick={() => setStep((s) => s + 1)} disabled={!canProceed()} className="flex-1">
            Siguiente
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleComplete} disabled={!canProceed()} className="flex-1">
            <Check className="w-4 h-4 mr-2" />
            Empezar a crear
          </Button>
        )}
      </div>
    </div>
  );
}
