'use client';

import React from 'react';
import { X, ExternalLink, Github, CheckCircle2, Terminal, Layers, Database, ArrowRight, ShieldCheck } from 'lucide-react';
import { playHudClick } from '../utils/audio';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-ink-card border border-white/20 overflow-y-auto p-6 md:p-10 corner-bracket shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-6 mb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 hud-label text-xs text-white/50 mb-2">
              <span className="text-accent font-bold">{project.type}</span>
              <span>•</span>
              <span>{project.year}</span>
              <span>•</span>
              <span className="text-emerald-400 font-mono">{project.statusBadge}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black uppercase text-white tracking-tight">
              {project.title}
            </h2>
            <p className="hud-label text-accent mt-2">{project.subtitle}</p>
          </div>

          <button
            onClick={() => {
              playHudClick('tap');
              onClose();
            }}
            className="p-2 border border-white/20 hover:border-accent text-white hover:text-accent transition-colors cursor-pointer"
            aria-label="Close Case Study Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="bg-white/[0.03] p-4 border border-white/10">
              <div className="text-xl md:text-2xl font-black text-accent font-mono">{m.val}</div>
              <div className="hud-label text-[10px] text-white/50 mt-1">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Problem & Architectural Solution */}
        <div className="space-y-6 text-white/80 leading-relaxed font-light mb-8">
          <div className="bg-white/[0.02] p-5 border border-white/[0.08]">
            <h4 className="hud-label text-xs text-accent font-bold mb-2">// THE PROBLEM & CONTEXT</h4>
            <p className="text-sm md:text-base leading-relaxed text-white/80">{project.details.problem}</p>
          </div>

          <div className="bg-white/[0.02] p-5 border border-white/[0.08]">
            <h4 className="hud-label text-xs text-accent font-bold mb-2">// THE ARCHITECTURAL SOLUTION</h4>
            <p className="text-sm md:text-base leading-relaxed text-white/80">{project.details.solution}</p>
          </div>
        </div>

        {/* Key Features Implemented */}
        {project.details.keyFeatures && (
          <div className="mb-8">
            <h4 className="hud-label text-xs text-accent font-bold mb-3">// IMPLEMENTED CAPABILITIES</h4>
            <ul className="space-y-2.5">
              {project.details.keyFeatures.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technical Architecture Breakdown */}
        {project.details.architecture && (
          <div className="mb-8 bg-black/40 p-5 border border-white/10">
            <h4 className="hud-label text-xs text-white/70 font-bold mb-3">// SYSTEM STACK ARCHITECTURE</h4>
            <ul className="space-y-2">
              {project.details.architecture.map((arch, idx) => (
                <li key={idx} className="flex items-start gap-2.5 font-mono text-xs text-white/80">
                  <span className="text-accent mt-0.5">›</span>
                  <span>{arch}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Status Verification Note */}
        {project.details.statusNote && (
          <div className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="hud-label text-emerald-400 text-[10px] block font-bold">VERIFIED PROJECT STATUS</span>
              <p className="text-white/80 text-xs mt-0.5 leading-relaxed">{project.details.statusNote}</p>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="hud-label text-[10px] px-2.5 py-1 bg-white/5 text-white/60">
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white/[0.04] border border-white/15 hover:border-accent text-white text-xs hud-label flex items-center gap-2 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>REPOSITORY</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-accent text-ink font-bold text-xs hud-label flex items-center gap-2 hover:bg-white transition-colors"
              >
                <span>OPEN LIVE APP</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
