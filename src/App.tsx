import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import IISER from './pages/IISER';
import School from './pages/School';
import { PortfolioProvider } from './context/PortfolioContext';

export default function App() {
  return (
    <PortfolioProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/iiser" element={<IISER />} />
            <Route path="/school" element={<School />} />
          </Route>
        </Routes>
      </HashRouter>
    </PortfolioProvider>
  );
}
