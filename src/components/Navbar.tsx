import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const links = [
  { to: '/', label: 'Home', testId: 'nav-home' },
  { to: '/projects', label: 'Projects', testId: 'nav-projects' },
  { to: '/iiser', label: 'At IISER', testId: 'nav-iiser' }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  return (
    <header
      data-testid="site-header"
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-[#050505]/85 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 h-16 flex items-center justify-between">
        <Link
          to="/"
          data-testid="brand-link"
          className="group flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span className="font-serif-display text-lg tracking-tight font-light text-white group-hover:text-zinc-300 transition-colors">
            Notes From The Noise
          </span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-10">
          <nav className="flex items-center gap-10 relative">
            {links.map((l) => {
              const active = loc.pathname === l.to;
              return (
                <NavLink
                  key={l.to}
                  to={l.to}
                  data-testid={l.testId}
                  className={`relative font-mono-tag text-[10px] tracking-[0.25em] uppercase pb-2 transition-colors duration-300 ${
                    active ? 'text-cyan-400 font-medium' : 'text-zinc-400 hover:text-cyan-300'
                  }`}
                >
                  {l.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Mobile menu and button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            data-testid="mobile-menu-toggle"
            onClick={() => setOpen((v) => !v)}
            className="text-slate-300 hover:text-white p-2"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} strokeWidth={1.2} /> : <Menu size={20} strokeWidth={1.2} />}
          </button>
        </div>
      </div>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            data-testid="mobile-menu"
            className="md:hidden border-t border-white/10 bg-[#050505]/98 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {links.map((l) => {
                const active = loc.pathname === l.to;
                return (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    data-testid={`${l.testId}-mobile`}
                    onClick={() => setOpen(false)}
                    className={`font-mono-tag text-xs tracking-[0.2em] uppercase flex items-center gap-2 transition-colors duration-200 ${
                      active ? 'text-cyan-400 font-medium' : 'text-zinc-400 hover:text-cyan-300'
                    }`}
                  >
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.6)]" />}
                    {l.label}
                  </NavLink>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
