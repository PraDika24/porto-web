'use client';

import { useEffect, useState, useCallback } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import type { Container, Engine } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { useUIStore } from '@/store/uiStore';

// Re-initialize particles when theme changes by using theme as key
export default function ParticlesBg() {
  const [init, setInit] = useState(false);
  const theme = useUIStore((s) => s.theme);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback(async (_container: Container | undefined) => {
    // container ready
  }, []);

  if (!init) return null;

  const isDark = theme === 'dark';

  // ── Color palettes ──────────────────────────────────────────────────────
  // Dark: neon cyber colours (green, cyan, purple) at low opacity
  // Light: sky-blue, soft violet, slate — more muted
  const colors = isDark
    ? ['#39ff14', '#00f5ff', '#bf00ff', '#0ea5e9']
    : ['#0ea5e9', '#8b5cf6', '#6366f1', '#94a3b8'];

  const linkColor = isDark ? '#00f5ff' : '#8b5cf6';
  const shadowColor = isDark ? '#39ff14' : '#6366f1';

  return (
    // pointer-events: none so it NEVER blocks clicks / hovers on content
    // We re-mount entirely when theme changes (key={theme}) to refresh colors
    <div key={theme} className="fixed inset-0 z-0 select-none">
      {/*
        We need pointer-events on the canvas itself to detect mouse position,
        but the wrapping div must NOT consume events.
        tsParticles handles its own canvas pointer-events internally via detectsOn.
      */}
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        style={{ position: 'absolute', inset: 0 }}
        options={{
          // ── Performance ──────────────────────────────────────────────
          fpsLimit: 120,
          detectRetina: true,

          // ── Background ───────────────────────────────────────────────
          background: { color: 'transparent' },

          // ── Interactivity ────────────────────────────────────────────
          interactivity: {
            // Detect on the whole window so cursor doesn't have to be
            // directly on a particle to trigger attraction.
            detectsOn: 'window',
            events: {
              onHover: {
                enable: true,
                // 'attract' pulls particles toward cursor (Google Antigravity feel)
                mode: 'attract',
                parallax: { enable: false },
              },
              onClick: {
                enable: true,
                // 'repulse' bursts particles away from click point briefly
                mode: 'repulse',
              },
              resize: { enable: true },
            },
            modes: {
              attract: {
                distance: 220,
                duration: 0.4,
                // Higher factor = stronger magnetic pull toward cursor
                factor: 6,
                maxSpeed: 60,
                speed: 1,
                easing: 'ease-out-quad',
              },
              repulse: {
                // Click burst: particles fly outward then settle back
                distance: 180,
                duration: 0.5,
                factor: 100,
                speed: 1,
                maxSpeed: 50,
                easing: 'ease-out-expo',
              },
            },
          },

          // ── Particles ────────────────────────────────────────────────
          particles: {
            // Multi-colour dots — gives the "subtle colour variation" feel
            color: {
              value: colors,
            },

            // Glow effect via canvas shadow (supported in tsparticles-slim)
            shadow: {
              enable: true,
              color: shadowColor,
              blur: 6,
            },

            // Connecting lines between nearby particles at very low opacity
            links: {
              enable: true,
              color: linkColor,
              distance: 120,
              opacity: isDark ? 0.12 : 0.08,
              width: 1,
            },

            // Particle movement — slow random wander at idle, speeds up toward cursor
            move: {
              enable: true,
              direction: 'none',
              outModes: { default: 'out' },
              // random: true gives organic, non-uniform drift when idle
              random: true,
              speed: { min: 0.2, max: 1.0 },
              straight: false,
              // Slight noise wobble for organic feel
              warp: false,
            },

            // Count — 120 balanced for performance across screen sizes
            number: {
              value: 120,
              density: {
                enable: true,
                // area factor: fewer particles on smaller screens automatically
              },
            },

            // Animated opacity for "breathing" / organic feel
            opacity: {
              value: {
                min: isDark ? 0.15 : 0.1,
                max: isDark ? 0.55 : 0.35,
              },
              animation: {
                enable: true,
                speed: 0.6,
                sync: false,
              },
            },

            shape: { type: 'circle' },

            // Tiny dot size — minimalist SaaS aesthetic
            size: {
              value: { min: 1, max: 2.5 },
              animation: {
                enable: true,
                speed: 2,
                sync: false,
              },
            },
          },
        }}
      />
    </div>
  );
}
