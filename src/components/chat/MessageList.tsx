import { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import { useChatStore } from '@/lib/stores/chat-store';
import { MessageCircle } from 'lucide-react';

export function MessageList() {
  const { messages, isStreaming } = useChatStore();
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-4">
          <MessageCircle className="w-8 h-8 text-accent" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">
          What reel are we creating today?
        </h3>
        <p className="text-sm text-gray-400 max-w-xs">
          Tell me your idea and I'll build the complete script with 5-shot structure,
          powerful hooks and emotional CTAs.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
    >
      {messages.map((message, index) => (
        <MessageBubble
          key={message.id}
          message={message}
          isStreaming={isStreaming && index === messages.length - 1 && message.role === 'assistant'}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
