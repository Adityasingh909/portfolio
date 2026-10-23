'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen, Code2, Database, Terminal, FileText, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { playHudClick } from '../utils/audio';

export default function AboutSection({ onOpenResume }) {
  const educationItems = [
    {
      degree: 'B.Tech in Computer Science and Engineering',
      institution: 'KIET Group of Institutions, Ghaziabad, Uttar Pradesh',
      duration: '2025 – 2029',
      status: 'Current Undergrad',
      badge: 'ACTIVE B.TECH',
      description:
        'Pursuing core Computer Science and Engineering with a focus on full-stack development, software architecture, and algorithmic problem-solving.',
      coursework: [
        'Data Structures and Algorithms',
        'Object-Oriented Programming',
        'Database Management Systems',
      ],
    },
    {
      degree: 'Senior Secondary (Class 12th) — Science PCM',
      institution: 'Maharshi Arvind Vidya Mandir, Kushinagar, UP',
      duration: '2024',
      status: 'Completed',
      badge: '85.66% DISTINCTION',
      description:
        'Completed senior secondary education focusing on Physics, Chemistry, and Advanced Mathematics.',
      coursework: ['Physics', 'Chemistry', 'Mathematics (PCM)'],
    },
    {
      degree: 'Secondary Examination (Class 10th)',
      institution: 'Maharshi Arvind Vidya Mandir, Kushinagar, UP',
      duration: '2022',
      status: 'Completed',
      badge: '90.00% DISTINCTION',
      description:
        'Solid foundational performance with 90% aggregate marks across science, mathematics, and humanities.',
      coursework: ['Science', 'Mathematics', 'English'],
    },
  ];

  const highlights = [
    {
      title: 'Full-Stack Architecture',
      description:
        'Building end-to-end web applications with React frontend interfaces and Node.js/Express.js backend services.',
      icon: Code2,
    },
    {
      title: 'Databases & ORM',
      description:
        'Experience modeling relational databases with PostgreSQL and Prisma, alongside document stores with MongoDB and Mongoose.',
      icon: Database,
    },
    {
      title: 'DSA in C++',
      description:
        'Consistent algorithmic problem-solving on LeetCode using C++, focusing on time/space complexity optimization.',
      icon: Terminal,
    },
  ];

  return (
    <section id="about" className="bg-ink py-24 border-b border-white/[0.08] relative">
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
            <span className="hud-label text-accent font-bold text-sm">02</span>
            <div className="dash-h flex-1 opacity-20" />
            <span className="hud-label text-white/50">BIOGRAPHY & BACKGROUND</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="hud-label text-accent block mb-2 font-mono">
                // ABOUT THE DEVELOPER
              </span>
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-white">
                ENGINEERING <span className="text-accent underline decoration-accent/40">MINDSET.</span>
              </h2>
            </div>
            <p className="hud-label text-white/50 max-w-md text-left md:text-right text-[11px] leading-relaxed">
              B.Tech Computer Science student building practical software systems, mastering backend data pipelines, and continuously refining problem-solving skills.
            </p>
          </div>
        </motion.div>

        {/* Grid Layout: Editorial Narrative on Left, Academic Timeline on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Narrative & Focus Areas */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <div className="bg-ink-card border border-white/[0.08] p-8 corner-bracket space-y-6">
              <span className="hud-label text-accent text-xs block font-mono">
                // PROFESSIONAL IDENTITY
              </span>

              <h3 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight leading-snug">
                I build robust software by combining clean frontend engineering with reliable backend architecture.
              </h3>

              <div className="space-y-4 text-white/75 font-light leading-relaxed text-base">
                <p>
                  I am a Computer Science and Engineering undergraduate at{' '}
                  <span className="text-white font-medium">KIET Group of Institutions</span> (Batch of 2025–2029), 
                  based in Uttar Pradesh, India.
                </p>
                <p>
                  Rather than treating software engineering as isolated syntax, I focus on how components communicate:
                  from building responsive single-page interfaces in <span className="text-white font-medium">React and Tailwind CSS</span>,
                  to engineering RESTful APIs with <span className="text-white font-medium">Node.js and Express.js</span>,
                  to orchestrating structured schemas in <span className="text-accent font-medium">PostgreSQL via Prisma ORM</span>.
                </p>
                <p>
                  Alongside full-stack web development, I dedicate deliberate practice to{' '}
                  <span className="text-white font-medium">Data Structures and Algorithms using C++</span>,
                  analyzing time and space complexities, and solving algorithmic problems on LeetCode.
                </p>
              </div>

              {/* Verified Highlights */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-1 gap-4">
                {highlights.map((h, idx) => {
                  const Icon = h.icon;
                  return (
                    <div key={idx} className="flex items-start gap-4 p-3.5 bg-white/[0.02] border border-white/[0.06]">
                      <div className="p-2 bg-accent/15 border border-accent/40 text-accent shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm font-display">{h.title}</h4>
                        <p className="text-white/60 text-xs mt-1 leading-relaxed">{h.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Résumé Action Button */}
              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={() => {
                    playHudClick('blip');
                    if (onOpenResume) onOpenResume();
                  }}
                  className="px-5 py-3 bg-accent text-ink font-bold hud-label text-xs flex items-center gap-2 hover:bg-white transition-all cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>VIEW FULL CURRICULUM VITAE</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Academic Credentials & Education Dossier */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <GraduationCap className="w-5 h-5 text-accent" />
                <span className="hud-label text-white/90 text-xs font-semibold">
                  ACADEMIC BACKGROUND & EDUCATION
                </span>
              </div>
              <span className="hud-label text-white/40 text-[10px]">VERIFIED CREDENTIALS</span>
            </div>

            <div className="space-y-6">
              {educationItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="bg-ink-card border border-white/[0.08] hover:border-accent/50 transition-colors p-6 corner-bracket relative group"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="hud-label text-accent font-mono text-[10px] font-bold">
                      {item.duration}
                    </span>
                    <span className="hud-label px-2.5 py-0.5 bg-accent/15 border border-accent/40 text-accent text-[9px] font-semibold">
                      {item.badge}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold font-display text-white group-hover:text-accent transition-colors">
                    {item.degree}
                  </h4>

                  <div className="text-white/60 text-sm font-medium mt-1">
                    {item.institution}
                  </div>

                  <p className="text-white/70 text-xs font-light leading-relaxed mt-3">
                    {item.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-wrap items-center gap-2">
                    <span className="hud-label text-[9px] text-white/40">FOCUS:</span>
                    {item.coursework.map((course, cIdx) => (
                      <span
                        key={cIdx}
                        className="hud-label text-[9px] px-2 py-0.5 bg-white/[0.03] border border-white/[0.06] text-white/75"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
