'use client';

import { useEffect, useState } from 'react';
import { useUIStore } from '@/store/uiStore';

export default function LoadingBar() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const theme = useUIStore((s) => s.theme);

  useEffect(() => {
    // Simulate a smooth progress fill before content is ready
    let raf: number;
    let start: number | null = null;
    const duration = 1400; // ms — total time before reaching near 100%

    const tick = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      // ease-out curve: fast at start, slow near the end
      const rawProgress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - rawProgress, 3);
      const value = Math.round(eased * 92); // stops at 92 until "done"
      setProgress(value);

      if (rawProgress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // After fill to 92, quickly jump to 100 and fade out
        setProgress(100);
        setTimeout(() => {
          setVisible(false);
        }, 500); // fade-out delay
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!visible) return null;

  const isDark = theme === 'dark';
  const barColor = isDark ? '#39ff14' : '#0ea5e9';
  const textColor = isDark ? '#39ff14' : '#0369a1';
  const bgColor = isDark ? 'rgba(13,17,23,0.97)' : 'rgba(240,242,245,0.97)';

  return (
    <div
      className="fixed inset-0 z-[9000] flex flex-col items-center justify-center transition-opacity duration-500"
      style={{
        background: bgColor,
        opacity: progress >= 100 ? 0 : 1,
        pointerEvents: progress >= 100 ? 'none' : 'all',
        transition: 'opacity 0.5s ease',
      }}
    >
      {/* Label */}
      <p
        className="font-mono text-xs tracking-[0.25em] uppercase mb-4 opacity-70"
        style={{ color: textColor }}
      >
        &gt; initializing portfolio...
      </p>

      {/* Progress bar track */}
      <div
        className="relative w-64 md:w-80 h-[3px] rounded-full overflow-hidden"
        style={{ background: isDark ? 'rgba(57,255,20,0.12)' : 'rgba(14,165,233,0.15)' }}
      >
        {/* Progress fill */}
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-none"
          style={{
            width: `${progress}%`,
            background: barColor,
            boxShadow: `0 0 8px ${barColor}, 0 0 16px ${barColor}55`,
            transition: 'width 0.05s linear',
          }}
        />
      </div>

      {/* Percentage */}
      <p
        className="font-mono text-[10px] mt-2 opacity-40"
        style={{ color: textColor }}
      >
        {progress}%
      </p>
    </div>
  );
}
