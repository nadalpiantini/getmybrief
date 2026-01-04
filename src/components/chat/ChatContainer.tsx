import { useCallback } from 'react';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { useChatStore } from '@/lib/stores/chat-store';
import { useSettingsStore } from '@/lib/stores/settings-store';
import { streamContent } from '@/lib/api/deepseek';
import { SYSTEM_PROMPT, REEL_TEMPLATE_PROMPT } from '@/lib/utils/prompts';
import { useTemplatesStore } from '@/lib/stores/templates-store';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui';
import toast from 'react-hot-toast';

export function ChatContainer() {
  const { addMessage, updateLastMessage, setStreaming, clearMessages, isStreaming } =
    useChatStore();
  const { deepseekApiKey } = useSettingsStore();
  const { selectedTemplate } = useTemplatesStore();

  const handleSend = useCallback(
    async (prompt: string) => {
      if (!deepseekApiKey) {
        toast.error('Configura tu API key de DeepSeek en ajustes');
        return;
      }

      // Add user message
      addMessage({ role: 'user', content: prompt });

      // Add empty assistant message for streaming
      addMessage({ role: 'assistant', content: '' });
      setStreaming(true);

      let fullContent = '';

      try {
        const fullPrompt = REEL_TEMPLATE_PROMPT(prompt, selectedTemplate?.type);

        for await (const chunk of streamContent(fullPrompt, SYSTEM_PROMPT, deepseekApiKey)) {
          fullContent += chunk;
          updateLastMessage(fullContent);
        }
      } catch (error) {
        console.error('Streaming error:', error);
        const errorMessage =
          error instanceof Error ? error.message : 'Error al generar contenido';
        updateLastMessage(`Error: ${errorMessage}. Verifica tu API key.`);
        toast.error(errorMessage);
      } finally {
        setStreaming(false);
      }
    },
    [deepseekApiKey, selectedTemplate, addMessage, updateLastMessage, setStreaming]
  );

  const handleClear = () => {
    clearMessages();
    toast.success('Conversacion limpiada');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div>
          <h2 className="font-semibold text-white">Chat</h2>
          <p className="text-xs text-gray-500">
            {selectedTemplate
              ? `Usando: ${selectedTemplate.name}`
              : 'Genera guiones de reels'}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          title="Limpiar conversacion"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages */}
      <MessageList />

      {/* Input */}
      <ChatInput
        onSend={handleSend}
        isLoading={isStreaming}
        disabled={!deepseekApiKey}
      />
    </div>
  );
}
