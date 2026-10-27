'use client';

import React from 'react';

export default function ClientsMarquee() {
  const stackItems = [
    'POSTGRESQL & PRISMA ORM',
    'CLOUDFLARE R2 STORAGE',
    'NODE.JS & EXPRESS 5',
    'NEON SERVERLESS DB',
    'REACT.JS & VITE',
    'C++ & DATA STRUCTURES',
    'MONGODB & MONGOOSE',
    'JWT AUTHENTICATION',
    'RESTFUL API DESIGN',
    'TAILWIND CSS',
    'GIT & GITHUB',
    'DATABASE MODELING',
    'ASYNCHRONOUS JAVASCRIPT',
    'OBJECT-ORIENTED PROGRAMMING',
  ];

  return (
    <div className="border-y border-white/[0.08] bg-white/[0.015] py-4 overflow-hidden relative select-none">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee">
        {/* First set */}
        <div className="flex items-center gap-8 px-4">
          {stackItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-8 whitespace-nowrap">
              <span className="hud-label text-xs tracking-widest text-white/60 hover:text-accent transition-colors flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 bg-accent/60 rounded-full" />
                {item}
              </span>
              <span className="text-white/20 font-mono text-xs">//</span>
            </div>
          ))}
        </div>

        {/* Second set for continuous loop */}
        <div className="flex items-center gap-8 px-4" aria-hidden="true">
          {stackItems.map((item, idx) => (
            <div key={`dup-${idx}`} className="flex items-center gap-8 whitespace-nowrap">
              <span className="hud-label text-xs tracking-widest text-white/60 hover:text-accent transition-colors flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 bg-accent/60 rounded-full" />
                {item}
              </span>
              <span className="text-white/20 font-mono text-xs">//</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
