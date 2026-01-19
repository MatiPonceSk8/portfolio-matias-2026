import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Líneas de texto: Comandos REALES y AVANZADOS de macOS (Forensics & Kernel)
const hackerLines = [
    "matias@macbook-pro % sudo fs_usage -f filesys",
    "14:02:45.341  RdMeta[0]       /private/var/log/system.log .................... 0.003ms",
    "14:02:45.342  WrData[4]       /Users/matias/Library/Caches/CloudKit/....... 0.012ms",
    "matias@macbook-pro % sysctl -a | grep machdep.cpu.features",
    "machdep.cpu.features: FPU VME DE PSE TSC MSR PAE MCE CX8 APIC SEP MTRR PGE MCA CMOV PAT...",
    "matias@macbook-pro % kextstat | grep -v com.apple",
    "Index Refs Address            Size       Wired      Name (Version) UUID",
    "  182    0 0xffffff7f8465b000 0x5000     0x5000     org.virtualbox.kext.VBoxDrv (6.1.32)",
    "matias@macbook-pro % dtrace -n 'syscall::write:entry { printf(\"%s\", execname); }'",
    "dtrace: description 'syscall::write:entry ' matched 1 probe",
    "CPU     ID                    FUNCTION:NAME",
    "  0    456                      write:entry   Code Helper",
    "  2    456                      write:entry   WindowServer",
    "  1    456                      write:entry   kernel_task",
    "matias@macbook-pro % nvram -p | grep boot-args",
    "boot-args	-v debug=0x100 keepsyms=1",
    "matias@macbook-pro % lsof -i :8080 | grep LISTEN",
    "node      1345 matias   23u  IPv6 0x12345678      0t0  TCP *:http-alt (LISTEN)",
    "matias@macbook-pro % _"
];

const Blueprint = ({ language, setLanguage }) => {
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    // FORZAR SCROLL ARRIBA AL ENTRAR
    window.scrollTo(0, 0);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- REFERENCIAS ---
  const containerRef = useRef(null);
  const introRef = useRef(null);
  const manifestoRef = useRef(null); 
  
  // ACTO 1: INTELLECTUS
  const act1TransRef = useRef(null);
  const s1Ref = useRef(null);
  const analysisBgRef = useRef(null);
  const symbol1Ref = useRef(null); // Ref específica para el SVG 1

  // ACTO 2: FIRMITAS
  const act2TransRef = useRef(null);
  const s2Ref = useRef(null);
  const gridLinesRef = useRef(null);

  // ACTO 3: VENUSTAS
  const act3TransRef = useRef(null);
  const s3Ref = useRef(null);
  const venustasLightRef = useRef(null);
  const symbol3Ref = useRef(null); // Ref específica para el SVG 3

  // ACTO 4: REALITY CHECK (Apple Terminal)
  const act4Ref = useRef(null);

  const content = {
    en: {
      back: "← RETURN",
      introTitle: "THE BLUEPRINT",
      introSub: "The Architecture of the Invisible", 
      introShortPhrase: "ARS SINE SCIENTIA NIHIL EST", 
      
      manifestoTitle: "THE TREATISE",
      manifestoText: "It all begins in the void. An abstract idea floating in nothingness. What follows is the alchemical process of transmuting that invisible thought into a tangible, luminous reality.",

      act1Label: "I",
      s1Title: "INTELLECTUS",
      s1Subtitle: "THE CONCEPTION",
      s1Text: "The architecture exists before it is built. In the abstraction of the mind, the algorithm is born. It is the silence where the variable finds its purpose and the chaos of data finds its path.",
      
      act2Label: "II",
      s2Title: "FIRMITAS",
      s2Subtitle: "THE STRUCTURE",
      s2Text: "Syntax becomes matter. The database acts as bedrock, holding the weight of infinite transactions. A structure that does not yield to chaos, but contains it within strict walls of logic.",
      
      act3Label: "III",
      s3Title: "VENUSTAS",
      s3Subtitle: "THE ESSENCE",
      s3Text: "Logic learns to breathe. The binary rigidness dissolves into fluid motion. The interface is no longer a mechanism, but a natural extension of the intent. Intelligence made beautiful.",

      // ACTO 4: APPLE TERMINAL
      act4Prompt: "matias@macbook-pro %",
      act4Text1: "Yes, it looks beautiful. The illusion is perfect.",
      act4Text2: "But never forget the underlying truth:",
      act4Highlight: "Beauty is the output. Hard work is the source code.",
      act4Command: "./execute_reality.sh"
    },
    es: {
      back: "← VOLVER",
      introTitle: "EL PLANO MAESTRO",
      introSub: "La Arquitectura de lo Invisible", 
      introShortPhrase: "ARS SINE SCIENTIA NIHIL EST", 
      
      manifestoTitle: "EL TRATADO",
      manifestoText: "Todo comienza en el vacío. Una idea abstracta flotando en la nada. Lo que verás a continuación es el proceso alquímico de convertir ese pensamiento invisible en una realidad tangible y luminosa.",

      act1Label: "I",
      s1Title: "INTELLECTUS",
      s1Subtitle: "LA CONCEPCIÓN",
      s1Text: "La arquitectura existe antes de ser construida. En la abstracción de la mente, nace el algoritmo. Es el silencio donde la variable encuentra su propósito y el caos de datos encuentra su camino.",
      
      act2Label: "II",
      s2Title: "FIRMITAS",
      s2Subtitle: "LA ESTRUCTURA",
      s2Text: "La sintaxis se vuelve materia. La base de datos actúa como lecho de roca, sosteniendo el peso de infinitas transacciones. Una estructura que no cede ante el caos, sino que lo contiene en muros de lógica.",
      
      act3Label: "III",
      s3Title: "VENUSTAS",
      s3Subtitle: "LA ESENCIA",
      s3Text: "La lógica aprende a respirar. La rigidez binaria se disuelve en movimiento fluido. La interfaz deja de ser un mecanismo para convertirse en una extensión natural de la intención. Inteligencia hecha belleza.",

      // ACTO 4: APPLE TERMINAL
      act4Prompt: "matias@macbook-pro %",
      act4Text1: "Sí, se ve hermoso. La ilusión es perfecta.",
      act4Text2: "Pero nunca olvides la verdad subyacente:",
      act4Highlight: "La belleza es el resultado. El trabajo duro es el código fuente.",
      act4Command: "./ejecutar_realidad.sh"
    }
  };

  const t = content[language] || content.en;

  // --- ANIMACIÓN ---
  useEffect(() => {
    if (!window.anime) return;

    // --- SETUP PREVIO DE SVG PARA EVITAR SALTOS ---
    const prepareSVG = (ref) => {
        if(ref.current) {
            ref.current.querySelectorAll('path, circle, line, rect').forEach(p => {
                const len = p.getTotalLength();
                p.style.strokeDasharray = len;
                p.style.strokeDashoffset = len;
            });
        }
    };

    // Setup Acto 1 (Partículas y SVG)
    prepareSVG(symbol1Ref); // IMPORTANTE: Preparar Symbol 1
    const analysisContainer = analysisBgRef.current;
    if (analysisContainer) {
        analysisContainer.innerHTML = '';
        for(let i=0; i<30; i++) {
            const div = document.createElement('div');
            div.style.position = 'absolute';
            div.style.left = `${Math.random() * 100}%`;
            div.style.top = `${Math.random() * 100}%`;
            div.style.width = '2px';
            div.style.height = '2px';
            div.style.background = '#fff';
            div.style.opacity = Math.random() * 0.5;
            div.style.boxShadow = '0 0 10px #fff';
            analysisContainer.appendChild(div);
        }
    }
    
    // Setup Acto 2 (SVG)
    if(gridLinesRef.current) prepareSVG(gridLinesRef);
    if(act2TransRef.current) {
        const s2Svg = act2TransRef.current.querySelector('svg');
        if(s2Svg) s2Svg.querySelectorAll('rect, line').forEach(p => {
             const len = p.getTotalLength();
             p.style.strokeDasharray = len;
             p.style.strokeDashoffset = len;
        });
    }

    // Setup Acto 3 (SVG)
    prepareSVG(symbol3Ref);

    // === TIMELINE DE ENTRADA (AUTO-PLAY) ===
    const introTl = window.anime.timeline({ autoplay: true, easing: 'easeOutExpo' });
    introTl
    .add({
        targets: '#intro-frame rect, #intro-frame line',
        strokeDashoffset: [window.anime.setDashoffset, 0],
        opacity: [0, 1],
        duration: 2500,
        delay: 200
    })
    .add({
        targets: '#intro-frame text',
        opacity: [0, 0.6],
        duration: 1000,
    }, '-=1500')
    .add({
        targets: introRef.current.querySelectorAll('h1, h2, h3'),
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1500,
        delay: window.anime.stagger(200)
    }, '-=1800');


    // === TIMELINE DE SCROLL (INTERACTIVA) ===
    const scrollTl = window.anime.timeline({ autoplay: false, easing: 'linear' });

    scrollTl
    // 1. SALIDA DE PORTADA -> ENTRADA MANIFIESTO
    .add({ 
        targets: [introRef.current, '#intro-frame'], 
        opacity: [1, 0], 
        scale: [1, 0.95], 
        filter: ['blur(0px)', 'blur(10px)'], 
        duration: 800 
    })
    .add({
        targets: manifestoRef.current,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800
    }, '-=400')
    
    // 2. SALIDA MANIFIESTO -> ENTRADA ACTO 1 (FONDO NEGRO)
    .add({
        targets: manifestoRef.current,
        opacity: 0,
        translateY: -30,
        filter: 'blur(10px)',
        duration: 800,
        delay: 500 
    })
    .add({ targets: containerRef.current, backgroundColor: ['#0B1120', '#050505'], duration: 800 }, '-=600')

    // === ACTO I: INTELLECTUS (SOLUCIONADO EL SALTO) ===
    .add({ targets: act1TransRef.current, opacity: [0, 1], scale: [0.9, 1], duration: 600 })
    // Usamos el ref directo para asegurar el target, y valores numéricos simples
    .add({ targets: symbol1Ref.current.querySelectorAll('circle, path'), strokeDashoffset: [window.anime.setDashoffset, 0], duration: 1500, easing: 'easeInOutQuart' }, '-=400')
    .add({ targets: act1TransRef.current, opacity: 0, scale: 1.2, filter: 'blur(10px)', duration: 600, delay: 500 })
    .add({ targets: s1Ref.current, opacity: [0, 1], duration: 800 })
    .add({ targets: analysisBgRef.current.children, opacity: [0, 0.6], translateY: [50, 0], delay: window.anime.stagger(20), duration: 1000 }, '-=600')
    .add({ targets: s1Ref.current, opacity: 0, translateY: -50, duration: 600, delay: 800 })

    // === ACTO II: FIRMITAS ===
    .add({ targets: containerRef.current, backgroundColor: ['#050505', '#1E293B'], duration: 1000 }, '-=600')
    .add({ targets: act2TransRef.current, opacity: [0, 1], scale: [0.9, 1], duration: 600 })
    .add({ targets: '#symbol-2 rect, #symbol-2 line', strokeDashoffset: [window.anime.setDashoffset, 0], duration: 1500, easing: 'easeInOutQuart' }, '-=400')
    .add({ targets: act2TransRef.current, opacity: 0, scale: 1.2, filter: 'blur(10px)', duration: 600, delay: 500 })
    .add({ targets: s2Ref.current, opacity: [0, 1], duration: 800 })
    .add({ targets: gridLinesRef.current.querySelectorAll('line, rect'), strokeDashoffset: [window.anime.setDashoffset, 0], duration: 2000, easing: 'easeOutExpo' }, '-=600')
    .add({ targets: s2Ref.current, opacity: 0, scale: 0.9, duration: 600, delay: 800 })

    // === ACTO III: VENUSTAS ===
    .add({ targets: containerRef.current, backgroundColor: ['#1E293B', '#F8FAFC'], duration: 1000 }, '-=600')
    .add({ targets: act3TransRef.current, opacity: [0, 1], scale: [0.9, 1], duration: 600 })
    .add({ targets: symbol3Ref.current.querySelectorAll('path, circle'), strokeDashoffset: [window.anime.setDashoffset, 0], duration: 2000, easing: 'easeOutQuart' }, '-=400')
    .add({ targets: act3TransRef.current, opacity: 0, scale: 1.2, filter: 'blur(10px)', duration: 600, delay: 500 })
    .add({ targets: s3Ref.current, opacity: [0, 1], duration: 800 })
    .add({ targets: venustasLightRef.current, opacity: [0, 0.6], scale: [0.8, 1], duration: 2000 }, '-=800')
    
    // === ACTO IV: MAC TERMINAL (REALITY CHECK) ===
    .add({}, '+=500')
    .add({
        targets: s3Ref.current,
        textShadow: [
            '0 0 transparent',
            '-5px 0 rgba(255,0,0,0.7), 5px 0 rgba(0,255,255,0.7)', 
            '-3px 2px rgba(255,0,0,0.5), 3px -2px rgba(0,255,255,0.5)',
            '0 0 transparent'
        ],
        skewX: [0, 2, -2, 1, -1, 0],
        scale: [1, 1.02, 0.98, 1],
        filter: ['blur(0px)', 'blur(2px) contrast(150%)', 'blur(0px)'],
        duration: 600,
        easing: 'easeInOutSine'
    })
    .add({
        targets: containerRef.current,
        backgroundColor: ['#F8FAFC', '#121212'], 
        duration: 50,
        easing: 'linear'
    }, '-=100')
    .add({ targets: s3Ref.current, opacity: 0, duration: 50 }, '-=50')
    .add({
        targets: act4Ref.current,
        opacity: [0, 1],
        duration: 200, 
        begin: () => { if(act4Ref.current) act4Ref.current.style.pointerEvents = 'auto'; }
    })
    .add({
        targets: '.hacker-line',
        opacity: [0, 1],
        translateY: [-10, 0],
        delay: window.anime.stagger(40), 
        duration: 100,
        easing: 'linear'
    })
    .add({
        targets: ['.final-prompt', '.final-msg-1', '.final-msg-2'],
        opacity: [0, 1],
        delay: window.anime.stagger(800),
        duration: 500,
        easing: 'linear'
    }, '+=600')
    .add({
        targets: '.final-highlight',
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 1000,
        easing: 'easeOutExpo'
    }, '+=200')
    .add({
        targets: '#terminal-btn',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        delay: 500,
        easing: 'easeOutExpo'
    });

    const handleScroll = () => {
      if (!containerRef.current) return;
      const totalScroll = document.body.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const percent = currentScroll / totalScroll;
      setScrollProgress(percent);
      scrollTl.seek(scrollTl.duration * percent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [language]);

  // --- ESTILOS ---
  // AÑADIDO Z-INDEX 5 A FULLSCREEN PARA ASEGURAR QUE EL CONTENIDO ESTÉ POR ENCIMA DEL BACKGROUND PERO DEBAJO DE LAS TRANSICIONES
  const fullScreen = { position: 'absolute', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', zIndex: 5 };
  
  const transContainerStyle = { 
      position: 'absolute', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', 
      opacity: 0, zIndex: 20, pointerEvents: 'none'
  };
  const hugeRomanStyle = { fontFamily: '"Italiana", serif', fontSize: isMobile ? '20vw' : '10vw', margin: 0, lineHeight: 1, zIndex: 2 };
  const symbolSvgStyle = { position: 'absolute', width: isMobile ? '80vw' : '40vw', height: isMobile ? '80vw' : '40vw', opacity: 0.15, zIndex: 1 };

  const textContainerStyle = { position: 'relative', zIndex: 5, maxWidth: '800px', padding: isMobile ? '20px' : '40px', width: isMobile ? '85%' : 'auto' };
  const headingStyle = { fontSize: isMobile ? '2.5rem' : '4.5rem', margin: 0, fontFamily: '"Italiana", serif', lineHeight: 1 };
  const subHeadingStyle = { fontFamily: '"Space Grotesk", sans-serif', fontSize: isMobile ? '0.8rem' : '1rem', letterSpacing: '4px', textTransform: 'uppercase', marginTop: '15px', marginBottom: isMobile ? '20px' : '40px', display: 'block', fontWeight: 500 };
  const paragraphStyle = { fontFamily: '"Playfair Display", serif', fontSize: isMobile ? '1.1rem' : '1.5rem', lineHeight: '1.6', fontWeight: '400', textAlign: 'justify' };

  const getTitleSize = () => {
      if (!isMobile) return '7vw'; 
      return language === 'es' ? '12vw' : '13vw';
  };

  // ESTILOS APPLE TERMINAL
  const terminalTextColor = '#F0F0F0'; 
  const highlightColor = '#4ADE80'; 

  const terminalContainerStyle = {
      position: 'absolute',
      inset: 0, 
      backgroundColor: 'rgba(15, 15, 15, 0.98)', 
      backdropFilter: 'blur(20px)',
      fontFamily: '"Fira Code", monospace',
      fontSize: isMobile ? '0.7rem' : '0.9rem',
      color: terminalTextColor,
      display: 'flex',
      flexDirection: 'column', 
      padding: 0,
      zIndex: 9999 
  };

  const terminalHeaderStyle = {
      width: '100%',
      height: '32px',
      background: 'linear-gradient(to bottom, #3a3a3a, #2b2b2b)',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '15px',
      flexShrink: 0,
      borderBottom: '1px solid #000'
  };

  const macDotStyle = { width: '12px', height: '12px', borderRadius: '50%', marginRight: '8px', cursor: 'pointer' };

  const terminalBodyStyle = {
      padding: isMobile ? '15px' : '30px',
      paddingTop: '20px', 
      flexGrow: 1, 
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      lineHeight: '1.5'
  };


  return (
    <div ref={containerRef} style={{ height: isMobile ? '5200vh' : '4400vh', backgroundColor: '#0B1120', position: 'relative' }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Cormorant+Garamond:wght@300;400;600&family=Italiana&family=Pinyon+Script&family=Playfair+Display:ital,wght@0,400;1,400&family=Space+Grotesk:wght@300;500;700&family=Fira+Code:wght@400;600&display=swap');`}</style>

        {/* NAV */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', padding: isMobile ? '20px' : '40px', display: 'flex', justifyContent: 'space-between', zIndex: 100, boxSizing: 'border-box', mixBlendMode: 'difference', color: '#fff', opacity: scrollProgress > 0.9 ? 0 : 1, transition: 'opacity 0.5s' }}>
            <div onClick={() => navigate('/')} style={{ cursor: 'pointer', fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.8rem', letterSpacing: '3px', opacity: 0.8 }}>{t.back}</div>
            <div style={{ fontFamily: '"Inter", sans-serif', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer' }}>
                <span onClick={() => setLanguage('en')} style={{ opacity: language === 'en' ? 1 : 0.4 }}>EN</span> / <span onClick={() => setLanguage('es')} style={{ opacity: language === 'es' ? 1 : 0.4 }}>ES</span>
            </div>
        </div>

        {/* VISUALES */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>

            {/* === 0. PORTADA === */}
            <div ref={introRef} style={{ ...fullScreen, zIndex: 10, color: '#F8FAFC' }}>
                <svg id="intro-frame" style={{ position: 'absolute', width: isMobile ? '90%' : '60%', height: isMobile ? '60%' : '60%', pointerEvents: 'none' }}>
                    <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                    <rect x="15" y="15" width="calc(100% - 30px)" height="calc(100% - 30px)" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="5,5" />
                    <line x1="-10" y1="50%" x2="20" y2="50%" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                    <line x1="calc(100% - 20px)" y1="50%" x2="calc(100% + 10px)" y2="50%" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                    <line x1="50%" y1="-10" x2="50%" y2="20" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                    <text x="5" y="12" fill="rgba(255,255,255,0.3)" fontFamily="monospace" fontSize="8">FIG. A</text>
                    <text x="calc(100% - 30px)" y="12" fill="rgba(255,255,255,0.3)" fontFamily="monospace" fontSize="8">0x00</text>
                    <text x="50%" y="calc(100% + 15px)" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontFamily="monospace" fontSize="8">AXIS MUNDI</text>
                </svg>

                <div style={{ position: 'relative', textAlign: 'center', zIndex: 20, padding: '0 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                     <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: isMobile ? '0.7rem' : '0.8rem', color: '#94A3B8', letterSpacing: '6px', textTransform: 'uppercase', opacity: 0.8, margin: 0 }}>{t.introSub}</h2>
                     <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: getTitleSize(), fontWeight: '400', margin: '10px 0', lineHeight: 0.9, letterSpacing: '2px', textTransform: 'uppercase', color: '#F8FAFC' }}>{t.introTitle}</h1>
                     <h3 style={{ fontFamily: '"Cinzel", serif', fontSize: '0.8rem', color: '#64748B', letterSpacing: '4px', marginTop: '30px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '5px' }}>{t.introShortPhrase}</h3>
                </div>
            </div>

            {/* === 0.5. EL MANIFIESTO === */}
            <div ref={manifestoRef} style={{ ...fullScreen, opacity: 0, zIndex: 10, color: '#F8FAFC' }}>
                <div style={{ maxWidth: '600px', textAlign: 'center', padding: '20px' }}>
                    <h4 style={{ fontFamily: '"Cinzel", serif', fontSize: '1rem', color: '#D4AF37', letterSpacing: '4px', marginBottom: '30px' }}>{t.manifestoTitle}</h4>
                    <p style={{ fontFamily: '"Playfair Display", serif', fontSize: isMobile ? '1.2rem' : '1.8rem', lineHeight: '1.6', fontStyle: 'italic', color: '#E2E8F0' }}>"{t.manifestoText}"</p>
                    <div style={{ width: '2px', height: '60px', background: 'linear-gradient(to bottom, #fff, transparent)', margin: '40px auto 0' }}></div>
                </div>
            </div>

            {/* === I. INTELLECTUS === */}
            <div ref={act1TransRef} style={transContainerStyle}>
                <svg ref={symbol1Ref} id="symbol-1" style={symbolSvgStyle} viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="10" fill="#fff" />
                    <circle cx="100" cy="100" r="40" fill="none" stroke="#fff" strokeWidth="1" strokeDasharray="5,5" />
                    <circle cx="100" cy="100" r="70" fill="none" stroke="#fff" strokeWidth="0.5" />
                    <path d="M100,20 L100,180 M20,100 L180,100" stroke="#fff" strokeWidth="0.5" opacity="0.5"/>
                </svg>
                <h2 style={{...hugeRomanStyle, color: '#fff'}}>{t.act1Label}</h2>
            </div>
            <div ref={s1Ref} style={{ ...fullScreen, opacity: 0, color: '#F8FAFC' }}>
                <div ref={analysisBgRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}></div>
                <div style={{...textContainerStyle, textAlign: 'center'}}>
                    <span style={{...subHeadingStyle, color: '#94A3B8'}}>{t.s1Subtitle}</span>
                    <h2 style={headingStyle}>{t.s1Title}</h2>
                    <div style={{width: '50px', height: '1px', background:'#fff', margin:'30px auto'}}></div>
                    <p style={paragraphStyle}>{t.s1Text}</p>
                </div>
            </div>

            {/* === II. FIRMITAS === */}
            <div ref={act2TransRef} style={transContainerStyle}>
                <svg id="symbol-2" style={symbolSvgStyle} viewBox="0 0 200 200">
                    <rect x="60" y="20" width="80" height="10" fill="none" stroke="#94A3B8" strokeWidth="1" />
                    <rect x="65" y="170" width="70" height="10" fill="none" stroke="#94A3B8" strokeWidth="1" />
                    <line x1="70" y1="30" x2="70" y2="170" stroke="#94A3B8" strokeWidth="1" />
                    <line x1="130" y1="30" x2="130" y2="170" stroke="#94A3B8" strokeWidth="1" />
                    <line x1="85" y1="30" x2="85" y2="170" stroke="#94A3B8" strokeWidth="0.5" />
                    <line x1="100" y1="30" x2="100" y2="170" stroke="#94A3B8" strokeWidth="0.5" />
                    <line x1="115" y1="30" x2="115" y2="170" stroke="#94A3B8" strokeWidth="0.5" />
                </svg>
                <h2 style={{...hugeRomanStyle, color: '#CBD5E1'}}>{t.act2Label}</h2>
            </div>
            <div ref={s2Ref} style={{ ...fullScreen, opacity: 0, color: '#E2E8F0' }}>
                <svg ref={gridLinesRef} style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.2 }} viewBox="0 0 1000 600">
                    <line x1="0" y1="100" x2="1000" y2="100" stroke="#fff" strokeWidth="0.5" />
                    <line x1="0" y1="300" x2="1000" y2="300" stroke="#fff" strokeWidth="0.5" />
                    <line x1="0" y1="500" x2="1000" y2="500" stroke="#fff" strokeWidth="0.5" />
                    <rect x="400" y="150" width="200" height="300" fill="none" stroke="#fff" strokeWidth="1" />
                </svg>
                <div style={{...textContainerStyle, textAlign: 'left', borderLeft: '2px solid #fff', paddingLeft: '40px'}}>
                    <span style={{...subHeadingStyle, color: '#94A3B8'}}>{t.s2Subtitle}</span>
                    <h2 style={headingStyle}>{t.s2Title}</h2>
                    <p style={paragraphStyle}>{t.s2Text}</p>
                </div>
            </div>

            {/* === III. VENUSTAS === */}
            <div ref={act3TransRef} style={transContainerStyle}>
                <svg ref={symbol3Ref} id="symbol-3" style={symbolSvgStyle} viewBox="0 0 200 200">
                    <path d="M100,10 C100,60 140,100 190,100 C140,100 100,140 100,190 C100,140 60,100 10,100 C60,100 100,60 100,10 Z" fill="none" stroke="#D1C7B7" strokeWidth="1" />
                    <circle cx="100" cy="100" r="20" fill="none" stroke="#D1C7B7" strokeWidth="0.5" />
                </svg>
                <h2 style={{...hugeRomanStyle, color: '#0B1120'}}>{t.act3Label}</h2>
            </div>
            <div ref={s3Ref} style={{ ...fullScreen, opacity: 0, color: '#0B1120' }}>
                <div ref={venustasLightRef} style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.2) 0%, rgba(255,255,255,0) 70%)', opacity: 0 }}></div>
                <div style={{...textContainerStyle, textAlign: 'center'}}>
                    <h2 style={{...headingStyle, fontSize: isMobile ? '3.5rem' : '6rem'}}>{t.s3Title}</h2>
                    <span style={{...subHeadingStyle, color: '#888', justifyContent: 'center', display: 'flex'}}>{t.s3Subtitle}</span>
                    <p style={{...paragraphStyle, textAlign: 'center'}}>"{t.s3Text}"</p>
                </div>
            </div>

            {/* === IV. APPLE TERMINAL (REALITY CHECK - FULL SCREEN) === */}
            <div ref={act4Ref} style={{ ...fullScreen, opacity: 0, pointerEvents: 'none' }}>
                
                <div style={terminalContainerStyle}>
                    {/* Header Apple (Traffic Lights) */}
                    <div style={terminalHeaderStyle}>
                        <div style={{...macDotStyle, background: '#FF5F56'}}></div>
                        <div style={{...macDotStyle, background: '#FFBD2E'}}></div>
                        <div style={{...macDotStyle, background: '#27C93F'}}></div>
                        <span style={{ marginLeft: 'auto', marginRight: 'auto', color: '#ccc', fontSize: '0.8rem', fontWeight: '500' }}>matias — -zsh — 100%x100%</span>
                    </div>

                    {/* Body Terminal */}
                    <div style={terminalBodyStyle}>
                        {/* Líneas "Hacker" */}
                        <div style={{ marginBottom: '30px', opacity: 0.9 }}>
                            {hackerLines.map((line, i) => (
                                <div key={i} className="hacker-line" style={{ opacity: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word', marginBottom: '2px' }}>{line}</div>
                            ))}
                        </div>

                        {/* Mensaje Final */}
                        <div className="final-prompt" style={{ opacity: 0, color: terminalTextColor, marginTop: '20px' }}>
                            <span>{t.act4Prompt}</span> <span>echo "Truth"</span>
                        </div>
                        <div className="final-msg-1" style={{ opacity: 0, color: terminalTextColor, marginTop: '15px', fontSize: '1.1rem' }}>{t.act4Text1}</div>
                        <div className="final-msg-2" style={{ opacity: 0, color: terminalTextColor, fontSize: '1.1rem' }}>{t.act4Text2}</div>
                        
                        {/* Highlight en Verde Apple */}
                        <div className="final-highlight" style={{ opacity: 0, color: highlightColor, fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: 'bold', margin: '25px 0', lineHeight: 1.2 }}>
                            {t.act4Highlight} <span style={{animation: 'blink 1s infinite'}}>_</span>
                        </div>

                        {/* Botón Final */}
                        <div id="terminal-btn" style={{ opacity: 0, marginTop: '30px', color: terminalTextColor, fontSize: '1.1rem' }}>
                            <span>{t.act4Prompt}</span> 
                            <span 
                                onClick={() => navigate('/contact')}
                                style={{ color: highlightColor, cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold' }}
                            >
                                {t.act4Command}
                            </span>
                        </div>

                    </div>
                </div>
            </div>

        </div>

        <div style={{ position: 'fixed', bottom: 30, left: '50%', transform: 'translateX(-50%)', color: scrollProgress > 0.8 ? '#475569' : '#fff', mixBlendMode: 'difference', fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.8rem', zIndex: 100, opacity: scrollProgress > 0.05 && scrollProgress < 0.9 ? 0.6 : 0, transition: 'all 0.5s', whiteSpace: 'nowrap' }}>SCROLL TO EXPLORE ↓</div>
        
        <style>{`
            @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
            /* Ocultar barra de scroll */
            ::-webkit-scrollbar { width: 0px; background: transparent; } 
        `}</style>
    </div>
  );
};

export default Blueprint;