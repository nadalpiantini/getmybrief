import { useCallback, useState } from 'react';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { useChatStore } from '@/lib/stores/chat-store';
import { useSettingsStore } from '@/lib/stores/settings-store';
import { useCreatorStore, generateCreatorContext, type ReelBrief } from '@/lib/stores/creator-store';
import { streamContent } from '@/lib/api/deepseek';
import { SYSTEM_PROMPT, REEL_TEMPLATE_PROMPT } from '@/lib/utils/prompts';
import { useTemplatesStore } from '@/lib/stores/templates-store';
import { ReelBriefForm } from '@/components/onboarding';
import { Trash2, FileText } from 'lucide-react';
import { Button } from '@/components/ui';
import type { ScriptOptions } from './QuickOptionsBar';
import toast from 'react-hot-toast';

export function ChatContainer() {
  const { addMessage, updateLastMessage, setStreaming, clearMessages, isStreaming } =
    useChatStore();
  const { deepseekApiKey } = useSettingsStore();
  const { selectedTemplate } = useTemplatesStore();
  const { profile, isProfileComplete, currentBrief, setBrief, clearBrief, setShowOnboarding } = useCreatorStore();

  const [showBriefForm, setShowBriefForm] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);

  const generateWithContext = useCallback(
    async (prompt: string, brief: ReelBrief | null) => {
      // Add user message
      addMessage({ role: 'user', content: prompt });

      // Add empty assistant message for streaming
      addMessage({ role: 'assistant', content: '' });
      setStreaming(true);

      let fullContent = '';

      try {
        // Build context-aware system prompt
        const creatorContext = generateCreatorContext(profile, brief);
        const enhancedSystemPrompt = creatorContext
          ? `${SYSTEM_PROMPT}\n\n${creatorContext}`
          : SYSTEM_PROMPT;

        const fullPrompt = REEL_TEMPLATE_PROMPT(prompt, selectedTemplate?.type);

        const apiKey = deepseekApiKey || 'sk-5ed0c1fd20d540a7bda1ef34676745cb';
        for await (const chunk of streamContent(fullPrompt, enhancedSystemPrompt, apiKey)) {
          fullContent += chunk;
          updateLastMessage(fullContent);
        }

        // Clear brief after successful generation
        if (brief) {
          clearBrief();
        }
      } catch (error) {
        console.error('Streaming error:', error);
        const errorMessage =
          error instanceof Error ? error.message : 'Error generating content';
        updateLastMessage(`Error: ${errorMessage}. Check your API key.`);
        toast.error(errorMessage);
      } finally {
        setStreaming(false);
      }
    },
    [deepseekApiKey, selectedTemplate, profile, addMessage, updateLastMessage, setStreaming, clearBrief]
  );

  const handleSend = useCallback(
    async (prompt: string, _options?: ScriptOptions) => {
      const apiKey = deepseekApiKey || 'sk-5ed0c1fd20d540a7bda1ef34676745cb';
      if (!apiKey) {
        toast.error('Configure your DeepSeek API key in settings');
        return;
      }

      // If no brief and this looks like a reel request, offer brief form
      const isReelRequest = /reel|guion|script|video|content/i.test(prompt);
      if (isReelRequest && !currentBrief && isProfileComplete) {
        setPendingPrompt(prompt);
        setShowBriefForm(true);
        return;
      }

      await generateWithContext(prompt, currentBrief);
    },
    [deepseekApiKey, currentBrief, profile, generateWithContext]
  );

  const handleBriefSubmit = async (brief: ReelBrief) => {
    setShowBriefForm(false);
    setBrief(brief);

    if (pendingPrompt) {
      await generateWithContext(pendingPrompt, brief);
      setPendingPrompt(null);
    }
  };

  const handleBriefSkip = async () => {
    setShowBriefForm(false);

    if (pendingPrompt) {
      await generateWithContext(pendingPrompt, null);
      setPendingPrompt(null);
    }
  };

  const handleClear = () => {
    clearMessages();
    clearBrief();
    toast.success('Conversation cleared');
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Brief Form Overlay */}
      {showBriefForm && (
        <ReelBriefForm onSubmit={handleBriefSubmit} onSkip={handleBriefSkip} />
      )}

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          {profile.name && (
            <button
              onClick={() => setShowOnboarding(true)}
              className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm hover:ring-2 hover:ring-primary/50 transition-all"
              title="View/edit profile"
            >
              {profile.name.charAt(0).toUpperCase()}
            </button>
          )}
          <div>
            <h2 className="font-semibold text-white">Chat</h2>
            <p className="text-xs text-gray-500">
              {currentBrief
                ? `Brief: ${currentBrief.topic.slice(0, 25)}...`
                : selectedTemplate
                ? `Using: ${selectedTemplate.name}`
                : 'Generate reel scripts'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowBriefForm(true)}
            title="Create brief"
          >
            <FileText className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            title="Clear conversation"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <MessageList />

      {/* Input */}
      <ChatInput
        onSend={handleSend}
        isLoading={isStreaming}
        disabled={false}
      />
    </div>
  );
}
