import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface FavoriteScript {
  id: string;
  content: string;
  title: string;
  createdAt: number;
}

interface FavoritesState {
  favorites: FavoriteScript[];
}

interface FavoritesActions {
  addFavorite: (content: string, title?: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (content: string) => boolean;
  getFavoriteByContent: (content: string) => FavoriteScript | undefined;
}

type FavoritesStore = FavoritesState & FavoritesActions;

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (content, title) => {
        const id = `fav-${Date.now()}`;
        const autoTitle = title || content.slice(0, 50).replace(/[#*\n]/g, '').trim() + '...';
        set((state) => ({
          favorites: [
            { id, content, title: autoTitle, createdAt: Date.now() },
            ...state.favorites,
          ],
        }));
      },

      removeFavorite: (id) => {
        set((state) => ({
          favorites: state.favorites.filter((f) => f.id !== id),
        }));
      },

      isFavorite: (content) => {
        return get().favorites.some((f) => f.content === content);
      },

      getFavoriteByContent: (content) => {
        return get().favorites.find((f) => f.content === content);
      },
    }),
    {
      name: 'getmybrief-favorites-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
