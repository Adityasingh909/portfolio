'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState('default'); // 'default' | 'hover' | 'click'
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor on fine pointer devices (desktop mouse)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    setIsVisible(true);

    const onMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Check if hovering interactive element
      const target = e.target;
      const isInteractive = target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer');
      if (isInteractive) {
        setCursorState('hover');
      } else {
        setCursorState('default');
      }
    };

    const onMouseDown = () => setCursorState('click');
    const onMouseUp = () => setCursorState('default');
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Central Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent shadow-[0_0_12px_var(--accent)] pointer-events-none"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: cursorState === 'click' ? 0.6 : cursorState === 'hover' ? 1.4 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 450, mass: 0.1 }}
      />

      {/* Outer HUD Reticle Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-accent/60 pointer-events-none"
        animate={{
          x: mousePosition.x - (cursorState === 'hover' ? 22 : 14),
          y: mousePosition.y - (cursorState === 'hover' ? 22 : 14),
          width: cursorState === 'hover' ? 44 : 28,
          height: cursorState === 'hover' ? 44 : 28,
          borderColor: cursorState === 'hover' ? 'var(--accent)' : 'rgba(236, 233, 228, 0.35)',
          scale: cursorState === 'click' ? 1.3 : 1,
          rotate: cursorState === 'hover' ? 90 : 0,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 280, mass: 0.2 }}
      >
        {/* Subtle crosshair tick marks when hovering */}
        {cursorState === 'hover' && (
          <>
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-accent" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-accent" />
            <div className="absolute top-1/2 -left-1 -translate-y-1/2 h-0.5 w-1.5 bg-accent" />
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 h-0.5 w-1.5 bg-accent" />
          </>
        )}
      </motion.div>
    </div>
  );
}
