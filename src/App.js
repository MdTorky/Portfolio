import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import Projects from './pages/projects';
import { AnimatePresence } from "framer-motion"


function App() {
  const location = useLocation()

  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={`${darkMode && "dark"} bg-theme dark:bg-darktheme min-h-screen`}>
      <AnimatePresence>
        <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <Routes location={location} key={location.key}>
          <Route exact path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>

      </AnimatePresence>
    </div>
  );
}

export default App;
