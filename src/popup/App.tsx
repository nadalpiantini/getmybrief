import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSettingsStore } from '@/lib/stores/settings-store';
import { useCreatorStore } from '@/lib/stores/creator-store';
import { ChatContainer } from '@/components/chat';
import { TemplateGrid } from '@/components/templates';
import { CalendarView } from '@/components/calendar';
import { SettingsPanel } from '@/components/settings';
import { CreatorOnboarding } from '@/components/onboarding';
import { useKeyboardShortcuts } from '@/lib/hooks';
import { MessageSquare, Layout, Calendar, Settings } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { Tab } from '@/lib/types';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes
    },
  },
});

const TABS: { id: Tab; label: string; icon: typeof MessageSquare }[] = [
  { id: 'chat', label: 'Chat', icon: MessageSquare },
  { id: 'templates', label: 'Templates', icon: Layout },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'settings', label: 'Settings', icon: Settings },
];

function AppContent() {
  const { activeTab, setActiveTab } = useSettingsStore();
  const { showOnboarding, isProfileComplete } = useCreatorStore();

  // Enable keyboard shortcuts
  useKeyboardShortcuts();

  // Show onboarding if needed
  if (showOnboarding && !isProfileComplete) {
    return (
      <div className="w-[400px] h-[600px] bg-background flex flex-col overflow-hidden">
        <CreatorOnboarding />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1a1a1a',
              color: '#fff',
              border: '1px solid #333',
              fontSize: '14px',
            },
          }}
        />
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatContainer />;
      case 'templates':
        return <TemplateGrid />;
      case 'calendar':
        return <CalendarView />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <ChatContainer />;
    }
  };

  return (
    <div className="w-[400px] h-[600px] bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">IA</span>
          </div>
          <div>
            <h1 className="text-sm font-bold text-white">GetMyBrief</h1>
            <p className="text-[10px] text-gray-500">System {'>'} Inspiration</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-hidden">{renderContent()}</main>

      {/* Bottom Navigation */}
      <nav className="border-t border-border bg-surface">
        <div className="flex">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex-1 flex flex-col items-center gap-1 py-2.5 transition-colors',
                  isActive
                    ? 'text-primary'
                    : 'text-gray-500 hover:text-gray-300'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Toast notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid #333',
            fontSize: '14px',
          },
          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
