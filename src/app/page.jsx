'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ClientsMarquee from '../components/ClientsMarquee';
import WorkSection from '../components/WorkSection';
import AboutSection from '../components/AboutSection';
import DesignLab from '../components/DesignLab';
import ExperienceTimeline from '../components/ExperienceTimeline';
import ContactSection from '../components/ContactSection';
import HudFooter from '../components/HudFooter';
import ProjectModal from '../components/ProjectModal';
import ResumeModal from '../components/ResumeModal';
import CustomCursor from '../components/CustomCursor';

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Initialize Lenis Smooth Inertial Scrolling
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let lenisInstance = null;
    let rafId = null;

    import('lenis').then(({ default: Lenis }) => {
      lenisInstance = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      });

      function raf(time) {
        lenisInstance.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenisInstance) lenisInstance.destroy();
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-ink text-muted bg-grid-hud pb-16 selection:bg-accent selection:text-ink">
      {/* High-Tech Custom HUD Cursor */}
      <CustomCursor />

      {/* Decorative Lateral Dashed Guidelines */}
      <div className="dash-v fixed left-2 md:left-4 top-14 bottom-11 z-40 opacity-20 pointer-events-none hidden sm:block" />
      <div className="dash-v fixed right-2 md:right-4 top-14 bottom-11 z-40 opacity-20 pointer-events-none hidden sm:block" />

      {/* Header with audio synthesizer & quick resume */}
      <Header onOpenResume={() => setIsResumeOpen(true)} />

      {/* Hero Section with Canvas Node Grid, Kinetic Typography & Developer Spec */}
      <Hero onOpenResume={() => setIsResumeOpen(true)} />

      {/* Stack & Systems Marquee */}
      <ClientsMarquee />

      {/* 01: Work & Case Studies Deck with Animated Architecture Viewports */}
      <WorkSection onSelectProject={(project) => setSelectedProject(project)} />

      {/* 02: About the Developer, Philosophy & Education */}
      <AboutSection onOpenResume={() => setIsResumeOpen(true)} />

      {/* 03: Technical Stack & Interactive Architecture CLI */}
      <DesignLab />

      {/* 04: Development Timeline & Milestones */}
      <ExperienceTimeline />

      {/* 05: Direct Contact Terminal & Dispatcher */}
      <ContactSection />

      {/* Fixed Interactive HUD Bottom Bar with Live IST Clock, Cursor Tracker, & Theme Switcher */}
      <HudFooter />

      {/* In-Depth Case Study Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Curriculum Vitae Modal */}
      {isResumeOpen && (
        <ResumeModal onClose={() => setIsResumeOpen(false)} />
      )}
    </main>
  );
}
