'use client';

import { Menu, Sun, Moon } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import useSound from 'use-sound';
import clsx from 'clsx';

export default function TopBar() {
  const { isSidebarOpen, openSidebar, theme, toggleTheme } = useUIStore();

  const [playOpen] = useSound('/assets/sounds/open.wav', { volume: 0.5 });
  const [playTheme] = useSound('/assets/sounds/theme.wav', { volume: 0.5 });

  const handleHamburger = () => {
    if (!isSidebarOpen) {
      playOpen();
      openSidebar();
    }
  };

  const handleThemeToggle = () => {
    playTheme();
    toggleTheme();
  };

  return (
    <header className="topbar fixed top-0 left-0 right-0 z-30 h-14 flex items-center px-4" role="banner">
      {/* Left: Hamburger button */}
      <button
        id="hamburger-btn"
        onClick={handleHamburger}
        aria-label="Open navigation menu"
        aria-expanded={isSidebarOpen}
        aria-controls="main-nav"
        className={clsx(
          'w-9 h-9 flex items-center justify-center rounded-md',
          'topbar-hamburger transition-all duration-200',
          isSidebarOpen && 'opacity-0 pointer-events-none'
        )}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Center: Brand */}
      <div className="flex-1 flex items-center justify-center">
        <span className="font-mono text-sm font-semibold tracking-widest topbar-brand">
          PraDika<span className="text-cyber-green">.dev</span>
        </span>
      </div>

      {/* Right: Dark/Light mode toggle */}
      <button
        id="theme-toggle-btn"
        onClick={handleThemeToggle}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        className={clsx(
          'w-9 h-9 flex items-center justify-center rounded-full',
          'topbar-theme-btn transition-all duration-300'
        )}
      >
        {theme === 'dark' ? (
          <Sun className="w-4 h-4" />
        ) : (
          <Moon className="w-4 h-4" />
        )}
      </button>
    </header>
  );
}
