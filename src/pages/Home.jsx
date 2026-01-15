import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ language }) => {
  const navigate = useNavigate();

  // --- REFERENCIAS DOM ---
  const containerRef = useRef(null);
  
  // Escenas
  const titleRef = useRef(null);
  const scene2Ref = useRef(null);
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const bioRef = useRef(null);
  const locationRef = useRef(null);
  const scene3Ref = useRef(null);
  const philoTitleRef = useRef(null);
  const philoTextRef = useRef(null);
  
  // Escenas Interactivas
  const scene4Ref = useRef(null); // Proyectos
  const sliderRef = useRef(null);
  const horizontalLineRef = useRef(null);
  const worksTitleRef = useRef(null);
  const scene5Ref = useRef(null); // Marquee
  const marqueeRef = useRef(null);
  const secretPortalRef = useRef(null); // Botón Blueprint
  const scene6Ref = useRef(null); // Footer
  const footerTitleRef = useRef(null);
  const footerActionRef = useRef(null); // Texto "LET'S TALK"
  const startBtnRef = useRef(null); // Botón "START PROJECT"

  // Background
  const patternARef = useRef(null);
  const patternBRef = useRef(null);
  const patternCRef = useRef(null);
  const svgRef = useRef(null); 

  const texts = {
    en: {
      mainTitle: 'PORTFOLIO',
      name: 'Matías Ponce',
      role: 'CREATIVE DEVELOPER',
      bio: 'I craft digital experiences where\nlogic meets emotion.',
      location: 'BASED IN ARGENTINA — 2026',
      scroll: 'SCROLL TO DISCOVER',
      philoTitle: 'The Philosophy',
      philoText: 'Aesthetics is not superficial; it is the first layer of intelligence.\nWe merge engineering logic with artistic sensibility to craft experiences that are not just used, but felt.',
      projTitle: 'Selected Works',
      p1Title: 'AGROSYSTEM',
      p1Sub: 'SAAS PLATFORM',
      p1Desc: 'A bespoke operating system for livestock management. \nIncludes complex data visualization and a login interface designed as digital art.',
      p2Title: 'HT AGRONEGOCIOS',
      p2Sub: 'CORPORATE IDENTITY',
      p2Desc: 'High-end corporate website featuring dynamic catalogs and a seamless mobile experience for the agricultural sector.',
      marqueeText: 'STRATEGY — DESIGN — DEVELOPMENT — EXPERIENCE — STRATEGY — DESIGN — DEVELOPMENT — EXPERIENCE —',
      secretBtn: '[ THE BLUEPRINT ]',
      footerCall: "HAVE AN IDEA?",
      footerAction: "LET'S TALK",
      startBtn: "START PROJECT"
    },
    es: {
      mainTitle: 'PORTAFOLIO',
      name: 'Matías Ponce',
      role: 'DESARROLLADOR CREATIVO',
      bio: 'Creo experiencias digitales donde\nla lógica encuentra a la emoción.',
      location: 'DESDE ARGENTINA — 2026',
      scroll: 'DESLIZA PARA DESCUBRIR',
      philoTitle: 'La Filosofía',
      philoText: 'La estética no es superficial, es la primera capa de la inteligencia.\nFusionamos la lógica de la ingeniería con la sensibilidad del arte para crear experiencias que no solo se usan, se sienten.',
      projTitle: 'Trabajos Seleccionados',
      p1Title: 'AGROSYSTEM',
      p1Sub: 'PLATAFORMA SAAS',
      p1Desc: 'Un sistema operativo a medida para la gestión ganadera. \nIncluye visualización de datos compleja y un login diseñado como arte digital.',
      p2Title: 'HT AGRONEGOCIOS',
      p2Sub: 'IDENTIDAD CORPORATIVA',
      p2Desc: 'Sitio web corporativo de alto nivel con catálogos dinámicos y una experiencia móvil fluida para el sector agropecuario.',
      marqueeText: 'ESTRATEGIA — DISEÑO — DESARROLLO — EXPERIENCIA — ESTRATEGIA — DISEÑO — DESARROLLO — EXPERIENCIA —',
      secretBtn: '[ EL PLANO MAESTRO ]',
      footerCall: "¿TIENES UNA IDEA?",
      footerAction: "HABLEMOS",
      startBtn: "INICIAR PROYECTO"
    }
  };

  const t = texts[language] || texts.en;

  // --- 1. FONDO SVG ---
  useEffect(() => {
    if (!window.anime) return;
    const setInitialLineState = (groupRef) => {
        if(!groupRef.current) return;
        const paths = groupRef.current.querySelectorAll('path');
        paths.forEach(path => {
            path.style.strokeDasharray = path.getTotalLength();
            path.style.strokeDashoffset = path.getTotalLength();
            path.style.opacity = 0;
        });
    };
    setInitialLineState(patternARef);
    setInitialLineState(patternBRef);
    setInitialLineState(patternCRef);
    const bgLoop = window.anime.timeline({ loop: true, autoplay: true, easing: 'easeInOutSine' });
    const drawDuration = 4000; const fadeDuration = 2000; const overlap = '-=1500';
    bgLoop
    .add({ targets: patternARef.current.querySelectorAll('path'), strokeDashoffset: [window.anime.setDashoffset, 0], opacity: { value: [0, 1], duration: 1000 }, duration: drawDuration, delay: window.anime.stagger(200) })
    .add({ targets: patternARef.current.querySelectorAll('path'), opacity: 0, duration: fadeDuration }, `+=${1000}`)
    .add({ targets: patternBRef.current.querySelectorAll('path'), strokeDashoffset: [window.anime.setDashoffset, 0], opacity: { value: [0, 1], duration: 1000 }, duration: drawDuration, delay: window.anime.stagger(200) }, overlap)
    .add({ targets: patternBRef.current.querySelectorAll('path'), opacity: 0, duration: fadeDuration }, `+=${1000}`)
    .add({ targets: patternCRef.current.querySelectorAll('path'), strokeDashoffset: [window.anime.setDashoffset, 0], opacity: { value: [0, 1], duration: 1000 }, duration: drawDuration, delay: window.anime.stagger(200) }, overlap)
    .add({ targets: patternCRef.current.querySelectorAll('path'), opacity: 0, duration: fadeDuration }, `+=${1000}`);
    return () => bgLoop.pause();
  }, []);

  // --- 2. TIMELINE SCROLL ---
  useEffect(() => {
    if (!window.anime) return;
    const tl = window.anime.timeline({ autoplay: false, easing: 'linear' });

    tl
    // ACTO 1: Intro
    .add({ targets: titleRef.current, scale: [1, 2], opacity: [1, 0], filter: ['blur(0px)', 'blur(10px)'], duration: 1000 })
    // ACTO 2: Manifiesto
    .add({ targets: scene2Ref.current, opacity: [0, 1], duration: 100 }, '-=500')
    .add({ targets: nameRef.current, translateY: ['50px', '0px'], opacity: [0, 1], duration: 800, easing: 'easeOutQuart' })
    .add({ targets: roleRef.current, opacity: [0, 1], duration: 600 }, '-=600')
    .add({ targets: bioRef.current, translateY: ['20px', '0px'], opacity: [0, 1], duration: 800 }, '-=400')
    .add({ targets: locationRef.current, opacity: [0, 1], duration: 800 }, '-=600')
    // DARK MODE
    .add({ targets: scene2Ref.current, opacity: [1, 0], translateY: [0, -50], duration: 800, delay: 500 })
    .add({ targets: containerRef.current, backgroundColor: ['#EDE8E4', '#0B1120'], duration: 1200, easing: 'easeInOutQuad' }, '-=800')
    .add({ targets: svgRef.current.querySelectorAll('path'), stroke: ['#333333', '#A1A1AA'], strokeOpacity: [0.4, 0.15], duration: 1200 }, '-=1200')
    // ACTO 3: Filosofía
    .add({ targets: scene3Ref.current, opacity: [0, 1], duration: 100 }, '-=500')
    .add({ targets: philoTitleRef.current, opacity: [0, 1], translateY: [30, 0], duration: 800, easing: 'easeOutCubic' })
    .add({ targets: philoTextRef.current, opacity: [0, 1], translateY: [50, 0], duration: 1000, easing: 'easeOutCubic' }, '-=600')
    
    // --- ACTO 4: PROYECTOS ---
    .add({ targets: [scene3Ref.current], opacity: 0, duration: 800, delay: 500 })
    .add({ targets: svgRef.current, opacity: 0, duration: 800 }, '-=800')
    .add({ targets: worksTitleRef.current, opacity: [0, 1], scale: [0.8, 2], duration: 1000, easing: 'easeOutQuart' })
    .add({ targets: worksTitleRef.current, top: ['50%', '8%'], left: ['50%', '20%'], scale: [2, 0.6], color: ['#F8FAFC', '#64748B'], duration: 1500, easing: 'easeInOutCubic' })
    .add({ targets: horizontalLineRef.current, width: ['0%', '100%'], duration: 1000, easing: 'easeInOutExpo' }, '-=1000')
    
    // [SOLUCIÓN INFALIBLE] Activamos clicks con callback al empezar la transición
    .add({ 
        targets: scene4Ref.current, 
        opacity: [0, 1], 
        duration: 500,
        begin: () => { if(scene4Ref.current) scene4Ref.current.style.pointerEvents = 'auto'; } // <-- ACTIVAR
    }, '-=500')
    .add({ targets: sliderRef.current, translateX: ['0%', '-60%'], duration: 6000, easing: 'linear' })
    
    // --- ACTO 5: MARQUEE (SALIDA DE PROYECTOS) ---
    // [SOLUCIÓN INFALIBLE] Desactivamos clicks al terminar la transición
    .add({ 
        targets: [scene4Ref.current], 
        opacity: 0, 
        duration: 800,
        complete: () => { if(scene4Ref.current) scene4Ref.current.style.pointerEvents = 'none'; } // <-- DESACTIVAR
    })
    .add({ targets: [horizontalLineRef.current, worksTitleRef.current], opacity: 0, duration: 800 }, '-=800')
    
    .add({ targets: scene5Ref.current, opacity: [0, 1], duration: 500 })
    .add({ targets: marqueeRef.current, translateX: ['0%', '-20%'], duration: 2000, easing: 'linear' })

    // --- PORTAL SECRETO ---
    .add({ 
        targets: secretPortalRef.current, 
        opacity: [0, 1], 
        translateY: [20, 0],
        duration: 800,
        easing: 'easeOutExpo',
        begin: () => { if(secretPortalRef.current) secretPortalRef.current.style.pointerEvents = 'auto'; } // <-- ACTIVAR BOTÓN
    }, '-=1000')

    // --- ACTO 6: FOOTER ---
    // Salida del Blueprint
    .add({ 
        targets: secretPortalRef.current, 
        opacity: 0, 
        duration: 500,
        complete: () => { if(secretPortalRef.current) secretPortalRef.current.style.pointerEvents = 'none'; } // <-- DESACTIVAR BOTÓN
    }) 
    .add({ targets: scene5Ref.current, opacity: 0, translateY: -50, duration: 800 }, '-=500')
    
    // Entrada del Footer
    .add({ 
        targets: scene6Ref.current, 
        opacity: [0, 1], 
        duration: 100,
        begin: () => { if(scene6Ref.current) scene6Ref.current.style.pointerEvents = 'auto'; } // <-- ACTIVAR FOOTER
    })
    .add({ targets: footerTitleRef.current, scale: [0.8, 1], opacity: [0, 1], duration: 1000, easing: 'easeOutExpo' })
    // Animamos el texto "LET'S TALK"
    .add({ targets: footerActionRef.current, translateY: [20, 0], opacity: [0, 1], duration: 800 }, '-=600')
    .add({ targets: startBtnRef.current, opacity: [0, 1], translateY: [20, 0], duration: 800 }, '-=400');

    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      tl.seek(tl.duration * scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [language]);

  // Hook del Marquee
  useEffect(() => {
    if(!window.anime || !marqueeRef.current) return;
    window.anime({
        targets: marqueeRef.current,
        translateX: ['0%', '-50%'],
        duration: 20000,
        easing: 'linear',
        loop: true
    });
  }, []);

  return (
    // Altura 2200vh
    <div ref={containerRef} style={{ height: '2200vh', backgroundColor: '#EDE8E4', position: 'relative' }}>

      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        overflow: 'hidden', color: '#1a1a1a'
      }}>

        {/* SVG FONDO */}
        <svg ref={svgRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }} viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <g ref={patternARef}><path d="M-200 500 C 300 100, 800 800, 1600 300" stroke="#333" strokeWidth="2" strokeOpacity="0.4" fill="none"/><path d="M1600 700 C 1100 200, 500 900, -200 400" stroke="#333" strokeWidth="1.5" strokeOpacity="0.3" fill="none"/><path d="M0 800 C 400 400, 1000 600, 1440 100" stroke="#4a4a4a" strokeWidth="2.5" strokeOpacity="0.5" fill="none"/></g>
            <g ref={patternBRef}><path d="M200 900 C 200 600, 600 300, 600 0" stroke="#333" strokeWidth="2" strokeOpacity="0.35" fill="none"/><path d="M1200 0 C 1200 300, 800 600, 800 900" stroke="#333" strokeWidth="2" strokeOpacity="0.35" fill="none"/><path d="M-100 450 C 400 450, 1000 450, 1540 450" stroke="#4a4a4a" strokeWidth="1.5" strokeOpacity="0.3" fill="none"/></g>
            <g ref={patternCRef}><path d="M0 200 C 400 800, 1000 800, 1440 200" stroke="#333" strokeWidth="2" strokeOpacity="0.4" fill="none"/><path d="M1440 700 C 1000 100, 400 100, 0 700" stroke="#4a4a4a" strokeWidth="1.5" strokeOpacity="0.4" fill="none"/></g>
        </svg>

        {/* ESCENAS 1-3 (IGUALES) */}
        <h1 ref={titleRef} style={{ position: 'absolute', fontFamily: '"Playfair Display", serif', fontSize: '13vw', fontWeight: '900', margin: 0, zIndex: 2, lineHeight: 0.8, color: '#1a1a1a', whiteSpace: 'nowrap', letterSpacing: '-5px' }}>{t.mainTitle}</h1>
        <div ref={scene2Ref} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 3, opacity: 0, textAlign: 'center' }}>
            <h3 ref={roleRef} style={{ fontFamily: '"Inter", sans-serif', fontSize: '1rem', fontWeight: '500', letterSpacing: '4px', marginBottom: '15px', color: '#666', display: 'flex', alignItems: 'center', gap: '15px' }}><span style={{ height: '1px', width: '30px', background: '#999' }}></span>{t.role}<span style={{ height: '1px', width: '30px', background: '#999' }}></span></h3>
            <h2 ref={nameRef} style={{ fontFamily: '"Playfair Display", serif', fontSize: '6vw', fontWeight: '400', margin: '10px 0', color: '#1a1a1a', fontStyle: 'italic' }}>{t.name}</h2>
            <p ref={bioRef} style={{ fontFamily: '"Inter", sans-serif', fontSize: '1.5rem', maxWidth: '600px', marginTop: '20px', lineHeight: '1.5', color: '#333', fontWeight: '300' }}>{t.bio}</p>
            <div ref={locationRef} style={{ marginTop: '60px', fontFamily: '"Inter", sans-serif', fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 'bold', color: '#1a1a1a', borderBottom: '1px solid #1a1a1a', paddingBottom: '5px' }}>{t.location}</div>
        </div>
        <div ref={scene3Ref} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 3, opacity: 0, textAlign: 'center', pointerEvents: 'none' }}>
            <h4 ref={philoTitleRef} style={{ fontFamily: '"Inter", sans-serif', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '6px', color: '#94A3B8', marginBottom: '40px', fontWeight: '600' }}>{t.philoTitle}</h4>
            <p ref={philoTextRef} style={{ fontFamily: '"Italiana", serif', fontSize: '3.8rem', maxWidth: '85%', lineHeight: '1.2', color: '#F8FAFC', fontWeight: '400' }}>"{t.philoText}"</p>
        </div>
        <h2 ref={worksTitleRef} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontFamily: '"Inter", sans-serif', fontSize: '1rem', color: '#F8FAFC', letterSpacing: '4px', textTransform: 'uppercase', opacity: 0, zIndex: 5, whiteSpace: 'nowrap' }}>{t.projTitle}</h2>
        <div ref={horizontalLineRef} style={{ position: 'absolute', top: '20%', left: 0, width: '0%', height: '1px', backgroundColor: '#334155', zIndex: 4 }}></div>
        
        {/* ESCENA 4: PROYECTOS */}
        {/* IMPORTANTE: pointerEvents: 'none' por defecto, y opacity maneja lo visual */}
        <div ref={scene4Ref} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 4, opacity: 0, pointerEvents: 'none', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
            <div ref={sliderRef} style={{ display: 'flex', paddingLeft: '5vw', gap: '10vw', willChange: 'transform' }}>
                
                {/* AGROSYSTEM LINK REAL */}
                <a href="https://agro-system-chi.vercel.app/" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', minWidth: '60vw', cursor: 'pointer' }}>
                        <div style={{ width: '100%', height: '55vh', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', position: 'relative', backgroundColor: '#0F172A' }}>
                            <img src="/projects/agrosystem.png" alt="Agrosystem" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease', filter: 'grayscale(20%)' }} onMouseEnter={(e) => { e.target.style.transform = 'scale(1.05)'; e.target.style.filter = 'grayscale(0%)'; }} onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.filter = 'grayscale(20%)'; }} />
                            <div style={{ position: 'absolute', bottom: '20px', right: '20px', backgroundColor: '#F8FAFC', color: '#0B1120', padding: '10px 20px', fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>Visit Live →</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '20px' }}>
                            <div><h3 style={{ fontFamily: '"Italiana", serif', fontSize: '3rem', color: '#F8FAFC', margin: 0 }}>{t.p1Title}</h3><span style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.8rem', color: '#64748B', letterSpacing: '2px' }}>{t.p1Sub}</span></div>
                            <p style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '1rem', color: '#94A3B8', maxWidth: '350px', textAlign: 'right', fontWeight: '300', lineHeight: '1.6' }}>{t.p1Desc}</p>
                        </div>
                    </div>
                </a>
                
                {/* HT AGRONEGOCIOS LINK REAL */}
                <a href="https://matiponcesk8.github.io/ht-agronegocios/" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', minWidth: '60vw', cursor: 'pointer' }}>
                        <div style={{ width: '100%', height: '55vh', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', position: 'relative', backgroundColor: '#0F172A' }}>
                            <img src="/projects/ht-agronegocios.png" alt="HT" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease', filter: 'grayscale(20%)' }} onMouseEnter={(e) => { e.target.style.transform = 'scale(1.05)'; e.target.style.filter = 'grayscale(0%)'; }} onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.filter = 'grayscale(20%)'; }} />
                            <div style={{ position: 'absolute', bottom: '20px', right: '20px', backgroundColor: '#F8FAFC', color: '#0B1120', padding: '10px 20px', fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>Visit Live →</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '20px' }}>
                            <div><h3 style={{ fontFamily: '"Italiana", serif', fontSize: '3rem', color: '#F8FAFC', margin: 0 }}>{t.p2Title}</h3><span style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.8rem', color: '#64748B', letterSpacing: '2px' }}>{t.p2Sub}</span></div>
                            <p style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '1rem', color: '#94A3B8', maxWidth: '350px', textAlign: 'right', fontWeight: '300', lineHeight: '1.6' }}>{t.p2Desc}</p>
                        </div>
                    </div>
                </a>
                 <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: '40vw' }}>
                    <h3 style={{ fontFamily: '"Italiana", serif', fontSize: '2rem', color: '#334155' }}>More works in progress...</h3>
                </div>
            </div>
        </div>

        {/* --- ESCENA 5: MARQUEE INFINITO --- */}
        <div ref={scene5Ref} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5, opacity: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', pointerEvents: 'none' }}>
             <div style={{ width: '100%', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                <h2 ref={marqueeRef} style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '6vw', color: '#1E293B', opacity: 0.3, textTransform: 'uppercase', margin: 0, fontWeight: '700', display: 'inline-block' }}>
                    {t.marqueeText} {t.marqueeText}
                </h2>
             </div>
        </div>

        {/* --- PORTAL SECRETO (BOTÓN) --- */}
        <div ref={secretPortalRef} style={{
            position: 'absolute',
            bottom: '20%', 
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            opacity: 0, 
            pointerEvents: 'none' // Empieza inactivo
        }}>
            <button 
                onClick={() => navigate('/blueprint')} 
                style={{
                    background: 'transparent',
                    border: 'none',
                    fontFamily: '"Space Grotesk", sans-serif',
                    fontSize: '0.8rem',
                    color: '#64748B', 
                    letterSpacing: '3px',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#F8FAFC'} 
                onMouseLeave={(e) => e.target.style.color = '#64748B'}
            >
                {t.secretBtn}
            </button>
        </div>

        {/* --- ESCENA 6: FOOTER --- */}
        {/* pointerEvents: none por defecto en el contenedor padre. */}
        <div ref={scene6Ref} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 6, opacity: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', pointerEvents: 'none' }}>
             <h4 ref={footerTitleRef} style={{ fontFamily: '"Inter", sans-serif', fontSize: '1rem', color: '#94A3B8', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '20px' }}>{t.footerCall}</h4>
             
             {/* SOLO TEXTO, NO LINK */}
             <div ref={footerActionRef}>
                <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '10vw', color: '#F8FAFC', margin: 0, lineHeight: 1, transition: 'transform 0.5s ease' }}>{t.footerAction}</h2>
             </div>

             <div ref={startBtnRef} style={{ marginTop: '60px' }}>
                 <button 
                    onClick={() => navigate('/contact')} // <-- TE LLEVA A LA PÁGINA DE CONTACTO
                    style={{ background: 'transparent', border: '1px solid #475569', color: '#F8FAFC', padding: '15px 40px', borderRadius: '50px', fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.9rem', letterSpacing: '2px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.3s ease' }} 
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F8FAFC'; e.currentTarget.style.color = '#0B1120'; }} 
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#F8FAFC'; }}
                 >
                    {t.startBtn} <span>→</span>
                 </button>
             </div>
        </div>

      </div>
      <div style={{ position: 'fixed', bottom: 30, left: '50%', transform: 'translateX(-50%)', color: 'inherit', mixBlendMode: 'difference', fontFamily: '"Inter", sans-serif', fontSize: '0.7rem', opacity: 0.5, letterSpacing: '3px', pointerEvents: 'none', zIndex: 10 }}>{t.scroll} ↓</div>
    </div>
  );
};

export default Home;