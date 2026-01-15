import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Blueprint = ({ language, setLanguage }) => {
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);

  // --- REFERENCIAS ---
  const containerRef = useRef(null);
  
  // PORTADA (Intro)
  const introRef = useRef(null);

  // ACTO 1: FUNDAMENTUM
  const act1IntroRef = useRef(null);
  const s1Ref = useRef(null);
  const s1BgNum = useRef(null);
  const codeBgRef = useRef(null);

  // ACTO 2: ORDINATIO
  const act2IntroRef = useRef(null);
  const s2Ref = useRef(null);
  const s2BgNum = useRef(null);
  const gridLinesRef = useRef(null);

  // ACTO 3: VENUSTAS (BOOM)
  const act3IntroRef = useRef(null);
  const s3Ref = useRef(null);
  const s3BgNum = useRef(null);
  const venustasLightRef = useRef(null);

  const content = {
    en: {
      back: "← RETURN",
      introTitle: "THE BLUEPRINT",
      introSub: "Anatomy of a Digital Soul",
      act1Label: "ACT I",
      s1Title: "FUNDAMENTUM",
      s1Subtitle: "THE SILENT FOUNDATION",
      s1Text: "Before the pixel, the axiom exists. In the silent depths of the server, an invisible skeleton is forged. Absolute truths. Data integrity. Binary perfection.",
      act2Label: "ACT II",
      s2Title: "ORDINATIO",
      s2Subtitle: "GEOMETRY & RHYTHM",
      s2Text: "Chaos submits to geometry. Through strict grids and the golden ratio, raw information is tamed. Every line acts as a silent guide; noise is stripped away, leaving only clarity.",
      act3Label: "ACT III",
      s3Title: "VENUSTAS",
      s3Subtitle: "THE ETHEREAL BREATH",
      s3Text: "The final layer. Utility dissolves into emotion. The interface becomes an extension of thought, guiding the eye through light and fluidity. Intelligence made beautiful.",
    },
    es: {
      back: "← VOLVER",
      introTitle: "EL PLANO MAESTRO",
      introSub: "Anatomía de un Alma Digital",
      act1Label: "ACTO I",
      s1Title: "FUNDAMENTUM",
      s1Subtitle: "EL CIMIENTO SILENCIOSO",
      s1Text: "Antes del píxel, existe el axioma. En las profundidades del servidor, se forja un esqueleto invisible. Verdades absolutas. Integridad de datos. Perfección binaria.",
      act2Label: "ACTO II",
      s2Title: "ORDINATIO",
      s2Subtitle: "GEOMETRÍA Y RITMO",
      s2Text: "El caos se somete a la geometría. A través de grillas estrictas y la proporción áurea, la información se doma. Cada línea es una guía; se elimina el ruido, queda la claridad.",
      act3Label: "ACTO III",
      s3Title: "VENUSTAS",
      s3Subtitle: "EL ALIENTO ETÉREO",
      s3Text: "La capa final. La utilidad se disuelve en emoción. La interfaz se convierte en una extensión del pensamiento, guiando el ojo a través de luz y fluidez. Inteligencia hecha belleza.",
    }
  };

  const t = content[language] || content.en;

  // --- ANIMACIÓN ---
  useEffect(() => {
    if (!window.anime) return;

    // 1. SETUP ELEMENTOS
    const codeContainer = codeBgRef.current;
    if (codeContainer) {
        codeContainer.innerHTML = '';
        const codeString = "0x1A // AXIOS ";
        for(let i=0; i<40; i++) {
            const div = document.createElement('div');
            div.innerText = codeString;
            div.style.opacity = Math.random() * 0.2;
            div.style.fontSize = '10px';
            div.style.fontFamily = 'monospace';
            div.style.position = 'absolute';
            div.style.left = `${Math.random() * 90}%`;
            div.style.top = `${Math.random() * 100}%`;
            codeContainer.appendChild(div);
        }
    }
    if(gridLinesRef.current) {
        gridLinesRef.current.querySelectorAll('line, circle, path').forEach(p => {
            p.style.strokeDasharray = p.getTotalLength();
            p.style.strokeDashoffset = p.getTotalLength();
        });
    }

    const tl = window.anime.timeline({ autoplay: false, easing: 'linear' });

    tl
    // === 0. PORTADA ===
    .add({ 
        targets: introRef.current, 
        opacity: [1, 0], 
        scale: [1, 1.05], 
        filter: ['blur(0px)', 'blur(15px)'], 
        duration: 1000 
    })

    // === TRANSICIONES (Igual que antes) ===
    .add({ targets: containerRef.current, backgroundColor: ['#0B1120', '#000000'], duration: 800 }, '-=800')
    .add({ targets: act1IntroRef.current, opacity: [0, 1], scale: [0.9, 1], duration: 500 })
    .add({ targets: act1IntroRef.current, opacity: 0, scale: 1.1, duration: 500, delay: 300 })
    .add({ targets: s1Ref.current, opacity: [0, 1], duration: 600 })
    .add({ targets: s1BgNum.current, translateX: ['100px', '0px'], opacity: [0, 0.15], duration: 1000, easing: 'easeOutExpo' }, '-=300')
    .add({ targets: s1Ref.current, opacity: 0, translateY: -30, duration: 600, delay: 600 }) 
    .add({ targets: containerRef.current, backgroundColor: ['#000000', '#E5E5E5'], duration: 800 }, '-=600')
    .add({ targets: act2IntroRef.current, opacity: [0, 1], scale: [0.9, 1], duration: 500 })
    .add({ targets: act2IntroRef.current, opacity: 0, scale: 1.1, duration: 500, delay: 300 })
    .add({ targets: s2Ref.current, opacity: [0, 1], duration: 600 })
    .add({ targets: s2BgNum.current, translateX: ['-100px', '0px'], opacity: [0, 0.05], duration: 1000, easing: 'easeOutExpo' }, '-=300')
    .add({ targets: gridLinesRef.current.querySelectorAll('line, circle'), strokeDashoffset: [window.anime.setDashoffset, 0], duration: 1500, easing: 'easeInOutSine' }, '-=1200')
    .add({ targets: s2Ref.current, opacity: 0, scale: 0.95, duration: 600, delay: 600 })
    .add({ targets: containerRef.current, backgroundColor: ['#E5E5E5', '#F5F5F0'], duration: 1000 }, '-=600')
    .add({ targets: act3IntroRef.current, opacity: [0, 1], scale: [0.9, 1], duration: 800 })
    .add({ targets: act3IntroRef.current, opacity: 0, scale: 1.1, filter: 'blur(5px)', duration: 800, delay: 300 })
    .add({ targets: s3Ref.current, opacity: [0, 1], duration: 800 })
    .add({ targets: venustasLightRef.current, opacity: [0, 0.8], scale: [0.8, 1], duration: 2000 }, '-=800')
    .add({ targets: s3BgNum.current, translateY: ['50px', '0px'], opacity: [0, 0.08], duration: 1000 }, '-=600')
    .add({ 
        targets: '.crystal-shard',
        opacity: [0, 1],
        scale: [0.5, 1],
        rotate: ['-20deg', '0deg'],
        delay: window.anime.stagger(100),
        duration: 1500,
        easing: 'easeOutQuart'
    }, '-=1500');

    const handleScroll = () => {
      if (!containerRef.current) return;
      const totalScroll = document.body.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const percent = currentScroll / totalScroll;
      setScrollProgress(percent);
      tl.seek(tl.duration * percent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [language]);

  // ESTILOS
  const fullScreen = { position: 'absolute', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' };
  const bigNumStyle = { position: 'absolute', fontSize: '35vw', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 'bold', opacity: 0, zIndex: 0, lineHeight: 0.8, pointerEvents: 'none' };
  const actTitleScreenStyle = { position: 'absolute', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: 0, zIndex: 10, pointerEvents: 'none' };
  const textContainerStyle = { position: 'relative', zIndex: 5, maxWidth: '800px', padding: '40px' };
  const headingStyle = { fontSize: '4.5rem', margin: 0, fontFamily: '"Italiana", serif', lineHeight: 1 };
  const subHeadingStyle = { fontFamily: '"Space Grotesk", sans-serif', fontSize: '1rem', letterSpacing: '4px', textTransform: 'uppercase', marginTop: '15px', marginBottom: '40px', display: 'block', fontWeight: 500 };
  const paragraphStyle = { fontFamily: '"Playfair Display", serif', fontSize: '1.4rem', lineHeight: '1.6', fontWeight: '400', textAlign: 'justify' };

  return (
    <div ref={containerRef} style={{ height: '2800vh', backgroundColor: '#0B1120', position: 'relative' }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Italiana&family=Playfair+Display:ital,wght@0,400;1,400&family=Space+Grotesk:wght@300;500;700&family=Pinyon+Script&display=swap');`}</style>

        {/* NAV */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', padding: '40px', display: 'flex', justifyContent: 'space-between', zIndex: 100, boxSizing: 'border-box', mixBlendMode: 'difference', color: '#fff' }}>
            <div onClick={() => navigate('/')} style={{ cursor: 'pointer', fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.8rem', letterSpacing: '3px', opacity: 0.8 }}>{t.back}</div>
            <div style={{ fontFamily: '"Inter", sans-serif', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer' }}>
                <span onClick={() => setLanguage('en')} style={{ opacity: language === 'en' ? 1 : 0.4 }}>EN</span> / <span onClick={() => setLanguage('es')} style={{ opacity: language === 'es' ? 1 : 0.4 }}>ES</span>
            </div>
        </div>

        {/* CONTENEDOR VISUAL */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>

            {/* === 0. PORTADA (FULL DA VINCI MODE) === */}
            <div ref={introRef} style={{ ...fullScreen, zIndex: 10, color: '#F8FAFC' }}>
                
                {/* CAPA DE ARTE: Llenamos toda la pantalla con diagramas */}
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                    
                    {/* 1. Dodecaedro Geométrico (Arriba Izquierda) - GRANDE */}
                    <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '45vw', opacity: 0.15 }}>
                        <svg viewBox="0 0 500 500" style={{ width: '100%' }}>
                            <polygon points="250,50 440,190 368,412 132,412 60,190" fill="none" stroke="#fff" strokeWidth="1" />
                            <line x1="250" y1="50" x2="250" y2="250" stroke="#fff" strokeWidth="0.5" />
                            <line x1="440" y1="190" x2="250" y2="250" stroke="#fff" strokeWidth="0.5" />
                            <line x1="368" y1="412" x2="250" y2="250" stroke="#fff" strokeWidth="0.5" />
                            <line x1="132" y1="412" x2="250" y2="250" stroke="#fff" strokeWidth="0.5" />
                            <line x1="60" y1="190" x2="250" y2="250" stroke="#fff" strokeWidth="0.5" />
                            <circle cx="250" cy="250" r="200" fill="none" stroke="#fff" strokeWidth="0.5" strokeDasharray="5,5" />
                            {/* Texto técnico */}
                            <text x="50" y="450" fill="#fff" fontFamily="'Pinyon Script', cursive" fontSize="18">figura solida. I</text>
                        </svg>
                    </div>

                    {/* 2. Estudio de Óptica y Perspectiva (Arriba Derecha) */}
                    <div style={{ position: 'absolute', top: '5%', right: '-5%', width: '40vw', opacity: 0.12 }}>
                        <svg viewBox="0 0 400 300" style={{ width: '100%' }}>
                             <line x1="0" y1="150" x2="400" y2="150" stroke="#fff" strokeWidth="1" />
                             <line x1="200" y1="0" x2="200" y2="300" stroke="#fff" strokeWidth="0.5" strokeDasharray="4,4" />
                             {/* Rayos convergentes */}
                             <line x1="0" y1="50" x2="200" y2="150" stroke="#fff" strokeWidth="0.3" />
                             <line x1="0" y1="250" x2="200" y2="150" stroke="#fff" strokeWidth="0.3" />
                             <line x1="400" y1="50" x2="200" y2="150" stroke="#fff" strokeWidth="0.3" />
                             <line x1="400" y1="250" x2="200" y2="150" stroke="#fff" strokeWidth="0.3" />
                             <circle cx="200" cy="150" r="30" fill="none" stroke="#fff" strokeWidth="1" />
                             <text x="220" y="40" fill="#fff" fontFamily="'Pinyon Script', cursive" fontSize="14">oculus artificialis</text>
                             {/* Bloque de texto denso */}
                             <text x="250" y="80" fill="#fff" fontFamily="'Pinyon Script', cursive" fontSize="10" opacity="0.7">
                                 lorem ipsum dolor sit amet, consectetur
                             </text>
                             <text x="250" y="95" fill="#fff" fontFamily="'Pinyon Script', cursive" fontSize="10" opacity="0.7">
                                 adipiscing elit sed do eiusmod tempor.
                             </text>
                        </svg>
                    </div>

                    {/* 3. Mecánica y Engranajes (Abajo Izquierda) */}
                    <div style={{ position: 'absolute', bottom: '-5%', left: '0%', width: '35vw', opacity: 0.15 }}>
                         <svg viewBox="0 0 300 300" style={{ width: '100%' }}>
                             <circle cx="150" cy="150" r="100" fill="none" stroke="#fff" strokeWidth="1" />
                             <circle cx="150" cy="150" r="80" fill="none" stroke="#fff" strokeWidth="0.5" />
                             <circle cx="150" cy="150" r="20" fill="none" stroke="#fff" strokeWidth="1" />
                             {/* Dientes del engranaje (simulados) */}
                             <path d="M150,50 L150,30 M150,250 L150,270 M50,150 L30,150 M250,150 L270,150" stroke="#fff" strokeWidth="2" />
                             <line x1="0" y1="300" x2="150" y2="150" stroke="#fff" strokeWidth="0.5" />
                             <text x="10" y="280" fill="#fff" fontFamily="'Pinyon Script', cursive" fontSize="16">machina elementum</text>
                         </svg>
                    </div>

                    {/* 4. Diagrama Central Grande (Fondo del Título) */}
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90vw', height: '90vh', opacity: 0.1, pointerEvents: 'none' }}>
                        <svg viewBox="0 0 1000 600" width="100%" height="100%">
                            {/* Líneas de cuadrícula arquitectónica */}
                            <line x1="100" y1="0" x2="100" y2="600" stroke="#fff" strokeWidth="0.2" />
                            <line x1="900" y1="0" x2="900" y2="600" stroke="#fff" strokeWidth="0.2" />
                            <line x1="0" y1="100" x2="1000" y2="100" stroke="#fff" strokeWidth="0.2" />
                            <line x1="0" y1="500" x2="1000" y2="500" stroke="#fff" strokeWidth="0.2" />
                            {/* Círculos concéntricos */}
                            <circle cx="500" cy="300" r="250" fill="none" stroke="#fff" strokeWidth="0.3" />
                            <circle cx="500" cy="300" r="400" fill="none" stroke="#fff" strokeWidth="0.1" />
                            {/* Triángulo áureo */}
                            <polygon points="500,50 800,550 200,550" fill="none" stroke="#fff" strokeWidth="0.2" />
                        </svg>
                    </div>

                    {/* 5. Notas Manuscritas (Relleno) */}
                    <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: '250px', textAlign: 'left', opacity: 0.5, fontFamily: "'Pinyon Script', cursive", color: '#fff', fontSize: '14px', lineHeight: '1.2' }}>
                        <p>1. Natura non facit saltus.</p>
                        <p>2. Omnia in mensura et numero.</p>
                        <p>3. Structura digitalis perfecta est.</p>
                        <div style={{ width: '100%', height: '1px', background: '#fff', margin: '10px 0', opacity: 0.5 }}></div>
                        <p style={{ fontSize: '12px', opacity: 0.8 }}>
                            Nota bene: codex est lex. Si fundamentum destruitur, tota structura cadit.
                        </p>
                    </div>
                </div>

                {/* TÍTULO PRINCIPAL (Encima de todo el arte) */}
                <div style={{ position: 'relative', textAlign: 'center', zIndex: 20 }}>
                     <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '11vw', margin: 0, lineHeight: 0.9, letterSpacing: '-4px', textShadow: '0 0 20px rgba(0,0,0,0.8)' }}>{t.introTitle}</h1>
                     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
                        <div style={{ width: '60px', height: '1px', background: '#94A3B8' }}></div>
                        <h2 style={{ fontFamily: '"Italiana", serif', fontSize: '1.8rem', color: '#94A3B8', letterSpacing: '4px', margin: 0 }}>{t.introSub}</h2>
                        <div style={{ width: '60px', height: '1px', background: '#94A3B8' }}></div>
                     </div>
                </div>
            </div>

            {/* === RESTO DE ACTOS (Igual) === */}
            <div ref={act1IntroRef} style={{...actTitleScreenStyle, color: '#F8FAFC'}}>
                <h2 style={{fontFamily: '"Space Grotesk", sans-serif', fontSize: '5vw', letterSpacing: '10px'}}>{t.act1Label}</h2>
            </div>
            <div ref={s1Ref} style={{ ...fullScreen, opacity: 0, color: '#F8FAFC' }}>
                <div ref={s1BgNum} style={{ ...bigNumStyle, right: '-5vw', bottom: '-10vh', color: '#1a1a1a' }}>I</div>
                <div ref={codeBgRef} style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }}></div>
                <div style={textContainerStyle}>
                    <h2 style={headingStyle}>{t.s1Title}</h2>
                    <span style={{...subHeadingStyle, color: '#00FF41'}}>{t.s1Subtitle}</span>
                    <p style={{...paragraphStyle, color: '#CBD5E1'}}>{t.s1Text}</p>
                </div>
            </div>
            <div ref={act2IntroRef} style={{...actTitleScreenStyle, color: '#1a1a1a'}}>
                <h2 style={{fontFamily: '"Space Grotesk", sans-serif', fontSize: '5vw', letterSpacing: '10px'}}>{t.act2Label}</h2>
            </div>
            <div ref={s2Ref} style={{ ...fullScreen, opacity: 0, color: '#1a1a1a' }}>
                <div ref={s2BgNum} style={{ ...bigNumStyle, left: '-5vw', top: '-10vh', color: '#ccc' }}>II</div>
                <svg ref={gridLinesRef} style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.4 }} viewBox="0 0 1000 600">
                    <line x1="0" y1="300" x2="1000" y2="300" stroke="#000" strokeWidth="1" />
                    <line x1="500" y1="0" x2="500" y2="600" stroke="#000" strokeWidth="1" />
                    <circle cx="500" cy="300" r="200" fill="none" stroke="#000" strokeWidth="1" />
                </svg>
                <div style={{...textContainerStyle, textAlign: 'right'}}>
                    <h2 style={headingStyle}>{t.s2Title}</h2>
                    <span style={{...subHeadingStyle, color: '#666', justifyContent: 'flex-end', display: 'flex'}}>{t.s2Subtitle}</span>
                    <p style={{...paragraphStyle, textAlign: 'right'}}>{t.s2Text}</p>
                </div>
            </div>
            <div ref={act3IntroRef} style={{...actTitleScreenStyle, color: '#0B1120'}}>
                <h2 style={{fontFamily: '"Italiana", serif', fontSize: '6vw', letterSpacing: '5px'}}>{t.act3Label}</h2>
            </div>
            <div ref={s3Ref} style={{ ...fullScreen, opacity: 0, color: '#0B1120' }}>
                <div ref={venustasLightRef} style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255,245,230,0.8) 0%, rgba(242,239,233,0) 70%)', opacity: 0, animation: 'pulseLight 8s infinite alternate ease-in-out' }}></div>
                <div ref={s3BgNum} style={{ ...bigNumStyle, right: '0', top: '50%', transform: 'translateY(-50%)', color: '#D1C7B7' }}>III</div>
                <div className="crystal-shard" style={{ position: 'absolute', top: '20%', left: '15%', width: '150px', height: '150px', background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.1))', backdropFilter: 'blur(10px)', borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', animation: 'rotateSlow 20s infinite linear' }}></div>
                <div className="crystal-shard" style={{ position: 'absolute', top: '60%', right: '20%', width: '200px', height: '200px', background: 'linear-gradient(45deg, rgba(255,255,255,0.8), rgba(255,255,255,0.2))', backdropFilter: 'blur(15px)', borderRadius: '63% 37% 54% 46% / 55% 48% 52% 45%', animation: 'rotateSlowReverse 25s infinite linear' }}></div>
                <div style={{...textContainerStyle, textAlign: 'center', background: 'rgba(255,255,255,0.3)', backdropFilter: 'blur(20px)', padding: '60px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
                    <h2 style={{...headingStyle, fontSize: '5rem', letterSpacing: '-1px'}}>{t.s3Title}</h2>
                    <span style={{...subHeadingStyle, color: '#555', justifyContent: 'center', display: 'flex', letterSpacing: '6px'}}>{t.s3Subtitle}</span>
                    <p style={{...paragraphStyle, textAlign: 'center', fontSize: '1.6rem', lineHeight: '1.5'}}>"{t.s3Text}"</p>
                </div>
            </div>
        </div>

        <div style={{ position: 'fixed', bottom: 30, left: '50%', transform: 'translateX(-50%)', color: '#fff', mixBlendMode: 'difference', fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.8rem', zIndex: 100, opacity: scrollProgress > 0.05 ? 0 : 0.6, transition: 'opacity 0.5s' }}>SCROLL TO EXPLORE ↓</div>
        
        <style>{`
            @keyframes rotateSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            @keyframes rotateSlowReverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
            @keyframes pulseLight { 0% { opacity: 0.4; transform: scale(0.9); } 100% { opacity: 0.8; transform: scale(1.1); } }
            .crystal-shard { box-shadow: 0 10px 30px rgba(0,0,0,0.1); border: 1px solid rgba(255,255,255,0.6); opacity: 0; }
        `}</style>
    </div>
  );
};

export default Blueprint;