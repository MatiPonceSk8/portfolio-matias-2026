import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Blueprint from './pages/Blueprint';
import Contact from './pages/Contact';

function App() {
  const [language, setLanguage] = useState('en'); 
  const location = useLocation();

  return (
    <div className="app-container">
      {/* El Navbar solo aparece en el Home */}
      {location.pathname === '/' && <Navbar language={language} setLanguage={setLanguage} />}
      
      <Routes>
        <Route path="/" element={<Home language={language} />} />
        <Route path="/blueprint" element={<Blueprint language={language} setLanguage={setLanguage} />} />
        {/* Nueva Ruta de Contacto */}
       <Route path="/contact" element={<Contact language={language} setLanguage={setLanguage} />} />
      </Routes>
    </div>
  );
}

export default App;