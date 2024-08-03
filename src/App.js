import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router, Navigate, Link } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Home from './pages/home';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
