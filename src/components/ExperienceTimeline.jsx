'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Code2, Rocket, Award, CheckCircle2, Terminal } from 'lucide-react';

export default function ExperienceTimeline() {
  const milestones = [
    {
      year: '2026',
      tag: 'FULL-STACK SYSTEMS',
      role: 'Full-Stack Software Development & Architecture',
      subtitle: 'CampusHub LMS & Taskly Platform',
      badge: 'PRODUCTION & LMS',
      icon: Rocket,
      points: [
        'Architected & deployed CampusHub LMS on Vercel & Render with Neon PostgreSQL, Prisma ORM, Cloudflare R2 presigned storage, and role-based student/teacher workflows.',
        'Engineered Taskly full-stack MERN productivity app with JWT authentication, deployed live to Netlify and Render.',
        'Continuous practice in C++ and solving Data Structures and Algorithms problems on LeetCode.',
      ],
      stack: ['PostgreSQL', 'Prisma ORM', 'Cloudflare R2', 'Node.js', 'Express', 'React 19', 'Tailwind v4', 'MongoDB', 'JWT'],
    },
    {
      year: '2025 – 2029',
      tag: 'UNDERGRADUATE DEGREE',
      role: 'B.Tech in Computer Science and Engineering',
      subtitle: 'KIET Group of Institutions, Ghaziabad, UP',
      badge: 'CURRENT B.TECH',
      icon: GraduationCap,
      points: [
        'Relevant coursework in Data Structures & Algorithms, Object-Oriented Programming, and Database Management Systems (DBMS).',
        'Deepening core computer science theory, systems architecture, and software engineering methodologies.',
        'Active technical problem solving and algorithm analysis in C++.',
      ],
      stack: ['C++', 'DSA', 'DBMS', 'OOP', 'SQL', 'Computer Networks'],
    },
    {
      year: '2025',
      tag: 'WEB DEVELOPMENT & APIS',
      role: 'Frontend Engineering & REST API Integration',
      subtitle: 'Weather Application & Asynchronous Projects',
      badge: 'DEPLOYED GITHUB PAGES',
      icon: Code2,
      points: [
        'Developed dynamic client-side weather app parsing asynchronous JSON streams from the OpenWeather REST API.',
        'Implemented DOM manipulation, responsive CSS layouts, and error handling.',
        'Deployed application globally using GitHub Pages.',
      ],
      stack: ['JavaScript (ES6+)', 'Fetch API', 'HTML5', 'CSS3', 'Git', 'GitHub Pages'],
    },
    {
      year: '2024 & 2022',
      tag: 'ACADEMIC EXCELLENCE',
      role: 'Senior Secondary (12th PCM: 85.66%) & Secondary (10th: 90%)',
      subtitle: 'Maharshi Arvind Vidya Mandir, Kushinagar, UP',
      badge: 'HIGH DISTINCTION',
      icon: Award,
      points: [
        'Senior Secondary (Class 12th): 85.66% distinction in Science (Physics, Chemistry, Mathematics).',
        'Secondary Examination (Class 10th): 90.00% aggregate academic distinction.',
        'Strong foundational analytical thinking, advanced mathematics, and scientific problem-solving.',
      ],
      stack: ['Physics', 'Advanced Mathematics', 'Analytical Reasoning'],
    },
  ];

  return (
    <section id="education" className="bg-ink py-24 border-b border-white/[0.08] relative">
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
            <span className="hud-label text-accent font-bold text-sm">04</span>
            <div className="dash-h flex-1 opacity-20" />
            <span className="hud-label text-white/50">TIMELINE & DEVELOPMENT</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="hud-label text-accent block mb-2 font-mono">
                // PROGRESSION & MILESTONES
              </span>
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-white">
                DEVELOPMENT <span className="text-accent underline decoration-accent/40">TIMELINE.</span>
              </h2>
            </div>
            <p className="hud-label text-white/50 max-w-md text-left md:text-right text-[11px] leading-relaxed">
              Chronological overview of education, software architecture projects, and algorithmic problem-solving milestones.
            </p>
          </div>
        </motion.div>

        {/* Timeline Items */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 md:before:left-8 before:w-px before:bg-white/10">
          {milestones.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-10 md:pl-20"
              >
                {/* Timeline node icon */}
                <div className="absolute left-1.5 md:left-5.5 top-5 w-6 h-6 rounded-none bg-ink border border-accent flex items-center justify-center -translate-x-1/2 shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                  <Icon className="w-3.5 h-3.5 text-accent" />
                </div>

                <div className="bg-ink-card border border-white/[0.08] hover:border-accent/40 transition-colors p-6 md:p-8 corner-bracket group">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="hud-label text-accent font-bold text-xs">
                        {item.year}
                      </span>
                      <span className="text-white/20">/</span>
                      <span className="hud-label text-white/50 text-[10px]">
                        {item.tag}
                      </span>
                    </div>

                    <span className="hud-label px-2.5 py-0.5 bg-accent/15 border border-accent/40 text-accent text-[9px] font-semibold">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold font-display text-white group-hover:text-accent transition-colors">
                    {item.role}
                  </h3>
                  <div className="text-white/70 text-sm font-medium mt-0.5">
                    {item.subtitle}
                  </div>

                  <ul className="mt-4 space-y-2 text-white/70 text-sm font-light leading-relaxed">
                    {item.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5">
                        <span className="text-accent mt-1 text-xs">›</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 pt-3 border-t border-white/[0.06] flex flex-wrap items-center gap-2">
                    <span className="hud-label text-[9px] text-white/40">TECH & FOCUS:</span>
                    {item.stack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="hud-label text-[9px] px-2 py-0.5 bg-white/[0.03] border border-white/[0.06] text-white/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
