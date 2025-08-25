import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';

interface AppState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark' | 'system';
}

interface AppActions {
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const useAppStore = create<AppState & AppActions>()(
  devtools(
    subscribeWithSelector((set, get) => ({
      // State
      sidebarOpen: true,
      theme: 'system',

      // Actions
      setSidebarOpen: (open: boolean) => {
        set({ sidebarOpen: open }, false, 'setSidebarOpen');
      },

      toggleSidebar: () => {
        set((state) => ({ sidebarOpen: !state.sidebarOpen }), false, 'toggleSidebar');
      },

      setTheme: (theme: 'light' | 'dark' | 'system') => {
        set({ theme }, false, 'setTheme');
      },
    })),
    {
      name: 'app-store',
    }
  )
);

// Selectors for better performance
export const selectSidebarOpen = (state: AppState & AppActions) => state.sidebarOpen;
export const selectTheme = (state: AppState & AppActions) => state.theme;
