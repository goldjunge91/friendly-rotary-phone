import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import TutorialView from './components/TutorialView';
import PlaygroundView from './components/PlaygroundView';

const Router = () => (
  <BrowserRouter>
    <div className="bg-gray-950 text-gray-100 min-h-screen font-body">
          <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
                  <Route path="/" element={<Navigate to="/landing" />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/tutorial" element={<TutorialView />} />
          <Route path="/playground" element={<PlaygroundView />} />
        </Routes>
      </main>
    </div>
  </BrowserRouter>
);

export default Router;
