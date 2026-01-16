import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Turnstile } from '@marsidev/react-turnstile';

const Contact = ({ language, setLanguage }) => {
  const navigate = useNavigate();
  
  // --- TU BACKEND REAL (GOOGLE APPS SCRIPT) ---
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwUe1BFVfzi881HsFnB_r8FJB7EZxxj-sP-mmD-DY9QvCrawY2ZYxBJTWJa2O6PkUGd/exec"; 

  // Referencias
  const containerRef = useRef(null);
  const mainContentRef = useRef(null);
  const titleSectionRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const thankYouRef = useRef(null); 

  // Estados
  const [token, setToken] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false); // Feedback visual de carga

  const texts = {
    en: {
      back: "Return",
      intro: "Let's Talk",
      subIntro: "Initiate a dialogue.",
      scroll: "Scroll",
      name: "First Name",
      lastname: "Last Name",
      email: "Email Address",
      subject: "Subject",
      idea: "Your Message",
      send: "Submit Proposal",
      sending: "Transmitting...", 
      security: "Secured by Cloudflare",
      options: {
        select: "Select subject...",
        job: "Hiring Proposal", 
        idea: "Project Collaboration",
        freelance: "Freelance",
        other: "Other"
      },
      tyTitle: "TRANSMISSION RECEIVED",
      tySubtitle: "Stand by for incoming connection.",
      tyBack: "Return to base"
    },
    es: {
      back: "Volver",
      intro: "Hablemos",
      subIntro: "Inicia un diálogo.",
      scroll: "Desliza",
      name: "Nombre",
      lastname: "Apellido",
      email: "Correo Electrónico",
      subject: "Asunto",
      idea: "Tu Mensaje",
      send: "Enviar Propuesta",
      sending: "Transmitiendo...",
      security: "Protegido por Cloudflare",
      options: {
        select: "Selecciona asunto...",
        job: "Propuesta Laboral",
        idea: "Colaboración",
        freelance: "Freelance",
        other: "Otro"
      },
      tyTitle: "TRANSMISIÓN RECIBIDA",
      tySubtitle: "Aguarde enlace entrante.",
      tyBack: "Volver a la base"
    }
  };

  const t = texts[language] || texts.en;

  // --- 1. ANIMACIONES INICIALES ---
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!window.anime) return;

    window.anime({
      targets: titleSectionRef.current,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 1500,
      easing: 'easeOutQuad'
    });

    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollY = window.scrollY;
      const windowH = window.innerHeight;
      const progress = Math.min(scrollY / (windowH * 0.8), 1); 

      // Interpolación Azul -> Verde Lacoste
      const r = 11 + (8 - 11) * progress;
      const g = 17 + (32 - 17) * progress;
      const b = 32 + (25 - 32) * progress;
      containerRef.current.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

      if (titleSectionRef.current) {
        titleSectionRef.current.style.opacity = 1 - progress;
        titleSectionRef.current.style.transform = `translateY(-${scrollY * 0.3}px)`;
      }
      if (scrollIndicatorRef.current) {
        scrollIndicatorRef.current.style.opacity = 1 - (progress * 2);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- 2. ANIMACIÓN DE "THANK YOU" ---
  useEffect(() => {
    if (isSubmitted && window.anime && thankYouRef.current) {
        thankYouRef.current.style.visibility = 'visible';
        const tl = window.anime.timeline({ easing: 'easeOutExpo' });
        
        tl.add({
            targets: thankYouRef.current.querySelectorAll('.ty-text'),
            translateY: ['100%', '0%'],
            opacity: [0, 1],
            duration: 1200,
            delay: window.anime.stagger(200)
        })
        .add({
            targets: thankYouRef.current.querySelector('.ty-line'),
            width: ['0%', '100px'],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeInOutQuad'
        }, '-=800')
        .add({
            targets: thankYouRef.current.querySelector('.ty-btn'),
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800
        }, '-=400');
    }
  }, [isSubmitted]);

  // --- 3. LÓGICA DE ENVÍO BLINDADA ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Si no hay token de Cloudflare, no enviamos nada
    if (!token) return; 
    
    setIsSending(true); // Feedback visual

    // Capturamos los datos
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        lastname: formData.get('lastname'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        idea: formData.get('idea')
    };

    try {
        // FETCH AL SCRIPT DE GOOGLE
        await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            body: JSON.stringify(data),
            mode: "no-cors", 
            headers: { "Content-Type": "application/json" }
        });

        // Éxito
        setIsSending(false);
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
        console.error("Error sending form:", error);
        setIsSending(false);
        alert("Transmission Error. Please check your connection.");
    }
  };


  // --- ESTILOS ---
  const accentColor = '#E3D5B6'; 
  const textColor = '#F0FDF4';   
  const inputContainerStyle = { marginBottom: '40px', position: 'relative' };
  const inputStyle = {
    width: '100%', background: 'transparent', border: 'none',
    borderBottom: '1px solid rgba(227, 213, 182, 0.2)', color: textColor,
    fontFamily: '"Inter", sans-serif', fontSize: '1.2rem', padding: '15px 0',
    outline: 'none', transition: 'all 0.4s ease'
  };
  const labelStyle = {
    display: 'block', fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.7rem',
    letterSpacing: '2px', color: accentColor, opacity: 0.7, marginBottom: '8px', textTransform: 'uppercase'
  };
  const handleFocus = (e) => { e.target.style.borderBottom = `1px solid ${accentColor}`; };
  const handleBlur = (e) => { if(!e.target.value) e.target.style.borderBottom = '1px solid rgba(227, 213, 182, 0.2)'; };

  return (
    <div ref={containerRef} style={{ minHeight: '200vh', backgroundColor: '#0B1120', position: 'relative', color: textColor, transition: 'background-color 0.1s linear' }}>
      
      {/* CONTENEDOR PRINCIPAL */}
      <div ref={mainContentRef} style={{ 
          transition: 'filter 0.8s ease, opacity 0.8s ease', 
          filter: isSubmitted ? 'blur(15px) brightness(0.6)' : 'none', 
          pointerEvents: isSubmitted ? 'none' : 'auto' 
      }}>
        
        {/* HEADER */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', padding: '40px 60px', display: 'flex', justifyContent: 'space-between', zIndex: 50, boxSizing: 'border-box' }}>
            <div onClick={() => !isSubmitted && navigate('/')} style={{ cursor: 'pointer', fontFamily: '"Inter", sans-serif', fontSize: '0.85rem', letterSpacing: '1px', opacity: 0.8, color: textColor }}>{t.back}</div>
            <div style={{ fontFamily: '"Inter", sans-serif', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer', color: accentColor }}>
                <span onClick={() => !isSubmitted && setLanguage && setLanguage('en')} style={{ opacity: language === 'en' ? 1 : 0.4 }}>EN</span> 
                <span style={{ margin: '0 8px', opacity: 0.4 }}>/</span> 
                <span onClick={() => !isSubmitted && setLanguage && setLanguage('es')} style={{ opacity: language === 'es' ? 1 : 0.4 }}>ES</span>
            </div>
        </div>

        {/* INTRO */}
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: 10 }}>
            <div ref={titleSectionRef} style={{ textAlign: 'center' }}>
                <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '3.5rem', fontWeight: '400', margin: '0 0 20px 0', color: textColor, fontStyle: 'italic', letterSpacing: '-1px' }}>{t.intro}</h1>
                <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '0.9rem', color: accentColor, letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.8 }}>{t.subIntro}</p>
            </div>
            <div ref={scrollIndicatorRef} style={{ position: 'absolute', bottom: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontFamily: '"Inter", sans-serif', fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: accentColor, opacity: 0.7 }}>{t.scroll}</span>
                <div style={{ width: '1px', height: '60px', background: `linear-gradient(to bottom, ${accentColor}, transparent)` }}></div>
            </div>
        </div>

        {/* FORMULARIO */}
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', position: 'relative', zIndex: 20 }}>
            <div style={{ maxWidth: '700px', width: '100%' }}>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                    
                    <div style={inputContainerStyle}><label style={labelStyle}>{t.name}</label><input type="text" name="name" required style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} /></div>
                    <div style={inputContainerStyle}><label style={labelStyle}>{t.lastname}</label><input type="text" name="lastname" required style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} /></div>
                    <div style={{...inputContainerStyle, gridColumn: '1 / -1'}}><label style={labelStyle}>{t.email}</label><input type="email" name="email" required style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} /></div>
                    
                    <div style={{...inputContainerStyle, gridColumn: '1 / -1'}}>
                        <label style={labelStyle}>{t.subject}</label>
                        <div style={{ position: 'relative' }}>
                            <select required name="subject" style={{...inputStyle, cursor: 'pointer', appearance: 'none', borderRadius: 0, color: textColor}} onFocus={handleFocus} onBlur={handleBlur}>
                                <option value="" disabled selected style={{color: '#000'}}>{t.options.select}</option>
                                <option value="job" style={{color: '#0B2822'}}>{t.options.job}</option>
                                <option value="idea" style={{color: '#0B2822'}}>{t.options.idea}</option>
                                <option value="freelance" style={{color: '#0B2822'}}>{t.options.freelance}</option>
                                <option value="other" style={{color: '#0B2822'}}>{t.options.other}</option>
                            </select>
                            <span style={{ position: 'absolute', right: 0, top: '15px', color: accentColor, fontSize: '0.8rem', pointerEvents: 'none' }}>↓</span>
                        </div>
                    </div>
                    
                    <div style={{...inputContainerStyle, gridColumn: '1 / -1'}}>
                        <label style={labelStyle}>{t.idea}</label>
                        <textarea required name="idea" rows="1" style={{...inputStyle, resize: 'none', lineHeight: '1.5', overflow: 'hidden'}} onInput={(e) => {e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'}} onFocus={handleFocus} onBlur={handleBlur} />
                    </div>

                    {/* CLOUDFLARE TURNSTILE (USANDO VARIABLE DE ENTORNO) */}
                    <div style={{ gridColumn: '1 / -1', marginBottom: '20px' }}>
                        <Turnstile 
                            siteKey={import.meta.env.VITE_CLOUDFLARE_SITE_KEY} 
                            onSuccess={setToken} 
                            theme="dark" 
                            style={{ background: 'transparent' }} 
                        />
                        <span style={{ marginTop: '10px', fontSize: '0.6rem', color: accentColor, opacity: 0.5, letterSpacing: '1px', textTransform: 'uppercase' }}>[{t.security}]</span>
                    </div>

                    {/* Botón Enviar */}
                    <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-start' }}>
                        <button type="submit" disabled={!token || isSending} style={{ background: 'transparent', color: accentColor, border: `1px solid ${accentColor}`, padding: '18px 50px', borderRadius: '0px', fontFamily: '"Inter", sans-serif', fontSize: '0.85rem', letterSpacing: '2px', cursor: 'pointer', textTransform: 'uppercase', transition: 'all 0.3s ease', opacity: (token && !isSending) ? 1 : 0.5, pointerEvents: (token && !isSending) ? 'auto' : 'none' }} onMouseEnter={(e) => { if(token && !isSending) { e.target.style.background = accentColor; e.target.style.color = '#082019'; } }} onMouseLeave={(e) => { if(token && !isSending) { e.target.style.background = 'transparent'; e.target.style.color = accentColor; } }}>
                            {isSending ? t.sending : t.send}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      </div>

      {/* OVERLAY THANK YOU */}
      <div ref={thankYouRef} style={{ 
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
          zIndex: 100, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          visibility: 'hidden', textAlign: 'center', color: accentColor
      }}>
          <div style={{ overflow: 'hidden', marginBottom: '10px' }}>
            <h1 className="ty-text" style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2rem, 5vw, 4rem)', margin: 0, fontStyle: 'italic', opacity: 0, transform: 'translateY(100%)' }}>{t.tyTitle}</h1>
          </div>
          <div style={{ width: '0px', height: '1px', background: accentColor, margin: '20px auto', opacity: 0 }} className="ty-line"></div>
          <div style={{ overflow: 'hidden', marginBottom: '40px' }}>
            <p className="ty-text" style={{ fontFamily: '"Inter", sans-serif', fontSize: '1rem', letterSpacing: '3px', textTransform: 'uppercase', margin: 0, opacity: 0, transform: 'translateY(100%)' }}>{t.tySubtitle} </p>
          </div>
          <div className="ty-btn" style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <button onClick={() => navigate('/')} style={{ background: accentColor, color: '#082019', border: 'none', padding: '15px 40px', fontFamily: '"Inter", sans-serif', fontSize: '0.8rem', letterSpacing: '2px', cursor: 'pointer', textTransform: 'uppercase', fontWeight: 'bold' }}>{t.tyBack}</button>
          </div>
      </div>
    </div>
  );
};

export default Contact;