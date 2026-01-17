import React, { useState, useEffect } from 'react';

const Navbar = ({ language, setLanguage }) => {
  // --- ESTADOS ---
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);

  // Detectar cambio de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToPosition = (percentage) => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const targetPosition = totalHeight * percentage;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    
    if (isMobile) setMenuOpen(false);
  };

  const texts = {
    en: { items: ['HOME', 'PROJECTS', 'CONTACT'], close: 'CLOSE', menu: 'MENU' },
    es: { items: ['INICIO', 'PROYECTOS', 'CONTACTO'], close: 'CERRAR', menu: 'MENÚ' }
  };

  const t = texts[language] || texts.en;

  const iconStyle = {
    width: '24px',
    height: '24px',
    fill: 'currentColor',
    cursor: 'pointer',
    transition: 'opacity 0.3s'
  };

  return (
    <>
      {/* --- BARRA DE NAVEGACIÓN (HEADER) --- */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, width: '100%', padding: isMobile ? '20px 25px' : '20px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        zIndex: 100, boxSizing: 'border-box',
        mixBlendMode: menuOpen ? 'normal' : 'difference', 
        color: menuOpen ? '#F8FAFC' : '#EDE8E4' 
      }}>
        
        {/* LOGO */}
        <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', fontWeight: 'bold', cursor: 'pointer', zIndex: 101 }} onClick={() => scrollToPosition(0)}>
          Matias<span style={{ fontFamily: '"Inter", sans-serif', fontSize: '0.9rem', opacity: 0.7 }}>.dev</span>
        </div>

        {/* --- DESKTOP --- */}
        {!isMobile && (
          <>
            <div style={{ display: 'flex', gap: '40px', fontFamily: '"Inter", sans-serif', fontSize: '0.8rem', letterSpacing: '2px', fontWeight: '500' }}>
              <span onClick={() => scrollToPosition(0)} style={{ cursor: 'pointer' }}>{t.items[0]}</span>
              <span onClick={() => scrollToPosition(0.36)} style={{ cursor: 'pointer' }}>{t.items[1]}</span>
              <span onClick={() => scrollToPosition(0.99)} style={{ cursor: 'pointer' }}>{t.items[2]}</span>
            </div>

            <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
              <div style={{ fontFamily: '"Inter", sans-serif', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer', marginRight: '10px' }}>
                <span onClick={() => setLanguage('en')} style={{ opacity: language === 'en' ? 1 : 0.4 }}>EN</span>
                <span style={{ margin: '0 5px', opacity: 0.4 }}>/</span>
                <span onClick={() => setLanguage('es')} style={{ opacity: language === 'es' ? 1 : 0.4 }}>ES</span>
              </div>
              <div style={{ width: '1px', height: '15px', backgroundColor: 'currentColor', opacity: 0.3 }}></div>
              <a href="https://github.com/matiponcesk8" target="_blank" rel="noreferrer" style={{ color: 'inherit', display: 'flex' }}><GitHubIcon style={iconStyle}/></a>
              <a href="https://linkedin.com/in/matias-ponce" target="_blank" rel="noreferrer" style={{ color: 'inherit', display: 'flex' }}><LinkedInIcon style={iconStyle}/></a>
            </div>
          </>
        )}

        {/* --- MÓVIL (Botón) --- */}
        {isMobile && (
          <div 
            onClick={() => setMenuOpen(!menuOpen)} 
            style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.9rem', letterSpacing: '2px', cursor: 'pointer', zIndex: 101, fontWeight: 'bold', textTransform: 'uppercase' }}
          >
            {menuOpen ? t.close : t.menu}
          </div>
        )}

      </nav>

      {/* --- MENÚ OVERLAY (CORREGIDO) --- */}
      {isMobile && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
          backgroundColor: '#0F172A',
          color: '#F8FAFC',
          zIndex: 99,
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          gap: '40px',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 0.4s ease',
          padding: '20px',
          boxSizing: 'border-box' // <--- ESTO ARREGLA EL DESPLAZAMIENTO
        }}>
           
           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
              <span onClick={() => scrollToPosition(0)} style={mobileLinkStyle}>{t.items[0]}</span>
              <span onClick={() => scrollToPosition(0.32)} style={mobileLinkStyle}>{t.items[1]}</span>
              <span onClick={() => scrollToPosition(0.99)} style={mobileLinkStyle}>{t.items[2]}</span>
           </div>

           <div style={{ width: '50px', height: '1px', backgroundColor: '#334155', margin: '20px 0' }}></div>

           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}>
                <span onClick={() => { setLanguage('en'); }} style={{ opacity: language === 'en' ? 1 : 0.4, padding: '10px' }}>ENGLISH</span>
                <span onClick={() => { setLanguage('es'); }} style={{ opacity: language === 'es' ? 1 : 0.4, padding: '10px' }}>ESPAÑOL</span>
              </div>
              
              <div style={{ display: 'flex', gap: '30px', marginTop: '10px' }}>
                 <a href="https://github.com/matiponcesk8" target="_blank" rel="noreferrer" style={{ color: 'inherit' }}><GitHubIcon style={{ width: '30px', height: '30px', fill: 'currentColor' }}/></a>
                 <a href="https://linkedin.com/in/matias-ponce" target="_blank" rel="noreferrer" style={{ color: 'inherit' }}><LinkedInIcon style={{ width: '30px', height: '30px', fill: 'currentColor' }}/></a>
              </div>
           </div>

        </div>
      )}
    </>
  );
};

// --- Helpers ---
const mobileLinkStyle = {
  fontFamily: '"Playfair Display", serif',
  fontSize: '2.5rem',
  cursor: 'pointer',
  textTransform: 'uppercase',
  letterSpacing: '1px'
};

const GitHubIcon = ({ style, ...props }) => (
  <svg viewBox="0 0 24 24" style={style} {...props}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedInIcon = ({ style, ...props }) => (
  <svg viewBox="0 0 24 24" style={style} {...props}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

export default Navbar;