import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Blueprint from './pages/Blueprint';
import Contact from './pages/Contact';
import Profile from './pages/Profile'; 

// IMPORTA EL MODO INGENIERO
import EngineerMode from './components/EngineerMode'; 

function App() {
  const [language, setLanguage] = useState('en'); 
  const location = useLocation();

  return (
    <div className="app-container">
      
      {/* Sistema "Invisible" de Ingeniería */}
      <EngineerMode />

      {/* El Navbar principal solo se ve en el Home */}
      {location.pathname === '/' && <Navbar language={language} setLanguage={setLanguage} />}
      
      <Routes>
        <Route path="/" element={<Home language={language} />} />
        <Route path="/blueprint" element={<Blueprint language={language} setLanguage={setLanguage} />} />
        <Route path="/contact" element={<Contact language={language} setLanguage={setLanguage} />} />
        
        {/* --- AQUÍ ESTÁ EL CAMBIO: Pasamos setLanguage para que funcione el botón --- */}
        <Route 
          path="/profile" 
          element={<Profile language={language} setLanguage={setLanguage} />} 
        />
      </Routes>
    </div>
  );
}

export default App;