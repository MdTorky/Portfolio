import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router, Navigate, Link } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Home from './pages/home';

function App() {

  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }
  return (
    <div className={`${darkMode && "dark"} bg-theme dark:bg-darktheme h-screen`}>
      <Router>
        <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
