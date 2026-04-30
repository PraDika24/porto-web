'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let ringX = 0;
    let ringY = 0;
    let dotX = 0;
    let dotY = 0;
    let animFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      dotX = e.clientX;
      dotY = e.clientY;

      const target = e.target as HTMLElement;
      const cursorStyle = window.getComputedStyle(target).cursor;
      setIsPointer(cursorStyle === 'pointer');
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const animate = () => {
      // Dot follows cursor instantly
      if (dot) {
        dot.style.left = `${dotX}px`;
        dot.style.top = `${dotY}px`;
      }
      // Ring follows with lag (lerp)
      ringX += (dotX - ringX) * 0.12;
      ringY += (dotY - ringY) * 0.12;
      if (ring) {
        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;
      }
      animFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    animFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <>
      {/* Dot (center) */}
      <div
        ref={dotRef}
        className={`cursor-dot ${isClicking ? 'clicking' : ''}`}
        aria-hidden="true"
      />
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className={`cursor-ring ${isPointer ? 'pointer' : ''} ${isClicking ? 'clicking' : ''}`}
        aria-hidden="true"
      />
    </>
  );
}
