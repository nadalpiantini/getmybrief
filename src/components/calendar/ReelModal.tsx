import { useState, useEffect } from 'react';
import { X, Save, Trash2, Check } from 'lucide-react';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import type { ScheduledReel } from '@/lib/stores/reels-store';

interface ReelModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: string;
  existingReel?: ScheduledReel;
  onSave: (title: string, content: string) => void;
  onComplete?: () => void;
  onDelete?: () => void;
}

export function ReelModal({
  isOpen,
  onClose,
  date,
  existingReel,
  onSave,
  onComplete,
  onDelete,
}: ReelModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (existingReel) {
      setTitle(existingReel.title);
      setContent(existingReel.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [existingReel, date]);

  if (!isOpen) return null;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const handleSave = () => {
    if (!title.trim()) return;
    onSave(title.trim(), content.trim());
    onClose();
  };

  const handleComplete = () => {
    onComplete?.();
    onClose();
  };

  const handleDelete = () => {
    onDelete?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-surface border border-border rounded-xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <h3 className="font-semibold text-white">
              {existingReel ? 'Edit Reel' : 'Plan Reel'}
            </h3>
            <p className="text-xs text-gray-500 capitalize">{formattedDate}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-surface-hover rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Reel Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g.: 5 tips to start your day"
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Notes / Script
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your script or notes here..."
              rows={6}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
          </div>

          {existingReel && (
            <div className="flex items-center gap-2 text-sm">
              <span
                className={cn(
                  'px-2 py-0.5 rounded-full text-xs font-medium',
                  existingReel.status === 'completed'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-yellow-500/20 text-yellow-400'
                )}
              >
                {existingReel.status === 'completed' ? 'Completed' : 'Planned'}
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          <div className="flex gap-2">
            {existingReel && onDelete && (
              <Button variant="ghost" size="sm" onClick={handleDelete}>
                <Trash2 className="w-4 h-4 text-red-400" />
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            {existingReel && existingReel.status === 'planned' && onComplete && (
              <Button variant="secondary" size="sm" onClick={handleComplete}>
                <Check className="w-4 h-4 mr-1" />
                Complete
              </Button>
            )}
            <Button size="sm" onClick={handleSave} disabled={!title.trim()}>
              <Save className="w-4 h-4 mr-1" />
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
