'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X, Home, User, Code2, FolderKanban, Activity, Terminal, Mail, Zap } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import useSound from 'use-sound';
import clsx from 'clsx';
import Link from 'next/link';

const menuItems = [
  { label: 'Home', href: '/', icon: Home, shortcut: '01' },
  { label: 'About Me', href: '/about', icon: User, shortcut: '02' },
  { label: 'Skills', href: '/skills', icon: Code2, shortcut: '03' },
  { label: 'Projects', href: '/projects', icon: FolderKanban, shortcut: '04' },
  { label: 'Activity', href: '/activity', icon: Activity, shortcut: '05' },
  { label: 'Terminal', href: '/terminal', icon: Terminal, shortcut: '06' },
  { label: 'Contact', href: '/contact', icon: Mail, shortcut: '07' },
];

export default function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useUIStore();

  const [playClick] = useSound('/assets/sounds/click.wav', { volume: 0.5 });
  const [playClose] = useSound('/assets/sounds/close.wav', { volume: 0.5 });

  const handleClose = () => {
    playClose();
    closeSidebar();
  };

  const handleMenuClick = () => {
    playClick();
    closeSidebar();
  };

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            key="sidebar-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Sidebar Panel */}
          <motion.aside
            key="sidebar-panel"
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 z-50 h-full w-72 flex flex-col sidebar-panel"
            role="navigation"
            aria-label="Main Navigation"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b sidebar-border">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyber-green" aria-hidden="true" />
                <span className="font-mono text-lg font-bold tracking-widest sidebar-brand">
                  PraDika<span className="text-cyber-green">.dev</span>
                </span>
              </div>
              <button
                id="sidebar-close-btn"
                onClick={handleClose}
                aria-label="Close navigation menu"
                className={clsx(
                  'w-8 h-8 flex items-center justify-center rounded-full',
                  'sidebar-close-btn transition-all duration-200'
                )}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* File tree decoration */}
            <div className="px-5 py-2 text-xs sidebar-meta font-mono">
              <span className="opacity-50">~ / portfolio /</span>
              <span className="text-cyber-green ml-1">navigation</span>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 px-3 py-2 overflow-y-auto">
              <ul className="space-y-1" role="list">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        id={`nav-${item.label.toLowerCase().replace(/\s/g, '-')}`}
                        onClick={handleMenuClick}
                        className={clsx(
                          'group flex items-center gap-3 px-3 py-2.5 rounded-md',
                          'font-mono text-sm transition-all duration-200',
                        )}
                      >
                        <Icon className="w-4 h-4 shrink-0 sidebar-icon" aria-hidden="true" />
                        <span className="truncate">{item.label}</span>
                        {/* NeoVim-style cursor indicator on hover */}
                        <span className="ml-auto text-xs opacity-0 group-hover:opacity-60 transition-opacity sidebar-shortcut">
                          ↵
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Footer - status bar like NeoVim */}
            <div className="px-5 py-3 border-t sidebar-border">
              <div className="flex items-center justify-between text-xs font-mono sidebar-meta">
                <span className="sidebar-mode-badge px-2 py-0.5 rounded text-xs font-bold">
                  NORMAL
                </span>
                <span className="opacity-40">-- PORTFOLIO --</span>
                <span className="text-cyber-green opacity-60">●</span>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
