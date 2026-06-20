import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import StarField from './StarField';

export default function Layout() {
  const loc = useLocation();

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
    </div>
  );
}
