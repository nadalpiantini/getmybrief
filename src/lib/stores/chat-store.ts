import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Message } from '../types';

interface ChatState {
  messages: Message[];
  isStreaming: boolean;
  currentStreamContent: string;
}

interface ChatActions {
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  updateLastMessage: (content: string) => void;
  appendToStream: (chunk: string) => void;
  setStreaming: (isStreaming: boolean) => void;
  clearMessages: () => void;
  resetStream: () => void;
}

type ChatStore = ChatState & ChatActions;

const generateId = () => Math.random().toString(36).substring(2, 9);

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      // State
      messages: [],
      isStreaming: false,
      currentStreamContent: '',

      // Actions
      addMessage: (message) => {
        const newMessage: Message = {
          ...message,
          id: generateId(),
          timestamp: Date.now(),
        };
        set((state) => ({
          messages: [...state.messages, newMessage],
        }));
      },

      updateLastMessage: (content) => {
        set((state) => {
          const messages = [...state.messages];
          if (messages.length > 0) {
            messages[messages.length - 1] = {
              ...messages[messages.length - 1],
              content,
            };
          }
          return { messages };
        });
      },

      appendToStream: (chunk) => {
        set((state) => ({
          currentStreamContent: state.currentStreamContent + chunk,
        }));
        // Also update the last message in real-time
        const { currentStreamContent } = get();
        get().updateLastMessage(currentStreamContent + chunk);
      },

      setStreaming: (isStreaming) => set({ isStreaming }),

      clearMessages: () => set({ messages: [], currentStreamContent: '' }),

      resetStream: () => set({ currentStreamContent: '', isStreaming: false }),
    }),
    {
      name: 'getmybrief-chat-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ messages: state.messages }),
    }
  )
);
