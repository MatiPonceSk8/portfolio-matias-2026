import React, { useState, useEffect, useRef } from 'react';

const EngineerMode = () => {
  const [isActive, setIsActive] = useState(false);
  const [inspectorData, setInspectorData] = useState(null);
  const hoverRef = useRef(null);

  // 1. Activar con SHIFT + D
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.shiftKey && e.key.toLowerCase() === 'd') {
        setIsActive(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 2. Lógica del Inspector (Medir píxeles al pasar el mouse)
  useEffect(() => {
    if (!isActive) {
        setInspectorData(null);
        return;
    }

    const handleMouseOver = (e) => {
      e.stopPropagation(); // Solo medir el elemento más específico
      const target = e.target;
      const rect = target.getBoundingClientRect();
      
      // Obtener nombre de etiqueta y clases
      const tagName = target.tagName.toLowerCase();
      const className = target.className ? `.${target.className.split(' ')[0]}` : ''; // Solo la primera clase para no saturar
      
      setInspectorData({
        x: e.clientX + 15,
        y: e.clientY + 15,
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        top: Math.round(rect.top),
        left: Math.round(rect.left),
        label: `<${tagName}${className}>`
      });
      
      hoverRef.current = target;
    };

    // Usamos mouseover en todo el documento
    document.addEventListener('mouseover', handleMouseOver);
    return () => document.removeEventListener('mouseover', handleMouseOver);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <>
      {/* === CSS DE INGENIERÍA (EL DESNUDO) === */}
      <style>{`
        /* 1. Resetear estilos bonitos */
        * {
            background-image: none !important;
            background-color: rgba(0, 0, 0, 0.02) !important; /* Casi transparente */
            box-shadow: none !important;
            text-shadow: none !important;
            border-radius: 0 !important; /* Todo cuadrado */
            font-family: "Fira Code", "Courier New", monospace !important;
            letter-spacing: 0px !important;
            cursor: crosshair !important; /* Cursor de precisión */
            transition: none !important; /* Sin suavidad, todo crudo */
        }

        /* 2. Dibujar las cajas (Wireframe) */
        div { outline: 1px solid rgba(0, 255, 255, 0.3) !important; } /* Cian para divs */
        section, article, main { outline: 1px solid rgba(255, 0, 255, 0.5) !important; } /* Magenta para estructura */
        h1, h2, h3, p, span { outline: 1px solid rgba(255, 255, 0, 0.3) !important; color: #fff !important; } /* Amarillo texto */
        img, svg, button { outline: 1px solid #0f0 !important; filter: grayscale(100%) brightness(0.7) !important; }

        /* 3. Fondo de plano técnico */
        body {
            background-color: #0a0a0a !important;
            /* Cuadrícula milimétrica de fondo */
            background-image: 
                linear-gradient(rgba(50, 255, 50, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(50, 255, 50, 0.1) 1px, transparent 1px) !important;
            background-size: 20px 20px !important;
        }

        /* 4. Scrollbar técnica */
        ::-webkit-scrollbar { width: 10px; background: #000; }
        ::-webkit-scrollbar-thumb { background: #0f0; border: 1px solid #fff; }
      `}</style>

      {/* === EL INSPECTOR FLOTANTE (LA ETIQUETA TÉCNICA) === */}
      {inspectorData && (
        <div style={{
            position: 'fixed',
            top: inspectorData.y,
            left: inspectorData.x,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            border: '1px solid #00FF41',
            color: '#00FF41',
            padding: '8px',
            fontSize: '10px',
            fontFamily: '"Fira Code", monospace',
            zIndex: 9999999,
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            boxShadow: '4px 4px 0px rgba(0, 255, 65, 0.2)'
        }}>
            <div style={{color: '#fff', borderBottom: '1px solid #333', marginBottom: '4px', paddingBottom: '2px'}}>
                {inspectorData.label}
            </div>
            <div>DIMS: <span style={{color: '#fff'}}>{inspectorData.width}px</span> × <span style={{color: '#fff'}}>{inspectorData.height}px</span></div>
            <div>POS : X:<span style={{color: '#fff'}}>{inspectorData.left}</span> Y:<span style={{color: '#fff'}}>{inspectorData.top}</span></div>
        </div>
      )}

      {/* === HUD DE ESQUINA (Para saber que está activo) === */}
      <div style={{
          position: 'fixed', 
          bottom: 20, 
          left: 20, 
          padding: '10px', 
          background: '#000', 
          border: '1px solid yellow', 
          color: 'yellow',
          fontFamily: 'monospace',
          fontSize: '12px',
          zIndex: 9999999
      }}>
          ⚠ DEBUG_MODE: ON [SHIFT+D to exit]
      </div>
    </>
  );
};

export default EngineerMode;