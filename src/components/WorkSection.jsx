'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, Eye, Layers, Database, Server, Globe, CheckCircle2, Terminal } from 'lucide-react';
import { playHudClick } from '../utils/audio';

function WorkCard({ project, index, onSelect }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(project)}
      className="group relative bg-ink-card border border-white/[0.08] hover:border-accent/70 transition-all duration-300 p-6 md:p-10 cursor-pointer overflow-hidden corner-bracket shadow-2xl"
    >
      {/* Dynamic Cursor Spotlight Radial Glow */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.12), transparent 70%)`,
          }}
        />
      )}

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Project Metadata & Engineering Narrative */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div>
            {/* Top Meta Line */}
            <div className="flex flex-wrap items-center gap-2.5 hud-label text-white/50 text-xs mb-3">
              <span className="text-accent font-mono font-bold">0{index + 1}</span>
              <span>/</span>
              <span className="text-white/80">{project.type}</span>
              <span>•</span>
              <span className="text-white/60">{project.year}</span>
              <span>•</span>
              <span className={`px-2 py-0.5 text-[10px] font-mono border ${
                project.isLive 
                  ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10' 
                  : 'border-accent/40 text-accent bg-accent/10'
              }`}>
                {project.statusBadge}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-3xl md:text-5xl font-display font-extrabold uppercase text-white group-hover:text-accent transition-colors tracking-tight">
              {project.title}
            </h3>

            {/* Tagline / Subtitle */}
            <p className="mt-1 text-sm font-mono text-accent/90">
              {project.subtitle}
            </p>

            {/* Problem & Solution Summary */}
            <p className="mt-4 text-base md:text-lg text-white/75 font-light leading-relaxed max-w-2xl">
              {project.summary}
            </p>
          </div>

          {/* Key Architecture Metrics */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/[0.08]">
            {project.metrics.map((m, mIdx) => (
              <div
                key={mIdx}
                className="bg-white/[0.02] p-3 border border-white/[0.05] group-hover:border-accent/20 transition-colors"
              >
                <span className="block text-lg md:text-xl font-extrabold text-accent font-mono">
                  {m.val}
                </span>
                <span className="hud-label text-white/50 text-[9px] md:text-[10px] block mt-0.5">
                  {m.label}
                </span>
              </div>
            ))}
          </div>

          {/* Technology Badges & Links */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="hud-label text-[10px] px-2.5 py-1 bg-white/[0.04] text-white/70 border border-white/[0.08] group-hover:border-white/20 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {/* GitHub Link */}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 bg-white/[0.04] border border-white/10 hover:border-accent text-white/70 hover:text-accent transition-colors"
                  title="View Repository on GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}

              {/* Live Link */}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 bg-accent/15 border border-accent/40 text-accent hover:bg-accent hover:text-ink transition-colors"
                  title="Open Live Application"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              <div className="hud-label text-accent flex items-center gap-1.5 group-hover:translate-x-1 transition-transform duration-200">
                <span>CASE STUDY</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: High-Fidelity Application Viewport Preview */}
        <div className="lg:col-span-5 w-full">
          <div
            className="relative aspect-[16/11] w-full rounded-none border border-white/15 p-4 md:p-5 overflow-hidden flex flex-col justify-between group-hover:border-accent group-hover:shadow-[0_0_35px_rgba(99,102,241,0.25)] transition-all duration-500"
            style={{ background: project.previewBg }}
          >
            {/* Viewport Top Header */}
            <div className="flex items-center justify-between hud-label text-[10px] text-white/60 pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: project.accentColor }} />
                <span>{project.previewHeader}</span>
              </div>
              <span className="text-white/40">{project.previewCategory}</span>
            </div>

            {/* Central Interactive Mock Visualizer */}
            <div className="my-auto py-3">
              {project.renderPreview()}
            </div>

            {/* Viewport Bottom HUD */}
            <div className="flex items-center justify-between hud-label text-[9px] text-white/40 pt-2 border-t border-white/10">
              <span>SYSTEM: {project.id.toUpperCase()}</span>
              <span className="text-accent flex items-center gap-1 group-hover:scale-105 transition-transform">
                <Eye className="w-3 h-3" /> CLICK TO INSPECT ARCHITECTURE
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function WorkSection({ onSelectProject }) {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const projects = [
    {
      id: 'campushub-lms',
      title: 'CAMPUSHUB',
      subtitle: 'Full-Stack University LMS & Academic Assessment Engine',
      type: 'Production Full-Stack Platform',
      year: '2026',
      statusBadge: 'DEPLOYED & LIVE',
      isLive: true,
      summary:
        'A production-grade, full-stack Learning Management System engineered to streamline university academic workflows. Deployed on Vercel and Render, featuring role-based student and teacher portals, timed quiz assessments with automated scoring, assignment grading with feedback, and zero-egress private cloud storage on Cloudflare R2.',
      metrics: [
        { val: '13 Models', label: 'PRISMA 6 POSTGRES' },
        { val: '60s Presign', label: 'CLOUDFLARE R2 VAULT' },
        { val: 'Vercel+Render', label: 'EDGE + REST CLOUD' },
      ],
      tags: ['React 19', 'Express 5', 'PostgreSQL (Neon)', 'Prisma 6', 'Cloudflare R2', 'Tailwind v4', 'Vercel', 'Render'],
      accentColor: '#6366f1',
      previewBg: 'linear-gradient(135deg, #0d0f18 0%, #151829 100%)',
      previewHeader: 'CAMPUSHUB // PRODUCTION_PORTAL',
      previewCategory: 'RELATIONAL ARCHITECTURE',
      githubUrl: 'https://github.com/Adityasingh909/CampusHub',
      liveUrl: 'https://campus-hub-delta-sooty.vercel.app',
      details: {
        category: 'Full-Stack Web Application (Production)',
        role: 'Full-Stack Architect & Backend Engineer (Solo Project)',
        timeline: '2026 (Live in Production)',
        technologies: [
          'React 19',
          'Vite 8',
          'Tailwind CSS v4',
          'Node.js 26',
          'Express 5',
          'PostgreSQL (Neon)',
          'Prisma ORM 6',
          'Cloudflare R2',
          'AWS S3 SDK v3',
          'JWT',
          'Bcrypt',
          'Vercel',
          'Render',
        ],
        overview:
          'CampusHub is an educational management platform built to simplify academic administration for students and faculty. It unifies course catalogs, syllabus inspection, deadline-aware assignment submissions, timed assessments, and private cloud document storage into one cohesive, high-performance platform.',
        problem:
          'University LMS platforms often suffer from disjointed user interfaces, brittle submission flows, expensive egress fees for file attachments, and concurrency race conditions during timed exams.',
        solution:
          'Architected a decoupled system with React 19 on Vercel Edge and Express 5 on Render. Integrated Neon Serverless PostgreSQL with 13 relational models and Cloudflare R2 for zero-egress object storage with 60-second presigned URLs. Solved distributed file upload consistency via the Compensating Transaction (Saga) pattern and locked down concurrent quiz attempts with idempotent endpoints.',
        keyFeatures: [
          'Role-Based Academic Portals: Tailored, secure workspaces for Students and Teachers with strict Express RBAC middleware.',
          'Timed Assessment Engine: Timed multiple-choice quizzes with countdown timer, anti-concurrency locks, and instant score computation.',
          'Assignment Lifecycle: Deadline management, file attachments, and a dedicated teacher evaluation portal with scoring rubrics and personalized feedback.',
          'Private Cloud File Vault: User-isolated folders and files integrated directly with Cloudflare R2 and time-limited 60s presigned download URLs.',
          'Distributed Saga Rollback: Automated compensating deletes that remove orphaned R2 blobs if a subsequent PostgreSQL metadata insert fails.',
          'Production Database Migrations: 13 strongly-typed models across 12 sequential Prisma migrations with PgBouncer connection pooling on Neon.',
        ],
        architecture: [
          'Client: React 19 SPA bundled with Vite 8 and Tailwind CSS v4, hosted globally on Vercel Edge CDN.',
          'API Layer: Express 5 REST API on Render container with CORS, 5MB body limits, and stateless JWT authentication.',
          'Persistence: PostgreSQL on Neon Serverless (AWS us-east-2) connected via Prisma ORM 6 with connection pooling.',
          'Object Storage: Cloudflare R2 bucket accessed through @aws-sdk/client-s3 with cryptographically signed presigned URLs.',
        ],
        statusNote:
          'Verified live in production. Frontend is deployed on Vercel at campus-hub-delta-sooty.vercel.app with the API on Render and database on Neon.',
      },
      renderPreview: () => (
        <div className="space-y-2.5">
          {/* Mock Course Banner */}
          <div className="bg-white/[0.05] p-3 border border-white/10 flex items-center justify-between">
            <div>
              <div className="hud-label text-[9px] text-accent font-semibold">CS301 · ACTIVE MODULE</div>
              <div className="text-white font-bold text-sm tracking-tight">Data Structures & Algorithms</div>
            </div>
            <span className="px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 hud-label text-[9px]">
              LIVE // VERCEL
            </span>
          </div>

          {/* Sub Modules Grid */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-black/50 p-2.5 border border-white/10">
              <div className="hud-label text-[8px] text-white/50">ASSESSMENT ENGINE</div>
              <div className="text-white text-xs font-semibold mt-0.5">Timed MCQ Quizzes</div>
              <div className="text-emerald-400 text-[9px] font-mono mt-1">✓ AUTO-GRADED</div>
            </div>
            <div className="bg-black/50 p-2.5 border border-white/10">
              <div className="hud-label text-[8px] text-white/50">CLOUDFLARE R2</div>
              <div className="text-white text-xs font-semibold mt-0.5">Private Vault</div>
              <div className="text-accent text-[9px] font-mono mt-1">🔒 60s PRESIGNED</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'taskly-app',
      title: 'TASKLY',
      subtitle: 'Production MERN Stack Task & Productivity Platform',
      type: 'Full-Stack MERN App',
      year: '2026',
      statusBadge: 'DEPLOYED & LIVE',
      isLive: true,
      summary:
        'A full-stack productivity web application deployed in production on Netlify and Render. Features secure JWT authentication, protected dashboard routes, complete CRUD task lifecycle, and responsive dark/light mode themes.',
      metrics: [
        { val: 'JWT Auth', label: 'SECURE SESSIONS' },
        { val: 'Full CRUD', label: 'TASK LIFECYCLE' },
        { val: 'Production', label: 'RENDER + NETLIFY' },
      ],
      tags: ['React 19', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT', 'Netlify', 'Render'],
      accentColor: '#10b981',
      previewBg: 'linear-gradient(135deg, #071712 0%, #0d281e 100%)',
      previewHeader: 'TASKLY // CLOUD_DASHBOARD',
      previewCategory: 'PRODUCTION DEPLOYMENT',
      githubUrl: 'https://github.com/Adityasingh909/taskly-frontend',
      liveUrl: 'https://stalwart-churros-92fd3a.netlify.app/login',
      details: {
        category: 'Full-Stack MERN Application',
        role: 'Full-Stack Developer (Solo Project)',
        timeline: '2026 (Live in Production)',
        technologies: [
          'React 19',
          'Vite',
          'Tailwind CSS',
          'Node.js',
          'Express.js 5',
          'MongoDB',
          'Mongoose',
          'JWT',
          'Bcrypt',
          'Netlify',
          'Render',
        ],
        overview:
          'Taskly is a full-stack task manager built to help individuals track their daily priorities, deadlines, and project deliverables with a distraction-free user interface and cloud persistence.',
        problem:
          'Many todo applications either lack multi-user authentication or suffer from sluggish interfaces with unnecessary complexity.',
        solution:
          'Architected an end-to-end MERN stack solution with isolated JWT authentication, protected API routes on Render, a MongoDB Atlas database cluster, and a high-performance React frontend hosted on Netlify Edge.',
        keyFeatures: [
          'Authentication Engine: User registration and login with encrypted passwords (Bcrypt) and secure JWT tokens.',
          'Task Management CRUD: Add new tasks with title, description, and status; update existing items; delete completed records.',
          'State Filtering: Toggle task progression between Pending and Completed states with instant optimistic UI feedback.',
          'Cloud Architecture: Backend REST endpoints deployed on Render; frontend static bundle deployed on Netlify.',
          'Dark/Light Theme: Complete custom color theme toggle stored in browser preferences.',
        ],
        architecture: [
          'Frontend: React 19 + Tailwind CSS + Axios + React Router deployed on Netlify Edge.',
          'Backend: Express.js REST API deployed on Render with CORS and token verification middleware.',
          'Database: MongoDB with Mongoose object modeling for users and tasks.',
        ],
        statusNote:
          'Verified live in production. Both frontend and backend repositories are available on GitHub.',
      },
      renderPreview: () => (
        <div className="space-y-2.5">
          {/* Mock Taskly Dashboard */}
          <div className="bg-black/60 p-3 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-white font-bold text-xs">My Tasks (3 Active)</span>
            </div>
            <span className="hud-label text-[9px] text-emerald-400 font-mono">ONLINE // RENDER</span>
          </div>

          <div className="space-y-1.5">
            <div className="bg-white/[0.04] p-2 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border border-emerald-400/60 rounded flex items-center justify-center text-emerald-400 text-[10px]">✓</span>
                <span className="text-white/80 text-xs line-through">Implement JWT Middleware</span>
              </div>
              <span className="hud-label text-[8px] text-emerald-400">DONE</span>
            </div>
            <div className="bg-white/[0.04] p-2 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border border-white/30 rounded" />
                <span className="text-white text-xs">Deploy Backend to Render</span>
              </div>
              <span className="hud-label text-[8px] text-amber-400">PENDING</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'weather-application',
      title: 'WEATHER APP',
      subtitle: 'Dynamic Asynchronous Meteorology Application',
      type: 'Asynchronous Web App',
      year: '2025',
      statusBadge: 'DEPLOYED ON GITHUB PAGES',
      isLive: true,
      summary:
        'A responsive JavaScript weather application retrieving live atmospheric data via external REST APIs. Features dynamic DOM updates, meteorological metric visualization, and seamless global deployment.',
      metrics: [
        { val: 'Fetch API', label: 'ASYNC TELEMETRY' },
        { val: 'OpenWeather', label: 'REST ENDPOINT' },
        { val: 'GH Pages', label: 'LIVE DEPLOYED' },
      ],
      tags: ['HTML5', 'CSS3', 'JavaScript', 'REST API', 'DOM Manipulation', 'GitHub Pages'],
      accentColor: '#06b6d4',
      previewBg: 'linear-gradient(135deg, #06151c 0%, #0a2633 100%)',
      previewHeader: 'WEATHER // API_FEED',
      previewCategory: 'ASYNC TELEMETRY',
      githubUrl: 'https://github.com/Adityasingh909/weather-App',
      liveUrl: 'https://adityasingh909.github.io/weather-App/',
      details: {
        category: 'Client-Side Web Application',
        role: 'Frontend Developer',
        timeline: '2025 (Live in Production)',
        technologies: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'OpenWeather REST API', 'GitHub Pages'],
        overview:
          'A clean, responsive weather application built to deliver instant, real-time weather information for any queried city worldwide using asynchronous JavaScript API calls.',
        problem:
          'Heavy weather portals are often bloated with advertisements, slow loading times, and complex navigation just to check basic temperature and humidity.',
        solution:
          'Built an ultra-fast, lightweight web client using Vanilla JavaScript and CSS, parsing JSON payloads from the OpenWeather API to update temperature, wind velocity, and condition imagery instantaneously.',
        keyFeatures: [
          'Global City Search: Case-insensitive query parsing with immediate response.',
          'Dynamic Weather States: Condition visualizer mapping API weather codes to corresponding imagery (Clear, Rain, Clouds, Mist).',
          'Meteorological Metrics: Live telemetry for temperature (°C), atmospheric humidity (%), and wind speed (km/h).',
          'Resilient Error Handling: Graceful visual feedback when a city name is not found or connection is interrupted.',
          'Zero-Dependency Footprint: Pure vanilla web standards ensuring zero bundle overhead and instantaneous page loads.',
        ],
        architecture: [
          'Architecture: Modular ES6+ JavaScript utilizing asynchronous `fetch` and Promises.',
          'Hosting: Deployed automatically via GitHub Pages at `adityasingh909.github.io/weather-App`.',
        ],
        statusNote: 'Live and publicly accessible. Verified working on mobile and desktop viewports.',
      },
      renderPreview: () => (
        <div className="bg-black/60 p-3.5 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-bold text-base">New Delhi, IN</div>
              <div className="hud-label text-[9px] text-cyan-400">PARTLY CLOUDY · 28°C</div>
            </div>
            <div className="text-2xl font-bold font-mono text-cyan-400">28°</div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
            <div className="bg-white/[0.03] p-2 border border-white/5">
              <span className="hud-label text-[8px] text-white/40 block">HUMIDITY</span>
              <span className="text-white font-mono font-bold text-xs">54%</span>
            </div>
            <div className="bg-white/[0.03] p-2 border border-white/5">
              <span className="hud-label text-[8px] text-white/40 block">WIND SPEED</span>
              <span className="text-white font-mono font-bold text-xs">12.5 km/h</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="work" className="bg-ink py-24 border-b border-white/[0.08] relative">
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
            <span className="hud-label text-accent font-bold text-sm">01</span>
            <div className="dash-h flex-1 opacity-20" />
            <span className="hud-label text-white/50">ENGINEERING PORTFOLIO</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="hud-label text-accent block mb-2 font-mono">
                // VERIFIED PROJECT CASE STUDIES
              </span>
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-white">
                FEATURED <span className="text-accent underline decoration-accent/40">SYSTEMS.</span>
              </h2>
            </div>
            <p className="hud-label text-white/50 max-w-md text-left md:text-right text-[11px] leading-relaxed">
              Full-stack applications, relational database architectures, and production-deployed platforms built with React, Node.js, PostgreSQL, and Express.
            </p>
          </div>
        </motion.div>

        {/* Project Case Studies List */}
        <div className="space-y-12">
          {projects.map((project, idx) => (
            <WorkCard
              key={project.id}
              project={project}
              index={idx}
              onSelect={(proj) => {
                playHudClick('blip');
                onSelectProject(proj);
              }}
            />
          ))}
        </div>

        {/* Section Footer / GitHub Banner */}
        <div className="mt-16 p-8 border border-white/10 bg-white/[0.02] flex flex-col md:flex-row items-center justify-between gap-6 corner-bracket">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-accent/15 border border-accent/40 text-accent">
              <Github className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-lg font-display">Looking for additional code repositories & algorithms?</h4>
              <p className="text-white/60 text-sm mt-0.5">Explore open-source experiments, C++ DSA solutions, and full-stack repositories on GitHub.</p>
            </div>
          </div>

          <a
            href="https://github.com/Adityasingh909"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white text-ink font-bold hud-label text-xs hover:bg-accent hover:text-white transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <span>GITHUB.COM/ADITYASINGH909</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
