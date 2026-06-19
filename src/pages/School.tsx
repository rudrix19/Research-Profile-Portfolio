import React from 'react';
import { motion } from 'motion/react';
import { Clock, Plus, Trash2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Chapter } from '../types';

export default function School() {
  const { data, setData, isEditing } = usePortfolio();

  const updateChapterProp = (index: number, key: keyof Chapter, val: any) => {
    const updated = [...data.chapters];
    updated[index] = { ...updated[index], [key]: val };
    setData(prev => ({ ...prev, chapters: updated }));
  };

  const deleteChapter = (index: number) => {
    if (confirm("Are you sure you want to delete this chapter?")) {
      setData(prev => ({ ...prev, chapters: prev.chapters.filter((_, idx) => idx !== index) }));
    }
  };

  const addChapter = () => {
    const newCh: Chapter = {
      year: "2021",
      title: "New Milestones",
      body: "Walks through optics journals, framing math equations slowly, and developing secondary school experiments designed with simple focus prisms."
    };
    setData(prev => ({ ...prev, chapters: [...prev.chapters, newCh] }));
  };

  return (
    <div data-testid="school-page">
      {/* Header section with Clock icon */}
      <section className="relative pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="font-mono-tag text-[10px] tracking-[0.3em] uppercase text-cyan-400/90 flex items-center gap-3"
              >
                <Clock size={12} strokeWidth={1.3} className="text-cyan-400" />
                Section · Origin
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-serif-display text-6xl sm:text-7xl md:text-8xl leading-[0.95] tracking-tight font-light text-slate-100 mt-6 max-w-5xl"
              >
                A bit about my
                <br />
                <span className="italic text-slate-400">school days</span>
                <span className="text-cyan-400">.</span>
              </motion.h1>
            </div>

            {isEditing && (
              <button
                onClick={addChapter}
                className="font-mono-tag text-[10px] tracking-widest text-[#050505] bg-white hover:bg-zinc-200 px-4 py-2 uppercase flex items-center gap-1.5 transition self-start sm:self-end h-fit"
              >
                <Plus size={11} /> Add Chapter
              </button>
            )}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif-display italic text-xl sm:text-2xl text-slate-400 mt-8 max-w-2xl"
          >
            Before the labs and the lectures, there were corridors, blackboards, and a slowly forming kind of curiosity.
          </motion.p>
        </div>
      </section>

      {/* Vertical Timeline section */}
      <section className="relative py-16">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 md:px-12">
          <div className="relative border-l border-white/10 pl-8 sm:pl-12 space-y-16">
            {data.chapters.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                data-testid={`school-chapter-${c.year.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
                className="relative group/chapter"
              >
                {/* Bullet node on timeline */}
                <span className="absolute -left-[2.4rem] sm:-left-[3.4rem] top-2.5 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)] group-hover/chapter:scale-125 transition-transform duration-300" />
                
                {isEditing && (
                  <button
                    onClick={() => deleteChapter(i)}
                    className="absolute right-0 top-0 text-zinc-600 hover:text-rose-400 p-1.5 transition"
                    title="Delete Chapter"
                  >
                    <Trash2 size={13} />
                  </button>
                )}

                {isEditing ? (
                  <div className="space-y-3 bg-zinc-900/40 border border-white/5 p-5 sm:p-6 rounded">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[8px] font-mono-tag text-zinc-500 uppercase tracking-widest mb-1">Time Era (eg. Year)</label>
                        <input
                          type="text"
                          value={c.year}
                          onChange={(e) => updateChapterProp(i, 'year', e.target.value)}
                          className="font-mono-tag text-xs tracking-[0.2em] uppercase text-zinc-300 bg-zinc-950 border border-white/10 p-2 rounded focus:outline-none w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] font-mono-tag text-zinc-500 uppercase tracking-widest mb-1">Chapter Title</label>
                        <input
                          type="text"
                          value={c.title}
                          onChange={(e) => updateChapterProp(i, 'title', e.target.value)}
                          className="font-serif-display text-lg text-white bg-zinc-950 border border-white/10 p-1.5 rounded focus:outline-none w-full"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[8px] font-mono-tag text-zinc-500 uppercase tracking-widest mb-1">Chapter Description</label>
                      <textarea
                        value={c.body}
                        onChange={(e) => updateChapterProp(i, 'body', e.target.value)}
                        rows={3}
                        className="text-slate-300 text-sm bg-zinc-950 border border-white/10 p-2.5 rounded focus:outline-none w-full leading-relaxed"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="font-mono-tag text-[10px] tracking-[0.3em] uppercase text-cyan-400/80">
                      ✦ {c.year}
                    </p>
                    <h3 className="font-serif-display text-3xl sm:text-4xl text-slate-100 mt-3 font-light">
                      {c.title}
                    </h3>
                    <p className="text-slate-400 mt-4 leading-[1.85] max-w-2xl">
                      {c.body}
                    </p>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Concluding block */}
      <section className="relative py-32">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 md:px-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-serif-display italic text-3xl sm:text-4xl md:text-5xl text-slate-200 leading-[1.3] max-w-3xl mx-auto"
          >
            “Still learning,
            <br />
            <span className="text-slate-400">still exploring.”</span>
          </motion.p>
          <p className="font-mono-tag text-[10px] tracking-[0.3em] uppercase text-slate-600 mt-8">
            — {data.name.split(' ')[0] || 'Rudra'}
          </p>
        </div>
      </section>
    </div>
  );
}
