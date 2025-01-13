import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import Projects from './pages/projects';
import { AnimatePresence } from "framer-motion"
import Resume from './pages/resume';
import About from './pages/About';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import { useLanguage } from './contexts/languageContext';
import languageData from './data/language.json';
import Footer from './components/Footer';


function App() {
  const location = useLocation()
  const { language, changeLanguage } = useLanguage();
  const languageText = languageData[language];

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

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    changeLanguage(newLanguage);
  };

  return (
    <div className={`${darkMode && "dark"} bg-theme dark:bg-darktheme min-h-screen ${language === 'ar' ? "arabic" : ""}`}>
      <AnimatePresence>
        <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} toggleLanguage={toggleLanguage} language={language} languageText={languageText} />
        <Routes location={location} key={location.key}>
          <Route exact path="/" element={<Home language={language} languageText={languageText} />} />
          <Route path="/projects" element={<Projects languageText={languageText} language={language} />} />
          <Route path="/resume" element={<Resume languageText={languageText} language={language} />} />
          <Route path="/about" element={<About languageText={languageText} language={language} />} />
          <Route path="/services" element={<Services languageText={languageText} language={language} />} />
          <Route path="/gallery" element={<Gallery languageText={languageText} language={language} />} />
          {/* <Route path="/terms" element={<Terms/>} /> */}
        </Routes>
        <Footer language={language} languageText={languageText} />

      </AnimatePresence>
    </div>
  );
}

export default App;
