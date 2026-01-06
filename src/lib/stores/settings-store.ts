import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Settings, Tab } from '../types';

interface SettingsState extends Settings {
  activeTab: Tab;
  isGoogleConnected: boolean;
}

interface SettingsActions {
  setApiKey: (key: string) => void;
  setGoogleTokens: (accessToken: string, refreshToken?: string) => void;
  clearGoogleTokens: () => void;
  setDriveFolderId: (id: string) => void;
  setDefaultTemplate: (templateId: string) => void;
  setAutoSave: (enabled: boolean) => void;
  setActiveTab: (tab: Tab) => void;
}

type SettingsStore = SettingsState & SettingsActions;

const DEFAULT_SETTINGS: Settings = {
  deepseekApiKey: import.meta.env.VITE_DEEPSEEK_API_KEY || '',
  driveFolderId: import.meta.env.VITE_DRIVE_FOLDER_ID || '',
  defaultTemplate: 'reel-completo',
  autoSave: true,
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      // State
      ...DEFAULT_SETTINGS,
      activeTab: 'chat',
      isGoogleConnected: false,

      // Actions
      setApiKey: (deepseekApiKey) => set({ deepseekApiKey }),

      setGoogleTokens: (googleAccessToken, googleRefreshToken) =>
        set({
          googleAccessToken,
          googleRefreshToken,
          isGoogleConnected: true,
        }),

      clearGoogleTokens: () =>
        set({
          googleAccessToken: undefined,
          googleRefreshToken: undefined,
          isGoogleConnected: false,
        }),

      setDriveFolderId: (driveFolderId) => set({ driveFolderId }),

      setDefaultTemplate: (defaultTemplate) => set({ defaultTemplate }),

      setAutoSave: (autoSave) => set({ autoSave }),

      setActiveTab: (activeTab) => set({ activeTab }),
    }),
    {
      name: 'getmybrief-settings-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        deepseekApiKey: state.deepseekApiKey,
        googleAccessToken: state.googleAccessToken,
        googleRefreshToken: state.googleRefreshToken,
        driveFolderId: state.driveFolderId,
        defaultTemplate: state.defaultTemplate,
        autoSave: state.autoSave,
        isGoogleConnected: state.isGoogleConnected,
      }),
    }
  )
);
