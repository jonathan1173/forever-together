import { useEffect, useRef } from 'react';

export default function DateComponent() {
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Ajustar el canvas al tamaño real de su contenedor en pantalla
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;

    // Pintar la capa superior (el rascadito gris)
    ctx.fillStyle = '#cccccc'; // Color gris
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Agregar un texto sutil encima de la pintura gris para guiar al usuario
    ctx.fillStyle = '#666666';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('¡Raspa aquí!', canvas.width / 2, canvas.height / 2);

    // Funciones para rascar (borrar el canvas)
    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      // Soporte para mouse y pantallas táctiles (móviles)
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const scratch = (e) => {
      if (!isDrawingRef.current) return;
      e.preventDefault(); // Evita que la pantalla se mueva en móviles
      const { x, y } = getPos(e);

      // Usamos 'destination-out' para que el pincel actúe como borrador
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2); // El número 20 es el grosor del pincel
      ctx.fill();
    };

    const startDrawing = () => { isDrawingRef.current = true; };
    const stopDrawing = () => { isDrawingRef.current = false; };

    // Eventos de Mouse
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', scratch);
    window.addEventListener('mouseup', stopDrawing);

    // Eventos Táctiles (Móviles)
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', scratch, { passive: false });
    window.addEventListener('touchend', stopDrawing);

    // Limpieza al desmontar el componente
    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', scratch);
      window.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', scratch);
      window.removeEventListener('touchend', stopDrawing);
    };
  }, []);

  return (
    <div>
      <section>
        <h2 className="font-italics">The Date</h2>
        <p className="font-letter">Scratch to reveal the date</p>

        {/* Contenedor relativo para encimar el canvas sobre el texto */}
        <div style={{ position: 'relative', width: '280px', height: '60px', margin: '20px auto' }}>
          
          {/* El texto que está abajo escondido */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff', // Fondo para que contraste
            border: '1px dashed #aaa',
            userSelect: 'none' // Evita que se seleccione el texto al raspar
          }}>
            <p className="font-letter" style={{ margin: 0, fontWeight: 'bold' }}>
              Saturday, June 15th, 2024
            </p>
          </div>

          {/* El Canvas que va arriba tapando el texto */}
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              cursor: 'crosshair',
              touchAction: 'none' // Evita scroll por defecto en móviles
            }}
          />
        </div>
      </section>
    </div>
  );
}