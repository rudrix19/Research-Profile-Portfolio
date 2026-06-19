import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Github, FileText, ArrowUpRight, Plus, Trash2, Tag, Calendar, Image } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project } from '../types';
import ImageUpload from '../components/ImageUpload';

export default function Projects() {
  const { data, setData, isEditing } = usePortfolio();
  const [newTagVal, setNewTagVal] = useState<{ [projId: string]: string }>({});

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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="font-mono-tag text-[10px] tracking-[0.3em] uppercase text-cyan-400/90"
              >
                ✦ Section · Projects
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={addProject}
                className="font-mono-tag text-[10px] tracking-widest text-[#050505] bg-white hover:bg-zinc-200 px-4 py-2 uppercase flex items-center gap-2 transition h-fit self-start sm:self-end"
              >
                <Plus size={12} />
                Add New Project
              </motion.button>
            )}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-slate-400 mt-8 max-w-2xl text-lg leading-relaxed font-serif-display italic"
          >
            A small, honest archive of things I’ve worked on, often slowly, sometimes with friends, mostly out of curiosity.
          </motion.p>
        </div>
      </section>

      {/* Projects Grid List */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 space-y-px bg-white/10 border border-white/10">
          {data.projects.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.05 }}
              data-testid={`project-card-${p.id}`}
              className="group bg-[#050505] hover:bg-[#0c0c11] hover:shadow-[0_0_30px_rgba(34,211,238,0.02)] transition-all duration-500 relative overflow-hidden"
            >
              {/* Left active timeline neon accent */}
              <div className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-[3px] bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-all duration-300 z-10" />

              {isEditing && (
                <div className="absolute top-4 right-4 z-20">
                  <button
                    onClick={() => deleteProject(i)}
                    className="bg-rose-950/60 text-rose-300 hover:bg-rose-900 border border-rose-500/30 font-mono-tag text-[9px] uppercase tracking-wider px-2.5 py-1.5 flex items-center gap-1.5 transition"
                    title="Delete Project Card"
                  >
                    <Trash2 size={11} />
                    Delete Project
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 p-6 sm:p-8 md:p-12 items-center">
                
                {/* ID & Year Columns */}
                <div className="md:col-span-1 flex md:flex-col items-center md:items-start gap-4">
                  <div className="flex flex-col">
                    <span className="font-mono-tag text-[10px] tracking-[0.3em] text-zinc-400">
                      {p.id}
                    </span>
                    <span className="font-mono-tag text-[10px] tracking-[0.2em] text-slate-500 mt-1">
                      ID
                    </span>
                  </div>

                  <div className="flex flex-col">
                    {isEditing ? (
                      <input
                        type="text"
                        value={p.year}
                        onChange={(e) => updateProjectProp(i, 'year', e.target.value)}
                        className="font-mono-tag text-[10px] tracking-[0.2em] text-zinc-300 bg-zinc-900/60 border border-dashed border-white/20 p-1 w-20 focus:outline-none"
                      />
                    ) : (
                      <span className="font-mono-tag text-[10px] tracking-[0.2em] text-slate-600">
                        {p.year}
                      </span>
                    )}
                    <span className="font-mono-tag text-[9px] tracking-[0.2em] text-slate-700 mt-1 uppercase">
                      Year
                    </span>
                  </div>
                </div>

                {/* Info block */}
                <div className="md:col-span-7">
                  {isEditing ? (
                    <div className="space-y-3 mb-4">
                      <div>
                        <label className="block text-[8px] font-mono-tag text-zinc-500 uppercase tracking-widest mb-1">Project Title</label>
                        <input
                          type="text"
                          value={p.title}
                          onChange={(e) => updateProjectProp(i, 'title', e.target.value)}
                          className="font-serif-display text-2xl text-white bg-zinc-900/60 border border-dashed border-white/20 p-2 w-full focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] font-mono-tag text-zinc-500 uppercase tracking-widest mb-1">Subtitle / Category</label>
                        <input
                          type="text"
                          value={p.subtitle}
                          onChange={(e) => updateProjectProp(i, 'subtitle', e.target.value)}
                          className="font-mono-tag text-xs tracking-[0.2em] uppercase text-zinc-300 bg-zinc-900/60 border border-dashed border-white/20 p-1.5 w-full focus:outline-none"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-slate-100 font-light tracking-tight group-hover:text-white group-hover:translate-x-1.5 transition-all duration-300">
                        {p.title}
                      </h2>
                      <p className="font-mono-tag text-[11px] tracking-[0.25em] uppercase text-cyan-400/80 mt-3">
                        {p.subtitle}
                      </p>
                    </>
                  )}

                  {isEditing ? (
                    <div className="my-4">
                      <label className="block text-[8px] font-mono-tag text-zinc-500 uppercase tracking-widest mb-1 font-semibold">Summary / Abstract</label>
                      <textarea
                        value={p.summary}
                        onChange={(e) => updateProjectProp(i, 'summary', e.target.value)}
                        rows={3}
                        className="text-slate-300 text-sm bg-zinc-900/60 border border-dashed border-white/20 p-2.5 w-full focus:outline-none leading-relaxed"
                      />
                    </div>
                  ) : (
                    <p className="text-slate-400 mt-5 leading-relaxed text-base max-w-2xl whitespace-pre-line">
                      {p.summary}
                    </p>
                  )}

                  {/* Tags editing */}
                  <div className="mt-6">
                    <span className="block text-[8px] font-mono-tag text-zinc-600 uppercase tracking-widest mb-2 font-medium">Core Tags</span>
                    <div className="flex flex-wrap gap-2 items-center">
                      {p.tags.map((t, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="font-mono-tag text-[10px] tracking-[0.2em] uppercase text-zinc-400 border border-white/10 hover:border-cyan-500/30 hover:text-cyan-300 transition-colors duration-300 px-2.5 py-1 inline-flex items-center gap-1.5"
                        >
                          {t}
                          {isEditing && (
                            <button
                              onClick={() => removeProjectTag(i, tagIdx)}
                              className="text-rose-400 hover:text-white transition"
                              title="Delete tag"
                            >
                              ×
                            </button>
                          )}
                        </span>
                      ))}

                      {isEditing && (
                        <div className="inline-flex gap-1">
                          <input
                            type="text"
                            placeholder="Add tag"
                            value={newTagVal[p.id] || ''}
                            onChange={(e) => setNewTagVal(prev => ({ ...prev, [p.id]: e.target.value }))}
                            onKeyDown={(e) => e.key === 'Enter' && addProjectTag(i, newTagVal[p.id] || '')}
                            className="font-mono-tag text-[9px] uppercase tracking-wider bg-zinc-900 border border-white/20 px-2 py-1 text-white focus:outline-none w-18"
                          />
                          <button
                            onClick={() => addProjectTag(i, newTagVal[p.id] || '')}
                            className="bg-white text-black text-[9px] px-1 hover:bg-zinc-200 transition"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action buttons (dynamic standard links & interactive editor inputs) */}
                  <div className="mt-6 flex flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-5">
                      {p.githubUrl ? (
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-testid={`project-github-${p.id}`}
                          className="group/btn inline-flex items-center gap-2 text-zinc-300 hover:text-cyan-300 transition-colors duration-300"
                        >
                          <Github size={13} strokeWidth={1.3} className="group-hover/btn:scale-110 group-hover/btn:rotate-6 transition-all duration-300 text-cyan-400" />
                          <span className="font-mono-tag text-[10px] tracking-[0.25em] uppercase border-b border-transparent group-hover/btn:border-cyan-400/40 pb-0.5 transition-all duration-300">
                            Code
                          </span>
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-zinc-600 cursor-not-allowed">
                          <Github size={13} strokeWidth={1.3} />
                          <span className="font-mono-tag text-[10px] tracking-[0.25em] uppercase pb-0.5">
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
                          className="group/btn inline-flex items-center gap-2 text-zinc-300 hover:text-cyan-300 transition-colors duration-300"
                        >
                          <FileText size={13} strokeWidth={1.3} className="group-hover/btn:scale-110 group-hover/btn:rotate-6 transition-all duration-300 text-cyan-400" />
                          <span className="font-mono-tag text-[10px] tracking-[0.25em] uppercase border-b border-transparent group-hover/btn:border-cyan-400/40 pb-0.5 transition-all duration-300">
                            Notes
                          </span>
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-zinc-600 cursor-not-allowed">
                          <FileText size={13} strokeWidth={1.3} />
                          <span className="font-mono-tag text-[10px] tracking-[0.25em] uppercase pb-0.5">
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
                          className="group/btn inline-flex items-center gap-2 text-zinc-300 hover:text-cyan-300 transition-colors duration-300"
                        >
                          <ArrowUpRight size={13} strokeWidth={1.3} className="group-hover/btn:scale-110 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all duration-300 text-cyan-400" />
                          <span className="font-mono-tag text-[10px] tracking-[0.25em] uppercase border-b border-transparent group-hover/btn:border-cyan-400/40 pb-0.5 transition-all duration-300">
                            View
                          </span>
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-zinc-600 cursor-not-allowed">
                          <ArrowUpRight size={13} strokeWidth={1.3} />
                          <span className="font-mono-tag text-[10px] tracking-[0.25em] uppercase pb-0.5">
                            View
                          </span>
                        </span>
                      )}
                    </div>

                    {isEditing && (
                      <div className="mt-2 p-3 bg-zinc-900/40 border border-white/5 space-y-2 rounded">
                        <span className="block text-[8px] font-mono-tag text-zinc-500 uppercase tracking-widest font-semibold">Project Resource URLs</span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div>
                            <span className="text-[8px] font-mono-tag text-zinc-400 uppercase tracking-wider block mb-0.5">GitHub Address</span>
                            <input
                              type="text"
                              value={p.githubUrl || ""}
                              onChange={(e) => updateProjectProp(i, 'githubUrl', e.target.value)}
                              className="w-full bg-zinc-950 text-[10px] font-sans border border-white/10 px-2 py-1 text-zinc-300 focus:outline-none focus:border-cyan-400/45"
                              placeholder="https://github.com/..."
                            />
                          </div>
                          <div>
                            <span className="text-[8px] font-mono-tag text-zinc-400 uppercase tracking-wider block mb-0.5">Notes/Paper Link</span>
                            <input
                              type="text"
                              value={p.paperUrl || ""}
                              onChange={(e) => updateProjectProp(i, 'paperUrl', e.target.value)}
                              className="w-full bg-zinc-950 text-[10px] font-sans border border-white/10 px-2 py-1 text-zinc-300 focus:outline-none focus:border-cyan-400/45"
                              placeholder="https://..."
                            />
                          </div>
                          <div>
                            <span className="text-[8px] font-mono-tag text-zinc-400 uppercase tracking-wider block mb-0.5">Demo/Deployment Link</span>
                            <input
                              type="text"
                              value={p.viewUrl || ""}
                              onChange={(e) => updateProjectProp(i, 'viewUrl', e.target.value)}
                              className="w-full bg-zinc-950 text-[10px] font-sans border border-white/10 px-2 py-1 text-zinc-300 focus:outline-none focus:border-cyan-400/45"
                              placeholder="https://..."
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                </div>

                {/* Project illustration card */}
                <div className="md:col-span-4">
                  <div className="aspect-[5/4] overflow-hidden border border-white/5 relative bg-zinc-950">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 grayscale-[40%] brightness-[70%] group-hover:grayscale-0 group-hover:brightness-[95%] group-hover:scale-105"
                    />
                    
                    {isEditing && (
                      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col justify-center p-4 overflow-y-auto space-y-3 z-20">
                        <ImageUpload
                          value={p.img}
                          onChange={(base64OrUrl) => updateProjectProp(i, 'img', base64OrUrl)}
                          placeholder="Project Illustration"
                        />
                        <div className="pt-2 border-t border-white/10">
                          <label className="block text-[8px] font-mono-tag text-zinc-500 uppercase tracking-widest mb-1">Or direct web link</label>
                          <input
                            type="text"
                            value={p.img.startsWith('data:') ? '' : p.img}
                            onChange={(e) => updateProjectProp(i, 'img', e.target.value)}
                            className="font-mono-tag text-[8px] tracking-tight bg-zinc-900 text-zinc-300 border border-white/10 p-1.5 focus:outline-none w-full"
                            placeholder="Paste direct URL..."
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
