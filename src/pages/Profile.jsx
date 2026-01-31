import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = ({ language, setLanguage }) => {
  const navigate = useNavigate();
  
  // --- DETECTOR DE MÓVIL ---
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // --- REFERENCIAS ---
  const containerRef = useRef(null);
  const snakeRef = useRef(null);
  
  // Secciones
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const specsRef = useRef(null);
  const transitionRef = useRef(null); 
  const boomRef = useRef(null);       
  const footerRef = useRef(null);     
  const cardRef = useRef(null);

  // Estado para colores (Dark/Light Mode dinámico)
  const [themeMode, setThemeMode] = useState('dark');

  // --- DICCIONARIO DE TEXTOS ---
  const texts = {
    en: {
      back: "RETURN",
      title: "PROFILE",
      role: "Creative Developer",
      
      // ORIGIN
      originTitle: "THE ORIGIN",
      sysId: "SYS.ID: 9942",
      career: "Computer Science",
      university: "National University of Río Cuarto [UNRC]",
      focus: "Focus: Algorithms & Data Structures",
      status: "ACTIVE STUDENT",
      vision: "Building the digital standard. Moving towards a high-end development firm where logic meets art.",
      location: "Río Cuarto, Córdoba, Argentina",

      // CAPABILITIES
      specsHeader: "CAPABILITIES",
      focusTitle: "ACADEMIC FOCUS",
      stackTitle: "CURRENT STACK",
      academicFocus: [
        { name: "Data Structures", desc: "Memory management & efficiency." },
        { name: "Software Architecture", desc: "Clean code principles & patterns." },
        { name: "Web Interfaces", desc: "Exploring React & UI Design." }
      ],
      techTable: {
        languages: { title: "LANGUAGES", items: "Java, Haskell, C, JavaScript" },
        frontend: { title: "FRONTEND / UI", items: "React, GSAP, Anime.js, Tailwind, WebGL" },
        backend: { title: "BACKEND / DATA", items: "Node.js, Express, SQL" },
        tools: { title: "ENVIRONMENT", items: "Git, GitHub, macOS, Docker, Slack, Figma" }
      },

      // BOOM & PHILOSOPHY
      boomTitle: "ALCHEMY",
      philoHeadline: "Logic is invisible without form.",
      philoSub: "Design is not decoration. It is the reflection of who you are.",

      // FOOTER
      contactBtn: "INITIATE PROTOCOL",
      personalDataTitle: "OPERATOR_DATA",
      pAge: "Age: 25",
      pLoc: "Loc: Río Cuarto, AR",
      pRole: "Role: CS Student",
      pGoal: "Goal: Agency Founder",
      footerCopy: "Matias Ponce © 2026. All Systems Operational."
    },
    es: {
      back: "VOLVER",
      title: "PERFIL",
      role: "Desarrollador Creativo",
      
      // ORIGIN
      originTitle: "EL ORIGEN",
      sysId: "SIS.ID: 9942",
      career: "Ciencias de la Computación",
      university: "Universidad Nacional de Río Cuarto [UNRC]",
      focus: "Espec: Algoritmos y Estructuras de Datos",
      status: "ESTUDIANTE ACTIVO",
      vision: "Construyendo el estándar digital. Avanzando hacia una firma de desarrollo de alto nivel donde la lógica encuentra al arte.",
      location: "Río Cuarto, Córdoba, Argentina",

      // CAPABILITIES
      specsHeader: "CAPACIDADES",
      focusTitle: "ENFOQUE ACADÉMICO",
      stackTitle: "STACK ACTUAL",
      academicFocus: [
        { name: "Estructuras de Datos", desc: "Gestión de memoria y eficiencia." },
        { name: "Arquitectura de Software", desc: "Código limpio y patrones." },
        { name: "Interfaces Web", desc: "Explorando React y Diseño UI." }
      ],
      techTable: {
        languages: { title: "LENGUAJES", items: "Java, Haskell, C, JavaScript" },
        frontend: { title: "FRONTEND / UI", items: "React, GSAP, Anime.js, Tailwind, WebGL" },
        backend: { title: "BACKEND / DATA", items: "Node.js, Express, SQL" },
        tools: { title: "ENTORNO", items: "Git, GitHub, macOS, Docker, Slack, Figma" }
      },

      // BOOM & PHILOSOPHY
      boomTitle: "ALQUIMIA",
      philoHeadline: "La lógica es invisible sin forma.",
      philoSub: "El diseño no es decoración. Es el reflejo de quiénes somos.",

      // FOOTER
      contactBtn: "INICIAR PROTOCOLO",
      personalDataTitle: "DATOS_OPERADOR",
      pAge: "Edad: 25",
      pLoc: "Ubic: Río Cuarto, AR",
      pRole: "Rol: Estudiante CS",
      pGoal: "Meta: Fundador de Agencia",
      footerCopy: "Matias Ponce © 2026. Todos los Sistemas Operativos."
    }
  };

  const t = texts[language] || texts.en;

  const stackIcons = [
      { name: "Java", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "Haskell", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/haskell/haskell-original.svg" },
      { name: "C", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
      { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Git", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "macOS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" },
      { name: "Figma", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "Slack", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg" },
      { name: "Java", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "Haskell", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/haskell/haskell-original.svg" },
      { name: "C", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
      { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Git", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "macOS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" },
      { name: "Figma", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "Slack", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg" }
  ];

  const lerpColor = (color1, color2, factor) => {
    const r = Math.round(color1[0] + (color2[0] - color1[0]) * factor);
    const g = Math.round(color1[1] + (color2[1] - color1[1]) * factor);
    const b = Math.round(color1[2] + (color2[2] - color1[2]) * factor);
    return `rgb(${r}, ${g}, ${b})`;
  };

  // --- 1. LÓGICA DE SCROLL ---
  useEffect(() => {
    const handleScroll = () => {
        if (!containerRef.current) return;
        const scrollY = window.scrollY;
        const windowH = window.innerHeight;

        const startFadeToArena = windowH * 1.2; 
        const endFadeToArena = windowH * 2.0;   
        const startFadeToDark = windowH * 3.5;  
        const endFadeToDark = windowH * 5.0;    

        const colBlack = [0, 0, 0];
        const colOrigin = [11, 17, 32];
        const colArena = [230, 224, 212];
        const colVogue = [10, 10, 10]; 

        let currentColor = "";
        
        if (scrollY < startFadeToArena) {
            let p = Math.min(scrollY / startFadeToArena, 1);
            currentColor = lerpColor(colBlack, colOrigin, p);
            setThemeMode('dark');

        } else if (scrollY >= startFadeToArena && scrollY < endFadeToArena) {
            let p = (scrollY - startFadeToArena) / (endFadeToArena - startFadeToArena);
            currentColor = lerpColor(colOrigin, colArena, p);
            setThemeMode(p > 0.5 ? 'light' : 'dark');

        } else if (scrollY >= endFadeToArena && scrollY < startFadeToDark) {
            currentColor = `rgb(${colArena[0]}, ${colArena[1]}, ${colArena[2]})`;
            setThemeMode('light');

        } else if (scrollY >= startFadeToDark && scrollY < endFadeToDark) {
            let p = (scrollY - startFadeToDark) / (endFadeToDark - startFadeToDark);
            currentColor = lerpColor(colArena, colVogue, p);
            setThemeMode(p > 0.4 ? 'dark' : 'light');

        } else {
            currentColor = `rgb(${colVogue[0]}, ${colVogue[1]}, ${colVogue[2]})`;
            setThemeMode('dark');
        }

        containerRef.current.style.backgroundColor = currentColor;

        if(snakeRef.current) {
            let opacity = 0.6;
            if (scrollY > windowH * 0.8) {
                const fadeDist = windowH;
                const scrolled = scrollY - (windowH * 0.8);
                opacity = 0.6 - (scrolled / fadeDist);
            }
            snakeRef.current.style.opacity = Math.max(0, opacity);
            snakeRef.current.style.transform = `translate(-50%, -${50 + (scrollY * 0.05)}%)`;
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- 2. ANIMACIONES ---
  useEffect(() => {
    if (!window.anime) return;
    window.scrollTo(0, 0);

    // === A. ANIMACIÓN INICIAL (HERO + AURORA) RESTAURADA ===
    const tlIntro = window.anime.timeline({ easing: 'easeOutExpo' });
    
    // 1. La Aurora se abre
    tlIntro.add({
        targets: snakeRef.current,
        opacity: [0, 0.8],
        width: ['0vw', '100vw'],
        duration: 2500,
        easing: 'easeInOutQuart'
    })
    // 2. El título sube
    .add({
        targets: '.hero-title',
        translateY: [60, 0],
        opacity: [0, 1],
        duration: 1800,
        easing: 'easeOutQuint'
    }, '-=2000')
    // 3. El subtítulo aparece
    .add({
        targets: '.hero-subtitle',
        opacity: [0, 1],
        duration: 1000
    }, '-=1000');

    // Loop infinito de la Aurora
    window.anime({ 
        targets: snakeRef.current, 
        backgroundPosition: ['0% 50%', '100% 50%'], 
        direction: 'alternate', 
        loop: true, 
        duration: 15000, 
        easing: 'linear' 
    });
    
    // === B. PREPARACIÓN SVG ===
    const goldenPath = document.querySelector('.golden-spiral-path');
    if(goldenPath) {
        const len = goldenPath.getTotalLength();
        goldenPath.style.strokeDasharray = len;
        goldenPath.style.strokeDashoffset = len;
    }

    // === C. SCROLL OBSERVER ===
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Origin
                if(entry.target === contentRef.current) {
                    window.anime({ targets: cardRef.current, translateY: [100, 0], opacity: [0, 1], duration: 1600, easing: 'easeOutQuart' });
                    window.anime({ targets: '.card-item', translateY: [20, 0], opacity: [0, 1], delay: window.anime.stagger(50), duration: 1000, easing: 'easeOutQuad' });
                }
                // Capabilities
                if(entry.target === specsRef.current) {
                     window.anime({ targets: ['.spec-anim', '.spec-line', '.tech-row'], translateY: [30, 0], opacity: [0, 1], delay: window.anime.stagger(80), duration: 1200, easing: 'easeOutQuint' });
                }
                // Linea Infinita
                if(entry.target === transitionRef.current) {
                    window.anime({
                        targets: '.transition-line',
                        height: ['0%', '100%'],
                        opacity: [0, 0.4],
                        duration: 3500, 
                        easing: 'linear' 
                    });
                }
                // Boom (Alchemy)
                if(entry.target === boomRef.current) {
                    const tl = window.anime.timeline({ easing: 'easeOutExpo' });
                    tl.add({
                        targets: '.golden-spiral-path',
                        strokeDashoffset: [window.anime.setDashoffset, 0],
                        opacity: [0, 1],
                        duration: 4000,
                        easing: 'easeInOutCubic'
                    })
                    .add({
                        targets: '.vogue-title',
                        opacity: [0, 0.15], 
                        scale: [0.9, 1],
                        duration: 2000
                    }, '-=3500')
                    .add({
                        targets: '.editorial-line',
                        translateY: [40, 0],
                        opacity: [0, 1],
                        delay: window.anime.stagger(200),
                        duration: 1500
                    }, '-=1000');
                }
                // Footer
                if(entry.target === footerRef.current) {
                    window.anime({ targets: '.footer-reveal', translateY: [20, 0], opacity: [0, 1], duration: 1000, easing: 'easeOutExpo' });
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const sections = [contentRef, specsRef, transitionRef, boomRef, footerRef];
    sections.forEach(ref => { if(ref.current) observer.observe(ref.current); });

    return () => observer.disconnect();
  }, []);

  const textColor = themeMode === 'dark' ? '#F2F2F2' : '#1A1A1A';
  const subTextColor = themeMode === 'dark' ? 'rgba(242,242,242,0.5)' : 'rgba(26,26,26,0.6)';
  const accentColor = themeMode === 'dark' ? '#D4AF37' : '#2F5233'; 
  const lineColor = themeMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  return (
    // WIDTH 100% y OVERFLOW-X HIDDEN son claves para que no se corra en móvil
    <div ref={containerRef} style={{ width: '100%', maxWidth: '100vw', backgroundColor: '#000000', color: textColor, overflowX: 'hidden', transition: 'color 1s ease' }}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Italiana&family=Sora:wght@100..800&family=Manrope:wght@300;400;500;600&family=Fira+Code:wght@300;400;500&display=swap');
        
        /* Ajuste de Glass Card para que no desborde */
        .glass-card { 
            background: rgba(20, 20, 25, 0.6); 
            backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); 
            border: 1px solid rgba(255, 255, 255, 0.08); 
            box-shadow: 0 40px 120px rgba(0,0,0,0.6); 
            box-sizing: border-box; /* IMPORTANTE */
        }
        
        .info-grid { display: grid; grid-template-columns: 1fr; gap: 40px; }
        @media (min-width: 900px) { .info-grid { grid-template-columns: 1.3fr 0.7fr; gap: 50px; } }
        
        .tech-grid { display: grid; grid-template-columns: 1fr; gap: 40px; margin-top: 60px; }
        @media (min-width: 768px) { .tech-grid { grid-template-columns: 1fr 1fr; gap: 60px 80px; } }
        
        .tech-row { border-top: 1px solid ${lineColor}; padding-top: 20px; transition: border-color 1s; }
        
        /* Clases para anime.js (Start hidden) */
        .hero-title, .hero-subtitle { opacity: 0; }
        .card-item, .spec-anim, .spec-line, .tech-row, .vogue-title, .editorial-line, .footer-reveal { opacity: 0; }
        
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .carousel-track { display: flex; width: calc(120px * 20); animation: scroll 60s linear infinite; }
        .carousel-item { width: 120px; display: flex; justify-content: center; alignItems: center; }
        .carousel-item img { height: 40px; opacity: 0.8; filter: grayscale(100%); transition: all 0.3s; }
        .carousel-item img:hover { opacity: 1; transform: scale(1.1); filter: grayscale(0%); }
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(212, 175, 55, 0); } 100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); } }

      `}</style>

      {/* --- AURORA --- */}
      <div ref={snakeRef} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', height: '40vh', width: '100vw', background: 'linear-gradient(90deg, #020024 0%, #090979 25%, #7F00FF 50%, #00d4ff 100%)', backgroundSize: '200% 200%', filter: 'blur(120px)', borderRadius: '50%', zIndex: 0, opacity: 0, mixBlendMode: 'screen', pointerEvents: 'none' }}></div>

      {/* --- HEADER --- */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', padding: isMobile ? '20px 20px' : '40px 50px', display: 'flex', justifyContent: 'space-between', zIndex: 50, boxSizing: 'border-box' }}>
        <div onClick={() => navigate('/')} style={{ cursor: 'pointer', fontFamily: '"Manrope", sans-serif', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '2px', color: textColor, opacity: 0.6, transition: 'color 1s' }}>{t.back}</div>
        <div style={{ fontFamily: '"Manrope", sans-serif', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer', color: textColor, transition: 'color 1s' }}>
            <span onClick={() => setLanguage && setLanguage('en')} style={{ opacity: language === 'en' ? 1 : 0.4 }}>EN</span> <span style={{ margin: '0 8px', opacity: 0.4 }}>/</span> <span onClick={() => setLanguage && setLanguage('es')} style={{ opacity: language === 'es' ? 1 : 0.4 }}>ES</span>
        </div>
      </div>

      {/* 1. HERO */}
      <div ref={heroRef} style={{ height: '100vh', width: '100%', position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 20px', boxSizing: 'border-box' }}>
          <h1 className="hero-title" style={{ fontFamily: '"Sora", sans-serif', fontSize: 'clamp(3.5rem, 15vw, 13rem)', fontWeight: '800', letterSpacing: '-0.04em', margin: 0, color: '#FFFFFF', lineHeight: 1, textShadow: '0 20px 50px rgba(0,0,0,0.5)', textAlign: 'center' }}>{t.title}</h1>
          <p className="hero-subtitle" style={{ fontFamily: '"Manrope", sans-serif', fontSize: isMobile ? '0.75rem' : '0.9rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '4px', textTransform: 'uppercase', marginTop: '20px', fontWeight: '500', textAlign: 'center' }}>{t.role}</p>
          <div className="hero-subtitle" style={{ position: 'absolute', bottom: 40, animation: 'bounce 2s infinite', color: '#fff' }}><span style={{ fontSize: '1.2rem', opacity: 0.5 }}>↓</span></div>
          <style>{`@keyframes bounce { 0%, 20%, 50%, 80%, 100% {transform: translateY(0);} 40% {transform: translateY(-10px);} 60% {transform: translateY(-5px);} }`}</style>
      </div>

      {/* 2. ORIGIN (ADAPTADO MÓVIL) */}
      <div ref={contentRef} style={{ minHeight: '100vh', width: '100%', position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: isMobile ? '60px 10px' : '100px 20px', boxSizing: 'border-box' }}>
          <div ref={cardRef} className="glass-card" style={{ width: isMobile ? '95%' : '85%', maxWidth: '1200px', padding: isMobile ? '40px 25px' : '80px 60px', borderRadius: '4px', position: 'relative', opacity: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: isMobile ? '40px' : '60px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '25px', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '10px' : '0' }}>
                  <h2 className="card-item" style={{ fontFamily: '"Sora", sans-serif', fontSize: isMobile ? '2rem' : '3.5rem', fontWeight: '700', color: '#fff', margin: 0, letterSpacing: '-1px' }}>{t.originTitle}</h2>
                  <span className="card-item" style={{ fontFamily: '"Fira Code", monospace', fontSize: '0.75rem', color: accentColor, opacity: 0.8 }}>{t.sysId}</span>
              </div>
              <div className="info-grid">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                      <div>
                          <h3 className="card-item" style={{ fontFamily: '"Manrope", sans-serif', fontSize: 'clamp(1.5rem, 2.5vw, 2.8rem)', fontWeight: '300', color: '#fff', margin: 0, lineHeight: 1.1 }}>{t.career}</h3>
                          <div className="card-item" style={{ width: '40px', height: '1px', background: accentColor, marginTop: '15px', marginBottom: '15px', opacity: 0.7 }}></div>
                          <p className="card-item" style={{ fontFamily: '"Manrope", sans-serif', fontSize: '1.1rem', color: '#cbd5e1', margin: 0 }}>{t.university}</p>
                          <p className="card-item" style={{ fontFamily: '"Manrope", sans-serif', fontSize: '0.9rem', color: '#64748B', marginTop: '8px' }}>{t.focus}</p>
                      </div>
                      <div className="card-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '5px' }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: accentColor, animation: 'pulse 2s infinite' }}></div>
                          <span style={{ fontSize: '0.75rem', fontFamily: '"Fira Code", monospace', color: accentColor, letterSpacing: '1px', fontWeight: '500' }}>{t.status}</span>
                      </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '40px' }}>
                      <p className="card-item" style={{ fontFamily: '"Manrope", sans-serif', fontSize: isMobile ? '1.1rem' : '1.25rem', fontWeight: '400', color: '#e2e8f0', lineHeight: '1.6', fontStyle: 'normal' }}>{t.vision}</p>
                      <div className="card-item">
                          <span style={{ display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '3px', color: '#64748B', marginBottom: '8px' }}>Base of Operations</span>
                          <span style={{ fontSize: '1rem', fontFamily: '"Sora", sans-serif', color: '#fff', fontWeight: '600' }}>{t.location}</span>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      {/* 3. CAPABILITIES (Luz) */}
      <div ref={specsRef} style={{ minHeight: '100vh', width: '100%', position: 'relative', zIndex: 20, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: isMobile ? '80px 15px' : '100px 20px', boxSizing: 'border-box' }}>
          <div style={{ width: isMobile ? '100%' : '85%', maxWidth: '1200px' }}>
              <div className="spec-anim" style={{ textAlign: 'center', marginBottom: '80px' }}>
                  <h2 style={{ fontFamily: '"Italiana", serif', fontSize: 'clamp(2.5rem, 5vw, 6rem)', fontWeight: '400', color: textColor, margin: 0, transition: 'color 1s' }}>{t.specsHeader}</h2>
                  <div style={{ width: '1px', height: '60px', background: textColor, margin: '40px auto 0 auto', opacity: 0.3, transition: 'background-color 1s' }}></div>
              </div>
              <div className="spec-anim" style={{ marginBottom: '80px', width: '100%' }}>
                  <h3 style={{ fontFamily: '"Manrope", sans-serif', fontSize: '0.8rem', letterSpacing: '4px', color: subTextColor, marginBottom: '50px', textTransform: 'uppercase', textAlign: 'center', transition: 'color 1s' }}>{t.focusTitle}</h3>
                  {/* Grid Centrado Correctamente */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', textAlign: 'center', width: '100%', justifyContent: 'center' }}>
                      {t.academicFocus.map((item, i) => (
                          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <h4 style={{ fontFamily: '"Sora", sans-serif', fontSize: '1.5rem', fontWeight: '400', color: textColor, margin: '0 0 10px 0', transition: 'color 1s' }}>{item.name}</h4>
                              <p style={{ fontFamily: '"Manrope", sans-serif', fontSize: '0.95rem', color: subTextColor, margin: 0, transition: 'color 1s' }}>{item.desc}</p>
                          </div>
                      ))}
                  </div>
              </div>
              <div className="spec-line" style={{ width: '100%', height: '1px', background: lineColor, marginBottom: '60px', transition: 'background-color 1s' }}></div>
              <div className="spec-anim" style={{ width: '100%' }}>
                  <h3 style={{ fontFamily: '"Manrope", sans-serif', fontSize: '0.8rem', letterSpacing: '4px', color: subTextColor, marginBottom: '40px', textTransform: 'uppercase', textAlign: 'center', transition: 'color 1s' }}>{t.stackTitle}</h3>
                  <div style={{ width: '100%', overflow: 'hidden', position: 'relative', padding: '20px 0', marginBottom: '40px' }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, width: isMobile ? '30px' : '100px', height: '100%', background: `linear-gradient(to right, ${themeMode === 'light' ? '#E6E0D4' : '#141417'}, transparent)`, zIndex: 2, transition: 'background 1s' }}></div>
                      <div style={{ position: 'absolute', top: 0, right: 0, width: isMobile ? '30px' : '100px', height: '100%', background: `linear-gradient(to left, ${themeMode === 'light' ? '#E6E0D4' : '#141417'}, transparent)`, zIndex: 2, transition: 'background 1s' }}></div>
                      <div className="carousel-track">
                          {stackIcons.map((icon, index) => ( <div key={index} className="carousel-item"><img src={icon.url} alt={icon.name} /></div> ))}
                      </div>
                  </div>
                  <div className="tech-grid">
                      {Object.values(t.techTable).map((col, i) => (
                          <div key={i} className="tech-row">
                              <span style={{ display: 'block', fontFamily: '"Fira Code", monospace', fontSize: '0.7rem', color: accentColor, marginBottom: '10px', textTransform: 'uppercase', transition: 'color 1s' }}>//{col.title}</span>
                              <span style={{ fontFamily: '"Manrope", sans-serif', fontSize: '1rem', color: textColor, lineHeight: '1.5', fontWeight: '500', transition: 'color 1s' }}>{col.items}</span>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </div>

      {/* 4. LA LÍNEA INFINITA */}
      <div ref={transitionRef} style={{ height: '160vh', width: '100%', position: 'relative', zIndex: 20, display: 'flex', justifyContent: 'center' }}>
          <div className="transition-line" style={{ width: '1px', height: '0%', background: `linear-gradient(to bottom, ${textColor}, rgba(255,255,255,0.05))`, opacity: 0, transition: 'background 1s' }}></div>
      </div>

      {/* 5. EL BOOM: ALCHEMY (Horizontal Corregido) */}
      <div ref={boomRef} style={{ minHeight: '100vh', width: '100%', position: 'relative', zIndex: 20, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
          
          <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
               
               {/* TÍTULO DE FONDO: HORIZONTAL Y CENTRADO */}
               <h1 className="vogue-title" style={{
                   position: 'absolute',
                   top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                   fontFamily: '"Italiana", serif',
                   fontSize: isMobile ? '18vw' : 'clamp(5rem, 20vw, 25rem)', 
                   color: '#fff',
                   opacity: 0, 
                   whiteSpace: 'nowrap',
                   zIndex: 0,
                   letterSpacing: isMobile ? '-2px' : '-10px',
                   pointerEvents: 'none',
                   textAlign: 'center',
                   width: '100%'
               }}>
                   {t.boomTitle}
               </h1>

               {/* GRÁFICO ÁUREO */}
               <div style={{ width: isMobile ? '90vw' : '60vw', maxWidth: '500px', height: isMobile ? '90vw' : '60vw', maxHeight: '500px', zIndex: 1, position: 'relative' }}>
                    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                        <path 
                            className="golden-spiral-path"
                            d="M 100 0 A 100 100 0 0 1 0 100 A 61.8 61.8 0 0 1 61.8 38.2 A 38.2 38.2 0 0 1 100 76.4 A 23.6 23.6 0 0 1 76.4 100 A 14.6 14.6 0 0 1 61.8 85.4"
                            fill="none" 
                            stroke="#D4AF37" 
                            strokeWidth="0.3"
                        />
                    </svg>
               </div>

               <div style={{ position: 'absolute', zIndex: 2, textAlign: 'center', width: '100%', padding: '0 20px', boxSizing: 'border-box' }}>
                    <p className="editorial-line" style={{ fontFamily: '"Manrope", sans-serif', fontSize: '0.8rem', letterSpacing: '4px', color: '#D4AF37', textTransform: 'uppercase', marginBottom: '20px' }}>
                        {t.philoHeadline}
                    </p>
                    <h2 className="editorial-line" style={{ fontFamily: '"Italiana", serif', fontSize: isMobile ? '2.5rem' : 'clamp(2rem, 5vw, 4rem)', color: '#F2F2F2', maxWidth: '800px', margin: '0 auto', lineHeight: '1.2' }}>
                        "{t.philoSub}"
                    </h2>
               </div>
          </div>
      </div>

      {/* 6. FINAL */}
      <div ref={footerRef} style={{ minHeight: '60vh', width: '100%', position: 'relative', zIndex: 20, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="footer-reveal" style={{ textAlign: 'center' }}>
              <button 
                onClick={() => navigate('/contact')} 
                style={{ 
                    background: 'transparent', 
                    color: '#F2F2F2', 
                    border: '1px solid rgba(255,255,255,0.3)', 
                    padding: '20px 80px', 
                    fontFamily: '"Manrope", sans-serif', 
                    fontSize: '0.8rem', 
                    fontWeight: '600', 
                    letterSpacing: '3px', 
                    cursor: 'pointer', 
                    transition: 'all 0.5s ease' 
                }}
                onMouseEnter={(e) => { e.target.style.background = '#F2F2F2'; e.target.style.color = '#000'; }}
                onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#F2F2F2'; }}
              >
                  {t.contactBtn}
              </button>
              <div style={{ marginTop: '40px', fontFamily: '"Fira Code", monospace', fontSize: '0.6rem', color: 'rgba(255,255,255,0.2)' }}>
                  {t.footerCopy}
              </div>
          </div>
      </div>

    </div>
  );
};

export default Profile;