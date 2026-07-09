import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Github, FileText, ArrowUpRight, Plus, Trash2, Tag, Calendar, Image, ArrowLeft, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project } from '../types';
import ImageUpload from '../components/ImageUpload';

export default function Projects() {
  const { data, setData, isEditing } = usePortfolio();
  const [newTagVal, setNewTagVal] = useState<{ [projId: string]: string }>({});
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedProjects, setExpandedProjects] = useState<{ [projId: string]: boolean }>({});

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const cards = carouselRef.current.querySelectorAll('[data-project-card]');
      const card = cards[index] as HTMLElement;
      if (card) {
        const containerWidth = carouselRef.current.clientWidth;
        const cardWidth = card.clientWidth;
        // Center the card in the viewport
        const scrollToX = card.offsetLeft - (containerWidth - cardWidth) / 2;
        carouselRef.current.scrollTo({ left: scrollToX, behavior: 'smooth' });
        setActiveIndex(index);
      }
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    const nextIndex = direction === 'left' ? activeIndex - 1 : activeIndex + 1;
    if (nextIndex >= 0 && nextIndex < data.projects.length) {
      scrollToIndex(nextIndex);
    }
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      const progress = scrollWidth > clientWidth ? scrollLeft / (scrollWidth - clientWidth) : 0;
      setScrollProgress(progress);

      // Find the card closest to the horizontal center of the carousel
      const cards = carouselRef.current.querySelectorAll('[data-project-card]');
      let closestIndex = activeIndex;
      let minDistance = Infinity;

      const containerCenter = scrollLeft + clientWidth / 2;

      cards.forEach((cardNode, idx) => {
        const card = cardNode as HTMLElement;
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const distance = Math.abs(cardCenter - containerCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = idx;
        }
      });

      if (closestIndex !== activeIndex && closestIndex >= 0 && closestIndex < data.projects.length) {
        setActiveIndex(closestIndex);
      }
    }
  };

  const updateProjectProp = (index: number, key: keyof Project, val: any) => {
    const updated = [...data.projects];
    updated[index] = { ...updated[index], [key]: val };
    setData(prev => ({ ...prev, projects: updated }));
  };

  const addProject = () => {
    const nextId = String(data.projects.length + 1).padStart(2, '0');
    const newProj: Project = {
      id: nextId,
      title: "New Research Topic or Theory",
      subtitle: "Coursework / Laboratory Paper",
      summary: "An abstract detailing your exploration, archival research run, simulation framework details, and physical models verified during academic investigations.",
      tags: ["Astrophysics", "Theory", "MATLAB"],
      year: "2026",
      img: "https://images.unsplash.com/photo-1771419544432-a9a0bae77588?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxyYWRpbyUyMHRlbGVzY29wZSUyMG9ic2VydmF0b3J5JTIwbmlnaHR8ZW58MHx8fHwxNzgxODg2Nzg5fDA&ixlib=rb-4.1.0&q=85"
    };

    setData(prev => ({ ...prev, projects: [...prev.projects, newProj] }));
  };

  const deleteProject = (index: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const filtered = data.projects.filter((_, idx) => idx !== index);
      // Re-index IDs so they remain continuous (e.g. 01, 02, 03, etc.)
      const reindexed = filtered.map((p, i) => ({
        ...p,
        id: String(i + 1).padStart(2, '0')
      }));
      setData(prev => ({ ...prev, projects: reindexed }));
    }
  };

  const removeProjectTag = (projectIndex: number, tagIndex: number) => {
    const updatedProj = { ...data.projects[projectIndex] };
    updatedProj.tags = updatedProj.tags.filter((_, idx) => idx !== tagIndex);
    
    const updatedList = [...data.projects];
    updatedList[projectIndex] = updatedProj;
    setData(prev => ({ ...prev, projects: updatedList }));
  };

  const addProjectTag = (projectIndex: number, tagVal: string) => {
    if (!tagVal.trim()) return;
    const updatedProj = { ...data.projects[projectIndex] };
    if (!updatedProj.tags.includes(tagVal.trim())) {
      updatedProj.tags = [...updatedProj.tags, tagVal.trim()];
    }
    
    const updatedList = [...data.projects];
    updatedList[projectIndex] = updatedProj;
    setData(prev => ({ ...prev, projects: updatedList }));
    
    // reset input
    setNewTagVal(prev => ({ ...prev, [updatedProj.id]: '' }));
  };

  return (
    <div data-testid="projects-page">
      {/* Header section */}
      <section className="relative pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-mono-tag text-[10px] tracking-[0.3em] uppercase text-cyan-400/90"
              >
                ✦ Section · Projects
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif-display text-6xl sm:text-7xl md:text-8xl leading-[0.95] tracking-tight font-light text-slate-100 mt-6"
              >
                Projects
                <br />
                <span className="italic text-slate-400">I’ve enjoyed</span>
                <span className="text-cyan-400">.</span>
              </motion.h1>
            </div>

            {isEditing && (
              <motion.button
                initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                onClick={addProject}
                className="font-mono-tag text-[10px] tracking-widest text-[#050505] bg-white hover:bg-zinc-200 px-4 py-2 uppercase flex items-center gap-2 transition h-fit self-start sm:self-end"
              >
                <Plus size={12} />
                Add New Project
              </motion.button>
            )}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-slate-400 mt-8 max-w-2xl text-lg leading-relaxed font-serif-display italic"
          >
            A small, honest archive of things I’ve worked on, often slowly, sometimes with friends, mostly out of curiosity.
          </motion.p>
        </div>
      </section>

      {/* Custom Styles to Hide Scrollbars */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      {/* Projects Carousel View */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        {/* Navigation & Info Bar */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 mb-8 flex items-end justify-between">
          <div className="flex flex-col gap-1">
            <span className="font-mono-tag text-[9px] uppercase tracking-[0.3em] text-cyan-400/90 font-medium">
              ✦ Interactive Archive
            </span>
            <span className="text-zinc-500 font-sans text-xs font-light">
              Swipe or use controls to browse research & code
            </span>
          </div>

          {/* Navigation Circle Arrows */}
          <div className="flex items-center gap-2.5 z-10">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-white/10 hover:border-cyan-400/30 bg-slate-950/40 hover:bg-slate-900/60 flex items-center justify-center text-zinc-400 hover:text-cyan-300 transition-all duration-300 backdrop-blur-sm group/btn active:scale-95 shadow-lg"
              aria-label="Previous Project"
            >
              <ArrowLeft size={16} className="transform group-hover/btn:-translate-x-0.5 transition-transform duration-300" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-white/10 hover:border-cyan-400/30 bg-slate-950/40 hover:bg-slate-900/60 flex items-center justify-center text-zinc-400 hover:text-cyan-300 transition-all duration-300 backdrop-blur-sm group/btn active:scale-95 shadow-lg"
              aria-label="Next Project"
            >
              <ArrowRight size={16} className="transform group-hover/btn:translate-x-0.5 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Frame */}
        <div className="relative">
          {/* Subtle horizontal gradient masks for cinematic fade out on borders */}
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none z-10" />

          {/* Scrollable container */}
          <div 
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory px-6 sm:px-8 md:px-12 pb-12 pt-4 scroll-smooth no-scrollbar"
            style={{ 
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {data.projects.map((p, i) => {
              const isActive = i === activeIndex;
              return (
                <motion.article
                  key={p.id}
                  data-project-card
                  onClick={() => scrollToIndex(i)}
                  initial={{ opacity: 0, x: 45, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.85, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  data-testid={`project-card-${p.id}`}
                  className={`snap-center shrink-0 w-[290px] sm:w-[380px] md:w-[410px] lg:w-[440px] rounded-[28px] overflow-hidden flex flex-col p-5 sm:p-6 transition-all duration-700 relative cursor-pointer ${
                    isActive
                      ? "bg-[#111318]/95 border border-cyan-400/35 shadow-[0_25px_60px_-10px_rgba(34,211,238,0.08)] scale-100 md:scale-[1.04] z-10 opacity-100 filter-none blur-none"
                      : "bg-[#0c0d10]/50 border border-white/5 shadow-none scale-90 md:scale-[0.92] z-0 opacity-40 grayscale blur-[1.5px] hover:opacity-60"
                  } group`}
                >
                  {/* Left active glowing strip */}
                  <div className={`absolute left-0 top-6 bottom-6 w-0 transition-all duration-300 z-10 ${isActive ? "group-hover:w-[2px] bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]" : ""}`} />

                  {isEditing && (
                    <div className="absolute top-4 right-4 z-30">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteProject(i);
                        }}
                        className="bg-rose-950/80 text-rose-300 hover:bg-rose-900 border border-rose-500/30 font-mono-tag text-[8px] uppercase tracking-wider px-2.5 py-1.5 flex items-center gap-1.5 transition rounded-xl"
                        title="Delete Project Card"
                      >
                        <Trash2 size={10} />
                        Delete
                      </button>
                    </div>
                  )}

                  {/* Top Illustration Wrapper */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] bg-zinc-950 border border-white/5 mb-5 group/img shrink-0">
                    <img
                      src={p.img}
                      alt={p.title}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isActive
                          ? "grayscale-[20%] group-hover:grayscale-0 brightness-[75%] group-hover:brightness-[95%] group-hover:scale-105"
                          : "grayscale brightness-[50%]"
                      }`}
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Overlay Badges */}
                    <div className="absolute top-3.5 left-3.5 bg-slate-950/80 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full text-[9px] font-mono-tag text-zinc-400 font-semibold tracking-wider">
                      {p.year}
                    </div>
                    <div className="absolute top-3.5 right-3.5 bg-slate-950/80 backdrop-blur-md border border-white/10 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-mono-tag text-cyan-400 font-bold shadow-md">
                      {p.id}
                    </div>

                    {isEditing && (
                      <div 
                        className="absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col justify-center p-4 overflow-y-auto space-y-2.5 z-20"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ImageUpload
                          value={p.img}
                          onChange={(base64OrUrl) => updateProjectProp(i, 'img', base64OrUrl)}
                          placeholder="Project Illustration"
                        />
                        <div className="pt-2 border-t border-white/10">
                          <label className="block text-[8px] font-mono-tag text-zinc-500 uppercase tracking-widest mb-1 font-semibold">Or direct web link</label>
                          <input
                            type="text"
                            value={p.img.startsWith('data:') ? '' : p.img}
                            onChange={(e) => updateProjectProp(i, 'img', e.target.value)}
                            className="font-mono-tag text-[8px] tracking-tight bg-zinc-900 text-zinc-300 border border-white/10 p-1.5 focus:outline-none w-full rounded"
                            placeholder="Paste direct URL..."
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Info and action segment */}
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      {isEditing ? (
                        <div className="space-y-2 mb-3" onClick={(e) => e.stopPropagation()}>
                          <div>
                            <label className="block text-[8px] font-mono-tag text-zinc-500 uppercase tracking-widest mb-0.5">Project Title</label>
                            <input
                              type="text"
                              value={p.title}
                              onChange={(e) => updateProjectProp(i, 'title', e.target.value)}
                              className="font-serif-display text-base text-white bg-zinc-900/60 border border-dashed border-white/20 p-1.5 w-full focus:outline-none rounded"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] font-mono-tag text-zinc-500 uppercase tracking-widest mb-0.5">Subtitle / Category</label>
                            <input
                              type="text"
                              value={p.subtitle}
                              onChange={(e) => updateProjectProp(i, 'subtitle', e.target.value)}
                              className="font-mono-tag text-[10px] tracking-wider uppercase text-zinc-300 bg-zinc-900/60 border border-dashed border-white/20 p-1 w-full focus:outline-none rounded"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] font-mono-tag text-zinc-500 uppercase tracking-widest mb-0.5">Year</label>
                            <input
                              type="text"
                              value={p.year}
                              onChange={(e) => updateProjectProp(i, 'year', e.target.value)}
                              className="font-mono-tag text-[10px] text-zinc-300 bg-zinc-900/60 border border-dashed border-white/20 p-1 w-full focus:outline-none rounded"
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <span className={`font-mono-tag text-[10px] tracking-[0.2em] uppercase mb-2 block font-medium transition-colors duration-300 ${isActive ? "text-cyan-400/85" : "text-zinc-500"}`}>
                            {p.subtitle}
                          </span>
                          <h3 className="font-serif-display text-xl sm:text-2xl text-slate-100 font-light tracking-tight group-hover:text-cyan-300 transition-colors duration-300 leading-snug">
                            {p.title}
                          </h3>
                        </>
                      )}

                      {isEditing ? (
                        <div className="my-3" onClick={(e) => e.stopPropagation()}>
                          <label className="block text-[8px] font-mono-tag text-zinc-500 uppercase tracking-widest mb-0.5 font-semibold">Summary / Abstract</label>
                          <textarea
                            value={p.summary}
                            onChange={(e) => updateProjectProp(i, 'summary', e.target.value)}
                            rows={3}
                            className="text-slate-300 text-[11px] bg-zinc-900/60 border border-dashed border-white/20 p-2 w-full focus:outline-none leading-relaxed rounded"
                          />
                        </div>
                      ) : (
                        <div className="relative mt-3.5">
                          <motion.div
                            initial={false}
                            animate={{ 
                              height: (p.summary && p.summary.length > 125 && !expandedProjects[p.id]) ? 72 : "auto"
                            }}
                            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                            className="overflow-hidden"
                          >
                            <p className={`text-slate-400 leading-relaxed text-[13px] font-light group-hover:text-slate-300 transition-colors duration-300 ${
                              expandedProjects[p.id] ? "" : "line-clamp-3"
                            }`}>
                              {p.summary}
                            </p>
                          </motion.div>
                          {p.summary && p.summary.length > 125 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedProjects(prev => ({ ...prev, [p.id]: !prev[p.id] }));
                              }}
                              className="mt-2 text-cyan-400 hover:text-cyan-300 text-[10px] font-mono-tag uppercase tracking-wider flex items-center gap-1 transition-colors font-medium cursor-pointer"
                            >
                              <span>{expandedProjects[p.id] ? "Show Less" : "Read More"}</span>
                              <motion.div
                                animate={{ rotate: expandedProjects[p.id] ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <ChevronDown size={12} />
                              </motion.div>
                            </button>
                          )}
                        </div>
                      )}

                      {/* Dynamic Tags */}
                      <div className="mt-4">
                        <div className="flex flex-wrap gap-1.5 items-center">
                          {p.tags.map((t, tagIdx) => (
                            <span
                              key={tagIdx}
                              className="font-mono-tag text-[9px] tracking-wider uppercase text-zinc-400 bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 hover:text-cyan-300 transition-all duration-300 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1"
                            >
                              {t}
                              {isEditing && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeProjectTag(i, tagIdx);
                                  }}
                                  className="text-rose-400 hover:text-white transition font-bold"
                                  title="Delete tag"
                                >
                                  ×
                                </button>
                              )}
                            </span>
                          ))}

                          {isEditing && (
                            <div className="inline-flex gap-1" onClick={(e) => e.stopPropagation()}>
                              <input
                                type="text"
                                placeholder="Tag"
                                value={newTagVal[p.id] || ''}
                                onChange={(e) => setNewTagVal(prev => ({ ...prev, [p.id]: e.target.value }))}
                                onKeyDown={(e) => e.key === 'Enter' && addProjectTag(i, newTagVal[p.id] || '')}
                                className="font-mono-tag text-[8px] uppercase tracking-wider bg-zinc-900 border border-white/20 px-1.5 py-0.5 text-white focus:outline-none w-14 rounded"
                              />
                              <button
                                onClick={() => addProjectTag(i, newTagVal[p.id] || '')}
                                className="bg-white text-black text-[9px] px-1 rounded hover:bg-zinc-200 transition"
                              >
                                +
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Links Row */}
                    <div className="mt-5 pt-4 border-t border-white/5">
                      <div className="flex flex-wrap items-center gap-4">
                        {p.githubUrl ? (
                          <a
                            href={p.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid={`project-github-${p.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="group/btn inline-flex items-center gap-1.5 text-zinc-400 hover:text-cyan-300 transition-colors duration-300"
                          >
                            <Github size={12} strokeWidth={1.5} className="group-hover/btn:scale-110 transition-transform duration-300 text-cyan-400/80" />
                            <span className="font-mono-tag text-[9px] tracking-widest uppercase border-b border-transparent group-hover/btn:border-cyan-400/40 pb-0.5 transition-all duration-300">
                              Code
                            </span>
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-zinc-600 cursor-not-allowed">
                            <Github size={12} strokeWidth={1.5} />
                            <span className="font-mono-tag text-[9px] tracking-widest uppercase pb-0.5">
                              Code
                            </span>
                          </span>
                        )}
                        
                        {p.paperUrl ? (
                          <a
                            href={p.paperUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid={`project-paper-${p.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="group/btn inline-flex items-center gap-1.5 text-zinc-400 hover:text-cyan-300 transition-colors duration-300"
                          >
                            <FileText size={12} strokeWidth={1.5} className="group-hover/btn:scale-110 transition-transform duration-300 text-cyan-400/80" />
                            <span className="font-mono-tag text-[9px] tracking-widest uppercase border-b border-transparent group-hover/btn:border-cyan-400/40 pb-0.5 transition-all duration-300">
                              Notes
                            </span>
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-zinc-600 cursor-not-allowed">
                            <FileText size={12} strokeWidth={1.5} />
                            <span className="font-mono-tag text-[9px] tracking-widest uppercase pb-0.5">
                              Notes
                            </span>
                          </span>
                        )}

                        {p.viewUrl ? (
                          <a
                            href={p.viewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid={`project-link-${p.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="group/btn inline-flex items-center gap-1.5 text-zinc-400 hover:text-cyan-300 transition-colors duration-300"
                          >
                            <ArrowUpRight size={12} strokeWidth={1.5} className="group-hover/btn:scale-110 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300 text-cyan-400/80" />
                            <span className="font-mono-tag text-[9px] tracking-widest uppercase border-b border-transparent group-hover/btn:border-cyan-400/40 pb-0.5 transition-all duration-300">
                              View
                            </span>
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-zinc-600 cursor-not-allowed">
                            <ArrowUpRight size={12} strokeWidth={1.5} />
                            <span className="font-mono-tag text-[9px] tracking-widest uppercase pb-0.5">
                              View
                            </span>
                          </span>
                        )}
                      </div>

                      {isEditing && (
                        <div className="mt-3.5 p-3 bg-zinc-950/60 border border-white/5 space-y-2 rounded-xl text-[9px]" onClick={(e) => e.stopPropagation()}>
                          <span className="block font-mono-tag text-zinc-500 uppercase tracking-widest font-semibold">Project Resource URLs</span>
                          <div className="space-y-1.5">
                            <div>
                              <span className="text-zinc-400 uppercase tracking-wider block mb-0.5">GitHub URL</span>
                              <input
                                type="text"
                                value={p.githubUrl || ""}
                                onChange={(e) => updateProjectProp(i, 'githubUrl', e.target.value)}
                                className="w-full bg-zinc-900 border border-white/10 px-2 py-1 text-zinc-300 focus:outline-none focus:border-cyan-400/45 rounded-lg text-[9px]"
                                placeholder="https://github.com/..."
                              />
                            </div>
                            <div>
                              <span className="text-zinc-400 uppercase tracking-wider block mb-0.5">Notes/Paper</span>
                              <input
                                type="text"
                                value={p.paperUrl || ""}
                                onChange={(e) => updateProjectProp(i, 'paperUrl', e.target.value)}
                                className="w-full bg-zinc-900 border border-white/10 px-2 py-1 text-zinc-300 focus:outline-none focus:border-cyan-400/45 rounded-lg text-[9px]"
                                placeholder="https://..."
                              />
                            </div>
                            <div>
                              <span className="text-zinc-400 uppercase tracking-wider block mb-0.5">Demo/Deployment</span>
                              <input
                                type="text"
                                value={p.viewUrl || ""}
                                onChange={(e) => updateProjectProp(i, 'viewUrl', e.target.value)}
                                className="w-full bg-zinc-900 border border-white/10 px-2 py-1 text-zinc-300 focus:outline-none focus:border-cyan-400/45 rounded-lg text-[9px]"
                                placeholder="https://..."
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* Dynamic Slate-Glowing Scroll Progress bar */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 mt-4 flex justify-center">
          <div className="h-[2px] bg-white/5 w-full max-w-sm rounded-full overflow-hidden relative">
            <motion.div 
              className="h-full bg-cyan-400/80 absolute left-0 top-0 shadow-[0_0_8px_rgba(34,211,238,0.5)]" 
              style={{ width: `${Math.max(8, scrollProgress * 100)}%` }}
              layoutId="scrollbar-progress"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
