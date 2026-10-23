'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Menu, X, ArrowUpRight, FileText, Code2, Terminal } from 'lucide-react';
import { playHudClick, toggleMute } from '../utils/audio';

export default function Header({ onOpenResume }) {
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');

  const navItems = [
    { id: 'work', label: '01 // WORK', href: '#work' },
    { id: 'about', label: '02 // ABOUT', href: '#about' },
    { id: 'skills', label: '03 // STACK & CLI', href: '#skills' },
    { id: 'education', label: '04 // TIMELINE', href: '#education' },
    { id: 'contact', label: '05 // CONTACT', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'work', 'about', 'skills', 'education', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const muted = toggleMute();
    setIsMuted(muted);
    if (!muted) playHudClick('switch');
  };

  const handleNavClick = (id) => {
    playHudClick('blip');
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-ink/85 backdrop-blur-xl border-b border-white/[0.08] transition-colors">
        <div className="max-w-[1600px] h-full mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo / Identity */}
          <a
            href="#intro"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('intro');
            }}
            className="group flex items-center gap-3.5 cursor-pointer"
          >
            <motion.div
              whileHover={{ rotate: 90 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              className="w-6 h-6 border border-accent/70 bg-accent/10 flex items-center justify-center p-1 relative"
            >
              <div className="w-1.5 h-1.5 bg-accent rounded-full animate-ping absolute inset-auto" />
              <div className="w-2 h-2 bg-accent" />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-display tracking-tight text-white font-extrabold text-base flex items-center gap-2">
                ADITYA SINGH
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </span>
              <span className="hud-label text-white/40 text-[9px] -mt-0.5">
                CSE @ KIET · FULL-STACK DEV
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] p-1 border border-white/[0.06] rounded-sm">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-1.5 hud-label text-[11px] transition-all cursor-pointer ${
                    isActive
                      ? 'text-white font-semibold bg-white/[0.08]'
                      : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navPill"
                      className="absolute inset-0 border border-accent/40 pointer-events-none"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Audio Toggle */}
            <button
              onClick={handleSoundToggle}
              title={isMuted ? 'Unmute HUD Audio' : 'Mute HUD Audio'}
              className="p-2 border border-white/10 bg-white/[0.02] text-white/70 hover:text-accent hover:border-accent/40 transition-colors flex items-center gap-2 cursor-pointer"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-white/40" />
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-accent" />
                  <div className="flex items-end gap-0.5 h-3">
                    <span className="w-0.5 bg-accent animate-[pulseSubtle_0.8s_ease-in-out_infinite] h-2" />
                    <span className="w-0.5 bg-accent animate-[pulseSubtle_1.2s_ease-in-out_infinite] h-3" />
                    <span className="w-0.5 bg-accent animate-[pulseSubtle_0.6s_ease-in-out_infinite] h-1.5" />
                  </div>
                </>
              )}
            </button>

            {/* Resume Button */}
            <button
              onClick={() => {
                playHudClick('blip');
                if (onOpenResume) onOpenResume();
              }}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 bg-accent/15 border border-accent/40 text-accent hover:bg-accent hover:text-ink font-semibold hud-label text-[11px] transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>RÉSUMÉ</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => {
                playHudClick('blip');
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 border border-white/10 text-white/80 hover:text-white"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 z-40 bg-ink/95 backdrop-blur-2xl border-b border-white/10 p-6 lg:hidden"
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="flex items-center justify-between p-3 border border-white/5 hover:border-accent/40 bg-white/[0.02] text-left hud-label text-sm text-white/80 hover:text-white"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-accent" />
                </button>
              ))}

              <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenResume) onOpenResume();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-accent text-ink font-bold hud-label text-xs"
                >
                  <FileText className="w-4 h-4" />
                  <span>VIEW FULL RÉSUMÉ (PDF)</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
