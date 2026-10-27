'use client';

import React from 'react';
import { X, Printer, Download, ExternalLink, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';
import { playHudClick } from '../utils/audio';

export default function ResumeModal({ onClose }) {
  const handlePrint = () => {
    playHudClick('blip');
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-white text-zinc-900 border border-white/20 overflow-y-auto p-8 md:p-12 shadow-2xl rounded-none font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar (Hidden when printing) */}
        <div className="flex items-center justify-between border-b border-zinc-200 pb-4 mb-8 print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-600">
              OFFICIAL CURRICULUM VITAE // ADITYA SINGH
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/resume.pdf"
              download="Aditya_Singh_Resume.pdf"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-mono font-semibold uppercase flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD PDF</span>
            </a>

            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-zinc-900 hover:bg-black text-white text-xs font-mono font-semibold uppercase flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT</span>
            </button>

            <button
              onClick={() => {
                playHudClick('tap');
                onClose();
              }}
              className="p-2 border border-zinc-300 hover:bg-zinc-100 text-zinc-700 transition-colors cursor-pointer"
              aria-label="Close CV Modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Resume Header */}
        <div className="text-center border-b border-zinc-300 pb-6 mb-6">
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-zinc-950">
            ADITYA SINGH
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-zinc-600 mt-2 font-mono">
            <span>+91 9235876035</span>
            <span>⋄</span>
            <span>Gorakhpur, Uttar Pradesh</span>
            <span>⋄</span>
            <a href="mailto:adityasingh917023@gmail.com" className="text-indigo-700 hover:underline">
              adityasingh917023@gmail.com
            </a>
            <span>⋄</span>
            <a
              href="https://linkedin.com/in/adityasingh0981"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-700 hover:underline"
            >
              linkedin.com/in/adityasingh0981
            </a>
            <span>⋄</span>
            <a
              href="https://github.com/Adityasingh909"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-700 hover:underline"
            >
              github.com/Adityasingh909
            </a>
          </div>
        </div>

        {/* Objective */}
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-300 pb-1 mb-2 font-mono">
            OBJECTIVE
          </h2>
          <p className="text-xs text-zinc-700 leading-relaxed">
            Computer Science undergraduate with hands-on experience in full-stack web development using React.js, Node.js, Express.js, and databases. Skilled in C++ and Data Structures and Algorithms, with practical experience building web applications and integrating REST APIs. Seeking software development internships to contribute to real-world projects and strengthen backend engineering and problem-solving skills.
          </p>
        </div>

        {/* Education */}
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-300 pb-1 mb-2 font-mono">
            EDUCATION
          </h2>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-baseline">
              <div>
                <strong className="text-zinc-900 font-semibold">B.Tech in Computer Science and Engineering</strong>
                <div className="text-zinc-600">KIET Group of Institutions, Ghaziabad, Uttar Pradesh</div>
                <div className="text-zinc-500 mt-0.5">
                  Relevant Coursework: Data Structures and Algorithms, Object-Oriented Programming, Database Management Systems
                </div>
              </div>
              <span className="font-mono text-zinc-700 text-right whitespace-nowrap">2025 – 2029</span>
            </div>

            <div className="flex justify-between items-baseline pt-2 border-t border-zinc-100">
              <div>
                <strong className="text-zinc-900 font-semibold">Senior Secondary (Class 12th) — Science PCM</strong>
                <div className="text-zinc-600">Maharshi Arvind Vidya Mandir, Kushinagar · Percentage: 85.66%</div>
              </div>
              <span className="font-mono text-zinc-700 text-right">2024</span>
            </div>

            <div className="flex justify-between items-baseline pt-2 border-t border-zinc-100">
              <div>
                <strong className="text-zinc-900 font-semibold">Secondary (Class 10th)</strong>
                <div className="text-zinc-600">Maharshi Arvind Vidya Mandir, Kushinagar · Percentage: 90.00%</div>
              </div>
              <span className="font-mono text-zinc-700 text-right">2022</span>
            </div>
          </div>
        </div>

        {/* Technical Skills */}
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-300 pb-1 mb-2 font-mono">
            TECHNICAL SKILLS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-xs text-zinc-700">
            <div>
              <span className="font-semibold text-zinc-900">Languages:</span> C++, C, Python, JavaScript
            </div>
            <div>
              <span className="font-semibold text-zinc-900">Frontend:</span> HTML5, CSS3, React.js, Tailwind CSS, Responsive Design
            </div>
            <div>
              <span className="font-semibold text-zinc-900">Backend:</span> Node.js, Express.js, REST APIs, JWT Authentication
            </div>
            <div>
              <span className="font-semibold text-zinc-900">Databases:</span> PostgreSQL, MongoDB, Prisma ORM, Mongoose
            </div>
            <div>
              <span className="font-semibold text-zinc-900">Tools:</span> Git, GitHub, VS Code, Postman, Vite
            </div>
            <div>
              <span className="font-semibold text-zinc-900">Core Concepts:</span> Data Structures and Algorithms, DBMS, API Integration
            </div>
          </div>
        </div>

        {/* Projects */}
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-300 pb-1 mb-2 font-mono">
            PROJECTS
          </h2>
          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between items-baseline">
                <strong className="text-zinc-900 text-sm">CampusHub — Learning Management System</strong>
                <span className="font-mono text-zinc-700">2026</span>
              </div>
              <div className="text-indigo-700 font-mono text-[11px] mb-1">
                React 19, Node.js 26, Express.js 5, PostgreSQL (Neon), Prisma ORM 6, Cloudflare R2, Tailwind CSS v4
              </div>
              <ul className="list-disc list-inside text-zinc-700 space-y-1">
                <li>Architected and deployed production full-stack LMS on Vercel and Render with Neon PostgreSQL and Cloudflare R2 object storage.</li>
                <li>Engineered role-based student and teacher portals for course enrollments, timed quiz assessments with automated grading, and assignment evaluations.</li>
                <li>Integrated Cloudflare R2 private bucket with 60-second presigned URLs and compensating transaction rollbacks preventing orphan blobs.</li>
                <li>Designed 13 relational Prisma models with 12 applied migrations and implemented stateless JWT authentication with bcrypt hashing.</li>
              </ul>
            </div>

            <div className="pt-3 border-t border-zinc-100">
              <div className="flex justify-between items-baseline">
                <strong className="text-zinc-900 text-sm">Taskly — Full-Stack Task & Productivity App</strong>
                <span className="font-mono text-zinc-700">2026</span>
              </div>
              <div className="text-indigo-700 font-mono text-[11px] mb-1">
                React 19, Node.js, Express.js, MongoDB, Mongoose, JWT, Netlify, Render
              </div>
              <ul className="list-disc list-inside text-zinc-700 space-y-1">
                <li>Deployed full-stack MERN application on Netlify (client) and Render (backend REST API).</li>
                <li>Integrated secure JWT authentication, registration, and persistent user sessions.</li>
                <li>Implemented full CRUD operations for task lifecycle with status tracking and dark theme.</li>
              </ul>
            </div>

            <div className="pt-3 border-t border-zinc-100">
              <div className="flex justify-between items-baseline">
                <strong className="text-zinc-900 text-sm">Weather Application</strong>
                <span className="font-mono text-zinc-700">2025</span>
              </div>
              <div className="text-indigo-700 font-mono text-[11px] mb-1">
                HTML, CSS, JavaScript (ES6+), OpenWeather REST API, GitHub Pages
              </div>
              <ul className="list-disc list-inside text-zinc-700 space-y-1">
                <li>Developed a weather application that retrieves weather information using an external REST API.</li>
                <li>Used asynchronous JavaScript and DOM manipulation to display dynamic weather data.</li>
                <li>Deployed the application globally using GitHub Pages.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Problem Solving and Interests */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-300 pb-1 mb-2 font-mono">
            PROBLEM SOLVING AND INTERESTS
          </h2>
          <ul className="list-disc list-inside text-xs text-zinc-700 space-y-1">
            <li>Practicing Data Structures and Algorithms using C++ and solving coding problems on LeetCode.</li>
            <li>Interested in full-stack development, backend engineering, AI security, and competitive programming.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
