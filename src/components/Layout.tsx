import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import StarField from './StarField';
import { usePortfolio } from '../context/PortfolioContext';
import { Sliders, RefreshCw, Check } from 'lucide-react';

export default function Layout() {
  const loc = useLocation();
  const { isEditing, setIsEditing, resetToDefault } = usePortfolio();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant' as any // Force instant scroll
    });
  }, [loc.pathname]);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden pb-12"
      data-testid="app-layout"
    >
      {/* Dynamic Star Overlay Canvas */}
      <StarField />

      {/* Main Top Navigation Headless Bar */}
      <Navbar />

      {/* Primary Page Layout Sections */}
      <main className="relative z-10 pt-16">
        <Outlet />
      </main>

      {/* Main Footer Block */}
      <Footer />

      {/* Floating persistent editor bottom bar when in Edit Mode */}
      {isEditing && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#09090b]/90 backdrop-blur-xl border-t border-white/10 px-6 sm:px-12 py-3.5 flex items-center justify-between text-xs animate-slide-up">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <p className="font-mono-tag tracking-wider text-emerald-400 font-medium uppercase text-[10px]">
              Editor active · changes auto-saved
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={resetToDefault}
              className="font-mono-tag text-[9px] tracking-widest text-zinc-400 hover:text-white uppercase flex items-center gap-1.5 px-2.5 py-1.5 transition"
            >
              <RefreshCw size={10} />
              Reset Defaults
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="font-mono-tag text-[10px] bg-white text-black font-medium tracking-widest uppercase flex items-center gap-1.5 px-4 py-1.5 hover:bg-zinc-200 transition"
            >
              <Check size={11} />
              Exit Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
