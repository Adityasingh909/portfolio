'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, FileText, Code2, Terminal, Database, Sparkles, CheckCircle2 } from 'lucide-react';
import { playHudClick } from '../utils/audio';

// Interactive Kinetic Letter with spring hover effect
function KineticLetter({ char, isAccent = false }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.span
      onMouseEnter={() => {
        setHovered(true);
        playHudClick('blip');
      }}
      onMouseLeave={() => setHovered(false)}
      animate={{
        y: hovered ? -10 : 0,
        scale: hovered ? 1.08 : 1,
        color: hovered ? '#6366f1' : isAccent ? 'var(--accent, #6366f1)' : '#f3f2ef',
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 18 }}
      className={`inline-block select-none will-change-transform cursor-pointer transition-colors duration-150 ${
        isAccent ? 'text-accent' : 'text-white'
      }`}
    >
      {char}
    </motion.span>
  );
}

export default function Hero({ onOpenResume }) {
  const canvasRef = useRef(null);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  // Interactive Particle Grid Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    const particleCount = Math.min(Math.floor(window.innerWidth / 28), 50);
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.35 + 0.1,
      });
    }

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 3;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Subtle matrix dot grid
      const dotSpacing = 48;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
      for (let x = 0; x < canvas.width; x += dotSpacing) {
        for (let y = 0; y < canvas.height; y += dotSpacing) {
          ctx.fillRect(x, y, 1, 1);
        }
      }

      // Draw and connect particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Subtle mouse pull
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          p.x -= (dx / dist) * 0.8;
          p.y -= (dy / dist) * 0.8;
        }

        ctx.fillStyle = `rgba(99, 102, 241, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist2 < 120) {
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.12 * (1 - dist2 / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollToSection = (id) => {
    playHudClick('blip');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const nameFirst = ['A', 'D', 'I', 'T', 'Y', 'A'];
  const nameLast = ['S', 'I', 'N', 'G', 'H'];

  const copyConfigSnippet = () => {
    playHudClick('blip');
    const snippet = `const engineer = {\n  name: "Aditya Singh",\n  role: "Full-Stack Software Engineer",\n  college: "KIET Group of Institutions (2025-2029)",\n  stack: ["PostgreSQL", "Prisma", "Node.js", "Express", "React", "C++"],\n  contact: "adityasingh917023@gmail.com"\n};`;
    navigator.clipboard.writeText(snippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <section
      id="intro"
      className="relative min-h-[100svh] pt-24 pb-16 flex flex-col justify-between overflow-hidden bg-ink border-b border-white/[0.08]"
    >
      {/* Background Interactive Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-70"
      />

      <div className="relative z-10 max-w-[1600px] w-full mx-auto px-6 md:px-12 flex-1 flex flex-col justify-between">
        {/* Top Kicker Bar */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4"
        >
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 bg-accent rounded-full animate-ping" />
            <span className="hud-label text-accent font-semibold text-[11px]">
              COMPUTER SCIENCE UNDERGRADUATE
            </span>
            <span className="text-white/20">/</span>
            <span className="hud-label text-white/50 hidden md:inline text-[11px]">
              KIET GROUP OF INSTITUTIONS (2025–2029)
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hud-label text-white/60 flex items-center gap-2 text-[10px]">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span>SEEKING SOFTWARE ENGINEERING INTERNSHIPS</span>
            </div>
          </div>
        </motion.div>

        {/* Main Hero Grid */}
        <div className="my-auto py-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Kinetic Name & Narrative */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="space-y-2">
              <span className="hud-label text-accent block tracking-widest text-xs font-semibold">
                // SYSTEM IDENTIFIER
              </span>
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="tracking-tight uppercase font-display font-black leading-[0.9] select-none flex flex-col"
              >
                {/* First Name */}
                <span className="block text-[clamp(2.8rem,7.5vw,6.5rem)] font-light text-white/90 tracking-tight">
                  {nameFirst.map((char, index) => (
                    <KineticLetter key={index} char={char} />
                  ))}
                </span>

                {/* Last Name */}
                <span className="block text-[clamp(3.8rem,10.5vw,9.5rem)] font-extrabold tracking-tighter text-white drop-shadow-[0_0_35px_rgba(99,102,241,0.3)]">
                  {nameLast.map((char, index) => (
                    <KineticLetter key={index} char={char} isAccent={true} />
                  ))}
                </span>
              </motion.h1>
            </div>

            {/* Editorial Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight leading-tight max-w-2xl"
            >
              Building digital experiences with <span className="text-accent underline decoration-accent/40 underline-offset-4">code & intent.</span>
            </motion.h2>

            {/* Concise Engineering Narrative */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base md:text-lg text-white/70 max-w-2xl font-light leading-relaxed"
            >
              Computer Science undergraduate focused on practical full-stack web development with{' '}
              <span className="text-white font-medium">React.js, Node.js, Express.js</span>, and{' '}
              <span className="text-accent font-medium">PostgreSQL & Prisma ORM</span>. 
              Practicing Data Structures & Algorithms in C++ and building responsive, reliable software applications.
            </motion.p>

            {/* Verified Stack Pills */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-2 pt-1"
            >
              <span className="hud-label px-3 py-1 bg-white/[0.03] border border-white/10 text-white/80 flex items-center gap-2 hover:border-accent/50 transition-colors">
                <span className="w-1.5 h-1.5 bg-accent" />
                POSTGRESQL & PRISMA
              </span>
              <span className="hud-label px-3 py-1 bg-white/[0.03] border border-white/10 text-white/80 flex items-center gap-2 hover:border-accent/50 transition-colors">
                <span className="w-1.5 h-1.5 bg-accent" />
                REACT & TAILWIND CSS
              </span>
              <span className="hud-label px-3 py-1 bg-white/[0.03] border border-white/10 text-white/80 flex items-center gap-2 hover:border-accent/50 transition-colors">
                <span className="w-1.5 h-1.5 bg-accent" />
                NODE & EXPRESS REST APIS
              </span>
              <span className="hud-label px-3 py-1 bg-white/[0.03] border border-white/10 text-white/80 flex items-center gap-2 hover:border-accent/50 transition-colors">
                <span className="w-1.5 h-1.5 bg-accent" />
                C++ & DSA SOLVER
              </span>
            </motion.div>

            {/* CTAs and Profile Links */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <button
                onClick={() => scrollToSection('work')}
                className="px-6 py-3.5 bg-accent text-ink font-bold hud-label text-xs flex items-center gap-2.5 hover:bg-white hover:text-ink transition-all shadow-[0_0_25px_rgba(99,102,241,0.3)] cursor-pointer"
              >
                <span>EXPLORE FEATURED WORK</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  playHudClick('blip');
                  if (onOpenResume) onOpenResume();
                }}
                className="px-5 py-3.5 bg-white/[0.04] border border-white/15 hover:border-accent text-white font-medium hud-label text-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4 text-accent" />
                <span>RÉSUMÉ [PDF]</span>
              </button>

              {/* Social Link Badges */}
              <div className="flex items-center gap-2 pl-2">
                <a
                  href="https://github.com/Adityasingh909"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-white/10 hover:border-accent text-white/70 hover:text-accent bg-white/[0.02] transition-colors"
                  title="GitHub Profile"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>

                <a
                  href="https://linkedin.com/in/adityasingh0981"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-white/10 hover:border-accent text-white/70 hover:text-accent bg-white/[0.02] transition-colors"
                  title="LinkedIn Profile"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                <a
                  href="mailto:adityasingh917023@gmail.com"
                  className="p-3 border border-white/10 hover:border-accent text-white/70 hover:text-accent bg-white/[0.02] transition-colors"
                  title="Email Aditya"
                  aria-label="Email Aditya"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Visual Focal Point (Engineering Spec Terminal) */}
          <div className="lg:col-span-5 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-ink-card border border-white/15 p-6 corner-bracket shadow-2xl relative overflow-hidden backdrop-blur-md"
            >
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="hud-label text-white/50 text-[10px] ml-2 font-mono">
                    aditya.config.ts
                  </span>
                </div>
                <button
                  onClick={copyConfigSnippet}
                  className="hud-label text-[10px] text-accent hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                  title="Copy configuration snippet"
                >
                  {copiedSnippet ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Code2 className="w-3 h-3" />
                      <span>COPY SPEC</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Snippet */}
              <pre className="font-mono text-xs text-white/80 leading-relaxed overflow-x-auto py-2">
                <code>
                  <span className="text-violet-400">const</span>{' '}
                  <span className="text-blue-300">engineer</span> = &#123;{'\n'}
                  {'  '}<span className="text-white/60">name:</span>{' '}
                  <span className="text-emerald-300">"Aditya Singh"</span>,{'\n'}
                  {'  '}<span className="text-white/60">role:</span>{' '}
                  <span className="text-emerald-300">"Computer Science Undergrad"</span>,{'\n'}
                  {'  '}<span className="text-white/60">college:</span>{' '}
                  <span className="text-emerald-300">"KIET Group of Institutions"</span>,{'\n'}
                  {'  '}<span className="text-white/60">batch:</span>{' '}
                  <span className="text-amber-300">2025</span> - <span className="text-amber-300">2029</span>,{'\n'}
                  {'  '}<span className="text-white/60">focus:</span> [
                  <span className="text-emerald-300">"Full-Stack"</span>,{' '}
                  <span className="text-emerald-300">"DSA in C++"</span>,{' '}
                  <span className="text-emerald-300">"DBMS"</span>],{'\n'}
                  {'  '}<span className="text-white/60">primaryStack:</span> &#123;{'\n'}
                  {'    '}<span className="text-white/60">backend:</span> [<span className="text-emerald-300">"Node.js"</span>, <span className="text-emerald-300">"Express"</span>, <span className="text-emerald-300">"REST"</span>],{'\n'}
                  {'    '}<span className="text-white/60">databases:</span> [<span className="text-emerald-300">"PostgreSQL"</span>, <span className="text-emerald-300">"MongoDB"</span>],{'\n'}
                  {'    '}<span className="text-white/60">orm:</span> [<span className="text-emerald-300">"Prisma"</span>, <span className="text-emerald-300">"Mongoose"</span>],{'\n'}
                  {'    '}<span className="text-white/60">frontend:</span> [<span className="text-emerald-300">"React"</span>, <span className="text-emerald-300">"Tailwind CSS"</span>]{'\n'}
                  {'  '}&#125;,{'\n'}
                  {'  '}<span className="text-white/60">activeWork:</span> <span className="text-accent font-semibold">"CampusHub LMS & Taskly"</span>,{'\n'}
                  {'  '}<span className="text-white/60">seeking:</span> <span className="text-emerald-400 font-semibold">"Software Engineering Internships"</span>{'\n'}
                  &#125;;
                </code>
              </pre>

              {/* Terminal Bottom Status */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between hud-label text-[10px] text-white/50">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>STATUS: READY FOR INTERVIEWS</span>
                </div>
                <span className="text-white/40">NODE_ENV: PRODUCTION</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="pt-6 border-t border-white/[0.08] flex items-center justify-between hud-label text-[10px] text-white/40"
        >
          <div className="flex items-center gap-3">
            <span className="text-accent">SCROLL DOWN</span>
            <span>↓</span>
            <span className="hidden sm:inline">EXPLORE 3 VERIFIED CASE STUDIES</span>
          </div>

          <div className="flex items-center gap-4">
            <span>LOC: GORAKHPUR / GHAZIABAD, UP</span>
            <span>•</span>
            <span className="text-white/60">LATENCY: ~24MS</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
