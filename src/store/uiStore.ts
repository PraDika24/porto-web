import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIStore {
  isSidebarOpen: boolean;
  theme: 'dark' | 'light';
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  toggleTheme: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      isSidebarOpen: false,
      theme: 'dark',
      openSidebar: () => set({ isSidebarOpen: true }),
      closeSidebar: () => set({ isSidebarOpen: false }),
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'pradika-ui-store',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);
