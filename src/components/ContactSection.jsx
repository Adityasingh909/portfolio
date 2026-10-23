'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Github,
  Linkedin,
  Copy,
  Check,
  FileText,
  Send,
  MapPin,
  ArrowUpRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { playHudClick } from '../utils/audio';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [emailSender, setEmailSender] = useState('');
  const [subject, setSubject] = useState('Software Engineering Internship / Opportunity');
  const [message, setMessage] = useState('');
  
  // Submission status: 'idle' | 'sending' | 'success' | 'error'
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const targetEmail = 'adityasingh917023@gmail.com';
  const github = 'https://github.com/Adityasingh909';
  const linkedin = 'https://linkedin.com/in/adityasingh0981';
  const location = 'Gorakhpur / Ghaziabad, Uttar Pradesh, India';

  const handleCopyEmail = () => {
    playHudClick('blip');
    navigator.clipboard.writeText(targetEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    playHudClick('blip');
    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: emailSender.trim(),
          subject: subject.trim(),
          message: message.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        playHudClick('switch');
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to deliver transmission.');
      }
    } catch (err) {
      console.error('Submission failed:', err);
      setStatus('error');
      setErrorMessage('Network connection error. You can still email directly via Gmail below.');
    }
  };

  const openWebGmail = () => {
    playHudClick('blip');
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(message ? `From: ${name} (${emailSender})\n\n${message}` : '')}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  };

  const openNativeMail = () => {
    playHudClick('blip');
    const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(message ? `From: ${name} (${emailSender})\n\n${message}` : '')}`;
    window.location.href = mailtoUrl;
  };

  const handleReset = () => {
    setStatus('idle');
    setName('');
    setEmailSender('');
    setMessage('');
  };

  return (
    <section id="contact" className="bg-ink py-24 border-b border-white/[0.08] relative">
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
            <span className="hud-label text-accent font-bold text-sm">05</span>
            <div className="dash-h flex-1 opacity-20" />
            <span className="hud-label text-white/50">COMMUNICATION TERMINAL</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="hud-label text-accent block mb-2 font-mono">
                // DIRECT CONTACT CHANNEL
              </span>
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-white">
                GET IN <span className="text-accent underline decoration-accent/40">TOUCH.</span>
              </h2>
            </div>
            <p className="hud-label text-white/50 max-w-md text-left md:text-right text-[11px] leading-relaxed">
              Available for software engineering internships, technical collaborations, and full-stack development roles.
            </p>
          </div>
        </motion.div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Info, Location, Résumé */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-ink-card border border-white/[0.08] p-8 corner-bracket space-y-6">
              <span className="hud-label text-accent text-xs block font-mono">
                // PRIMARY INVITATION
              </span>

              <h3 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight leading-snug">
                Let's discuss software engineering opportunities.
              </h3>

              <p className="text-white/70 font-light text-sm leading-relaxed">
                Whether you have an internship opening, want to discuss a full-stack project, or talk about Data Structures & C++, my inbox is always open.
              </p>

              {/* Email Card with One-Click Copy */}
              <div className="p-4 bg-white/[0.03] border border-white/10 hover:border-accent/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="hud-label text-[10px] text-white/40">DIRECT EMAIL</span>
                  <button
                    onClick={handleCopyEmail}
                    className="hud-label text-[10px] text-accent hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">COPIED TO CLIPBOARD</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>COPY EMAIL</span>
                      </>
                    )}
                  </button>
                </div>
                <a
                  href={`mailto:${targetEmail}`}
                  className="text-white font-mono text-sm md:text-base font-bold hover:text-accent transition-colors break-all flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-accent shrink-0" />
                  <span>{targetEmail}</span>
                </a>
              </div>

              {/* Location Badge */}
              <div className="p-4 bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
                <MapPin className="w-4 h-4 text-accent shrink-0" />
                <div>
                  <span className="hud-label text-[9px] text-white/40 block">LOCATION</span>
                  <span className="text-white/80 font-mono text-xs">{location}</span>
                </div>
              </div>

              {/* Professional Profiles */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/[0.03] border border-white/10 hover:border-accent flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Github className="w-4 h-4 text-white/70 group-hover:text-accent transition-colors" />
                    <span className="hud-label text-[10px] text-white group-hover:text-accent">GITHUB</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-accent transition-colors" />
                </a>

                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/[0.03] border border-white/10 hover:border-accent flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin className="w-4 h-4 text-white/70 group-hover:text-accent transition-colors" />
                    <span className="hud-label text-[10px] text-white group-hover:text-accent">LINKEDIN</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-accent transition-colors" />
                </a>
              </div>

              {/* Resume Download CTA */}
              <div className="pt-2">
                <a
                  href="/resume.pdf"
                  download="Aditya_Singh_Resume.pdf"
                  className="w-full py-3.5 px-4 bg-accent text-ink font-bold hud-label text-xs flex items-center justify-center gap-2 hover:bg-white transition-all shadow-[0_0_20px_rgba(99,102,241,0.25)]"
                >
                  <FileText className="w-4 h-4" />
                  <span>DOWNLOAD VERIFIED RÉSUMÉ (PDF)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Functional Message Dispatcher */}
          <div className="lg:col-span-7 w-full">
            <div className="bg-ink-card border border-white/[0.08] p-8 corner-bracket shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="hud-label text-white/80 text-xs font-mono">
                    DISPATCH TRANSMITTER // DIRECT TO INBOX
                  </span>
                </div>
                <span className="hud-label text-[10px] text-emerald-400 font-mono">
                  SMTP PIPELINE ACTIVE
                </span>
              </div>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 text-center space-y-5"
                  >
                    <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/50 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-2xl font-display font-bold text-white tracking-tight">
                        Message Transmitted Successfully!
                      </h4>
                      <p className="text-white/70 text-sm max-w-md mx-auto leading-relaxed">
                        Your transmission has been delivered directly to <span className="text-white font-mono">{targetEmail}</span>. Aditya will review and respond shortly.
                      </p>
                    </div>
                    <div className="pt-4">
                      <button
                        onClick={handleReset}
                        className="px-6 py-2.5 bg-white/[0.05] border border-white/20 hover:border-accent text-white text-xs hud-label transition-colors cursor-pointer"
                      >
                        SEND ANOTHER MESSAGE
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form key="form" onSubmit={handleSubmit} className="space-y-4">
                    {/* Error Banner if any */}
                    {status === 'error' && (
                      <div className="p-4 bg-rose-500/10 border border-rose-500/30 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <span className="hud-label text-rose-400 text-[10px] font-bold block">
                            TRANSMISSION NOTICE
                          </span>
                          <p className="text-white/80 text-xs mt-0.5 leading-relaxed">
                            {errorMessage}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Sender Identity Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="hud-label text-[10px] text-white/60 block mb-1.5 font-mono">
                          YOUR NAME / ORGANIZATION *
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full bg-black/50 border border-white/10 focus:border-accent text-white px-4 py-2.5 text-sm font-mono outline-none transition-colors"
                          placeholder="e.g. John Doe / Tech Recruiter"
                        />
                      </div>

                      <div>
                        <label className="hud-label text-[10px] text-white/60 block mb-1.5 font-mono">
                          YOUR EMAIL ADDRESS *
                        </label>
                        <input
                          type="email"
                          value={emailSender}
                          onChange={(e) => setEmailSender(e.target.value)}
                          required
                          className="w-full bg-black/50 border border-white/10 focus:border-accent text-white px-4 py-2.5 text-sm font-mono outline-none transition-colors"
                          placeholder="e.g. john@company.com"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="hud-label text-[10px] text-white/60 block mb-1.5 font-mono">
                        COMMUNICATION SUBJECT *
                      </label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                        className="w-full bg-black/50 border border-white/10 focus:border-accent text-white px-4 py-2.5 text-sm font-mono outline-none transition-colors"
                        placeholder="Subject of inquiry..."
                      />
                    </div>

                    {/* Message Body */}
                    <div>
                      <label className="hud-label text-[10px] text-white/60 block mb-1.5 font-mono">
                        MESSAGE / ROLE DETAILS *
                      </label>
                      <textarea
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        className="w-full bg-black/50 border border-white/10 focus:border-accent text-white px-4 py-3 text-sm font-mono outline-none transition-colors leading-relaxed"
                        placeholder="Hello Aditya, we came across your full-stack LMS & Taskly projects and would like to connect regarding an internship opportunity..."
                      />
                    </div>

                    {/* Submit Row */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={openWebGmail}
                          className="px-3 py-1.5 bg-white/[0.03] border border-white/10 hover:border-accent text-white/70 hover:text-white hud-label text-[9px] flex items-center gap-1.5 transition-colors cursor-pointer"
                          title="Open directly in Web Gmail"
                        >
                          <ExternalLink className="w-3 h-3 text-red-400" />
                          <span>OPEN IN GMAIL (WEB)</span>
                        </button>

                        <button
                          type="button"
                          onClick={openNativeMail}
                          className="px-3 py-1.5 bg-white/[0.03] border border-white/10 hover:border-accent text-white/70 hover:text-white hud-label text-[9px] flex items-center gap-1.5 transition-colors cursor-pointer"
                          title="Open in default mail client"
                        >
                          <Mail className="w-3 h-3 text-accent" />
                          <span>MAILTO APP</span>
                        </button>
                      </div>

                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="w-full sm:w-auto px-7 py-3.5 bg-accent hover:bg-white text-ink font-bold hud-label text-xs flex items-center justify-center gap-2 transition-all whitespace-nowrap cursor-pointer shadow-[0_0_20px_rgba(99,102,241,0.3)] disabled:opacity-50"
                      >
                        {status === 'sending' ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>TRANSMITTING DISPATCH...</span>
                          </>
                        ) : (
                          <>
                            <span>SEND MESSAGE DIRECTLY</span>
                            <Send className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
