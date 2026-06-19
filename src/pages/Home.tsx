import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowUpRight, Atom, Orbit, Telescope, Plus, Trash2, Image, Download } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

// Animation variants matching elegant design preset
const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24
  },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

const getInterestIconByLabel = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes('quant') || l.includes('mechan') || l.includes('phys')) return Atom;
  if (l.includes('grav') || l.includes('cosm') || l.includes('orbit')) return Orbit;
  if (l.includes('astro') || l.includes('teles') || l.includes('radio') || l.includes('star')) return Telescope;
  return Sparkles;
};

export default function Home() {
  const { data, setData, isEditing } = usePortfolio();
  const [newInterest, setNewInterest] = useState('');

  // Update helper for root properties
  const updateProp = (key: keyof typeof data, val: any) => {
    setData((prev) => ({ ...prev, [key]: val }));
  };

  // Helper for array modifications
  const updateAboutPara = (index: number, val: string) => {
    const updated = [...data.aboutParas];
    updated[index] = val;
    updateProp('aboutParas', updated);
  };

  const deleteAboutPara = (index: number) => {
    const updated = data.aboutParas.filter((_, i) => i !== index);
    updateProp('aboutParas', updated);
  };

  const addAboutPara = () => {
    updateProp('aboutParas', [...data.aboutParas, "New paragraph detailing your interest or coursework."]);
  };

  const addInterest = () => {
    if (newInterest.trim()) {
      updateProp('interests', [...data.interests, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const deleteInterest = (index: number) => {
    updateProp('interests', data.interests.filter((_, i) => i !== index));
  };

  return (
    <div data-testid="home-page" className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 w-full grid grid-cols-1 md:grid-cols-12 gap-10 items-center py-20">
          
          <div className="md:col-span-7 relative z-10">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
              className="font-mono-tag text-[11px] tracking-[0.3em] uppercase text-cyan-400/90"
            >
              ✦ Notes from the Noise · est. {new Date().getFullYear()}
            </motion.p>
            
            {isEditing ? (
              <div className="mt-6 space-y-4">
                <label className="block text-[10px] font-mono-tag text-zinc-500 uppercase tracking-widest">Edit Full Name</label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => updateProp('name', e.target.value)}
                  className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-white bg-zinc-900/60 border border-dashed border-white/20 hover:border-white/40 focus:border-white rounded px-3 py-2 w-full focus:outline-none"
                  placeholder="Your Name"
                />
              </div>
            ) : (
              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={1}
                className="font-serif-display text-6xl sm:text-7xl md:text-8xl lg:text-[8rem] leading-[0.95] tracking-tight font-light text-slate-100 mt-6"
              >
                {data.name.split(' ').map((word, idx, arr) => (
                  <span key={idx} className={`block ${idx > 0 ? 'italic text-slate-200/95 font-light' : ''}`}>
                    {word}
                    {idx === arr.length - 1 && <span className="text-cyan-400 inline-block not-italic">.</span>}
                  </span>
                ))}
              </motion.h1>
            )}

            {isEditing ? (
              <div className="mt-6 space-y-2">
                <label className="block text-[10px] font-mono-tag text-zinc-500 uppercase tracking-widest">Edit Personal Tagline</label>
                <input
                  type="text"
                  value={data.tagline}
                  onChange={(e) => updateProp('tagline', e.target.value)}
                  className="font-serif-display italic text-lg sm:text-xl text-slate-300 bg-zinc-900/60 border border-dashed border-white/20 hover:border-white/40 focus:border-white rounded px-3 py-1.5 w-full focus:outline-none"
                  placeholder="Your tagline"
                />
              </div>
            ) : (
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={2}
                className="font-serif-display italic text-xl sm:text-2xl text-slate-400 mt-8 max-w-xl"
              >
                {data.tagline}
              </motion.p>
            )}

            {isEditing ? (
              <div className="mt-6 space-y-2">
                <label className="block text-[10px] font-mono-tag text-zinc-500 uppercase tracking-widest">Edit Brief Description</label>
                <textarea
                  value={data.description}
                  onChange={(e) => updateProp('description', e.target.value)}
                  rows={3}
                  className="text-slate-300 bg-zinc-900/60 border border-dashed border-white/20 hover:border-white/40 focus:border-white rounded p-3 w-full focus:outline-none text-sm leading-relaxed"
                  placeholder="Welcome message or intro statement"
                />
              </div>
            ) : (
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={3}
                className="text-slate-400 mt-6 max-w-xl leading-relaxed text-base sm:text-lg"
              >
                {data.description}
              </motion.p>
            )}

            {isEditing && (
              <div className="mt-6 space-y-2">
                <label className="block text-[10px] font-mono-tag text-zinc-500 uppercase tracking-widest">Edit CV Link (Google Drive / PDF)</label>
                <input
                  type="text"
                  value={data.cvUrl || ""}
                  onChange={(e) => updateProp('cvUrl', e.target.value)}
                  className="text-slate-300 bg-zinc-900/60 border border-dashed border-white/20 hover:border-white/40 focus:border-white rounded px-3 py-1.5 w-full focus:outline-none text-xs leading-relaxed font-mono"
                  placeholder="https://drive.google.com/..."
                />
              </div>
            )}

            {/* CTA Buttons (CV & Explore Projects) */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={4}
              className="mt-10 flex flex-wrap items-center gap-6"
            >
              <a
                href={data.cvUrl || "https://drive.google.com/file/d/1crz5MkCDHv3n_mytLDIJXtR_lhAFKBnA/view?usp=sharing"}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-cyan-400/30 hover:text-cyan-300 text-zinc-300 font-mono text-[10px] tracking-[0.25em] uppercase bg-black/40 hover:bg-zinc-950/60 transition-all duration-300"
              >
                <Download size={13} strokeWidth={1.5} className="group-hover:scale-110 group-hover:translate-y-0.5 transition-transform duration-300 text-cyan-400" />
                Curriculum Vitae
              </a>
              
              <Link
                to="/projects"
                className="group inline-flex items-center gap-1.5 text-zinc-400 hover:text-cyan-300 font-mono text-[10px] tracking-[0.25em] uppercase transition-colors duration-300"
              >
                Explore Projects
                <ArrowUpRight size={13} strokeWidth={1.5} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 text-cyan-400" />
              </Link>
            </motion.div>
          </div>

          {/* Hero Side Column (Universe Visual) */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden border border-white/10 bg-slate-950/20 backdrop-blur-sm">
              <img
                src="https://images.pexels.com/photos/14464685/pexels-photo-14464685.jpeg"
                alt="A lone figure beneath the Milky Way"
                data-testid="hero-image"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: "saturate(0.85) brightness(0.85)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent" />
              
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <p className="font-mono-tag text-[9px] tracking-[0.3em] uppercase text-zinc-400">
                    Frame · 001
                  </p>
                  <p className="font-serif-display italic text-slate-200 text-sm mt-1">
                    Looking up, looking in.
                  </p>
                </div>
                <p className="font-mono-tag text-[9px] tracking-[0.2em] text-slate-500">
                  {data.coordinates || '18°N · 73°E'}
                </p>
              </div>
            </div>

            <div className="hidden md:flex absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 origin-left">
              <p className="font-mono-tag text-[10px] tracking-[0.4em] uppercase text-slate-600 whitespace-nowrap">
                RA 05h 35m · DEC −05° 27′ · M42 Orion Nebula
              </p>
            </div>
          </motion.div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2">
          <span className="font-mono-tag text-[9px] tracking-[0.3em] uppercase text-slate-600">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {/* About Section */}
      <section className="relative py-24 sm:py-32 border-t border-white/10" id="about">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          
          <div className="md:col-span-4">
            <p className="font-mono-tag text-[10px] tracking-[0.3em] uppercase text-cyan-400/90">
              ✦ 001 / About
            </p>
            <h2 className="font-serif-display text-5xl sm:text-6xl text-slate-100 mt-6 font-light tracking-tight">
              About
              <br />
              <span className="italic text-slate-400">me</span>
            </h2>

            {/* Editable micro interests indicators */}
            <div className="mt-10 space-y-4">
              <span className="block text-[9px] font-mono-tag uppercase tracking-[0.2em] text-zinc-500">Interests</span>
              
              <div className="space-y-3">
                {data.interests.map((label, idx) => {
                  const Icon = getInterestIconByLabel(label);
                  return (
                    <div
                      key={idx}
                      data-testid={`interest-${label.toLowerCase().replace(/\s+/g, "-")}`}
                      className="flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={14} className="text-cyan-400/80" />
                        <span className="font-mono-tag text-xs tracking-[0.2em] uppercase text-slate-400 group-hover:text-cyan-300 transition-colors">
                          {label}
                        </span>
                      </div>
                      
                      {isEditing && (
                        <button
                          onClick={() => deleteInterest(idx)}
                          className="text-zinc-600 hover:text-rose-400 p-1 transition"
                          title="Delete interest"
                        >
                          <Trash2 size={11} />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {isEditing && (
                <div className="mt-4 pt-4 border-t border-white/5 flex gap-2">
                  <input
                    type="text"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addInterest()}
                    placeholder="New Interest..."
                    className="bg-zinc-900 border border-white/15 px-2.5 py-1 text-xs text-white rounded focus:outline-none w-full"
                  />
                  <button
                    onClick={addInterest}
                    className="bg-white text-black p-1 hover:bg-zinc-200 transition"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-8 md:pl-10 border-l border-white/5">
            {isEditing && (
              <div className="mb-4 flex justify-end">
                <button
                  onClick={addAboutPara}
                  className="font-mono-tag text-[9px] tracking-widest text-[#050505] bg-white hover:bg-zinc-200 px-3 py-1.5 uppercase flex items-center gap-1.5 transition"
                >
                  <Plus size={10} /> Add Paragraph
                </button>
              </div>
            )}

            <div className="space-y-8">
              {data.aboutParas.map((p, i) => (
                <div key={i} className="group/para relative">
                  {isEditing ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono-tag text-zinc-500 uppercase">Paragraph {i + 1}</span>
                        <button
                          onClick={() => deleteAboutPara(i)}
                          className="text-rose-400 hover:text-rose-300 text-[10px] font-mono-tag uppercase flex items-center gap-1"
                        >
                          <Trash2 size={11} /> Delete
                        </button>
                      </div>
                      <textarea
                        value={p}
                        onChange={(e) => updateAboutPara(i, e.target.value)}
                        rows={4}
                        className="text-slate-300 bg-zinc-900/60 border border-dashed border-white/20 hover:border-white/40 focus:border-white rounded p-3 w-full focus:outline-none text-base leading-relaxed"
                      />
                    </div>
                  ) : (
                    <motion.p
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      className={`text-slate-300 leading-[1.85] ${
                        i === 0
                          ? "text-lg sm:text-xl font-serif-display italic text-slate-200"
                          : "text-base sm:text-lg"
                      }`}
                    >
                      {p}
                    </motion.p>
                  )}
                </div>
              ))}
            </div>

            {/* Micro Tags */}
            <div className="mt-12 pt-6 border-t border-white/5">
              <span className="block text-[9px] font-mono-tag uppercase tracking-[0.2em] text-zinc-500 mb-3">Key Associations</span>
              <div className="flex flex-wrap gap-3">
                {["Science Club", "Mimamsa", "Kho-Kho", "IISER Pune"].map((t) => (
                  <span
                    key={t}
                    data-testid={`tag-${t.toLowerCase().replace(/\s+/g, "-")}`}
                    className="font-mono-tag text-[10px] tracking-[0.25em] uppercase text-slate-400 border border-white/10 hover:border-cyan-500/30 hover:text-cyan-300 transition-colors duration-300 px-3 py-1.5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Awards & Scholarships Section */}
      <section className="relative py-24 sm:py-32 border-t border-white/10 bg-zinc-950/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4">
            <p className="font-mono-tag text-[10px] tracking-[0.3em] uppercase text-cyan-400/90">
              ✦ Recognition
            </p>
            <h2 className="font-serif-display text-5xl sm:text-6xl text-slate-100 mt-6 font-light tracking-tight">
              Awards &
              <br />
              <span className="italic text-slate-400">Scholarships</span>
            </h2>
            <p className="text-slate-400 text-sm mt-5 leading-relaxed max-w-xs">
              Exceptional recognitions and support systems awarded throughout my undergraduate journey, supporting and encouraging active scientific studies and research potential.
            </p>
          </div>

          <div className="md:col-span-8 md:pl-10 border-l border-white/5 space-y-12 animate-pulse-subtle">
            {[
              {
                title: "INSPIRE - DST Scholarship",
                date: "August 2024 - present",
                sub: "Department of Science and Technology, Government of India",
                description: "Awarded by the Department of Science and Technology in recognition of academic excellence and potential for pursuing a career in scientific research."
              },
              {
                title: "Reliance Foundation Undergraduate Scholarship",
                date: "August 2024 - present",
                sub: "Reliance Foundation",
                description: "Awarded by the Reliance Foundation to support undergraduate studies, recognising academic achievement, leadership potential, and commitment to personal and professional growth."
              }
            ].map((award, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-white/5 pb-2 mb-3">
                  <h3 className="font-serif-display text-2xl font-light text-slate-200 group-hover:text-cyan-300 transition-colors duration-300">
                    {award.title}
                  </h3>
                  <span className="font-mono-tag text-[9px] tracking-widest text-[#050505] bg-cyan-400/90 px-2.5 py-0.5 uppercase whitespace-nowrap">
                    {award.date}
                  </span>
                </div>
                <p className="text-zinc-500 text-[10px] leading-relaxed mb-4 font-mono-tag tracking-wider uppercase">
                  {award.sub}
                </p>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                  {award.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trajectories Section */}
      <section className="relative py-24 sm:py-32 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
            <div className="md:col-span-5">
              <p className="font-mono-tag text-[10px] tracking-[0.3em] uppercase text-cyan-400/90">
                ✦ 002 / Explore
              </p>
              <h2 className="font-serif-display text-5xl sm:text-6xl text-slate-100 mt-6 font-light tracking-tight">
                Three
                <br />
                <span className="italic text-slate-400">trajectories.</span>
              </h2>
            </div>
            <div className="md:col-span-7 flex items-end">
              <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-lg">
                Projects I’ve been tinkering with, what life at IISER Pune has looked like, and the school days that quietly set the rest in motion.
              </p>
            </div>
          </div>

          {/* Three columns grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {[
              {
                to: "/projects",
                label: "Projects I’ve Enjoyed",
                tag: "01 · Work",
                desc: "Selected explorations across astrophysics and quantum mechanics.",
                img: "https://images.unsplash.com/photo-1771419544432-a9a0bae77588?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxyYWRpbyUyMHRlbGVzY29wZSUyMG9ic2VydmF0b3J5JTIwbmlnaHR8ZW58MHx8fHwxNzgxODg2Nzg5fDA&ixlib=rb-4.1.0&q=85",
                testId: "card-projects"
              },
              {
                to: "/iiser",
                label: "Life at IISER Pune",
                tag: "02 · Place",
                desc: "Clubs, courses, conversations and quiet chapters.",
                img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Front_view_of_main_building%2C_IISER_Pune.jpg/1280px-Front_view_of_main_building%2C_IISER_Pune.jpg",
                testId: "card-iiser"
              },
              {
                to: "/school",
                label: "A bit about school days",
                tag: "03 · Origin",
                desc: "Where the curiosity started, slowly and stubbornly.",
                img: "https://images.pexels.com/photos/23522893/pexels-photo-23522893.png",
                testId: "card-school"
              }
            ].map((c, i) => (
              <motion.div
                key={c.to}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="h-full"
              >
                <Link
                  to={c.to}
                  data-testid={c.testId}
                  className="group block bg-[#050505] hover:bg-[#0c0c11] hover:shadow-[0_0_25px_rgba(34,211,238,0.01)] transition-all duration-500 h-full relative overflow-hidden"
                >
                  {/* Left glowing neon accent */}
                  <div className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-[3px] bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)] transition-all duration-300 z-10" />

                  <div className="aspect-[5/4] overflow-hidden relative">
                    <img
                      src={c.img}
                      alt={c.label}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 grayscale-[40%] brightness-[70%] group-hover:grayscale-0 group-hover:brightness-[90%] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
                  </div>

                  <div className="p-8">
                    <p className="font-mono-tag text-[10px] tracking-[0.3em] uppercase text-zinc-400">
                      {c.tag}
                    </p>
                    <h3 className="font-serif-display text-2xl sm:text-3xl text-slate-100 mt-3 font-light group-hover:text-cyan-300 group-hover:translate-x-1.5 transition-all duration-300">
                      {c.label}
                    </h3>
                    <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                      {c.desc}
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-zinc-400 group-hover:text-cyan-400 transition-colors duration-300">
                      <span className="font-mono-tag text-[10px] tracking-[0.3em] uppercase border-b border-transparent group-hover:border-cyan-400/45 pb-0.5 transition-all duration-300">
                        Know more
                      </span>
                      <ArrowUpRight
                        size={14}
                        className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-cyan-400"
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
