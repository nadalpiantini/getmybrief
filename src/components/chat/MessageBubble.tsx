import { memo, useState, useMemo } from 'react';
import { cn } from '@/lib/utils/cn';
import { renderMarkdown } from '@/lib/utils/markdown';
import { Bot, User, Copy, Check, FileText, Loader2, Star, LayoutGrid, AlignLeft } from 'lucide-react';
import { useSettingsStore } from '@/lib/stores/settings-store';
import { useFavoritesStore } from '@/lib/stores/favorites-store';
import { createDocument, insertText } from '@/lib/api/google-docs';
import { moveFileToFolder } from '@/lib/api/google-drive';
import { ScriptCard, parseScriptSections, isStructuredScript } from './ScriptCard';
import toast from 'react-hot-toast';
import type { Message } from '@/lib/types';

interface MessageBubbleProps {
  message: Message;
  isStreaming?: boolean;
}

export const MessageBubble = memo(function MessageBubble({
  message,
  isStreaming = false,
}: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [viewMode, setViewMode] = useState<'standard' | 'modular'>('modular');
  const isUser = message.role === 'user';

  const { googleAccessToken, isGoogleConnected, driveFolderId } = useSettingsStore();
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  const messageIsFavorite = !isUser && message.content ? isFavorite(message.content) : false;

  // Parse script sections for modular view
  const scriptSections = useMemo(() => {
    if (isUser || isStreaming || !message.content) return [];
    if (!isStructuredScript(message.content)) return [];
    return parseScriptSections(message.content);
  }, [isUser, isStreaming, message.content]);

  const hasModularView = scriptSections.length > 0;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToDocs = async () => {
    if (!googleAccessToken || saving) return;

    setSaving(true);
    try {
      const timestamp = new Date().toLocaleString('en-US', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      });
      const title = `Reel Script - ${timestamp}`;

      // Create the document
      const doc = await createDocument(title, googleAccessToken);

      // Insert content
      await insertText(doc.documentId, message.content, googleAccessToken);

      // Move to folder if configured
      if (driveFolderId) {
        try {
          await moveFileToFolder(doc.documentId, driveFolderId, googleAccessToken);
        } catch {
          // Folder move failed, but doc was created - still success
          console.warn('Could not move to folder, document saved in root');
        }
      }

      setSaved(true);
      toast.success('Saved to Google Docs');
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Failed to save to Google Docs:', error);
      toast.error('Failed to save to Google Docs');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleFavorite = () => {
    if (messageIsFavorite) {
      const favorite = useFavoritesStore.getState().getFavoriteByContent(message.content);
      if (favorite) {
        removeFavorite(favorite.id);
        toast.success('Removed from favorites');
      }
    } else {
      addFavorite(message.content);
      toast.success('Saved to favorites');
    }
  };

  return (
    <div
      className={cn(
        'flex gap-3 group',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
          isUser ? 'bg-primary' : 'bg-accent'
        )}
      >
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Bot className="w-4 h-4 text-white" />
        )}
      </div>

      {/* Message content */}
      <div
        className={cn(
          'relative max-w-[85%] px-4 py-3 rounded-2xl',
          isUser
            ? 'bg-primary text-white rounded-br-md'
            : 'bg-surface border border-border text-gray-100 rounded-bl-md'
        )}
      >
        {/* Action buttons for assistant messages */}
        {!isUser && message.content && !isStreaming && (
          <div className="absolute -right-2 -top-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {/* View mode toggle */}
            {hasModularView && (
              <button
                onClick={() => setViewMode(viewMode === 'modular' ? 'standard' : 'modular')}
                className={cn(
                  "p-1.5 border border-border rounded-lg transition-colors",
                  viewMode === 'modular'
                    ? "bg-primary/20 border-primary/50"
                    : "bg-surface-hover hover:bg-primary/10"
                )}
                title={viewMode === 'modular' ? 'Switch to standard view' : 'Switch to modular view'}
              >
                {viewMode === 'modular' ? (
                  <AlignLeft className="w-3 h-3 text-primary" />
                ) : (
                  <LayoutGrid className="w-3 h-3 text-gray-400" />
                )}
              </button>
            )}
            {/* Favorite button */}
            <button
              onClick={handleToggleFavorite}
              className={cn(
                "p-1.5 border border-border rounded-lg transition-colors",
                messageIsFavorite
                  ? "bg-yellow-500/20 border-yellow-500/50"
                  : "bg-surface-hover hover:bg-yellow-500/10"
              )}
              title={messageIsFavorite ? 'Remove from favorites' : 'Save to favorites'}
            >
              <Star className={cn(
                "w-3 h-3",
                messageIsFavorite ? "text-yellow-500 fill-yellow-500" : "text-gray-400"
              )} />
            </button>
            {/* Save to Google Docs button */}
            {isGoogleConnected && (
              <button
                onClick={handleSaveToDocs}
                disabled={saving}
                className="p-1.5 bg-surface-hover border border-border rounded-lg hover:bg-primary/20 transition-colors disabled:opacity-50"
                title={saved ? 'Saved!' : 'Save to Google Docs'}
              >
                {saving ? (
                  <Loader2 className="w-3 h-3 text-primary animate-spin" />
                ) : saved ? (
                  <Check className="w-3 h-3 text-success" />
                ) : (
                  <FileText className="w-3 h-3 text-primary" />
                )}
              </button>
            )}
            {/* Copy button */}
            <button
              onClick={handleCopy}
              className="p-1.5 bg-surface-hover border border-border rounded-lg hover:bg-gray-600 transition-colors"
              title="Copy to clipboard"
            >
              {copied ? (
                <Check className="w-3 h-3 text-success" />
              ) : (
                <Copy className="w-3 h-3 text-gray-400" />
              )}
            </button>
          </div>
        )}

        {/* Message text */}
        <div className="text-sm leading-relaxed">
          {isUser ? (
            <span className="whitespace-pre-wrap">{message.content}</span>
          ) : hasModularView && viewMode === 'modular' ? (
            // Modular view with script cards
            <div className="space-y-2">
              {scriptSections.map((section) => (
                <ScriptCard
                  key={section.id}
                  section={section}
                  onUpdate={(id, content) => {
                    // TODO: Implement section update
                    console.log('Update section:', id, content);
                  }}
                />
              ))}
            </div>
          ) : (
            renderMarkdown(message.content)
          )}
          {isStreaming && !message.content && (
            <span className="inline-flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </span>
          )}
          {isStreaming && message.content && (
            <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-0.5" />
          )}
        </div>

        {/* Timestamp */}
        <div
          className={cn(
            'text-xs mt-2 opacity-60',
            isUser ? 'text-blue-200' : 'text-gray-500'
          )}
        >
          {new Date(message.timestamp).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </div>
  );
});
