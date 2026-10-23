'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Code2, Database, Layers, Wrench, Cpu, CheckCircle2, Play, Copy, RefreshCw } from 'lucide-react';
import { playHudClick } from '../utils/audio';

export default function DesignLab() {
  const [activeTab, setActiveTab] = useState('skills');
  const [activeCommand, setActiveCommand] = useState('cat skills.json');
  const [terminalOutput, setTerminalOutput] = useState(
`{
  "developer": "Aditya Singh",
  "degree": "B.Tech CSE (2025-2029)",
  "institution": "KIET Group of Institutions",
  "coreLanguages": ["C++", "C", "Python", "JavaScript"],
  "fullStack": {
    "frontend": ["React.js", "Tailwind CSS", "HTML5", "CSS3"],
    "backend": ["Node.js", "Express.js", "REST APIs", "JWT Auth"],
    "databases": ["PostgreSQL", "MongoDB"],
    "dataAccess": ["Prisma ORM", "Mongoose"]
  },
  "focus": ["Data Structures & Algorithms", "DBMS", "System Reliability"]
}`
  );

  const skillGroups = [
    {
      title: 'PROGRAMMING LANGUAGES',
      icon: Code2,
      skills: [
        { name: 'C++', tag: 'DSA & Competitive', desc: 'Core language for algorithmic problem-solving & data structures' },
        { name: 'JavaScript (ES6+)', tag: 'Modern Web', desc: 'Asynchronous event-driven programming, DOM, and Node.js' },
        { name: 'Python', tag: 'Scripting', desc: 'Automation, procedural logic, and algorithm scripting' },
        { name: 'C', tag: 'Low-level Core', desc: 'Memory pointers, struct definitions, and fundamentals' },
      ],
    },
    {
      title: 'BACKEND & DATABASE SYSTEMS',
      icon: Database,
      skills: [
        { name: 'Node.js & Express.js', tag: 'Server Runtime', desc: 'REST API architectures, middleware routing, and error pipelines' },
        { name: 'PostgreSQL', tag: 'Relational DB', desc: 'Normalized relational schemas, ACID transactions, and indexing' },
        { name: 'Prisma ORM', tag: 'Type-Safe ORM', desc: 'Declarative schemas, automated migrations, and relation modeling' },
        { name: 'MongoDB & Mongoose', tag: 'NoSQL Document', desc: 'Document schemas, aggregation pipelines, and cloud clusters' },
        { name: 'JWT Authentication', tag: 'Security', desc: 'Stateless bearer tokens, encrypted payload verification, and Bcrypt' },
      ],
    },
    {
      title: 'FRONTEND ENGINEERING',
      icon: Layers,
      skills: [
        { name: 'React.js', tag: 'Component UI', desc: 'Functional hooks, state machines, context APIs, and reusable design' },
        { name: 'Tailwind CSS', tag: 'Utility-first', desc: 'Design systems, responsive flex/grid layouts, and dark mode' },
        { name: 'HTML5 & CSS3', tag: 'Semantic Standards', desc: 'Accessible document hierarchies, CSS grid, and animations' },
        { name: 'Responsive UI Design', tag: 'Mobile to 4K', desc: 'Zero overflow, touch targets, and cross-browser consistency' },
      ],
    },
    {
      title: 'TOOLS & CORE CS FOUNDATIONS',
      icon: Wrench,
      skills: [
        { name: 'Data Structures & Algorithms', tag: 'Core Theory', desc: 'Arrays, Trees, Graphs, Sorting, Dynamic Programming in C++' },
        { name: 'Database Management (DBMS)', tag: 'Relational Theory', desc: 'Normalization, ER diagrams, foreign key integrity, and SQL' },
        { name: 'Git & GitHub', tag: 'Version Control', desc: 'Branching workflows, commits, remote repo synchronization' },
        { name: 'Vite & VS Code & Postman', tag: 'Dev Workflow', desc: 'Fast HMR bundling, automated debugging, and REST API contract testing' },
      ],
    },
  ];

  const commands = [
    {
      cmd: 'cat skills.json',
      label: 'STACK JSON',
      output:
`{
  "developer": "Aditya Singh",
  "degree": "B.Tech CSE (2025-2029)",
  "institution": "KIET Group of Institutions",
  "coreLanguages": ["C++", "C", "Python", "JavaScript"],
  "fullStack": {
    "frontend": ["React.js", "Tailwind CSS", "HTML5", "CSS3"],
    "backend": ["Node.js", "Express.js", "REST APIs", "JWT Auth"],
    "databases": ["PostgreSQL", "MongoDB"],
    "dataAccess": ["Prisma ORM", "Mongoose"]
  },
  "focus": ["Data Structures & Algorithms", "DBMS", "System Reliability"]
}`,
    },
    {
      cmd: 'run dsa_benchmark.cpp',
      label: 'DSA // C++',
      output:
`[EXECUTING] g++ -O3 -std=c++17 solver.cpp -o solver && ./solver
--------------------------------------------------------
Target: LeetCode Practice & Algorithmic Problem Solving
Primary Language: C++ (Standard Template Library)
Data Structures: Binary Trees, Heaps, Hash Tables, Graphs
Complexity Target: O(N log N) or O(N) optimal bounds
Memory Footprint: O(1) auxiliary space where applicable
Status: Problem-solving active on LeetCode & competitive tracks.
[SUCCESS] Execution finished in 0.002s with exit code 0.`,
    },
    {
      cmd: 'prisma db pull // campushub',
      label: 'PRISMA SCHEMA',
      output:
`// CampusHub LMS Prisma Schema Extract
model User {
  id           String       @id @default(uuid())
  email        String       @unique
  role         Role         @default(STUDENT)
  enrollments  Enrollment[]
  submissions  Submission[]
}

model Course {
  id           String       @id @default(uuid())
  title        String
  code         String       @unique
  modules      Module[]
  assignments  Assignment[]
}

Status: Verified relational models for CampusHub full-stack LMS.`,
    },
    {
      cmd: 'system --status',
      label: 'CLOUD HEALTH',
      output:
`[SYSTEM HEALTH CHECK]
--------------------------------------------------------
[✓] Taskly Frontend:   https://stalwart-churros-92fd3a.netlify.app (200 OK)
[✓] Taskly API:        https://taskly-backend-g6in.onrender.com (200 OK)
[✓] Weather App:       https://adityasingh909.github.io/weather-App/ (200 OK)
[✓] CampusHub Repo:    https://github.com/Adityasingh909/CampusHub (Active)
All production endpoints operational.`,
    },
  ];

  const handleCommandSelect = (c) => {
    playHudClick('blip');
    setActiveCommand(c.cmd);
    setTerminalOutput(c.output);
  };

  return (
    <section id="skills" className="bg-ink py-24 border-b border-white/[0.08] relative">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 mb-16"
        >
          <div className="flex items-center gap-4">
            <span className="hud-label text-accent font-bold text-sm">03</span>
            <div className="dash-h flex-1 opacity-20" />
            <span className="hud-label text-white/50">ENGINEERING CAPABILITIES</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="hud-label text-accent block mb-2 font-mono">
                // SYSTEM ARCHITECTURE & STACK
              </span>
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-white">
                TECHNICAL <span className="text-accent underline decoration-accent/40">STACK.</span>
              </h2>
            </div>
            <p className="hud-label text-white/50 max-w-md text-left md:text-right text-[11px] leading-relaxed">
              Verified programming languages, databases, full-stack frameworks, and computer science foundations from academic & practical project experience.
            </p>
          </div>
        </motion.div>

        {/* View Switcher: Structured Taxonomy vs Live CLI Terminal */}
        <div className="flex items-center gap-2 mb-10 pb-4 border-b border-white/[0.08]">
          <button
            onClick={() => {
              playHudClick('blip');
              setActiveTab('skills');
            }}
            className={`px-4 py-2 hud-label text-xs transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'skills'
                ? 'bg-accent text-ink font-bold'
                : 'bg-white/[0.03] text-white/60 hover:text-white border border-white/10'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>MODULAR STACK MATRIX</span>
          </button>

          <button
            onClick={() => {
              playHudClick('blip');
              setActiveTab('terminal');
            }}
            className={`px-4 py-2 hud-label text-xs transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'terminal'
                ? 'bg-accent text-ink font-bold'
                : 'bg-white/[0.03] text-white/60 hover:text-white border border-white/10'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>INTERACTIVE ARCHITECTURE CLI</span>
          </button>
        </div>

        {/* Content View 1: Modular Skill Groups */}
        {activeTab === 'skills' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {skillGroups.map((group, gIdx) => {
              const Icon = group.icon;
              return (
                <div
                  key={gIdx}
                  className="bg-ink-card border border-white/[0.08] hover:border-accent/40 transition-colors p-6 md:p-8 corner-bracket flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-accent/15 border border-accent/40 text-accent">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h3 className="hud-label text-white font-bold text-xs">
                          {group.title}
                        </h3>
                      </div>
                      <span className="hud-label text-white/40 text-[9px]">
                        0{gIdx + 1} // VERIFIED
                      </span>
                    </div>

                    <div className="space-y-4">
                      {group.skills.map((skill, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-3 bg-white/[0.02] border border-white/[0.05] hover:border-accent/30 hover:bg-white/[0.04] transition-all group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-white font-bold text-sm font-display group-hover:text-accent transition-colors">
                              {skill.name}
                            </span>
                            <span className="hud-label text-[9px] px-2 py-0.5 bg-accent/10 border border-accent/30 text-accent">
                              {skill.tag}
                            </span>
                          </div>
                          <p className="text-white/60 text-xs mt-1.5 font-light leading-relaxed">
                            {skill.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between hud-label text-[9px] text-white/40">
                    <span>STATUS: IN ACTIVE ROTATION</span>
                    <span className="text-emerald-400">● PRODUCTION TESTED</span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}

        {/* Content View 2: Interactive Developer Terminal */}
        {activeTab === 'terminal' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-ink-card border border-white/15 corner-bracket shadow-2xl p-6 md:p-8 overflow-hidden backdrop-blur-md"
          >
            {/* Terminal Top Window Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="hud-label text-white/60 text-xs ml-3 font-mono">
                  aditya@kiet-node:~ (zsh)
                </span>
              </div>

              {/* Quick Command Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                {commands.map((c, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCommandSelect(c)}
                    className={`px-3 py-1 hud-label text-[10px] transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeCommand === c.cmd
                        ? 'bg-accent text-ink font-bold border border-accent'
                        : 'bg-white/[0.04] text-white/70 hover:text-white border border-white/10'
                    }`}
                  >
                    <Play className="w-2.5 h-2.5" />
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Terminal Command Line Input */}
            <div className="flex items-center gap-2 text-sm font-mono text-white/90 mb-4 pb-3 border-b border-white/[0.06]">
              <span className="text-emerald-400 font-bold">aditya@workstation:~$</span>
              <span className="text-accent font-semibold">{activeCommand}</span>
              <span className="w-2 h-4 bg-accent animate-pulse inline-block" />
            </div>

            {/* Terminal Output Stream */}
            <pre className="font-mono text-xs md:text-sm text-white/80 bg-black/60 p-5 border border-white/10 rounded-none leading-relaxed overflow-x-auto min-h-[220px]">
              <code>{terminalOutput}</code>
            </pre>

            {/* Terminal Status Bar */}
            <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 hud-label text-[10px] text-white/40">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>SHELL: ZSH // NODE: V20.x // COMPILER: CLANG 15.0</span>
              </div>
              <span>READY FOR CODE REVIEW & INTERVIEWS</span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
