import { useEffect } from 'react';
import { useSettingsStore } from '@/lib/stores/settings-store';
import type { Tab } from '@/lib/types';

interface KeyboardShortcuts {
  [key: string]: () => void;
}

export function useKeyboardShortcuts(shortcuts?: KeyboardShortcuts) {
  const { setActiveTab } = useSettingsStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Cmd/Ctrl modifier
      const isMod = event.metaKey || event.ctrlKey;

      if (!isMod) return;

      // Global shortcuts
      switch (event.key.toLowerCase()) {
        case '1':
          event.preventDefault();
          setActiveTab('chat');
          break;
        case '2':
          event.preventDefault();
          setActiveTab('templates');
          break;
        case '3':
          event.preventDefault();
          setActiveTab('calendar');
          break;
        case '4':
          event.preventDefault();
          setActiveTab('settings');
          break;
        case 'k':
          event.preventDefault();
          // Toggle quick actions (could be implemented later)
          break;
        default:
          // Check custom shortcuts
          if (shortcuts) {
            const shortcutKey = `${isMod ? 'mod+' : ''}${event.key.toLowerCase()}`;
            const action = shortcuts[shortcutKey];
            if (action) {
              event.preventDefault();
              action();
            }
          }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setActiveTab, shortcuts]);
}

/**
 * Tab navigation shortcuts info
 */
export const TAB_SHORTCUTS: { tab: Tab; shortcut: string; label: string }[] = [
  { tab: 'chat', shortcut: 'Cmd+1', label: 'Chat' },
  { tab: 'templates', shortcut: 'Cmd+2', label: 'Templates' },
  { tab: 'calendar', shortcut: 'Cmd+3', label: 'Calendario' },
  { tab: 'settings', shortcut: 'Cmd+4', label: 'Ajustes' },
];
