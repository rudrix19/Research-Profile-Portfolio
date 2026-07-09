import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import IISER from './pages/IISER';
import { PortfolioProvider } from './context/PortfolioContext';
import CosmicLoader from './components/CosmicLoader';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <PortfolioProvider>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <CosmicLoader key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="app-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <HashRouter>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/iiser" element={<IISER />} />
                </Route>
              </Routes>
            </HashRouter>
          </motion.div>
        )}
      </AnimatePresence>
    </PortfolioProvider>
  );
}

