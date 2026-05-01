'use client';

import { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useUIStore } from '@/store/uiStore';

export default function ParticlesBg() {
  const [init, setInit] = useState(false);
  const theme = useUIStore((s) => s.theme);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 -z-10 select-none">
      <Particles
        id="tsparticles"
        options={{
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: ['attract', 'repulse'],
              },
              resize: {
                enable: true
              }
            },
            modes: {
              attract: {
                distance: 200,
                duration: 0.4,
                factor: 3,
                maxSpeed: 50,
                speed: 1
              },
              repulse: {
                distance: 100,
                duration: 0.4
              }
            }
          },
          particles: {
            color: {
              value: isDark ? '#39ff14' : '#00f5ff'
            },
            links: {
              color: isDark ? '#39ff14' : '#00f5ff',
              distance: 150,
              enable: true,
              opacity: isDark ? 0.2 : 0.15,
              width: 1
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'bounce'
              },
              random: false,
              speed: 1,
              straight: false
            },
            number: {
              density: {
                enable: true,
              },
              value: 80
            },
            opacity: {
              value: isDark ? 0.3 : 0.2
            },
            shape: {
              type: 'circle'
            },
            size: {
              value: { min: 1, max: 3 }
            }
          },
          detectRetina: true
        }}
      />
    </div>
  );
}
