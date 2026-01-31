import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ language }) => {
    const navigate = useNavigate();

    // --- DETECTOR DE MÓVIL ---
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // --- REFERENCIAS DOM ---
    const containerRef = useRef(null);

    // Escenas
    const titleRef = useRef(null);
    const scene2Ref = useRef(null);
    const nameRef = useRef(null);
    const roleRef = useRef(null);
    const bioRef = useRef(null);
    const locationRef = useRef(null);
    const profileBtnRef = useRef(null); // <--- NUEVA REFERENCIA PARA EL BOTÓN

    const scene3Ref = useRef(null);
    const philoTitleRef = useRef(null);
    const philoTextRef = useRef(null);

    const scene4Ref = useRef(null); // Proyectos
    const sliderRef = useRef(null);
    const horizontalLineRef = useRef(null);
    const worksTitleRef = useRef(null);

    // --- NUEVAS REFERENCIAS PARA SECCIÓN BLUEPRINT ---
    const scene5Ref = useRef(null);
    const blueprintBgRef = useRef(null); // Fondo específico para esta sección
    const monolithRef = useRef(null);    // La tarjeta de vidrio

    const scene6Ref = useRef(null); // Footer
    const footerTitleRef = useRef(null);
    const footerActionRef = useRef(null);
    const startBtnRef = useRef(null);

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
            viewProfile: "VIEW PROFILE", // <--- NUEVO TEXTO

            scroll: 'SCROLL TO DISCOVER',
            philoTitle: 'The Philosophy',
            philoText: 'Aesthetics is not superficial; it is the first layer of intelligence.\nWe merge engineering logic with artistic sensibility to craft experiences that are not just used, but felt.',
            projTitle: 'Selected Works',
            p1Title: 'AGROSYSTEM',
            p1Sub: 'SAAS PLATFORM',
            p1Desc: 'A bespoke operating system for livestock management.',
            p2Title: 'HT AGRONEGOCIOS',
            p2Sub: 'CORPORATE IDENTITY',
            p2Desc: 'High-end corporate website featuring dynamic catalogs.',
            // NUEVOS TEXTOS BLUEPRINT
            bpTitle: 'THE BLUEPRINT',
            bpSub: 'EXPLORE THE ARCHITECTURE',

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
            viewProfile: "VER PERFIL", // <--- NUEVO TEXTO

            scroll: 'DESLIZA PARA DESCUBRIR',
            philoTitle: 'La Filosofía',
            philoText: 'La estética no es superficial, es la primera capa de la inteligencia.\nFusionamos la lógica de la ingeniería con la sensibilidad del arte para crear experiencias que no solo se usan, se sienten.',
            projTitle: 'Trabajos Seleccionados',
            p1Title: 'AGROSYSTEM',
            p1Sub: 'PLATAFORMA SAAS',
            p1Desc: 'Un sistema operativo a medida para la gestión ganadera.',
            p2Title: 'HT AGRONEGOCIOS',
            p2Sub: 'IDENTIDAD CORPORATIVA',
            p2Desc: 'Sitio web corporativo de alto nivel con catálogos dinámicos.',
            // NUEVOS TEXTOS BLUEPRINT
            bpTitle: 'EL PLANO MAESTRO',
            bpSub: 'EXPLORA LA ARQUITECTURA',

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
            if (!groupRef.current) return;
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

    // --- 2. TIMELINE SCROLL (OPTIMIZADO CON UPDATE) ---
    useEffect(() => {
        if (!window.anime) return;

        // Función auxiliar para gestionar clics según visibilidad (Fix del Scroll)
        // Función auxiliar para gestionar clics según visibilidad (Fix del Scroll)
        const managePointer = (ref) => {
            if (!ref.current) return;
            const opacity = parseFloat(ref.current.style.opacity);
            // Si no tiene opacidad definida, asumimos 1 (visible) a menos que se defina lo contrario
            const isVisible = !isNaN(opacity) ? opacity > 0.1 : true;
            ref.current.style.pointerEvents = isVisible ? 'auto' : 'none';
        };

        const tl = window.anime.timeline({
            autoplay: false,
            easing: 'linear',
            // ESTA ES LA CLAVE: Se ejecuta en cada frame del scroll
            update: () => {
                managePointer(scene2Ref); // Intro / Perfil
                managePointer(worksTitleRef); // Título flotante
                managePointer(horizontalLineRef); // Línea flotante
                managePointer(scene4Ref); // Proyectos
                managePointer(scene5Ref); // Blueprint / Monolito
                managePointer(scene6Ref); // Footer
            }
        });

        tl
            // ACTO 1: Intro
            .add({ targets: titleRef.current, scale: [1, 2], opacity: [1, 0], filter: ['blur(0px)', 'blur(10px)'], duration: 1000 })

            // ACTO 2: Manifiesto (Identidad)
            .add({ targets: scene2Ref.current, opacity: [0, 1], duration: 100 }, '-=500')
            .add({ targets: nameRef.current, translateY: ['50px', '0px'], opacity: [0, 1], duration: 800, easing: 'easeOutQuart' })
            .add({ targets: roleRef.current, opacity: [0, 1], duration: 600 }, '-=600')
            .add({ targets: bioRef.current, translateY: ['20px', '0px'], opacity: [0, 1], duration: 800 }, '-=400')
            .add({ targets: locationRef.current, opacity: [0, 1], duration: 800 }, '-=600')
            // ANIMACIÓN DE ENTRADA DEL NUEVO BOTÓN
            .add({ targets: profileBtnRef.current, opacity: [0, 1], translateY: [20, 0], duration: 800 }, '-=600')

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
            .add({ targets: worksTitleRef.current, top: ['50%', '8%'], left: ['50%', isMobile ? '50%' : '20%'], transform: ['translate(-50%, -50%)', isMobile ? 'translate(-50%, 0%)' : 'translate(0%, 0%)'], scale: [2, 0.6], color: ['#F8FAFC', '#64748B'], duration: 1500, easing: 'easeInOutCubic' })
            .add({ targets: horizontalLineRef.current, width: ['0%', '100%'], duration: 1000, easing: 'easeInOutExpo' }, '-=1000')

            .add({
                targets: scene4Ref.current,
                opacity: [0, 1],
                duration: 500,
            }, '-=500')
            .add({ targets: sliderRef.current, translateX: ['0%', isMobile ? '-180%' : '-60%'], duration: 6000, easing: 'linear' })

            // --- SALIDA DE PROYECTOS ---
            .add({
                targets: [scene4Ref.current],
                opacity: 0,
                duration: 800,
            })
            .add({ targets: [horizontalLineRef.current, worksTitleRef.current], opacity: 0, duration: 800 }, '-=800')

            // --- ACTO 5: THE BLUEPRINT (MONOLITO) ---
            .add({
                targets: blueprintBgRef.current,
                opacity: [0, 1],
                duration: 1000,
                easing: 'easeInOutQuad'
            })
            .add({
                targets: scene5Ref.current,
                opacity: [0, 1],
                duration: 800,
            }, '-=800')
            .add({
                targets: monolithRef.current,
                opacity: [0, 1],
                scale: [0.95, 1],
                translateY: [30, 0],
                duration: 1200,
                easing: 'easeOutExpo'
            }, '-=400')

            // Pausa para apreciar
            .add({ duration: 1000 })

            // Salida del Blueprint hacia el Footer
            .add({
                targets: [scene5Ref.current, blueprintBgRef.current],
                opacity: 0,
                scale: 1.05,
                duration: 1000,
                easing: 'easeInOutQuad',
            })

            // --- ACTO 6: FOOTER ---
            .add({
                targets: scene6Ref.current,
                opacity: [0, 1],
                duration: 100,
            }, '-=500')
            .add({ targets: footerTitleRef.current, scale: [0.8, 1], opacity: [0, 1], duration: 1000, easing: 'easeOutExpo' })
            .add({ targets: footerActionRef.current, translateY: [20, 0], opacity: [0, 1], duration: 800 }, '-=600')
            .add({ targets: startBtnRef.current, opacity: [0, 1], translateY: [20, 0], duration: 800 }, '-=400');

        const handleScroll = () => {
            if (!containerRef.current) return;
            const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            tl.seek(tl.duration * scrollPercent);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [language, isMobile]);

    return (
        <div ref={containerRef} style={{ height: isMobile ? '1600vh' : '2200vh', backgroundColor: '#EDE8E4', position: 'relative' }}>

            {/* ESTILOS PARA LA TARJETA DE VIDRIO (GLASS MONOLITH) */}
            <style>{`
        .monolith-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.15);
            box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.5);
            transition: all 0.5s ease;
        }
        .monolith-card:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.4);
            transform: scale(1.02);
            box-shadow: 0 40px 70px -10px rgba(0, 0, 0, 0.6);
        }
        /* Línea decorativa animada al hover */
        .monolith-line {
            width: 40px; height: 1px; background: #fff; margin: 30px 0; opacity: 0.5; transition: width 0.4s ease;
        }
        .monolith-card:hover .monolith-line {
            width: 80px; opacity: 0.9;
        }
      `}</style>

            <div style={{
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                overflow: 'hidden', color: '#1a1a1a'
            }}>

                {/* SVG FONDO */}
                <svg ref={svgRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }} viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                    <g ref={patternARef}><path d="M-200 500 C 300 100, 800 800, 1600 300" stroke="#333" strokeWidth="2" strokeOpacity="0.4" fill="none" /><path d="M1600 700 C 1100 200, 500 900, -200 400" stroke="#333" strokeWidth="1.5" strokeOpacity="0.3" fill="none" /><path d="M0 800 C 400 400, 1000 600, 1440 100" stroke="#4a4a4a" strokeWidth="2.5" strokeOpacity="0.5" fill="none" /></g>
                    <g ref={patternBRef}><path d="M200 900 C 200 600, 600 300, 600 0" stroke="#333" strokeWidth="2" strokeOpacity="0.35" fill="none" /><path d="M1200 0 C 1200 300, 800 600, 800 900" stroke="#333" strokeWidth="2" strokeOpacity="0.35" fill="none" /><path d="M-100 450 C 400 450, 1000 450, 1540 450" stroke="#4a4a4a" strokeWidth="1.5" strokeOpacity="0.3" fill="none" /></g>
                    <g ref={patternCRef}><path d="M0 200 C 400 800, 1000 800, 1440 200" stroke="#333" strokeWidth="2" strokeOpacity="0.4" fill="none" /><path d="M1440 700 C 1000 100, 400 100, 0 700" stroke="#4a4a4a" strokeWidth="1.5" strokeOpacity="0.4" fill="none" /></g>
                </svg>

                {/* FONDO EXCLUSIVO PARA LA SECCIÓN BLUEPRINT */}
                <div ref={blueprintBgRef} style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'radial-gradient(circle at center, #1e2a45 0%, #020617 100%)', // Azul profundo elegante
                    zIndex: 9, opacity: 0, pointerEvents: 'none'
                }}></div>

                {/* ESCENAS 1-3 */}
                <h1 ref={titleRef} style={{ position: 'absolute', fontFamily: '"Playfair Display", serif', fontSize: isMobile ? '16vw' : '13vw', fontWeight: '900', margin: 0, zIndex: 2, lineHeight: 0.8, color: '#1a1a1a', whiteSpace: 'nowrap', letterSpacing: '-5px' }}>{t.mainTitle}</h1>

                <div ref={scene2Ref} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 3, opacity: 0, textAlign: 'center', padding: '0 20px', boxSizing: 'border-box' }}>
                    <h3 ref={roleRef} style={{ fontFamily: '"Inter", sans-serif', fontSize: isMobile ? '0.8rem' : '1rem', fontWeight: '500', letterSpacing: '4px', marginBottom: '15px', color: '#666', display: 'flex', alignItems: 'center', gap: '15px' }}><span style={{ height: '1px', width: '30px', background: '#999' }}></span>{t.role}<span style={{ height: '1px', width: '30px', background: '#999' }}></span></h3>

                    {/* NOMBRE (YA NO ES CLICKEABLE) */}
                    <h2
                        ref={nameRef}
                        style={{
                            fontFamily: '"Playfair Display", serif',
                            fontSize: isMobile ? '12vw' : '6vw',
                            fontWeight: '400',
                            margin: '10px 0',
                            color: '#1a1a1a',
                            fontStyle: 'italic',
                        }}
                    >
                        {t.name}
                    </h2>

                    <p ref={bioRef} style={{ fontFamily: '"Inter", sans-serif', fontSize: isMobile ? '1rem' : '1.5rem', maxWidth: isMobile ? '100%' : '600px', marginTop: '20px', lineHeight: '1.5', color: '#333', fontWeight: '300' }}>{t.bio}</p>
                    <div ref={locationRef} style={{ marginTop: '60px', fontFamily: '"Inter", sans-serif', fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 'bold', color: '#1a1a1a', borderBottom: '1px solid #1a1a1a', paddingBottom: '5px' }}>{t.location}</div>

                    {/* --- NUEVO BOTÓN DE PERFIL --- */}
                    <div ref={profileBtnRef} style={{ marginTop: '40px', opacity: 0 }}>
                        <button
                            onClick={() => navigate('/profile')}
                            style={{
                                background: 'transparent',
                                border: '1px solid rgba(26, 26, 26, 0.3)',
                                borderRadius: '30px', // Borde redondeado elegante
                                padding: '12px 35px',
                                color: '#1a1a1a',
                                fontFamily: '"Space Grotesk", sans-serif',
                                fontSize: '0.8rem',
                                letterSpacing: '2px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.borderColor = '#1a1a1a';
                                e.target.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.borderColor = 'rgba(26, 26, 26, 0.3)';
                                e.target.style.transform = 'scale(1)';
                            }}
                        >
                            {t.viewProfile}
                        </button>
                    </div>
                </div>

                <div ref={scene3Ref} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 3, opacity: 0, textAlign: 'center', pointerEvents: 'none', padding: '0 20px', boxSizing: 'border-box' }}>
                    <h4 ref={philoTitleRef} style={{ fontFamily: '"Inter", sans-serif', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '6px', color: '#94A3B8', marginBottom: '40px', fontWeight: '600' }}>{t.philoTitle}</h4>
                    <p ref={philoTextRef} style={{ fontFamily: '"Italiana", serif', fontSize: isMobile ? '1.8rem' : '3.8rem', maxWidth: isMobile ? '100%' : '85%', lineHeight: '1.2', color: '#F8FAFC', fontWeight: '400' }}>"{t.philoText}"</p>
                </div>

                <h2 ref={worksTitleRef} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontFamily: '"Inter", sans-serif', fontSize: '1rem', color: '#F8FAFC', letterSpacing: '4px', textTransform: 'uppercase', opacity: 0, zIndex: 5, whiteSpace: 'nowrap', pointerEvents: 'none' }}>{t.projTitle}</h2>
                <div ref={horizontalLineRef} style={{ position: 'absolute', top: '20%', left: 0, width: '0%', height: '1px', backgroundColor: '#334155', zIndex: 4, pointerEvents: 'none' }}></div>

                {/* ESCENA 4: PROYECTOS */}
                <div ref={scene4Ref} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 4, opacity: 0, pointerEvents: 'none', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                    <div ref={sliderRef} style={{ display: 'flex', paddingLeft: isMobile ? '5vw' : '5vw', gap: isMobile ? '5vw' : '10vw', willChange: 'transform' }}>

                        {/* AGROSYSTEM */}
                        <a href="https://agro-system-chi.vercel.app/" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', minWidth: isMobile ? '90vw' : '60vw', cursor: 'pointer' }}>
                                <div style={{ width: '100%', height: isMobile ? '28vh' : '55vh', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', position: 'relative', backgroundColor: '#0F172A' }}>
                                    <img src="/projects/agrosystem.png" alt="Agrosystem" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease', filter: 'grayscale(20%)' }} />
                                    <div style={{ position: 'absolute', bottom: '20px', right: '20px', backgroundColor: '#F8FAFC', color: '#0B1120', padding: '10px 20px', fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>Visit Live →</div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: isMobile ? '15px' : '0', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '20px' }}>
                                    <div><h3 style={{ fontFamily: '"Italiana", serif', fontSize: isMobile ? '2.5rem' : '3rem', color: '#F8FAFC', margin: 0 }}>{t.p1Title}</h3><span style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.8rem', color: '#64748B', letterSpacing: '2px' }}>{t.p1Sub}</span></div>
                                    <p style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: isMobile ? '1rem' : '1rem', color: '#94A3B8', maxWidth: '350px', textAlign: isMobile ? 'left' : 'right', fontWeight: '300', lineHeight: '1.6' }}>{t.p1Desc}</p>
                                </div>
                            </div>
                        </a>

                        {/* HT AGRONEGOCIOS */}
                        <a href="https://matiponcesk8.github.io/ht-agronegocios/" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', minWidth: isMobile ? '90vw' : '60vw', cursor: 'pointer' }}>
                                <div style={{ width: '100%', height: isMobile ? '28vh' : '55vh', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', position: 'relative', backgroundColor: '#0F172A' }}>
                                    <img src="/projects/ht-agronegocios.png" alt="HT" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease', filter: 'grayscale(20%)' }} />
                                    <div style={{ position: 'absolute', bottom: '20px', right: '20px', backgroundColor: '#F8FAFC', color: '#0B1120', padding: '10px 20px', fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>Visit Live →</div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: isMobile ? '15px' : '0', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '20px' }}>
                                    <div><h3 style={{ fontFamily: '"Italiana", serif', fontSize: isMobile ? '2.5rem' : '3rem', color: '#F8FAFC', margin: 0 }}>{t.p2Title}</h3><span style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.8rem', color: '#64748B', letterSpacing: '2px' }}>{t.p2Sub}</span></div>
                                    <p style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: isMobile ? '1rem' : '1rem', color: '#94A3B8', maxWidth: '350px', textAlign: isMobile ? 'left' : 'right', fontWeight: '300', lineHeight: '1.6' }}>{t.p2Desc}</p>
                                </div>
                            </div>
                        </a>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: isMobile ? '50vw' : '40vw' }}>
                            <h3 style={{ fontFamily: '"Italiana", serif', fontSize: isMobile ? '1.5rem' : '2rem', color: '#334155' }}>More works in progress...</h3>
                        </div>
                    </div>
                </div>

                {/* --- ESCENA 5: EL MONOLITO (Reemplaza a Marquee y Secret Portal) --- */}
                <div ref={scene5Ref} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10, opacity: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', pointerEvents: 'none' }}>

                    {/* TARJETA DE VIDRIO (Glass Monolith) */}
                    <div
                        ref={monolithRef}
                        className="monolith-card"
                        onClick={() => navigate('/blueprint')}
                        style={{
                            width: isMobile ? '80vw' : '45vw',
                            height: isMobile ? '45vh' : '55vh',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            borderRadius: '2px', // Bordes afilados, técnicos
                            padding: '20px'
                        }}
                    >
                        {/* Esquinas Técnicas */}
                        <div style={{ position: 'absolute', top: 15, left: 15, width: 10, height: 10, borderTop: '1px solid rgba(255,255,255,0.4)', borderLeft: '1px solid rgba(255,255,255,0.4)' }} />
                        <div style={{ position: 'absolute', top: 15, right: 15, width: 10, height: 10, borderTop: '1px solid rgba(255,255,255,0.4)', borderRight: '1px solid rgba(255,255,255,0.4)' }} />
                        <div style={{ position: 'absolute', bottom: 15, left: 15, width: 10, height: 10, borderBottom: '1px solid rgba(255,255,255,0.4)', borderLeft: '1px solid rgba(255,255,255,0.4)' }} />
                        <div style={{ position: 'absolute', bottom: 15, right: 15, width: 10, height: 10, borderBottom: '1px solid rgba(255,255,255,0.4)', borderRight: '1px solid rgba(255,255,255,0.4)' }} />

                        <h2 style={{ fontFamily: '"Italiana", serif', fontSize: isMobile ? '2.5rem' : '4rem', color: '#fff', margin: 0, letterSpacing: '4px', textAlign: 'center', zIndex: 2 }}>
                            {t.bpTitle}
                        </h2>

                        <div className="monolith-line"></div>

                        <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.75rem', color: '#cbd5e1', letterSpacing: '4px', textTransform: 'uppercase', zIndex: 2, textAlign: 'center' }}>
                            {t.bpSub}
                        </span>
                    </div>

                </div>

                {/* --- ESCENA 6: FOOTER --- */}
                <div ref={scene6Ref} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 6, opacity: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', pointerEvents: 'none', padding: '0 20px', textAlign: 'center', boxSizing: 'border-box' }}>
                    <h4 ref={footerTitleRef} style={{ fontFamily: '"Inter", sans-serif', fontSize: '1rem', color: '#94A3B8', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '20px' }}>{t.footerCall}</h4>

                    <div ref={footerActionRef}>
                        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: isMobile ? '15vw' : '10vw', color: '#F8FAFC', margin: 0, lineHeight: 1, transition: 'transform 0.5s ease' }}>{t.footerAction}</h2>
                    </div>

                    <div ref={startBtnRef} style={{ marginTop: '60px' }}>
                        <button
                            onClick={() => navigate('/contact')}
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