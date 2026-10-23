'use client';

import React, { useState, useEffect } from 'react';
import { playHudClick } from '../utils/audio';

export default function HudFooter() {
  const [scrollPercent, setScrollPercent] = useState('0.00');
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [activeSectionName, setActiveSectionName] = useState('00 — INTRO');
  const [currentTime, setCurrentTime] = useState('--:--:--');

  const themes = [
    { hex: '#6366f1', name: 'INDIGO', glow: 'rgba(99, 102, 241, 0.28)' },
    { hex: '#8b5cf6', name: 'VIOLET', glow: 'rgba(139, 92, 246, 0.28)' },
    { hex: '#06b6d4', name: 'CYAN', glow: 'rgba(6, 182, 212, 0.28)' },
    { hex: '#10b981', name: 'EMERALD', glow: 'rgba(16, 185, 129, 0.28)' },
    { hex: '#f59e0b', name: 'AMBER', glow: 'rgba(245, 158, 11, 0.28)' },
  ];
  const [themeIdx, setThemeIdx] = useState(0);

  // Track Scroll % and Active Section
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollPercent(progress.toFixed(1));

      // Check sections
      const sections = [
        { id: 'intro', label: '00 — INTRO' },
        { id: 'work', label: '01 — SELECTED WORK' },
        { id: 'about', label: '02 — ABOUT DEVELOPER' },
        { id: 'skills', label: '03 — TECHNICAL STACK' },
        { id: 'education', label: '04 — TIMELINE' },
        { id: 'contact', label: '05 — CONTACT TERMINAL' },
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveSectionName(sections[i].label);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track Cursor Position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Live IST Clock (India Standard Time UTC+05:30)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istTime = now.toLocaleTimeString('en-GB', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setCurrentTime(istTime);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Theme Cycle
  const cycleTheme = () => {
    playHudClick('switch');
    const nextIdx = (themeIdx + 1) % themes.length;
    setThemeIdx(nextIdx);
    const selected = themes[nextIdx];
    document.documentElement.style.setProperty('--accent', selected.hex);
    document.documentElement.style.setProperty('--accent-glow', selected.glow);
  };

  return (
    <footer className="fixed inset-x-0 bottom-0 z-50 h-11 bg-ink/95 backdrop-blur-md border-t border-white/[0.08] px-4 md:px-8 flex items-center justify-between text-xs">
      {/* Left: Scroll & Cursor Stats */}
      <div className="flex items-center gap-5">
        <span className="hud-label text-white/60 text-[10px]">
          SCRL <span className="text-accent font-bold font-mono">{scrollPercent}%</span>
        </span>
        <span className="hidden sm:inline hud-label text-white/30 text-[10px]">|</span>
        <span className="hidden sm:inline hud-label text-white/50 text-[10px]">
          CRSR <span className="font-mono text-white/80">{cursorPos.x}.{cursorPos.y}</span>
        </span>
      </div>

      {/* Center: Current Section */}
      <div className="hidden md:flex items-center gap-2 hud-label text-white/70 text-[10px]">
        <span className="w-1.5 h-1.5 bg-accent inline-block animate-pulse" />
        <span>{activeSectionName}</span>
      </div>

      {/* Right: Theme Switcher & IST Clock */}
      <div className="flex items-center gap-5">
        <button
          onClick={cycleTheme}
          title="Cycle Theme Accent Palette"
          className="hud-label flex items-center gap-2 text-white/70 hover:text-white transition-opacity cursor-pointer group text-[10px]"
        >
          <span className="hidden sm:inline text-white/40">THEME:</span>
          <span
            className="w-2.5 h-2.5 border border-white/20 inline-block group-hover:scale-125 transition-transform"
            style={{ background: themes[themeIdx].hex }}
          />
          <span className="font-mono text-accent">{themes[themeIdx].name}</span>
        </button>

        <span className="text-white/20 hidden sm:inline">|</span>

        <span className="hud-label text-white/60 font-mono text-[10px]">
          {currentTime} <span className="text-accent/80">IST</span>
        </span>
      </div>
    </footer>
  );
}
