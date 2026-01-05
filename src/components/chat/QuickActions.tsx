import { useState } from 'react';
import {
  RefreshCw,
  Scissors,
  Heart,
  Star,
  Copy,
  Check,
  Sparkles
} from 'lucide-react';
import toast from 'react-hot-toast';

interface QuickActionsProps {
  scriptContent: string;
  onRegenerateHook: () => void;
  onMakeShorter: () => void;
  onAddEmotion: () => void;
  onSaveToFavorites: () => void;
  isSaved?: boolean;
  isLoading?: boolean;
}

export function QuickActions({
  scriptContent,
  onRegenerateHook,
  onMakeShorter,
  onAddEmotion,
  onSaveToFavorites,
  isSaved = false,
  isLoading = false,
}: QuickActionsProps) {
  const [copied, setCopied] = useState(false);
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(scriptContent);
      setCopied(true);
      toast.success('Guión copiado');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Error al copiar');
    }
  };

  const handleAction = (action: string, callback: () => void) => {
    if (isLoading) return;
    setActiveAction(action);
    callback();
    // Reset after animation
    setTimeout(() => setActiveAction(null), 300);
  };

  const actions = [
    {
      id: 'hook',
      icon: RefreshCw,
      label: 'Nuevo Hook',
      onClick: () => handleAction('hook', onRegenerateHook),
      color: 'text-primary-400 hover:bg-primary-500/10',
    },
    {
      id: 'shorter',
      icon: Scissors,
      label: 'Más Corto',
      onClick: () => handleAction('shorter', onMakeShorter),
      color: 'text-info-400 hover:bg-info-500/10',
    },
    {
      id: 'emotion',
      icon: Heart,
      label: 'Más Emoción',
      onClick: () => handleAction('emotion', onAddEmotion),
      color: 'text-error-400 hover:bg-error-500/10',
    },
    {
      id: 'save',
      icon: isSaved ? Check : Star,
      label: isSaved ? 'Guardado' : 'Guardar',
      onClick: onSaveToFavorites,
      color: isSaved
        ? 'text-accent bg-accent/10'
        : 'text-accent hover:bg-accent/10',
    },
    {
      id: 'copy',
      icon: copied ? Check : Copy,
      label: copied ? 'Copiado' : 'Copiar',
      onClick: handleCopy,
      color: copied
        ? 'text-success bg-success/10'
        : 'text-text-secondary hover:bg-surface-3',
    },
  ];

  return (
    <div className="flex flex-wrap gap-1.5 mt-3 animate-fade-in-up">
      {actions.map(({ id, icon: Icon, label, onClick, color }) => (
        <button
          key={id}
          onClick={onClick}
          disabled={isLoading && id !== 'copy' && id !== 'save'}
          className={`
            inline-flex items-center gap-1.5 px-2.5 py-1.5
            rounded-lg text-xs font-medium
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            ${color}
            ${activeAction === id ? 'scale-95' : ''}
          `}
        >
          <Icon className={`w-3.5 h-3.5 ${isLoading && activeAction === id ? 'animate-spin' : ''}`} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}

// Compact variant for inline use
export function QuickActionsCompact({
  onRegenerateHook,
  onCopy,
  onSave,
  isSaved = false,
}: {
  onRegenerateHook: () => void;
  onCopy: () => void;
  onSave: () => void;
  isSaved?: boolean;
}) {
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={onRegenerateHook}
        className="p-1.5 rounded-md text-text-muted hover:text-primary-400 hover:bg-primary-500/10 transition-colors"
        title="Regenerar Hook"
      >
        <Sparkles className="w-4 h-4" />
      </button>
      <button
        onClick={onCopy}
        className="p-1.5 rounded-md text-text-muted hover:text-white hover:bg-surface-3 transition-colors"
        title="Copiar"
      >
        <Copy className="w-4 h-4" />
      </button>
      <button
        onClick={onSave}
        className={`p-1.5 rounded-md transition-colors ${
          isSaved
            ? 'text-accent bg-accent/10'
            : 'text-text-muted hover:text-accent hover:bg-accent/10'
        }`}
        title={isSaved ? 'Guardado' : 'Guardar'}
      >
        <Star className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
      </button>
    </div>
  );
}
