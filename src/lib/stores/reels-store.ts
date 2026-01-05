import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface ScheduledReel {
  id: string;
  date: string; // ISO date string YYYY-MM-DD
  title: string;
  content: string; // The reel script content
  templateType?: string;
  status: 'planned' | 'completed';
  createdAt: number;
  completedAt?: number;
}

interface ReelsState {
  reels: Record<string, ScheduledReel>; // keyed by date
}

interface ReelsActions {
  addReel: (date: string, title: string, content: string, templateType?: string) => void;
  updateReel: (date: string, updates: Partial<ScheduledReel>) => void;
  completeReel: (date: string) => void;
  deleteReel: (date: string) => void;
  getReelForDate: (date: string) => ScheduledReel | undefined;
  getAllReels: () => ScheduledReel[];
}

type ReelsStore = ReelsState & ReelsActions;

export const useReelsStore = create<ReelsStore>()(
  persist(
    (set, get) => ({
      reels: {},

      addReel: (date, title, content, templateType) => {
        const id = `reel-${Date.now()}`;
        set((state) => ({
          reels: {
            ...state.reels,
            [date]: {
              id,
              date,
              title,
              content,
              templateType,
              status: 'planned',
              createdAt: Date.now(),
            },
          },
        }));
      },

      updateReel: (date, updates) => {
        set((state) => {
          const existing = state.reels[date];
          if (!existing) return state;

          return {
            reels: {
              ...state.reels,
              [date]: { ...existing, ...updates },
            },
          };
        });
      },

      completeReel: (date) => {
        set((state) => {
          const existing = state.reels[date];
          if (!existing) return state;

          return {
            reels: {
              ...state.reels,
              [date]: {
                ...existing,
                status: 'completed',
                completedAt: Date.now(),
              },
            },
          };
        });
      },

      deleteReel: (date) => {
        set((state) => {
          const { [date]: _, ...rest } = state.reels;
          return { reels: rest };
        });
      },

      getReelForDate: (date) => {
        return get().reels[date];
      },

      getAllReels: () => {
        return Object.values(get().reels);
      },
    }),
    {
      name: 'getmybrief-reels-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
